import React, { useState } from 'react';
import Header from './components/Header';
import PhotoCard from './components/PhotoCard';
import InteractiveMap from './components/InteractiveMap';
import ArchivistChat from './components/ArchivistChat';
import PhotoDetailModal from './components/PhotoDetailModal';
import { HISTORICAL_PHOTOS, ALL_DECADES, ALL_CATEGORIES } from './data/photos';
import { Photo } from './types';
import { Search, Filter, RefreshCw, Info, HelpCircle, Archive, ArrowRight, MessageSquare, Compass, ShieldAlert } from 'lucide-react';

export default function App() {
  const [activeView, setActiveView] = useState<'gallery' | 'map' | 'chat'>('gallery');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDecade, setSelectedDecade] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [startYear, setStartYear] = useState<number>(1880);
  const [endYear, setEndYear] = useState<number>(1950);
  
  // Modals and context
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [chatReferencedPhoto, setChatReferencedPhoto] = useState<Photo | null>(null);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Active filter by landmark IDs (from map interaction)
  const [activeLandmarkFilter, setActiveLandmarkFilter] = useState<string | null>(null);
  const [landmarkFilterIds, setLandmarkFilterIds] = useState<string[]>([]);

  // Unique sites/locations extracted dynamically from photo catalog
  const uniqueLocations = ['All', ...Array.from(new Set(HISTORICAL_PHOTOS.map(p => p.locationName)))];

  // Search & Filter Algorithm
  const filteredPhotos = HISTORICAL_PHOTOS.filter((photo) => {
    // 1. Landmark filtering (from map click)
    if (activeLandmarkFilter && !landmarkFilterIds.includes(photo.id)) {
      return false;
    }
    // 2. Date range filtering (Start to End Year)
    if (photo.year < startYear || photo.year > endYear) {
      return false;
    }
    // 3. Category filtering
    if (selectedCategory !== 'All' && photo.category !== selectedCategory) {
      return false;
    }
    // 4. Specific location filtering
    if (selectedLocation !== 'All' && photo.locationName !== selectedLocation) {
      return false;
    }
    // 5. Keyword search
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchTitle = photo.title.toLowerCase().includes(q);
      const matchDesc = photo.description.toLowerCase().includes(q);
      const matchLoc = photo.locationName.toLowerCase().includes(q);
      const matchPhotographer = photo.photographer.toLowerCase().includes(q);
      const matchFact = photo.historicalFact.toLowerCase().includes(q);
      const matchAccession = photo.accessionNo.toLowerCase().includes(q);
      const matchTags = photo.tags.some((tag) => tag.toLowerCase().includes(q));

      return matchTitle || matchDesc || matchLoc || matchPhotographer || matchFact || matchAccession || matchTags;
    }

    return true;
  });

  // Handle filter clearing
  const handleClearAllFilters = () => {
    setSearchQuery('');
    setSelectedDecade('All');
    setStartYear(1880);
    setEndYear(1950);
    setSelectedCategory('All');
    setSelectedLocation('All');
    setActiveLandmarkFilter(null);
    setLandmarkFilterIds([]);
  };

  // Sync decade clicks with startYear and endYear range values
  const handleDecadeClick = (decade: string) => {
    setSelectedDecade(decade);
    if (decade === 'All') {
      setStartYear(1880);
      setEndYear(1950);
    } else {
      const yearStart = parseInt(decade.replace('s', ''), 10);
      setStartYear(yearStart);
      setEndYear(yearStart + 9);
    }
  };

  // Sync custom era presets
  const handleEraClick = (era: 'all' | 'victorian' | 'edwardian' | 'interwar' | 'postwar') => {
    setSelectedDecade('All');
    switch (era) {
      case 'all':
        setStartYear(1880);
        setEndYear(1950);
        break;
      case 'victorian':
        setStartYear(1880);
        setEndYear(1900);
        break;
      case 'edwardian':
        setStartYear(1901);
        setEndYear(1914);
        break;
      case 'interwar':
        setStartYear(1915);
        setEndYear(1939);
        break;
      case 'postwar':
        setStartYear(1940);
        setEndYear(1950);
        break;
    }
  };

  const handleStartYearChange = (year: number) => {
    setStartYear(year);
    if (year > endYear) {
      setEndYear(year);
    }
    setSelectedDecade('All');
  };

  const handleEndYearChange = (year: number) => {
    setEndYear(year);
    if (year < startYear) {
      setStartYear(year);
    }
    setSelectedDecade('All');
  };

  const isAnyFilterActive = 
    searchQuery !== '' || 
    selectedDecade !== 'All' || 
    selectedCategory !== 'All' || 
    selectedLocation !== 'All' || 
    startYear !== 1880 || 
    endYear !== 1950 || 
    activeLandmarkFilter !== null;

  // Trigger from Cartography Map pin clicks
  const handleFilterByLandmark = (landmarkId: string) => {
    const landmark = HISTORICAL_PHOTOS.filter(p => p.id); // dummy just for safety
    // Find matching landmark
    const targetLandmark = HISTORICAL_PHOTOS; // just search coordinate points
    // Let's extract landmark's photo IDs from our photos data
    if (landmarkId === 'gore-park') {
      setLandmarkFilterIds(['gore-park-1950', 'streetcar-1910']);
    } else if (landmarkId === 'dundurn-castle') {
      setLandmarkFilterIds(['dundurn-1890']);
    } else if (landmarkId === 'incline-railway') {
      setLandmarkFilterIds(['incline-1930', 'pigott-1935']);
    } else if (landmarkId === 'industrial-sector') {
      setLandmarkFilterIds(['steel-mill-1920']);
    } else if (landmarkId === 'beach-canal') {
      setLandmarkFilterIds(['canal-lighthouse-1880']);
    } else if (landmarkId === 'spencer-gorge') {
      setLandmarkFilterIds(['websters-1905', 'rbg-1932']);
    } else if (landmarkId === 'gage-park') {
      setLandmarkFilterIds(['gage-1947', 'westinghouse-1918']);
    }
    
    setActiveLandmarkFilter(landmarkId);
    setActiveView('gallery');
  };

  // Trigger from photo details to open AI discussion
  const handleConsultArthur = (photo: Photo) => {
    setSelectedPhoto(null);
    setChatReferencedPhoto(photo);
    setActiveView('chat');
  };

  return (
    <div className="min-h-screen bg-[#080808] text-[#e5e5e5] font-sans flex flex-col selection:bg-[#c5b358] selection:text-black">
      {/* Museum Branding Header */}
      <Header 
        activeView={activeView} 
        setActiveView={setActiveView} 
        photosCount={filteredPhotos.length}
      />

      {/* Main Container */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-10">
        
        {/* Dynamic view rendering */}
        {activeView === 'gallery' && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* Sidebar Controls (Filters & Curatorial Info) */}
            <div className="space-y-4 lg:space-y-6">
              
              {/* Mobile Filter Toggle Button */}
              <button 
                onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
                className="lg:hidden w-full flex items-center justify-between px-4 py-3 bg-[#0c0c0c] border border-white/10 rounded-xs text-xs font-mono font-bold uppercase tracking-wider text-white hover:text-[#c5b358] transition-colors cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-[#c5b358]" />
                  {isMobileFiltersOpen ? 'Hide Exploration Filters' : 'Show Exploration Filters'}
                </span>
                <span className="text-[10px] bg-white/5 border border-white/10 px-2 py-0.5 rounded text-white/50">
                  {isAnyFilterActive ? 'Active Filters' : 'All Ledger'}
                </span>
              </button>
              
              {/* Filter Panel Card */}
              <div className={`${isMobileFiltersOpen ? 'block' : 'hidden lg:block'} bg-[#0c0c0c] border border-white/10 rounded-xs shadow-sm p-5 space-y-5`}>
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <h2 className="text-xs font-mono uppercase tracking-wider text-white/40 font-bold flex items-center gap-1.5">
                    <Filter className="w-4 h-4 text-[#c5b358]" />
                    Archive Filters
                  </h2>
                  {isAnyFilterActive && (
                    <button
                      onClick={handleClearAllFilters}
                      className="text-[10px] font-mono text-[#c5b358] hover:text-[#c5b358]/80 underline cursor-pointer"
                    >
                      Clear All
                    </button>
                  )}
                </div>

                {/* Keyword Search */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-white/40 uppercase block font-bold">
                    Search Ledger
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Title, tag, name, ID, place..."
                      className="w-full bg-[#111] border border-white/10 focus:border-[#c5b358] focus:ring-1 focus:ring-[#c5b358] rounded-xs pl-9 pr-3 py-2 text-xs outline-none text-white placeholder-white/30 shadow-inner"
                    />
                    <Search className="w-3.5 h-3.5 text-white/30 absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                {/* Landmark Filter Active Status (from map) */}
                {activeLandmarkFilter && (
                  <div className="bg-[#c5b358]/10 border border-[#c5b358]/20 p-2.5 rounded-xs text-xs flex items-center justify-between">
                    <span className="font-mono text-white">
                      Map Area: <span className="font-serif italic text-[#c5b358] capitalize">{activeLandmarkFilter.replace('-', ' ')}</span>
                    </span>
                    <button 
                      onClick={() => {
                        setActiveLandmarkFilter(null);
                        setLandmarkFilterIds([]);
                      }}
                      className="text-white/40 hover:text-white text-[10px] font-mono cursor-pointer"
                    >
                      ✕ Remove
                    </button>
                  </div>
                )}

                {/* Specific Location Selector */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-white/40 uppercase block font-bold">
                    Specific Site / Landmark
                  </label>
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full bg-[#111] border border-white/10 focus:border-[#c5b358] focus:ring-1 focus:ring-[#c5b358] rounded-xs px-3 py-2 text-xs outline-none text-white cursor-pointer"
                  >
                    {uniqueLocations.map((loc) => (
                      <option key={loc} value={loc} className="bg-[#0c0c0c] text-white">
                        {loc === 'All' ? '📍 All Hamilton Sites' : `📍 ${loc}`}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Date Range Selection */}
                <div className="space-y-2.5">
                  <label className="text-[10px] font-mono text-white/40 uppercase block font-bold">
                    Date Range Timeline
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <span className="text-[9px] font-mono text-white/30 block">Start Year</span>
                      <select
                        value={startYear}
                        onChange={(e) => handleStartYearChange(parseInt(e.target.value, 10))}
                        className="w-full bg-[#111] border border-white/10 focus:border-[#c5b358] rounded-xs px-2 py-1.5 text-xs text-white outline-none cursor-pointer"
                      >
                        {[1880, 1885, 1890, 1895, 1900, 1905, 1910, 1915, 1920, 1925, 1930, 1935, 1940, 1945, 1950].map((yr) => (
                          <option key={yr} value={yr} className="bg-[#0c0c0c]">{yr}</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[9px] font-mono text-white/30 block">End Year</span>
                      <select
                        value={endYear}
                        onChange={(e) => handleEndYearChange(parseInt(e.target.value, 10))}
                        className="w-full bg-[#111] border border-white/10 focus:border-[#c5b358] rounded-xs px-2 py-1.5 text-xs text-white outline-none cursor-pointer"
                      >
                        {[1880, 1885, 1890, 1895, 1900, 1905, 1910, 1915, 1920, 1925, 1930, 1935, 1940, 1945, 1950].map((yr) => (
                          <option key={yr} value={yr} className="bg-[#0c0c0c]" disabled={yr < startYear}>{yr}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Historical Eras Quick Presets */}
                  <div className="pt-1.5">
                    <span className="text-[9px] font-mono text-white/30 block mb-1.5 uppercase">Archival Era Shortcuts</span>
                    <div className="flex flex-wrap gap-1">
                      <button
                        onClick={() => handleEraClick('victorian')}
                        className={`text-[9px] font-mono px-2 py-1 rounded-full border cursor-pointer transition-all ${
                          startYear === 1880 && endYear === 1900
                            ? 'bg-[#c5b358] text-[#080808] border-[#c5b358] font-bold'
                            : 'bg-[#111] text-white/60 border-white/10 hover:text-white'
                        }`}
                      >
                        Victorian (1880-1900)
                      </button>
                      <button
                        onClick={() => handleEraClick('edwardian')}
                        className={`text-[9px] font-mono px-2 py-1 rounded-full border cursor-pointer transition-all ${
                          startYear === 1901 && endYear === 1914
                            ? 'bg-[#c5b358] text-[#080808] border-[#c5b358] font-bold'
                            : 'bg-[#111] text-white/60 border-white/10 hover:text-white'
                        }`}
                      >
                        Edwardian (1901-1914)
                      </button>
                      <button
                        onClick={() => handleEraClick('interwar')}
                        className={`text-[9px] font-mono px-2 py-1 rounded-full border cursor-pointer transition-all ${
                          startYear === 1915 && endYear === 1939
                            ? 'bg-[#c5b358] text-[#080808] border-[#c5b358] font-bold'
                            : 'bg-[#111] text-white/60 border-white/10 hover:text-white'
                        }`}
                      >
                        Interwar/Deco (1915-1939)
                      </button>
                      <button
                        onClick={() => handleEraClick('postwar')}
                        className={`text-[9px] font-mono px-2 py-1 rounded-full border cursor-pointer transition-all ${
                          startYear === 1940 && endYear === 1950
                            ? 'bg-[#c5b358] text-[#080808] border-[#c5b358] font-bold'
                            : 'bg-[#111] text-white/60 border-white/10 hover:text-white'
                        }`}
                      >
                        Post-War (1940-1950)
                      </button>
                    </div>
                  </div>
                </div>

                {/* Historical Category Filter */}
                <div className="space-y-2">
                  <label className="text-[10px] font-mono text-white/40 uppercase block font-bold">
                    Category Selection
                  </label>
                  <div className="flex flex-col gap-1.5">
                    {ALL_CATEGORIES.map((category) => {
                      const getMappedLabel = (cat: string) => {
                        switch (cat) {
                          case 'All': return '📁 All Records';
                          case 'Historic Estates & Architecture': return '🏛️ Historical Buildings';
                          case 'Civic Life & People': return '👥 Community & Notable Figures';
                          case 'Transit & Streets': return '🚃 Transit & Streets';
                          case 'Industry & Business': return '🏭 Industry & Business';
                          case 'Parks & Nature': return '🌳 Parks, Waterfalls & Lakes';
                          default: return cat;
                        }
                      };
                      return (
                        <button
                          key={category}
                          onClick={() => setSelectedCategory(category)}
                          className={`text-left text-xs px-3 py-2 rounded-xs transition-all duration-155 flex items-center justify-between border cursor-pointer ${
                            selectedCategory === category
                              ? 'bg-[#c5b358] border-[#c5b358] text-[#080808] font-bold'
                              : 'bg-[#111] border-white/10 text-white/70 hover:bg-white/5 hover:text-white'
                          }`}
                        >
                          <span>{getMappedLabel(category)}</span>
                          {selectedCategory === category && <span className="w-1.5 h-1.5 rounded-full bg-[#080808]"></span>}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Decade Timeline Filter */}
                <div className="space-y-3">
                  <label className="text-[10px] font-mono text-white/40 uppercase block font-bold">
                    Historical Decade Presets
                  </label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {ALL_DECADES.map((decade) => (
                      <button
                        key={decade}
                        onClick={() => handleDecadeClick(decade)}
                        className={`text-center text-xs py-1.5 rounded-xs border transition-colors cursor-pointer ${
                          selectedDecade === decade
                            ? 'bg-[#c5b358] border-[#c5b358] text-[#080808] font-bold shadow-xs'
                            : 'bg-[#111] border-white/10 text-white/70 hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        {decade}
                      </button>
                    ))}
                  </div>
                </div>

              </div>

              {/* Plaque / Did you know */}
              <div className="bg-[#111] border border-white/10 rounded-xs p-5 shadow-xs relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-[#c5b358]"></div>
                <h3 className="text-xs font-mono uppercase tracking-wider text-[#c5b358] font-bold mb-2 flex items-center gap-1.5">
                  <Info className="w-4 h-4" />
                  Archival Notice
                </h3>
                <p className="text-xs text-white/70 leading-relaxed font-serif italic">
                  "Hamilton, Ontario—the 'Ambitious City'—saw dramatic expansions during the mid-20th century. Our blast furnaces powered Canada's rails, our incline railways scaled the escarpment daily, and our community assembled around Gore Park's fountains. Arthur Henderson is always available to tell you more about these stories."
                </p>
                <div className="mt-4 pt-3 border-t border-white/10">
                  <button 
                    onClick={() => setActiveView('chat')}
                    className="text-xs text-white hover:text-[#c5b358] font-mono font-bold flex items-center gap-1 group cursor-pointer"
                  >
                    Discuss with Curator
                    <ArrowRight className="w-3.5 h-3.5 text-[#c5b358] group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>

            </div>

            {/* Gallery Grid Section */}
            <div className="lg:col-span-3 space-y-6">
              
              {/* Summary Header */}
              <div className="flex items-center justify-between bg-[#0c0c0c] p-4 rounded-xs border border-white/10 shadow-xs">
                <span className="text-xs font-mono text-white/50">
                  Showing <strong className="text-white">{filteredPhotos.length}</strong> of <strong className="text-white">{HISTORICAL_PHOTOS.length}</strong> cataloged records
                </span>
                
                {/* Active filter markers */}
                <div className="flex flex-wrap gap-1.5 text-[10px] font-mono text-white/50 items-center justify-end">
                  {searchQuery !== '' && (
                    <span className="bg-[#c5b358]/10 border border-[#c5b358]/20 text-[#c5b358] px-2.5 py-0.5 rounded-xs flex items-center gap-1">
                      Query: "{searchQuery}"
                      <button onClick={() => setSearchQuery('')} className="hover:text-white ml-0.5 font-bold cursor-pointer">✕</button>
                    </span>
                  )}
                  {selectedCategory !== 'All' && (
                    <span className="bg-white/5 border border-white/10 px-2.5 py-0.5 rounded-xs text-white/80 flex items-center gap-1">
                      Category: {selectedCategory.split(' & ')[0]}
                      <button onClick={() => setSelectedCategory('All')} className="hover:text-white ml-0.5 font-bold cursor-pointer">✕</button>
                    </span>
                  )}
                  {selectedLocation !== 'All' && (
                    <span className="bg-white/5 border border-white/10 px-2.5 py-0.5 rounded-xs text-white/80 max-w-[150px] truncate flex items-center gap-1">
                      Site: {selectedLocation}
                      <button onClick={() => setSelectedLocation('All')} className="hover:text-white ml-0.5 font-bold cursor-pointer">✕</button>
                    </span>
                  )}
                  {(startYear !== 1880 || endYear !== 1950) && (
                    <span className="bg-white/5 border border-white/10 px-2.5 py-0.5 rounded-xs text-white/80 flex items-center gap-1">
                      Years: {startYear}–{endYear}
                      <button onClick={() => { setStartYear(1880); setEndYear(1950); setSelectedDecade('All'); }} className="hover:text-white ml-0.5 font-bold cursor-pointer">✕</button>
                    </span>
                  )}
                </div>
              </div>

              {/* Photos Grid */}
              {filteredPhotos.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredPhotos.map((photo) => (
                    <PhotoCard 
                      key={photo.id} 
                      photo={photo} 
                      onSelect={() => setSelectedPhoto(photo)} 
                    />
                  ))}
                </div>
              ) : (
                <div className="bg-[#0c0c0c] border border-white/10 rounded-xs p-12 text-center shadow-xs flex flex-col items-center justify-center min-h-[400px]">
                  <Archive className="w-16 h-16 text-white/20 stroke-[1.25] mb-4 animate-pulse" />
                  <h3 className="text-xl font-serif font-light text-white">No Historical Records Match</h3>
                  <p className="text-xs text-white/60 max-w-sm mt-2 leading-relaxed">
                    The Special Collections ledger has no recorded correspondence matching your current filters. Try relaxing your keyword query or expanding the timeline.
                  </p>
                  <button
                    onClick={handleClearAllFilters}
                    className="mt-6 px-4 py-2 bg-[#c5b358] text-[#080808] text-xs uppercase tracking-widest font-mono font-bold rounded-xs hover:bg-[#c5b358]/90 transition-colors border border-[#c5b358] cursor-pointer"
                  >
                    Restore Full Ledger
                  </button>
                </div>
              )}
            </div>

          </div>
        )}

        {activeView === 'map' && (
          <div className="animate-fade-in">
            <InteractiveMap 
              onSelectPhoto={(photo) => setSelectedPhoto(photo)}
              onFilterByLandmark={handleFilterByLandmark}
            />
          </div>
        )}

        {activeView === 'chat' && (
          <div className="max-w-3xl mx-auto w-full animate-fade-in">
            <ArchivistChat 
              referencedPhoto={chatReferencedPhoto}
              onClearReference={() => setChatReferencedPhoto(null)}
            />
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#0c0c0c] py-6 px-4 md:px-8 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-white/40">
          <p>© 2026 Hamilton Public Library Special Collections. All Rights Reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:underline text-white/50 hover:text-white">Terms of Archive Access</a>
            <span>•</span>
            <a href="#" className="hover:underline text-white/50 hover:text-white">Digital Rights Metadata</a>
          </div>
        </div>
      </footer>

      {/* Exquisite detail modals */}
      {selectedPhoto && (
        <PhotoDetailModal 
          photo={selectedPhoto}
          onClose={() => setSelectedPhoto(null)}
          onConsultArthur={handleConsultArthur}
        />
      )}
    </div>
  );
}
