# 🚀 QUICK START - DEPLOYMENT RÁPIDO

## ⚡ INICIO RÁPIDO (5 MINUTOS)

### 1️⃣ SUBIR IMAGEN DE ZOROVERSIONMARIMO

Coloca tu imagen del personaje en:
```
/public/images/Zoroversionmarimo.png
```

O actualiza la URL desde el panel admin.

---

### 2️⃣ CONFIGURAR SUPABASE (CRÍTICO) 🚨

**SIN ESTO, SOLO TÚ VERÁS LOS CAMBIOS DEL ADMIN**

#### A. Crear tabla en Supabase (2 minutos)

1. Ve a: https://supabase.com/dashboard
2. Selecciona tu proyecto
3. Click en **"SQL Editor"** (sidebar izquierdo)
4. Click en **"New Query"**
5. Copia TODO el contenido de `/supabase_setup.sql`
6. Pega y presiona **"Run"** (o Ctrl+Enter)
7. ✅ Verás mensajes de confirmación

#### B. Obtener credenciales (1 minuto)

1. En tu panel Supabase, ve a **Settings → API**
2. Copia estos dos valores:
   - **Project URL** (ej: `https://abc123.supabase.co`)
   - **anon/public key** (clave larga que empieza con `eyJ...`)

#### C. Configurar en Vercel (2 minutos)

1. Ve a tu proyecto en Vercel
2. Click en **Settings → Environment Variables**
3. Agrega estas dos variables:

```env
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu-clave-aqui
```

4. Click en **Save**
5. Redeploy tu sitio (Deployments → ... → Redeploy)

---

### 3️⃣ ACTUALIZAR DATACONTEXT

Reemplaza `/contexts/DataContext.tsx` con este código:

```typescript
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { createClient } from '@supabase/supabase-js';
import { defaultSiteData } from '../data/defaultSiteData';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL || '',
  import.meta.env.VITE_SUPABASE_ANON_KEY || ''
);

interface SiteData {
  hero: any;
  zoroSection: any;
  about: any;
  featuredVideo: any;
  schedule: any[];
  socialLinks: any[];
  cta: any;
}

interface DataContextType {
  siteData: SiteData;
  updateSiteData: (newData: Partial<SiteData>) => void;
  saveSiteData: () => Promise<void>;
  isLoading: boolean;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [siteData, setSiteData] = useState<SiteData>(defaultSiteData as SiteData);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDataFromSupabase();
  }, []);

  const loadDataFromSupabase = async () => {
    try {
      setIsLoading(true);
      
      const { data, error } = await supabase
        .from('site_data')
        .select('*')
        .eq('site_id', 'theandy444')
        .single();

      if (error) {
        console.error('Error loading from Supabase:', error);
        setSiteData(defaultSiteData as SiteData);
      } else if (data && data.content) {
        setSiteData(data.content);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateSiteData = (newData: Partial<SiteData>) => {
    setSiteData(prev => ({ ...prev, ...newData }));
  };

  const saveSiteData = async () => {
    try {
      const { error } = await supabase
        .from('site_data')
        .upsert({
          site_id: 'theandy444',
          content: siteData,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;
      console.log('✅ Guardado en Supabase');
    } catch (error) {
      console.error('❌ Error al guardar:', error);
      throw error;
    }
  };

  return (
    <DataContext.Provider value={{ siteData, updateSiteData, saveSiteData, isLoading }}>
      {children}
    </DataContext.Provider>
  );
};

export const useSiteData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error('useSiteData must be used within DataProvider');
  return context;
};
```

---

### 4️⃣ VERIFICAR QUE FUNCIONA

#### Test 1: Panel Admin
1. Ve a `/admin-dashboard`
2. Usuario: `theandy`
3. Contraseña: `andy2024`
4. Edita algo (ej: título del Hero)
5. Click en "Guardar Cambios"
6. ✅ Deberías ver: "Guardado en Supabase" en consola

#### Test 2: Persistencia Global
1. Abre el sitio en **modo incógnito** o **otro navegador**
2. Los cambios deberían verse inmediatamente
3. ✅ Si los ves = **¡FUNCIONA!**

---

## 🎯 ACCESOS RÁPIDOS

### Panel de Administración
- **URL:** `/admin-dashboard` o `/admin-login`
- **Atajo:** `Shift + Ctrl + A` (desde cualquier página)
- **Usuario:** `theandy`
- **Contraseña:** `andy2024`

