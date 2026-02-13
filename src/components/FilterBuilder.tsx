import { useState } from 'react';
import { Card, Box, Button, Stack } from '@mui/material';
import { Plus, Trash2 } from 'lucide-react';
import FilterConditionRow from './FilterConditionRow';
import type { FilterCondition, FieldDefinition } from '../types';

interface FilterBuilderProps {
  filters: FilterCondition[];
  onFiltersChange: (filters: FilterCondition[]) => void;
  fieldDefinitions: FieldDefinition[];
}

export default function FilterBuilder({
  filters,
  onFiltersChange,
  fieldDefinitions,
}: FilterBuilderProps) {
  const [nextId, setNextId] = useState(1);

  const handleAddFilter = () => {
    const newFilter: FilterCondition = {
      id: `filter-${nextId}`,
      field: fieldDefinitions[0].name,
      fieldType: fieldDefinitions[0].type,
      operator: fieldDefinitions[0].operators[0],
      value: {},
    };
    onFiltersChange([...filters, newFilter]);
    setNextId(nextId + 1);
  };

  const handleRemoveFilter = (id: string) => {
    onFiltersChange(filters.filter((f) => f.id !== id));
  };

  const handleUpdateFilter = (updatedFilter: FilterCondition) => {
    onFiltersChange(
      filters.map((f) => (f.id === updatedFilter.id ? updatedFilter : f))
    );
  };

  const handleClearAll = () => {
    onFiltersChange([]);
  };

  return (
    <Card
      sx={{
        p: 3,
        mb: 3,
        backgroundColor: '#f5f5f5',
        border: '1px solid #e0e0e0',
      }}
    >
      <Box sx={{ mb: 2 }}>
        <h2 style={{ marginTop: 0, marginBottom: 16, fontSize: '1.25rem' }}>
          Filter Conditions
        </h2>
        {filters.length === 0 && (
          <p style={{ color: '#666', margin: 0 }}>
            No filters applied. Click "Add Filter" to create one.
          </p>
        )}
      </Box>

      <Stack spacing={2} sx={{ mb: 3 }}>
        {filters.map((filter) => (
          <Box
            key={filter.id}
            sx={{
              backgroundColor: 'white',
              border: '1px solid #e0e0e0',
              borderRadius: '4px',
              p: 2,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 2,
              }}
            >
              <Box sx={{ flex: 1 }}>
                <FilterConditionRow
                  filter={filter}
                  fieldDefinitions={fieldDefinitions}
                  onUpdate={handleUpdateFilter}
                />
              </Box>
                  <Button
                    onClick={() => handleRemoveFilter(filter.id)}
                    size="small"
                    sx={{
                      color: '#d32f2f',
                      '&:hover': { backgroundColor: '#ffebee' },
                      mt: 0.5,
                    }}
                    variant="text"
                    aria-label={`Remove filter ${filter.id}`}
                  >
                    <Trash2 size={18} />
                  </Button>
            </Box>
          </Box>
        ))}
      </Stack>

      <Stack direction="row" spacing={2}>
        <Button
          onClick={handleAddFilter}
          variant="contained"
          startIcon={<Plus size={18} />}
          sx={{
            backgroundColor: '#2196f3',
            '&:hover': { backgroundColor: '#1976d2' },
          }}
              aria-label="Add filter"
        >
          Add Filter
        </Button>
        {filters.length > 0 && (
          <Button
            onClick={handleClearAll}
            variant="outlined"
            sx={{
              color: '#d32f2f',
              borderColor: '#d32f2f',
              '&:hover': { backgroundColor: '#ffebee', borderColor: '#d32f2f' },
            }}
          >
            Clear All
          </Button>
        )}
      </Stack>
    </Card>
  );
}
