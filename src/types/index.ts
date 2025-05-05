export type ExchangeRateData = {
    result: string;
    base_code: string;
    conversion_rates: Record<string, number>;
  };

  export type LoanCalculationResult = {
    monthlyPayment: number;
    totalInterest: number;
    totalPayment: number;
    amortizationSchedule: AmortizationEntry[];
  };
  
  export type AmortizationEntry = {
    month: number;
    payment: number;
    principal: number;
    interest: number;
    remainingBalance: number;
  };