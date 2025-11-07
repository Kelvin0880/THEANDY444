# 🎮 TheAndy444 - Streamer Portfolio & Admin Panel

## ⚡ VERSIÓN 2.0 - "ESPÍRITU GUERRERO"

Sitio web profesional para el streamer TheAndy444 con panel de administración secreto integrado y la nueva sección **Zoroversionmarimo** 🗡️.

---

## 🌟 Características Principales

### Sitio Web Público

- ✅ Diseño moderno con paleta negro y verde neón
- ✅ Totalmente responsive (móvil, tablet, escritorio)
- ✅ Animaciones suaves con Framer Motion
- ✅ **NUEVO:** Sección Zoroversionmarimo con efectos visuales espectaculares 🗡️
- ✅ Secciones dinámicas: Hero, Zoro, Sobre Mí, Video Destacado, Horarios, Redes Sociales, CTA
- ✅ **NUEVO:** 7 redes sociales (agregadas: Facebook, TikTok, Instagram)
- ✅ Video destacado de YouTube embebido
- ✅ Tipografía personalizada (Orbitron + Poppins)

### Panel de Administración

- 🔐 Login secreto con autenticación segura
- 📝 Edición de todo el contenido del sitio en tiempo real
- 🗡️ **NUEVO:** Editor de sección Zoroversionmarimo
- 💾 Sistema de persistencia (localStorage → migrar a Supabase recomendado)
- 🎨 Interfaz coherente con el diseño del sitio
- 🔄 Actualización reactiva sin recargar página
- 📊 Dashboard modular por secciones (ahora 7 secciones)

---

## 🆕 NOVEDADES VERSIÓN 2.0

### 🗡️ Sección Zoroversionmarimo
Nueva sección dedicada al personaje que representa el espíritu guerrero de TheAndy444.

**Características:**
- Animación de flotación del personaje
- Efectos glow y neón personalizados
- Tooltip interactivo
- Botón CTA que conecta con redes sociales
- Espada decorativa animada (desktop)
- 100% editable desde el panel admin
- Toggle para activar/desactivar

### 📱 3 Nuevas Redes Sociales
- **Facebook:** https://www.facebook.com/profile.php?id=100076200245398
- **TikTok:** https://www.tiktok.com/@theandy444
- **Instagram:** https://www.instagram.com/theandy04/

**Total ahora: 7 plataformas conectadas**

---

## 🚀 Acceso al Panel Admin

### Método 1: Atajo de Teclado (Recomendado)

Desde cualquier parte del sitio web, presiona:

```
Shift + Ctrl + A
```

### Método 2: URL Directa

Navega a:

```
/admin-login
```

### Credenciales por Defecto

- **Usuario:** `theandy`
- **Contraseña:** `andy2024`

## 📁 Estructura del Proyecto

```
/
├── App.tsx                          # Componente principal con providers
├── components/
│   ├── Header/                     # Barra de navegación
│   ├── HeroSection/                # Sección principal
│   ├── ZoroversionMarimo/          # 🗡️ NUEVA: Sección del personaje
│   │   ├── index.tsx
│   │   └── constants.ts
│   ├── ZoroFloatingMini/           # 🎭 OPCIONAL: Mini Zoro flotante
│   │   └── index.tsx
│   ├── AboutSection/               # Sobre mí
│   ├── VideoSection/               # Video destacado
│   ├── StreamSchedule/             # Horarios de streams
│   ├── SocialLinks/                # 📱 Redes sociales (7 redes)
│   ├── CTASection/                 # Call to action
│   ├── Footer/                     # Pie de página
│   └── Admin/
│       ├── Login/                  # Componente de login
│       ├── Dashboard/              # Dashboard principal
│       ├── DashboardSidebar/       # Navegación (7 secciones)
│       └── EditForms/              # Formularios de edición
│           ├── HeroForm.tsx
│           ├── ZoroForm.tsx        # 🗡️ NUEVO
│           ├── AboutForm.tsx
│           ├── VideoForm.tsx
│           ├── ScheduleForm.tsx
│           ├── SocialForm.tsx
│           └── CTAForm.tsx
├── contexts/
│   ├── DataContext.tsx             # Estado global de datos
│   └── RouterContext.tsx           # Router personalizado
├── data/
│   ├── defaultSiteData.ts          # Datos por defecto (incluye Zoro)
│   └── defaultUserData.ts          # Credenciales admin
├── utils/
│   ├── auth.ts                     # Gestión de autenticación
│   └── constants.ts                # Constantes globales
├── styles/
│   └── globals.css                 # Estilos globales
└── docs/
    ├── MIGRATION_GUIDE.md          # 📖 Guía migración Supabase
    ├── QUICK_START.md              # 🚀 Inicio rápido
    ├── IMPLEMENTATION_SUMMARY.md   # 📊 Resumen técnico
    ├── ZORO_UPDATE_README.md       # 🗡️ Detalles actualización
    ├── UPDATE_NOTES.md             # 📝 Notas de versión
    └── supabase_setup.sql          # 💾 Script SQL Supabase
```

## 🎨 Tecnologías Utilizadas

- **Framework:** React con Next.js routing
- **Estilos:** TailwindCSS v4
- **Animaciones:** Framer Motion (motion/react)
- **Estado Global:** React Context API
- **Seguridad:** bcryptjs
- **Notificaciones:** Sonner
- **Íconos:** Lucide React
- **Tipografía:** Google Fonts (Orbitron, Poppins)

