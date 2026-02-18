import { useState } from 'react'
import { useAuth } from './context/AuthProvider'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'

function App() {
  const user = useAuth()
  const [dark, setDark] = useState(() => window.matchMedia('(prefers-color-scheme: dark)').matches)

  if (!user) return <Login dark={dark} />
  return <Dashboard user={user} dark={dark} setDark={setDark} />
}

export default App
