import React, { useEffect, useRef } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import { formatCurrency } from '../../utils/helpers';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const Chart = ({ transactions, detailed = false }) => {
  const chartRef = useRef(null);

  //for charts
  const processData = () => {
    const incomeByCategory = {};
    const expensesByCategory = {};
    const monthlyData = {};

    transactions.forEach(txn => {
      const month = txn.date.toDate().toLocaleString('default', { month: 'short' });
      
      if (txn.type === 'income') {
        incomeByCategory[txn.category] = (incomeByCategory[txn.category] || 0) + txn.amount;
      } else {
        expensesByCategory[txn.category] = (expensesByCategory[txn.category] || 0) + txn.amount;
      }
      
      if (!monthlyData[month]) {
        monthlyData[month] = { income: 0, expenses: 0 };
      }
      
      if (txn.type === 'income') {
        monthlyData[month].income += txn.amount;
      } else {
        monthlyData[month].expenses += txn.amount;
      }
    });

    // Sort
    const months = Object.keys(monthlyData).sort((a, b) => {
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      return monthNames.indexOf(a) - monthNames.indexOf(b);
    });

    return { incomeByCategory, expensesByCategory, monthlyData, months };
  };

  const { incomeByCategory, expensesByCategory, monthlyData, months } = processData();

  // Bar chart data
  const barData = {
    labels: months,
    datasets: [
      {
        label: 'Income',
        data: months.map(month => monthlyData[month]?.income || 0),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'Expenses',
        data: months.map(month => monthlyData[month]?.expenses || 0),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
    ],
  };

  // Pie chart data for expenses
  const pieData = {
    labels: Object.keys(expensesByCategory),
    datasets: [
      {
        data: Object.values(expensesByCategory),
        backgroundColor: [
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', 
          '#9966FF', '#FF9F40', '#8AC926', '#1982C4',
          '#6A4C93', '#F15BB5'
        ],
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            return `${context.dataset.label}: ${formatCurrency(context.raw)}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => formatCurrency(value)
        }
      }
    }
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.raw || 0;
            const total = context.chart.getDatasetMeta(0).total;
            const percentage = Math.round((value / total) * 100);
            return `${label}: ${formatCurrency(value)} (${percentage}%)`;
          }
        }
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Monthly Summary</h3>
        <Bar ref={chartRef} data={barData} options={barOptions} />
      </div>
      
      {detailed && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Income Breakdown</h3>
            {Object.keys(incomeByCategory).length > 0 ? (
              <ul className="space-y-2">
                {Object.entries(incomeByCategory)
                  .sort((a, b) => b[1] - a[1])
                  .map(([category, amount]) => (
                    <li key={category} className="flex justify-between">
                      <span>{category}</span>
                      <span className="font-medium">{formatCurrency(amount)}</span>
                    </li>
                  ))}
              </ul>
            ) : (
              <p className="text-gray-500">No income data</p>
            )}
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Expense Breakdown</h3>
            {Object.keys(expensesByCategory).length > 0 ? (
              <Pie data={pieData} options={pieOptions} />
            ) : (
              <p className="text-gray-500">No expense data</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Chart;