import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import TagsView from "@/app/tags/tagsView";
import TagsTable from "@/app/tags/tagsTable";
const dummyData = [
  {
    name: "name 1",
    description: "description 1",
    type: "type 1",
    triggerRule: {},
    goal: "Tempore quae itaque repellendus nam iste nam magni.",
    id: "1",
  },
  {
    name: "name 2",
    description: "description 2",
    type: "type 2",
    triggerRule: {},
    goal: "Blanditiis aperiam error doloremque.",
    id: "2",
  },
];
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(dummyData),
  })
);

beforeEach(() => {
  fetch.mockClear();
});

test("renders Add button page", async () => {
  render(<TagsView />);
  const addBtn = screen.getByTestId("addBtn");
  expect(addBtn).toBeInTheDocument();
});
test("renders Add button page", async () => {
  render(<TagsView />);
  const nameDlgField = screen.queryByTestId("nameDlgField");
  expect(nameDlgField).toBeNull();

  const addBtn = screen.getByTestId("addBtn");
  fireEvent.click(addBtn);

  await waitFor(() => {
    const nameField = screen.getByTestId("nameField");
    expect(nameField).toBeInTheDocument();
  });
});
