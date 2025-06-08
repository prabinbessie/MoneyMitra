import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../api/firebase';
import { useAuth } from '../contexts/AuthContext';
import Chart from '../components/Dashboard/Chart';
import { calculateBalance } from '../utils/helpers';

const ReportsPage = () => {
  const { currentUser } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!currentUser) return;

      try {
        const txnQuery = collection(db, 'users', currentUser.uid, 'transactions');
        const txnSnapshot = await getDocs(txnQuery);
        const txns = txnSnapshot.docs.map(doc => ({ 
          id: doc.id, 
          ...doc.data(),
          date: doc.data().date
        }));
        setTransactions(txns);
      } catch (error) {
        console.error("Error fetching transactions for reports:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [currentUser]);

  if (loading) return <div className="text-center py-8">Loading reports...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Reports</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <Chart transactions={transactions} detailed={true} />
      </div>
    </div>
  );
};

export default ReportsPage;