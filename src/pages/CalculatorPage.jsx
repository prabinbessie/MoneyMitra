import React from 'react';
import EmiCalculator from '../components/Calculators/EmiCalculator';

const CalculatorPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Loan Calculator</h1>
      <div className="max-w-lg mx-auto">
        <EmiCalculator />
      </div>
    </div>
  );
};

export default CalculatorPage;