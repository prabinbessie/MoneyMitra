import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../api/firebase';
import { useAuth } from '../contexts/AuthContext';
// import LoanList from '../components/Loans/LoanList';
import LoanForm from '../components/Loans/LoanForm';
import Button from '../components/UI/Button';
import Modal from '../components/UI/Modal';
import { formatCurrency, formatDate } from '../utils/helpers';

const LoansPage = () => {
  const { currentUser } = useAuth();
  const [loans, setLoans] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingLoan, setEditingLoan] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchLoans = async () => {
    if (!currentUser) return;

    try {
      const loanQuery = collection(db, 'users', currentUser.uid, 'loans');
      const loanSnapshot = await getDocs(loanQuery);
      const loanData = loanSnapshot.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data(),
        startDate: doc.data().startDate,
        dueDate: doc.data().dueDate
      }));
      setLoans(loanData);
    } catch (error) {
      console.error("Error fetching loans:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLoans();
  }, [currentUser]);

  const handleEdit = (loan) => {
    setEditingLoan(loan);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingLoan(null);
  };

  const handleSuccess = () => {
    fetchLoans();
    handleCloseForm();
  };

  if (loading) return <div className="text-center py-8">Loading loans...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Loans</h1>
        <Button onClick={() => setShowForm(true)}>
          Add Loan
        </Button>
      </div>

      <LoanList loans={loans} onEdit={handleEdit} />

      <Modal isOpen={showForm} onClose={handleCloseForm}>
        <LoanForm 
          loan={editingLoan} 
          onClose={handleCloseForm}
          onSuccess={handleSuccess}
        />
      </Modal>
    </div>
  );
};

export default LoansPage;