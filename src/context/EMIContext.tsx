import React, { createContext, useContext, useState } from 'react';

interface EMIContextType {
  monthlyEMI: number | null;
  setMonthlyEMI: (emi: number | null) => void;
}

const EMIContext = createContext<EMIContextType | undefined>(undefined);

export const EMIProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [monthlyEMI, setMonthlyEMI] = useState<number | null>(null);

  return (
    <EMIContext.Provider value={{ monthlyEMI, setMonthlyEMI }}>
      {children}
    </EMIContext.Provider>
  );
};

export const useEMI = () => {
  const context = useContext(EMIContext);
  if (!context) {
    throw new Error('useEMI must be used within an EMIProvider');
  }
  return context;
};