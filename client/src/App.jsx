import { useState } from 'react'

import './App.css'
import Navbar from './Components/Navbar'
import Dashboard from './Pages/Dashboard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navbar />
    <Dashboard />
    </>
  )
}

export default App
