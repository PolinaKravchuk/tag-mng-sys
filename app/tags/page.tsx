import PageWrapper from "@/components/PageWrapper";
import { API_URL } from "@/lib/constants";
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
    </PageWrapper>
  );
}
