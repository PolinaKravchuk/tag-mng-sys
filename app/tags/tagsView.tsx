"use client";
import ITag from "@/lib/types/ITag";
import React, { useEffect } from "react";
import TagDialog from "./tagDialog";
import { Button } from "@/components/ui/button";
import { AiFillTag } from "react-icons/ai";
import TagsTable from "./tagsTable";
import { useTagContext } from "@/lib/TagProvider";
import styled from "@emotion/styled";

type HeadingProps = {
  regular: boolean;
};

const Heading = styled.h1<HeadingProps>`
  color: white;
  font-size: 24px;
  font-weight: ${(props) => (props.regular ? "100" : "700")};
`;

function TagsView({ data }: { data: ITag[] }) {
  const { tags, updateTags } = useTagContext();

  useEffect(() => {
    updateTags(data);
  }, [data]);

  return (
    <section className="w-full">
      <Heading regular>Tags view</Heading>
      <div className="flex justify-end items-end">
        <TagDialog type="add">
          <Button variant="outline" data-testid="addBtn">
            <AiFillTag className="w-4 h-4 mr-2" />
            Add new
          </Button>
        </TagDialog>
      </div>
      <div className="w-full" data-testid="table">
        <TagsTable />
      </div>
    </section>
  );
}

export default TagsView;
