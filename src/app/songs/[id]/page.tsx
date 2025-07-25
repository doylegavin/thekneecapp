// src/app/songs/[id]/page.tsx
'use client';

import { useState, use, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft, Music, Play, ChevronDown, ChevronUp, Pause, Settings, List } from 'lucide-react';
import { getSong, getAllSongs, type Song } from '../../../data/songs';
import KneecapAttribution from '../../../components/KneecapAttribution';

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
}

function LyricsLine({ line, song }: LyricsLineProps) {
  const [showTranslation, setShowTranslation] = useState(false);
  
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
        onClick={() => setShowTranslation(!showTranslation)}
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
      
      {/* Translation dropdown */}
      {showTranslation && (primaryText && translationText) && (
        <div className={`mt-1 mx-2 p-3 rounded-lg border-2 transition-all duration-300 ${
          isIrish 
            ? 'bg-orange-50 border-orange-200 dark:bg-orange-900/20 dark:border-orange-800' 
            : 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800'
        }`}>
          <div className="flex items-start space-x-2">
            <span className={`text-sm font-semibold ${
              isIrish ? 'text-orange-700 dark:text-orange-300' : 'text-green-700 dark:text-green-300'
            }`}>
              {isIrish ? '🇬🇧' : '🇮🇪'} {isIrish ? 'English:' : 'Gaeilge:'}
            </span>
          </div>
          <p className={`mt-2 text-lg font-medium leading-relaxed ${
            isIrish 
              ? 'text-orange-800 dark:text-orange-200' 
              : 'text-green-800 dark:text-green-200'
          }`}>
            {translationText}
          </p>
        </div>
      )}
    </div>
  );
}

// Auto-scroll control component (keeping your existing implementation)
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
            <div className="flex justify-center space-x-2 mb-2">
              {[0.5, 1, 1.5, 2].map((preset) => (
                <button
                  key={preset}
                  onClick={() => onSpeedChange(preset)}
                  className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                    Math.abs(speed - preset) < 0.05
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-500'
                  }`}
                >
                  {preset}x
                </button>
              ))}
            </div>
            
            {/* Current Speed Display */}
            <div className="text-center">
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                Current: {speed.toFixed(1)}x speed
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Main Control Panel */}
      <div className="bg-white dark:bg-gray-800 rounded-full shadow-lg border border-gray-200 dark:border-gray-700 p-2 flex items-center space-x-2">
        {/* Auto-scroll Toggle */}
        <button
          onClick={onToggle}
          className={`p-2 rounded-full transition-colors ${
            isPlaying
              ? 'bg-green-600 text-white hover:bg-green-700'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
          title={isPlaying ? 'Stop Auto-scroll' : 'Start Auto-scroll'}
        >
          {isPlaying ? (
            <Pause className="h-5 w-5" />
          ) : (
            <Play className="h-5 w-5" />
          )}
        </button>

        {/* Settings Toggle */}
        <button
          onClick={() => setShowControls(!showControls)}
          className={`p-2 rounded-full transition-colors ${
            showControls
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
          title="Auto-scroll Settings"
        >
          <Settings className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

interface SongPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function SongPage({ params }: SongPageProps) {
  const { id } = use(params);
  const [song, setSong] = useState<Song | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Auto-scroll state
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);
  const [scrollSpeed, setScrollSpeed] = useState(1);
  const lyricsContainerRef = useRef<HTMLDivElement>(null);
  const scrollIntervalRef = useRef<NodeJS.Timeout | null>(null);

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

  // Auto-scroll logic (keeping your existing implementation)
  useEffect(() => {
    if (isAutoScrolling && lyricsContainerRef.current) {
      const baseScrollStep = 2;
      const scrollStep = Math.max(0.5, baseScrollStep * scrollSpeed);
      const baseDelay = 20;
      const scrollDelay = Math.max(5, baseDelay / scrollSpeed);
      
      scrollIntervalRef.current = setInterval(() => {
        if (lyricsContainerRef.current) {
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
  }, [isAutoScrolling, scrollSpeed]);

  const toggleAutoScroll = () => {
    setIsAutoScrolling(!isAutoScrolling);
  };

  const handleSpeedChange = (speed: number) => {
    setScrollSpeed(speed);
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



        {/* Controls */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <button 
                className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors cursor-not-allowed opacity-75"
                disabled
                title="Spotify Premium account required"
              >
                <Play className="h-5 w-5" />
                <span>Play on Spotify</span>
              </button>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Requires Spotify Premium & Sign-in
              </div>
            </div>
            
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Click any line to see translation
            </div>
          </div>
        </div>

        {/* Lyrics with line-by-line translations */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="bg-green-600 text-white px-6 py-4">
            <h3 className="text-xl font-semibold">
              Lyrics & Translations
            </h3>
            <p className="text-green-100 text-sm mt-1">
              Tap any line to reveal its translation • Green arrows = Irish to English • Red arrows = English to Irish
            </p>
          </div>
          
          <div 
            ref={lyricsContainerRef}
            className="p-6 max-h-screen overflow-y-auto"
            style={{ scrollBehavior: 'smooth' }}
          >
            {song.lines.map((line, index: number) => (
              <LyricsLine key={index} line={line} song={song} />
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