### Secciones Editables
1. **Hero Section** - Título, subtítulo, botones
2. **Zoroversionmarimo** - Nueva sección del personaje 🗡️
3. **Sobre Mí** - Bio, stats, país
4. **Clip Destacado** - Video de YouTube
5. **Horarios** - Días, horas, juegos
6. **Redes Sociales** - 7 redes (incluye FB, TikTok, IG)
7. **Call to Action** - Banner final, features

---

## 🗡️ NUEVA SECCIÓN ZORO

### Dónde está:
Entre **Hero** y **About** en la página principal

### Qué se puede editar:
- Título del personaje
- Subtítulo motivacional
- Descripción larga
- URL de imagen
- Color del tema
- Toggle para mostrar/ocultar

### Características:
- ✅ Animación de flotación
- ✅ Efecto glow en hover
- ✅ Tooltip: "Zoroversionmarimo: símbolo del poder gamer dominicano"
- ✅ Botón que lleva a redes sociales
- ✅ Espada decorativa en desktop
- ✅ 100% responsive

---

## 📱 NUEVAS REDES SOCIALES

### Agregadas:
- **Facebook:** https://www.facebook.com/profile.php?id=100076200245398
- **TikTok:** https://www.tiktok.com/@theandy444
- **Instagram:** https://www.instagram.com/theandy04/

### Total:
7 redes sociales con diseño responsive

---

## 🎨 (OPCIONAL) MINI ZORO FLOTANTE

Para activar el personaje flotando en la esquina:

En `/App.tsx`, agrega antes de `</div>` final:

```tsx
import { ZoroFloatingMini } from "./components/ZoroFloatingMini";

// Dentro del return, antes del </div> que cierra todo:
<ZoroFloatingMini />
```

Aparecerá en la esquina inferior derecha con animación suave.

---

## ⚠️ TROUBLESHOOTING RÁPIDO

### "Usuario o contraseña incorrectos"
✅ Usa exactamente: `theandy` / `andy2024` (sin espacios)

### "Los cambios no se ven en otros dispositivos"
✅ Necesitas completar el paso 2 (Supabase)

### "Error al guardar"
✅ Verifica las variables de entorno en Vercel
✅ Revisa que ejecutaste el SQL en Supabase
✅ Abre la consola del navegador (F12) para ver el error

### "La imagen de Zoro no aparece"
✅ Verifica que esté en `/public/images/Zoroversionmarimo.png`
✅ O usa una URL completa: `https://...`
✅ Actualiza desde el panel admin si es necesario

### "RLS policy error" en Supabase
✅ Ejecuta de nuevo el script SQL completo
✅ Verifica que RLS esté habilitado en la tabla

---

## 📊 VERIFICAR SUPABASE

En tu panel Supabase, ve a **SQL Editor** y ejecuta:

```sql
-- Ver si la tabla existe
SELECT * FROM site_data WHERE site_id = 'theandy444';

-- Ver políticas activas
SELECT * FROM pg_policies WHERE tablename = 'site_data';
```

Deberías ver:
- ✅ 1 registro con site_id = 'theandy444'
- ✅ 3 políticas de seguridad activas

---

## 🚀 DESPUÉS DEL DEPLOYMENT

### Checklist Final:
- [ ] Imagen de Zoro subida
- [ ] SQL ejecutado en Supabase
- [ ] Variables de entorno en Vercel
- [ ] DataContext.tsx actualizado
- [ ] Sitio redeployado
- [ ] Probado en modo incógnito
- [ ] Verificado en mobile
- [ ] Login admin funciona
- [ ] Cambios se guardan en Supabase
- [ ] Cambios visibles en otros dispositivos

---

## 📞 SOPORTE

Si algo no funciona:

1. **Abre la consola del navegador** (F12)
2. Busca errores en rojo
3. Verifica las variables de entorno
4. Asegúrate de haber ejecutado el SQL
5. Lee `/MIGRATION_GUIDE.md` para más detalles

---

## 🎉 ¡LISTO!

Si completaste los 4 pasos, tu sitio está funcionando perfectamente con:

✅ Nueva sección Zoroversionmarimo
✅ 7 redes sociales
✅ Panel admin funcional
✅ Persistencia global con Supabase
✅ Cambios visibles para todos

---

**¡Disfruta tu sitio actualizado! 🚀🗡️**
