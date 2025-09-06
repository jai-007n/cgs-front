import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { store } from './store';
import { Provider } from 'react-redux';
import ErrorBoundary from './components/ErrorBoundary';
import { LoadingIndicator } from './components/loading-indicator';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <ErrorBoundary fallback={LoadingIndicator}>
        <App />
      </ErrorBoundary>
    </Provider>

  </StrictMode >,
)
