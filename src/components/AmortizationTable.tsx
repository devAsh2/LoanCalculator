import React, { useState } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Typography,
  useTheme
} from '@mui/material';
import type { AmortizationEntry } from '../types';

interface AmortizationTableProps {
  amortizationSchedule: AmortizationEntry[];
  currencyCode: string;
}

const AmortizationTable: React.FC<AmortizationTableProps> = ({ 
  amortizationSchedule, 
  currencyCode 
}) => {
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Handle page change
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Format currency
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  // Get visible rows
  const visibleRows = amortizationSchedule.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box sx={{ width: '100%', mb: 6 }}>
      <Typography 
        variant="h4" 
        component="h2" 
        gutterBottom 
        sx={{ 
          mt: 4, 
          mb: 2,
          fontWeight: 500,
          color: theme.palette.mode === 'dark' ? 'primary.light' : 'primary.dark'
        }}
      >
        Amortization Schedule ({currencyCode})
      </Typography>
      
      <Paper 
        sx={{ 
          width: '100%', 
          overflow: 'hidden',
          borderRadius: 2,
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          transition: 'all 0.3s ease',
        }}
      >
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="amortization table">
            <TableHead>
              <TableRow>
                <TableCell 
                  sx={{ 
                    fontWeight: 'bold', 
                    bgcolor: theme.palette.mode === 'dark' ? 'primary.dark' : 'primary.light',
                    color: theme.palette.mode === 'dark' ? 'white' : 'white'
                  }}
                >
                  Month
                </TableCell>
                <TableCell 
                  align="right"
                  sx={{ 
                    fontWeight: 'bold', 
                    bgcolor: theme.palette.mode === 'dark' ? 'primary.dark' : 'primary.light',
                    color: theme.palette.mode === 'dark' ? 'white' : 'white'
                  }}
                >
                  Principal
                </TableCell>
                <TableCell 
                  align="right"
                  sx={{ 
                    fontWeight: 'bold', 
                    bgcolor: theme.palette.mode === 'dark' ? 'primary.dark' : 'primary.light',
                    color: theme.palette.mode === 'dark' ? 'white' : 'white'
                  }}
                >
                  Interest
                </TableCell>
                <TableCell 
                  align="right"
                  sx={{ 
                    fontWeight: 'bold', 
                    bgcolor: theme.palette.mode === 'dark' ? 'primary.dark' : 'primary.light',
                    color: theme.palette.mode === 'dark' ? 'white' : 'white'
                  }}
                >
                  Remaining Balance
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {visibleRows.map((row) => (
                <TableRow
                  key={row.month}
                  sx={{ 
                    '&:nth-of-type(odd)': { 
                      bgcolor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)' 
                    },
                    '&:hover': {
                      bgcolor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.04)'
                    },
                    transition: 'background-color 0.2s ease'
                  }}
                >
                  <TableCell component="th" scope="row">
                    {row.month}
                  </TableCell>
                  <TableCell align="right">{formatCurrency(row.principal)} {currencyCode}</TableCell>
                  <TableCell align="right">{formatCurrency(row.interest)} {currencyCode}</TableCell>
                  <TableCell align="right">{formatCurrency(row.remainingBalance)} {currencyCode}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50, 100]}
          component="div"
          count={amortizationSchedule.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

export default AmortizationTable;