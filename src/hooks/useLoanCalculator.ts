import { useState, useCallback } from 'react';
import type {AmortizationEntry} from '../types';
import type {LoanCalculationResult} from '../types';

const useLoanCalculator = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<LoanCalculationResult | null>(null);

  const calculateLoan = useCallback((principal: number, interestRate: number, loanTermYears: number) => {
    setLoading(true);
    setError(null);

    try {
      // Convert annual interest rate to monthly and decimal form
      const monthlyInterestRate = interestRate / 100 / 12;
      const loanTermMonths = loanTermYears * 12;

      // Calculate monthly payment using the formula: P * r * (1+r)^n / [(1+r)^n - 1]
      const monthlyPayment = principal * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, loanTermMonths) / 
                          (Math.pow(1 + monthlyInterestRate, loanTermMonths) - 1);
      
      // Create amortization schedule
      let remainingBalance = principal;
      const amortizationSchedule: AmortizationEntry[] = [];

      for (let month = 1; month <= loanTermMonths; month++) {
        // Calculate interest for this month
        const interestPayment = remainingBalance * monthlyInterestRate;
        
        // Calculate principal for this month
        const principalPayment = monthlyPayment - interestPayment;
        
        // Update remaining balance
        remainingBalance -= principalPayment;
        
        // Ensure we don't have negative balance due to rounding
        if (remainingBalance < 0) remainingBalance = 0;
        
        // Add entry to schedule
        amortizationSchedule.push({
          month,
          payment: monthlyPayment,
          principal: principalPayment,
          interest: interestPayment,
          remainingBalance
        });
      }

      // Calculate total interest
      const totalInterest = monthlyPayment * loanTermMonths - principal;
      const totalPayment = monthlyPayment * loanTermMonths;

      // Set results
      setResult({
        monthlyPayment,
        totalInterest,
        totalPayment,
        amortizationSchedule
      });

      setLoading(false);
      return true;
    } catch (err) {
      setError('Error calculating loan. Please check your inputs.');
      setLoading(false);
      return false;
    }
  }, []);

  const resetCalculator = useCallback(() => {
    setResult(null);
    setError(null);
  }, []);

  return {
    calculateLoan,
    resetCalculator,
    result,
    loading,
    error
  };
};

export default useLoanCalculator;