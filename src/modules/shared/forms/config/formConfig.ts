export interface FieldConfig {
  field1: string;
  field2: string;
}

export const FORM_FIELD_CONFIG: Record<string, FieldConfig> = {
  category: {
    field1: 'name',
    field2: 'description'
  },
  muscle: {
    field1: 'name',
    field2: 'description'
  },
  routine: {
    field1: 'title',
    field2: 'content'
  },
  exercise: {
    field1: 'name',
    field2: 'instructions'
  },
  variation: {
    field1: 'name',
    field2: 'description'
  },
  equipment: {
    field1: 'name',
    field2: 'description'
  },
};