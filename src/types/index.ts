export type FieldType = 'text' | 'number' | 'date' | 'amount' | 'select' | 'multiselect' | 'boolean';

export type TextOperator = 'equals' | 'contains' | 'startsWith' | 'endsWith' | 'doesNotContain';
export type NumberOperator = 'equals' | 'greaterThan' | 'lessThan' | 'greaterThanOrEqual' | 'lessThanOrEqual';
export type DateOperator = 'between';
export type AmountOperator = 'between';
export type SelectOperator = 'is' | 'isNot';
export type MultiSelectOperator = 'in' | 'notIn';
export type BooleanOperator = 'is';

export type Operator = TextOperator | NumberOperator | DateOperator | AmountOperator | SelectOperator | MultiSelectOperator | BooleanOperator;

export interface FilterValue {
  text?: string;
  number?: number;
  dateStart?: string;
  dateEnd?: string;
  amountMin?: number;
  amountMax?: number;
  selectValue?: string;
  multiSelectValue?: string[];
  booleanValue?: boolean;
}

export interface FilterCondition {
  id: string;
  field: string;
  fieldType: FieldType;
  operator: Operator;
  value: FilterValue;
}

export interface FieldDefinition {
  name: string;
  label: string;
  type: FieldType;
  operators: Operator[];
  options?: Array<{ label: string; value: any }>;
}

export interface EmployeeData {
  id: number;
  name: string;
  email: string;
  department: string;
  role: string;
  salary: number;
  joinDate: string;
  isActive: boolean;
  skills: string[];
  address: {
    city: string;
    state: string;
    country: string;
  };
  projects: number;
  lastReview: string;
  performanceRating: number;
}

export interface SortConfig {
  key: keyof EmployeeData;
  direction: 'asc' | 'desc';
}
