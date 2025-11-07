-- ============================================
-- CONFIGURACIÓN DE SUPABASE PARA THEANDY444
-- ============================================
-- 
-- INSTRUCCIONES:
-- 1. Ve a tu panel de Supabase: https://supabase.com/dashboard
-- 2. Selecciona tu proyecto
-- 3. Click en "SQL Editor" en el sidebar izquierdo
-- 4. Click en "New Query"
-- 5. Copia y pega TODO este archivo
-- 6. Click en "Run" o presiona Ctrl+Enter
-- 7. ¡Listo! Tu base de datos está configurada
-- ============================================

-- Crear tabla para almacenar los datos del sitio web
CREATE TABLE IF NOT EXISTS site_data (
  site_id TEXT PRIMARY KEY,
  content JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear índice para búsquedas más rápidas
CREATE INDEX IF NOT EXISTS idx_site_data_site_id ON site_data(site_id);

-- Insertar datos iniciales (vacíos por ahora, se llenarán desde el admin)
INSERT INTO site_data (site_id, content, created_at, updated_at)
VALUES (
  'theandy444',
  '{
    "hero": {
      "title": "Bienvenido al Universo de",
      "highlightText": "TheAndy444",
      "subtitle": "Streamer dominicano de GTA V Roleplay y más",
      "description": "Únete a la aventura en DominicanYork y vive la experiencia más divertida del roleplay",
      "primaryButton": {
        "text": "Ver en Vivo",
        "url": "https://kick.com/theandy444"
      },
      "secondaryButton": {
        "text": "Únete al Discord",
        "url": "https://discord.gg/jzQ8rtnV"
      }
    },
    "zoroSection": {
      "title": "Zoroversionmarimo",
      "subtitle": "El espíritu guerrero de TheAndy444",
      "description": "Una fusión inspirada en la energía y carisma de TheAndy444. Representa fuerza, enfoque y determinación dentro y fuera del stream.",
      "image": "/images/Zoroversionmarimo.png",
      "themeColor": "#00FF80",
      "enabled": true
    },
    "about": {
      "sectionTitle": "Sobre Mí",
      "name": "TheAndy444",
      "title": "Streamer Profesional",
      "country": "República Dominicana 🇩🇴",
      "bio": [
        "Soy un streamer dominicano apasionado por los videojuegos y la creación de contenido. Mi especialidad es GTA V Roleplay, especialmente en los servidores de DominicanYork, donde vivo aventuras increíbles cada día.",
        "Me caracterizo por mi estilo divertido, carismático y auténtico. Aquí encontrarás risas, acción y momentos épicos que no querrás perderte.",
        "Únete a mi comunidad y sé parte de esta gran familia que crece cada día. ¡Nos vemos en el stream!"
      ],
      "stats": [
        { "label": "Años Streameando", "value": "3+" },
        { "label": "Comunidad Activa", "value": "10K+" },
        { "label": "Horas en Vivo", "value": "2000+" }
      ]
    },
    "featuredVideo": {
      "url": "https://youtu.be/8m5nLbP39fw?si=qdTGBqA9MBl3UPcN",
      "embedUrl": "https://www.youtube.com/embed/8m5nLbP39fw",
      "title": "Último Directo Destacado",
      "description": "¡Mira los mejores momentos de mi último stream en GTA V Roleplay!"
    },
    "schedule": [
      {
        "day": "Lunes",
        "time": "8:00 PM - 12:00 AM",
        "game": "GTA V Roleplay"
      },
      {
        "day": "Miércoles",
        "time": "8:00 PM - 12:00 AM",
        "game": "GTA V Roleplay"
      },
      {
        "day": "Viernes",
        "time": "9:00 PM - 2:00 AM",
        "game": "Variedad"
      },
      {
        "day": "Sábado",
        "time": "7:00 PM - 1:00 AM",
        "game": "GTA V Roleplay"
      }
    ],
    "socialLinks": [
      {
        "name": "Kick",
        "url": "https://kick.com/theandy444",
        "icon": "Zap",
        "color": "#53fc18"
      },
      {
        "name": "Twitch",
        "url": "https://www.twitch.tv/theandy444",
        "icon": "Twitch",
        "color": "#9146ff"
      },
      {
        "name": "Discord",
        "url": "https://discord.gg/jzQ8rtnV",
        "icon": "MessageCircle",
        "color": "#5865f2"
      },
      {
        "name": "YouTube",
        "url": "https://www.youtube.com/@theandy4",
        "icon": "Youtube",
        "color": "#ff0000"
      },
      {
        "name": "Facebook",
        "url": "https://www.facebook.com/profile.php?id=100076200245398",
        "icon": "Facebook",
        "color": "#1877f2"
      },
      {
        "name": "TikTok",
        "url": "https://www.tiktok.com/@theandy444",
        "icon": "Music",
        "color": "#000000"
      },
      {
        "name": "Instagram",
        "url": "https://www.instagram.com/theandy04/",
        "icon": "Instagram",
        "color": "#e4405f"
      }
    ],
    "cta": {
      "title": "Únete a la Comunidad de TheAndy444",
      "subtitle": "Forma parte de una familia que crece cada día",
      "description": "No te pierdas ningún stream, evento especial o momento épico. Únete ahora y disfruta del mejor contenido de GTA V Roleplay y mucho más.",
      "buttons": [
        {
          "text": "Únete al Discord",
          "url": "https://discord.gg/jzQ8rtnV",
          "variant": "primary",
          "icon": "MessageCircle"
        },
        {
          "text": "Sígueme en Kick",
          "url": "https://kick.com/theandy444",
          "variant": "secondary",
          "icon": "Zap"
        }
      ],
      "features": [
        {
          "title": "Comunidad Activa",
          "description": "Miles de miembros compartiendo la diversión"
        },
        {
          "title": "Contenido Exclusivo",
          "description": "Acceso a clips, highlights y más"
        },
        {
          "title": "Eventos Especiales",
          "description": "Participa en eventos y sorteos"
        }
      ]
    }
  }'::jsonb,
  NOW(),
  NOW()
)
ON CONFLICT (site_id) DO NOTHING;

