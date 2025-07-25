// src/data/songs.ts
// Static data connector that imports all JSON files

export interface LyricsLine {
    irish?: string;
    english?: string;
    language?: 'irish' | 'english' | 'mixed';
    type?: 'section' | 'lyric';
    section?: string;
    artist?: string;
  }
  
  export interface Song {
    id: string;
    title: string;
    titleEnglish: string;
    album: string;
    year: number | string;
    duration?: string;
    primaryLanguage: string;
    hasTranslation?: boolean;
    description?: string;
    lines: LyricsLine[];
  }
  
  // Import all JSON files
  import amachAnocht from './songs/albums/3cag/amach-anocht.json';
  import cearta from './songs/albums/3cag/cearta.json';
  import incognito from './songs/albums/3cag/incognito.json';
  import bouncers from './songs/albums/3cag/bouncers.json';
  import ceachtMoChara from './songs/albums/3cag/ceacht-mo-chara.json';
  import taNaBaggiesArAnTalamh from './songs/albums/3cag/ta-na-baggies-ar-an-talamh.json';
  import yourAllLegitimateTargets from './songs/albums/3cag/your-all-legitimate-targets.json';
  import yourSnifferDogsAreShite from './songs/albums/3cag/your-sniffer-dogs-are-shite.json';
  
  import threeCagFeatRadiePeat from './songs/albums/fine-art/3cag-feat-radie-peat.json';
  import betterWayToLive from './songs/albums/fine-art/better-way-to-live.json';
  import drugDealinPagans from './songs/albums/fine-art/drug-dealin-pagans.json';
  import fineArt from './songs/albums/fine-art/fine-art.json';
  import harrowRoad from './songs/albums/fine-art/harrow-road.json';
  import iBhfiachLinne from './songs/albums/fine-art/i-bhfiacha-linne.json';
  import imFlush from './songs/albums/fine-art/im-flush.json';
  import loveMaking from './songs/albums/fine-art/love-making.json';
  import parful from './songs/albums/fine-art/parful.json';
  import rhinoKet from './songs/albums/fine-art/rhino-ket.json';
  import sickInTheHead from './songs/albums/fine-art/sick-in-the-head.json';
  import wayTooMuch from './songs/albums/fine-art/way-too-much.json';
  
  import fenianCunts from './songs/singles/fenian-cunts.json';
  import gaelGigolos from './songs/singles/gael-gigolos.json';
  import getYourBritsOut from './songs/singles/get-your-brits-out.json';
  import guiltyConscience from './songs/singles/guilty-conscience.json';
  import hood from './songs/singles/hood.json';
  import itsBeenAges from './songs/singles/its-been-ages.json';
  import mam from './songs/singles/mam.json';
  import thartAgusAgart from './songs/singles/thart-agus-thart.json';
  import theRecap from './songs/singles/the-recap.json';
  
  // Create songs array with all imported data
  const songsData: Song[] = [
    // 3CAG Album
    amachAnocht as Song,
    cearta as Song,
    incognito as Song,
    bouncers as Song,
    ceachtMoChara as Song,
    taNaBaggiesArAnTalamh as Song,
    yourAllLegitimateTargets as Song,
    yourSnifferDogsAreShite as Song,
    
    // Fine Art Album  
    threeCagFeatRadiePeat as Song,
    betterWayToLive as Song,
    drugDealinPagans as Song,
    fineArt as Song,
    harrowRoad as Song,
    iBhfiachLinne as Song,
    imFlush as Song,
    loveMaking as Song,
    parful as Song,
    rhinoKet as Song,
    sickInTheHead as Song,
    wayTooMuch as Song,
    
    // Singles
    fenianCunts as Song,
    gaelGigolos as Song,
    getYourBritsOut as Song,
    guiltyConscience as Song,
    hood as Song,
    itsBeenAges as Song,
    mam as Song,
    thartAgusAgart as Song,
    theRecap as Song,
  ];
      
  // Helper functions
  export function getAllSongs(): Song[] {
    return songsData;
  }
  
  export function getSong(id: string): Song | null {
    return songsData.find(song => song.id === id) || null;
    }
  
  export function getSongsByAlbum(album: string): Song[] {
    return songsData.filter(song => song.album === album);
  }
  
  export function getSongsByLanguage(language: string): Song[] {
    return songsData.filter(song => song.primaryLanguage === language);
  }
  
  export function searchSongs(query: string): Song[] {
    const lowercaseQuery = query.toLowerCase();
    return songsData.filter(song => 
      song.title.toLowerCase().includes(lowercaseQuery) ||
      song.titleEnglish.toLowerCase().includes(lowercaseQuery) ||
      song.album.toLowerCase().includes(lowercaseQuery) ||
      (song.description && song.description.toLowerCase().includes(lowercaseQuery))
    );
  }
  
  /**
   * Check if song has full lyrics (not just preview)
   */
  export function hasFullLyrics(): boolean {
    // All songs now have full lyrics available
    return true;
  }
  
  /**
   * Get basic info about all songs without loading full data
   * This is useful for the songs listing page
   */
  export const songsMetadata = [
    // Fine Art (2024)
    { id: '3cag-feat-radie-peat', title: '3CAG', titleEnglish: '3CAG (feat. Radie Peat)', album: 'Fine Art', year: 2024, duration: '3:08', language: 'Irish', primaryLanguage: 'irish', hasTranslation: true, description: 'Opening track from Fine Art featuring Radie Peat, setting the tone for the album.' },
    { id: 'fine-art', title: 'Fine Art', titleEnglish: 'Fine Art', album: 'Fine Art', year: 2024, duration: '2:19', language: 'Bilingual', primaryLanguage: 'mixed', hasTranslation: true, description: 'Title track exploring artistic expression as resistance and identity in both languages.' },
    { id: 'i-bhfiacha-linne', title: 'I bhFiacha Linne', titleEnglish: 'In Our Debt', album: 'Fine Art', year: 2024, duration: '3:07', language: 'Irish', primaryLanguage: 'irish', hasTranslation: true, description: 'Aggressive track about debts and money owed, showcasing KNEECAP\'s harder edge.' },
    { id: 'im-flush', title: 'I\'m Flush', titleEnglish: 'I\'m Flush', album: 'Fine Art', year: 2024, duration: '2:56', language: 'English', primaryLanguage: 'english', hasTranslation: true, description: 'Money-focused track showing KNEECAP\'s success and financial confidence.' },
    { id: 'better-way-to-live', title: 'Better Way to Live', titleEnglish: 'Better Way to Live (feat. Grian Chatten)', album: 'Fine Art', year: 2024, duration: '2:56', language: 'Bilingual', primaryLanguage: 'mixed', hasTranslation: true, description: 'Collaboration with Fontaines D.C.\'s Grian Chatten exploring themes of addiction and hope.' },
    { id: 'sick-in-the-head', title: 'Sick in the Head', titleEnglish: 'Sick in the Head', album: 'Fine Art', year: 2024, duration: '2:32', language: 'English', primaryLanguage: 'english', hasTranslation: true, description: 'Raw exploration of mental health struggles and societal pressure.' },
    { id: 'love-making', title: 'Love Making', titleEnglish: 'Love Making (feat. Nino)', album: 'Fine Art', year: 2024, duration: '2:27', language: 'English', primaryLanguage: 'english', hasTranslation: true, description: 'Sensual track featuring Nino, showing KNEECAP\'s more intimate side.' },
    { id: 'drug-dealin-pagans', title: 'Drug Dealin Pagans', titleEnglish: 'Drug Dealin Pagans', album: 'Fine Art', year: 2024, duration: '2:33', language: 'Irish', primaryLanguage: 'irish', hasTranslation: true, description: 'Provocative track blending spiritual and street themes in Irish.' },
    { id: 'harrow-road', title: 'Harrow Road', titleEnglish: 'Harrow Road (feat. Jelani Blackman)', album: 'Fine Art', year: 2024, duration: '3:45', language: 'English', primaryLanguage: 'english', hasTranslation: true, description: 'London-set collaboration with Jelani Blackman about urban navigation and displacement.' },
    { id: 'parful', title: 'Parful', titleEnglish: 'Parful', album: 'Fine Art', year: 2024, duration: '3:19', language: 'Bilingual', primaryLanguage: 'mixed', hasTranslation: true, description: 'House-influenced banger about cross-community raving and unity through music.' },
    { id: 'rhino-ket', title: 'Rhino Ket', titleEnglish: 'Rhino Ket', album: 'Fine Art', year: 2024, duration: '3:07', language: 'Bilingual', primaryLanguage: 'mixed', hasTranslation: true, description: 'Techno/dancehall hybrid showcasing KNEECAP\'s experimental electronic side.' },
    { id: 'way-too-much', title: 'Way Too Much', titleEnglish: 'Way Too Much', album: 'Fine Art', year: 2024, duration: '3:17', language: 'English', primaryLanguage: 'english', hasTranslation: true, description: 'Introspective closing track about excess and finding balance.' },
  
    // 3CAG (2018)
    { id: 'your-all-legitimate-targets', title: 'Your All Legitimate Targets', titleEnglish: 'Your All Legitimate Targets', album: '3CAG', year: 2018, duration: '1:23', language: 'English', primaryLanguage: 'english', hasTranslation: true, description: 'Provocative opening statement from KNEECAP\'s debut mixtape.' },
    { id: 'amach-anocht', title: 'Amach Anocht', titleEnglish: 'Out Tonight', album: '3CAG', year: 2018, duration: '4:06', language: 'Irish', primaryLanguage: 'irish', hasTranslation: true, description: 'Irish party anthem about going out and living life to the fullest.' },
    { id: 'ta-na-baggies-ar-an-talamh', title: 'Tá na Baggies ar an Talamh', titleEnglish: 'The Baggies Are on the Ground', album: '3CAG', year: 2018, duration: '3:51', language: 'Irish', primaryLanguage: 'irish', hasTranslation: true, description: 'Street narrative about drug culture, featuring MC Muipéad.' },
    { id: 'cearta', title: 'C.E.A.R.T.A', titleEnglish: 'R.I.G.H.T.S', album: '3CAG', year: 2018, duration: '3:43', language: 'Irish', primaryLanguage: 'irish', hasTranslation: true, description: 'KNEECAP\'s breakthrough song about a police encounter while carrying illegal substances.' },
    { id: 'incognito', title: 'Incognito', titleEnglish: 'Incognito', album: '3CAG', year: 2018, duration: '3:29', language: 'Bilingual', primaryLanguage: 'mixed', hasTranslation: true, description: 'Stealth-mode track about staying under the radar.' },
    { id: 'ceacht-mo-chara', title: 'Ceacht Mo Chara', titleEnglish: 'My Friend\'s Lesson', album: '3CAG', year: 2018, duration: '4:23', language: 'Irish', primaryLanguage: 'irish', hasTranslation: true, description: 'Storytelling track about learning from friends\' experiences.' },
    { id: 'your-sniffer-dogs-are-shite', title: 'Your Sniffer Dogs Are Shite', titleEnglish: 'Your Sniffer Dogs Are Shite', album: '3CAG', year: 2018, duration: '5:28', language: 'English', primaryLanguage: 'english', hasTranslation: true, description: 'Anti-police anthem criticizing law enforcement methods.' },
    { id: 'bouncers', title: 'Bouncers', titleEnglish: 'Bouncers', album: '3CAG', year: 2018, duration: '4:16', language: 'English', primaryLanguage: 'english', hasTranslation: true, description: 'Club culture commentary about door security and nightlife politics.' },
  
    // Singles & Other Releases
    { id: 'the-recap', title: 'THE RECAP', titleEnglish: 'THE RECAP (ft. Mozey)', album: 'Single', year: 2025, duration: '3:30', language: 'English', primaryLanguage: 'english', hasTranslation: true, description: 'Latest single featuring Mozey, summarizing KNEECAP\'s journey so far.' },
    { id: 'its-been-ages', title: 'ITS BEEN AGES', titleEnglish: 'ITS BEEN AGES', album: 'Single', year: 2023, duration: '2:45', language: 'English', primaryLanguage: 'english', hasTranslation: true, description: 'Return single after a gap between releases, acknowledging the wait.' },
    { id: 'hood', title: 'H.O.O.D', titleEnglish: 'H.O.O.D', album: 'Single', year: 2021, duration: '3:30', language: 'English', primaryLanguage: 'english', hasTranslation: true, description: 'Neighborhood pride anthem representing West Belfast.' },
    { id: 'guilty-conscience', title: 'Guilty Conscience', titleEnglish: 'Guilty Conscience', album: 'Single', year: 2021, duration: '3:45', language: 'English', primaryLanguage: 'english', hasTranslation: true, description: 'Introspective track examining moral conflicts and personal accountability.' },
    { id: 'thart-agus-thart', title: 'Thart agus Thart', titleEnglish: 'Around and Around', album: 'Single', year: 2021, duration: '3:20', language: 'Irish', primaryLanguage: 'irish', hasTranslation: true, description: 'Circular narrative about life\'s repetitive cycles in Irish.' },
    { id: 'get-your-brits-out', title: 'Get Your Brits Out', titleEnglish: 'Get Your Brits Out', album: 'Single', year: 2019, duration: '3:20', language: 'English', primaryLanguage: 'english', hasTranslation: true, description: 'Political anthem calling for British withdrawal from Ireland.' },
    { id: 'fenian-cunts', title: 'Fenian Cunts', titleEnglish: 'Fenian Cunts', album: 'Single', year: 2019, duration: '3:15', language: 'Bilingual', primaryLanguage: 'mixed', hasTranslation: true, description: 'Provocative track reclaiming sectarian language and turning it into empowerment.' },
    { id: 'gael-gigolos', title: 'Gael-Gigolos', titleEnglish: 'Gael-Gigolos', album: 'Single', year: 2019, duration: '3:10', language: 'Bilingual', primaryLanguage: 'mixed', hasTranslation: true, description: 'Playful track about Irish speakers as modern-day gigolos.' },
    { id: 'mam', title: 'Mam', titleEnglish: 'Mam', album: 'Single', year: 2020, duration: '3:18', language: 'Bilingual', primaryLanguage: 'mixed', hasTranslation: true, description: 'Emotional tribute to mothers, written with love and respect.' },
  ];
  
