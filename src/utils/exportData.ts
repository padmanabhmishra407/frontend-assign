import type { EmployeeData } from '../types';

export const exportJSON = (data: EmployeeData[], filename = 'data.json') => {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};

const escapeCsv = (value: any) => {
  if (value === null || value === undefined) return '';
  const str = typeof value === 'string' ? value : String(value);
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return '"' + str.replace(/"/g, '""') + '"';
  }
  return str;
};

export const exportCSV = (data: EmployeeData[], filename = 'data.csv') => {
  if (data.length === 0) return exportJSON(data, filename.replace(/\.csv$/, '.json'));

  const columns = [
    'id',
    'name',
    'email',
    'department',
    'role',
    'salary',
    'joinDate',
    'isActive',
    'skills',
    'address.city',
    'address.state',
    'address.country',
    'projects',
    'lastReview',
    'performanceRating',
  ];

  const rows = data.map((row) =>
    columns
      .map((col) => {
        if (col.startsWith('address.')) {
          const key = col.split('.')[1];
          return escapeCsv((row as any).address?.[key]);
        }
        const val = (row as any)[col];
        if (Array.isArray(val)) return escapeCsv(val.join('; '));
        return escapeCsv(val);
      })
      .join(',')
  );

  const csv = [columns.join(','), ...rows].join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};
