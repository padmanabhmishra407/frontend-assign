import { useState, useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  TableSortLabel,
  Stack,
} from '@mui/material';
import type { EmployeeData, SortConfig } from '../types';

interface DataTableProps {
  data: EmployeeData[];
  totalRecords: number;
}

type SortKey = keyof EmployeeData;

export default function DataTable({ data, totalRecords }: DataTableProps) {
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: 'name' as SortKey,
    direction: 'asc',
  });

  const sortedData = useMemo(() => {
    const sorted = [...data].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });

    return sorted;
  }, [data, sortConfig]);

  const handleSort = (key: SortKey) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const formatSalary = (salary: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(salary);
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <Box>
      <Stack direction="row" spacing={3} sx={{ mb: 2 }}>
        <Box>
          <span style={{ fontWeight: 500, marginRight: 8 }}>Total Records:</span>
          <span style={{ fontSize: '1.1rem', fontWeight: 600, color: '#2196f3' }}>
            {totalRecords}
          </span>
        </Box>
        <Box>
          <span style={{ fontWeight: 500, marginRight: 8 }}>Filtered Records:</span>
          <span style={{ fontSize: '1.1rem', fontWeight: 600, color: '#4caf50' }}>
            {data.length}
          </span>
        </Box>
      </Stack>

      {data.length === 0 ? (
        <Paper sx={{ p: 2, textAlign: 'center', backgroundColor: '#fbfbfd' }}>
          <p style={{ color: '#999', margin: 0 }}>
            No results found. Try adjusting your filters.
          </p>
        </Paper>
      ) : (
        <TableContainer component={Paper} sx={{ boxShadow: 1 }}>
          <Table size="small">
            <TableHead sx={{ backgroundColor: '#fafafa' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 600, width: '12%' }}>
                  <TableSortLabel
                    active={sortConfig.key === 'name'}
                    direction={sortConfig.key === 'name' ? sortConfig.direction : 'asc'}
                    onClick={() => handleSort('name')}
                  >
                    Name
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ fontWeight: 600, width: '18%' }}>Email</TableCell>
                <TableCell sx={{ fontWeight: 600, width: '12%' }}>
                  <TableSortLabel
                    active={sortConfig.key === 'department'}
                    direction={sortConfig.key === 'department' ? sortConfig.direction : 'asc'}
                    onClick={() => handleSort('department')}
                  >
                    Department
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ fontWeight: 600, width: '12%' }}>Role</TableCell>
                <TableCell sx={{ fontWeight: 600, width: '10%' }} align="right">
                  <TableSortLabel
                    active={sortConfig.key === 'salary'}
                    direction={sortConfig.key === 'salary' ? sortConfig.direction : 'asc'}
                    onClick={() => handleSort('salary')}
                  >
                    Salary
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ fontWeight: 600, width: '11%' }}>
                  <TableSortLabel
                    active={sortConfig.key === 'joinDate'}
                    direction={sortConfig.key === 'joinDate' ? sortConfig.direction : 'asc'}
                    onClick={() => handleSort('joinDate')}
                  >
                    Join Date
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ fontWeight: 600, width: '8%' }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 600, width: '8%' }} align="center">
                  <TableSortLabel
                    active={sortConfig.key === 'projects'}
                    direction={sortConfig.key === 'projects' ? sortConfig.direction : 'asc'}
                    onClick={() => handleSort('projects')}
                  >
                    Projects
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ fontWeight: 600, width: '9%' }} align="center">
                  <TableSortLabel
                    active={sortConfig.key === 'performanceRating'}
                    direction={sortConfig.key === 'performanceRating' ? sortConfig.direction : 'asc'}
                    onClick={() => handleSort('performanceRating')}
                  >
                    Rating
                  </TableSortLabel>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedData.map((record) => (
                <TableRow
                  key={record.id}
                  sx={{
                    '&:hover': { backgroundColor: '#f8fafd' },
                    '&:nth-of-type(even)': { backgroundColor: '#ffffff' },
                  }}
                >
                  <TableCell sx={{ fontWeight: 500, py: 0.8 }}>{record.name}</TableCell>
                  <TableCell sx={{ fontSize: '0.9rem', color: '#666', py: 0.8 }}>{record.email}</TableCell>
                  <TableCell>{record.department}</TableCell>
                  <TableCell sx={{ fontSize: '0.9rem', py: 0.8 }}>{record.role}</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 500, py: 0.8 }}>
                    {formatSalary(record.salary)}
                  </TableCell>
                  <TableCell sx={{ fontSize: '0.9rem', py: 0.8 }}>{formatDate(record.joinDate)}</TableCell>
                  <TableCell>
                    <span
                      style={{
                        display: 'inline-block',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '0.85rem',
                        fontWeight: 500,
                        backgroundColor: record.isActive ? '#e8f5e9' : '#ffebee',
                        color: record.isActive ? '#2e7d32' : '#c62828',
                      }}
                    >
                      {record.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </TableCell>
                  <TableCell align="center" sx={{ py: 0.8 }}>{record.projects}</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 600, py: 0.8 }}>
                    {record.performanceRating.toFixed(1)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}
