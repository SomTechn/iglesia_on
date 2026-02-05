# 🏛️ Sistema de Gestión de Iglesias

Sistema completo de gestión para iglesias desarrollado con React, Vite, Tailwind CSS y Supabase.

## ✨ Características Implementadas

### ✅ Módulo de Autenticación
- Login con email y contraseña
- Gestión de sesiones
- Sistema de roles y permisos
- Rutas protegidas

### ✅ Dashboard
- Estadísticas en tiempo real
- Resumen de miembros activos
- Próximos eventos
- Distribución por género
- Acciones rápidas

### ✅ Módulo de Membresía (Completo)
- CRUD completo de miembros
- Subida de fotos de perfil
- Búsqueda en tiempo real
- Filtros por estado y género
- Vista de tarjetas (grid) o lista
- Cálculo automático de edad
- Validación de formularios
- Permisos por rol

### 🔄 Próximos Módulos
- Grupos y Ministerios
- Finanzas
- Eventos
- Proyectos
- Discipulados

## 🚀 Instalación

### Prerrequisitos

- Node.js 18+ instalado
- Cuenta de Supabase con proyecto configurado
- Base de datos ejecutada con el SQL proporcionado

### Paso 1: Descomprimir el Proyecto

Extrae el archivo ZIP en tu carpeta de proyectos.

### Paso 2: Instalar Dependencias

Abre la terminal en la carpeta del proyecto:

**Para Windows (usa CMD o Git Bash, NO PowerShell):**
```bash
cd ruta/a/church-management-app
npm install
```

**Para Mac/Linux:**
```bash
cd ruta/a/church-management-app
npm install
```

### Paso 3: Configurar Variables de Entorno

1. Copia el archivo `.env.example` y renómbralo a `.env`
2. Abre `.env` y configura tus credenciales de Supabase:

```env
VITE_SUPABASE_URL=https://tuproyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu_anon_key_aqui
```

**¿Dónde encuentro estas credenciales?**

1. Ve a tu proyecto en [Supabase Dashboard](https://app.supabase.com)
2. Settings → API
3. Copia:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon/public key** → `VITE_SUPABASE_ANON_KEY`

### Paso 4: Iniciar el Servidor de Desarrollo

```bash
npm run dev
```

La aplicación se abrirá automáticamente en http://localhost:5173

## 🔐 Credenciales de Acceso

Usa las credenciales del usuario super admin que creaste en Supabase:

- **Email**: El email que configuraste
- **Contraseña**: La contraseña que configuraste

## 📁 Estructura del Proyecto

```
church-management-app/
├── src/
│   ├── components/
│   │   ├── layout/          # Navbar, Sidebar, Layout
│   │   ├── common/          # Componentes reutilizables
│   │   ├── members/         # Componentes de miembros
│   │   └── auth/            # Componentes de autenticación
│   ├── pages/               # Páginas de la aplicación
│   │   ├── Login.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Members.jsx
│   │   └── Groups.jsx
│   ├── context/             # React Context (AuthContext)
│   ├── hooks/               # Custom Hooks (useMembers)
│   ├── lib/                 # Configuraciones (Supabase)
│   ├── styles/              # Estilos CSS
│   ├── App.jsx              # Componente principal
│   └── main.jsx             # Punto de entrada
├── public/                  # Archivos estáticos
├── .env                     # Variables de entorno (crear)
├── .env.example             # Ejemplo de variables
├── package.json             # Dependencias
├── vite.config.js           # Configuración de Vite
└── tailwind.config.js       # Configuración de Tailwind
```

## 🎨 Tecnologías Utilizadas

- **React 18** - Framework de UI
- **Vite** - Build tool y dev server
- **Tailwind CSS** - Framework de CSS utility-first
- **React Router** - Navegación
- **Supabase** - Backend (base de datos, auth, storage)
- **React Hook Form** - Manejo de formularios
- **Lucide React** - Iconos
- **Sonner** - Notificaciones toast
- **date-fns** - Manejo de fechas
- **Zustand** - Estado global (opcional)

## 📦 Scripts Disponibles

```bash
# Desarrollo (con hot reload)
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview

# Linter
npm run lint
```

## 🔧 Configuración de Supabase

### Storage Buckets Necesarios

Asegúrate de tener creados estos buckets en Supabase Storage:

1. `member_photos` (privado) - Fotos de miembros
2. `church_logos` (público) - Logos de iglesias
3. `event_images` (público) - Imágenes de eventos
4. `documents` (privado) - Documentos
5. `receipts` (privado) - Comprobantes
6. `certificates` (privado) - Certificados

### Políticas de Seguridad

Configura las políticas de cada bucket desde la interfaz de Supabase:
- Storage → Selecciona el bucket → Policies → New Policy

## 👥 Roles y Permisos

| Rol | Permisos en Membresía |
|-----|----------------------|
| `super_admin` | Acceso total |
| `ministerio_admin` | Acceso total a su ministerio |
| `pastor` | CRUD completo |
| `directiva` | CRUD completo |
| `secretario` | CRUD completo |
| `lider` | Solo lectura |
| `tesorero` | Solo lectura |
| `miembro` | Sin acceso |

## 🐛 Solución de Problemas

### Error: "Cannot find module"
```bash
rm -rf node_modules package-lock.json
npm install
```

### Error: PowerShell execution policy
**Solución**: Usa CMD o Git Bash en lugar de PowerShell

### Error: "Failed to fetch"
- Verifica que las variables de entorno estén configuradas correctamente
- Verifica que el proyecto de Supabase esté activo
- Revisa que las políticas de RLS permitan el acceso

### La aplicación no carga miembros
- Verifica que tengas datos en la tabla `miembros`
- Verifica que tu usuario tenga `iglesia_id` configurado
- Revisa la consola del navegador (F12) para errores

## 📚 Próximos Pasos

1. **Explora la aplicación** - Navega por todas las páginas
2. **Agrega miembros de prueba** - Prueba el CRUD completo
3. **Sube fotos** - Prueba la funcionalidad de subida de imágenes
4. **Revisa el código** - Familiarízate con la estructura

## 🚀 Deployment

### Vercel (Recomendado)

1. Sube tu código a GitHub
2. Ve a [vercel.com](https://vercel.com)
3. Importa tu repositorio
4. Configura las variables de entorno
5. Deploy

### Otras opciones
- Netlify
- Railway
- Render

## 📞 Soporte

Si tienes problemas:

1. Revisa la sección de Solución de Problemas
2. Verifica que tu base de datos de Supabase esté correctamente configurada
3. Revisa los logs en la consola del navegador (F12)

## 📝 Licencia

Este proyecto es de código abierto para uso en iglesias y organizaciones sin fines de lucro.

---

**¡Disfruta gestionando tu iglesia con esta aplicación! 🙏**
