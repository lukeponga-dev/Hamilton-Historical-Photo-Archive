import React, { useState, useRef, useEffect } from 'react';
import { Photo, AudioNarrativeResponse } from '../types';
import { X, Volume2, VolumeX, MapPin, Camera, Calendar, Hash, HelpCircle, ArrowRight, Play, Pause, Loader2, ExternalLink } from 'lucide-react';

interface PhotoDetailModalProps {
  photo: Photo;
  onClose: () => void;
  onConsultArthur: (photo: Photo) => void;
}

export default function PhotoDetailModal({ photo, onClose, onConsultArthur }: PhotoDetailModalProps) {
  const [imageFilter, setImageFilter] = useState<'sepia' | 'monochrome' | 'original'>('sepia');

  // Compute Era Label based on year for authentic NZ historical cataloging
  const getEraLabel = (year: number) => {
    if (year >= 1880 && year <= 1900) return 'Victorian Era (1880–1900)';
    if (year >= 1901 && year <= 1914) return 'Edwardian Era (1901–1914)';
    if (year >= 1915 && year <= 1939) return 'Interwar / Art Deco';
    return 'Post-War Era (1940–1950)';
  };
  
  // Audio narration states
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoadingAudio, setIsLoadingAudio] = useState(false);
  const [audioBase64, setAudioBase64] = useState<string | null>(null);
  const [audioError, setAudioError] = useState<string | null>(null);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Close on Escape keypress
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      // Clean up audio on unmount
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [onClose]);

  // Handle Play/Pause of Historical Audio Narration
  const handleToggleAudio = async () => {
    if (isLoadingAudio) return;

    // If audio is currently playing, pause it
    if (isPlaying && audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
      return;
    }

    // If audio already generated, play it
    if (audioBase64) {
      if (audioRef.current) {
        audioRef.current.play();
        setIsPlaying(true);
      }
      return;
    }

    // Generate Audio from Server-Side Gemini TTS
    setIsLoadingAudio(true);
    setAudioError(null);

    try {
      const response = await fetch('/api/narrative', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({
           text: photo.description,
           title: photo.title,
           year: photo.year,
         }),
      });

      if (!response.ok) {
        throw new Error('Narration is temporarily resting. Make sure your server is online and Gemini secrets are configured.');
      }

      const data: AudioNarrativeResponse = await response.json();
      
      if (!data.audioBase64) {
        throw new Error('No audio feedback received from our historical narrator.');
      }

      // Store base64 audio and prepare HTML5 Audio element
      setAudioBase64(data.audioBase64);
      
      // Standard MP3 data URI
      const audioUrl = `data:audio/mp3;base64,${data.audioBase64}`;
      const audio = new Audio(audioUrl);
      
      audio.onended = () => {
        setIsPlaying(false);
      };

      audioRef.current = audio;
      audio.play();
      setIsPlaying(true);
    } catch (err: any) {
      console.error(err);
      setAudioError(err.message || 'Could not fetch Arthur\'s voice narration.');
    } finally {
      setIsLoadingAudio(false);
    }
  };

  // Filter class builder
  const getFilterClass = () => {
    switch (imageFilter) {
      case 'sepia':
        return 'sepia-[40%] contrast-[105%] brightness-[95%]';
      case 'monochrome':
        return 'grayscale contrast-[115%]';
      case 'original':
        return 'filter-none';
      default:
        return 'sepia-[20%]';
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md flex items-center justify-center p-4 md:p-6 animate-fade-in">
      {/* Modal Main Panel */}
      <div className="bg-[#0c0c0c] border border-white/10 rounded-xs shadow-2xl max-w-5xl w-full max-h-none md:max-h-[85vh] overflow-y-auto md:overflow-hidden flex flex-col md:flex-row relative">
        
        {/* Close Button absolute */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 text-white/60 hover:text-white bg-[#111] border border-white/15 rounded-full shadow-md hover:bg-white/5 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Area: Large Image Showcase & Filters */}
        <div className="w-full md:w-[55%] bg-[#050505] flex flex-col justify-between p-4 md:p-6 border-b md:border-b-0 md:border-r border-white/10 relative select-none">
          
          {/* Main Photo Frame */}
          <div className="flex-1 flex items-center justify-center min-h-[250px] md:min-h-[400px]">
            <img 
              src={photo.imageUrl} 
              alt={photo.title}
              className={`max-w-full max-h-[50vh] md:max-h-[60vh] object-contain rounded-xs shadow-lg border border-white/10 transition-all duration-300 ${getFilterClass()}`}
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Aesthetic Plaque / Controls Footer */}
          <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-white/40 font-mono text-xs pt-3 border-t border-white/10">
            <div>
              <p className="text-[#c5b358] font-bold uppercase tracking-wider text-[9px]">
                Hamilton Museum of History Ledger
              </p>
              <p className="text-[#a1a1a1] text-[10px] mt-0.5">
                Record: {photo.accessionNo}
              </p>
            </div>

            {/* Photo Filters */}
            <div className="flex items-center gap-1.5 bg-[#111] border border-white/10 p-1 rounded-xs">
              <button
                onClick={() => setImageFilter('sepia')}
                className={`px-2 py-1 rounded-xs text-[10px] transition-colors cursor-pointer ${
                  imageFilter === 'sepia' ? 'bg-[#c5b358] text-[#080808] font-bold' : 'text-white/60 hover:text-white'
                }`}
              >
                Sepia
              </button>
              <button
                onClick={() => setImageFilter('monochrome')}
                className={`px-2 py-1 rounded-xs text-[10px] transition-colors cursor-pointer ${
                  imageFilter === 'monochrome' ? 'bg-stone-700 text-white font-bold' : 'text-white/60 hover:text-white'
                }`}
              >
                Mono
              </button>
              <button
                onClick={() => setImageFilter('original')}
                className={`px-2 py-1 rounded-xs text-[10px] transition-colors cursor-pointer ${
                  imageFilter === 'original' ? 'bg-[#1e1e1e] text-white font-bold' : 'text-white/60 hover:text-white'
                }`}
              >
                Clear
              </button>
            </div>
          </div>
        </div>

        {/* Right Area: Historical Ledger Info & Interactive AI Audio */}
        <div className="w-full md:w-[45%] p-5 md:p-8 overflow-y-auto flex flex-col justify-between max-h-[50vh] md:max-h-none gap-6 text-[#e5e5e5]">
          <div className="space-y-6">
            
            {/* Top Stacked Layout: Title, Location, Era, Accession Number */}
            <div className="space-y-3 pb-5 border-b border-white/10">
              <span className="text-[9px] font-mono tracking-widest uppercase bg-[#c5b358]/10 text-[#c5b358] border border-[#c5b358]/20 px-2 py-0.5 rounded-xs font-bold inline-block">
                {photo.category}
              </span>
              
              <h2 className="text-2xl font-serif font-light text-white leading-tight">
                {photo.title}
              </h2>

              <div className="space-y-2 pt-1">
                {/* Location */}
                <div className="flex items-center gap-1.5 text-xs text-white/85">
                  <MapPin className="w-3.5 h-3.5 text-[#c5b358] shrink-0" />
                  <span>{photo.locationName}</span>
                </div>

                {/* Era */}
                <div>
                  <span className="inline-flex items-center rounded-full border border-yellow-500/60 px-2.5 py-0.5 text-xs text-yellow-300 font-mono">
                    {getEraLabel(photo.year)}
                  </span>
                </div>

                {/* Accession Number & Heritage Online Link */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-0.5">
                  <p className="text-[11px] font-mono text-white/40">
                    Accession Number: <span className="text-white/60">{photo.accessionNo}</span>
                  </p>
                  {photo.heritageUrl && (
                    <a
                      href={photo.heritageUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[10px] font-mono text-[#c5b358] hover:text-[#c5b358]/80 hover:underline transition-colors"
                    >
                      <span>Hamilton Heritage Online</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Story Section */}
            <div className="space-y-2">
              <h4 className="text-[10px] font-mono uppercase tracking-wider text-[#c5b358] font-bold">
                Story
              </h4>
              <p className="text-xs text-[#a1a1a1] leading-relaxed font-sans">
                {photo.description}
              </p>
            </div>

            {/* Context Section */}
            <div className="space-y-2 pt-1">
              <h4 className="text-[10px] font-mono uppercase tracking-wider text-[#c5b358] font-bold">
                Context
              </h4>
              <div className="bg-[#111] p-3.5 rounded-xs border border-white/5 space-y-3">
                <p className="text-xs text-white italic leading-relaxed">
                  "{photo.historicalFact}"
                </p>
                <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-white/40 pt-2 border-t border-white/5">
                  <div>
                    <span className="block text-[8px] uppercase tracking-wide text-white/20">Photographer</span>
                    <span className="text-white/70">{photo.photographer}</span>
                  </div>
                  <div>
                    <span className="block text-[8px] uppercase tracking-wide text-white/20">Decade</span>
                    <span className="text-white/70">{photo.decade}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Listen to Arthur Narrator Button & Playback State */}
            <div className="bg-[#111]/60 border border-white/10 rounded-xs p-4 shadow-inner space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#c5b358]/10 text-[#c5b358] rounded-full shrink-0 border border-[#c5b358]/20">
                  {isPlaying ? (
                    <Volume2 className="w-4 h-4 animate-pulse" />
                  ) : (
                    <VolumeX className="w-4 h-4 text-white/40" />
                  )}
                </div>
                <div>
                  <h4 className="text-xs font-serif font-light text-white">
                    Listen to Arthur
                  </h4>
                  <p className="text-[10px] text-white/40 font-mono">
                    Spoken commentary on this record's era
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleToggleAudio}
                  disabled={isLoadingAudio}
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-[#c5b358] text-[#080808] text-[10px] font-mono font-bold uppercase tracking-widest rounded-xs hover:bg-[#c5b358]/90 transition-all disabled:opacity-40 shrink-0 shadow border border-[#c5b358] cursor-pointer"
                >
                  {isLoadingAudio ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-[#080808]" />
                      Narrating...
                    </>
                  ) : isPlaying ? (
                    <>
                      <Pause className="w-3.5 h-3.5 fill-[#080808]" />
                      Pause
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-[#080808]" />
                      Listen to Arthur
                    </>
                  )}
                </button>

                <div className="flex-1 text-[10px] font-mono text-white/40 italic truncate">
                  {isLoadingAudio 
                    ? "Consulting museum registry..." 
                    : isPlaying 
                      ? "Narrating historical significance..." 
                      : "Arthur's commentary loaded"}
                </div>
              </div>

              {audioError && (
                <p className="text-[10px] text-red-400 font-mono mt-2 bg-red-950/20 p-1.5 rounded border border-red-900/40">
                  Note: {audioError}
                </p>
              )}
            </div>

          </div>

          {/* Action button: Consult Arthur about this photo */}
          <button
            onClick={() => onConsultArthur(photo)}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#c5b358] hover:bg-[#c5b358]/95 text-[#080808] text-[10px] font-mono font-bold uppercase tracking-widest rounded-xs border border-[#c5b358] shadow transition-colors mt-6 cursor-pointer"
          >
            Consult Arthur About This Photo
            <ArrowRight className="w-4 h-4 text-[#080808]" />
          </button>
        </div>
      </div>
    </div>
  );
}
