// src/main.tsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css'; //Your main CSS file
import {QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter as Router } from 'react-router-dom';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Router>
        <App />
      </Router>
      <ReactQueryDevtools initialIsOpen={false} /> {/* Optional: Devtools */}
    </QueryClientProvider>
  </React.StrictMode>,
);