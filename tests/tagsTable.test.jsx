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
let mockTags = dummyData;
let mockCurrentTag = {};
const updateTags = jest.fn((tags) => {
  mockTags = tags;
});
const mockAddTag = jest.fn((newTag) => {
  mockTags.push(newTag);
});
const mockEditTag = jest.fn((tag) => {
  mockTags = mockTags.map((mockTag) => {
    return tag.id === mockTag.id ? tag : mockTag;
  });
});
const mockUpdateCurrentTag = jest.fn((tag) => {
  mockCurrentTag = tag;
});

jest.mock("../lib/TagProvider", () => {
  return {
    tags: [],
    useTagContext: function () {
      return {
        currentTag: mockCurrentTag,
        tags: mockTags,
        updateTags: updateTags,
        addTag: mockAddTag,
        editTag: mockEditTag,
        updateCurrentTag: mockUpdateCurrentTag,
      };
    },
  };
});

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(dummyData),
  })
);

beforeEach(() => {
  fetch.mockClear();
});

test("renders 'Add' button page", async () => {
  render(<TagsView data={dummyData} />);
  const addBtn = screen.getByTestId("addBtn");
  expect(addBtn).toBeInTheDocument();
});

test("renders 'Add' button and open dialog page", async () => {
  render(<TagsView data={dummyData} />);
  const nameDlgField = screen.queryByTestId("nameDlgField");
  expect(nameDlgField).toBeNull();

  const addBtn = screen.getByTestId("addBtn");
  fireEvent.click(addBtn);

  await waitFor(() => {
    const nameField = screen.getByTestId("nameField");
    expect(nameField).toBeInTheDocument();
  });
});

test("Add new tag to the table", async () => {
  render(<TagsView data={dummyData} />);
  await waitFor(() => expect(screen.getByText("name 1")).toBeInTheDocument());

  const addBtn = screen.getByTestId("addBtn");
  fireEvent.click(addBtn);

  // fill name in add tag dialog
  await waitFor(() => {
    const submitBtn = screen.getByTestId("submitBtn");
    const nameField = screen.getByTestId("nameField");
    fireEvent.change(nameField, { target: { value: "new tag name" } });
    fireEvent.click(submitBtn);
  });
  // expect: mock add tag fn is triggered
  expect(mockAddTag).toHaveBeenCalledTimes(1);
  expect(mockTags).toHaveLength(3);

  // re-render the component with updated data
  render(<TagsView data={mockTags} />);

  // expect to see a new tag
  await waitFor(() =>
    expect(screen.getByText("new tag name")).toBeInTheDocument()
  );
});

test("Edit tag in the table", async () => {
  const dummyRow = {
    name: "name 1",
    description: "description 1",
    type: "type 1",
    triggerRule: {},
    goal: "Tempore quae itaque repellendus nam iste nam magni.",
    id: "1",
  };
  render(<TagsView data={[dummyRow]} />);

  const editBtn = screen.getByTestId("edit");
  fireEvent.click(editBtn);

  expect(mockUpdateCurrentTag).toHaveBeenCalledTimes(1);

  // edit dialog has a name
  expect(screen.getByText("name 1")).toBeInTheDocument();

  await waitFor(() => {
    const nameField = screen.getByTestId("nameField");

    fireEvent.change(nameField, { target: { value: "updated tag name" } });

    const submitBtn = screen.getByTestId("submitBtn");
    fireEvent.click(submitBtn);
  });

  // expect: mock edit tag fn is triggered once
  expect(mockEditTag).toHaveBeenCalledTimes(1);

  // re-render the component with updated data
  render(<TagsView data={mockTags} />);

  // expect to see updated tag
  await waitFor(() =>
    expect(screen.getByText("updated tag name")).toBeInTheDocument()
  );
});
