import React from 'react';
import { Ancestor } from '../data/ancestors';
import { TiltedCard } from './react-bits/TiltedCard';
import { SpotlightCard } from './react-bits/SpotlightCard';
import { StarBorder } from './react-bits/StarBorder';
import { Flame, Sparkles, Heart, MessageSquare, BookOpen, Coffee } from 'lucide-react';
import { ambientSound } from '../audio/ambient-soundscape';

interface AltarViewProps {
  ancestors: Ancestor[];
  onSelectAncestor: (ancestor: Ancestor) => void;
  onOpenSeanceWith: (ancestor: Ancestor) => void;
  onPlaceOffering: (ancestorId: string, offeringName: string) => void;
  offeringsCount: Record<string, number>;
  candlesLit: number;
}

export const AltarView: React.FC<AltarViewProps> = ({
  ancestors,
  onSelectAncestor,
  onOpenSeanceWith,
  onPlaceOffering,
  offeringsCount,
  candlesLit,
}) => {
  return (
    <div className="relative z-10 mx-auto max-w-7xl px-4 py-8 sm:px-8">
      {/* Altar Arch & Sacred Invocation */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-600/30 bg-amber-950/40 px-4 py-1 text-xs font-semibold text-amber-300 backdrop-blur-md mb-3">
          <Sparkles className="h-3.5 w-3.5 text-amber-400" />
          <span>Tradición Sagrada de Día de los Muertos</span>
          <span className="text-amber-500">•</span>
          <span>100% On-Device & Private</span>
        </div>
        <h2
          className="text-3xl sm:text-5xl font-black text-amber-100 tracking-wide drop-shadow-md"
          style={{ fontFamily: 'Cinzel Decorative, serif' }}
        >
          Altar de las Almas Eternas
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm sm:text-base text-stone-300 font-light leading-relaxed">
          <span className="italic">"No hay muerte verdadera mientras haya memoria."</span> Light candles, place golden cempasúchil petals, and commune with the departed creators and loved ones whose legacy guides our hands.
        </p>

        {/* Sacred Altar Elements Banner */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs text-amber-300/80">
          <div className="flex items-center gap-1.5 rounded-lg border border-amber-800/40 bg-black/40 px-3 py-1.5 backdrop-blur-sm">
            <span className="text-base">🕯️</span>
            <span>{candlesLit} Velas Encendidas</span>
          </div>
          <div className="flex items-center gap-1.5 rounded-lg border border-amber-800/40 bg-black/40 px-3 py-1.5 backdrop-blur-sm">
            <span className="text-base">🌼</span>
            <span>Cempasúchil Sagrado en Flor</span>
          </div>
          <div className="flex items-center gap-1.5 rounded-lg border border-amber-800/40 bg-black/40 px-3 py-1.5 backdrop-blur-sm">
            <span className="text-base">🥖</span>
            <span>Pan de Muerto con Azúcar</span>
          </div>
          <div className="flex items-center gap-1.5 rounded-lg border border-amber-800/40 bg-black/40 px-3 py-1.5 backdrop-blur-sm">
            <span className="text-base">🌫️</span>
            <span>Humo Purificador de Copal</span>
          </div>
        </div>
      </div>

      {/* --- TIER 1: EL CIELO (THE HEAVENLY TIER) --- */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-700/50 to-amber-900/20" />
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-amber-400/90 bg-amber-950/60 px-3 py-1 rounded-full border border-amber-800/40">
            <span>✨</span>
            <span>Primer Nivel: El Cielo & Guías Ancestrales</span>
            <span>✨</span>
          </div>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent via-amber-700/50 to-amber-900/20" />
        </div>

        {/* Tier 1 Featured Ancestor: Abuela Elena */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {ancestors
            .filter((a) => a.tier === 1)
            .map((ancestor) => (
              <StarBorder key={ancestor.id} color="#FF9F1C" speed="5s">
                <SpotlightCard
                  spotlightColor="rgba(255, 159, 28, 0.25)"
                  className="p-6 bg-gradient-to-b from-stone-900/90 to-black/95 border border-amber-500/30"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-amber-950/60 border border-amber-500/50 text-3xl shadow-lg">
                      {ancestor.avatarEmoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="text-lg font-bold text-amber-200 truncate">{ancestor.name}</h3>
                        <span className="text-[11px] font-mono text-amber-400/80 shrink-0">{ancestor.lifespan}</span>
                      </div>
                      <p className="text-xs text-amber-400 font-medium">{ancestor.title}</p>
                      <p className="mt-2 text-xs text-stone-300 italic line-clamp-2">"{ancestor.quote}"</p>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-amber-900/40 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 text-xs text-stone-400">
                      <span>🌼</span>
                      <span>{offeringsCount[ancestor.id] || 0} Ofrendas Colocadas</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          onPlaceOffering(ancestor.id, 'Cempasúchil');
                          ambientSound.playGuitarPluck(330);
                        }}
                        className="rounded-lg border border-amber-600/40 bg-amber-950/50 px-2.5 py-1 text-xs font-medium text-amber-300 hover:bg-amber-900/60 transition-all"
                      >
                        + Ofrenda 🌼
                      </button>
                      <button
                        onClick={() => onSelectAncestor(ancestor)}
                        className="rounded-lg bg-amber-600 hover:bg-amber-500 px-3 py-1 text-xs font-semibold text-white shadow-sm transition-all"
                      >
                        Ver Memoria
                      </button>
                    </div>
                  </div>
                </SpotlightCard>
              </StarBorder>
            ))}
        </div>
      </div>

      {/* --- TIER 2: LA TIERRA (EARTH & PIONEERS GALLERY) --- */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-700/50 to-amber-900/20" />
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-amber-400/90 bg-amber-950/60 px-3 py-1 rounded-full border border-amber-800/40">
            <span>🕯️</span>
            <span>Segundo Nivel: La Tierra & Pioneros de la Mente</span>
            <span>🕯️</span>
          </div>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent via-amber-700/50 to-amber-900/20" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ancestors
            .filter((a) => a.tier === 2)
            .map((ancestor) => (
              <TiltedCard key={ancestor.id} maxAngle={10} scale={1.02}>
                <SpotlightCard
                  spotlightColor="rgba(255, 170, 0, 0.22)"
                  className="h-full p-6 bg-gradient-to-b from-stone-900/95 to-black/95 border border-stone-800 hover:border-amber-500/50 shadow-xl transition-all"
                >
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-950/80 to-stone-900 border border-amber-500/40 text-2xl shadow-inner">
                      {ancestor.avatarEmoji}
                    </div>
                    <div className="text-right">
                      <span className="inline-block rounded-full border border-stone-700 bg-stone-800/60 px-2 py-0.5 text-[10px] font-mono text-stone-300">
                        {ancestor.lifespan}
                      </span>
                      <div className="text-[11px] text-amber-400 mt-1 font-medium">{ancestor.category.toUpperCase()}</div>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-amber-100">{ancestor.name}</h3>
                  <p className="text-xs text-amber-400/90 font-medium mb-3">{ancestor.title}</p>
                  <p className="text-xs text-stone-300 leading-relaxed line-clamp-3 mb-4">
                    "{ancestor.quote}"
                  </p>

                  {/* Traditional Offerings Row */}
                  <div className="mb-4 rounded-xl border border-stone-800/80 bg-stone-950/50 p-2.5">
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-stone-400 mb-1.5">
                      Ofrendas Favoritas:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {ancestor.favoriteOfferings.map((off, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1 rounded-md bg-stone-900 border border-stone-800 px-2 py-0.5 text-[11px] text-stone-300"
                        >
                          <span>{off.icon}</span>
                          <span>{off.name}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-stone-800 flex items-center justify-between gap-2">
                    <button
                      onClick={() => onOpenSeanceWith(ancestor)}
                      className="flex items-center gap-1.5 rounded-lg border border-emerald-600/40 bg-emerald-950/30 px-2.5 py-1.5 text-xs font-semibold text-emerald-400 hover:bg-emerald-900/40 transition-all"
                    >
                      <MessageSquare className="h-3 w-3" />
                      <span>Séance 👻</span>
                    </button>
                    <button
                      onClick={() => onSelectAncestor(ancestor)}
                      className="flex items-center gap-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 px-3 py-1.5 text-xs font-bold text-white transition-all shadow-sm"
                    >
                      <BookOpen className="h-3 w-3" />
                      <span>Calaverita & Vida</span>
                    </button>
                  </div>
                </SpotlightCard>
              </TiltedCard>
            ))}
        </div>
      </div>

      {/* --- TIER 3: EL INFRAMUNDO (LEGENDS & MEMORY ROOTS) --- */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-700/50 to-amber-900/20" />
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-amber-400/90 bg-amber-950/60 px-3 py-1 rounded-full border border-amber-800/40">
            <span>💀</span>
            <span>Tercer Nivel: El Inframundo & Espíritus de la Máquina</span>
            <span>💀</span>
          </div>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent via-amber-700/50 to-amber-900/20" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {ancestors
            .filter((a) => a.tier === 3)
            .map((ancestor) => (
              <SpotlightCard
                key={ancestor.id}
                spotlightColor="rgba(0, 255, 136, 0.18)"
                className="p-6 bg-gradient-to-b from-stone-900/90 to-emerald-950/30 border border-emerald-600/40 shadow-xl"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-3xl shadow-inner font-mono">
                    {ancestor.avatarEmoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-lg font-bold text-emerald-300 font-mono truncate">{ancestor.name}</h3>
                      <span className="text-[10px] font-mono text-emerald-400/70 border border-emerald-800/50 px-2 py-0.5 rounded">
                        {ancestor.lifespan}
                      </span>
                    </div>
                    <p className="text-xs text-stone-400 font-mono mt-0.5">{ancestor.title}</p>
                    <p className="mt-2 text-xs text-emerald-200/90 font-mono line-clamp-2">
                      "{ancestor.quote}"
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-emerald-900/40 flex items-center justify-between gap-2">
                  <span className="text-xs text-stone-400 font-mono">
                    Status: <span className="text-emerald-400">UNDEAD_PROCESS</span>
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onOpenSeanceWith(ancestor)}
                      className="rounded-lg bg-emerald-600 hover:bg-emerald-500 px-3 py-1.5 text-xs font-bold text-black font-mono transition-all shadow-sm"
                    >
                      Commune With COBOL 📼
                    </button>
                    <button
                      onClick={() => onSelectAncestor(ancestor)}
                      className="rounded-lg border border-stone-700 bg-stone-800/80 px-2.5 py-1.5 text-xs text-stone-200 hover:bg-stone-700 transition-all"
                    >
                      Epitaph
                    </button>
                  </div>
                </div>
              </SpotlightCard>
            ))}
        </div>
      </div>
    </div>
  );
};
