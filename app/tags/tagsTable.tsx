"use client";
import { useEffect, useState } from "react";
import { AiFillTag, AiOutlineEdit } from "react-icons/ai";
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

import { Button } from "@/components/ui/button";
import TagDialog from "./tagDialog";
import DeleteAlert from "./tagDeleteAlert";
import { ITEMS_PORTION_LEN } from "@/lib/constants";

function TagsTable() {
  const { tags, updateTags, updateCurrentTag } = useTagContext();
  const [portion, setPortion] = useState<ITag[]>([]);

  useEffect(() => {
    if (tags.length > ITEMS_PORTION_LEN) {
      setPortion([...tags.slice(0, ITEMS_PORTION_LEN)]);
    } else {
      setPortion(tags);
    }
  }, [tags]);

  const handleDeleteTag = (id: string) => {
    updateTags(tags.filter((tag) => tag.id !== id));
  };

  const showMore = () => {
    setPortion([
      ...portion,
      ...tags.slice(portion.length, portion.length + ITEMS_PORTION_LEN),
    ]);
  };

  return (
    <>
      <Table className="w-full" data-testid="table" role="table">
        <TableCaption>
          A list of your tags ({portion.length} out of {tags.length}).
        </TableCaption>
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
          {portion.map((tag) => (
            <TableRow key={tag.id} data-testid="row">
              <TableCell>
                <AiFillTag className="w-4 h-4" aria-hidden="true" />
              </TableCell>
              <TableCell className="font-medium" data-testid="name">
                {tag.name}
              </TableCell>
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
                  <Button
                    variant="outline"
                    onClick={() => updateCurrentTag(tag)}
                    data-testid="edit"
                  >
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
      {portion.length && (
        <div className="flex justify-center my-4">
          <Button variant="outline" onClick={() => showMore()}>
            Show more
          </Button>
        </div>
      )}
    </>
  );
}

export default TagsTable;
