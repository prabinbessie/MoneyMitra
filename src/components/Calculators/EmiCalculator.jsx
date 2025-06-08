import React, { useState } from 'react';
import Button from '../UI/Button';

const EmiCalculator = () => {
  const [principal, setPrincipal] = useState(100000);
  const [rate, setRate] = useState(8.5);
  const [tenure, setTenure] = useState(12);
  const [emi, setEmi] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  const calculateEMI = () => {
    const monthlyRate = rate / 12 / 100;
    const emiValue = principal * monthlyRate * Math.pow(1 + monthlyRate, tenure) / 
                     (Math.pow(1 + monthlyRate, tenure) - 1);
    
    const total = emiValue * tenure;
    const interest = total - principal;
    
    setEmi(emiValue.toFixed(2));
    setTotalInterest(interest.toFixed(2));
    setTotalAmount(total.toFixed(2));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">EMI Calculator</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block mb-1">Loan Amount (₹)</label>
          <input
            type="range"
            min="1000"
            max="10000000"
            step="1000"
            value={principal}
            onChange={(e) => setPrincipal(Number(e.target.value))}
            className="w-full"
          />
          <div className="text-right">₹{principal.toLocaleString()}</div>
        </div>
        
        <div>
          <label className="block mb-1">Interest Rate (% per annum)</label>
          <input
            type="range"
            min="1"
            max="30"
            step="0.1"
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            className="w-full"
          />
          <div className="text-right">{rate}%</div>
        </div>
        
        <div>
          <label className="block mb-1">Loan Tenure (months)</label>
          <input
            type="range"
            min="1"
            max="360"
            step="1"
            value={tenure}
            onChange={(e) => setTenure(Number(e.target.value))}
            className="w-full"
          />
          <div className="text-right">{tenure} months</div>
        </div>
        
        <Button onClick={calculateEMI} className="w-full">
          Calculate EMI
        </Button>
        
        {emi > 0 && (
          <div className="mt-6 space-y-2 bg-blue-50 p-4 rounded-lg">
            <div className="flex justify-between">
              <span>Monthly EMI:</span>
              <span className="font-bold">₹{emi}</span>
            </div>
            <div className="flex justify-between">
              <span>Total Interest:</span>
              <span className="font-bold">₹{totalInterest}</span>
            </div>
            <div className="flex justify-between">
              <span>Total Amount:</span>
              <span className="font-bold">₹{totalAmount}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmiCalculator;