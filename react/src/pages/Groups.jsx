import { Users } from 'lucide-react'

const Groups = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Grupos y Ministerios</h1>
        <p className="text-gray-600 mt-1">
          Gestiona los grupos y ministerios de tu iglesia
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
        <div className="max-w-md mx-auto">
          <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Users className="w-10 h-10 text-primary-600" />
          </div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-3">
            Módulo en Desarrollo
          </h3>
          <p className="text-gray-600 mb-6">
            El módulo de Grupos y Ministerios estará disponible próximamente.
            Podrás gestionar todos los grupos, asignar líderes y administrar miembros.
          </p>
          <div className="bg-blue-50 rounded-lg p-4 text-left">
            <p className="text-sm font-medium text-blue-900 mb-2">Funcionalidades planeadas:</p>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>✓ Crear y editar grupos</li>
              <li>✓ Asignar líderes y co-líderes</li>
              <li>✓ Gestionar miembros por grupo</li>
              <li>✓ Horarios y ubicaciones</li>
              <li>✓ Finanzas por grupo</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Groups
