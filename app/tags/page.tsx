import Header from "@/components/Header";
import React from "react";
import TagsTable from "./tagsTable";
import PageWrapper from "@/components/PageWrapper";
import TableToolbar from "./tableToolbar";
const API_URL = "https://64f984374098a7f2fc148997.mockapi.io/api/v1/";

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
      <section className="">
        <TableToolbar />
        <TagsTable data={tags} />
      </section>
    </PageWrapper>
  );
}
