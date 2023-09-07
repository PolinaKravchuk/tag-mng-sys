"use client";
import React, { useState } from "react";
import Image from "next/image";
import { AiFillTag } from "react-icons/ai";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Variable = {
  type: string;
  code: string;
};
interface ITag {
  id: string;
  createdAt: Date;
  name: string;
  description: string;
  type: string;
  triggerRule: {
    type: string;
    identificatorClass: string;
  };
  variablesToCollect: Variable[];
  goal: string;
  icon: string;
}

function TagsTable({ data }: { data: ITag[] }) {
  const [tags, setTags] = useState<ITag[]>(data);
  return (
    <Table>
      <TableCaption>A list of all of your tags.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead></TableHead>
          <TableHead className="w-[100px]">Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Type</TableHead>
          <TableHead className="text-right">Trigger</TableHead>
          <TableHead className="text-right">Goal</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tags.map((tag) => (
          <TableRow key={tag.id}>
            <TableCell>
              <AiFillTag className="w-4 h-4" />
            </TableCell>
            <TableCell className="font-medium">{tag.name}</TableCell>
            <TableCell>{tag.description}</TableCell>
            <TableCell>{tag.type}</TableCell>
            <TableCell className="text-right">
              type - {tag.triggerRule.type}, class -{" "}
              {tag.triggerRule.identificatorClass}
            </TableCell>
            <TableCell>{tag.goal}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default TagsTable;
