import type { Component } from "vue";
import {
  NameInput,
  TitleInput,
  DescriptionInput,
  ContentInput,
  InstructionsInput,
} from "../fields";

export const FIELD_COMPONENTS: Record<string, Component> = {
  name: NameInput,
  title: TitleInput,
  description: DescriptionInput,
  content: ContentInput,
  instructions: InstructionsInput,
  default: NameInput,
};
