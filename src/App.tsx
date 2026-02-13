import { useState, useMemo, useEffect, useRef } from 'react';
import { Container, Box, ThemeProvider, createTheme, Stack, Button } from '@mui/material';
import FilterBuilder from './components/FilterBuilder';
import DataTable from './components/DataTable';
import Header from './components/Header';
import type { FilterCondition } from './types';
import { sampleEmployeeData, fieldDefinitions as defaultFieldDefinitions } from './data/sampleData';
import { applyFilters } from './utils/filterLogic';
import { exportJSON, exportCSV } from './utils/exportData';
import type { FieldDefinition } from './types';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0ea5a4',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#0f172a',
    },
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", sans-serif',
    button: { textTransform: 'none' },
  },
  shape: { borderRadius: 8 },
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
        <Header />

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '380px 1fr' }, gap: 24 }}>
          <Box sx={{ backgroundColor: '#fbfbfd', p: 2, borderRadius: 2, boxShadow: 1 }}>
            <FilterBuilder
              filters={filters}
              onFiltersChange={setFilters}
              fieldDefinitions={fieldDefinitions}
            />

                <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                  <Button variant="contained" color="primary" onClick={handleExportCSV} startIcon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 3v10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/><path d="M8 9l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/><path d="M21 21H3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>}>
                    Export CSV
                  </Button>
                  <Button variant="outlined" color="primary" onClick={handleExportJSON} startIcon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/><path d="M7 7h10v12H7z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>}>
                    Export JSON
                  </Button>
                </Stack>
          </Box>

          <Box sx={{ backgroundColor: 'white', borderRadius: 2, p: 1, boxShadow: 1 }}>
            <DataTable data={filteredData} totalRecords={sampleEmployeeData.length} />
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
