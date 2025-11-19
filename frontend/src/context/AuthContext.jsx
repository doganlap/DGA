import { createContext, useContext, useState, useEffect } from 'react'
import { authAPI } from '../api'

const AuthContext = createContext(null)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({ full_name: 'Demo User', email: 'demo@dga.sa', role: 'dga_admin', region: 'Central' })
  const [loading, setLoading] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(true)

  

  const login = async () => ({ success: true })

  const logout = () => {}

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
