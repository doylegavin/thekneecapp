'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Music, Search, Filter, ArrowLeft, SortAsc, SortDesc } from 'lucide-react';

// Complete KNEECAP discography organized by release
const songs = [
  // ===== FINE ART (2024) =====
  {
    id: '3cag-feat-radie-peat',
    title: '3CAG',
    titleEnglish: '3CAG (feat. Radie Peat)',
    album: 'Fine Art',
    year: 2024,
    duration: '3:08',
    language: 'Irish',
    primaryLanguage: 'irish',
    hasTranslation: true,
    description: 'Opening track from Fine Art featuring Radie Peat, setting the tone for the album.',
  },
  {
    id: 'fine-art',
    title: 'Fine Art',
    titleEnglish: 'Fine Art',
    album: 'Fine Art',
    year: 2024,
    duration: '2:19',
    language: 'Bilingual',
    primaryLanguage: 'mixed',
    hasTranslation: true,
    description: 'Title track exploring artistic expression as resistance and identity in both languages.',
  },
  {
    id: 'i-bhfiacha-linne',
    title: 'I bhFiacha Linne',
    titleEnglish: 'In Our Debt',
    album: 'Fine Art',
    year: 2024,
    duration: '3:07',
    language: 'Irish',
    primaryLanguage: 'irish',
    hasTranslation: true,
    description: 'Aggressive track about debts and money owed, showcasing KNEECAP\'s harder edge.',
  },
  {
    id: 'im-flush',
    title: 'I\'m Flush',
    titleEnglish: 'I\'m Flush',
    album: 'Fine Art',
    year: 2024,
    duration: '2:56',
    language: 'English',
    primaryLanguage: 'english',
    hasTranslation: true,
    description: 'Money-focused track showing KNEECAP\'s success and financial confidence.',
  },
  {
    id: 'better-way-to-live',
    title: 'Better Way to Live',
    titleEnglish: 'Better Way to Live (feat. Grian Chatten)',
    album: 'Fine Art',
    year: 2024,
    duration: '2:56',
    language: 'Bilingual',
    primaryLanguage: 'mixed',
    hasTranslation: true,
    description: 'Collaboration with Fontaines D.C.\'s Grian Chatten exploring themes of addiction and hope.',
  },
  {
    id: 'sick-in-the-head',
    title: 'Sick in the Head',
    titleEnglish: 'Sick in the Head',
    album: 'Fine Art',
    year: 2024,
    duration: '2:32',
    language: 'English',
    primaryLanguage: 'english',
    hasTranslation: true,
    description: 'Raw exploration of mental health struggles and societal pressure.',
  },
  {
    id: 'love-making',
    title: 'Love Making',
    titleEnglish: 'Love Making (feat. Nino)',
    album: 'Fine Art',
    year: 2024,
    duration: '2:27',
    language: 'English',
    primaryLanguage: 'english',
    hasTranslation: true,
    description: 'Sensual track featuring Nino, showing KNEECAP\'s more intimate side.',
  },
  {
    id: 'drug-dealin-pagans',
    title: 'Drug Dealin Pagans',
    titleEnglish: 'Drug Dealin Pagans',
    album: 'Fine Art',
    year: 2024,
    duration: '2:33',
    language: 'Irish',
    primaryLanguage: 'irish',
    hasTranslation: true,
    description: 'Provocative track blending spiritual and street themes in Irish.',
  },
  {
    id: 'harrow-road',
    title: 'Harrow Road',
    titleEnglish: 'Harrow Road (feat. Jelani Blackman)',
    album: 'Fine Art',
    year: 2024,
    duration: '3:45',
    language: 'English',
    primaryLanguage: 'english',
    hasTranslation: true,
    description: 'London-set collaboration with Jelani Blackman about urban navigation and displacement.',
  },
  {
    id: 'parful',
    title: 'Parful',
    titleEnglish: 'Parful',
    album: 'Fine Art',
    year: 2024,
    duration: '3:19',
    language: 'Bilingual',
    primaryLanguage: 'mixed',
    hasTranslation: true,
    description: 'House-influenced banger about cross-community raving and unity through music.',
  },
  {
    id: 'rhino-ket',
    title: 'Rhino Ket',
    titleEnglish: 'Rhino Ket',
    album: 'Fine Art',
    year: 2024,
    duration: '3:07',
    language: 'Bilingual',
    primaryLanguage: 'mixed',
    hasTranslation: true,
    description: 'Techno/dancehall hybrid showcasing KNEECAP\'s experimental electronic side.',
  },
  {
    id: 'way-too-much',
    title: 'Way Too Much',
    titleEnglish: 'Way Too Much',
    album: 'Fine Art',
    year: 2024,
    duration: '3:17',
    language: 'English',
    primaryLanguage: 'english',
    hasTranslation: true,
    description: 'Introspective closing track about excess and finding balance.',
  },

  // ===== 3CAG (2018) =====
  {
    id: 'your-all-legitimate-targets',
    title: 'Your All Legitimate Targets',
    titleEnglish: 'Your All Legitimate Targets',
    album: '3CAG',
    year: 2018,
    duration: '1:23',
    language: 'English',
    primaryLanguage: 'english',
    hasTranslation: true,
    description: 'Provocative opening statement from KNEECAP\'s debut mixtape.',
  },
  {
    id: 'amach-anocht',
    title: 'Amach Anocht',
    titleEnglish: 'Out Tonight',
    album: '3CAG',
    year: 2018,
    duration: '4:06',
    language: 'Irish',
    primaryLanguage: 'irish',
    hasTranslation: true,
    description: 'Irish party anthem about going out and living life to the fullest.',
  },
  {
    id: 'ta-na-baggies-ar-an-talamh',
    title: 'Tá na Baggies ar an Talamh',
    titleEnglish: 'The Baggies Are on the Ground',
    album: '3CAG',
    year: 2018,
    duration: '3:51',
    language: 'Irish',
    primaryLanguage: 'irish',
    hasTranslation: true,
    description: 'Street narrative about drug culture, featuring MC Muipéad.',
  },
  {
    id: 'cearta',
    title: 'C.E.A.R.T.A',
    titleEnglish: 'R.I.G.H.T.S',
    album: '3CAG',
    year: 2018,
    duration: '3:43',
    language: 'Irish',
    primaryLanguage: 'irish',
    hasTranslation: true,
    description: 'KNEECAP\'s breakthrough song about a police encounter while carrying illegal substances.',
  },
  {
    id: 'incognito',
    title: 'Incognito',
    titleEnglish: 'Incognito',
    album: '3CAG',
    year: 2018,
    duration: '3:29',
    language: 'Bilingual',
    primaryLanguage: 'mixed',
    hasTranslation: true,
    description: 'Stealth-mode track about staying under the radar.',
  },
  {
    id: 'ceacht-mo-chara',
    title: 'Ceacht Mo Chara',
    titleEnglish: 'My Friend\'s Lesson',
    album: '3CAG',
    year: 2018,
    duration: '4:23',
    language: 'Irish',
    primaryLanguage: 'irish',
    hasTranslation: true,
    description: 'Storytelling track about learning from friends\' experiences.',
  },
  {
    id: 'your-sniffer-dogs-are-shite',
    title: 'Your Sniffer Dogs Are Shite',
    titleEnglish: 'Your Sniffer Dogs Are Shite',
    album: '3CAG',
    year: 2018,
    duration: '5:28',
    language: 'English',
    primaryLanguage: 'english',
    hasTranslation: true,
    description: 'Anti-police anthem criticizing law enforcement methods.',
  },
  {
    id: 'bouncers',
    title: 'Bouncers',
    titleEnglish: 'Bouncers',
    album: '3CAG',
    year: 2018,
    duration: '4:16',
    language: 'English',
    primaryLanguage: 'english',
    hasTranslation: true,
    description: 'Club culture commentary about door security and nightlife politics.',
  },

  // ===== SINGLES & OTHER RELEASES =====
  {
    id: 'the-recap',
    title: 'THE RECAP',
    titleEnglish: 'THE RECAP (ft. Mozey)',
    album: 'Single',
    year: 2025,
    duration: '3:30',
    language: 'English',
    primaryLanguage: 'english',
    hasTranslation: true,
    description: 'Latest single featuring Mozey, summarizing KNEECAP\'s journey so far.',
  },
  {
    id: 'its-been-ages',
    title: 'ITS BEEN AGES',
    titleEnglish: 'ITS BEEN AGES',
    album: 'Single',
    year: 2023,
    duration: '2:45',
    language: 'English',
    primaryLanguage: 'english',
    hasTranslation: true,
    description: 'Return single after a gap between releases, acknowledging the wait.',
  },
  {
    id: 'hood',
    title: 'H.O.O.D',
    titleEnglish: 'H.O.O.D',
    album: 'Single',
    year: 2021,
    duration: '3:30',
    language: 'English',
    primaryLanguage: 'english',
    hasTranslation: true,
    description: 'Neighborhood pride anthem representing West Belfast.',
  },
  {
    id: 'guilty-conscience',
    title: 'Guilty Conscience',
    titleEnglish: 'Guilty Conscience',
    album: 'Single',
    year: 2021,
    duration: '3:45',
    language: 'English',
    primaryLanguage: 'english',
    hasTranslation: true,
    description: 'Introspective track examining moral conflicts and personal accountability.',
  },
  {
    id: 'thart-agus-thart',
    title: 'Thart agus Thart',
    titleEnglish: 'Around and Around',
    album: 'Single',
    year: 2021,
    duration: '3:20',
    language: 'Irish',
    primaryLanguage: 'irish',
    hasTranslation: true,
    description: 'Circular narrative about life\'s repetitive cycles in Irish.',
  },
  {
    id: 'get-your-brits-out',
    title: 'Get Your Brits Out',
    titleEnglish: 'Get Your Brits Out',
    album: 'Single',
    year: 2019,
    duration: '3:20',
    language: 'English',
    primaryLanguage: 'english',
    hasTranslation: true,
    description: 'Political anthem calling for British withdrawal from Ireland.',
  },
  {
    id: 'fenian-cunts',
    title: 'Fenian Cunts',
    titleEnglish: 'Fenian Cunts',
    album: 'Single',
    year: 2019,
    duration: '3:15',
    language: 'Bilingual',
    primaryLanguage: 'mixed',
    hasTranslation: true,
    description: 'Provocative track reclaiming sectarian language and turning it into empowerment.',
  },
  {
    id: 'gael-gigolos',
    title: 'Gael-Gigolos',
    titleEnglish: 'Gael-Gigolos',
    album: 'Single',
    year: 2019,
    duration: '3:10',
    language: 'Bilingual',
    primaryLanguage: 'mixed',
    hasTranslation: true,
    description: 'Playful track about Irish speakers as modern-day gigolos.',
  },
];

