import { User, Mail, Phone, Calendar, Edit, Trash2 } from 'lucide-react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

const MemberCard = ({ member, onEdit, onDelete }) => {
  const getStatusColor = (status) => {
    const colors = {
      activo: 'bg-green-100 text-green-800',
      inactivo: 'bg-gray-100 text-gray-800',
      visitante: 'bg-blue-100 text-blue-800',
      fallecido: 'bg-red-100 text-red-800',
      transferido: 'bg-yellow-100 text-yellow-800',
    }
    return colors[status] || colors.activo
  }

  const calcularEdad = (fechaNacimiento) => {
    if (!fechaNacimiento) return null
    const hoy = new Date()
    const nacimiento = new Date(fechaNacimiento)
    let edad = hoy.getFullYear() - nacimiento.getFullYear()
    const mesActual = hoy.getMonth()
    const mesNacimiento = nacimiento.getMonth()
    
    if (mesActual < mesNacimiento || (mesActual === mesNacimiento && hoy.getDate() < nacimiento.getDate())) {
      edad--
    }
    return edad
  }

  const edad = calcularEdad(member.fecha_nacimiento)

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 overflow-hidden group">
      {/* Header con foto */}
      <div className="relative h-32 bg-gradient-to-br from-primary-500 to-secondary-500">
        <div className="absolute -bottom-12 left-6">
          <div className="w-24 h-24 rounded-full border-4 border-white bg-white overflow-hidden shadow-lg">
            {member.foto_url ? (
              <img 
                src={member.foto_url} 
                alt={`${member.nombre} ${member.apellido}`}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <User className="w-12 h-12 text-gray-400" />
              </div>
            )}
          </div>
        </div>

        {/* Botones de acción */}
        <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit(member)}
            className="p-2 bg-white rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
          >
            <Edit className="w-4 h-4 text-gray-600" />
          </button>
          <button
            onClick={() => onDelete(member)}
            className="p-2 bg-white rounded-lg shadow-sm hover:bg-red-50 transition-colors"
          >
            <Trash2 className="w-4 h-4 text-red-600" />
          </button>
        </div>
      </div>

      {/* Contenido */}
      <div className="pt-14 p-6">
        {/* Nombre y estado */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {member.nombre} {member.apellido}
          </h3>
          <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(member.estado)}`}>
            {member.estado}
          </span>
        </div>

        {/* Información */}
        <div className="space-y-2 text-sm">
          {member.email && (
            <div className="flex items-center gap-2 text-gray-600">
              <Mail className="w-4 h-4" />
              <span className="truncate">{member.email}</span>
            </div>
          )}
          {(member.telefono || member.celular) && (
            <div className="flex items-center gap-2 text-gray-600">
              <Phone className="w-4 h-4" />
              <span>{member.celular || member.telefono}</span>
            </div>
          )}
          {member.fecha_nacimiento && (
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar className="w-4 h-4" />
              <span>{edad} años</span>
            </div>
          )}
        </div>

        {/* Footer */}
        {member.ocupacion && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-500">{member.ocupacion}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default MemberCard
