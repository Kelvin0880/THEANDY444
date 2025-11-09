import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { createClient } from '@jsr/supabase__supabase-js';
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
      
      // DIAGNÓSTICO: Verificar conexión a Supabase
      console.log('🔧 DIAGNÓSTICO - Variables de entorno:');
      console.log('VITE_SUPABASE_URL:', import.meta.env.VITE_SUPABASE_URL);
      console.log('VITE_SUPABASE_ANON_KEY:', import.meta.env.VITE_SUPABASE_ANON_KEY ? 'PRESENTE' : 'FALTANTE');
      
      // SIEMPRE obtener datos de Supabase, ignorar localStorage
      console.log('🔄 Intentando cargar datos desde Supabase...');
      const { data, error, count } = await supabase
        .from('site_data')
        .select('*', { count: 'exact' })
        .eq('site_id', 'theandy444')
        .single();

      console.log('📊 Respuesta de Supabase:');
      console.log('- Error:', error);
      console.log('- Data:', data);
      console.log('- Count:', count);

      if (error) {
        console.error('❌ Error loading data from Supabase:', error);
        console.log('🔄 Usando datos por defecto (error):', defaultSiteData);
        setSiteData(defaultSiteData as SiteData);
      } else if (data && data.content && Object.keys(data.content).length > 0) {
        // SOLO usar datos de Supabase SI tienen contenido
        console.log('✅ Datos cargados desde Supabase con contenido:', data.content);
        console.log('🖼️ Imagen de Zoro:', data.content.zoroSection?.image);
        console.log('📊 Stat comunidad:', data.content.about?.stats?.[1]?.value);
        setSiteData(data.content);
        console.log('✅ Datos aplicados desde Supabase');
      } else {
        // Si Supabase está vacío, usar datos por defecto
        console.log('🔄 Supabase está vacío, usando datos por defecto');
        console.log('📄 Datos por defecto:', defaultSiteData);
        setSiteData(defaultSiteData as SiteData);
      }
    } catch (error) {
      console.error('💥 Error crítico cargando datos:', error);
      setSiteData(defaultSiteData as SiteData);
    } finally {
      setIsLoading(false);
    }
  };

  const updateSiteData = (newData: Partial<SiteData>) => {
    setSiteData(prev => ({ ...prev, ...newData }));
  };

  const saveSiteData = async () => {
    try {
      console.log('🔄 Guardando datos en Supabase...', siteData);
      console.log('🔍 Datos específicos a guardar:', {
        heroTitle: siteData.hero?.title,
        aboutStats: siteData.about?.stats,
        zoroTitle: siteData.zoroSection?.title
      });
      
      // FORZAR UPDATE completo en lugar de upsert
      const { data: updateData, error } = await supabase
        .from('site_data')
        .update({
          content: siteData,
          updated_at: new Date().toISOString()
        })
        .eq('site_id', 'theandy444');

      if (error) {
        console.error('❌ Error updating Supabase:', error);
        // Si falla el update, intentar insert
        const { error: insertError } = await supabase
          .from('site_data')
          .insert({
            site_id: 'theandy444',
            content: siteData,
            updated_at: new Date().toISOString()
          });
        
        if (insertError) {
          console.error('❌ Error inserting to Supabase:', insertError);
          throw insertError;
        }
      }

      console.log('✅ Datos guardados correctamente en Supabase');
      console.log('📊 Respuesta de update:', updateData);
      
      // Verificar que se guardó correctamente
      await new Promise(resolve => setTimeout(resolve, 500)); // Esperar 500ms
      
      const { data: verifyData, error: verifyError } = await supabase
        .from('site_data')
        .select('content')
        .eq('site_id', 'theandy444')
        .single();
        
      if (verifyError) {
        console.error('❌ Error verificando datos:', verifyError);
      } else if (verifyData) {
        console.log('✅ Verificación: Datos confirmados en Supabase');
        console.log('🔍 Datos verificados:', {
          heroTitle: verifyData.content?.hero?.title,
          aboutStats: verifyData.content?.about?.stats,
          zoroTitle: verifyData.content?.zoroSection?.title
        });
      }
      
    } catch (error) {
      console.error('❌ Error saving data:', error);
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