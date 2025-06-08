import React, { useState } from 'react';
import { Timestamp } from 'firebase/firestore';
import { useAuth } from '../../contexts/AuthContext';
import { addDoc, collection, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../api/firebase';
import Button from '../UI/Button';

const LoanForm = ({ loan = null, onClose, onSuccess }) => {
  const { currentUser } = useAuth();
  const [formData, setFormData] = useState({
    counterparty: loan?.counterparty || '',
    principal: loan?.principal || '',
    rate: loan?.rate || '',
    startDate: loan?.startDate?.toDate().toISOString().split('T')[0] || new Date().toISOString().split('T')[0],
    dueDate: loan?.dueDate?.toDate().toISOString().split('T')[0] || new Date(Date.now() + 30*24*60*60*1000).toISOString().split('T')[0],
    type: loan?.type || 'taken',
    notes: loan?.notes || ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!formData.counterparty || !formData.principal) {
      setError('Counterparty and principal are required');
      return;
    }

    try {
      setLoading(true);
      const loanData = {
        ...formData,
        principal: Number(formData.principal),
        rate: Number(formData.rate),
        startDate: Timestamp.fromDate(new Date(formData.startDate)),
        dueDate: Timestamp.fromDate(new Date(formData.dueDate)),
        sent: false
      };

      if (loan) {
        // Update existing loan
        await updateDoc(
          doc(db, 'users', currentUser.uid, 'loans', loan.id),
          loanData
        );
      } else {
        // Add new loan
        await addDoc(
          collection(db, 'users', currentUser.uid, 'loans'),
          loanData
        );
      }

      onSuccess();
    } catch (err) {
      setError('Failed to save loan: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="text-red-500">{error}</div>}
      
      <div>
        <label className="block mb-1">Counterparty</label>
        <input
          type="text"
          name="counterparty"
          value={formData.counterparty}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Name or organization"
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-1">Principal Amount</label>
          <input
            type="number"
            name="principal"
            value={formData.principal}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            step="0.01"
            min="0"
          />
        </div>
        
        <div>
          <label className="block mb-1">Interest Rate (%)</label>
          <input
            type="number"
            name="rate"
            value={formData.rate}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            step="0.1"
            min="0"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-1">Start Date</label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        
        <div>
          <label className="block mb-1">Due Date</label>
          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
      </div>
      
      <div>
        <label className="block mb-1">Loan Type</label>
        <div className="flex space-x-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="type"
              value="taken"
              checked={formData.type === 'taken'}
              onChange={handleChange}
              className="mr-2"
            />
            <span>Loan Taken</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="type"
              value="given"
              checked={formData.type === 'given'}
              onChange={handleChange}
              className="mr-2"
            />
            <span>Loan Given</span>
          </label>
        </div>
      </div>
      
      <div>
        <label className="block mb-1">Notes</label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          rows="3"
          placeholder="Additional details about the loan"
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
          {loan ? 'Update' : 'Add'} Loan
        </Button>
      </div>
    </form>
  );
};

export default LoanForm;