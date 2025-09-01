import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
// import Layout from './layout/layout.jsx'
import Login from './components/login/login'

function App() {


  return (
    <>
      <div className="relative min-h-screen">
        {/* Background color layer */}
        <div className="fixed top-0 left-0 w-screen h-screen bg-gradient-to-b from-red-500 to-blue-500 -z-10"></div>
        <Login />
      </div>
    </>
  )
}

export default App
