import React from 'react';
import { Photo } from '../types';
import { MapPin, Eye } from 'lucide-react';

interface PhotoCardProps {
  key?: string;
  photo: Photo;
  onSelect: () => void;
}

export default function PhotoCard({ photo, onSelect }: PhotoCardProps) {
  // Compute Era Label based on year for authentic NZ historical cataloging
  const getEraLabel = (year: number) => {
    if (year >= 1880 && year <= 1900) return 'Victorian Era (1880–1900)';
    if (year >= 1901 && year <= 1914) return 'Edwardian Era (1901–1914)';
    if (year >= 1915 && year <= 1939) return 'Interwar / Art Deco';
    return 'Post-War Era (1940–1950)';
  };

  return (
    <div 
      onClick={onSelect}
      className="group bg-[#0c0c0c] border border-white/10 hover:border-[#c5b358] rounded-xs overflow-hidden shadow-md hover:shadow-[0_0_15px_rgba(197,179,88,0.15)] hover:scale-[1.02] cursor-pointer transition-all duration-300 flex flex-col justify-between"
    >
      {/* Photo Frame Container */}
      <div className="relative aspect-[4/3] bg-[#050505] overflow-hidden border-b border-white/10">
        <img 
          src={photo.imageUrl} 
          alt={photo.title}
          className="w-full h-full object-cover grayscale transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0 sepia-[20%] group-hover:sepia-0"
          referrerPolicy="no-referrer"
        />
        {/* Subtle vintage overlay vignetting */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent to-[#050505]/40 pointer-events-none mix-blend-multiply"></div>
        
        {/* Absolute Year Badge */}
        <div className="absolute top-3 right-3 bg-[#c5b358] text-[#050505] font-serif font-bold text-xs px-2.5 py-1 rounded-xs shadow border border-white/10">
          {photo.year}
        </div>
      </div>

      {/* Simplified Information Container */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Era Badge and Category */}
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span className="inline-flex items-center rounded-full border border-[#c5b358]/40 bg-[#c5b358]/5 px-2 py-0.5 text-[10px] font-mono text-[#c5b358]">
              {getEraLabel(photo.year)}
            </span>
            <span className="text-[10px] font-mono text-white/30">{photo.category.split(' & ')[0]}</span>
          </div>

          {/* Title */}
          <h3 className="font-serif font-light text-white group-hover:text-[#c5b358] transition-colors text-base line-clamp-2 min-h-[2.8rem] leading-snug">
            {photo.title}
          </h3>

          {/* Location */}
          <div className="flex items-center gap-1.5 text-white/70 mt-2 text-xs">
            <MapPin className="w-3.5 h-3.5 text-[#c5b358] shrink-0" />
            <span className="truncate">{photo.locationName}</span>
          </div>
        </div>

        {/* Card Footer: Examine Button */}
        <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs font-mono text-white/40 group-hover:text-white/80 transition-colors">
          <span className="text-[9px] uppercase tracking-wider font-semibold">Special Collections</span>
          <span className="flex items-center gap-1 text-[#c5b358] group-hover:translate-x-0.5 transition-transform duration-200 font-bold">
            Examine Record
            <Eye className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </div>
  );
}
