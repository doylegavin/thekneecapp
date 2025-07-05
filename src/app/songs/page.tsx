'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Music, Search, Filter, ArrowLeft, SortAsc } from 'lucide-react';
import { getAllSongs, getSongsByAlbum, searchSongs } from '../../data/songs';

export default function SongsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAlbum, setSelectedAlbum] = useState('all');
  const [sortBy, setSortBy] = useState('album'); // 'album', 'alphabetical', 'year-newest', 'year-oldest'

  const allSongs = getAllSongs();

  // Helper function to normalize year values
  const getYearAsNumber = (year: string | number): number => {
    return typeof year === 'string' ? parseInt(year) || 0 : year;
  };

  // Sort the songs based on the selected option
  const getSortedSongs = () => {
    const sorted = [...allSongs];
    
    switch (sortBy) {
      case 'alphabetical':
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'year-newest':
        sorted.sort((a, b) => getYearAsNumber(b.year) - getYearAsNumber(a.year));
        break;
      case 'year-oldest':
        sorted.sort((a, b) => getYearAsNumber(a.year) - getYearAsNumber(b.year));
        break;
      case 'album':
      default:
        // Default grouping by album (Fine Art first, then 3CAG, then Singles)
        const albumOrder = { 'Fine Art': 1, '3CAG': 2, 'Single': 3 };
        sorted.sort((a, b) => {
          const albumCompare = (albumOrder[a.album as keyof typeof albumOrder] || 4) - (albumOrder[b.album as keyof typeof albumOrder] || 4);
          if (albumCompare !== 0) return albumCompare;
          return getYearAsNumber(a.year) - getYearAsNumber(b.year);
        });
        break;
    }
    
    return sorted;
  };

  const filteredSongs = getSortedSongs().filter(song => {
    const matchesSearch = searchTerm === '' || searchSongs(searchTerm).some(s => s.id === song.id);
    const matchesAlbum = selectedAlbum === 'all' || song.album === selectedAlbum;
    return matchesSearch && matchesAlbum;
  });

  const albums = ['Fine Art', '3CAG', 'Single'];
  const totalSongs = allSongs.length;
  const fineArtSongs = getSongsByAlbum('Fine Art').length;
  const cagSongs = getSongsByAlbum('3CAG').length;
  const singleSongs = getSongsByAlbum('Single').length;

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
                {song.description && (
                  <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-4">
                    {song.description}
                  </p>
                )}

                {/* Features */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <span className="text-green-600 dark:text-green-400">
                      {song.lines && song.lines.length > 0 ? '✓ Lyrics Available' : '○ Coming Soon'}
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
              {fineArtSongs} tracks
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
              {cagSongs} tracks
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
              {singleSongs} releases
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}