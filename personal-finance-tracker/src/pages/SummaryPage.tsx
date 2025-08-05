import React, { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchTransactions, fetchCategories } from '../api';
import type { Transaction, Category, DailySummary, CategorySummary } from '../types';

const SummaryPage: React.FC = () => {
    const { data: transactions, isLoading: isLoadingTransactions, error: transactionsError } = useQuery<Transaction[]>({
        queryKey: ['transactions'],
        queryFn: fetchTransactions,
    }); 

    const {data: categories, isLoading: isLoadingCategories, error: categoriesError } = useQuery<Category[]>({
        queryKey: ['categories'],
        queryFn: fetchCategories,
    });

    // A memoized hoot to calculate all summaries. This prevents re-calculation on every re-render.
    const summaryData = useMemo(() => {
        if (!transactions || !categories) {
            return {
                totalIncome: 0, 
                totalExpense: 0, 
                netBalance: 0,
                dailySummaries: [],
                categorySummaries: [],
            };
        }
    
    // Calculate totals
    const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

    const totalExpense = transactions   
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);


    const netBalance = totalIncome - totalExpense; 

    // Calculate daily summaries
    const dailySummariesMap = new Map<string, { totalIncome: number; totalExpense: number }>();
    transactions.forEach((t) => {
        const date = t.date;
        if (!dailySummariesMap.has(date)) {
            dailySummariesMap.set(date, {totalIncome: 0, totalExpense: 0 });
        }
        const summary = dailySummariesMap.get(date)!;
        if (t.type === 'income') {
            summary.totalIncome += t.amount;
        } else {
            summary.totalExpense += t.amount;
        }
    });
    
    const dailySummaries: DailySummary[] = Array.from(dailySummariesMap.entries()).map(([date, totals]) => ({
        date, 
        ...totals, 
        netAmount: totals.totalIncome - totals.totalExpense,
    }));

    // Calculate category summaries
    const categorySummariesMap = new Map<string, { totalAmount: number; type: 'income' | 'expense' }>();
    transactions.forEach((t) => {
        const category = categories.find((c) => c.id === t.categoryId);
        if (!category) return;

        if (!categorySummariesMap.has(category.id)) {
            categorySummariesMap.set(category.id, { totalAmount: 0, type: category.type });
        }
        const summary = categorySummariesMap.get(category.id)!;
        summary.totalAmount += t.amount;
    });

    const categorySummaries: CategorySummary[] = Array.from(categorySummariesMap.entries()).map(([categoryId, totals]) => {
        const categoryName = categories.find((c) => c.id === categoryId)?.name || 'N/A';
        return {
            categoryName, 
            totalAmount: totals.totalAmount, 
            type: totals.type,
        };
    });

    return {
        totalIncome, 
        totalExpense, 
        netBalance, 
        dailySummaries: dailySummaries.sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime()),
        categorySummaries, 
    };
    }, [transactions, categories]);

    if (isLoadingTransactions || isLoadingCategories) {
        return <div className="text-center p-4">Loading financial summary...</div>;
    }

    if (transactionsError || categoriesError) {
        return (
            <div className="text-center p-4" style={{ color: 'red' }}>
                Error: {transactionsError?.message || categoriesError?.message}
            </div>
        );
    }

    return (
        <div className="card-panel">
            <h2>Financial Summary</h2>

            <div className="summary-cards">
                <div className="summary-card income-card">
                    <h3>Total Income</h3>
                    <p className="amount-income">${summaryData.totalIncome.toFixed(2)}</p>
                </div>
                <div className="summary-card expense-card">
                    <h3>Total Expenses</h3>
                    <p className="amount-expense">${summaryData.totalExpense.toFixed(2)}</p>
                </div>
                <div className="summary-card balance-card">
                    <h3>Net Balance</h3>
                    <p className={`amount-${summaryData.netBalance >=0 ? 'income' : 'expense'}`}>
                        ${summaryData.netBalance.toFixed(2)}
                    </p>
                </div>
            </div>

            <div className="mb-6" />

            <h3 className="textlg mb-6">Spending byCategory</h3>
            {summaryData.categorySummaries.length > 0 ? (
                <div className="table-container">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Category</th>
                                <th style={{ textAlign: 'right'}}>Total Spent</th>
                            </tr>
                        </thead>
                        <tbody>
                            {summaryData.categorySummaries.filter(s => s.type === 'expense').map((summary, index) => (
                                <tr key={index}>
                                    <td>{summary.categoryName}</td>
                                    <td className="amount-expense">${summary.totalAmount.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p>No category spending data available.</p>
            )}

            <div className="mb-6" />

            <h3 className="text-lg mb-6">Income by Category</h3>
            {summaryData.categorySummaries.length > 0 ? (
                <div className="table-container">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Category</th>
                                <th style={{ textAlign: 'right' }}>Total Earned</th>
                            </tr>
                        </thead>
                        <tbody>
                            {summaryData.categorySummaries.filter(s => s.type === 'income').map((summary, index) => (
                                <tr key={index}>
                                    <td>{summary.categoryName}</td>
                                    <td className="amount-income">${summary.totalAmount.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    </div>
            ) : (
                <p>No category income data available.</p>
            )}
        </div>
    );
};
            
export default SummaryPage;