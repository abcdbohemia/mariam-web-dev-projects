// src/components/Task.tsx
import React, { useState } from 'react';
import type { TaskType, NewTask } from '../types/task';
import './Task.css';
import { useMutation, useQueryClient } from '@tanstack/react-query';

// Acts as a gatekeeper: formally and explicitly declare what the Task component expects to receive.
interface TaskProps {
    task: TaskType;
}
//The TaskProps object must have a key named task, and the value of that key must be of type TaskType

//Function to handle the DELETE request
const deleteTask = async (taskId: number): Promise<void> => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/tasks/${taskId}`, {
        method: 'DELETE',
    });
    if (!res.ok) {
        throw new Error('Failed to delete task');
    }
};

//Function to handle the PUT request (for updating)
const updateTask= async (updatedTask: TaskType): Promise<void> => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/tasks/${updatedTask.id}`, {
       method: 'PUT',
       headers: {
        'Content-Type': 'application/json',
       }, 
       body: JSON.stringify(updatedTask),
    });
    if (!res.ok) {
        throw new Error('Failed to update task');
    }
};

//This component will receive props, and they will conform to the TaskProps 
// interface I defined earlier
export const Task: React.FC<TaskProps> = ({ task }) => {
    //task is passed as a prop to Task component in App.tsx
    // {} distracturing allows you to use task directly inside
    //  the component instead of writing props.task

    // when specifying the types of props a component receives 
    // in TypeScript, it happens after the name of the component

    const queryClient = useQueryClient();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState<NewTask>({
        title: task.title, 
        description: task.description, 
        status: task.status,
        priority: task.priority, 
        dueDate: task.dueDate,
    });
    //creating a new object in memory -an independent (mutable) copy of the original prop, not a reference to it
    //*In React, props are immutable. This means a component should never,
    //  ever modify the props it receives. If you want to change data 
    // that comes from a prop, you must first create a copy of that data 
    // and store it in the component's state.

    //Use useMutation for deleting a task
    //Aliasing, giving them more descriptive names
    const {mutate: deleteMutate, isPending: isDeleting } = useMutation({
        mutationFn: deleteTask, 
        onSuccess: () => {
            //Invalidate the 'tasks' query to refetch the list from the server
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
        },
     });

     const {mutate: updateMutate, isPending: isUpdating } = useMutation({
        mutationFn: updateTask, 
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
            setIsEditing(false); //Exit editing mode on success
        },
     });

     const handleDelete = () => {
        //Call the mutate function with the task's ID
        deleteMutate(task.id);
     };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevData => ({...prevData, [name]: value }));
    };
    // Computed property name---> [name], means Go get the value stored in the name variable and 
    // use that string as the key for this property

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        updateMutate({...formData, id: task.id });
    };
    // when updateMutate is called, it takes the object { ...formData, id: task.id }
    //  and passes it as the updatedTask argument to the updateTask function.


    
    //Conditionally render based on isEditing state
    if(isEditing) {
        return (
            <form onSubmit={handleUpdate} className={`task-card status-${formData.status} editing-mode`}>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                />
                <select name="status" value={formData.status} onChange={handleChange}>
                    <option value="pending">Pending</option>
                    <option value="in-progress">In-progress</option>
                    <option value="completed">Completed</option>
                </select>
                <select name="priority" value={formData.priority} onChange={handleChange}>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
                <input 
                    type="date" 
                    name="dueDate" 
                    value={formData.dueDate} 
                    onChange={handleChange} 
                    required 
                />
                    <div className="task-actions">
                        <button type="submit" disabled={isUpdating}>
                          {isUpdating ? 'Updating...' : 'Save'}
                        </button>
                        <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
                    </div>
            </form>
        );
    }


    return (
        <div className={`task-card status-${task.status}`}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Status: <span className="status">{task.status}</span></p>
            <p>Priority: {task.priority}</p>
            <p>Due Date: {task.dueDate}</p>
            <div className="task-actions"> {/* Add a div for the buttons */}
                <button 
                className="edit-btn"
                onClick={() => setIsEditing(true)}
                >
                    Edit
                </button>
                <button 
                className="delete-btn"
                onClick={handleDelete}
                disabled={isDeleting}
                >
                    {isDeleting ? 'Deleting...' : 'Delete'}
                </button>
            </div>
        </div>
    );
};

//You can target PARTS OF THE CLASS NAME because each words in the className 
//attribute is treated as a seperate, distinct class by CSS.