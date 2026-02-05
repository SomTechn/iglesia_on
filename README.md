# 🏛️ Sistema de Gestión de Iglesias - HTML Puro

Sistema completo de gestión para iglesias en **HTML, CSS y JavaScript puro**. 
**SIN instalaciones, SIN npm, SIN dependencias locales.**

## ✨ Características

✅ **Sin instalación de Node.js**
✅ **Sin npm install**
✅ **Sin compilación**
✅ **Funciona abriendo el HTML directamente**
✅ **Conecta con Supabase**
✅ **100% Responsive**

### Módulos Incluidos

- ✅ Sistema de Login
- ✅ Dashboard con estadísticas
- ✅ Módulo de Miembros completo (CRUD)
- ✅ Subida de fotos
- ✅ Búsqueda y filtros
- ✅ Diseño moderno y profesional

## 🚀 Instalación (3 Pasos)

### Paso 1: Descomprimir

Extrae la carpeta `church-app-html` en tu computadora.

### Paso 2: Configurar Supabase

1. Abre el archivo `js/config.js` con cualquier editor de texto (Notepad, VS Code, etc.)

2. Reemplaza estas líneas:

```javascript
const SUPABASE_URL = 'TU_SUPABASE_URL_AQUI'
const SUPABASE_ANON_KEY = 'TU_SUPABASE_ANON_KEY_AQUI'
```

Con tus credenciales de Supabase:

```javascript
const SUPABASE_URL = 'https://tuproyecto.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
```

**¿Dónde las encuentro?**
- Supabase Dashboard → Settings → API
- Copia **Project URL** y **anon public key**

3. Guarda el archivo

### Paso 3: Abrir en el Navegador

**Opción A: Doble click**
- Simplemente haz doble click en `index.html`
- Se abrirá en tu navegador predeterminado

**Opción B: Desde VS Code** (recomendado)
- Instala la extensión "Live Server"
- Click derecho en `index.html` → "Open with Live Server"
- Esto evita problemas de CORS con archivos locales

**Opción C: Servidor HTTP simple**
Si tienes Python instalado:
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```
Luego abre http://localhost:8000

## 🔐 Login

Usa las credenciales del usuario super admin que creaste en Supabase:

- **Email**: tu@email.com
- **Contraseña**: tu_contraseña

## 📁 Estructura de Archivos

```
church-app-html/
├── index.html              # Página de login
├── css/
│   └── styles.css          # Estilos globales
├── js/
│   └── config.js          # ⚠️ CONFIGURAR AQUÍ
└── pages/
    ├── dashboard.html     # Dashboard con estadísticas
    └── members.html       # Gestión de miembros
```

## 🎯 Funcionalidades

### Dashboard
- 📊 Estadísticas en tiempo real
- 👥 Total de miembros
- ✨ Miembros activos
- 🆕 Nuevos miembros (30 días)
- 👪 Grupos activos
- 📈 Distribución por género
- 📅 Próximos eventos

### Miembros
- ➕ Crear nuevo miembro
- ✏️ Editar miembro
- 🗑️ Eliminar miembro
- 📸 Subir foto de perfil
- 🔍 Búsqueda por nombre/email
- 🎚️ Filtros por estado y género
- 🎂 Cálculo automático de edad

## 🔧 Configuración de Supabase

### Prerequisitos

Antes de usar la aplicación, asegúrate de tener:

1. ✅ Proyecto de Supabase creado
2. ✅ Base de datos con el SQL ejecutado
3. ✅ Storage buckets creados:
   - `member_photos` (privado)
   - `church_logos` (público)
   - `event_images` (público)
4. ✅ Políticas de Storage configuradas
5. ✅ Usuario super admin creado
6. ✅ Datos de prueba insertados

### Políticas de CORS

Si tienes problemas de CORS al abrir archivos locales:

**Solución 1: Usar Live Server** (recomendado)
- VS Code → Extensión "Live Server"
- Click derecho en `index.html` → "Open with Live Server"

**Solución 2: Servidor HTTP local**
```bash
# Python
python -m http.server 8000

# Node (si lo tienes)
npx http-server

# PHP (si lo tienes)
php -S localhost:8000
```

## 🌐 Despliegue en Producción

### GitHub Pages (Gratis)

1. Sube tu código a GitHub
2. Ve a Settings → Pages
3. Selecciona la rama main
4. Guarda

**IMPORTANTE**: Recuerda cambiar las credenciales de Supabase en `js/config.js` antes de subir.

### Netlify (Gratis)

1. Arrastra la carpeta a [netlify.com/drop](https://netlify.com/drop)
2. Listo!

### Vercel (Gratis)

1. Sube a GitHub
2. Importa en [vercel.com](https://vercel.com)
3. Deploy

## ⚠️ Notas Importantes

### Seguridad

- ⚠️ **NO** subas tu `config.js` con credenciales a repositorios públicos
- ✅ Usa variables de entorno en producción
- ✅ Las políticas RLS de Supabase protegen tus datos

### Limitaciones vs Versión React

**Ventajas HTML Puro:**
- ✅ Sin instalación
- ✅ Sin compilación
- ✅ Funciona offline (excepto Supabase)
- ✅ Más fácil de entender para principiantes

**Desventajas HTML Puro:**
- ❌ Código más repetitivo
- ❌ Sin componentes reutilizables
- ❌ Sin hot-reload
- ❌ Performance ligeramente inferior

## 🔍 Solución de Problemas

### Error: Supabase no está definido

**Solución**: Asegúrate de tener internet. El script de Supabase se carga desde CDN.

### Error: CORS policy

**Solución**: Usa Live Server o un servidor HTTP local en lugar de abrir el archivo directamente.

### No se cargan los datos

**Solución**:
1. Verifica que `js/config.js` tenga las credenciales correctas
2. Abre la consola del navegador (F12) y revisa errores
3. Verifica que tu usuario tenga `iglesia_id` configurado
4. Verifica las políticas RLS en Supabase

### Las fotos no se suben

**Solución**:
1. Verifica que el bucket `member_photos` exista
2. Verifica las políticas de Storage
3. Revisa la consola del navegador para errores

## 📱 Responsive

La aplicación funciona perfectamente en:
- 📱 Móviles
- 📱 Tablets
- 💻 Desktop

## 🎨 Personalización

### Cambiar Colores

Edita las variables CSS en `css/styles.css`:

```css
:root {
    --primary-600: #4f46e5;  /* Color principal */
    --gray-900: #111827;     /* Texto principal */
    /* ... más variables */
}
```

### Agregar Páginas

1. Crea nuevo archivo HTML en `pages/`
2. Copia la estructura de `dashboard.html`
3. Agrega el enlace en el sidebar

## 📞 Soporte

Si tienes problemas:

1. Revisa la consola del navegador (F12)
2. Verifica tu configuración de Supabase
3. Asegúrate de tener los datos de prueba insertados

## 🚀 Próximos Pasos

Después de instalar:

1. ✅ Configura `config.js`
2. ✅ Abre `index.html`
3. ✅ Haz login
4. ✅ Explora el dashboard
5. ✅ Agrega tu primer miembro
6. ✅ Sube una foto

## ✨ Ventajas de Esta Versión

✅ **Cero instalaciones** - Solo abre y usa
✅ **Cero dependencias locales** - Todo desde CDN
✅ **Fácil de entender** - HTML, CSS, JS vanilla
✅ **Rápido de configurar** - 3 minutos
✅ **Funciona en cualquier computadora** - Sin requisitos

---

**¡Disfruta gestionando tu iglesia!** 🙏
