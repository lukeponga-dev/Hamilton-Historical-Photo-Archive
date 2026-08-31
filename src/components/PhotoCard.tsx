import React from 'react';
import { Photo } from '../types';
import { MapPin, Calendar, Camera, Hash, Eye } from 'lucide-react';

interface PhotoCardProps {
  key?: string;
  photo: Photo;
  onSelect: () => void;
}

export default function PhotoCard({ photo, onSelect }: PhotoCardProps) {
  // Category tags custom styling
  const getCategoryStyles = (category: string) => {
    switch (category) {
      case 'Industry & Business':
        return 'bg-[#c5b358]/10 text-[#c5b358] border-[#c5b358]/20';
      case 'Transit & Streets':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'Historic Estates & Architecture':
        return 'bg-stone-500/10 text-stone-300 border-stone-500/20';
      case 'Parks & Nature':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'Civic Life & People':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
      default:
        return 'bg-white/5 text-white/60 border-white/10';
    }
  };

  return (
    <div 
      onClick={onSelect}
      className="group bg-[#0c0c0c] border border-white/10 rounded-xs overflow-hidden shadow-md hover:shadow-lg hover:border-[#c5b358]/50 cursor-pointer transition-all duration-300 flex flex-col justify-between"
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

        {/* Accession Hover Badge */}
        <div className="absolute bottom-3 left-3 bg-[#050505]/85 text-stone-300 font-mono text-[9px] px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-xs flex items-center gap-1">
          <Hash className="w-2.5 h-2.5 text-[#c5b358]" />
          {photo.accessionNo}
        </div>
      </div>

      {/* Information Container */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Category Pill */}
          <div className="flex items-center justify-between mb-2">
            <span className={`text-[10px] font-mono tracking-wider uppercase px-2 py-0.5 rounded-xs border ${getCategoryStyles(photo.category)}`}>
              {photo.category}
            </span>
            <span className="text-[10px] font-mono text-white/40">{photo.decade}</span>
          </div>

          {/* Title */}
          <h3 className="font-serif font-light text-white group-hover:text-[#c5b358] transition-colors text-base line-clamp-1">
            {photo.title}
          </h3>

          {/* Location */}
          <div className="flex items-center gap-1.5 text-[#a1a1a1] mt-2 text-xs">
            <MapPin className="w-3.5 h-3.5 text-white/30 shrink-0" />
            <span className="truncate">{photo.locationName}</span>
          </div>

          {/* Photographer */}
          <div className="flex items-center gap-1.5 text-white/40 mt-1 text-[11px] font-mono">
            <Camera className="w-3.5 h-3.5 text-white/20 shrink-0" />
            <span className="truncate">Photo: {photo.photographer}</span>
          </div>
        </div>

        {/* Card Footer: Examine Button */}
        <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono font-bold text-white/50 group-hover:text-white">
          <span className="text-[10px] uppercase tracking-wider">Accession Ledger</span>
          <span className="flex items-center gap-1 text-[#c5b358] group-hover:translate-x-0.5 transition-transform duration-200">
            Examine Record
            <Eye className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </div>
  );
}
