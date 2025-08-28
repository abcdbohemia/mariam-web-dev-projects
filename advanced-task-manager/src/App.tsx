// src/App.tsx
import { useQuery } from '@tanstack/react-query';
import { Task } from './components/Task';
import { CreateTaskForm } from './components/CreateTaskForm';
import type { TaskType } from './types/task';
import './App.css';

const fetchTasks = async (): Promise<TaskType[]> => {
  //I promise that the JSON data I get from the server 
  // will match the TaskType interface.
  const res = await fetch('http://localhost:3000/tasks');
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  return res.json();
};

function App() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['tasks'],
    queryFn: fetchTasks,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="app-container">
      <h1>Advanced Task Manager</h1>
      <CreateTaskForm />
      <div className="task-list">
        {data?.map(task => (
          <Task key={task.id} task={task} />
          //We're passing the entire task object 
          // as a prop to the Task component
        ))}
      </div>
    </div>
  );
}

export default App;