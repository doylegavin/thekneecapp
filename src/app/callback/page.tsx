// src/app/callback/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Music, CheckCircle, XCircle } from 'lucide-react';

export default function SpotifyCallback() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('Processing Spotify authentication...');
  const router = useRouter();

  useEffect(() => {
    const handleSpotifyCallback = async () => {
      try {
        // Check for error first
        const urlParams = new URLSearchParams(window.location.search);
        const error = urlParams.get('error');
        
        if (error) {
          setStatus('error');
          setMessage(`Authentication failed: ${error}`);
          return;
        }

        // Get authorization code from URL
        const code = urlParams.get('code');
        
        if (!code) {
          setStatus('error');
          setMessage('No authorization code received from Spotify');
          return;
        }

        // Get stored code verifier
        const codeVerifier = localStorage.getItem('spotify_code_verifier');
        
        if (!codeVerifier) {
          setStatus('error');
          setMessage('Code verifier not found. Please try logging in again.');
          return;
        }

        // Exchange authorization code for access token
        const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
        const redirectUri = window.location.hostname === 'localhost' 
          ? `http://127.0.0.1:${window.location.port}/callback`
          : `${window.location.origin}/callback`;

        const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: redirectUri,
            client_id: clientId || '',
            code_verifier: codeVerifier,
          }),
        });

        if (!tokenResponse.ok) {
          const errorData = await tokenResponse.json();
          setStatus('error');
          setMessage(`Token exchange failed: ${errorData.error_description || errorData.error}`);
          return;
        }

        const tokenData = await tokenResponse.json();
        
        // Store the tokens in localStorage
        localStorage.setItem('spotify_access_token', tokenData.access_token);
        localStorage.setItem('spotify_token_type', tokenData.token_type || 'Bearer');
        localStorage.setItem('spotify_expires_at', (Date.now() + tokenData.expires_in * 1000).toString());
        
        if (tokenData.refresh_token) {
          localStorage.setItem('spotify_refresh_token', tokenData.refresh_token);
        }
        
        // Clean up code verifier
        localStorage.removeItem('spotify_code_verifier');
        
        setStatus('success');
        setMessage('Successfully connected to Spotify!');
        
        // Redirect back to the app after 2 seconds
        setTimeout(() => {
          router.push('/songs');
        }, 2000);
        
      } catch (err) {
        console.error('Error processing Spotify callback:', err);
        setStatus('error');
        setMessage('An error occurred while processing authentication');
      }
    };

    handleSpotifyCallback();
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-orange-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
          {/* Header */}
          <div className="flex items-center justify-center space-x-2 mb-6">
            <Music className="h-8 w-8 text-green-600" />
            <span className="text-2xl font-bold">
              <span className="text-green-600">The</span>
              <span className="text-gray-900 dark:text-white">Kneec</span>
              <span className="text-orange-500">App</span>
            </span>
          </div>

          {/* Status Icon */}
          <div className="mb-6">
            {status === 'loading' && (
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600"></div>
              </div>
            )}
            {status === 'success' && (
              <CheckCircle className="h-16 w-16 text-green-600 mx-auto" />
            )}
            {status === 'error' && (
              <XCircle className="h-16 w-16 text-red-600 mx-auto" />
            )}
          </div>

          {/* Message */}
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Spotify Integration
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {message}
          </p>

          {/* Action Button */}
          {status === 'error' && (
            <button
              onClick={() => router.push('/songs')}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Return to Songs
            </button>
          )}

          {status === 'success' && (
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Redirecting you back to the app...
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 