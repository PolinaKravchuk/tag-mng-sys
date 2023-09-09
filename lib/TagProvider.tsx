"use client";
import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from "react";
import ITag from "./types/ITag";
import { API_URL } from "./constants";
import { useToast } from "@/components/ui/use-toast";

interface ITagContext {
  tags: ITag[];
  currentTag: ITag | null;
  updateCurrentTag: (data: ITag) => void;
  updateTags: (data: ITag[]) => void;
  addTag: (data: ITag) => void;
  editTag: (data: ITag) => void;
}
const TagContext = createContext<ITagContext>({
  tags: [],
  currentTag: null,
  updateCurrentTag: () => {},
  updateTags: () => {},
  addTag: () => {},
  editTag: () => {},
});

export const useTagContext = () => useContext(TagContext);

export const TagProvider: React.FC<PropsWithChildren> = (props) => {
  const { toast } = useToast();
  const [tags, setTags] = useState<ITag[]>([]);
  const [currentTag, setCurrentTag] = useState<ITag | null>(null);

  const updateCurrentTag = (data: ITag) => {
    setCurrentTag(data);
  };

  const updateTags = (data: ITag[]) => {
    console.log("!!!!! updateTags !!!!!", data);

    setTags(data);
  };

  const addTag = async (data: ITag) => {
    try {
      updateTags([...tags, data]);

      toast({
        title: "The tag was added",
        description: "Check it at the end of the list",
      });
    } catch (err) {
      console.log(err);
    }
  };

  const editTag = (data: ITag) => {
    try {
      updateTags(
        tags.map((tag) => {
          return tag.id === data.id ? data : tag;
        })
      );
      toast({
        title: "The tag was updated",
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <TagContext.Provider
      value={{
        tags,
        currentTag,
        updateCurrentTag,
        updateTags,
        addTag,
        editTag,
      }}
    >
      {props.children}
    </TagContext.Provider>
  );
};
