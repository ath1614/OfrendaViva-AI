import React from 'react';
import { Ancestor } from '../data/ancestors';
import { ambientSound } from '../audio/ambient-soundscape';
import { X, Sparkles, MessageSquare, Heart, Quote, Flame } from 'lucide-react';
import confetti from 'canvas-confetti';

interface AncestorDetailModalProps {
  ancestor: Ancestor | null;
  onClose: () => void;
  onOpenSeance: (ancestor: Ancestor) => void;
  onPlaceOffering: (ancestorId: string, offeringName: string) => void;
  offeringsCount: number;
}

export const AncestorDetailModal: React.FC<AncestorDetailModalProps> = ({
  ancestor,
  onClose,
  onOpenSeance,
  onPlaceOffering,
  offeringsCount,
}) => {
  if (!ancestor) return null;

  const handleOfferPetal = () => {
    onPlaceOffering(ancestor.id, 'Cempasúchil Dorado');
    ambientSound.playGuitarPluck(392);

    confetti({
      particleCount: 30,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#FF9F1C', '#FFAA00', '#FF5400', '#FFE169'],
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl rounded-2xl border border-amber-600/40 bg-stone-950 p-6 sm:p-8 shadow-2xl text-stone-200 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          aria-label="Cerrar modal"
          className="absolute top-4 right-4 rounded-xl border border-stone-800 p-2 text-stone-400 hover:text-white hover:bg-stone-800 transition-all"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Header with Avatar and Names */}
        <div className="flex items-start gap-4 mb-6">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-950 to-stone-900 border border-amber-500/50 text-4xl shadow-xl">
            {ancestor.avatarEmoji}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-2xl font-bold text-amber-200" style={{ fontFamily: 'Cinzel Decorative, serif' }}>
                {ancestor.name}
              </h3>
              <span className="rounded-full border border-amber-700/50 bg-amber-950/60 px-2 py-0.5 text-xs font-mono text-amber-400">
                {ancestor.lifespan}
              </span>
            </div>
            <p className="text-sm text-amber-400/90 font-medium">{ancestor.title}</p>
            <p className="text-xs text-stone-400 mt-1">Tier {ancestor.tier} del Altar • {ancestor.category.toUpperCase()}</p>
          </div>
        </div>

        {/* Quote Callout */}
        <div className="relative rounded-xl border border-amber-800/40 bg-amber-950/20 p-4 mb-6 italic text-stone-200 text-sm leading-relaxed">
          <Quote className="absolute top-2 right-2 h-6 w-6 text-amber-500/20" />
          "{ancestor.quote}"
        </div>

        {/* Biography & Legacy */}
        <div className="mb-6">
          <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">
            Legado & Memoria Histórica
          </h4>
          <p className="text-sm text-stone-300 leading-relaxed font-light">
            {ancestor.story}
          </p>
        </div>

        {/* Traditional Calaverita Literaria */}
        <div className="rounded-xl border border-amber-600/40 bg-stone-900/80 p-5 mb-6">
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-300">
              <span>💀</span>
              <span>Calaverita Literaria Tradicional</span>
            </div>
            <span className="text-[10px] text-stone-400">Versos Mexicanos de Día de los Muertos</span>
          </div>
          <pre className="font-serif italic text-sm text-amber-100 whitespace-pre-line leading-relaxed bg-black/40 p-4 rounded-lg border border-amber-950">
            {ancestor.calaverita}
          </pre>
        </div>

        {/* Traditional Offerings */}
        <div className="mb-6">
          <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2 flex items-center justify-between">
            <span>Ofrendas Sagradas Colocadas</span>
            <span className="text-stone-400 font-normal">Total: {offeringsCount} flores</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {ancestor.favoriteOfferings.map((off, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-stone-800 bg-stone-900/60 p-3 flex flex-col justify-between"
              >
                <div>
                  <div className="text-2xl mb-1">{off.icon}</div>
                  <div className="text-xs font-bold text-amber-200">{off.name}</div>
                  <div className="text-[11px] text-stone-400 leading-snug mt-1">{off.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="pt-4 border-t border-stone-800 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={handleOfferPetal}
            className="flex items-center gap-2 rounded-xl border border-amber-600/50 bg-amber-950/40 px-4 py-2 text-xs font-bold text-amber-300 hover:bg-amber-900/60 transition-all active:scale-95"
          >
            <span>🌼</span>
            <span>Ofrecer Cempasúchil ({offeringsCount})</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                onOpenSeance(ancestor);
              }}
              className="flex items-center gap-1.5 rounded-xl border border-emerald-500/50 bg-emerald-950/40 px-4 py-2 text-xs font-bold text-emerald-300 hover:bg-emerald-900/50 font-mono transition-all"
            >
              <MessageSquare className="h-3.5 w-3.5 text-emerald-400" />
              <span>Ghost Séance 👻</span>
            </button>
            <button
              onClick={onClose}
              className="rounded-xl bg-stone-800 hover:bg-stone-700 px-4 py-2 text-xs font-semibold text-white"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
