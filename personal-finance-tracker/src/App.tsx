// src/App.tsx

import { Link, Route, Routes } from 'react-router-dom';
import TransactionsPage from './pages/TransactionsPage.tsx';
import SummaryPage from './pages/SummaryPage.tsx';
import HomePage from './pages/HomePage.tsx';
import AddTransactionPage from './pages/AddTransactionPage';

function App() {
  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="navbar-content">
          <Link to="/" className="navbar-brand">
          Finance Tracker
          </Link>
          <ul className="navbar-links">
            <li>
              <Link to="/" className="navbar-link">
              Home
              </Link>
            </li>
            <li>
              <Link to="/transactions" className="navbar-link">
              Transactions
              </Link>
            </li>
            <li>
              <Link to="/summary" className="navbar-link">
              Summary
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/transactions" element={<TransactionsPage />} />
          <Route path="/add" element={<AddTransactionPage />} />
          <Route path="/summary" element={<SummaryPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;