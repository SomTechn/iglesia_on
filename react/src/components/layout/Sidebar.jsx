import { 
  LayoutDashboard, 
  Users, 
  UserCircle, 
  DollarSign, 
  Calendar, 
  FolderKanban,
  Church,
  X 
} from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'

const Sidebar = ({ isOpen, onClose }) => {
  const { canViewFinance } = useAuth()

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Miembros', href: '/members', icon: Users },
    { name: 'Grupos', href: '/groups', icon: UserCircle },
    ...(canViewFinance() ? [{ name: 'Finanzas', href: '/finance', icon: DollarSign }] : []),
    { name: 'Eventos', href: '/events', icon: Calendar },
    { name: 'Proyectos', href: '/projects', icon: FolderKanban },
  ]

  return (
    <>
      {/* Overlay móvil */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50
          w-64 h-full
          bg-white border-r border-gray-200
          transform transition-transform duration-300 ease-in-out
          lg:translate-x-0 lg:static lg:z-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          flex flex-col
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center">
              <Church className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-gray-900">Iglesia</h2>
              <p className="text-xs text-gray-500">Sistema</p>
            </div>
          </div>
          
          <button 
            onClick={onClose}
            className="lg:hidden p-1 rounded-lg hover:bg-gray-100"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto custom-scrollbar">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              onClick={() => {
                // Cerrar sidebar en móvil al hacer click
                if (window.innerWidth < 1024) {
                  onClose()
                }
              }}
              className={({ isActive }) => `
                flex items-center gap-3 px-4 py-3 rounded-lg
                transition-all duration-200
                ${isActive 
                  ? 'bg-primary-50 text-primary-700 font-medium shadow-sm' 
                  : 'text-gray-700 hover:bg-gray-100'
                }
              `}
            >
              {({ isActive }) => (
                <>
                  <item.icon className={`w-5 h-5 ${isActive ? 'text-primary-600' : 'text-gray-500'}`} />
                  <span>{item.name}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          <div className="bg-primary-50 rounded-lg p-4">
            <p className="text-sm font-medium text-primary-900 mb-1">
              ¿Necesitas ayuda?
            </p>
            <p className="text-xs text-primary-700 mb-3">
              Consulta la documentación
            </p>
            <button className="w-full px-3 py-1.5 bg-primary-600 text-white text-sm rounded-lg hover:bg-primary-700 transition-colors">
              Ver Guía
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
