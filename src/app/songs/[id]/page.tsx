'use client';

import { useState, use, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft, Music, Play, ChevronDown, ChevronUp, Pause, Settings } from 'lucide-react';
import { getSong, Song } from '../../../data/songs';

interface LyricsLineProps {
  line: {
    irish?: string;
    english?: string;
    language?: 'irish' | 'english';
    type?: 'section' | 'lyric';
    section?: string;
    artist?: string;
  };
}

function LyricsLine({ line }: LyricsLineProps) {
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
  const isIrish = line.language === 'irish';
  const primaryText = isIrish ? line.irish : line.english;
  const translationText = isIrish ? line.english : line.irish;
  
  return (
    <div className="mb-1">
      {/* Main line with dropdown toggle */}
      <div 
        className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors"
        onClick={() => setShowTranslation(!showTranslation)}
      >
        <p className="text-lg leading-relaxed text-gray-900 dark:text-white flex-1">
          {primaryText}
        </p>
        <div className={`ml-3 p-1 rounded transition-colors ${
          isIrish 
            ? 'text-green-600 hover:bg-green-100 dark:hover:bg-green-900/20' 
            : 'text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20'
        }`}>
          {showTranslation ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
        </div>
      </div>
      
      {/* Translation dropdown */}
      {showTranslation && (
        <div className={`mt-1 mx-2 p-3 rounded-lg border-2 transition-all duration-300 ${
          isIrish 
            ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800' 
            : 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800'
        }`}>
          <div className="flex items-start space-x-2">
            <span className={`text-sm font-semibold ${
              isIrish ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'
            }`}>
              {isIrish ? '🇬🇧' : '🇮🇪'} {isIrish ? 'English:' : 'Gaeilge:'}
            </span>
          </div>
          <p className={`mt-2 text-lg font-medium leading-relaxed ${
            isIrish 
              ? 'text-green-800 dark:text-green-200' 
              : 'text-red-800 dark:text-red-200'
          }`}>
            {translationText}
          </p>
        </div>
      )}
    </div>
  );
}

// Auto-scroll control component
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
              <style jsx>{`
                .slider::-webkit-slider-thumb {
                  appearance: none;
                  height: 18px;
                  width: 18px;
                  border-radius: 50%;
                  background: #10b981;
                  cursor: pointer;
                  border: 2px solid #ffffff;
                  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                }
                .slider::-moz-range-thumb {
                  height: 18px;
                  width: 18px;
                  border-radius: 50%;
                  background: #10b981;
                  cursor: pointer;
                  border: 2px solid #ffffff;
                  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                }
              `}</style>
            </div>
            
            {/* Speed Labels */}
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>0.2x</span>
              <span>1x</span>
              <span>2x</span>
              <span>3x</span>
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
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {speed <= 0.5 ? 'Very Slow' : 
                 speed <= 0.8 ? 'Slow' : 
                 speed <= 1.2 ? 'Normal' : 
                 speed <= 2 ? 'Fast' : 'Very Fast'}
              </div>
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
  const song = getSong(id);
  
  // Auto-scroll state
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);
  const [scrollSpeed, setScrollSpeed] = useState(1);
  const lyricsContainerRef = useRef<HTMLDivElement>(null);
  const scrollIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-scroll logic with improved speed calculation
  useEffect(() => {
    if (isAutoScrolling && lyricsContainerRef.current) {
      // Much more responsive speed calculation
      // scrollSpeed ranges from 0.2 to 3.0
      const baseScrollStep = 2; // base pixels per step
      const scrollStep = Math.max(0.5, baseScrollStep * scrollSpeed); // variable step size
      const baseDelay = 20; // base delay in ms
      const scrollDelay = Math.max(5, baseDelay / scrollSpeed); // variable delay
      
      scrollIntervalRef.current = setInterval(() => {
        if (lyricsContainerRef.current) {
          const container = lyricsContainerRef.current;
          const currentScroll = container.scrollTop;
          const maxScroll = container.scrollHeight - container.clientHeight;
          
          if (currentScroll >= maxScroll) {
            // Reached the end, stop auto-scrolling
            setIsAutoScrolling(false);
          } else {
            // Smooth scrolling with requestAnimationFrame for better performance
            container.scrollTop += scrollStep;
          }
        }
      }, scrollDelay);
    } else {
      // Clear interval when auto-scrolling is stopped
      if (scrollIntervalRef.current) {
        clearInterval(scrollIntervalRef.current);
        scrollIntervalRef.current = null;
      }
    }

    // Cleanup on unmount
    return () => {
      if (scrollIntervalRef.current) {
        clearInterval(scrollIntervalRef.current);
      }
    };
  }, [isAutoScrolling, scrollSpeed]);

  // Auto-scroll controls
  const toggleAutoScroll = () => {
    setIsAutoScrolling(!isAutoScrolling);
  };

  const handleSpeedChange = (speed: number) => {
    setScrollSpeed(speed);
  };

  if (!song) {
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

  const hasFullLyrics = ['amach-anocht', 'cearta', 'get-your-brits-out'].includes(song.id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-orange-50 dark:from-gray-900 dark:to-gray-800">
      {/* Navigation */}
      <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/songs" className="flex items-center space-x-2 text-gray-600 hover:text-green-600 transition-colors">
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Songs</span>
            </Link>
            <div className="flex items-center space-x-2">
              <Music className="h-8 w-8 text-green-600" />
              <span className="text-2xl font-bold text-gray-900 dark:text-white">KNEECAP</span>
            </div>
          </div>
        </div>
      </nav>

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

        {!hasFullLyrics && (
          <div className="mb-8 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <div className="text-amber-600 dark:text-amber-400">
                <svg className="h-5 w-5 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-amber-800 dark:text-amber-200">
                  Lyrics Coming Soon
                </h3>
                <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
                  Complete line-by-line translations for this song are being prepared. Check back soon for the full lyrics experience!
                </p>
              </div>
            </div>
          </div>
        )}

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
              {hasFullLyrics ? 'Click any line to see translation' : 'Preview content - full lyrics coming soon'}
            </div>
          </div>
        </div>

        {/* Lyrics with line-by-line translations */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="bg-green-600 text-white px-6 py-4">
            <h3 className="text-xl font-semibold">
              {hasFullLyrics ? 'Lyrics & Translations' : 'Song Preview'}
            </h3>
            <p className="text-green-100 text-sm mt-1">
              {hasFullLyrics 
                ? 'Tap any line to reveal its translation • Green arrows = Irish to English • Red arrows = English to Irish'
                : 'Full lyrics and translations coming soon'
              }
            </p>
          </div>
          
          <div 
            ref={lyricsContainerRef}
            className="p-6 max-h-screen overflow-y-auto"
            style={{ scrollBehavior: 'smooth' }}
          >
            {song.lines.map((line, index: number) => (
              <LyricsLine key={index} line={line} />
            ))}
          </div>
        </div>

        {/* Auto-scroll controller - only show if lyrics are available */}
        {hasFullLyrics && (
          <AutoScrollController
            onToggle={toggleAutoScroll}
            isPlaying={isAutoScrolling}
            speed={scrollSpeed}
            onSpeedChange={handleSpeedChange}
          />
        )}

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
              <h4 className="font-semibold mb-2">Album Context:</h4>
              <p className="text-sm">
                {song.album === 'Fine Art' 
                  ? 'From KNEECAP&apos;s critically acclaimed 2024 album &quot;Fine Art&quot;, produced by Toddla T. The album seamlessly merges Irish with English lyrics.'
                  : song.album === '3CAG'
                  ? 'From KNEECAP&apos;s debut 2018 mixtape &quot;3CAG&quot; (3 Consonants and a Vowel), which introduced their unique bilingual rap style to the world.'
                  : 'A standalone single release showcasing KNEECAP&apos;s evolving sound and lyrical prowess.'
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 