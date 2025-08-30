import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { NewTask, TaskType } from '../types/task';
import './CreateTaskForm.css';

// This function saves the new task to Local Storage
const saveTaskToLocalStorage = async (newTask: NewTask): Promise<void> => {
  const storedTasks = localStorage.getItem('tasks');
  const tasks: TaskType[] = storedTasks ? JSON.parse(storedTasks) : [];
  tasks.push({ ...newTask, id: Date.now() });
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

export const CreateTaskForm: React.FC = () => {
    const queryClient = useQueryClient();
    const [formData, setFormData] = useState<NewTask>({
        title: '',
        description: '',
        status: 'pending',
        priority: 'medium',
        dueDate: '',
        // This is the initial state for the formData variable
    });

    const {mutate, isPending, isError, error } = useMutation({
        mutationFn: saveTaskToLocalStorage,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
            //invalidate the cache ffor the useQuery hook that is in the App component, mark it as stale
            //prompting the App to refetch the latest task list from the server
            setFormData({
                title: '',
                description: '',
                status: 'pending',
                priority: 'medium',
                dueDate: '',
            });
        },
    });
                          // This is an onchange event hence React.ChangeEvent typescript type
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target; //destructuring
        setFormData(prevData => ({
            ...prevData, //spread syntax, it takes all the key-value pairs from the prev state and copies them into a new object
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        mutate(formData);
    };

    return (
    <div className="form-container">
      <h2>Add New Task</h2>
      <form onSubmit={handleSubmit} className="task-form">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          value={formData.title}
          onChange={handleChange}
          required
        />
        
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <label htmlFor="status">Status</label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In-Progress</option>
          <option value="completed">Completed</option>
        </select>

        <label htmlFor="priority">Priority</label>
        <select
          id="priority"
          name="priority"
          value={formData.priority}
          onChange={handleChange}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        
        <label htmlFor="dueDate">Due Date</label>
        <input
          id="dueDate"
          name="dueDate"
          type="date"
          value={formData.dueDate}
          onChange={handleChange}
          required
        />
        
        <button type="submit" disabled={isPending}>
          {isPending ? 'Adding...' : 'Add Task'}
        </button>

        {isError && <p className="error-message">Error: {error.message}</p>}
      </form>
    </div>
  );
};