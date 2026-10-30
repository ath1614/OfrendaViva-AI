import React, { useState, useEffect, useRef } from 'react';
import { Ancestor } from '../data/ancestors';
import { gemmaOfrenda } from '../ai/gemma-ofrenda';
import { ambientSound } from '../audio/ambient-soundscape';
import { DecryptedText } from './react-bits/DecryptedText';
import { GlitchText } from './react-bits/GlitchText';
import { SpotlightCard } from './react-bits/SpotlightCard';
import { Terminal, Send, Sparkles, ChevronDown, ChevronUp, Cpu, ShieldCheck } from 'lucide-react';

interface GhostSeanceViewProps {
  ancestors: Ancestor[];
  selectedSpirit: Ancestor;
  onSelectSpirit: (ancestor: Ancestor) => void;
}

interface Message {
  role: 'spirit' | 'user';
  text: string;
  thought?: string;
  timestamp: string;
}

export const GhostSeanceView: React.FC<GhostSeanceViewProps> = ({
  ancestors,
  selectedSpirit,
  onSelectSpirit,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'spirit',
      text: selectedSpirit.ghostPersonality.firstMessage,
      thought: `Spirit resonance initialized for [${selectedSpirit.name}] via local Gemma 2 2B KV-cache.`,
      timestamp: '00:00:01',
    },
  ]);
  const [inputText, setInputText] = useState<string>('');
  const [isSummoning, setIsSummoning] = useState<boolean>(false);
  const [showThoughtIndex, setShowThoughtIndex] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Update spirit message when spirit selection changes
  useEffect(() => {
    setMessages([
      {
        role: 'spirit',
        text: selectedSpirit.ghostPersonality.firstMessage,
        thought: `Spirit resonance switch to [${selectedSpirit.name}] at temperature=0.28.`,
        timestamp: new Date().toLocaleTimeString(),
      },
    ]);
    ambientSound.playSpiritManifest();
  }, [selectedSpirit]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isSummoning]);

  const handleSendMessage = async (query: string) => {
    if (!query.trim() || isSummoning) return;

    ambientSound.playKeystroke();
    const userMsg: Message = {
      role: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsSummoning(true);

    try {
      const history = messages.map((m) => ({
        role: (m.role === 'user' ? 'user' : 'model') as 'user' | 'model',
        text: m.text,
      }));

      const { response, thought } = await gemmaOfrenda.askSpirit(selectedSpirit, query, history);

      ambientSound.playSpiritManifest();
      const spiritMsg: Message = {
        role: 'spirit',
        text: response,
        thought,
        timestamp: new Date().toLocaleTimeString(),
      };

      setMessages((prev) => [...prev, spiritMsg]);
    } catch {
      // Error recovery
    } finally {
      setIsSummoning(false);
    }
  };

  return (
    <div className="relative z-10 mx-auto max-w-6xl px-4 py-8 sm:px-8">
      {/* Ghost Terminal Header Banner */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-emerald-500/40 bg-black/80 p-4 font-mono text-emerald-400 backdrop-blur-md shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-300">
            <Terminal className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <GlitchText text="GHOST//MACHINE SÉANCE" className="text-base sm:text-lg font-bold" />
              <span className="rounded bg-emerald-950 border border-emerald-800 px-1.5 py-0.2 text-[10px] text-emerald-300">
                OFFLINE
              </span>
            </div>
            <p className="text-xs text-emerald-500/80">
              Channeling historical souls & dead code via Google Gemma 2 (2B Quantized)
            </p>
          </div>
        </div>

        {/* Local Hardware Spec Indicators */}
        <div className="flex flex-wrap items-center gap-3 text-[11px] text-emerald-400/80">
          <div className="flex items-center gap-1.5 bg-emerald-950/40 border border-emerald-800/40 px-2.5 py-1 rounded-lg">
            <Cpu className="h-3.5 w-3.5 text-emerald-400" />
            <span>Gemma 2 (2B) Metal GPU</span>
          </div>
          <div className="flex items-center gap-1.5 bg-emerald-950/40 border border-emerald-800/40 px-2.5 py-1 rounded-lg">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
            <span>0 Cloud Calls • 100% Private</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Column: Spirit Selector */}
        <div className="lg:col-span-1 space-y-3 font-mono">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-500/80 px-1">
            Available Spirits in Machine:
          </div>
          <div className="space-y-2">
            {ancestors.map((ancestor) => {
              const isSelected = ancestor.id === selectedSpirit.id;
              return (
                <button
                  key={ancestor.id}
                  onClick={() => onSelectSpirit(ancestor)}
                  className={`w-full text-left rounded-xl border p-3 transition-all ${
                    isSelected
                      ? 'border-emerald-500 bg-emerald-950/60 text-emerald-200 shadow-lg glow-phosphor'
                      : 'border-stone-800 bg-black/60 text-stone-400 hover:border-emerald-700/60 hover:text-emerald-300'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl">{ancestor.avatarEmoji}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold truncate">{ancestor.name}</div>
                      <div className="text-[10px] text-stone-400 truncate">{ancestor.title}</div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Secret Easter Egg Hint */}
          <div className="rounded-xl border border-dashed border-emerald-800/50 bg-emerald-950/20 p-3 text-[11px] text-emerald-500/80">
            <span className="font-bold">💀 Séance Tip:</span> Ask Ada about whether machines possess consciousness, or ask COBOL why banks refuse to rewrite it.
          </div>
        </div>

        {/* Right Column: CRT Séance Monitor & Dialogue */}
        <div className="lg:col-span-3">
          <SpotlightCard
            spotlightColor="rgba(0, 255, 136, 0.15)"
            className="flex flex-col h-[600px] border border-emerald-500/40 bg-[#020904] rounded-2xl overflow-hidden shadow-2xl relative"
          >
            {/* CRT Screen Scanline Overlay */}
            <div className="crt-overlay absolute inset-0 pointer-events-none z-20" />

            {/* CRT Bezel Top Bar */}
            <div className="relative z-10 flex items-center justify-between border-b border-emerald-900/60 bg-black/90 px-4 py-2 font-mono text-xs text-emerald-400">
              <div className="flex items-center gap-2">
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>CHANNEL_ACTIVE: //MICTLAN_RELAY//{selectedSpirit.id.toUpperCase()}</span>
              </div>
              <span className="text-[11px] text-emerald-600">BAUD: 9600 • 8-N-1</span>
            </div>

            {/* Message Stream */}
            <div className="relative z-10 flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 font-mono">
              {messages.map((msg, index) => {
                const isSpirit = msg.role === 'spirit';
                return (
                  <div
                    key={index}
                    className={`flex flex-col ${isSpirit ? 'items-start' : 'items-end'}`}
                  >
                    <div className="flex items-center gap-2 text-[10px] text-emerald-500/70 mb-1">
                      <span>{isSpirit ? `[GHOST://${selectedSpirit.name.toUpperCase()}]` : '[YOU//TERMINAL]'}</span>
                      <span>{msg.timestamp}</span>
                    </div>

                    <div
                      className={`max-w-[85%] rounded-xl p-3.5 text-xs sm:text-sm leading-relaxed ${
                        isSpirit
                          ? 'border border-emerald-600/50 bg-emerald-950/30 text-emerald-200 shadow-sm'
                          : 'border border-stone-700 bg-stone-900/80 text-stone-200'
                      }`}
                    >
                      {isSpirit ? (
                        <DecryptedText
                          text={msg.text}
                          speed={30}
                          maxIterations={8}
                          className="font-mono text-emerald-100"
                          encryptedClassName="text-emerald-400 opacity-70"
                        />
                      ) : (
                        <span>{msg.text}</span>
                      )}
                    </div>

                    {/* Gemma 2 Reasoning Thought Inspector */}
                    {msg.thought && (
                      <div className="mt-1.5 max-w-[85%]">
                        <button
                          onClick={() =>
                            setShowThoughtIndex(showThoughtIndex === index ? null : index)
                          }
                          className="flex items-center gap-1 text-[10px] text-emerald-500/70 hover:text-emerald-400"
                        >
                          <Cpu className="h-3 w-3" />
                          <span>Gemma 2 Thought Protocol</span>
                          {showThoughtIndex === index ? (
                            <ChevronUp className="h-3 w-3" />
                          ) : (
                            <ChevronDown className="h-3 w-3" />
                          )}
                        </button>
                        {showThoughtIndex === index && (
                          <div className="mt-1 rounded-lg border border-emerald-800/40 bg-black/80 p-2 text-[10px] font-mono text-emerald-400/90">
                            {msg.thought}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}

              {isSummoning && (
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-400/80 animate-pulse">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  <span>Channeling spirit imprint across quantum cache...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Sample Questions Prompt Chips */}
            <div className="relative z-10 border-t border-emerald-900/50 bg-black/80 px-4 py-2 flex flex-wrap gap-1.5">
              <span className="text-[10px] font-mono text-emerald-500/80 py-1">Whisper:</span>
              {selectedSpirit.ghostPersonality.sampleQuestions.map((q, i) => (
                <button
                  key={i}
                  onClick={() => handleSendMessage(q)}
                  disabled={isSummoning}
                  className="rounded-lg border border-emerald-800/60 bg-emerald-950/40 px-2 py-1 text-[11px] font-mono text-emerald-300 hover:bg-emerald-900/60 hover:border-emerald-600 transition-all disabled:opacity-50"
                >
                  "{q}"
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputText);
              }}
              className="relative z-10 flex items-center gap-2 border-t border-emerald-900/80 bg-black p-3"
            >
              <span className="text-emerald-400 font-mono pl-2">&gt;</span>
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={`Ask the spirit of ${selectedSpirit.name}...`}
                disabled={isSummoning}
                className="flex-1 bg-transparent font-mono text-xs sm:text-sm text-emerald-200 placeholder-emerald-800 focus:outline-none"
              />
              <button
                type="submit"
                disabled={!inputText.trim() || isSummoning}
                className="flex items-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 px-3 py-1.5 text-xs font-bold text-black font-mono transition-all disabled:opacity-40"
              >
                <span>TRANSMIT</span>
                <Send className="h-3 w-3" />
              </button>
            </form>
          </SpotlightCard>
        </div>
      </div>
    </div>
  );
};
