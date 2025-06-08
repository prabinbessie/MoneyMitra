import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../api/firebase';
import { useAuth } from '../contexts/AuthContext';
// import Overview from '../components/Dashboard/Overview';
// import RecentTransactions from '../components/Transactions/TxnList';
// import UpcomingLoans from '../components/Loans/LoanList';
import Chart from '../components/Dashboard/Chart';
import { calculateBalance, filterRecentTransactions } from '../utils/helpers';

const DashboardPage = () => {
  const { currentUser } = useAuth();
  const [balance, setBalance] = useState(0);
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!currentUser) return;

      try {
        // Fetch transactions
        const txnQuery = query(
          collection(db, 'users', currentUser.uid, 'transactions')
        );
        const txnSnapshot = await getDocs(txnQuery);
        const txns = txnSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        // Calculate balance
        const { totalBalance, totalIncome, totalExpenses } = calculateBalance(txns);
        setBalance(totalBalance);
        setIncome(totalIncome);
        setExpenses(totalExpenses);
        
        // Get recent transactions
        const recentTxns = filterRecentTransactions(txns, 5);
        setTransactions(recentTxns);

        // Fetch loans
        const loanQuery = query(
          collection(db, 'users', currentUser.uid, 'loans'),
          where('dueDate', '>=', new Date())
        );
        const loanSnapshot = await getDocs(loanQuery);
        const loanData = loanSnapshot.docs.map(doc => ({ 
          id: doc.id, 
          ...doc.data(),
          dueDate: doc.data().dueDate.toDate() 
        }));
        setLoans(loanData);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentUser]);

  if (loading) return <div className="text-center py-8">Loading dashboard...</div>;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        {/* <Overview balance={balance} income={income} expenses={expenses} /> */}
        <Chart transactions={transactions} />
      </div>
      
      <div className="space-y-6">
        {/* <RecentTransactions transactions={transactions} limit={5} /> */}
        {/* <UpcomingLoans loans={loans} limit={3} /> */}
      </div>
    </div>
  );
};

export default DashboardPage;