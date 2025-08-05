// src/api/index.ts

import type { Category, NewTransactionPayload, Transaction } from '../types';

const BASE_URL = 'http://localhost:3001'; //Your JSON Server URL

export const fetchTransactions = async (): Promise<Transaction[]> => {
    const response = await fetch(`${BASE_URL}/transactions`);
    if (!response.ok) throw new Error('Failed to fetch categories');
    return response.json();
};

export const fetchCategories = async (): Promise<Category[]> => {
    const response = await fetch(`${BASE_URL}/categories`);
    if (!response.ok) throw new Error('Failed to fetch transactions');
    return response.json();
};

export const addTransaction = async (
    newTransaction: NewTransactionPayload, 
): Promise<Transaction> => {
    const transactionWithMeta = {
        ...newTransaction, 
        id: Date.now().toString(), //Simple unique ID for JSON server
        createdAt: new Date().toISOString(),
    };
    const response = await fetch(`${BASE_URL}/transactions`, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(transactionWithMeta),
    });
    if (!response.ok) throw new Error('Failed to add transaction');
    return response.json();
};

// <void> means - Promise won’t deliver any usable data.

export const deleteTransaction = async (id: string): Promise<void> => {
    const response = await fetch(`${BASE_URL}/transactions/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete transaction');
};

//You can add updateTransaction later