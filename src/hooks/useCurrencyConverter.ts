import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import {type ExchangeRateData} from '../types';

// Replace with your actual API key when using
const API_KEY = import.meta.env.VITE_REACT_APP_API_KEY;
const BASE_URL = import.meta.env.VITE_EXCHANGE_API_URI;

const useCurrencyConverter = (baseCurrency: string = 'USD') => {
  const [exchangeRates, setExchangeRates] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [baseCurrencyState, setBaseCurrencyState] = useState(baseCurrency);

  // Fetch exchange rates
  const fetchRates = useCallback(async (currency: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get<ExchangeRateData>(
        `${BASE_URL}/${API_KEY}/latest/${currency}`
      );

      if (response.data.result === 'success') {
        console.log(response);
        setExchangeRates(response.data.conversion_rates);
      } else {
        throw new Error('Failed to fetch exchange rates');
      }
    } catch (err) {
      setError('Failed to fetch exchange rates');
      // Fallback to mock data for development
      const mockRates: Record<string, number> = {
        USD: 1,
        EUR: 0.93,
        GBP: 0.79,
        JPY: 150.37,
        CAD: 1.36,
        AUD: 1.52,
        INR: 83.12,
      };
      setExchangeRates(mockRates);
    } finally {
      setLoading(false);
    }
  }, []);

  // Change base currency
  const changeBaseCurrency = useCallback((newBaseCurrency: string) => {
    setBaseCurrencyState(newBaseCurrency);
    fetchRates(newBaseCurrency);
  }, [fetchRates]);

  // Convert amount from base currency to target currency
  const convertAmount = useCallback(
    (amount: number, targetCurrency: string): number => {
      if (!exchangeRates || !exchangeRates[targetCurrency]) {
        return amount;
      }
      return amount * exchangeRates[targetCurrency];
    },
    [exchangeRates]
  );

  // Fetch rates on mount and when base currency changes
  useEffect(() => {
    fetchRates(baseCurrencyState);
  }, [baseCurrencyState, fetchRates]);

  return {
    exchangeRates,
    loading,
    error,
    convertAmount,
    changeBaseCurrency,
    baseCurrency: baseCurrencyState,
  };
};

export default useCurrencyConverter;