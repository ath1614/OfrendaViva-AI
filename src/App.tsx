import React, { useState } from 'react';
import { Ancestor, INITIAL_ANCESTORS } from './data/ancestors';
import { AltarHeader } from './components/AltarHeader';
import { AltarView } from './components/AltarView';
import { GhostSeanceView } from './components/GhostSeanceView';
import { AddAncestorModal } from './components/AddAncestorModal';
import { AncestorDetailModal } from './components/AncestorDetailModal';
import { Particles } from './components/react-bits/Particles';
import { ambientSound } from './audio/ambient-soundscape';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, Terminal, Shield } from 'lucide-react';

export const App: React.FC = () => {
  const [mode, setMode] = useState<'ofrenda' | 'ghost'>('ofrenda');
  const [ancestors, setAncestors] = useState<Ancestor[]>(INITIAL_ANCESTORS);
  const [candlesLit, setCandlesLit] = useState<number>(7);
  const [offeringsCount, setOfferingsCount] = useState<Record<string, number>>({
    'abuela-elena': 4,
    'ada-lovelace': 3,
    'alan-turing': 5,
    'grace-hopper': 2,
    'ghost-cobol': 9,
  });
  const [selectedAncestorForDetail, setSelectedAncestorForDetail] = useState<Ancestor | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [selectedSpiritForSeance, setSelectedSpiritForSeance] = useState<Ancestor>(INITIAL_ANCESTORS[0]);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);

  const handleToggleMode = (newMode: 'ofrenda' | 'ghost') => {
    setMode(newMode);
    ambientSound.setMode(newMode);
    if (newMode === 'ghost') {
      ambientSound.playSpiritManifest();
    } else {
      ambientSound.playGuitarPluck(220);
    }
  };

  const handleToggleAudio = () => {
    const isPlaying = ambientSound.toggleMute();
    setIsPlayingAudio(isPlaying);
  };

  const handleLightCandle = () => {
    setCandlesLit((prev) => prev + 1);
    ambientSound.playSanctuaryBell();

    confetti({
      particleCount: 25,
      spread: 50,
      origin: { y: 0.8 },
      colors: mode === 'ofrenda' ? ['#FF9F1C', '#FFAA00', '#FFE169'] : ['#00FF88', '#39FF14', '#00F5D4'],
    });
  };

  const handlePlaceOffering = (ancestorId: string, _offeringName: string) => {
    setOfferingsCount((prev) => ({
      ...prev,
      [ancestorId]: (prev[ancestorId] || 0) + 1,
    }));
  };

  const handleAddAncestor = (newAncestor: Ancestor) => {
    setAncestors((prev) => [newAncestor, ...prev]);
    setSelectedSpiritForSeance(newAncestor);
  };

  const handleOpenSeanceWith = (ancestor: Ancestor) => {
    setSelectedSpiritForSeance(ancestor);
    handleToggleMode('ghost');
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-700 relative overflow-x-hidden ${
        mode === 'ofrenda' ? 'bg-[#0D0704] text-[#F7F4ED]' : 'bg-[#020904] text-[#D8F3DC]'
      }`}
    >
      {/* Background Interactive Particles (Marigolds or Phosphor Embers) */}
      <Particles mode={mode} density={35} />

      {/* Header */}
      <AltarHeader
        mode={mode}
        onToggleMode={handleToggleMode}
        onOpenAddModal={() => setIsAddModalOpen(true)}
        onLightCandle={handleLightCandle}
        candleCount={candlesLit}
        isPlayingAudio={isPlayingAudio}
        onToggleAudio={handleToggleAudio}
      />

      {/* Main Mode View */}
      <main className="relative z-10 pb-16">
        {mode === 'ofrenda' ? (
          <AltarView
            ancestors={ancestors}
            onSelectAncestor={(ancestor) => setSelectedAncestorForDetail(ancestor)}
            onOpenSeanceWith={handleOpenSeanceWith}
            onPlaceOffering={handlePlaceOffering}
            offeringsCount={offeringsCount}
            candlesLit={candlesLit}
          />
        ) : (
          <GhostSeanceView
            ancestors={ancestors}
            selectedSpirit={selectedSpiritForSeance}
            onSelectSpirit={(spirit) => setSelectedSpiritForSeance(spirit)}
          />
        )}
      </main>

      {/* Modals */}
      <AddAncestorModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddAncestor={handleAddAncestor}
      />

      <AncestorDetailModal
        ancestor={selectedAncestorForDetail}
        onClose={() => setSelectedAncestorForDetail(null)}
        onOpenSeance={handleOpenSeanceWith}
        onPlaceOffering={handlePlaceOffering}
        offeringsCount={selectedAncestorForDetail ? offeringsCount[selectedAncestorForDetail.id] || 0 : 0}
      />

      {/* Footer */}
      <footer className="relative z-20 border-t border-stone-900 bg-black/80 px-4 py-8 text-center text-xs text-stone-500 backdrop-blur-md">
        <div className="mx-auto max-w-4xl space-y-3">
          <div className="flex flex-wrap items-center justify-center gap-4 text-stone-400">
            <span className="flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-amber-500" />
              <span>Hacktoberfest 2026 Week 4: Ghost in the Machine</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Shield className="h-3.5 w-3.5 text-emerald-500" />
              <span>Google Gemma 2 (2B) On-Device Privacy</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Terminal className="h-3.5 w-3.5 text-cyan-400" />
              <span>React Bits by DavidHDev</span>
            </span>
          </div>

          <p className="text-stone-400 font-light">
            Crafted with sacred devotion, marigold petals, and offline open-weight intelligence by{' '}
            <a
              href="https://github.com/ath1614"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-400 hover:underline font-medium"
            >
              Atharv Soni
            </a>
            .
          </p>

          <p className="text-[11px] text-stone-600">
            Dedicated to the memory of our departed ancestors and the immortal spirits of computing who live on in every line of code we write.
          </p>
        </div>
      </footer>
    </div>
  );
};
export default App;
