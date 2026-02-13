import { Box, Typography } from '@mui/material';

interface HeaderProps {
  onToggleFilters?: () => void;
  filtersVisible?: boolean;
}

export default function Header({ onToggleFilters, filtersVisible }: HeaderProps) {
  return (
    <Box className="site-header" sx={{ mb: 3, pb: 1, borderBottom: '1px solid #eef2f6' }}>
      <Box className="site-brand" sx={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <svg width="40" height="40" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <rect width="100" height="100" rx="18" fill="#0ea5a4" />
          <g transform="translate(18 24)" fill="#fff">
            <rect x="0" y="0" width="64" height="10" rx="3" />
            <rect x="0" y="18" width="40" height="10" rx="3" />
            <rect x="0" y="36" width="20" height="10" rx="3" />
          </g>
        </svg>
          <Box sx={{ ml: 2, flex: '1 1 auto' }}>
          <Typography variant="h6" component="div" sx={{ fontWeight: 700, letterSpacing: '-0.2px' }}>
            Dynamic Filter Studio
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.9rem' }}>
            Type-safe, reusable filters for complex datasets
          </Typography>
        </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {onToggleFilters && (
              <Box component="button" onClick={onToggleFilters} aria-pressed={!filtersVisible} aria-label="Toggle filters" style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}>
                {filtersVisible ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 9h12M6 15h8" stroke="#0ea5a4" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 6h16M10 12h10M6 18h8" stroke="#0ea5a4" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                )}
              </Box>
            )}
          </Box>
      </Box>
      {/* caption removed per request */}
    </Box>
  );
}
