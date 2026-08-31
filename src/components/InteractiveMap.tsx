import React, { useState } from 'react';
import { HAMILTON_LANDMARKS, HISTORICAL_PHOTOS } from '../data/photos';
import { Landmark, Photo } from '../types';
import { MapPin, ArrowRight, HelpCircle, Eye, Compass } from 'lucide-react';

interface InteractiveMapProps {
  onSelectPhoto: (photo: Photo) => void;
  onFilterByLandmark: (landmarkId: string) => void;
}

export default function InteractiveMap({ onSelectPhoto, onFilterByLandmark }: InteractiveMapProps) {
  const [selectedLandmark, setSelectedLandmark] = useState<Landmark | null>(HAMILTON_LANDMARKS[0]);

  // Get associated photos for a landmark
  const getLandmarkPhotos = (landmark: Landmark): Photo[] => {
    return HISTORICAL_PHOTOS.filter((photo) => landmark.associatedPhotoIds.includes(photo.id));
  };

  return (
    <div className="bg-[#0c0c0c] border border-white/10 rounded-xs p-4 md:p-6 shadow-sm">
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-serif font-light text-white flex items-center gap-2">
            <span>Historical Cartography of Hamilton</span>
          </h2>
          <p className="text-xs text-[#a1a1a1] font-mono mt-1">
            Click any cataloged coordinate pin below to inspect vintage records from that locality.
          </p>
        </div>
        
        {/* Legend */}
        <div className="flex flex-wrap gap-4 text-[10px] uppercase tracking-wider font-mono text-[#e5e5e5]/80 bg-[#111] p-2.5 rounded border border-white/10">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#c5b358] animate-pulse"></span>
            <span>Archival Photo Coordinates</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-4 h-1 bg-[#29465b] rounded-full"></span>
            <span>Waikato River Ribbon</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-4 h-0.5 bg-[#c5b358]/60 border-t border-dashed border-[#c5b358]"></span>
            <span>Railway Corridor</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* The SVG Canvas Container */}
        <div className="lg:col-span-2 relative bg-[#111] border border-white/10 rounded-xs overflow-hidden h-[400px] md:h-[500px] shadow-inner select-none">
          
          {/* Custom SVG Background map */}
          <svg className="absolute inset-0 w-full h-full text-white/5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none">
            {/* Water body: The Winding Waikato River Ribbon */}
            <path 
              d="M 58 0 Q 56 15 54 28 Q 50 42 54 58 Q 56 72 50 88 Q 46 95 44 100" 
              fill="none" 
              stroke="#1b3040" 
              strokeWidth="6" 
              strokeLinecap="round"
            />
            <path 
              d="M 58 0 Q 56 15 54 28 Q 50 42 54 58 Q 56 72 50 88 Q 46 95 44 100" 
              fill="none" 
              stroke="#29465b" 
              strokeWidth="2.5" 
              strokeLinecap="round"
            />

            {/* Lake Rotoroa (Hamilton Lake) */}
            <ellipse 
              cx="34" 
              cy="64" 
              rx="6" 
              ry="4.5" 
              fill="#101c26" 
              stroke="#29465b" 
              strokeWidth="0.75" 
            />

            {/* Railway Corridor (Frankton to Claudelands) */}
            <path 
              d="M 15 48 L 26 48 Q 45 46 62 38 L 85 30" 
              fill="none" 
              stroke="#c5b358" 
              strokeWidth="1.5" 
              strokeOpacity="0.3"
              strokeLinecap="round"
            />
            <path 
              d="M 15 48 L 26 48 Q 45 46 62 38 L 85 30" 
              fill="none" 
              stroke="#c5b358" 
              strokeWidth="0.8" 
              strokeOpacity="0.7"
              strokeDasharray="1.5 1.5"
              strokeLinecap="round"
            />

            {/* Grid Coordinates (Aesthetic vintage grid) */}
            <line x1="20" y1="0" x2="20" y2="100" stroke="rgba(255,255,255,0.05)" strokeWidth="0.25" strokeDasharray="2 2" />
            <line x1="40" y1="0" x2="40" y2="100" stroke="rgba(255,255,255,0.05)" strokeWidth="0.25" strokeDasharray="2 2" />
            <line x1="60" y1="0" x2="60" y2="100" stroke="rgba(255,255,255,0.05)" strokeWidth="0.25" strokeDasharray="2 2" />
            <line x1="80" y1="0" x2="80" y2="100" stroke="rgba(255,255,255,0.05)" strokeWidth="0.25" strokeDasharray="2 2" />
            
            <line x1="0" y1="25" x2="100" y2="25" stroke="rgba(255,255,255,0.05)" strokeWidth="0.25" strokeDasharray="2 2" />
            <line x1="0" y1="50" x2="100" y2="50" stroke="rgba(255,255,255,0.05)" strokeWidth="0.25" strokeDasharray="2 2" />
            <line x1="0" y1="75" x2="100" y2="75" stroke="rgba(255,255,255,0.05)" strokeWidth="0.25" strokeDasharray="2 2" />
          </svg>

          {/* Aesthetic Geographical Text Labels */}
          <div className="absolute top-[8%] left-[58%] text-[10px] font-serif uppercase tracking-[0.2em] font-semibold text-[#547c9c] italic">
            Waikato River
          </div>
          <div className="absolute top-[48%] left-[52%] text-[9px] font-serif uppercase tracking-[0.15em] text-[#c5b358]/80 font-bold">
            Victoria St & Central
          </div>
          <div className="absolute top-[34%] right-[15%] text-[9px] font-mono uppercase tracking-[0.15em] text-white/40">
            Claudelands East
          </div>
          <div className="absolute top-[44%] left-[10%] text-[9px] font-mono uppercase tracking-[0.15em] text-white/40">
            Frankton Junction
          </div>
          <div className="absolute top-[68%] left-[24%] text-[9px] font-serif uppercase tracking-[0.15em] text-[#547c9c] italic">
            Lake Rotoroa
          </div>
          <div className="absolute top-[14%] left-[40%] text-[9px] font-mono uppercase tracking-[0.15em] text-white/30">
            Fairfield Reach
          </div>

          {/* Landmarks Coordinate Pins */}
          {HAMILTON_LANDMARKS.map((landmark) => {
            const isSelected = selectedLandmark?.id === landmark.id;
            return (
              <button
                key={landmark.id}
                onClick={() => setSelectedLandmark(landmark)}
                style={{ left: `${landmark.coordinates.x}%`, top: `${landmark.coordinates.y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 group z-10 p-2 focus:outline-none focus:ring-1 focus:ring-[#c5b358] rounded-full"
              >
                {/* Radial Pulse */}
                <span className={`absolute -inset-1 rounded-full bg-[#c5b358] opacity-30 transform scale-125 animate-pulse`}></span>
                
                {/* Pin Dot - small gold circle */}
                <div className={`relative w-3.5 h-3.5 rounded-full border border-[#080808] shadow-[0_0_8px_rgba(197,179,88,0.4)] transition-all duration-300 ${
                  isSelected 
                    ? 'bg-[#c5b358] scale-125 ring-2 ring-white/20' 
                    : 'bg-[#c5b358]/80 group-hover:bg-[#c5b358] group-hover:scale-125'
                }`}>
                </div>

                {/* Micro Tooltip */}
                <span className="absolute left-1/2 -translate-x-1/2 bottom-8 bg-[#0c0c0c] text-white text-[10px] font-mono py-1 px-2 rounded-xs opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap shadow border border-white/10">
                  {landmark.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Landmark Inspector Detail Panel */}
        <div className="bg-[#111] border border-white/10 rounded-xs p-5 flex flex-col justify-between shadow-sm min-h-[350px] lg:h-[500px] lg:overflow-y-auto">
          {selectedLandmark ? (
            <div className="flex flex-col h-full justify-between gap-4">
              {/* Landmark info */}
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#c5b358] font-bold bg-[#c5b358]/10 border border-[#c5b358]/20 px-2.5 py-1 rounded-xs">
                  Landmark Ledger
                </span>
                <h3 className="text-xl font-serif font-light text-white mt-3">
                  {selectedLandmark.name}
                </h3>
                <p className="text-xs text-[#a1a1a1] mt-2 leading-relaxed">
                  {selectedLandmark.description}
                </p>
              </div>

              {/* Associated archive entries */}
              <div>
                <h4 className="text-[10px] uppercase font-mono tracking-wider text-white/40 font-bold mb-3">
                  Cataloged Media at this Location ({selectedLandmark.associatedPhotoIds.length})
                </h4>
                <div className="space-y-2.5">
                  {getLandmarkPhotos(selectedLandmark).map((photo) => (
                    <div 
                      key={photo.id}
                      onClick={() => onSelectPhoto(photo)}
                      className="group/item flex items-center gap-3 bg-[#181818] border border-white/5 p-2 rounded-xs cursor-pointer hover:border-[#c5b358]/40 transition-all shadow-xs"
                    >
                      <img 
                        src={photo.imageUrl} 
                        alt={photo.title}
                        className="w-12 h-9 object-cover rounded-xs border border-white/10 group-hover/item:opacity-80 grayscale group-hover/item:grayscale-0 transition-all"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-serif font-normal text-white truncate group-hover/item:text-[#c5b358] transition-colors">
                          {photo.title}
                        </p>
                        <p className="text-[10px] font-mono text-white/40 mt-0.5">
                          Year {photo.year} • {photo.accessionNo}
                        </p>
                      </div>
                      <Eye className="w-3.5 h-3.5 text-white/30 group-hover/item:text-white shrink-0" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Action */}
              <button
                onClick={() => onFilterByLandmark(selectedLandmark.id)}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-[#c5b358] text-[#080808] text-[10px] uppercase tracking-widest font-mono font-bold rounded-xs hover:bg-[#c5b358]/95 transition-colors mt-4 cursor-pointer"
              >
                View related photos
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center h-full text-white/40 py-8">
              <Compass className="w-12 h-12 text-[#c5b358] stroke-[1.25] mb-4 opacity-75" />
              <h3 className="text-md font-serif font-light text-white">No Location Selected</h3>
              <p className="text-xs max-w-[200px] mt-2 font-sans leading-relaxed text-[#a1a1a1]">
                Click any of the gold map coordinates to load coordinate details and related archive photos.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
