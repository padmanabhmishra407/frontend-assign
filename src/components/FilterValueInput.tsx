import { Box, TextField, Select, MenuItem, FormControl, InputLabel, Checkbox, FormGroup, FormControlLabel } from '@mui/material';
import type { FieldType, FilterValue, Operator } from '../types';

interface FilterValueInputProps {
  fieldType: FieldType;
  operator: Operator;
  value: FilterValue;
  onValueChange: (value: FilterValue) => void;
  errorMessage?: string;
  options?: Array<{ label: string; value: any }>;
}

export default function FilterValueInput({
  fieldType,
  operator,
  value,
  onValueChange,
  options = [],
  errorMessage,
}: FilterValueInputProps) {
  switch (fieldType) {
    case 'text':
      return (
        <TextField
          fullWidth
          size="small"
          label="Value"
          placeholder="Enter text"
          value={value.text || ''}
          onChange={(e) => onValueChange({ ...value, text: e.target.value })}
          error={Boolean(errorMessage)}
          helperText={errorMessage}
          inputProps={{ 'aria-label': 'text filter value' }}
        />
      );

    case 'number':
      return (
        <TextField
          fullWidth
          size="small"
          type="number"
          label="Value"
          placeholder="Enter number"
          value={value.number ?? ''}
          onChange={(e) =>
            onValueChange({ ...value, number: e.target.value ? Number(e.target.value) : undefined })
          }
          error={Boolean(errorMessage)}
          helperText={errorMessage}
          inputProps={{ 'aria-label': 'number filter value' }}
        />
      );

    case 'date':
      return (
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1 }}>
          <TextField
            size="small"
            type="date"
            label="Start Date"
            InputLabelProps={{ shrink: true }}
            value={value.dateStart || ''}
            onChange={(e) => onValueChange({ ...value, dateStart: e.target.value })}
            error={Boolean(errorMessage)}
            inputProps={{ 'aria-label': 'start date' }}
          />
          <TextField
            size="small"
            type="date"
            label="End Date"
            InputLabelProps={{ shrink: true }}
            value={value.dateEnd || ''}
            onChange={(e) => onValueChange({ ...value, dateEnd: e.target.value })}
            error={Boolean(errorMessage)}
            inputProps={{ 'aria-label': 'end date' }}
          />
          {errorMessage && (
            <div style={{ gridColumn: '1 / -1', color: '#d32f2f', fontSize: '0.8rem' }}>{errorMessage}</div>
          )}
        </Box>
      );

    case 'amount':
      return (
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1 }}>
          <TextField
            size="small"
            type="number"
            label="Min Amount"
            placeholder="Min"
            value={value.amountMin ?? ''}
            onChange={(e) =>
              onValueChange({ ...value, amountMin: e.target.value ? Number(e.target.value) : undefined })
            }
            error={Boolean(errorMessage)}
            inputProps={{ 'aria-label': 'min amount' }}
          />
          <TextField
            size="small"
            type="number"
            label="Max Amount"
            placeholder="Max"
            value={value.amountMax ?? ''}
            onChange={(e) =>
              onValueChange({ ...value, amountMax: e.target.value ? Number(e.target.value) : undefined })
            }
            error={Boolean(errorMessage)}
            inputProps={{ 'aria-label': 'max amount' }}
          />
          {errorMessage && (
            <div style={{ gridColumn: '1 / -1', color: '#d32f2f', fontSize: '0.8rem' }}>{errorMessage}</div>
          )}
        </Box>
      );

    case 'select':
      return (
        <FormControl fullWidth size="small">
          <InputLabel>Select Value</InputLabel>
          <Select
            value={value.selectValue || ''}
            label="Select Value"
            onChange={(e) => onValueChange({ ...value, selectValue: e.target.value })}
            error={Boolean(errorMessage)}
            inputProps={{ 'aria-label': 'select filter value' }}
          >
            <MenuItem value="">-- Select --</MenuItem>
            {options.map((opt) => (
              <MenuItem key={opt.value} value={opt.value}>
                {opt.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      );

    case 'multiselect':
      return (
        <FormControl fullWidth size="small">
          <InputLabel>Select Skills</InputLabel>
          <Box
            sx={{
              backgroundColor: 'white',
              border: '1px solid #ccc',
              borderRadius: '4px',
              p: 1,
              maxHeight: '200px',
              overflowY: 'auto',
            }}
          >
            <FormGroup>
              {options.map((opt) => (
                <FormControlLabel
                  key={opt.value}
                  control={
                    <Checkbox
                      checked={(value.multiSelectValue || []).includes(opt.value)}
                      onChange={(e) => {
                        const current = value.multiSelectValue || [];
                        const updated = e.target.checked
                          ? [...current, opt.value]
                          : current.filter((v) => v !== opt.value);
                        onValueChange({ ...value, multiSelectValue: updated });
                      }}
                    />
                  }
                  label={opt.label}
                  sx={{ display: 'block', m: 0.5 }}
                />
              ))}
            </FormGroup>
          </Box>
            {errorMessage && <div style={{ color: '#d32f2f', fontSize: '0.8rem', marginTop: 6 }}>{errorMessage}</div>}
        </FormControl>
      );

    case 'boolean':
      return (
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={value.booleanValue ?? false}
                onChange={(e) => onValueChange({ ...value, booleanValue: e.target.checked })}
                inputProps={{ 'aria-label': 'boolean filter value' }}
              />
            }
            label={operator === 'is' ? 'Active' : 'Is True'}
          />
        </FormGroup>
      );

    default:
      return null;
  }
}
