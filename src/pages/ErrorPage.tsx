import React from 'react';
import { Box, Typography, Button, Paper, useTheme } from '@mui/material';
import { AlertTriangle } from 'lucide-react';
import { Link as RouterLink } from 'react-router-dom';

const ErrorPage: React.FC = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        py: 8,
        px: { xs: 2, md: 4 },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'calc(100vh - 160px)',
      }}
    >
      <Paper
        sx={{
          p: 5,
          borderRadius: 4,
          textAlign: 'center',
          maxWidth: 600,
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
          bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.9)',
        }}
      >
        <AlertTriangle
          size={80}
          color={theme.palette.error.main}
          strokeWidth={1.5}
          style={{ marginBottom: '1.5rem' }}
        />
        
        <Typography variant="h3" component="h1" gutterBottom color="error.main" fontWeight="bold">
          Oops! Something went wrong
        </Typography>
        
        <Typography variant="h6" component="p" sx={{ mb: 4, color: theme.palette.text.secondary }}>
          We're sorry, but we encountered an error while processing your request.
        </Typography>
        
        <Box sx={{ mb: 4, py: 3, px: 4, bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)', borderRadius: 2 }}>
          <Typography variant="body1" component="p" sx={{ fontFamily: 'monospace', textAlign: 'left' }}>
            Error: The application encountered an unexpected error.<br />
            Location: {window.location.pathname}<br />
            Time: {new Date().toLocaleString()}
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => window.location.reload()}
            sx={{ px: 3, py: 1 }}
          >
            Refresh Page
          </Button>
          <Button
            variant="contained"
            color="primary"
            component={RouterLink}
            to="/"
            sx={{ px: 3, py: 1 }}
          >
            Go Home
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default ErrorPage;