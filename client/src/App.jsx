import './App.css'
import Navbar from './Components/Navbar'
import Dashboard from './Pages/Dashboard'
import { AppProvider } from './context/AppContext'

function App() {
  return (
    <AppProvider>
      <Navbar />
      <Dashboard />
    </AppProvider>
  )
}

export default App
