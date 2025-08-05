// src/types/index.ts

export type TransactionType = 'income' | 'expense';

export interface Category {
    id: string;
    name: string; 
    type: TransactionType;
}

export interface Transaction {
    id: string;
    description: string;
    amount: number;
    type: TransactionType; // 'income' or 'expense'
    categoryId: string; //Refers to Category.id
    date: string; // ISO 8601 string, e.g., 'YY-MM-DD'
    createdAt: string; // ISO 8601 string for creation timestamp
}

export interface NewTransactionPayload {
    description: string; 
    amount: number; 
    type: TransactionType;
    categoryId: string; 
    date: string;
}

// Optional: for summaries 
export interface DailySummary {
    date: string; 
    totalIncome: number; 
    totalExpense: number; 
    netAmount: number;
}

export interface CategorySummary {
    categoryName: string;
    totalAmount: number;
    type: TransactionType;
}