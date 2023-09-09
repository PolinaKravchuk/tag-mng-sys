import PageWrapper from "@/components/PageWrapper";
import { Button } from "@/components/ui/button";
import { API_URL } from "@/lib/constants";
import TagDialog from "./tagDialog";
import TagsTable from "./tagsTable";
import { AiFillTag } from "react-icons/ai";
import TagsView from "./tagsView";

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
      <TagsView data={tags} />
      {/* <section className="w-full">
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
      </section> */}
    </PageWrapper>
  );
}
