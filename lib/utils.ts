import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import ITagForm from "./types/ITagForm";
import { FieldValues } from "react-hook-form";
import { useId } from "react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function formatTagFromForm(data: FieldValues) {
  const newTag = {
    id: data.id,
    name: data.name,
    description: data.description,
    type: data.type,
    triggerRule: {
      type: data.triggerRule.type,
      identificatorClass: data.triggerRule.identificatorClass,
    },
    goal: data.goal,
  };
  return newTag;
}
