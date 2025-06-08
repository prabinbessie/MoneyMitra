import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../../api/firebase';
import Button from './Button';

const Navbar = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-blue-600">Finance Tracker</Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link to="/" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">Dashboard</Link>
              <Link to="/transactions" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">Transactions</Link>
              <Link to="/loans" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">Loans</Link>
              <Link to="/reports" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">Reports</Link>
              <Link to="/calculator" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">Calculator</Link>
              <Link to="/settings" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">Settings</Link>
            </div>
          </div>
          
          <div className="flex items-center">
            {currentUser ? (
              <Button variant="secondary" onClick={handleLogout}>Logout</Button>
            ) : (
              <Link to="/login">
                <Button variant="primary">Login</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;