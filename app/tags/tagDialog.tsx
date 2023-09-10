"use client";
import { ReactElement, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useTagContext } from "@/lib/TagProvider";
import { formatTagFromForm } from "@/lib/utils";
import ITag from "@/lib/types/ITag";
import { v4 as uuidv4 } from "uuid";

type TagDialogType = "add" | "edit";

function TagDialog({
  type,
  children,
}: {
  type: TagDialogType;
  children: ReactElement | ReactElement[];
}) {
  const [open, setOpen] = useState(false);
  const { addTag, editTag, currentTag } = useTagContext();
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (type === "edit" && currentTag) {
      for (let prop in currentTag) {
        setValue(prop, currentTag[prop as keyof ITag]);
      }
    }
  }, [type, currentTag, open]);

  const onSubmit = function () {
    const values = getValues();
    let tagData;
    if (type === "edit") {
      tagData = formatTagFromForm({ ...currentTag, ...values });
    } else {
      tagData = formatTagFromForm({ ...values, id: uuidv4() });
    }

    if (type === "add") {
      addTag(tagData as ITag);
    } else {
      editTag(tagData as ITag);
    }
    setOpen(false);
  };
  const onOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      reset();
    }
    setOpen(isOpen);
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger id="dialogTrigger" asChild onClick={() => setOpen(true)}>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{type === "add" ? "Add " : "Edit "}tag</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4">
          <div className="grid grid-cols-4 items-center gap-4" role="group">
            <Label
              htmlFor="name"
              className="text-left"
              aria-label="tag name"
              aria-required="true"
            >
              Name
            </Label>
            <Input
              id="name"
              data-testid="nameField"
              className="col-span-3"
              {...register("name", {
                required: true,
              })}
            />
          </div>
          {errors.name && (
            <span className="text-right text-red-500">
              This field is required
            </span>
          )}

          <div className="grid grid-cols-4 items-center gap-4" role="group">
            <Label
              htmlFor="description"
              className="text-left"
              aria-label="tag description"
            >
              Description
            </Label>
            <Input
              id="description"
              className="col-span-3"
              {...register("description")}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4" role="group">
            <Label htmlFor="type" className="text-left" aria-label="tag type">
              Type
            </Label>
            <Input id="type" className="col-span-3" {...register("type")} />
          </div>
          <div className="grid grid-cols-4 items-center gap-4" role="group">
            <Label
              htmlFor="triggerType"
              className="text-left"
              aria-label="trigger type"
            >
              Trigger type
            </Label>
            <Input
              id="triggerType"
              className="col-span-3"
              {...register("triggerRule.type")}
            />
            <Label
              htmlFor="triggerClass"
              className="text-left"
              aria-label="trigger identificator"
            >
              Identificator class
            </Label>
            <Input
              id="triggerClass"
              className="col-span-3"
              {...register("triggerRule.identificatorClass")}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4" role="group">
            <Label htmlFor="goal" className="text-left" aria-label="goal">
              Goal
            </Label>
            <Input id="goal" className="col-span-3" {...register("goal")} />
          </div>

          <div className="grid grid-cols-4 items-center gap-4"></div>
        </div>

        <DialogFooter>
          <Button
            type="submit"
            onClick={handleSubmit(onSubmit)}
            data-testid="submitBtn"
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default TagDialog;