-- Habilitar Row Level Security (RLS)
ALTER TABLE site_data ENABLE ROW LEVEL SECURITY;

-- Eliminar políticas anteriores si existen
DROP POLICY IF EXISTS "Allow public read access" ON site_data;
DROP POLICY IF EXISTS "Allow authenticated write access" ON site_data;
DROP POLICY IF EXISTS "Allow admin write access" ON site_data;

-- Crear política para LECTURA PÚBLICA (todos pueden leer)
CREATE POLICY "Allow public read access"
ON site_data
FOR SELECT
USING (true);

-- Crear política para ESCRITURA AUTENTICADA (solo usuarios autenticados pueden escribir)
CREATE POLICY "Allow authenticated write access"
ON site_data
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Crear política para ACTUALIZACIÓN AUTENTICADA
CREATE POLICY "Allow authenticated update access"
ON site_data
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Crear función para actualizar automáticamente el campo updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ language 'plpgsql';

-- Crear trigger para actualizar updated_at automáticamente
DROP TRIGGER IF EXISTS update_site_data_updated_at ON site_data;
CREATE TRIGGER update_site_data_updated_at
    BEFORE UPDATE ON site_data
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- VERIFICACIÓN
-- ============================================

-- Verificar que la tabla se creó correctamente
SELECT 
  tablename, 
  schemaname 
FROM pg_tables 
WHERE tablename = 'site_data';

-- Verificar que los datos iniciales están presentes
SELECT 
  site_id, 
  created_at, 
  updated_at,
  content->>'hero' as hero_data
FROM site_data 
WHERE site_id = 'theandy444';

-- Verificar que RLS está habilitado
SELECT 
  tablename, 
  rowsecurity 
FROM pg_tables 
WHERE tablename = 'site_data';

-- Listar todas las políticas
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd
FROM pg_policies
WHERE tablename = 'site_data';

-- ============================================
-- ¡LISTO! 
-- ============================================
-- 
-- Si ves resultados en las consultas de arriba,
-- ¡tu base de datos está correctamente configurada!
-- 
-- SIGUIENTE PASO:
-- 1. Copia tu Project URL y Anon Key desde:
--    Settings > API en tu panel de Supabase
-- 
-- 2. Agrégalas como variables de entorno en Vercel:
--    VITE_SUPABASE_URL=https://xxx.supabase.co
--    VITE_SUPABASE_ANON_KEY=xxx
-- 
-- 3. Actualiza el archivo /contexts/DataContext.tsx
--    (ver MIGRATION_GUIDE.md)
-- ============================================
