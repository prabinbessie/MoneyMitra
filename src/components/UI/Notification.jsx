import React, { useState, useEffect } from 'react';
import { query, collection, where, getDocs, Timestamp } from 'firebase/firestore';
import { db } from '../../api/firebase';
import { useAuth } from '../../contexts/AuthContext';
import { BellIcon, XMarkIcon } from '@heroicons/react/24/outline';

const Notification = () => {
  const { currentUser } = useAuth();
  const [showNotification, setShowNotification] = useState(false);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    if (!currentUser) return;

    const checkLoanReminders = async () => {
      try {
        const loansQuery = query(
          collection(db, 'users', currentUser.uid, 'loans'),
          where('dueDate', '>=', Timestamp.now()),
          where('dueDate', '<=', Timestamp.fromDate(new Date(Date.now() + 86400000))) // next 24 hours
        );
        
        const loanSnapshot = await getDocs(loansQuery);
        if (!loanSnapshot.empty) {
          const loan = loanSnapshot.docs[0].data();
          setNotification({
            title: 'Loan Payment Due',
            body: `${loan.counterparty} loan payment is due soon!`
          });
          setShowNotification(true);
          setTimeout(() => setShowNotification(false), 5000);
        }
      } catch (error) {
        console.error('Loan reminder error:', error);
      }
    };

    // Check every 4 hours
    const interval = setInterval(checkLoanReminders, 4 * 60 * 60 * 1000);
    checkLoanReminders(); // initial run

    return () => clearInterval(interval);
  }, [currentUser]);

  if (!showNotification || !notification) return null;

  return (
    <div className="fixed top-4 right-4 z-50 w-80 bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="flex justify-between items-start p-4 bg-blue-500 text-white">
        <div className="flex items-center">
          <BellIcon className="h-5 w-5 mr-2" />
          <h3 className="font-bold">{notification.title}</h3>
        </div>
        <button 
          onClick={() => setShowNotification(false)}
          className="text-white hover:text-blue-200"
        >
          <XMarkIcon className="h-5 w-5" />
        </button>
      </div>
      <div className="p-4 text-gray-700">
        <p>{notification.body}</p>
      </div>
    </div>
  );
};

export default Notification;
