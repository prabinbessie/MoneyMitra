import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-64 bg-white shadow-md">
      <div className="p-4">
        <h2 className="text-lg font-semibold">Navigation</h2>
      </div>
      <nav>
        <ul>
          <li>
            <NavLink 
              to="/" 
              className={({isActive}) => `block px-4 py-2 ${isActive ? 'bg-blue-100 text-blue-600' : 'text-gray-700 hover:bg-gray-50'}`}
              end
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/transactions" 
              className={({isActive}) => `block px-4 py-2 ${isActive ? 'bg-blue-100 text-blue-600' : 'text-gray-700 hover:bg-gray-50'}`}
            >
              Transactions
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/loans" 
              className={({isActive}) => `block px-4 py-2 ${isActive ? 'bg-blue-100 text-blue-600' : 'text-gray-700 hover:bg-gray-50'}`}
            >
              Loans
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/reports" 
              className={({isActive}) => `block px-4 py-2 ${isActive ? 'bg-blue-100 text-blue-600' : 'text-gray-700 hover:bg-gray-50'}`}
            >
              Reports
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/calculator" 
              className={({isActive}) => `block px-4 py-2 ${isActive ? 'bg-blue-100 text-blue-600' : 'text-gray-700 hover:bg-gray-50'}`}
            >
              Calculator
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/settings" 
              className={({isActive}) => `block px-4 py-2 ${isActive ? 'bg-blue-100 text-blue-600' : 'text-gray-700 hover:bg-gray-50'}`}
            >
              Settings
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;