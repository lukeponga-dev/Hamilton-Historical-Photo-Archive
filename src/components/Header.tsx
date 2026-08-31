import React from 'react';
import { Library, HelpCircle, Map, Grid, Compass } from 'lucide-react';

interface HeaderProps {
  activeView: 'gallery' | 'map' | 'chat';
  setActiveView: (view: 'gallery' | 'map' | 'chat') => void;
  photosCount: number;
}

export default function Header({ activeView, setActiveView, photosCount }: HeaderProps) {
  return (
    <header className="border-b border-white/10 bg-[#0c0c0c] py-6 px-4 md:px-8 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Museum Identity */}
        <div className="flex items-center gap-3">
          <div className="p-3 bg-[#111] text-[#c5b358] border border-[#c5b358]/30 rounded-xs shadow-md">
            <Library className="w-6 h-6 stroke-[1.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#c5b358] font-bold">
                Hamilton Public Library
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#c5b358]/50"></span>
              <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-semibold">
                Special Collections
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-serif text-white tracking-tight font-light mt-0.5">
              Hamilton <span className="text-[#c5b358] font-normal">Historical Photo Archive</span>
            </h1>
            <p className="text-xs text-[#a1a1a1] font-mono mt-0.5">
              Digital Preservation Portal • Curated Ledger of the Ambitious City (1880–1959)
            </p>
          </div>
        </div>

        {/* View Toggle Controls */}
        <div className="flex items-center bg-[#111] p-1 rounded-md border border-white/10 w-full md:w-auto overflow-x-auto justify-between md:justify-start">
          <button
            onClick={() => setActiveView('gallery')}
            className={`flex items-center justify-center gap-1.5 px-3 md:px-4 py-2 text-[9px] md:text-[10px] uppercase tracking-wider md:tracking-widest transition-all duration-200 rounded-sm font-semibold cursor-pointer shrink-0 ${
              activeView === 'gallery'
                ? 'bg-[#c5b358] text-[#080808] shadow-sm font-bold'
                : 'text-[#e5e5e5]/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <Grid className="w-3.5 h-3.5" />
            <span><span className="hidden sm:inline">Archive </span>Ledger ({photosCount})</span>
          </button>
          
          <button
            onClick={() => setActiveView('map')}
            className={`flex items-center justify-center gap-1.5 px-3 md:px-4 py-2 text-[9px] md:text-[10px] uppercase tracking-wider md:tracking-widest transition-all duration-200 rounded-sm font-semibold cursor-pointer shrink-0 ${
              activeView === 'map'
                ? 'bg-[#c5b358] text-[#080808] shadow-sm font-bold'
                : 'text-[#e5e5e5]/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <Map className="w-3.5 h-3.5" />
            <span><span className="hidden sm:inline">Cartographic </span>Map</span>
          </button>

          <button
            onClick={() => setActiveView('chat')}
            className={`flex items-center justify-center gap-1.5 px-3 md:px-4 py-2 text-[9px] md:text-[10px] uppercase tracking-wider md:tracking-widest transition-all duration-200 rounded-sm font-semibold cursor-pointer shrink-0 ${
              activeView === 'chat'
                ? 'bg-[#c5b358] text-[#080808] shadow-sm font-bold'
                : 'text-[#e5e5e5]/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Ask Arthur<span className="hidden sm:inline"> (AI)</span></span>
          </button>
        </div>
      </div>
    </header>
  );
}
