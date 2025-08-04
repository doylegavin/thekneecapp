// src/components/SpotifyPlayer.tsx
'use client';

import { useState, useEffect, useCallback } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, LogOut } from 'lucide-react';

interface SpotifyPlayerProps {
  trackName?: string;
  artistName?: string;
}

interface SpotifyTrack {
  name: string;
  artists: Array<{ name: string }>;
  uri: string;
}

interface SpotifyPlayerState {
  paused: boolean;
  track_window: {
    current_track: SpotifyTrack;
  };
}

interface SpotifyError {
  message: string;
}

interface SpotifyPlayer {
  addListener: <T = unknown>(event: string, callback: (data: T) => void) => void;
  connect: () => Promise<boolean>;
  disconnect: () => void;
  togglePlay: () => Promise<void>;
  previousTrack: () => Promise<void>;
  nextTrack: () => Promise<void>;
  setVolume: (volume: number) => Promise<void>;
}

export default function SpotifyPlayer({ trackName, artistName }: SpotifyPlayerProps) {
  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [player, setPlayer] = useState<SpotifyPlayer | null>(null);
  const [accessToken, setAccessToken] = useState<string>('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<SpotifyTrack | null>(null);
  const [volume, setVolume] = useState(50);

  // Check for existing token on component mount
  useEffect(() => {
    const token = localStorage.getItem('spotify_access_token');
    const expiresAt = localStorage.getItem('spotify_expires_at');
    
    if (token && expiresAt && Date.now() < parseInt(expiresAt)) {
      setAccessToken(token);
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = useCallback(() => {
    localStorage.removeItem('spotify_access_token');
    localStorage.removeItem('spotify_token_type');
    localStorage.removeItem('spotify_expires_at');
    setIsAuthenticated(false);
    setAccessToken('');
    setIsReady(false);
    if (player) {
      player.disconnect();
    }
  }, [player]);

  // Load Spotify Web Playback SDK
  useEffect(() => {
    if (!isAuthenticated || !accessToken) return;

    const script = document.createElement('script');
    script.src = 'https://sdk.scdn.co/spotify-player.js';
    script.async = true;
    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const spotifyPlayer = new window.Spotify.Player({
        name: 'TheKneecApp Web Player',
        getOAuthToken: (cb: (token: string) => void) => {
          cb(accessToken);
        },
        volume: volume / 100
      });

      // Error handling
      spotifyPlayer.addListener('initialization_error', ({ message }: SpotifyError) => {
        console.error('Failed to initialize:', message);
      });

      spotifyPlayer.addListener('authentication_error', ({ message }: SpotifyError) => {
        console.error('Failed to authenticate:', message);
        handleLogout();
      });

      spotifyPlayer.addListener('account_error', ({ message }: SpotifyError) => {
        console.error('Failed to validate Spotify account:', message);
      });

      spotifyPlayer.addListener('playback_error', ({ message }: SpotifyError) => {
        console.error('Failed to perform playback:', message);
      });

      // Ready
      spotifyPlayer.addListener('ready', ({ device_id }: { device_id: string }) => {
        console.log('Ready with Device ID', device_id);
        setIsReady(true);
      });

      // Not ready
      spotifyPlayer.addListener('not_ready', ({ device_id }: { device_id: string }) => {
        console.log('Device ID has gone offline', device_id);
        setIsReady(false);
      });

      // Player state changed
      spotifyPlayer.addListener('player_state_changed', (state: SpotifyPlayerState | null) => {
        if (!state) return;

        setCurrentTrack(state.track_window.current_track);
        setIsPlaying(!state.paused);
      });

      // Connect to the player
      spotifyPlayer.connect();
      setPlayer(spotifyPlayer);
    };

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [isAuthenticated, accessToken, volume, handleLogout]);

  const handleLogin = () => {
    const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
    
    if (!clientId) {
      alert('Spotify Client ID not found. Please check your .env.local file.');
      return;
    }
    
    const redirectUri = `${window.location.origin}/callback`;
    const scopes = [
      'streaming',
      'user-read-email',
      'user-read-private',
      'user-read-playback-state',
      'user-modify-playback-state'
    ].join(' ');

    const authUrl = `https://accounts.spotify.com/authorize?response_type=token&client_id=${clientId}&scope=${encodeURIComponent(scopes)}&redirect_uri=${encodeURIComponent(redirectUri)}`;
    
    window.location.href = authUrl;
  };

  const togglePlayback = async () => {
    if (!player) return;
    
    try {
      await player.togglePlay();
    } catch (error) {
      console.error('Error toggling playback:', error);
    }
  };

  const previousTrack = async () => {
    if (!player) return;
    
    try {
      await player.previousTrack();
    } catch (error) {
      console.error('Error skipping to previous track:', error);
    }
  };

  const nextTrack = async () => {
    if (!player) return;
    
    try {
      await player.nextTrack();
    } catch (error) {
      console.error('Error skipping to next track:', error);
    }
  };

  const handleVolumeChange = async (newVolume: number) => {
    setVolume(newVolume);
    if (player) {
      try {
        await player.setVolume(newVolume / 100);
      } catch (error) {
        console.error('Error setting volume:', error);
      }
    }
  };

  // If not authenticated, show login button
  if (!isAuthenticated) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <button 
              onClick={handleLogin}
              className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Play className="h-5 w-5" />
              <span>Connect Spotify</span>
            </button>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Premium account required
            </div>
          </div>
          
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Listen along while reading lyrics
          </div>
        </div>
      </div>
    );
  }

  // If authenticated but player not ready
  if (!isReady) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-green-600"></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">Connecting to Spotify...</span>
            </div>
            <button 
              onClick={handleLogout}
              className="flex items-center space-x-2 text-red-600 hover:text-red-700 px-2 py-1 rounded transition-colors"
              title="Disconnect Spotify"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Main player interface
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <button 
              onClick={previousTrack}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
              disabled={!isReady}
            >
              <SkipBack className="h-5 w-5" />
            </button>
            <button 
              onClick={togglePlayback}
              className={`p-3 rounded-full transition-colors ${
                isPlaying 
                  ? 'bg-green-600 hover:bg-green-700 text-white' 
                  : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500'
              }`}
              disabled={!isReady}
            >
              {isPlaying ? (
                <Pause className="h-6 w-6" />
              ) : (
                <Play className="h-6 w-6" />
              )}
            </button>
            <button 
              onClick={nextTrack}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
              disabled={!isReady}
            >
              <SkipForward className="h-5 w-5" />
            </button>
          </div>
          
          <div className="text-sm">
            <div className="font-medium text-gray-900 dark:text-white">
              {currentTrack ? currentTrack.name : (trackName || 'No track playing')}
            </div>
            <div className="text-gray-600 dark:text-gray-400">
              {currentTrack ? currentTrack.artists[0].name : (artistName || 'KNEECAP')}
            </div>
          </div>

          <button 
            onClick={handleLogout}
            className="flex items-center space-x-2 text-red-600 hover:text-red-700 px-2 py-1 rounded transition-colors ml-4"
            title="Disconnect Spotify"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline text-xs">Disconnect</span>
          </button>
        </div>
        
        <div className="flex items-center space-x-2">
          <Volume2 className="h-4 w-4 text-gray-600 dark:text-gray-400" />
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => handleVolumeChange(parseInt(e.target.value))}
            className="w-20 h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
          />
          <span className="text-xs text-gray-500 dark:text-gray-400 w-8">{volume}%</span>
        </div>
      </div>
    </div>
  );
}

// Extend Window interface for Spotify SDK
declare global {
  interface Window {
    onSpotifyWebPlaybackSDKReady: () => void;
    Spotify: {
      Player: new (options: {
        name: string;
        getOAuthToken: (cb: (token: string) => void) => void;
        volume: number;
      }) => SpotifyPlayer;
    };
  }
} 