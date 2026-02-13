import { useMemo } from 'react';
import { Box, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import type { FilterCondition, FieldDefinition } from '../types';
import FilterValueInput from './FilterValueInput';
import { validateFilter } from '../utils/validateFilter';

interface FilterConditionRowProps {
  filter: FilterCondition;
  fieldDefinitions: FieldDefinition[];
  onUpdate: (filter: FilterCondition) => void;
}

const getOperatorLabel = (operator: string): string => {
  const labels: Record<string, string> = {
    equals: 'Equals',
    contains: 'Contains',
    startsWith: 'Starts With',
    endsWith: 'Ends With',
    doesNotContain: 'Does Not Contain',
    greaterThan: 'Greater Than',
    lessThan: 'Less Than',
    greaterThanOrEqual: 'Greater Than or Equal',
    lessThanOrEqual: 'Less Than or Equal',
    between: 'Between',
    is: 'Is',
    isNot: 'Is Not',
    in: 'In',
    notIn: 'Not In',
  };
  return labels[operator] || operator;
};

export default function FilterConditionRow({
  filter,
  fieldDefinitions,
  onUpdate,
}: FilterConditionRowProps) {
  const selectedField = useMemo(
    () => fieldDefinitions.find((f) => f.name === filter.field),
    [filter.field, fieldDefinitions]
  );

  const handleFieldChange = (fieldName: string) => {
    const field = fieldDefinitions.find((f) => f.name === fieldName);
    if (field) {
      onUpdate({
        ...filter,
        field: field.name,
        fieldType: field.type,
        operator: field.operators[0],
        value: {},
      });
    }
  };

  const handleOperatorChange = (operator: string) => {
    onUpdate({
      ...filter,
      operator: operator as any,
      value: {},
    });
  };

  const handleValueChange = (value: any) => {
    onUpdate({
      ...filter,
      value,
    });
  };

  const validation = validateFilter(filter);

  if (!selectedField) return null;

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1.5fr',
        gap: 2,
        alignItems: 'flex-start',
      }}
    >
      <FormControl fullWidth size="small">
        <InputLabel>Field</InputLabel>
        <Select
          value={filter.field}
          label="Field"
          onChange={(e) => handleFieldChange(e.target.value)}
        >
          {fieldDefinitions.map((field) => (
            <MenuItem key={field.name} value={field.name}>
              {field.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth size="small">
        <InputLabel>Operator</InputLabel>
        <Select
          value={filter.operator}
          label="Operator"
          onChange={(e) => handleOperatorChange(e.target.value)}
        >
          {selectedField.operators.map((op) => (
            <MenuItem key={op} value={op}>
              {getOperatorLabel(op)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FilterValueInput
        fieldType={selectedField.type}
        operator={filter.operator as any}
        value={filter.value}
        onValueChange={handleValueChange}
        options={selectedField.options}
        errorMessage={validation.valid ? undefined : validation.message}
      />
    </Box>
  );
}
