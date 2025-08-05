// src/reducers/transactionFormReducer.ts
import type {TransactionType } from '../types/index.ts';

//1. Define the State Shape for your form
export interface TransactionFormState {
    description: string;
    amount: string; //Keep as string for input, parse on submit
    type: TransactionType;
    categoryId: string;
    date: string;
    // Optional: add validation error states if you want
    errors: {
    description?: string;
    amount?: string;
    categoryId?: string;
    }
}

//2. Define the Action Types
export type TransactionFormAction = 
| { type: 'SET_FIELD'; field: keyof Omit<TransactionFormState, 'errors'>; value: string | TransactionType }
| { type: 'RESET_FORM' }
| { type: 'SET_ERRORS'; errors: TransactionFormState['errors'] }; // If adding error handling

//3. Define the Initial State 
export const initialTransactionFormState: TransactionFormState = {
    description: '',
    amount: '',
    type: 'expense', 
    categoryId: '',
    date: new Date().toISOString().slice(0, 10), //YYYY-MM-DD
    errors: {}, 
};

// 4. Create the Reducer Function
export function transactionFormReducer(
    state: TransactionFormState, 
    action: TransactionFormAction, ): TransactionFormState {
        switch (action.type) {
            case 'SET_FIELD':
                return {
                    ...state, 
                    [action.field]: action.value,
                    // When type changes, clear categoryId as it might not be valid for the new type
                    ...(action.field === 'type' && { categoryId: '' }),
                };
                case 'RESET_FORM':
                    return initialTransactionFormState;
                    // case 'SET_ERRORS':
                    // return { ...state, errors: action.errors };
                    default: 
                    return state;
        }
    }