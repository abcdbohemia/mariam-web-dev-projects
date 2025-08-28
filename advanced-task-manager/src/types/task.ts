// src/types/task.ts

//TaskType is an interface which describes what properties an object must have and the data types of those properties. 
export interface TaskType {
    id: number;
    title: string;
    description: string;
    status: 'pending' | 'in-progress' | 'completed';
    //status has string literal type, meaning it can only be one of these three exact string values and no other string. 
    priority: 'low' | 'medium' | 'high';
    dueDate: string; // ISO 8601 format: YYYY-MM-DD
}

export type NewTask = Omit<TaskType, 'id'>;
//This is Omit utility type in TypeScript. Omit<T, K> --takes
//the existing type (T) and removes specified properties (K)