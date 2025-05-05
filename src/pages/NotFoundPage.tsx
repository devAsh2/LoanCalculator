import React from 'react';
import { Box, Typography, Button, Paper, useTheme } from '@mui/material';
import { FileQuestion } from 'lucide-react';
import { Link as RouterLink } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
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
        <FileQuestion
          size={80}
          color={theme.palette.primary.main}
          strokeWidth={1.5}
          style={{ marginBottom: '1.5rem' }}
        />
        
        <Typography variant="h2" component="h1" gutterBottom fontWeight="bold">
          404
        </Typography>
        
        <Typography variant="h4" component="p" sx={{ mb: 3 }}>
          Page Not Found
        </Typography>
        
        <Typography variant="body1" sx={{ mb: 4 }}>
          We couldn't find the page you're looking for. The page might have been removed, renamed, or is temporarily unavailable.
        </Typography>
        
        <Button
          variant="contained"
          color="primary"
          component={RouterLink}
          to="/"
          size="large"
          sx={{ px: 4, py: 1.5 }}
        >
          Back to Home
        </Button>
      </Paper>
    </Box>
  );
};

export default NotFoundPage;