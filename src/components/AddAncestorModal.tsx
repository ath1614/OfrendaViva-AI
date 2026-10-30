import React, { useState } from 'react';
import { Ancestor } from '../data/ancestors';
import { gemmaOfrenda, GeneratedRemembrance } from '../ai/gemma-ofrenda';
import { ambientSound } from '../audio/ambient-soundscape';
import { X, Sparkles, Flame, Check, Cpu } from 'lucide-react';
import confetti from 'canvas-confetti';

interface AddAncestorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddAncestor: (newAncestor: Ancestor) => void;
}

export const AddAncestorModal: React.FC<AddAncestorModalProps> = ({
  isOpen,
  onClose,
  onAddAncestor,
}) => {
  const [name, setName] = useState<string>('');
  const [lifespan, setLifespan] = useState<string>('1940 – 2022');
  const [relationship, setRelationship] = useState<string>('Grandparent');
  const [memory, setMemory] = useState<string>('');
  const [favoriteTreat, setFavoriteTreat] = useState<string>('');
  const [isSynthesizing, setIsSynthesizing] = useState<boolean>(false);
  const [generatedResult, setGeneratedResult] = useState<GeneratedRemembrance | null>(null);

  if (!isOpen) return null;

  const handleSynthesize = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsSynthesizing(true);
    ambientSound.playGuitarPluck(440);

    try {
      const result = await gemmaOfrenda.generateRemembrance(
        name,
        relationship,
        memory || 'Their laughter and boundless kindness in our home.',
        favoriteTreat || 'Freshly made sweet bread and chamomile tea'
      );
      setGeneratedResult(result);
    } catch {
      // Pass
    } finally {
      setIsSynthesizing(false);
    }
  };

  const handlePlaceOnAltar = () => {
    if (!generatedResult) return;

    const newAncestor: Ancestor = {
      id: `custom-${Date.now()}`,
      name,
      title: `${relationship} & Beloved Soul`,
      lifespan,
      category: 'family',
      avatarEmoji: relationship.toLowerCase().includes('grand') ? '👵🏽' : '✨',
      avatarBg: 'from-amber-950 to-stone-900',
      quote: generatedResult.epitaph,
      story: memory || 'A cherished soul whose spirit lives on forever on our family altar.',
      favoriteOfferings: generatedResult.recommendedOfferings,
      epitaph: generatedResult.epitaph,
      calaverita: generatedResult.calaverita,
      ghostPersonality: {
        systemPrompt: `You are the loving departed spirit of ${name} (${relationship}). Speak with tender affection, nostalgia, and gentle wisdom.`,
        firstMessage: `Hola mi cielo... Qué hermoso ver que me tienes presente en el altar. Sentí el aroma del cempasúchil llamándome.`,
        sampleQuestions: [
          `¿Qué se siente volver en el Día de los Muertos?`,
          `¿Me estás cuidando desde allá?`,
          `Siempre recuerdo tus consejos...`
        ],
        responses: {
          '¿Qué se siente volver en el Día de los Muertos?': 'Es un calor inmenso en el alma, mi vida. Al ver tu vela encendida, sé que el amor nunca se apaga.',
          '¿Me estás cuidando desde allá?': 'Siempre, en cada paso y en cada latido. No tengas miedo de equivocarte; vive con ganas y alegría.',
          'Siempre recuerdo tus consejos...': 'Y yo siempre celebro tus triunfos. Sigue adelante con la frente en alto y el corazón en paz.'
        }
      },
      tier: 1
    };

    onAddAncestor(newAncestor);
    ambientSound.playSanctuaryBell();

    // Golden marigold confetti shower
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FF9F1C', '#FFAA00', '#FF5400', '#FFE169', '#E36414'],
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl rounded-2xl border border-amber-500/40 bg-stone-950 p-6 sm:p-8 shadow-2xl text-stone-200 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 rounded-xl border border-stone-800 p-2 text-stone-400 hover:text-white hover:bg-stone-800 transition-all"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl">🌼</span>
          <h3 className="text-xl sm:text-2xl font-bold text-amber-200" style={{ fontFamily: 'Cinzel Decorative, serif' }}>
            Consagrar a un Ser Querido en el Altar
          </h3>
        </div>
        <p className="text-xs text-stone-400 mb-6">
          Powered by local <strong className="text-amber-400">Google Gemma 2 (2B)</strong>. Your family memories, intimate grief, and stories remain 100% on your laptop—never uploaded to any third-party cloud.
        </p>

        {!generatedResult ? (
          <form onSubmit={handleSynthesize} className="space-y-4 text-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-amber-300 mb-1">Nombre Completo</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Abuelita Rosa"
                  className="w-full rounded-xl border border-stone-800 bg-stone-900 px-3 py-2 text-sm text-stone-100 placeholder-stone-600 focus:border-amber-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-amber-300 mb-1">Años de Vida</label>
                <input
                  type="text"
                  value={lifespan}
                  onChange={(e) => setLifespan(e.target.value)}
                  placeholder="e.g. 1938 – 2021"
                  className="w-full rounded-xl border border-stone-800 bg-stone-900 px-3 py-2 text-sm text-stone-100 placeholder-stone-600 focus:border-amber-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-amber-300 mb-1">Vínculo o Relación</label>
                <select
                  value={relationship}
                  onChange={(e) => setRelationship(e.target.value)}
                  className="w-full rounded-xl border border-stone-800 bg-stone-900 px-3 py-2 text-sm text-stone-100 focus:border-amber-500 focus:outline-none"
                >
                  <option value="Grandparent">Abuelo / Abuela</option>
                  <option value="Parent">Padre / Madre</option>
                  <option value="Mentor / Teacher">Maestro / Mentor</option>
                  <option value="Sibling / Cousin">Hermano / Primo</option>
                  <option value="Beloved Friend">Amigo del Alma</option>
                  <option value="Coding Pioneer">Pionero Tecnológico</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-amber-300 mb-1">Comida o Canción Favorita</label>
                <input
                  type="text"
                  value={favoriteTreat}
                  onChange={(e) => setFavoriteTreat(e.target.value)}
                  placeholder="e.g. Tamales de elote, Boleros de Agustín Lara"
                  className="w-full rounded-xl border border-stone-800 bg-stone-900 px-3 py-2 text-sm text-stone-100 placeholder-stone-600 focus:border-amber-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-amber-300 mb-1">Recuerdo Inolvidable o Rasgo Especial</label>
              <textarea
                rows={3}
                value={memory}
                onChange={(e) => setMemory(e.target.value)}
                placeholder="Describe su risa, su plato especial, la forma en que contaba historias..."
                className="w-full rounded-xl border border-stone-800 bg-stone-900 p-3 text-sm text-stone-100 placeholder-stone-600 focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div className="pt-2 flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl border border-stone-800 px-4 py-2 text-xs font-semibold text-stone-400 hover:text-white"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={!name.trim() || isSynthesizing}
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 px-5 py-2 text-xs font-bold text-white shadow-lg hover:from-amber-500 hover:to-amber-400 disabled:opacity-50 transition-all"
              >
                <Sparkles className="h-4 w-4" />
                <span>{isSynthesizing ? 'Sintetizando con Gemma 2...' : 'Componer Recuerdo & Calaverita'}</span>
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-4 animate-fade-in text-sm">
            {/* Thought Inspection */}
            <div className="rounded-xl border border-amber-900/40 bg-amber-950/20 p-3 text-xs text-amber-400/90 font-mono">
              <div className="flex items-center gap-1.5 font-bold mb-1">
                <Cpu className="h-3.5 w-3.5 text-amber-400" />
                <span>Gemma 2 (2B) On-Device Synthesis Complete:</span>
              </div>
              <ul className="list-disc list-inside space-y-0.5 text-[11px] text-stone-300">
                {generatedResult.thoughtProcess.slice(0, 3).map((tp, idx) => (
                  <li key={idx}>{tp}</li>
                ))}
              </ul>
            </div>

            {/* Generated Calaverita Literaria */}
            <div className="rounded-xl border border-amber-700/50 bg-stone-900/90 p-4">
              <div className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2 flex items-center gap-1.5">
                <span>📜</span>
                <span>Calaverita Literaria Sagrada</span>
              </div>
              <pre className="font-serif italic text-sm text-amber-100 whitespace-pre-line leading-relaxed">
                {generatedResult.calaverita}
              </pre>
            </div>

            {/* Recommended Offerings */}
            <div className="rounded-xl border border-stone-800 bg-stone-900/60 p-3">
              <div className="text-xs font-semibold text-stone-300 mb-2">Ofrendas Consagradas para su Altar:</div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {generatedResult.recommendedOfferings.map((off, i) => (
                  <div key={i} className="flex items-center gap-2 rounded-lg bg-stone-950 border border-stone-800 p-2 text-xs">
                    <span className="text-lg">{off.icon}</span>
                    <span className="font-medium text-amber-200 truncate">{off.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-3">
              <button
                onClick={() => setGeneratedResult(null)}
                className="rounded-xl border border-stone-800 px-4 py-2 text-xs font-semibold text-stone-400 hover:text-white"
              >
                Editar Datos
              </button>
              <button
                onClick={handlePlaceOnAltar}
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 px-6 py-2 text-xs font-bold text-white shadow-xl hover:from-amber-500 hover:to-amber-400 transition-all"
              >
                <Flame className="h-4 w-4 text-amber-300" />
                <span>Colocar en el Altar Sagrado</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
