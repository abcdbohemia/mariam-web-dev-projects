import React, { useReducer } from 'react';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { addTransaction, fetchCategories } from '../api';
import type { Category, NewTransactionPayload } from '../types';
import { useNavigate } from 'react-router-dom';
import {
    transactionFormReducer, 
    initialTransactionFormState, 
} from '../reducers/transactionFormReducer';

import type {
 TransactionFormState, 
} from '../reducers/transactionFormReducer';

const AddTransactionPage: React.FC = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const [formState, dispatch] = useReducer(
        transactionFormReducer, 
        initialTransactionFormState,
    );

    const { data: categories, isLoading: isLoadingCategories } = useQuery<Category[]>({
        queryKey: ['categories'],
        queryFn: fetchCategories, 
    });

    const addMutation = useMutation({
        mutationFn: addTransaction, 
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['transactions'] });
            queryClient.invalidateQueries({ queryKey: ['summary'] });
            alert('Transaction added successfully!');
            dispatch({ type: 'RESET_FORM'});
            navigate('/transactions');
        },
        onError: (error) => {
            console.error('Error adding transaction:', error);
            alert('Failed to add transaction.');
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const parsedAmount = parseFloat(formState.amount);
        if (isNaN(parsedAmount) || parsedAmount <= 0) {
            alert('Please enter a valid positive amount.');
            return;
        }
        if (!formState.description.trim()) {
            alert('Please enter a description.');
            return;
        }
        if (!formState.categoryId) {
            alert('Please select a category.');
            return;
        }

        const newTransaction: NewTransactionPayload = {
            description: formState.description, 
            amount: parsedAmount, 
            type: formState.type, 
            categoryId: formState.categoryId, 
            date: formState.date,
        };

        addMutation.mutate(newTransaction);
    };

    if (isLoadingCategories) {
        return <div className="text-center p-4">Loading categories...</div>;
    }

    const incomeCategories = categories?.filter((cat) => cat.type === 'income');
    const expenseCategories = categories?.filter((cat) => cat.type === 'expense');

    return (
        <div className="card-panel max-w-lg mx-auto">
            <h2>Add New Transaction</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="form-group">
                    <label htmlFor="type" className="form-label">
                        Type
                    </label>
                    <select
                        id="type"
                        value={formState.type}
                        onChange={(e) =>
                            dispatch({
                                type: 'SET_FIELD',
                                field: 'type',
                                value: e.target.value as TransactionFormState['type'],
                            })
                        }
                        className="form-select"
                    >
                        <option value="expense">Expense</option>
                        <option value="income">Income</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="description" className="form-label">
                        Description
                    </label>
                    <input
                      type="text"
                      id="description"
                      value={formState.description}
                      onChange={(e) =>
                        dispatch({ type: 'SET_FIELD', field: 'description', value: e.target.value })
                      }
                      className="form-input"
                      placeholder="e.g., Groceries, Monthly Salary"
                      required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="amount" className="form-label">
                        Amount
                    </label>
                    <input
                        type="number"
                        id="amount"
                        value={formState.amount}
                        onChange={(e) =>
                            dispatch({ type: 'SET_FIELD', field: 'amount', value: e.target.value })
                        }
                        className="form-input"
                        placeholder="e.g., 50.00"
                        step="0.01"
                        min="0.01"
                        required
                        />
                </div>

                <div className="form-group">
                    <label htmlFor="category" className="form-label">
                        Category
                    </label>
                    <select
                    id="category"
                    value={formState.categoryId}
                    onChange={(e) =>
                        dispatch({ type: 'SET_FIELD', field: 'categoryId', value: e.target.value })
                    }
                    className="form-select"
                    required
                >
                    <option value="">Select a category</option>
                    {formState.type === 'expense' &&
                    expenseCategories?.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                            {cat.name}
                        </option>
                    ))}
                    {formState.type === 'income' &&
                    incomeCategories?.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                            {cat.name}
                        </option>
                    ))}
                </select>
                </div>

                <div className="form-group">
                    <label htmlFor="date" className="form-label">
                        Date
                    </label>
                    <input
                    type="date"
                    id="date"
                    value={formState.date}
                    onChange={(e) =>
                        dispatch({ type: 'SET_FIELD', field: 'date', value: e.target.value })
                    }
                    className="form-input"
                    required
                />
                </div>

                <button
                    type="submit"
                    disabled={addMutation.isPending}
                    className="btn btn-primary"
                >
                    {addMutation.isPending ? 'Adding...' : 'Add Transaction'}
                </button>
            </form>
        </div>
    );
};

export default AddTransactionPage;