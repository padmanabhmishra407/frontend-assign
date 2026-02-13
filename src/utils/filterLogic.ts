import type { EmployeeData, FilterCondition, FilterValue } from '../types';

export const applyFilters = (data: EmployeeData[], filters: FilterCondition[]): EmployeeData[] => {
  if (filters.length === 0) return data;

  return data.filter((record) => {
    return filters.every((filter) => matchesFilter(record, filter));
  });
};

const getNestedValue = (obj: any, path: string): any => {
  return path.split('.').reduce((current, part) => current?.[part], obj);
};

const matchesFilter = (record: EmployeeData, filter: FilterCondition): boolean => {
  const fieldValue = getNestedValue(record, filter.field);

  switch (filter.fieldType) {
    case 'text':
      return matchesTextFilter(fieldValue, filter.operator as any, filter.value);
    case 'number':
      return matchesNumberFilter(fieldValue, filter.operator as any, filter.value);
    case 'date':
      return matchesDateFilter(fieldValue, filter.operator as any, filter.value);
    case 'amount':
      return matchesAmountFilter(fieldValue, filter.operator as any, filter.value);
    case 'select':
      return matchesSelectFilter(fieldValue, filter.operator as any, filter.value);
    case 'multiselect':
      return matchesMultiSelectFilter(fieldValue, filter.operator as any, filter.value);
    case 'boolean':
      return matchesBooleanFilter(fieldValue, filter.value);
    default:
      return true;
  }
};

const matchesTextFilter = (
  value: any,
  operator: 'equals' | 'contains' | 'startsWith' | 'endsWith' | 'doesNotContain',
  filterValue: FilterValue
): boolean => {
  const strValue = String(value || '').toLowerCase();
  const searchValue = (filterValue.text || '').toLowerCase();

  switch (operator) {
    case 'equals':
      return strValue === searchValue;
    case 'contains':
      return strValue.includes(searchValue);
    case 'startsWith':
      return strValue.startsWith(searchValue);
    case 'endsWith':
      return strValue.endsWith(searchValue);
    case 'doesNotContain':
      return !strValue.includes(searchValue);
    default:
      return true;
  }
};

const matchesNumberFilter = (
  value: any,
  operator: 'equals' | 'greaterThan' | 'lessThan' | 'greaterThanOrEqual' | 'lessThanOrEqual',
  filterValue: FilterValue
): boolean => {
  const numValue = Number(value);
  const compareValue = filterValue.number ?? 0;

  if (isNaN(numValue)) return false;

  switch (operator) {
    case 'equals':
      return numValue === compareValue;
    case 'greaterThan':
      return numValue > compareValue;
    case 'lessThan':
      return numValue < compareValue;
    case 'greaterThanOrEqual':
      return numValue >= compareValue;
    case 'lessThanOrEqual':
      return numValue <= compareValue;
    default:
      return true;
  }
};

const matchesDateFilter = (
  value: any,
  _operator: 'between',
  filterValue: FilterValue
): boolean => {
  if (!filterValue.dateStart || !filterValue.dateEnd) return true;

  const dateValue = new Date(String(value)).getTime();
  const startDate = new Date(filterValue.dateStart).getTime();
  const endDate = new Date(filterValue.dateEnd).getTime();

  if (isNaN(dateValue) || isNaN(startDate) || isNaN(endDate)) return false;

  return dateValue >= startDate && dateValue <= endDate;
};

const matchesAmountFilter = (
  value: any,
  _operator: 'between',
  filterValue: FilterValue
): boolean => {
  const numValue = Number(value);
  const min = filterValue.amountMin ?? 0;
  const max = filterValue.amountMax ?? Infinity;

  if (isNaN(numValue)) return false;

  return numValue >= min && numValue <= max;
};

const matchesSelectFilter = (
  value: any,
  operator: 'is' | 'isNot',
  filterValue: FilterValue
): boolean => {
  const selectValue = filterValue.selectValue || '';

  switch (operator) {
    case 'is':
      return String(value) === selectValue;
    case 'isNot':
      return String(value) !== selectValue;
    default:
      return true;
  }
};

const matchesMultiSelectFilter = (
  value: any,
  operator: 'in' | 'notIn',
  filterValue: FilterValue
): boolean => {
  const multiSelectValues = filterValue.multiSelectValue || [];
  const arrayValue = Array.isArray(value) ? value : [];

  switch (operator) {
    case 'in':
      return arrayValue.some((item) => multiSelectValues.includes(item));
    case 'notIn':
      return !arrayValue.some((item) => multiSelectValues.includes(item));
    default:
      return true;
  }
};

const matchesBooleanFilter = (value: any, filterValue: FilterValue): boolean => {
  return Boolean(value) === filterValue.booleanValue;
};
