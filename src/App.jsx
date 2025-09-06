import { Suspense } from 'react';
import './App.css'
import Router from './routes/router'
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import ErrorBoundary from './components/ErrorBoundary';

function App() {

  return (
    <>

      {/* <Login /> */}
      {/* <ConfirmPassword/> */}
      
      <ErrorBoundary fallback={ClimbingBoxLoader}>
        <Suspense fallback={ClimbingBoxLoader}>
          <Router />
        </Suspense>
      </ErrorBoundary>
    </>
  )
}

export default App
