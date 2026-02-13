import type { FilterCondition } from '../types';

export const validateFilter = (filter: FilterCondition): { valid: boolean; message?: string } => {
  const { fieldType, operator, value } = filter;

  switch (fieldType) {
    case 'text': {
      const v = value.text || '';
      if (operator && v.trim() === '') return { valid: false, message: 'Enter text value' };
      return { valid: true };
    }
    case 'number': {
      if (value.number === undefined || value.number === null || isNaN(Number(value.number)))
        return { valid: false, message: 'Enter a valid number' };
      return { valid: true };
    }
    case 'date': {
      if (!value.dateStart || !value.dateEnd) return { valid: false, message: 'Select start and end dates' };
      const s = new Date(value.dateStart).getTime();
      const e = new Date(value.dateEnd).getTime();
      if (isNaN(s) || isNaN(e)) return { valid: false, message: 'Invalid date' };
      if (s > e) return { valid: false, message: 'Start date must be before end date' };
      return { valid: true };
    }
    case 'amount': {
      const min = value.amountMin;
      const max = value.amountMax;
      if ((min === undefined || min === null || isNaN(Number(min))) && (max === undefined || max === null || isNaN(Number(max))))
        return { valid: false, message: 'Enter min and/or max amount' };
      if (min !== undefined && max !== undefined && Number(min) > Number(max))
        return { valid: false, message: 'Min must be <= Max' };
      return { valid: true };
    }
    case 'select': {
      if (!value.selectValue) return { valid: false, message: 'Choose a value' };
      return { valid: true };
    }
    case 'multiselect': {
      if (!value.multiSelectValue || value.multiSelectValue.length === 0)
        return { valid: false, message: 'Choose one or more options' };
      return { valid: true };
    }
    case 'boolean': {
      if (value.booleanValue === undefined || value.booleanValue === null)
        return { valid: false, message: 'Choose true or false' };
      return { valid: true };
    }
    default:
      return { valid: true };
  }
};
