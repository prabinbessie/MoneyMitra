import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../api/firebase';
import { useAuth } from '../contexts/AuthContext';
// import TxnList from '../components/Transactions/TxnList';
import TxnForm from '../components/Transactions/TxnForm';
import Button from '../components/UI/Button';
import Modal from '../components/UI/Modal';
import { formatCurrency } from '../utils/helpers';

const TransactionsPage = () => {
  const { currentUser } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingTxn, setEditingTxn] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchTransactions = async () => {
    if (!currentUser) return;

    try {
      const txnQuery = collection(db, 'users', currentUser.uid, 'transactions');
      const txnSnapshot = await getDocs(txnQuery);
      const txns = txnSnapshot.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data(),
        date: doc.data().date //FirestoreTimestamp
      }));
      setTransactions(txns);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [currentUser]);

  const handleEdit = (txn) => {
    setEditingTxn(txn);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingTxn(null);
  };

  const handleSuccess = () => {
    fetchTransactions();
    handleCloseForm();
  };

  if (loading) return <div className="text-center py-8">Loading transactions...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Transactions</h1>
        <Button onClick={() => setShowForm(true)}>
          Add Transaction
        </Button>
      </div>

      <TxnList transactions={transactions} onEdit={handleEdit} />

      <Modal isOpen={showForm} onClose={handleCloseForm}>
        <TxnForm 
          transaction={editingTxn} 
          onClose={handleCloseForm}
          onSuccess={handleSuccess}
        />
      </Modal>
    </div>
  );
};

export default TransactionsPage;