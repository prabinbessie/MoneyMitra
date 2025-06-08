// Calculate balance, income, expenses
export const calculateBalance = (transactions) => {
    let totalIncome = 0;
    let totalExpenses = 0;
    
    transactions.forEach(txn => {
      if (txn.type === 'income') {
        totalIncome += txn.amount;
      } else if (txn.type === 'expense') {
        totalExpenses += txn.amount;
      }
    });
    
    return {
      totalBalance: totalIncome - totalExpenses,
      totalIncome,
      totalExpenses
    };
  };
  
  // recent transactions
  export const filterRecentTransactions = (transactions, n) => {
    return [...transactions]
      .sort((a, b) => b.date.toDate() - a.date.toDate())
      .slice(0, n);
  };
  
  // Format currency based on settings
  export const formatCurrency = (amount, currency = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits: 2
    }).format(amount);
  };
  
  // Format date
  export const formatDate = (timestamp, timeZone = 'UTC') => {
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      timeZone
    });
  };