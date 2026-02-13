import { useState, useMemo, useEffect, useRef } from 'react';
import { Container, Box, ThemeProvider, createTheme, Stack, Button } from '@mui/material';
import FilterBuilder from './components/FilterBuilder';
import DataTable from './components/DataTable';
import type { FilterCondition } from './types';
import { sampleEmployeeData, fieldDefinitions as defaultFieldDefinitions } from './data/sampleData';
import { applyFilters } from './utils/filterLogic';
import { exportJSON, exportCSV } from './utils/exportData';
import type { FieldDefinition } from './types';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2196f3',
    },
    secondary: {
      main: '#f50057',
    },
  },
  typography: {
    fontFamily: '"Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", sans-serif',
  },
});

function App() {
  const [filters, setFilters] = useState<FilterCondition[]>(() => {
    try {
      const raw = localStorage.getItem('filters_v1');
      return raw ? (JSON.parse(raw) as FilterCondition[]) : [];
    } catch {
      return [];
    }
  });

  const [appliedFilters, setAppliedFilters] = useState<FilterCondition[]>(filters);
  const debounceRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    // debounce saving and applying filters to avoid excessive work while typing
    window.clearTimeout(debounceRef.current);
    debounceRef.current = window.setTimeout(() => {
      setAppliedFilters(filters);
      try {
        localStorage.setItem('filters_v1', JSON.stringify(filters));
      } catch {}
    }, 200);
    return () => window.clearTimeout(debounceRef.current);
  }, [filters]);

  const [employees, setEmployees] = useState(() => sampleEmployeeData);
  const [fieldDefinitions, setFieldDefinitions] = useState<FieldDefinition[]>(() => defaultFieldDefinitions);

  useEffect(() => {
    let mounted = true;
    const fetchData = async () => {
      try {
        const [eRes, fRes] = await Promise.all([
          fetch('/api/employees').then((r) => r.json()),
          fetch('/api/fields').then((r) => r.json()),
        ]);
        if (!mounted) return;
        if (Array.isArray(eRes) && eRes.length) setEmployees(eRes);
        if (Array.isArray(fRes) && fRes.length) setFieldDefinitions(fRes);
      } catch {
        // fallback to embedded data
      }
    };
    fetchData();
    return () => {
      mounted = false;
    };
  }, []);

  const filteredData = useMemo(() => applyFilters(employees, appliedFilters), [employees, appliedFilters]);

  const handleExportJSON = () => exportJSON(filteredData, 'filtered-employees.json');
  const handleExportCSV = () => exportCSV(filteredData, 'filtered-employees.csv');

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ mb: 4 }}>
          <h1 style={{ margin: '0 0 8px 0', fontSize: '2rem', color: '#333' }}>
            Dynamic Filter Component System
          </h1>
          <p style={{ margin: 0, color: '#666', fontSize: '1rem' }}>
            Real-time filtering of employee data with advanced filtering capabilities
          </p>
        </Box>

        <FilterBuilder
          filters={filters}
          onFiltersChange={setFilters}
          fieldDefinitions={fieldDefinitions}
        />

        <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
          <Button variant="outlined" onClick={handleExportCSV}>
            Export CSV
          </Button>
          <Button variant="outlined" onClick={handleExportJSON}>
            Export JSON
          </Button>
        </Stack>

        <Box sx={{ backgroundColor: 'white', borderRadius: '4px' }}>
          <DataTable data={filteredData} totalRecords={sampleEmployeeData.length} />
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
