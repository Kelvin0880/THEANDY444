import { useState } from 'react';
import { Save } from 'lucide-react';
import { useSiteData } from '../../../contexts/DataContext';
import { toast } from 'sonner';

export function VideoForm() {
  const { siteData, updateSiteData, saveSiteData } = useSiteData();
  const [formData, setFormData] = useState(siteData.featuredVideo);

  const handleChange = (field: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    updateSiteData({ featuredVideo: formData });
    saveSiteData();
    toast.success('Clip destacado actualizado correctamente');
  };

  const extractVideoId = (url: string): string => {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : '';
  };

  const handleUrlChange = (url: string) => {
    handleChange('url', url);
    const videoId = extractVideoId(url);
    if (videoId) {
      handleChange('embedUrl', `https://www.youtube.com/embed/${videoId}`);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-white">Clip Destacado</h2>
          <p className="text-white/60">Actualiza tu video destacado de YouTube</p>
        </div>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-6 py-3 bg-[#00ff7f] text-black rounded-lg hover:bg-[#00ff99] transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,255,127,0.5)]"
        >
          <Save size={18} />
          Guardar Cambios
        </button>
      </div>

      <div className="grid gap-6">
        {/* Title */}
        <div>
          <label className="block text-white/80 mb-2">Título</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleChange('title', e.target.value)}
            className="w-full bg-[#0a0a0a] border border-[#00ff7f]/30 rounded-lg px-4 py-3 text-white focus:border-[#00ff7f] focus:outline-none transition-colors"
          />
        </div>

        {/* YouTube URL */}
        <div>
          <label className="block text-white/80 mb-2">URL de YouTube</label>
          <input
            type="url"
            value={formData.url}
            onChange={(e) => handleUrlChange(e.target.value)}
            placeholder="https://youtu.be/..."
            className="w-full bg-[#0a0a0a] border border-[#00ff7f]/30 rounded-lg px-4 py-3 text-white focus:border-[#00ff7f] focus:outline-none transition-colors"
          />
          <p className="text-white/40 text-xs mt-1">
            El URL de embed se generará automáticamente
          </p>
        </div>

        {/* Embed URL (Read-only) */}
        <div>
          <label className="block text-white/80 mb-2">URL de Embed (Auto-generado)</label>
          <input
            type="text"
            value={formData.embedUrl}
            readOnly
            className="w-full bg-[#0a0a0a] border border-[#00ff7f]/30 rounded-lg px-4 py-3 text-white/50 cursor-not-allowed"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-white/80 mb-2">Descripción</label>
          <textarea
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            rows={4}
            className="w-full bg-[#0a0a0a] border border-[#00ff7f]/30 rounded-lg px-4 py-3 text-white focus:border-[#00ff7f] focus:outline-none transition-colors resize-none"
          />
        </div>

        {/* Preview */}
        {formData.embedUrl && (
          <div className="bg-[#1a1a1a] border border-[#00ff7f]/20 rounded-lg p-4">
            <h3 className="text-white mb-4">Vista Previa</h3>
            <div className="relative rounded-lg overflow-hidden border border-[#00ff7f]/30">
              <div className="relative pb-[56.25%]">
                <iframe
                  src={formData.embedUrl}
                  title={formData.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute top-0 left-0 w-full h-full"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
