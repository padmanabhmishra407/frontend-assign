import React from 'react';
import { Box, Typography, Link } from '@mui/material';

export default function Header() {
  return (
    <Box className="site-header" sx={{ mb: 4 }}>
      <Box className="site-brand" sx={{ display: 'flex', alignItems: 'center' }}>
        <svg width="40" height="40" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <rect width="100" height="100" rx="18" fill="#0ea5a4" />
          <g transform="translate(18 24)" fill="#fff">
            <rect x="0" y="0" width="64" height="10" rx="3" />
            <rect x="0" y="18" width="40" height="10" rx="3" />
            <rect x="0" y="36" width="20" height="10" rx="3" />
          </g>
        </svg>
        <Box sx={{ ml: 2 }}>
          <Typography variant="h5" component="div" sx={{ fontWeight: 700 }}>
            Dynamic Filter Studio
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Type-safe, reusable filters for complex datasets
          </Typography>
        </Box>
      </Box>
      <Box sx={{ mt: 2 }}>
        <Typography variant="caption" color="text.secondary">
          Demo: <Link href="/frontend-assign/" underline="hover">Live site</Link> • Job: Frontend React Developer
        </Typography>
      </Box>
    </Box>
  );
}