## 📝 Secciones Editables

Desde el panel admin puedes modificar:

### 1. Hero Section

- Título principal
- Texto destacado
- Subtítulo y descripción
- Textos y URLs de botones

### 2. 🗡️ Zoroversionmarimo (NUEVO)

- Título del personaje
- Subtítulo motivacional
- Descripción completa
- URL de imagen del personaje
- Color del tema personalizado
- Toggle para mostrar/ocultar sección

### 3. Sobre Mí

- Título de sección
- Nombre y título profesional
- País/ubicación
- Biografía (múltiples párrafos)
- Estadísticas (3 cards)

### 4. Clip Destacado

- Título del clip
- URL de YouTube (auto-genera embed)
- Descripción del video
- Vista previa en tiempo real

### 5. Horario de Streams

- Días de la semana
- Horarios
- Juegos/contenido
- Añadir/eliminar streams

### 6. Redes Sociales

- Nombre de cada red
- URLs
- Íconos (Lucide)
- Colores personalizados

### 7. Call to Action

- Título y subtítulo
- Descripción
- Botones (textos, URLs, variantes)
- Características (3 cards)

## 🔐 Seguridad

### Autenticación

- Contraseñas hasheadas con bcrypt (salt rounds: 10)
- Tokens de sesión encriptados en localStorage
- Expiración automática de sesión (24 horas)
- Validación de sesión en cada carga del dashboard

### Almacenamiento

- Credenciales: JSON con hash bcrypt
- Datos del sitio: localStorage (persistencia local)
- Sin exposición de datos sensibles en el cliente

## 🔧 Cambiar Contraseña Admin

Para cambiar la contraseña de administrador:

1. Instala bcryptjs en tu entorno local:

```bash
npm install bcryptjs
```

2. Genera un nuevo hash:

```javascript
const bcrypt = require('bcryptjs');
bcrypt.hash('tu-nueva-contraseña', 10)
  .then(hash => console.log(hash));
```

3. Actualiza el hash en `/data/userData.json`:

```json
{
  "username": "theandy",
  "passwordHash": "tu-nuevo-hash-aqui"
}
```

## 💾 Gestión de Datos

### Restaurar Datos por Defecto

1. Abre las DevTools del navegador
2. Ve a Application > Local Storage
3. Elimina la clave `andy_site_data`
4. Recarga la página

### Exportar Configuración

Los datos se guardan automáticamente en localStorage. Para exportar:

1. Abre Console en DevTools
2. Ejecuta:

```javascript
console.log(localStorage.getItem('andy_site_data'));
```

3. Copia el JSON resultante

### Importar Configuración

1. Abre Console en DevTools
2. Ejecuta con tu JSON:

```javascript
localStorage.setItem('andy_site_data', 'tu-json-aqui');
```

3. Recarga la página

## 🎯 Características Técnicas

### Arquitectura

- ✅ Arquitectura modular por componentes
- ✅ Separación de lógica y presentación
- ✅ Estado global con Context API
- ✅ Sin hardcoding de valores
- ✅ Reutilización máxima de código

### Performance

- ✅ Lazy loading de contenido
- ✅ Animaciones optimizadas (GPU)
- ✅ Código limpio y escalable
- ✅ Bundle size optimizado

### UX/UI

- ✅ Diseño responsive completo
- ✅ Smooth scrolling
- ✅ Animaciones fluidas
- ✅ Feedback visual en todas las acciones
- ✅ Toast notifications
- ✅ Scrollbar personalizado

## 🔄 Flujo de Trabajo

### Usuario Final

1. Visita el sitio web
2. Navega por las secciones
3. Interactúa con enlaces y botones
4. Disfruta de animaciones y diseño

### Administrador

1. Accede con `Shift + Ctrl + A` o `/admin-login`
2. Inicia sesión con credenciales
3. Selecciona sección a editar en sidebar
4. Modifica contenido en formularios
5. Guarda cambios (botón verde)
6. Ve cambios reflejados inmediatamente
7. Cierra sesión cuando termine

## 📱 Responsive Design

- **Mobile:** < 640px
- **Tablet:** 640px - 1024px
- **Desktop:** > 1024px

Todos los componentes se adaptan automáticamente.

## 🎨 Paleta de Colores

```css
--primary: #00ff7f /* Verde neón principal */
  --primary-alt: #00ff99 /* Verde neón alternativo */
  --background: #0a0a0a /* Negro principal */
  --bg-secondary: #1a1a1a /* Negro secundario */ --text: #ffffff
  /* Blanco */ --text-muted: #a0a0a0 /* Gris claro */;
```

## 🚨 Notas Importantes

- ⚠️ Los datos se guardan en localStorage (navegador local)
- ⚠️ No hay backend real, todo es frontend
- ⚠️ Cambios solo persisten en el navegador actual
- ⚠️ Para producción, considera implementar un backend real
- ⚠️ La contraseña por defecto debe cambiarse en producción

## 📞 Contacto

Este panel fue diseñado específicamente para TheAndy444.

- 🎮 Kick: https://kick.com/theandy444
- 📺 Twitch: https://www.twitch.tv/theandy444
- 💬 Discord: https://discord.gg/jzQ8rtnV
- ▶️ YouTube: https://www.youtube.com/@theandy4

---

**Desarrollado con ❤️ para la comunidad de TheAndy444** 🇩🇴