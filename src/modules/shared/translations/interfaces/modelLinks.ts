export interface ModelLinks {
  links: Links;
}

interface Links {
  related: string;
  self: string;
}

export interface ModelData {
  data: Data;
}

export interface MultipleModelData {
  data: Data[];
}

export interface Data {
  type: string;
  id: string;
  meta?: {
    pivot?: {
      [key: string]: string; // Allows for any pivot attribute name and its string value
    };

  }
}

interface PriorityPivot {
  priority: string;
}
