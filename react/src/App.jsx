import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'sonner'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/auth/ProtectedRoute'
import Layout from './components/layout/Layout'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Members from './pages/Members'
import Groups from './pages/Groups'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />

          {/* Protected routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="members" element={<Members />} />
            <Route path="groups" element={<Groups />} />
            
            {/* Placeholder routes */}
            <Route path="finance" element={
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Finanzas</h2>
                <p className="text-gray-600">Módulo en desarrollo</p>
              </div>
            } />
            <Route path="events" element={
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Eventos</h2>
                <p className="text-gray-600">Módulo en desarrollo</p>
              </div>
            } />
            <Route path="projects" element={
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Proyectos</h2>
                <p className="text-gray-600">Módulo en desarrollo</p>
              </div>
            } />
            <Route path="profile" element={
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Mi Perfil</h2>
                <p className="text-gray-600">Módulo en desarrollo</p>
              </div>
            } />
            <Route path="settings" element={
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Configuración</h2>
                <p className="text-gray-600">Módulo en desarrollo</p>
              </div>
            } />
          </Route>

          {/* Catch all */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>

        {/* Toast notifications */}
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#fff',
              color: '#1f2937',
              border: '1px solid #e5e7eb',
            },
          }}
        />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
