import { useState } from 'react'
import { Search, Plus, Grid, List, Filter } from 'lucide-react'
import { useMembers } from '@/hooks/useMembers'
import { useAuth } from '@/context/AuthContext'
import Loading from '@/components/common/Loading'
import Button from '@/components/common/Button'
import MemberCard from '@/components/members/MemberCard'
import MemberForm from '@/components/members/MemberForm'
import { toast } from 'sonner'

const Members = () => {
  const { canEdit } = useAuth()
  const {
    members,
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
  } = useMembers()

  const [showForm, setShowForm] = useState(false)
  const [selectedMember, setSelectedMember] = useState(null)
  const [viewMode, setViewMode] = useState('grid') // 'grid' or 'list'

  const handleSave = async (data, photoFile) => {
    let photoUrl = selectedMember?.foto_url

    // Si hay nueva foto, subirla primero
    if (photoFile) {
      const memberId = selectedMember?.id || crypto.randomUUID()
      const { url, error } = await uploadPhoto(photoFile, memberId)
      if (!error) {
        photoUrl = url
      }
    }

    const memberData = {
      ...data,
      foto_url: photoUrl,
    }

    if (selectedMember) {
      await updateMember(selectedMember.id, memberData)
    } else {
      await createMember(memberData)
    }

    setShowForm(false)
    setSelectedMember(null)
  }

  const handleEdit = (member) => {
    setSelectedMember(member)
    setShowForm(true)
  }

  const handleDelete = async (member) => {
    if (window.confirm(`¿Estás seguro de eliminar a ${member.nombre} ${member.apellido}?`)) {
      await deleteMember(member.id)
    }
  }

  const handleNew = () => {
    setSelectedMember(null)
    setShowForm(true)
  }

  if (loading) {
    return <Loading message="Cargando miembros..." />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Miembros</h1>
          <p className="text-gray-600 mt-1">
            Gestiona los miembros de tu congregación
          </p>
        </div>
        
        {canEdit() && (
          <Button onClick={handleNew} className="gap-2">
            <Plus className="w-5 h-5" />
            Nuevo Miembro
          </Button>
        )}
      </div>

      {/* Filters bar */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por nombre, email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          {/* Status filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white"
          >
            <option value="all">Todos los estados</option>
            <option value="activo">Activos</option>
            <option value="inactivo">Inactivos</option>
            <option value="visitante">Visitantes</option>
          </select>

          {/* Gender filter */}
          <select
            value={genderFilter}
            onChange={(e) => setGenderFilter(e.target.value)}
            className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white"
          >
            <option value="all">Todos los géneros</option>
            <option value="Masculino">Masculino</option>
            <option value="Femenino">Femenino</option>
          </select>

          {/* View mode toggle */}
          <div className="flex rounded-lg border border-gray-300 overflow-hidden">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2.5 ${viewMode === 'grid' ? 'bg-primary-50 text-primary-600' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2.5 border-l ${viewMode === 'list' ? 'bg-primary-50 text-primary-600' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Mostrando <span className="font-medium text-gray-900">{members.length}</span> miembros
        </p>
      </div>

      {/* Members grid */}
      {members.length > 0 ? (
        <div className={`
          ${viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
            : 'space-y-4'
          }
        `}>
          {members.map((member) => (
            <MemberCard
              key={member.id}
              member={member}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <div className="max-w-sm mx-auto">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No se encontraron miembros
            </h3>
            <p className="text-gray-600 mb-6">
              Intenta ajustar los filtros de búsqueda o agrega un nuevo miembro
            </p>
            {canEdit() && (
              <Button onClick={handleNew} className="gap-2">
                <Plus className="w-5 h-5" />
                Agregar Primer Miembro
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Form Modal */}
      <MemberForm
        member={selectedMember}
        isOpen={showForm}
        onClose={() => {
          setShowForm(false)
          setSelectedMember(null)
        }}
        onSave={handleSave}
      />
    </div>
  )
}

export default Members
