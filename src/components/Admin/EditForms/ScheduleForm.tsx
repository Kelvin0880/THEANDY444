import { useState } from 'react';
import { Save, Plus, Trash2 } from 'lucide-react';
import { useSiteData } from '../../../contexts/DataContext';
import { toast } from 'sonner';

export function ScheduleForm() {
  const { siteData, updateSiteData, saveSiteData } = useSiteData();
  const [formData, setFormData] = useState(siteData.schedule);

  const handleScheduleChange = (index: number, field: string, value: string) => {
    const newSchedule = [...formData];
    newSchedule[index] = { ...newSchedule[index], [field]: value };
    setFormData(newSchedule);
  };

  const addScheduleItem = () => {
    setFormData([...formData, { day: '', time: '', game: '' }]);
  };

  const removeScheduleItem = (index: number) => {
    const newSchedule = formData.filter((_: any, i: number) => i !== index);
    setFormData(newSchedule);
  };

  const handleSave = async () => {
    try {
      console.log('🔄 ScheduleForm - Iniciando guardado...', formData);
      
      // Primero actualizar el estado local
      updateSiteData({ schedule: formData });
      
      // Luego guardar en Supabase y esperar a que termine
      await saveSiteData();
      
      console.log('✅ ScheduleForm - Guardado exitoso');
      toast.success('Horario de streams actualizado correctamente');
    } catch (error) {
      console.error('❌ ScheduleForm - Error al guardar:', error);
      toast.error('Error al guardar los cambios');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-white">Horario de Streams</h2>
          <p className="text-white/60">Gestiona tu calendario de transmisiones</p>
        </div>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-6 py-3 bg-[#00ff7f] text-black rounded-lg hover:bg-[#00ff99] transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,255,127,0.5)]"
        >
          <Save size={18} />
          Guardar Cambios
        </button>
      </div>

      <div className="space-y-4">
        {formData.map((item: any, index: number) => (
          <div key={index} className="bg-[#1a1a1a] border border-[#00ff7f]/20 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white">Stream #{index + 1}</h3>
              {formData.length > 1 && (
                <button
                  onClick={() => removeScheduleItem(index)}
                  className="px-3 py-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-white/80 mb-2 text-sm">Día</label>
                <input
                  type="text"
                  value={item.day}
                  onChange={(e) => handleScheduleChange(index, 'day', e.target.value)}
                  placeholder="Lunes"
                  className="w-full bg-[#0a0a0a] border border-[#00ff7f]/30 rounded-lg px-4 py-2 text-white focus:border-[#00ff7f] focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-white/80 mb-2 text-sm">Horario</label>
                <input
                  type="text"
                  value={item.time}
                  onChange={(e) => handleScheduleChange(index, 'time', e.target.value)}
                  placeholder="8:00 PM - 12:00 AM"
                  className="w-full bg-[#0a0a0a] border border-[#00ff7f]/30 rounded-lg px-4 py-2 text-white focus:border-[#00ff7f] focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-white/80 mb-2 text-sm">Juego</label>
                <input
                  type="text"
                  value={item.game}
                  onChange={(e) => handleScheduleChange(index, 'game', e.target.value)}
                  placeholder="GTA V Roleplay"
                  className="w-full bg-[#0a0a0a] border border-[#00ff7f]/30 rounded-lg px-4 py-2 text-white focus:border-[#00ff7f] focus:outline-none transition-colors"
                />
              </div>
            </div>
          </div>
        ))}

        <button
          onClick={addScheduleItem}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#00ff7f]/10 border-2 border-dashed border-[#00ff7f]/30 text-[#00ff7f] rounded-lg hover:bg-[#00ff7f]/20 hover:border-[#00ff7f]/50 transition-all duration-300"
        >
          <Plus size={20} />
          Añadir Nuevo Stream
        </button>
      </div>
    </div>
  );
}
