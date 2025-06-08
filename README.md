# MoneyMitra - Personal Finance Tracker

[![Deploy to Firebase](https://github.com/prabinbessie/MoneyMitra/actions/workflows/firebase-hosting-merge.yml/badge.svg)](https://github.com/prabinbessie/MoneyMitra/actions/workflows/firebase-hosting-merge.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.0+-blue.svg)](https://reactjs.org/)
[![Firebase](https://img.shields.io/badge/Firebase-9.0+-orange.svg)](https://firebase.google.com/)

MoneyMitra is a comprehensive **personal finance management application** built with modern web technologies. Track your expenses, manage loans, visualize financial data, and stay financially informed with an intuitive and responsive interface.

## 🚀 Features

### Core Functionality
- **💰 Expense & Income Tracking** - Record and categorize all your financial transactions
- **📊 Interactive Dashboard** - Visualize your financial data with dynamic charts and graphs
- **🏦 Loan Management** - Track loans with automated reminders and payment schedules
- **🧮 EMI Calculator** - Calculate loan EMIs with detailed breakdowns
- **📱 Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **🔐 Secure Authentication** - Firebase Auth with email/password and Google sign-in

### Advanced Features
- **📈 Financial Reports** - Generate detailed financial reports and insights
- **🔔 Smart Notifications** - Get reminders for upcoming payments and financial goals
- **💾 Offline Support** - Work seamlessly with Firestore offline capabilities
- **🎯 Budget Planning** - Set and track financial goals and budgets
- **📋 Transaction Categories** - Organize expenses with customizable categories

### Coming in V2
- **📧 Email Notifications** - Automated email alerts for important financial events
- **📱 Push Notifications** - Real-time mobile notifications
- **📊 Advanced Analytics** - AI-powered financial insights and predictions
- **🔄 Bank Integration** - Connect with banking APIs for automatic transaction import

## 🛠️ Tech Stack

| Technology | Purpose | Version |
|------------|---------|---------|
| **React** | Frontend Framework | 18.0+ |
| **Tailwind CSS** | Styling & UI Components | 3.0+ |
| **Chart.js** | Data Visualization | 4.0+ |
| **Firebase** | Backend Services | 9.0+ |
| **Firestore** | NoSQL Database | Latest |
| **Firebase Auth** | Authentication | Latest |
| **Vite** | Build Tool | Latest |
| **GitHub Actions** | CI/CD Pipeline | Latest |

## 🚦 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager
- Firebase account
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/prabinbessie/MoneyMitra.git
   cd MoneyMitra
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Firebase Configuration**
   
   a. Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
   
   b. Enable the following services:
   - **Authentication** (Email/Password, Google)
   - **Firestore Database**
   - **Hosting** (optional)
   
   c. Create a `.env` file in the root directory:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

4. **Configure Firestore Security Rules**
   ```javascript
   // firestore.rules
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /users/{userId}/{document=**} {
         allow read, write: if request.auth != null && request.auth.uid == userId;
       }
     }
   }
   ```

5. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. **Start Firebase Emulators** (optional for local development)
   ```bash
   firebase emulators:start
   ```

Visit [http://localhost:5173](http://localhost:5173) to view the application.

##  Project Structure

```
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
```

## Deployment

### Firebase Hosting

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to Firebase**
   ```bash
   firebase deploy
   ```


## Usage Examples

### Adding a Transaction
```javascript
// Example transaction object
const transaction = {
  type: 'expense',
  amount: 50.00,
  category: 'Food',
  description: 'Lunch at restaurant',
  date: new Date(),
  userId: 'user123'
};
```

### Calculating EMI
```javascript
// EMI calculation
const loanAmount = 100000;
const interestRate = 8.5;
const tenure = 12; // months

const emi = calculateEMI(loanAmount, interestRate, tenure);
```

##  Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow the existing code style
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🐛 Issues & Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/prabinbessie/MoneyMitra/issues) page
2. Create a new issue with detailed information
3. Contact here `em8een@gmail.com`


## 📞 Contact
**GitHub**: [@prabinbessie](https://github.com/prabinbessie)  
**Project Link**: [https://github.com/prabinbessie/MoneyMitra](https://github.com/prabinbessie/MoneyMitra)

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - Frontend framework
- [Firebase](https://firebase.google.com/) - Backend services
- [Tailwind CSS](https://tailwindcss.com/) - Styling framework
- [Chart.js](https://www.chartjs.org/) - Data visualization
- [Lucide React](https://lucide.dev/) - Icon library

---

<div align="center">
  <sub>Built with ❤️ by <a href="https://github.com/prabinbessie">Prabin Bessie</a></sub>
</div>