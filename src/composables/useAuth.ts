import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export function useAuth() {
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)

  const logout = () => {
    navigate('/login')
  }

  return {
    loading,
    logout,
    setLoading
  }

  // 在 React 组件中使用：
  // import { useAuth } from '@/composables/useAuth'
  // const { logout, loading } = useAuth()
  // const handleLogin = () => { logout() }
}
