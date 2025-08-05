// src/components/SpotifyPlayer.tsx
'use client';

import { useState, useEffect, useCallback } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, LogOut, Search } from 'lucide-react';

interface SpotifyPlayerProps {
  trackName?: string;
  artistName?: string;
}

interface SpotifyTrack {
  name: string;
  artists: Array<{ name: string }>;
  uri: string;
  id: string;
  preview_url?: string;
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
  const [searchedTrack, setSearchedTrack] = useState<SpotifyTrack | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [deviceId, setDeviceId] = useState<string>('');

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

  // Search for track when trackName changes
  useEffect(() => {
    if (isAuthenticated && accessToken && trackName && artistName) {
      searchForTrack(trackName, artistName);
    }
  }, [isAuthenticated, accessToken, trackName, artistName]);

  // Search for track using Spotify Web API
  const searchForTrack = async (track: string, artist: string) => {
    if (!accessToken) return;
    
    setIsSearching(true);
    try {
      const query = `track:"${track}" artist:"${artist}"`;
      const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=1`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      if (!response.ok) {
        throw new Error(`Search failed: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.tracks.items.length > 0) {
        setSearchedTrack(data.tracks.items[0]);
      } else {
        // Fallback: search with just track name
        const fallbackQuery = `"${track}"`;
        const fallbackResponse = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(fallbackQuery)}&type=track&limit=5`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });
        
        if (fallbackResponse.ok) {
          const fallbackData = await fallbackResponse.json();
          // Look for KNEECAP or similar artist
          const kneecapTrack = fallbackData.tracks.items.find((item: SpotifyTrack) => 
            item.artists.some(a => a.name.toLowerCase().includes('kneecap'))
          );
          setSearchedTrack(kneecapTrack || fallbackData.tracks.items[0] || null);
        }
      }
    } catch (error) {
      console.error('Error searching for track:', error);
    } finally {
      setIsSearching(false);
    }
  };

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
        setDeviceId(device_id);
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

  const handleLogin = async () => {
    const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
    
    if (!clientId) {
      alert('Spotify Client ID not found. Please check your .env.local file.');
      return;
    }
    
    // Use loopback IP for localhost development (Spotify requirement as of April 2025)
    let redirectUri;
    if (window.location.hostname === 'localhost') {
      redirectUri = `http://127.0.0.1:${window.location.port}/callback`;
    } else {
      redirectUri = `${window.location.origin}/callback`;
    }

    // Generate PKCE challenge
    const generateCodeChallenge = async (codeVerifier: string) => {
      const data = new TextEncoder().encode(codeVerifier);
      const digest = await window.crypto.subtle.digest('SHA-256', data);
      return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
    };

    const generateCodeVerifier = () => {
      const array = new Uint8Array(32);
      window.crypto.getRandomValues(array);
      return btoa(String.fromCharCode.apply(null, [...array]))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
    };

    // Generate and store PKCE values
    const codeVerifier = generateCodeVerifier();
    const codeChallenge = await generateCodeChallenge(codeVerifier);
    
    // Store code verifier for token exchange
    localStorage.setItem('spotify_code_verifier', codeVerifier);

    const scopes = [
      'streaming',
      'user-read-email',
      'user-read-private',
      'user-read-playback-state',
      'user-modify-playback-state'
    ].join(' ');

    const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&scope=${encodeURIComponent(scopes)}&redirect_uri=${encodeURIComponent(redirectUri)}&code_challenge_method=S256&code_challenge=${codeChallenge}`;
    
    window.location.href = authUrl;
  };

  const playTrack = async () => {
    if (!player || !isReady || !searchedTrack) return;
    
    try {
      // First, we need to transfer playback to our device and play the track
      await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uris: [searchedTrack.uri]
        })
      });
    } catch (error) {
      console.error('Error playing track:', error);
      // Fallback to toggle play if track transfer fails
      await player.togglePlay();
    }
  };

  const togglePlayback = async () => {
    if (!player) return;
    
    try {
      if (searchedTrack && !currentTrack) {
        // If we have a searched track but no current track, play the searched track
        await playTrack();
      } else {
        // Toggle current playback
        await player.togglePlay();
      }
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
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {isSearching ? 'Searching for track...' : 'Connecting to Spotify...'}
              </span>
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
              title={searchedTrack ? `Play "${searchedTrack.name}"` : 'Play/Pause'}
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
              {currentTrack ? currentTrack.name : searchedTrack ? searchedTrack.name : (trackName || 'No track found')}
            </div>
            <div className="text-gray-600 dark:text-gray-400">
              {currentTrack ? currentTrack.artists[0].name : searchedTrack ? searchedTrack.artists[0].name : (artistName || 'KNEECAP')}
            </div>
            {isSearching && (
              <div className="flex items-center space-x-1 text-xs text-gray-500">
                <Search className="h-3 w-3" />
                <span>Searching...</span>
              </div>
            )}
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
      
      {searchedTrack && !currentTrack && (
        <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
          <div className="text-sm text-green-800 dark:text-green-200">
            <div className="font-medium">Ready to play: {searchedTrack.name}</div>
            <div className="text-green-600 dark:text-green-300">by {searchedTrack.artists.map(a => a.name).join(', ')}</div>
          </div>
        </div>
      )}
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