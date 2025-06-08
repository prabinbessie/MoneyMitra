import React, { useState } from 'react';
import { Timestamp } from 'firebase/firestore';
import { useAuth } from '../../contexts/AuthContext';
import { addDoc, collection, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../api/firebase';
import Button from '../UI/Button';

const TxnForm = ({ transaction = null, onClose }) => {
  const { currentUser } = useAuth();
  const [formData, setFormData] = useState({
    type: transaction?.type || 'expense',
    amount: transaction?.amount || '',
    category: transaction?.category || '',
    date: transaction?.date?.toISOString().split('T')[0] || new Date().toISOString().split('T')[0],
    note: transaction?.note || '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const categories = [
    'Food', 'Transport', 'Housing', 'Utilities', 
    'Healthcare', 'Entertainment', 'Education',
    'Shopping', 'Salary', 'Freelance', 'Investment',
    'Gift', 'Other'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!formData.amount || !formData.category) {
      setError('Amount and category are required');
      return;
    }

    try {
      setLoading(true);
      const transactionData = {
        ...formData,
        amount: Number(formData.amount),
        date: Timestamp.fromDate(new Date(formData.date))
      };

      if (transaction) {
        // Update existing transaction
        await updateDoc(
          doc(db, 'users', currentUser.uid, 'transactions', transaction.id),
          transactionData
        );
      } else {
        // Add new transaction
        await addDoc(
          collection(db, 'users', currentUser.uid, 'transactions'),
          transactionData
        );
      }

      onClose();
    } catch (err) {
      setError('Failed to save transaction: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="text-red-500">{error}</div>}
      
      <div className="flex space-x-4">
        <div className="w-1/2">
          <label className="block mb-1">Type</label>
          <select 
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>
        
        <div className="w-1/2">
          <label className="block mb-1">Amount</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            step="0.01"
            min="0"
          />
        </div>
      </div>
      
      <div>
        <label className="block mb-1">Category</label>
        <select 
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="">Select category</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
      
      <div>
        <label className="block mb-1">Date</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
      
      <div>
        <label className="block mb-1">Note</label>
        <textarea
          name="note"
          value={formData.note}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          rows="2"
        />
      </div>
      
      <div className="flex justify-end space-x-2">
        <Button 
          type="button" 
          variant="secondary" 
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button 
          type="submit" 
          loading={loading}
        >
          {transaction ? 'Update' : 'Add'} Transaction
        </Button>
      </div>
    </form>
  );
};

export default TxnForm;