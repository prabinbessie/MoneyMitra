# MoneyMitra - Personal Finance Tracker

[![Deploy to Firebase](https://github.com/prabinbessie/MoneyMitra/actions/workflows/firebase-hosting-merge.yml/badge.svg)](https://github.com/prabinbessie/MoneyMitra/actions/workflows/firebase-hosting-merge.yml)

MoneyMitra is a comprehensive **personal finance management app** built using **React** and **Firebase**. It helps you track expenses, manage loans, visualize financial data, and stay financially informed with a modern and responsive interface.

## Features

- Expense and income tracking
- Financial dashboard with charts
- Loan management with reminders
- Responsive mobile-friendly UI
- Push and email notifications *(coming in V2)*
- Offline support with Firestore
- Loan EMI calculator

## Tech Stack

- **Frontend**: React, Tailwind CSS, Chart.js
- **Backend**: Firebase (Firestore, Auth,)
- **CI/CD**: GitHub 

## Setup & Installation

1. Clone the repository:
```bash
git clone https://github.com/prabinbessie/MoneyMitra.git
cd MoneyMitra
```
2. Install dependencies:
```bash
npm install
```
3. Firebase setup:
* Create a Firebase project at Firebase Console
- Enable: Authentication (Email/Password/Gmsil),Firestore Database
- Add your Firebase config to `src/api/firebase.js` or Create a `.Env`
4. Run locally:
```bash
npm run dev
```
Then visit: http://localhost:5173
## Project Structure
MoneyMitra/
├── public/
├── src/
│   ├── api/
│   │   └── firebase.js
│   ├── components/
│   │   ├── Dashboard/
│   │   │   ├── Chart.jsx
│   │   │   └── Overview.jsx
│   │   ├── Loans/
│   │   │   ├── LoanForm.jsx
│   │   │   ├── LoanList.jsx
│   │   │   └── LoanDetails.jsx
│   │   ├── Transactions/
│   │   │   ├── TxnForm.jsx
│   │   │   └── TxnList.jsx
│   │   ├── Calculators/
│   │   │   └── EmiCalculator.jsx
│   │   └── UI/
│   │       ├── Navbar.jsx
│   │       ├── Sidebar.jsx
│   │       ├── Button.jsx
│   │       ├── Modal.jsx
│   │       └── Notification.jsx
│   ├── contexts/
│   │   └── AuthContext.jsx
│   ├── hooks/
│   ├── pages/
│   │   ├── DashboardPage.jsx
│   │   ├── TransactionsPage.jsx
│   │   ├── LoansPage.jsx
│   │   ├── ReportsPage.jsx
│   │   ├── SettingsPage.jsx
│   │   ├── CalculatorPage.jsx
│   │   ├── LoginPage.jsx
│   │   └── SignupPage.jsx
│   ├── routes/
│   │   └── PrivateRoute.jsx
│   ├── utils/
│   │   └── helpers.js
│   ├── App.jsx
│   └── main.jsx
├── .env
├── .firebaserc
├── firebase.json
├── firestore.indexes.json
├── firestore.rules
├── package.json
└── README.md
