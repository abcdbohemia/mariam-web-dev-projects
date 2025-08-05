import React from 'react';
import { Link } from 'react-router-dom';  //Using Link for client-side navigation

const HomePage: React.FC = () => {
    return (
        <div className="card-panel text-center p-8">
            <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
                Welcome to Your Personal Finance Tracker!
            </h1>
            <p className="text-lg text-gray-600 mb-6">
                Manage your income and expenses efficiently. 
            </p>
            <div className="flex justify-center space-x-4">
                <Link to="/add" className="btn btn-primary">
                Add New Transaction
                </Link>
                <Link to="/transactions" className="btn btn-secondary">
                View Transactions
                </Link>
            </div>
        </div>
    );
};

export default HomePage;