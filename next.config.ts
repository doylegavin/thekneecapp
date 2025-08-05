import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // Content Security Policy for Spotify Web Playback SDK
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://sdk.scdn.co https://open.spotifycdn.com",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' blob: data: https://*.scdn.co https://*.spotifycdn.com",
              "font-src 'self' data:",
              "connect-src 'self' https://api.spotify.com https://accounts.spotify.com https://*.spotify.com https://*.scdn.co wss://*.spotify.com",
              "media-src 'self' blob: https://*.scdn.co https://*.spotifycdn.com",
              "frame-src 'self' https://open.spotify.com https://accounts.spotify.com",
              "worker-src 'self' blob:",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self' https://accounts.spotify.com",
              "frame-ancestors 'self'",
              "upgrade-insecure-requests"
            ].join('; ')
          },
          // Permissions Policy for Spotify Web Playback SDK
          {
            key: 'Permissions-Policy',
            value: [
              "autoplay=(self)",
              "camera=()",
              "display-capture=()",
              "encrypted-media=(self)",
              "fullscreen=(self)",
              "geolocation=()",
              "microphone=()",
              "midi=()",
              "payment=()",
              "picture-in-picture=()",
              "publickey-credentials-get=()",
              "screen-wake-lock=()",
              "web-share=()",
              "xr-spatial-tracking=()"
            ].join(', ')
          },
          // Additional headers for Spotify SDK compatibility
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'unsafe-none'
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin-allow-popups'
          },
          // Allow encrypted media for DRM content
          {
            key: 'Feature-Policy',
            value: 'encrypted-media *; autoplay *'
          }
        ],
      },
    ];
  },
};

export default nextConfig;
