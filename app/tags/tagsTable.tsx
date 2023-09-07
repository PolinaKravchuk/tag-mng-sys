"use client";
import { useEffect } from "react";
import { AiFillTag, AiOutlineEdit } from "react-icons/ai";
import { RiDeleteBinLine } from "react-icons/ri";
import ITag from "@/lib/types/ITag";
import { useTagContext } from "@/lib/TagProvider";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import TagDialog from "./tagDialog";

function TagsTable({ data }: { data: ITag[] }) {
  const { tags, updateTags, updateCurrentTag } = useTagContext();

  useEffect(() => {
    updateTags(data);
  }, [data]);

  const handleDeleteTag = (id: string) => {
    updateTags(tags.filter((tag) => tag.id !== id));
  };

  return (
    <Table className="w-full" data-testid="table" role="table">
      <TableCaption>A list of all of your tags.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead></TableHead>
          <TableHead className="w-[100px]">Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Type</TableHead>
          <TableHead className="text-right">Trigger</TableHead>
          <TableHead className="text-right">Goal</TableHead>
          <TableHead></TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tags.map((tag) => (
          <TableRow key={tag.id} data-testid="row">
            <TableCell>
              <AiFillTag className="w-4 h-4" />
            </TableCell>
            <TableCell className="font-medium">{tag.name}</TableCell>
            <TableCell>{tag.description}</TableCell>
            <TableCell>{tag.type}</TableCell>
            <TableCell className="text-right">
              {tag.triggerRule.type && `type: ${tag.triggerRule.type}`}
              {tag.triggerRule.identificatorClass &&
                `class: ${tag.triggerRule.identificatorClass}`}
            </TableCell>
            <TableCell className="font-small">{tag.goal}</TableCell>
            <TableCell>
              <TagDialog type="edit">
                <Button variant="outline" onClick={() => updateCurrentTag(tag)}>
                  <AiOutlineEdit className="w-4 h-4" />
                </Button>
              </TagDialog>
            </TableCell>
            <TableCell>
              <DeleteAlert onDelete={() => handleDeleteTag(tag.id)} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default TagsTable;

const DeleteAlert = function ({ onDelete }: { onDelete: () => void }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">
          <RiDeleteBinLine className="w-4 h-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your tag.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => onDelete()}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
