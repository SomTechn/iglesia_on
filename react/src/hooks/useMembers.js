import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useAuth } from '@/context/AuthContext'
import { toast } from 'sonner'

export const useMembers = () => {
  const { profile } = useAuth()
  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [genderFilter, setGenderFilter] = useState('all')

  useEffect(() => {
    if (profile?.iglesia_id) {
      loadMembers()
    }
  }, [profile])

  const loadMembers = async () => {
    try {
      setLoading(true)
      
      let query = supabase
        .from('miembros')
        .select('*')
        .eq('iglesia_id', profile.iglesia_id)
        .order('created_at', { ascending: false })

      const { data, error } = await query

      if (error) throw error
      setMembers(data || [])
    } catch (error) {
      console.error('Error cargando miembros:', error)
      toast.error('Error al cargar miembros')
    } finally {
      setLoading(false)
    }
  }

  const createMember = async (memberData) => {
    try {
      const { data, error } = await supabase
        .from('miembros')
        .insert([{
          ...memberData,
          iglesia_id: profile.iglesia_id,
        }])
        .select()
        .single()

      if (error) throw error

      setMembers([data, ...members])
      toast.success('Miembro registrado exitosamente')
      return { data, error: null }
    } catch (error) {
      console.error('Error creando miembro:', error)
      toast.error('Error al registrar miembro')
      return { data: null, error }
    }
  }

  const updateMember = async (id, memberData) => {
    try {
      const { data, error } = await supabase
        .from('miembros')
        .update(memberData)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error

      setMembers(members.map(m => m.id === id ? data : m))
      toast.success('Miembro actualizado exitosamente')
      return { data, error: null }
    } catch (error) {
      console.error('Error actualizando miembro:', error)
      toast.error('Error al actualizar miembro')
      return { data: null, error }
    }
  }

  const deleteMember = async (id) => {
    try {
      const { error } = await supabase
        .from('miembros')
        .delete()
        .eq('id', id)

      if (error) throw error

      setMembers(members.filter(m => m.id !== id))
      toast.success('Miembro eliminado exitosamente')
      return { error: null }
    } catch (error) {
      console.error('Error eliminando miembro:', error)
      toast.error('Error al eliminar miembro')
      return { error }
    }
  }

  const uploadPhoto = async (file, memberId) => {
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${memberId}.${fileExt}`
      const filePath = `${profile.iglesia_id}/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('member_photos')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true,
        })

      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage
        .from('member_photos')
        .getPublicUrl(filePath)

      return { url: publicUrl, error: null }
    } catch (error) {
      console.error('Error subiendo foto:', error)
      toast.error('Error al subir foto')
      return { url: null, error }
    }
  }

  // Filtros
  const filteredMembers = members.filter(member => {
    const matchesSearch = 
      member.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.apellido.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email?.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === 'all' || member.estado === statusFilter
    const matchesGender = genderFilter === 'all' || member.genero === genderFilter

    return matchesSearch && matchesStatus && matchesGender
  })

  return {
    members: filteredMembers,
    loading,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    genderFilter,
    setGenderFilter,
    createMember,
    updateMember,
    deleteMember,
    uploadPhoto,
    refreshMembers: loadMembers,
  }
}