export default function SongsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAlbum, setSelectedAlbum] = useState('all');
  const [sortBy, setSortBy] = useState('album'); // 'album', 'alphabetical', 'year-newest', 'year-oldest'

  // Sort the songs based on the selected option
  const getSortedSongs = () => {
    let sorted = [...songs];
    
    switch (sortBy) {
      case 'alphabetical':
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'year-newest':
        sorted.sort((a, b) => b.year - a.year);
        break;
      case 'year-oldest':
        sorted.sort((a, b) => a.year - b.year);
        break;
      case 'album':
      default:
        // Default grouping by album (Fine Art first, then 3CAG, then Singles)
        const albumOrder = { 'Fine Art': 1, '3CAG': 2, 'Single': 3 };
        sorted.sort((a, b) => {
          const albumCompare = albumOrder[a.album as keyof typeof albumOrder] - albumOrder[b.album as keyof typeof albumOrder];
          if (albumCompare !== 0) return albumCompare;
          return a.year - b.year;
        });
        break;
    }
    
    return sorted;
  };

  const filteredSongs = getSortedSongs().filter(song => {
    const matchesSearch = song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         song.titleEnglish.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         song.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesAlbum = selectedAlbum === 'all' || song.album === selectedAlbum;
    
    return matchesSearch && matchesAlbum;
  });

  const albums = ['Fine Art', '3CAG', 'Single'];
  const totalSongs = songs.length;
  const fineArtSongs = songs.filter(s => s.album === 'Fine Art').length;
  const cagSongs = songs.filter(s => s.album === '3CAG').length;
  const singleSongs = songs.filter(s => s.album === 'Single').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-orange-50 dark:from-gray-900 dark:to-gray-800">
      {/* Navigation */}
      <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2 text-gray-600 hover:text-green-600 transition-colors">
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Home</span>
            </Link>
            <div className="flex items-center space-x-2">
              <Music className="h-8 w-8 text-green-600" />
              <span className="text-2xl font-bold text-gray-900 dark:text-white">KNEECAP</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            KNEECAP Songs & Lyrics
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
            Complete collection of KNEECAP's bilingual rap catalog
          </p>
          
          {/* Stats */}
          <div className="flex justify-center items-center space-x-8 text-gray-600 dark:text-gray-400">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{totalSongs}</div>
              <div className="text-sm">Total Songs</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{fineArtSongs}</div>
              <div className="text-sm">Fine Art (2024)</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{cagSongs}</div>
              <div className="text-sm">3CAG (2018)</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{singleSongs}</div>
              <div className="text-sm">Singles</div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          <div className="grid md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search songs, lyrics, or descriptions..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Sort By */}
            <div className="relative">
              <SortAsc className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <select
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors appearance-none"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="album">By Album</option>
                <option value="alphabetical">Alphabetical (A-Z)</option>
                <option value="year-newest">Year (Newest First)</option>
                <option value="year-oldest">Year (Oldest First)</option>
              </select>
            </div>

            {/* Album Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <select
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors appearance-none"
                value={selectedAlbum}
                onChange={(e) => setSelectedAlbum(e.target.value)}
              >
                <option value="all">All Releases</option>
                {albums.map(album => (
                  <option key={album} value={album}>{album}</option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Results count and current sort */}
          <div className="mt-4 flex justify-between text-sm text-gray-600 dark:text-gray-400">
            <span>Showing {filteredSongs.length} of {totalSongs} songs</span>
            <span>
              Sorted by: {
                sortBy === 'album' ? 'Album' :
                sortBy === 'alphabetical' ? 'Alphabetical' :
                sortBy === 'year-newest' ? 'Year (Newest First)' :
                'Year (Oldest First)'
              }
            </span>
          </div>
        </div>

        {/* Songs Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSongs.map((song) => (
            <Link
              key={song.id}
              href={`/songs/${song.id}`}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden group"
            >
              <div className="p-6">
                {/* Album Badge */}
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    song.album === 'Fine Art' 
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300'
                      : song.album === '3CAG'
                      ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300'
                      : 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300'
                  }`}>
                    {song.album} • {song.year}
                  </span>
                </div>

                {/* Song Title */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-green-600 transition-colors">
                  {song.title}
                </h3>
                
                {/* English Translation if different */}
                {song.title !== song.titleEnglish && (
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 italic">
                    "{song.titleEnglish}"
                  </p>
                )}

                {/* Duration */}
                {song.duration && (
                  <div className="text-sm text-gray-500 dark:text-gray-500 mb-3">
                    Duration: {song.duration}
                  </div>
                )}

                {/* Description */}
                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-4">
                  {song.description}
                </p>

                {/* Features */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <span className="text-green-600 dark:text-green-400">
                      {song.hasTranslation ? '✓ Translations' : '○ Lyrics only'}
                    </span>
                  </div>
                  <div className="text-green-600 group-hover:text-green-700 font-medium">
                    View Lyrics →
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* No results message */}
        {filteredSongs.length === 0 && (
          <div className="text-center py-12">
            <Music className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No songs found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your search terms or filters
            </p>
          </div>
        )}

        {/* Album Information */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {/* Fine Art */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
            <h3 className="text-xl font-bold text-blue-800 dark:text-blue-200 mb-3">
              Fine Art (2024)
            </h3>
            <p className="text-blue-700 dark:text-blue-300 text-sm mb-4">
              KNEECAP's critically acclaimed debut album, produced by Toddla T. Features collaborations 
              with Grian Chatten (Fontaines D.C.), Jelani Blackman, and others.
            </p>
            <div className="text-blue-600 dark:text-blue-400 text-sm">
              {fineArtSongs} tracks • 37:46 runtime
            </div>
          </div>

          {/* 3CAG */}
          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6 border border-purple-200 dark:border-purple-800">
            <h3 className="text-xl font-bold text-purple-800 dark:text-purple-200 mb-3">
              3CAG (2018)
            </h3>
            <p className="text-purple-700 dark:text-purple-300 text-sm mb-4">
              The debut mixtape that introduced KNEECAP to the world. "3 Consonants and a Vowel" 
              established their unique bilingual style.
            </p>
            <div className="text-purple-600 dark:text-purple-400 text-sm">
              {cagSongs} tracks • 30:39 runtime
            </div>
          </div>

          {/* Singles */}
          <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-6 border border-orange-200 dark:border-orange-800">
            <h3 className="text-xl font-bold text-orange-800 dark:text-orange-200 mb-3">
              Singles & EPs
            </h3>
            <p className="text-orange-700 dark:text-orange-300 text-sm mb-4">
              Standalone releases spanning 2017-2025, including breakthrough hits and collaborations 
              that built KNEECAP's reputation.
            </p>
            <div className="text-orange-600 dark:text-orange-400 text-sm">
              {singleSongs} releases • Various years
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 