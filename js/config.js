// ============================================
// CONFIGURACIÓN DE SUPABASE
// ============================================

// Esperar a que window.supabase esté disponible
if (typeof window.supabase === 'undefined') {
    console.error('❌ Supabase no está cargado. Asegúrate de que el script de Supabase CDN se carga ANTES de config.js')
    throw new Error('Supabase library not loaded')
}

// IMPORTANTE: Reemplaza estos valores con los de tu proyecto
const SUPABASE_URL = 'https://qrnvgcnwuhpivaghfvrc.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFybnZnY253dWhwaXZhZ2hmdnJjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAzMDI2MTEsImV4cCI6MjA4NTg3ODYxMX0.BBl_aT_rYj496PvO6IUivKoRDVoZYYWuVGDKycF3qS4'

// Cliente de Supabase
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// Estado global de la aplicación
const appState = {
    currentUser: null,
    currentProfile: null,
    members: [],
}

// Helper para verificar sesión
async function checkAuth() {
    const { data: { session } } = await supabase.auth.getSession()
    
    if (!session) {
        const currentPath = window.location.pathname
        if (!currentPath.includes('index.html') && currentPath !== '/' && !currentPath.endsWith('/')) {
            window.location.href = '../index.html'
        }
        return null
    }

    appState.currentUser = session.user

    // Cargar perfil
    const { data: profile } = await supabase
        .from('user_profiles')
        .select(`
            *,
            iglesia:iglesias(id, nombre),
            ministerio:ministerios(id, nombre)
        `)
        .eq('id', session.user.id)
        .single()

    appState.currentProfile = profile
    return profile
}

// Helper para cerrar sesión
async function signOut() {
    await supabase.auth.signOut()
    window.location.href = '../index.html'
}

// Helper para mostrar notificaciones
function showNotification(message, type = 'success') {
    const notification = document.createElement('div')
    notification.className = `notification notification-${type}`
    notification.textContent = message
    
    document.body.appendChild(notification)
    
    setTimeout(() => {
        notification.classList.add('show')
    }, 100)
    
    setTimeout(() => {
        notification.classList.remove('show')
        setTimeout(() => notification.remove(), 300)
    }, 3000)
}

// Helper para formatear fechas
function formatDate(dateString) {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('es', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
}

// Helper para calcular edad
function calculateAge(birthDate) {
    if (!birthDate) return null
    const today = new Date()
    const birth = new Date(birthDate)
    let age = today.getFullYear() - birth.getFullYear()
    const monthDiff = today.getMonth() - birth.getMonth()
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--
    }
    
    return age
}

// Helper para subir archivos
async function uploadFile(bucket, path, file) {
    const { data, error } = await supabase.storage
        .from(bucket)
        .upload(path, file, {
            cacheControl: '3600',
            upsert: true
        })

    if (error) throw error
    return data
}

// Helper para obtener URL pública
function getPublicUrl(bucket, path) {
    const { data } = supabase.storage
        .from(bucket)
        .getPublicUrl(path)

    return data.publicUrl
}

console.log('✅ Config cargada correctamente')
