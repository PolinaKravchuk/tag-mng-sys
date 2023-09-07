import ITag from "@/lib/types/ITag";
import React from "react";
import TagDialog from "./tagDialog";
import { Button } from "@/components/ui/button";
import { AiFillTag } from "react-icons/ai";
import TagsTable from "./tagsTable";

function TagsView({ tags }: { tags: ITag[] }) {
  return (
    <section className="w-full">
      <div className="flex justify-end items-end">
        <TagDialog type="add">
          <Button variant="outline" data-testid="addBtn">
            <AiFillTag className="w-4 h-4 mr-2" />
            Add new
          </Button>
        </TagDialog>
      </div>
      <div className="w-full" data-testid="table">
        <TagsTable data={tags} />
      </div>
    </section>
  );
}

export default TagsView;
