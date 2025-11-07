# 🔧 GUÍA DE MIGRACIÓN: localStorage → Supabase

## 🚨 PROBLEMA ACTUAL

**Tu sitio está usando `localStorage` para guardar los cambios del panel admin.**

### ¿Qué significa esto?

- `localStorage` solo guarda datos **en el navegador local**
- Cuando tú editas algo en tu PC, se guarda solo en **tu navegador**
- Otras personas que visitan el sitio **NO VEN** tus cambios
- Cada visitante ve los datos por defecto (sin tus ediciones)

### ¿Por qué pasa esto?

```typescript
// En /contexts/DataContext.tsx (línea 40)
const saveSiteData = () => {
  localStorage.setItem('andy_site_data', JSON.stringify(siteData)); // ❌ Solo local
};
```

Este código guarda los datos en el navegador local. **No hay un servidor central** donde se almacenen los datos para todos.

---

## ✅ SOLUCIÓN: Migrar a Supabase

Supabase te permite guardar los datos en **la nube**, para que todos los visitantes vean los mismos cambios.

### Arquitectura Actual (localStorage)

```
┌─────────────────┐
│   TU NAVEGADOR  │
│                 │
│  localStorage   │ ← Solo tú ves los cambios
│  (datos locales)│
└─────────────────┘

┌─────────────────┐
│ OTRO VISITANTE  │
│                 │
│  localStorage   │ ← Ve datos por defecto
│  (vacío)        │
└─────────────────┘
```

### Arquitectura con Supabase (Correcto)

```
┌─────────────────┐
│   TU NAVEGADOR  │
│                 │
│  Editor Admin   │ ──┐
└─────────────────┘   │
                      │
                      ▼
              ┌───────────────┐
              │   SUPABASE    │
              │   (Base de    │ ← Datos centralizados
              │    Datos)     │
              └───────────────┘
                      ▲
                      │
┌─────────────────┐   │
│ OTRO VISITANTE  │ ──┘
│                 │
│  Lee datos      │
└─────────────────┘
```

---

## 📋 PASOS PARA MIGRAR

### 1. Ya tienes Supabase conectado ✅

El proyecto ya tiene Supabase integrado. Solo necesitas actualizar el código.

### 2. Actualizar DataContext para usar Supabase

Reemplaza `/contexts/DataContext.tsx` con este código:

```typescript
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { createClient } from '@supabase/supabase-js';
import { defaultSiteData } from '../data/defaultSiteData';

// Crear cliente Supabase
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

  // Load data from Supabase on mount
  useEffect(() => {
    loadDataFromSupabase();
  }, []);

  const loadDataFromSupabase = async () => {
    try {
      setIsLoading(true);
      
      // Obtener datos de Supabase
      const { data, error } = await supabase
        .from('site_data')
        .select('*')
        .eq('site_id', 'theandy444')
        .single();

      if (error) {
        console.error('Error loading data from Supabase:', error);
        // Si no hay datos, usar los por defecto
        setSiteData(defaultSiteData as SiteData);
      } else if (data && data.content) {
        // Usar datos de Supabase
        setSiteData(data.content);
      }
    } catch (error) {
      console.error('Error loading saved data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateSiteData = (newData: Partial<SiteData>) => {
    setSiteData(prev => ({ ...prev, ...newData }));
  };

  const saveSiteData = async () => {
    try {
      // Guardar en Supabase
      const { error } = await supabase
        .from('site_data')
        .upsert({
          site_id: 'theandy444',
          content: siteData,
          updated_at: new Date().toISOString()
        });

      if (error) {
        console.error('Error saving to Supabase:', error);
        throw error;
      }

      console.log('✅ Datos guardados correctamente en Supabase');
    } catch (error) {
      console.error('Error saving data:', error);
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
  if (context === undefined) {
    throw new Error('useSiteData must be used within a DataProvider');
  }
  return context;
};
```

### 3. Crear la tabla en Supabase

Ve a tu panel de Supabase y ejecuta este SQL:

```sql
-- Crear tabla para almacenar los datos del sitio
CREATE TABLE IF NOT EXISTS site_data (
  site_id TEXT PRIMARY KEY,
  content JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insertar datos iniciales
INSERT INTO site_data (site_id, content, updated_at)
VALUES ('theandy444', '{}'::jsonb, NOW())
ON CONFLICT (site_id) DO NOTHING;

-- Habilitar RLS (Row Level Security)
ALTER TABLE site_data ENABLE ROW LEVEL SECURITY;

-- Crear política para permitir lectura pública
CREATE POLICY "Allow public read access"
ON site_data
FOR SELECT
USING (true);

-- Crear política para permitir escritura solo con autenticación
CREATE POLICY "Allow authenticated write access"
ON site_data
FOR ALL
USING (auth.role() = 'authenticated');
```

### 4. Configurar variables de entorno

En Vercel o tu hosting, agrega estas variables:

```env
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu-clave-anon-key
```

**¿Dónde encuentro estas claves?**

1. Ve a tu proyecto Supabase: https://supabase.com/dashboard
2. Click en "Settings" → "API"
3. Copia "Project URL" y "anon/public key"

---

## 🎯 BENEFICIOS DE LA MIGRACIÓN

### Antes (localStorage)
- ❌ Solo tú ves los cambios
- ❌ Datos se pierden al limpiar navegador
- ❌ No funciona en múltiples dispositivos
- ❌ No hay backup de datos

### Después (Supabase)
- ✅ **TODOS** ven los mismos cambios
- ✅ Datos persistentes en la nube
- ✅ Funciona en cualquier dispositivo
- ✅ Backup automático
- ✅ Historial de cambios
- ✅ Más seguro y profesional

---

## 🧪 CÓMO PROBAR

1. Edita algo en el panel admin
2. Abre el sitio en **modo incógnito** o en **otro navegador**
3. Los cambios deberían verse inmediatamente

---

## ⚠️ IMPORTANTE

- **NO olvides** ejecutar el SQL en Supabase
- **NO olvides** configurar las variables de entorno
- **NO borres** el archivo `defaultSiteData.ts` (sirve como fallback)

---

## 🆘 PROBLEMAS COMUNES

### "No se guardan los datos"
→ Verifica que las variables de entorno estén configuradas correctamente

### "Error de permisos"
→ Asegúrate de haber ejecutado el SQL con las políticas RLS

### "Los cambios no se ven"
→ Limpia la cache del navegador o abre en modo incógnito

---

## 📞 CONTACTO

Si tienes problemas con la migración, puedes:
1. Revisar los logs de la consola del navegador (F12)
2. Revisar los logs de Supabase en el dashboard
3. Verificar que la tabla `site_data` existe en Supabase

---

**¡Buena suerte con la migración! 🚀**
