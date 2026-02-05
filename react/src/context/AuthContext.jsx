import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { toast } from 'sonner'

const AuthContext = createContext({})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Obtener sesión actual
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        loadProfile(session.user.id)
      } else {
        setLoading(false)
      }
    })

    // Escuchar cambios de autenticación
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null)
        
        if (session?.user) {
          await loadProfile(session.user.id)
        } else {
          setProfile(null)
          setLoading(false)
        }
      }
    )

    return () => {
      subscription?.unsubscribe()
    }
  }, [])

  const loadProfile = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select(`
          *,
          iglesia:iglesias(id, nombre),
          ministerio:ministerios(id, nombre)
        `)
        .eq('id', userId)
        .single()

      if (error) throw error
      setProfile(data)
    } catch (error) {
      console.error('Error cargando perfil:', error)
      toast.error('Error al cargar perfil de usuario')
    } finally {
      setLoading(false)
    }
  }

  const signIn = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error
      toast.success('¡Bienvenido de vuelta!')
      return { data, error: null }
    } catch (error) {
      console.error('Error en login:', error)
      toast.error(error.message || 'Error al iniciar sesión')
      return { data: null, error }
    }
  }

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      toast.success('Sesión cerrada correctamente')
    } catch (error) {
      console.error('Error en logout:', error)
      toast.error('Error al cerrar sesión')
    }
  }

  const hasRole = (roles) => {
    if (!profile) return false
    if (typeof roles === 'string') {
      return profile.role === roles
    }
    return roles.includes(profile.role)
  }

  const canEdit = () => {
    return hasRole(['super_admin', 'ministerio_admin', 'pastor', 'directiva', 'secretario'])
  }

  const canViewFinance = () => {
    return hasRole(['super_admin', 'ministerio_admin', 'pastor', 'directiva', 'tesorero'])
  }

  const canEditFinance = () => {
    return hasRole(['super_admin', 'pastor', 'directiva', 'tesorero'])
  }

  const value = {
    user,
    profile,
    loading,
    signIn,
    signOut,
    hasRole,
    canEdit,
    canViewFinance,
    canEditFinance,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
