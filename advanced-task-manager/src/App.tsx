// src/App.tsx
// single-page application written in React 
// and TypeScript that manages tasks using the 
// browser's Local Storage as its database.
import { useQuery } from '@tanstack/react-query';
import { Task } from './components/Task';
import { CreateTaskForm } from './components/CreateTaskForm';
import type { TaskType } from './types/task';
import './App.css';

//This function retrieves tasks from local storage. It simulates an API call. 
const fetchTasks = async (): Promise<TaskType[]> => {
  return new Promise(resolve => {
    //We add a small delay to simulate a network request. You can remove this. 
    setTimeout(() => {
      const storedTasks = localStorage.getItem('tasks');
      if (storedTasks) {
        resolve(JSON.parse(storedTasks));
      } else {
        //If there are no tasks, return an empty array. 
        resolve([]);
      }
    }, 500);
  });
};

function App() {
  // The useQuery hook now fetched from local storage. 
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['tasks'],
    queryFn: fetchTasks,
  });
  
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="app-container">
      <h1>Advanced Task Manager</h1>
      {/* The CreateTaskForm now handles its own mutation, so no props are needed. */}
      <CreateTaskForm />
      <div className="task-list">
        {data?.length === 0 ? (
          <div>No task yet. Create one!</div>
        ) : (
          data?.map(task => (
            <Task key={task.id} task={task} />
          ))
        )}
      </div>
    </div>
  );
}

export default App;