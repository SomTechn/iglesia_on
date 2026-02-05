import { useEffect, useState } from 'react'
import { Users, UserPlus, Calendar, DollarSign, TrendingUp, Activity } from 'lucide-react'
import { supabase } from '@/lib/supabaseClient'
import { useAuth } from '@/context/AuthContext'
import Loading from '@/components/common/Loading'
import { toast } from 'sonner'

const Dashboard = () => {
  const { profile } = useAuth()
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (profile?.iglesia_id) {
      loadStats()
    }
  }, [profile])

  const loadStats = async () => {
    try {
      // Obtener estadísticas de miembros
      const { data: miembros, error: membersError } = await supabase
        .from('miembros')
        .select('id, estado, genero, fecha_ingreso')
        .eq('iglesia_id', profile.iglesia_id)

      if (membersError) throw membersError

      // Obtener grupos activos
      const { data: grupos, error: groupsError } = await supabase
        .from('grupos')
        .select('id')
        .eq('iglesia_id', profile.iglesia_id)
        .eq('activo', true)

      if (groupsError) throw groupsError

      // Obtener próximos eventos
      const { data: eventos, error: eventsError } = await supabase
        .from('eventos')
        .select('id, nombre, fecha_inicio')
        .eq('iglesia_id', profile.iglesia_id)
        .gte('fecha_inicio', new Date().toISOString())
        .order('fecha_inicio', { ascending: true })
        .limit(5)

      if (eventsError) throw eventsError

      // Calcular estadísticas
      const miembrosActivos = miembros.filter(m => m.estado === 'activo').length
      const miembrosNuevos = miembros.filter(m => {
        const fechaIngreso = new Date(m.fecha_ingreso)
        const hace30Dias = new Date()
        hace30Dias.setDate(hace30Dias.getDate() - 30)
        return fechaIngreso >= hace30Dias && m.estado === 'activo'
      }).length

      setStats({
        totalMiembros: miembros.length,
        miembrosActivos,
        miembrosNuevos,
        totalGrupos: grupos.length,
        proximosEventos: eventos,
        hombres: miembros.filter(m => m.genero === 'Masculino' && m.estado === 'activo').length,
        mujeres: miembros.filter(m => m.genero === 'Femenino' && m.estado === 'activo').length,
      })
    } catch (error) {
      console.error('Error cargando estadísticas:', error)
      toast.error('Error al cargar estadísticas')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <Loading message="Cargando dashboard..." />
  }

  const statCards = [
    {
      title: 'Total Miembros',
      value: stats?.totalMiembros || 0,
      icon: Users,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      change: '+12%',
    },
    {
      title: 'Miembros Activos',
      value: stats?.miembrosActivos || 0,
      icon: Activity,
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
      change: '+8%',
    },
    {
      title: 'Nuevos (30 días)',
      value: stats?.miembrosNuevos || 0,
      icon: UserPlus,
      color: 'bg-purple-500',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
      change: '+23%',
    },
    {
      title: 'Grupos Activos',
      value: stats?.totalGrupos || 0,
      icon: Users,
      color: 'bg-orange-500',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600',
      change: '+3',
    },
  ]

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          ¡Bienvenido, {profile?.nombre_completo?.split(' ')[0]}! 👋
        </h1>
        <p className="text-gray-600">
          Aquí está un resumen de tu congregación
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <div
            key={stat.title}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  {stat.title}
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {stat.value}
                </p>
                <p className={`text-sm font-medium mt-2 ${stat.textColor}`}>
                  {stat.change} este mes
                </p>
              </div>
              <div className={`${stat.bgColor} p-3 rounded-lg`}>
                <stat.icon className={`w-6 h-6 ${stat.textColor}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Distribución por Género */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Distribución por Género
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">Hombres</span>
                <span className="text-sm font-bold text-gray-900">{stats?.hombres || 0}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                  style={{
                    width: `${((stats?.hombres || 0) / (stats?.miembrosActivos || 1)) * 100}%`,
                  }}
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">Mujeres</span>
                <span className="text-sm font-bold text-gray-900">{stats?.mujeres || 0}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-pink-600 h-2 rounded-full transition-all duration-500"
                  style={{
                    width: `${((stats?.mujeres || 0) / (stats?.miembrosActivos || 1)) * 100}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Próximos Eventos */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Próximos Eventos
            </h3>
            <Calendar className="w-5 h-5 text-gray-400" />
          </div>
          
          {stats?.proximosEventos && stats.proximosEventos.length > 0 ? (
            <div className="space-y-3">
              {stats.proximosEventos.map((evento) => (
                <div
                  key={evento.id}
                  className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-primary-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {evento.nombre}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(evento.fecha_inicio).toLocaleDateString('es', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Calendar className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p className="text-sm">No hay eventos próximos</p>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Acciones Rápidas
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="flex flex-col items-center gap-2 p-4 rounded-lg border-2 border-dashed border-gray-300 hover:border-primary-500 hover:bg-primary-50 transition-all group">
            <UserPlus className="w-8 h-8 text-gray-400 group-hover:text-primary-600" />
            <span className="text-sm font-medium text-gray-600 group-hover:text-primary-600">
              Nuevo Miembro
            </span>
          </button>
          <button className="flex flex-col items-center gap-2 p-4 rounded-lg border-2 border-dashed border-gray-300 hover:border-primary-500 hover:bg-primary-50 transition-all group">
            <Calendar className="w-8 h-8 text-gray-400 group-hover:text-primary-600" />
            <span className="text-sm font-medium text-gray-600 group-hover:text-primary-600">
              Nuevo Evento
            </span>
          </button>
          <button className="flex flex-col items-center gap-2 p-4 rounded-lg border-2 border-dashed border-gray-300 hover:border-primary-500 hover:bg-primary-50 transition-all group">
            <DollarSign className="w-8 h-8 text-gray-400 group-hover:text-primary-600" />
            <span className="text-sm font-medium text-gray-600 group-hover:text-primary-600">
              Registrar Ofrenda
            </span>
          </button>
          <button className="flex flex-col items-center gap-2 p-4 rounded-lg border-2 border-dashed border-gray-300 hover:border-primary-500 hover:bg-primary-50 transition-all group">
            <TrendingUp className="w-8 h-8 text-gray-400 group-hover:text-primary-600" />
            <span className="text-sm font-medium text-gray-600 group-hover:text-primary-600">
              Ver Reportes
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
