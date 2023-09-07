import React from "react";
import PageWrapper from "@/components/PageWrapper";
import { Button } from "@/components/ui/button";
import { API_URL } from "@/lib/constants";
import TagDialog from "./tagDialog";
import TagsTable from "./tagsTable";
import { AiFillTag } from "react-icons/ai";

async function getTags() {
  const response = await fetch(API_URL + "tags", {
    method: "GET",
  });
  return await response.json();
}
export default async function TagsPage() {
  const tags = await getTags();

  return (
    <PageWrapper>
      <section className="w-full">
        <div className="flex justify-end items-end">
          <TagDialog type="add">
            <Button variant="outline">
              <AiFillTag className="w-4 h-4 mr-2" />
              Add new
            </Button>
          </TagDialog>
        </div>
        <div className="w-full">
          <TagsTable data={tags} />
        </div>
      </section>
    </PageWrapper>
  );
}
