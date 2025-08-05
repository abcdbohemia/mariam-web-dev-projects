import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchTransactions, deleteTransaction, fetchCategories } from '../api';
import type { Transaction } from '../types/index';

const TransactionsPage: React.FC = () => {
    const queryClient = useQueryClient();

    const {
        data: transactions, 
        isLoading: isLoadingTransactions, 
        error: transactionsError,
    } = useQuery<Transaction[]>({
        queryKey: ['transactions'],
        queryFn: fetchTransactions,
    });

    const {
        data: categories, 
        isLoading: isLoadingCategories, 
        error: categoriesError, 
    } = useQuery({
        queryKey: ['categories'], 
        queryFn: fetchCategories, 
    }); 

    const deleteMutation = useMutation({
        mutationFn: deleteTransaction, 
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['transactions'] });
            queryClient.invalidateQueries({ queryKey: ['summary'] });
        },
        onError: (error) => {
            console.error('Error deleting transaction:', error);
            alert('Failed to delete transaction.');
        },
    });

    if (isLoadingTransactions || isLoadingCategories) {
        return <div className="text-center p-4">Loading transactions...</div>;
    }

    if (transactionsError || categoriesError) {
        return (
            <div className="text-center p-r" style={{ color: 'red' }}> 
            Error: {transactionsError?.message || categoriesError?.message}
            </div>
        );
    }

    const getCategoryName = (categoryId: string) => {
        return categories?.find((cat) => cat.id === categoryId)?.name || 'N/A';
    };

    const handleDelete = (id: string) => {
        if (window.confirm('Are you sure you want to delete this transaction?')) {
            deleteMutation.mutate(id);
        }
     };

     return (
        <div className="card-panel">
            <h2>All Transactions</h2>
            {transactions && transactions.length === 0 ? (
                <p>No transactions found. Add some!</p>
            ): (
                <div className="table-container">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Description</th>
                                <th>Category</th>
                                <th style={{ textAlign: 'right'}}>Amount</th>
                                <th>Type</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions?.map((transaction) => (
                            <tr key={transaction.id}>
                              <td>
                                {new Date(transaction.date).toLocaleDateString()}
                              </td>
                              <td>
                                {transaction.description}
                              </td>
                              <td>
                                {getCategoryName(transaction.categoryId)}
                              </td>
                              <td
                                className={
                                    transaction.type === 'income' ? 'amount-income' : 'amount-expense'
                                }
                               >
                                {transaction.type === 'expense' ? '_' : ''}
                                ${transaction.amount.toFixed(2)}
                               </td>
                               <td>
                                <button
                                onClick={() => handleDelete(transaction.id)}
                                disabled={deleteMutation.isPending}
                                className="btn btn-danger"
                                >
                                {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
                                </button>
                               </td>
                            </tr>
                     ))}
                     </tbody>
                    </table>
                </div>
            )}
        </div>
     );
    };

    export default TransactionsPage;