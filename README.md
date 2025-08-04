# TheKneecApp - KNEECAP Lyrics & Translation App

An educational app to teach people the Irish language through bilingual music by KNEECAP.

## Features

### 🎵 **Spotify Integration**
- Connect your Spotify Premium account to play music while reading lyrics
- Full Web Playback SDK integration with play/pause, skip controls
- Volume control and real-time track information
- Seamless authentication flow

### 📱 **Mobile-Optimized Auto-Scroll**
- Smart auto-scroll that pauses when user manually scrolls
- Adjustable scroll speed with preset options
- Touch-optimized for mobile devices
- Floating controls for easy access

### 🔄 **Enhanced Translation Features**
- **Toggle All Translations**: Eye button in top-right to show/hide all translations at once
- **Individual Line Toggle**: Click any line to reveal its translation
- **Compact Layout**: Translations now display inline to save space
- **Smart Language Detection**: Automatically determines primary language based on JSON property order

### 🎨 **Visual Design**
- **Color-coded Arrows**: 
  - 🟢 Green arrows = English primary → Irish translation
  - 🟠 Orange arrows = Irish primary → English translation
- **Responsive Design**: Works perfectly on mobile and desktop
- **Dark Mode Support**: Full dark theme compatibility

### 📖 **Bilingual Lyrics System**
- Property order in JSON determines which language is shown first
- Line-by-line translations with cultural context
- Section headers for song structure (Verse, Chorus, etc.)
- Support for truly bilingual songs like "Better Way to Live"

## Setup Instructions

### 1. Spotify Developer Setup
1. Go to [Spotify for Developers](https://developer.spotify.com/)
2. Create a new app with these settings:
   - **App name**: `thekneecapp`
   - **Description**: `An educational app to teach people the Irish language through bilingual music`
   - **Website**: `thekneecapp.ie`
   - **Redirect URIs**: 
     - `http://localhost:3000/callback` (for development)
     - `https://thekneecapp.ie/callback` (for production)
   - **APIs**: Check "Web API" and "Web Playback SDK"

### 2. Environment Variables
Create a `.env.local` file in the root directory:
```bash
NEXT_PUBLIC_SPOTIFY_CLIENT_ID=your_client_id_here
```

### 3. Run the App
```bash
npm install
npm run dev
```

## How to Use

### Connecting Spotify
1. Click "Connect Spotify" on any song page
2. Log in with your Spotify Premium account
3. Grant permissions for playback control
4. You'll be redirected back to the app with a connected player

### Reading Lyrics
1. Browse songs from the sidebar or main songs page
2. Click any lyric line to see its translation
3. Use the eye button (👁️) in the top-right to show/hide all translations
4. Colors indicate language flow:
   - Green arrows: English → Irish
   - Orange arrows: Irish → English

### Auto-Scroll
1. Use the floating play button to start auto-scroll
2. Adjust speed with the settings gear icon
3. Auto-scroll automatically pauses when you manually scroll
4. Resumes after you stop scrolling for 1 second

## Song Data Structure

Songs are stored as JSON files with this structure:
```json
{
  "id": "song-id",
  "title": "Song Title",
  "titleEnglish": "English Title",
  "album": "Album Name",
  "year": 2024,
  "primaryLanguage": "mixed",
  "lines": [
    {
      "type": "section",
      "section": "Verse 1"
    },
    {
      "irish": "Irish lyrics here",
      "english": "English translation here"
    }
  ]
}
```

**Important**: The order of `"irish"` and `"english"` properties determines which language is shown first!

## Technical Stack

- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Spotify Web API & SDK** - Music integration
- **Lucide React** - Icons

## Contributing

1. Add new songs by creating JSON files in `src/data/songs/`
2. Import new songs in `src/data/songs.ts`
3. Follow the existing JSON structure for consistency
4. Ensure proper Irish/English language ordering

## License

This project is for educational purposes to promote the Irish language through KNEECAP's music.
