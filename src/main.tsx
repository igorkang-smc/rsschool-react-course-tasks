import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Task1_App from './Task1_App.tsx';
import './index.css';
import ErrorBoundary from './components/ErrorBoundary.tsx';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <Task1_App />
    </ErrorBoundary>
  </StrictMode>
);
