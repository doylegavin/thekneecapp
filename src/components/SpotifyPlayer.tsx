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
}

interface SpotifyPlayerState {
  paused: boolean;
  position: number;
  duration: number;
  track_window: {
    current_track: {
      name: string;
      artists: Array<{ name: string }>;
      uri: string;
      id: string;
    };
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
  pause: () => Promise<void>;
  resume: () => Promise<void>;
}

export default function SpotifyPlayer({ trackName, artistName }: SpotifyPlayerProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState<string>('');
  const [player, setPlayer] = useState<SpotifyPlayer | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [currentTrack, setCurrentTrack] = useState<SpotifyTrack | null>(null);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [sdkLoaded, setSdkLoaded] = useState(false);
  const [error, setError] = useState<string>('');

  // Add debug logging function - console only
  const addDebugInfo = useCallback((message: string) => {
    console.log('[Spotify Debug]:', message);
  }, []);

  // Clear error when starting new actions
  const clearError = useCallback(() => {
    setError('');
  }, []);

  // Check for existing token on component mount
  useEffect(() => {
    addDebugInfo('Checking for existing authentication...');
    const token = localStorage.getItem('spotify_access_token');
    const expiresAt = localStorage.getItem('spotify_expires_at');
    
    if (token && expiresAt && Date.now() < parseInt(expiresAt)) {
      addDebugInfo('Found valid access token');
      setAccessToken(token);
      setIsAuthenticated(true);
    } else {
      addDebugInfo('No valid access token found');
      localStorage.removeItem('spotify_access_token');
      localStorage.removeItem('spotify_refresh_token');
      localStorage.removeItem('spotify_expires_at');
    }
  }, [addDebugInfo]);

  useEffect(() => {
    addDebugInfo('Loading Spotify Web Playback SDK...');
    
    if (window.Spotify) {
      addDebugInfo('Spotify SDK already loaded');
      setSdkLoaded(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://sdk.scdn.co/spotify-player.js';
    script.async = true;
    
    script.onload = () => {
      addDebugInfo('Spotify SDK script loaded successfully');
      setSdkLoaded(true);
    };
    
    script.onerror = (error) => {
      const errorMsg = 'Failed to load Spotify SDK script';
      console.error(errorMsg, error);
      addDebugInfo(errorMsg);
      setError(errorMsg);
    };

    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      addDebugInfo('Spotify Web Playback SDK ready callback triggered');
    };

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [addDebugInfo]);

  useEffect(() => {
    if (!sdkLoaded || !window.Spotify || !isAuthenticated || !accessToken) {
      return;
    }

    addDebugInfo('Initializing Spotify player...');
    clearError();

    try {
      const spotifyPlayer = new window.Spotify.Player({
        name: 'Kneecap Web Player',
        getOAuthToken: (cb: (token: string) => void) => {
          addDebugInfo('Player requesting OAuth token');
          cb(accessToken);
        },
        volume: volume
      });

      // Enhanced error handling
      spotifyPlayer.addListener<SpotifyError>('initialization_error', ({ message }) => {
        const errorMsg = `Initialization error: ${message}`;
        console.error(errorMsg);
        addDebugInfo(errorMsg);
        setError(errorMsg);
      });

      spotifyPlayer.addListener<SpotifyError>('authentication_error', ({ message }) => {
        const errorMsg = `Authentication error: ${message}`;
        console.error(errorMsg);
        addDebugInfo(errorMsg);
        setError(errorMsg);
        setIsAuthenticated(false);
        localStorage.removeItem('spotify_access_token');
        localStorage.removeItem('spotify_refresh_token');
        localStorage.removeItem('spotify_expires_at');
      });

      spotifyPlayer.addListener<SpotifyError>('account_error', ({ message }) => {
        const errorMsg = `Account error: ${message}`;
        console.error(errorMsg);
        addDebugInfo(errorMsg);
        setError(errorMsg);
      });

      spotifyPlayer.addListener<SpotifyError>('playback_error', ({ message }) => {
        const errorMsg = `Playback error: ${message}`;
        console.error(errorMsg);
        addDebugInfo(errorMsg);
        setError(errorMsg);
      });

      spotifyPlayer.addListener<{ device_id: string }>('ready', ({ device_id }) => {
        addDebugInfo(`Player ready with device ID: ${device_id}`);
        setIsReady(true);
      });

      spotifyPlayer.addListener<{ device_id: string }>('not_ready', ({ device_id }) => {
        addDebugInfo(`Player not ready with device ID: ${device_id}`);
        setIsReady(false);
      });

      spotifyPlayer.addListener<SpotifyPlayerState>('player_state_changed', (state) => {
        if (!state) {
          addDebugInfo('Player state changed: null state');
          return;
        }

        addDebugInfo(`Player state changed: ${state.paused ? 'paused' : 'playing'}`);
        setIsPaused(state.paused);
        setPosition(state.position);
        setDuration(state.duration);
        
        if (state.track_window?.current_track) {
          setCurrentTrack({
            name: state.track_window.current_track.name,
            artists: state.track_window.current_track.artists,
            uri: state.track_window.current_track.uri,
            id: state.track_window.current_track.id
          });
        }
      });

      // Connect with enhanced error handling
      addDebugInfo('Connecting to Spotify...');
      spotifyPlayer.connect().then((success: boolean) => {
        if (success) {
          addDebugInfo('Successfully connected to Spotify');
          setPlayer(spotifyPlayer);
        } else {
          const errorMsg = 'Failed to connect to Spotify';
          addDebugInfo(errorMsg);
          setError(errorMsg);
        }
      }).catch((error: Error) => {
        const errorMsg = `Connection error: ${error.message}`;
        console.error(errorMsg, error);
        addDebugInfo(errorMsg);
        setError(errorMsg);
      });

    } catch (error) {
      const errorMsg = `Player initialization failed: ${error instanceof Error ? error.message : 'Unknown error'}`;
      console.error(errorMsg, error);
      addDebugInfo(errorMsg);
      setError(errorMsg);
    }

    return () => {
      if (player) {
        addDebugInfo('Disconnecting player...');
        player.disconnect();
      }
    };
  }, [sdkLoaded, isAuthenticated, accessToken, volume, addDebugInfo, clearError]);

  const handleLogin = async () => {
    addDebugInfo('Starting Spotify login process...');
    clearError();
    
    try {
      const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
      if (!clientId) {
        const errorMsg = 'Spotify Client ID not configured';
        addDebugInfo(errorMsg);
        setError(errorMsg);
        return;
      }

      const generateCodeVerifier = () => {
        const array = new Uint8Array(32);
        crypto.getRandomValues(array);
        return btoa(String.fromCharCode(...array))
          .replace(/=/g, '')
          .replace(/\+/g, '-')
          .replace(/\//g, '_');
      };

      const generateCodeChallenge = async (codeVerifier: string) => {
        const encoder = new TextEncoder();
        const data = encoder.encode(codeVerifier);
        const digest = await crypto.subtle.digest('SHA-256', data);
        return btoa(String.fromCharCode(...new Uint8Array(digest)))
          .replace(/=/g, '')
          .replace(/\+/g, '-')
          .replace(/\//g, '_');
      };

      const codeVerifier = generateCodeVerifier();
      localStorage.setItem('spotify_code_verifier', codeVerifier);
      const codeChallenge = await generateCodeChallenge(codeVerifier);

      const scopes = 'streaming user-read-email user-read-private user-read-playback-state user-modify-playback-state';
      
      let redirectUri;
      if (window.location.hostname === 'localhost') {
        redirectUri = `http://127.0.0.1:${window.location.port}/callback`;
        addDebugInfo(`Using localhost redirect URI: ${redirectUri}`);
      } else {
        redirectUri = `${window.location.origin}/callback`;
        addDebugInfo(`Using production redirect URI: ${redirectUri}`);
      }

      const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&scope=${encodeURIComponent(scopes)}&redirect_uri=${encodeURIComponent(redirectUri)}&code_challenge_method=S256&code_challenge=${codeChallenge}`;
      
      addDebugInfo('Redirecting to Spotify authorization...');
      window.location.href = authUrl;
    } catch (error) {
      const errorMsg = `Login failed: ${error instanceof Error ? error.message : 'Unknown error'}`;
      console.error(errorMsg, error);
      addDebugInfo(errorMsg);
      setError(errorMsg);
    }
  };

  const handleLogout = useCallback(() => {
    addDebugInfo('Logging out...');
    clearError();
    
    try {
      if (player) {
        player.disconnect();
        setPlayer(null);
      }
      
      localStorage.removeItem('spotify_access_token');
      localStorage.removeItem('spotify_refresh_token');
      localStorage.removeItem('spotify_expires_at');
      localStorage.removeItem('spotify_code_verifier');
      
      setIsAuthenticated(false);
      setAccessToken('');
      setIsReady(false);
      setCurrentTrack(null);
      addDebugInfo('Logout successful');
    } catch (error) {
      const errorMsg = `Logout error: ${error instanceof Error ? error.message : 'Unknown error'}`;
      console.error(errorMsg, error);
      addDebugInfo(errorMsg);
      setError(errorMsg);
    }
  }, [player, addDebugInfo, clearError]);

  const searchTrack = useCallback(async (trackName: string, artistName: string, accessToken: string) => {
    addDebugInfo(`Searching for track: "${trackName}" by "${artistName}"`);
    clearError();
    
    try {
      const query = encodeURIComponent(`track:"${trackName}" artist:"${artistName}"`);
      const response = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=track&limit=1`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      if (!response.ok) {
        throw new Error(`Search failed: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      if (data.tracks?.items?.length > 0) {
        const track = data.tracks.items[0];
        addDebugInfo(`Found track: ${track.name} by ${track.artists[0].name}`);
        return {
          name: track.name,
          artists: track.artists,
          uri: track.uri,
          id: track.id
        };
      } else {
        addDebugInfo('No tracks found for search query');
        return null;
      }
    } catch (error) {
      const errorMsg = `Track search failed: ${error instanceof Error ? error.message : 'Unknown error'}`;
      console.error(errorMsg, error);
      addDebugInfo(errorMsg);
      setError(errorMsg);
      return null;
    }
  }, [addDebugInfo, clearError]);

  const playTrack = useCallback(async (trackUri: string) => {
    if (!player || !isReady) {
      const errorMsg = 'Player not ready for playback';
      addDebugInfo(errorMsg);
      setError(errorMsg);
      return;
    }

    addDebugInfo(`Attempting to play track: ${trackUri}`);
    clearError();

    try {
      const response = await fetch(`https://api.spotify.com/v1/me/player/play`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          uris: [trackUri]
        })
      });

      if (response.ok) {
        addDebugInfo('Track playback started successfully');
      } else if (response.status === 404) {
        addDebugInfo('No active device found, trying to transfer playback...');
        // Try to get current player state to find device ID
        const stateResponse = await fetch('https://api.spotify.com/v1/me/player', {
          headers: { 'Authorization': `Bearer ${accessToken}` }
        });
        
        if (stateResponse.ok) {
          const state = await stateResponse.json();
          if (state.device?.id) {
            addDebugInfo(`Transferring playback to device: ${state.device.id}`);
            // Transfer playback and then play
            await fetch('https://api.spotify.com/v1/me/player', {
              method: 'PUT',
              headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                device_ids: [state.device.id],
                play: false
              })
            });
            
            // Now try to play again
            setTimeout(() => playTrack(trackUri), 1000);
          } else {
            throw new Error('No active Spotify device found');
          }
        } else {
          throw new Error('No active Spotify device found');
        }
      } else {
        throw new Error(`Playback failed: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      const errorMsg = `Playback error: ${error instanceof Error ? error.message : 'Unknown error'}`;
      console.error(errorMsg, error);
      addDebugInfo(errorMsg);
      setError(errorMsg);
    }
  }, [player, isReady, accessToken, addDebugInfo, clearError]);

  // Search for track when trackName and artistName are available
  useEffect(() => {
    if (trackName && artistName && isAuthenticated && accessToken && isReady) {
      searchTrack(trackName, artistName, accessToken).then(foundTrack => {
        if (foundTrack) {
          setCurrentTrack(foundTrack);
          playTrack(foundTrack.uri);
        }
      });
    }
  }, [trackName, artistName, isAuthenticated, accessToken, isReady, searchTrack, playTrack]);

  const togglePlayback = async () => {
    if (!player || !isReady) return;
    
    try {
      if (currentTrack && !isPaused) {
        // Currently playing, pause it
        await player.pause();
      } else if (currentTrack && isPaused) {
        // Currently paused, resume it
        await player.resume();
      } else if (trackName && artistName) {
        // No current track, search and play
        const foundTrack = await searchTrack(trackName, artistName, accessToken);
        if (foundTrack) {
          setCurrentTrack(foundTrack);
          await playTrack(foundTrack.uri);
        }
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
    const volumeDecimal = newVolume / 100;
    setVolume(volumeDecimal);
    if (player && isReady) {
      try {
        await player.setVolume(volumeDecimal);
      } catch (error) {
        console.error('Error setting volume:', error);
      }
    }
  };

  // If not authenticated, show login button
  if (!isAuthenticated) {
    return (
      <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Spotify Player</h3>
          <button
            onClick={handleLogin}
            disabled={!!error}
            className="bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            Connect Spotify
          </button>
        </div>
        
        {error && (
          <div className="bg-red-100 dark:bg-red-900 border border-red-400 text-red-700 dark:text-red-300 px-4 py-3 rounded mb-4">
            <p className="font-medium">Error:</p>
            <p className="text-sm">{error}</p>
          </div>
        )}
        
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Connect your Spotify account to play music directly in the app.
        </p>
      </div>
    );
  }

  // If authenticated but player not ready
  if (!isReady) {
    return (
      <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Spotify Player</h3>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Disconnect
          </button>
        </div>
        
        {error ? (
          <div className="bg-red-100 dark:bg-red-900 border border-red-400 text-red-700 dark:text-red-300 px-4 py-3 rounded mb-4">
            <p className="font-medium">Connection Error:</p>
            <p className="text-sm">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-2 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
            >
              Retry
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-500"></div>
            <span>Connecting to Spotify...</span>
          </div>
        )}
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
                isPaused 
                  ? 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500' 
                  : 'bg-green-600 hover:bg-green-700 text-white'
              }`}
              disabled={!isReady}
              title={currentTrack ? `Play "${currentTrack.name}"` : `Search and play "${trackName}"`}
            >
              {isPaused ? (
                <Play className="h-6 w-6" />
              ) : (
                <Pause className="h-6 w-6" />
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
              {currentTrack ? currentTrack.name : (trackName || 'No Track')}
            </div>
            <div className="text-gray-600 dark:text-gray-400">
              {currentTrack ? currentTrack.artists[0].name : (artistName || 'KNEECAP')}
            </div>
            {/* Removed isSearching as it's not directly related to the new SDK state */}
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
            value={volume * 100}
            onChange={(e) => handleVolumeChange(parseInt(e.target.value))}
            className="w-20 h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
          />
          <span className="text-xs text-gray-500 dark:text-gray-400 w-8">{volume * 100}%</span>
        </div>
      </div>
      
      {currentTrack && (
        <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
          <div className="text-sm text-green-800 dark:text-green-200">
            <div className="font-medium">Now playing: {currentTrack.name}</div>
            <div className="text-green-600 dark:text-green-300">by {currentTrack.artists.map(a => a.name).join(', ')}</div>
            <div className="text-xs text-green-500 dark:text-green-400 mt-1">
              Powered by Spotify
            </div>
          </div>
        </div>
      )}

      <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
        <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
          Spotify Premium account required. Music streaming for educational purposes only.
        </p>
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