import React from 'react';
import { Box, Typography, Paper, GridLegacy as Grid, Divider, List, ListItem, ListItemIcon, ListItemText, useTheme } from '@mui/material';
import { CheckCircle, PackageIcon, Share2, Database, Moon } from 'lucide-react';

const AboutPage: React.FC = () => {
  const theme = useTheme();
  //Uncomment this line to throw an Error to check whether About Page error
  // throw new Error("About page error");

  return (
    <Box sx={{ py: 4, px: { xs: 2, md: 4 } }}>
      <Typography 
        variant="h2" 
        component="h1" 
        gutterBottom 
        sx={{ 
          mb: 4, 
          color: theme.palette.mode === 'dark' ? 'primary.light' : 'primary.dark',
          fontWeight: 'bold'
        }}
      >
        About This App
      </Typography>

      <Paper sx={{ p: 4, mb: 4, borderRadius: 2, boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
        <Typography variant="h5" component="h2" gutterBottom>
          This Loan Calculator App is a modern, single-page web application built using <strong>React JS</strong> and <strong>Material UI</strong>. It allows users to calculate loan EMIs (Equated Monthly Installments), view a detailed amortization schedule, and see real-time currency conversions of their EMI using live exchange rates.
        </Typography>

        <Divider sx={{ my: 4 }} />

        <Grid container spacing={4}>
          
          
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Share2 size={28} color={theme.palette.primary.main} />
              <Typography variant="h6" component="h3" sx={{ ml: 1, fontWeight: 'bold' }}>
                Features
              </Typography>
            </Box>
            <List>
              <ListItem>
                <ListItemIcon>
                  <CheckCircle color={theme.palette.secondary.main} size={20} />
                </ListItemIcon>
                <ListItemText primary="Loan EMI calculation using standard financial formulas" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckCircle color={theme.palette.secondary.main} size={20} />
                </ListItemIcon>
                <ListItemText primary="Dynamic amortization schedule table with monthly breakdown" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckCircle color={theme.palette.secondary.main} size={20} />
                </ListItemIcon>
                <ListItemText primary="Real-time currency conversion of EMI using a live exchange rate API" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckCircle color={theme.palette.secondary.main} size={20} />
                </ListItemIcon>
                <ListItemText primary="Paginated exchange rate table for 160+ currencies" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckCircle color={theme.palette.secondary.main} size={20} />
                </ListItemIcon>
                <ListItemText primary="Dark/Light mode toggle for a customizable experience" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckCircle color={theme.palette.secondary.main} size={20} />
                </ListItemIcon>
                <ListItemText primary="Collapsible header navigation on mobile screens" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckCircle color={theme.palette.secondary.main} size={20} />
                </ListItemIcon>
                <ListItemText primary="Fully responsive UI built with Material UI" />
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Database size={28} color={theme.palette.primary.main} />
              <Typography variant="h6" component="h3" sx={{ ml: 1, fontWeight: 'bold' }}>
                Technologies Used
              </Typography>
            </Box>
            <List>
              <ListItem>
                <ListItemIcon>
                  <CheckCircle color={theme.palette.secondary.main} size={20} />
                </ListItemIcon>
                <ListItemText primary="React (Hooks, Routing, Context API)" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckCircle color={theme.palette.secondary.main} size={20} />
                </ListItemIcon>
                <ListItemText primary="Material UI for styling and responsive components" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckCircle color={theme.palette.secondary.main} size={20} />
                </ListItemIcon>
                <ListItemText primary="Axios for API calls" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckCircle color={theme.palette.secondary.main} size={20} />
                </ListItemIcon>
                <ListItemText primary="Exchange Rate API for real-time currency conversion" />
              </ListItem>
            </List>
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 4 }} />
        
        <Grid container spacing={4}>
          
          
          <Grid item xs={12} md={12}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Moon size={28} color={theme.palette.primary.main} />
              <Typography variant="h6" component="h3" sx={{ ml: 1, fontWeight: 'bold' }}>
                EMI Formula Used
              </Typography>
            </Box>
            <Typography variant="body1" paragraph>
              The EMI (Equated Monthly Installment) is calculated using the standard formula:
            </Typography>
            <Paper sx={{ p: 2, bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)', mb: 2 }}>
              <Typography variant="body2" sx={{ fontFamily: 'monospace', fontSize: '1rem' }}>
                EMI = [P × R × (1+R)ᴺ] / [(1+R)ᴺ - 1]
              </Typography>
            </Paper>
            <Typography variant="body1">Where:</Typography>
            <List>
              <ListItem>
                <ListItemText primary="P = Principal loan amount" />
              </ListItem>
              <ListItem>
                <ListItemText primary="R = Monthly interest rate (annual rate / 12 / 100)" />
              </ListItem>
              <ListItem>
                <ListItemText primary="N = Loan duration in months" />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Paper>

      <Box sx={{ my: 4, p: 3, bgcolor: 'primary.main', color: 'white', borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom>
          Currency Conversion API
        </Typography>
        <Typography variant="body1">
          This app integrates with the free tier of the ExchangeRate-API to fetch live exchange rates.
        </Typography>
        <Typography variant="body2" sx={{ mt: 2 }}>
          API Endpoint Example: https://v6.exchangerate-api.com/v6/YOUR_API_KEY/latest/USD
        </Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          You must register and obtain a free API key to use this endpoint. Then, replace YOUR_API_KEY in the app code with your actual key.
        </Typography>
      </Box>
    </Box>
  );
};

export default AboutPage;