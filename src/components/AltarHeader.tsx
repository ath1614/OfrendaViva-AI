import React from 'react';
import { Volume2, VolumeX, Flame, Plus, Sparkles, Terminal, Flower2 } from 'lucide-react';
import { ambientSound } from '../audio/ambient-soundscape';

interface AltarHeaderProps {
  mode: 'ofrenda' | 'ghost';
  onToggleMode: (newMode: 'ofrenda' | 'ghost') => void;
  onOpenAddModal: () => void;
  onLightCandle: () => void;
  candleCount: number;
  isPlayingAudio: boolean;
  onToggleAudio: () => void;
}

export const AltarHeader: React.FC<AltarHeaderProps> = ({
  mode,
  onToggleMode,
  onOpenAddModal,
  onLightCandle,
  candleCount,
  isPlayingAudio,
  onToggleAudio,
}) => {
  return (
    <header className="relative z-30 w-full border-b border-amber-900/30 bg-black/60 backdrop-blur-md px-4 py-3 sm:px-8">
      {/* Decorative Papel Picado Garland */}
      {mode === 'ofrenda' && (
        <div className="absolute top-0 left-0 right-0 flex justify-between overflow-hidden opacity-90 pointer-events-none -mt-1">
          {['#D81159', '#FF9F1C', '#00BB77', '#9D4EDD', '#FF5400', '#00F5D4', '#E36414', '#D81159', '#FF9F1C'].map(
            (color, i) => (
              <div
                key={i}
                className="papel-banner mx-1 h-3 w-8 sm:w-16 rounded-b-md shadow-sm"
                style={{ backgroundColor: color, animationDelay: `${i * 0.25}s` }}
              />
            )
          )}
        </div>
      )}

      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">
        {/* Brand / Title */}
        <div className="flex items-center gap-3">
          <div
            className={`flex h-11 w-11 items-center justify-center rounded-xl border text-xl shadow-inner ${
              mode === 'ofrenda'
                ? 'border-amber-500/40 bg-gradient-to-br from-amber-950 to-amber-900 text-amber-400'
                : 'border-emerald-500/40 bg-gradient-to-br from-emerald-950 to-black text-emerald-400'
            }`}
          >
            {mode === 'ofrenda' ? '🌼' : '👻'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1
                className={`text-xl font-bold tracking-tight sm:text-2xl ${
                  mode === 'ofrenda'
                    ? 'font-serif text-amber-200'
                    : 'font-mono text-emerald-400'
                }`}
                style={{ fontFamily: mode === 'ofrenda' ? 'Cinzel Decorative, serif' : 'VT323, monospace' }}
              >
                {mode === 'ofrenda' ? 'Ofrenda Viva' : 'GHOST//TERMINAL'}
              </h1>
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase ${
                  mode === 'ofrenda'
                    ? 'border border-amber-600/40 bg-amber-950/60 text-amber-400'
                    : 'border border-emerald-600/40 bg-emerald-950/60 text-emerald-300 font-mono'
                }`}
              >
                100% Local AI
              </span>
            </div>
            <p className="text-xs text-stone-400">
              {mode === 'ofrenda'
                ? 'Día de los Muertos Sacred Sanctuary & Memory Vault'
                : 'Ghost in the Machine: Offline Spirit Séance'}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Mode Switcher */}
          <div className="flex items-center rounded-xl border border-stone-800 bg-stone-900/80 p-1">
            <button
              onClick={() => onToggleMode('ofrenda')}
              className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-all ${
                mode === 'ofrenda'
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <Flower2 className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Día de los Muertos</span>
              <span className="sm:hidden">Altar</span>
            </button>
            <button
              onClick={() => onToggleMode('ghost')}
              className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-all ${
                mode === 'ghost'
                  ? 'bg-emerald-600 text-black font-semibold shadow-md'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <Terminal className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Ghost in the Machine</span>
              <span className="sm:hidden">Séance</span>
            </button>
          </div>

          {/* Candle Lighting Action */}
          <button
            onClick={onLightCandle}
            className={`flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-medium transition-all active:scale-95 ${
              mode === 'ofrenda'
                ? 'border-amber-500/40 bg-amber-950/40 text-amber-300 hover:bg-amber-900/50 hover:border-amber-400'
                : 'border-emerald-500/40 bg-emerald-950/40 text-emerald-300 hover:bg-emerald-900/50 hover:border-emerald-400'
            }`}
            title="Light a candle on the altar"
          >
            <Flame className="h-3.5 w-3.5 text-amber-400 candle-flame" />
            <span>Light Candle ({candleCount})</span>
          </button>

          {/* Add Ancestor Button */}
          <button
            onClick={onOpenAddModal}
            className="flex items-center gap-1.5 rounded-xl border border-stone-700 bg-stone-800/80 px-3 py-1.5 text-xs font-medium text-stone-200 hover:bg-stone-700 hover:text-white transition-all active:scale-95"
          >
            <Plus className="h-3.5 w-3.5 text-amber-400" />
            <span className="hidden sm:inline">Add Loved One</span>
          </button>

          {/* Audio Soundscape Toggle */}
          <button
            onClick={onToggleAudio}
            className={`flex h-8 w-8 items-center justify-center rounded-xl border transition-all ${
              isPlayingAudio
                ? mode === 'ofrenda'
                  ? 'border-amber-500 bg-amber-500/20 text-amber-300'
                  : 'border-emerald-500 bg-emerald-500/20 text-emerald-300'
                : 'border-stone-800 bg-stone-900 text-stone-400 hover:text-stone-200'
            }`}
            title={isPlayingAudio ? 'Mute procedural ambient soundscape' : 'Play procedural soundscape'}
          >
            {isPlayingAudio ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </header>
  );
};
