import './App.css'
import Navbar from './Components/Navbar'
import Dashboard from './Pages/Dashboard'
import { AppProvider } from './context/AppContext'

function App() {
  return (
    <AppProvider>
      <div className="app-shell">
        <Navbar />
        <Dashboard />
      </div>
    </AppProvider>
  )
}

export default App
