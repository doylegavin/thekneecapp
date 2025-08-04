// src/app/songs/[id]/page.tsx
'use client';

import { useState, use, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { ArrowLeft, Music, Play, ChevronDown, ChevronUp, Pause, Settings, List, Eye, EyeOff } from 'lucide-react';
import { getSong, getAllSongs, type Song } from '../../../data/songs';
import KneecapAttribution from '../../../components/KneecapAttribution';
import SpotifyPlayer from '../../../components/SpotifyPlayer';

interface LyricsLineProps {
  line: {
    irish?: string;
    english?: string;
    language?: 'irish' | 'english' | 'mixed';
    type?: 'section' | 'lyric';
    section?: string;
    artist?: string;
  };
  song: Song;
  showTranslation?: boolean;
  onToggleTranslation?: () => void;
}

function LyricsLine({ line, song, showTranslation = false, onToggleTranslation }: LyricsLineProps) {
  // Handle section headers
  if (line.type === 'section') {
    return (
      <div className="mb-4 mt-6 first:mt-0">
        <div className="flex items-center space-x-3 mb-2">
          <h4 className="text-sm font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
            {line.section}
          </h4>
          {line.artist && (
            <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
              {line.artist}
            </span>
          )}
        </div>
        <div className="w-full h-px bg-gray-200 dark:bg-gray-700"></div>
      </div>
    );
  }
  
  // Handle regular lyric lines
  // Determine primary language based on property order in the line object
  // The first property (english or irish) is the primary/visible language
  const lineKeys = Object.keys(line);
  const firstLanguageKey = lineKeys.find(key => key === 'english' || key === 'irish');
  const isIrish = firstLanguageKey === 'irish';
  
  const primaryText = isIrish ? line.irish : line.english;
  const translationText = isIrish ? line.english : line.irish;
  
  // If we don't have both texts, just show what we have
  if (!primaryText && !translationText) return null;
  
  return (
    <div className="mb-1">
      {/* Main line with dropdown toggle */}
      <div 
        className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors"
        onClick={onToggleTranslation}
      >
        <p className="text-lg leading-relaxed text-gray-900 dark:text-white flex-1">
          {primaryText || translationText}
        </p>
        {(primaryText && translationText) && (
          <div className={`ml-3 p-1 rounded transition-colors ${
            isIrish 
              ? 'text-orange-600 hover:bg-orange-100 dark:hover:bg-orange-900/20' 
              : 'text-green-600 hover:bg-green-100 dark:hover:bg-green-900/20'
          }`}>
            {showTranslation ? (
              <ChevronUp className="h-5 w-5" />
            ) : (
              <ChevronDown className="h-5 w-5" />
            )}
          </div>
        )}
      </div>
      
      {/* Translation dropdown - Improved compact layout */}
      {showTranslation && (primaryText && translationText) && (
        <div className={`mt-1 mx-2 p-3 rounded-lg border-2 transition-all duration-300 ${
          isIrish 
            ? 'bg-orange-50 border-orange-200 dark:bg-orange-900/20 dark:border-orange-800' 
            : 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800'
        }`}>
          {/* Compact layout: Flag, language label, and translation on same line */}
          <div className="flex items-start space-x-2">
            <span className={`text-sm font-semibold whitespace-nowrap ${
              isIrish ? 'text-orange-700 dark:text-orange-300' : 'text-green-700 dark:text-green-300'
            }`}>
              {isIrish ? '🇬🇧' : '🇮🇪'} {isIrish ? 'English:' : 'Gaeilge:'}
            </span>
            <p className={`text-lg font-medium leading-relaxed flex-1 ${
              isIrish 
                ? 'text-orange-800 dark:text-orange-200' 
                : 'text-green-800 dark:text-green-200'
            }`}>
              {translationText}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// Auto-scroll control component with improved mobile support
function AutoScrollController({ onToggle, isPlaying, speed, onSpeedChange }: {
  onToggle: () => void;
  isPlaying: boolean;
  speed: number;
  onSpeedChange: (speed: number) => void;
}) {
  const [showControls, setShowControls] = useState(false);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSpeed = parseFloat(e.target.value);
    onSpeedChange(newSpeed);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Speed Controls */}
      {showControls && (
        <div className="mb-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-4 min-w-[280px]">
          <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
            Auto-Scroll Speed
          </h4>
          
          {/* Speed Slider */}
          <div className="space-y-3">
            <div className="relative">
              <input
                type="range"
                min="0.2"
                max="3"
                step="0.1"
                value={speed}
                onChange={handleSliderChange}
                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, #10b981 0%, #10b981 ${((speed - 0.2) / (3 - 0.2)) * 100}%, #e5e7eb ${((speed - 0.2) / (3 - 0.2)) * 100}%, #e5e7eb 100%)`
                }}
              />
            </div>
            
            {/* Quick Presets */}
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
              <button onClick={() => onSpeedChange(0.5)} className="hover:text-green-600">
                Slow
              </button>
              <button onClick={() => onSpeedChange(1)} className="hover:text-green-600">
                Normal
              </button>
              <button onClick={() => onSpeedChange(2)} className="hover:text-green-600">
                Fast
              </button>
            </div>
            
            <div className="text-center text-sm text-gray-600 dark:text-gray-400">
              Speed: {speed.toFixed(1)}x
            </div>
          </div>
        </div>
      )}
      
      {/* Main Controls */}
      <div className="flex flex-col space-y-2">
        {/* Settings Button */}
        <button
          onClick={() => setShowControls(!showControls)}
          className="w-12 h-12 bg-gray-600 hover:bg-gray-700 text-white rounded-full flex items-center justify-center shadow-lg transition-colors"
          title="Speed Settings"
        >
          <Settings className="h-6 w-6" />
        </button>
        
        {/* Play/Pause Button */}
        <button
          onClick={onToggle}
          className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-colors ${
            isPlaying 
              ? 'bg-red-600 hover:bg-red-700 text-white' 
              : 'bg-green-600 hover:bg-green-700 text-white'
          }`}
          title={isPlaying ? 'Pause Auto-Scroll' : 'Start Auto-Scroll'}
        >
          {isPlaying ? (
            <Pause className="h-6 w-6" />
          ) : (
            <Play className="h-6 w-6" />
          )}
        </button>
      </div>
    </div>
  );
}

interface SongPageProps {
  params: Promise<{ id: string }>;
}

export default function SongPage({ params }: SongPageProps) {
  const { id } = use(params);
  const [song, setSong] = useState<Song | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Auto-scroll state with improved mobile support
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);
  const [scrollSpeed, setScrollSpeed] = useState(1);
  const [userScrolling, setUserScrolling] = useState(false);
  const lyricsContainerRef = useRef<HTMLDivElement>(null);
  const scrollIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const userScrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Translation state
  const [allTranslationsExpanded, setAllTranslationsExpanded] = useState(false);
  const [expandedLines, setExpandedLines] = useState<Set<number>>(new Set());

  // Get all songs for sidebar, sorted alphabetically
  const allSongs = getAllSongs().sort((a, b) => a.title.localeCompare(b.title));

  // Load song data
  useEffect(() => {
    try {
      setLoading(true);
      const songData = getSong(id);
      if (songData) {
        setSong(songData);
      } else {
        setError('Song not found');
      }
    } catch (err) {
      setError('Failed to load song');
      console.error('Error loading song:', err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  // User scroll detection
  const handleUserScroll = useCallback(() => {
    setUserScrolling(true);
    
    // Clear existing timeout
    if (userScrollTimeoutRef.current) {
      clearTimeout(userScrollTimeoutRef.current);
    }
    
    // Set new timeout to detect when user stops scrolling
    userScrollTimeoutRef.current = setTimeout(() => {
      setUserScrolling(false);
    }, 1000); // 1 second after user stops scrolling
  }, []);

  // Auto-scroll logic with user scroll detection
  useEffect(() => {
    if (isAutoScrolling && !userScrolling && lyricsContainerRef.current) {
      const baseScrollStep = 2;
      const scrollStep = Math.max(0.5, baseScrollStep * scrollSpeed);
      const baseDelay = 20;
      const scrollDelay = Math.max(5, baseDelay / scrollSpeed);
      
      scrollIntervalRef.current = setInterval(() => {
        if (lyricsContainerRef.current && !userScrolling) {
          const container = lyricsContainerRef.current;
          const currentScroll = container.scrollTop;
          const maxScroll = container.scrollHeight - container.clientHeight;
          
          if (currentScroll >= maxScroll) {
            setIsAutoScrolling(false);
          } else {
            container.scrollTop += scrollStep;
          }
        }
      }, scrollDelay);
    } else {
      if (scrollIntervalRef.current) {
        clearInterval(scrollIntervalRef.current);
        scrollIntervalRef.current = null;
      }
    }

    return () => {
      if (scrollIntervalRef.current) {
        clearInterval(scrollIntervalRef.current);
      }
    };
  }, [isAutoScrolling, scrollSpeed, userScrolling]);

  // Add scroll event listener
  useEffect(() => {
    const container = lyricsContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleUserScroll, { passive: true });
      container.addEventListener('touchmove', handleUserScroll, { passive: true });
      
      return () => {
        container.removeEventListener('scroll', handleUserScroll);
        container.removeEventListener('touchmove', handleUserScroll);
      };
    }
  }, [handleUserScroll]);

  const toggleAutoScroll = () => {
    setIsAutoScrolling(!isAutoScrolling);
  };

  const handleSpeedChange = (speed: number) => {
    setScrollSpeed(speed);
  };

  // Toggle all translations
  const toggleAllTranslations = () => {
    if (!song) return;
    
    if (allTranslationsExpanded) {
      // Collapse all
      setExpandedLines(new Set());
      setAllTranslationsExpanded(false);
    } else {
      // Expand all
      const allLineIndices = new Set<number>();
      song.lines.forEach((_, index) => {
        allLineIndices.add(index);
      });
      setExpandedLines(allLineIndices);
      setAllTranslationsExpanded(true);
    }
  };

  // Toggle individual line translation
  const toggleLineTranslation = (index: number) => {
    const newExpandedLines = new Set(expandedLines);
    if (newExpandedLines.has(index)) {
      newExpandedLines.delete(index);
    } else {
      newExpandedLines.add(index);
    }
    setExpandedLines(newExpandedLines);
    
    // Update the all translations state
    setAllTranslationsExpanded(newExpandedLines.size === song?.lines.length);
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-orange-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <Music className="h-16 w-16 text-green-600 mx-auto mb-4 animate-pulse" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Loading song...</h1>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !song) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-orange-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <Music className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Song not found</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            This song might not be available yet or the URL might be incorrect.
          </p>
          <Link href="/songs" className="text-green-600 hover:text-green-700 transition-colors">
            ← Back to Songs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-orange-50 dark:from-gray-900 dark:to-gray-800">
      {/* Navigation */}
      <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/songs" className="flex items-center space-x-2 text-gray-600 hover:text-green-600 transition-colors">
                <ArrowLeft className="h-5 w-5" />
                <span>Back to Songs</span>
              </Link>
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="flex items-center space-x-2 text-gray-600 hover:text-green-600 transition-colors lg:hidden"
              >
                <List className="h-5 w-5" />
                <span>Songs</span>
              </button>
            </div>
            <div className="flex items-center space-x-2">
              <Music className="h-8 w-8 text-green-600" />
              <span className="text-2xl font-bold">
                <span className="text-green-600">The</span>
                <span className="text-gray-900 dark:text-white">Kneec</span>
                <span className="text-orange-500">App</span>
              </span>
            </div>
            {/* Toggle All Translations Button */}
            <button
              onClick={toggleAllTranslations}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                allTranslationsExpanded
                  ? 'bg-orange-100 text-orange-700 hover:bg-orange-200 dark:bg-orange-900/20 dark:text-orange-300'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300'
              }`}
              title={allTranslationsExpanded ? 'Hide all translations' : 'Show all translations'}
            >
              {allTranslationsExpanded ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
              <span className="hidden sm:inline">
                {allTranslationsExpanded ? 'Hide All' : 'Show All'}
              </span>
            </button>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Left Sidebar - Song List */}
        <div className={`${sidebarOpen ? 'block' : 'hidden'} lg:block fixed lg:relative inset-y-0 left-0 z-50 w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 lg:border-r-0 lg:shadow-lg`}>
          <div className="flex flex-col h-screen pt-16 lg:pt-0">
            <div className="flex-shrink-0 px-4 py-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">All Songs</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Alphabetical order</p>
            </div>
            <div className="flex-1 overflow-y-auto">
              <div className="px-2 py-2">
                {allSongs.map((songItem) => (
                  <Link
                    key={songItem.id}
                    href={`/songs/${songItem.id}`}
                    className={`block px-3 py-2 mb-1 rounded-lg text-sm transition-colors ${
                      songItem.id === id
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300 font-medium'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    {songItem.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <div className="flex-1 lg:ml-0">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Song Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2">
            {song.title}
          </h1>
          {song.title !== song.titleEnglish && (
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">
              {song.titleEnglish}
            </p>
          )}
          <div className="flex items-center justify-center space-x-4 text-gray-600 dark:text-gray-400">
            <span>Album: {song.album}</span>
            <span>•</span>
            <span>{song.year}</span>
            {song.duration && (
              <>
                <span>•</span>
                <span>{song.duration}</span>
              </>
            )}
          </div>
        </div>

        {/* Spotify Player */}
        <SpotifyPlayer 
          trackName={song.title}
          artistName="KNEECAP"
        />

        {/* Instructions */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 mb-8">
          <div className="text-center text-sm text-gray-600 dark:text-gray-400">
            Click any line to see translation • Use the eye button to show/hide all translations
          </div>
        </div>

        {/* Lyrics with line-by-line translations */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="bg-green-600 text-white px-6 py-4">
            <h3 className="text-xl font-semibold">
              Lyrics & Translations
            </h3>
            <p className="text-green-100 text-sm mt-1">
              Tap any line to reveal its translation • Green arrows = English to Irish • Orange arrows = Irish to English
            </p>
          </div>
          
          <div 
            ref={lyricsContainerRef}
            className="p-6 max-h-screen overflow-y-auto"
            style={{ 
              scrollBehavior: isAutoScrolling ? 'auto' : 'smooth',
              // Improve mobile scroll performance
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {song.lines.map((line, index: number) => (
              <LyricsLine 
                key={index} 
                line={line} 
                song={song} 
                showTranslation={expandedLines.has(index)}
                onToggleTranslation={() => toggleLineTranslation(index)}
              />
            ))}
          </div>
        </div>

        {/* Auto-scroll controller */}
        <AutoScrollController
          onToggle={toggleAutoScroll}
          isPlaying={isAutoScrolling}
          speed={scrollSpeed}
          onSpeedChange={handleSpeedChange}
        />

        {/* Song Information */}
        <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
          <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-3">
            About &quot;{song.title}&quot;
          </h3>
          <div className="grid md:grid-cols-2 gap-4 text-blue-700 dark:text-blue-300">
            <div>
              <h4 className="font-semibold mb-2">Release Information:</h4>
              <ul className="space-y-1 text-sm">
                <li><strong>Album:</strong> {song.album}</li>
                <li><strong>Year:</strong> {song.year}</li>
                {song.duration && <li><strong>Duration:</strong> {song.duration}</li>}
                <li><strong>Language:</strong> {song.primaryLanguage === 'irish' ? 'Irish (Gaeilge)' : song.primaryLanguage === 'english' ? 'English' : 'Bilingual'}</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">About this song:</h4>
              <p className="text-sm">
                {song.description}
              </p>
            </div>
          </div>
        </div>

            {/* KNEECAP Attribution */}
            <KneecapAttribution />
          </div>
        </div>
      </div>
    </div>
  );
}