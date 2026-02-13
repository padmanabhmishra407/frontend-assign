import { Box, Typography, Link } from '@mui/material';

export default function Header() {
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
        <Box sx={{ ml: 2 }}>
          <Typography variant="h6" component="div" sx={{ fontWeight: 700, letterSpacing: '-0.2px' }}>
            Dynamic Filter Studio
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.9rem' }}>
            Type-safe, reusable filters for complex datasets
          </Typography>
        </Box>
      </Box>
      <Box sx={{ mt: 1 }}>
        <Typography variant="caption" color="text.secondary">
          Demo: <Link href="/frontend-assign/" underline="hover">Live site</Link> • Frontend React Developer • Responsive demo
        </Typography>
      </Box>
    </Box>
  );
}
