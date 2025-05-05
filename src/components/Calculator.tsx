import React, { useState, useEffect } from 'react';

import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  GridLegacy as Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  
  InputAdornment,
  Alert,
  useTheme as useMuiTheme
} from '@mui/material';
import type {SelectChangeEvent} from "@mui/material"
import useLoanCalculator from '../hooks/useLoanCalculator';
import useCurrencyConverter from '../hooks/useCurrencyCalculator';


const Calculator: React.FC = () => {
  const theme = useMuiTheme();
  const [loanAmount, setLoanAmount] = useState<number>(100000);
  const [interestRate, setInterestRate] = useState<number>(8.5);
  const [loanTerm, setLoanTerm] = useState<number>(5);
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [formError, setFormError] = useState<string | null>(null);

  const { calculateLoan, resetCalculator, result, loading, error } = useLoanCalculator();
  const { 
    convertAmount, 
    exchangeRates, 
    changeBaseCurrency, 
    loading: currencyLoading 
  } = useCurrencyConverter();

  // Handle form submission
  const handleCalculate = () => {
    setFormError(null);
    
    // Validate inputs
    if (!loanAmount || loanAmount <= 0) {
      setFormError('Please enter a valid loan amount');
      return;
    }
    
    if (!interestRate || interestRate <= 0) {
      setFormError('Please enter a valid interest rate');
      return;
    }
    
    if (!loanTerm || loanTerm <= 0) {
      setFormError('Please enter a valid loan term');
      return;
    }
    
    // Calculate loan
    calculateLoan(loanAmount, interestRate, loanTerm);
  };

  // Handle currency change
  const handleCurrencyChange = (event: SelectChangeEvent) => {
    setSelectedCurrency(event.target.value);
    changeBaseCurrency(event.target.value);
  };

  // Handle reset table
  const handleResetTable = () => {
    resetCalculator();
  };

  // Common currencies
  const currencies = [
    { code: 'USD', name: 'US Dollar', symbol: '$' },
    { code: 'EUR', name: 'Euro', symbol: '€' },
    { code: 'GBP', name: 'British Pound', symbol: '£' },
    { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
    { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
    { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
    { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
  ];

  // Get currency symbol
  const getCurrencySymbol = (code: string): string => {
    const currency = currencies.find(c => c.code === code);
    return currency ? currency.symbol : '$';
  };

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
        Loan Calculator Dashboard
      </Typography>

      <Card 
        sx={{ 
          mb: 4, 
          borderRadius: 2,
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          transition: 'all 0.3s ease'
        }}
      >
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <TextField
                label="Loan Amount"
                type="number"
                fullWidth
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      {getCurrencySymbol(selectedCurrency)}
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="Interest Rate (%)"
                type="number"
                fullWidth
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                InputProps={{
                  endAdornment: <InputAdornment position="end">%</InputAdornment>,
                }}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="Term (Years)"
                type="number"
                fullWidth
                value={loanTerm}
                onChange={(e) => setLoanTerm(Number(e.target.value))}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleCalculate}
                disabled={loading}
                sx={{ 
                  px: 4, 
                  py: 1.5,
                  fontWeight: 'bold',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 20px rgba(0,0,0,0.15)'
                  }
                }}
              >
                {loading ? 'Calculating...' : 'CALCULATE'}
              </Button>
            </Grid>
          </Grid>

          {formError && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {formError}
            </Alert>
          )}

          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}
        </CardContent>
      </Card>

      {result && (
        <>
          <Box 
            sx={{ 
              mb: 4, 
              p: 3, 
              borderRadius: 2, 
              bgcolor: 'primary.main', 
              color: 'white',
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
            }}
          >
            <Typography variant="h3" gutterBottom>
              Monthly EMI: {getCurrencySymbol(selectedCurrency)}{result.monthlyPayment.toFixed(2)}
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, mt: 2 }}>
              <FormControl sx={{ minWidth: 200, mr: { xs: 0, md: 2 }, mb: { xs: 2, md: 0 } }}>
                <InputLabel id="currency-label">Currency</InputLabel>
                <Select
                  labelId="currency-label"
                  value={selectedCurrency}
                  label="Currency"
                  onChange={handleCurrencyChange}
                  size="small"
                  sx={{ color: 'white', '.MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255, 255, 255, 0.5)' } }}
                >
                  {currencies.map((currency) => (
                    <MenuItem key={currency.code} value={currency.code}>
                      {currency.code} - {currency.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button
                variant="outlined"
                color="inherit"
                onClick={handleResetTable}
                sx={{ 
                  borderColor: 'rgba(255, 255, 255, 0.5)',
                  '&:hover': {
                    borderColor: 'white',
                    bgcolor: 'rgba(255, 255, 255, 0.1)'
                  }
                }}
              >
                Reset Table
              </Button>
            </Box>
          </Box>
          
          
        </>
      )}
    </Box>
  );
};

export default Calculator;