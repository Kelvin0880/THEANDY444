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
      
      // Obtener datos de Supabase
      const { data, error } = await supabase
        .from('site_data')
        .select('*')
        .eq('site_id', 'theandy444')
        .single();

      if (error) {
        console.error('Error loading data from Supabase:', error);
        // Si no hay datos, usar los por defecto
        console.log('🔄 Usando datos por defecto:', defaultSiteData);
        setSiteData(defaultSiteData as SiteData);
      } else if (data && data.content) {
        // Usar datos de Supabase
        console.log('✅ Datos cargados desde Supabase:', data.content);
        console.log('🖼️ Imagen de Zoro:', data.content.zoroSection?.image);
        setSiteData(data.content);
        console.log('✅ Datos cargados desde Supabase');
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