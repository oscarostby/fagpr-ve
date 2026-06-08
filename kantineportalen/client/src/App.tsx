import { AuthProvider } from '@/auth/AuthContext'
import { GlobalStyles } from '@/components/GlobalStyles'
import { AppRoutes } from '@/routes/AppRoutes'
import './styles/global.css'

function App() {
  return (
    <AuthProvider>
      <GlobalStyles />
      <AppRoutes />
    </AuthProvider>
  )
}

export default App
