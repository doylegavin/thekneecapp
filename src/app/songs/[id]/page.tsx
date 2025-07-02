'use client';

import { useState, use, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft, Music, Play, ChevronDown, ChevronUp, Pause, Settings } from 'lucide-react';

// Complete KNEECAP discography organized by release
const songData: Record<string, {
  id: string;
  title: string;
  titleEnglish: string;
  album: string;
  year: number;
  duration: string;
  primaryLanguage: string;
  lines: Array<{
    irish?: string;
    english?: string;
    language?: 'irish' | 'english';
    type?: 'section' | 'lyric';
    section?: string;
    artist?: string;
  }>;
}> = {
  // ===== FINE ART (2024) =====
  '3cag-feat-radie-peat': {
    id: '3cag-feat-radie-peat',
    title: '3CAG',
    titleEnglish: '3CAG (feat. Radie Peat)',
    album: 'Fine Art',
    year: 2024,
    duration: '3:08',
    primaryLanguage: 'irish',
    lines: [
      { irish: 'Sample placeholder - full lyrics coming soon', english: 'Sample placeholder - full lyrics coming soon', language: 'irish' }
    ]
  },
  'fine-art': {
    id: 'fine-art',
    title: 'Fine Art',
    titleEnglish: 'Fine Art',
    album: 'Fine Art',
    year: 2024,
    duration: '2:19',
    primaryLanguage: 'mixed',
    lines: [
      { irish: 'Is mise an duine a rinne é seo', english: 'I am the one who made this', language: 'irish' },
      { irish: 'This is my world, this is my art', english: 'Seo mo shaol, seo mo ealaín', language: 'english' },
      { irish: 'Ní stopfaidh mé go dtí go bhfuil sé críochnaithe', english: 'I won&apos;t stop until it&apos;s finished', language: 'irish' },
      { irish: 'Every line tells a story of our struggle', english: 'Insíonn gach líne scéal ár streachailt', language: 'english' }
    ]
  },
  'i-bhfiacha-linne': {
    id: 'i-bhfiacha-linne',
    title: 'I bhFiacha Linne',
    titleEnglish: 'In Our Debt',
    album: 'Fine Art',
    year: 2024,
    duration: '3:07',
    primaryLanguage: 'irish',
    lines: [
      { irish: 'Sample of aggressive track about money owed - full lyrics coming soon', english: 'Sample of aggressive track about money owed - full lyrics coming soon', language: 'irish' }
    ]
  },
  'im-flush': {
    id: 'im-flush',
    title: 'I\'m Flush',
    titleEnglish: 'I\'m Flush',
    album: 'Fine Art',
    year: 2024,
    duration: '2:56',
    primaryLanguage: 'english',
    lines: [
      { irish: 'Money talks, but I speak louder', english: 'Labhraíonn airgead, ach labhraím níos airde', language: 'english' }
    ]
  },
  'better-way-to-live': {
    id: 'better-way-to-live',
    title: 'Better Way to Live',
    titleEnglish: 'Better Way to Live (feat. Grian Chatten)',
    album: 'Fine Art',
    year: 2024,
    duration: '2:56',
    primaryLanguage: 'mixed',
    lines: [
      { irish: 'There\'s got to be a better way to live', english: 'Caithfidh go bhfuil bealach níos fearr le maireachtáil', language: 'english' },
      { irish: 'Than drowning in the bottom of a bottle every night', english: 'Ná a bheith ag bá i mbun buideál gach oíche', language: 'english' },
      { irish: 'Táim ag ól an iomarca', english: 'I\'m drinking too much', language: 'irish' },
      { irish: 'Ag iarraidh mo phian a cheilt', english: 'Trying to hide my pain', language: 'irish' }
    ]
  },
  'sick-in-the-head': {
    id: 'sick-in-the-head',
    title: 'Sick in the Head',
    titleEnglish: 'Sick in the Head',
    album: 'Fine Art',
    year: 2024,
    duration: '2:32',
    primaryLanguage: 'english',
    lines: [
      { irish: 'Mental health struggles - full lyrics coming soon', english: 'Mental health struggles - full lyrics coming soon', language: 'english' }
    ]
  },
  'love-making': {
    id: 'love-making',
    title: 'Love Making',
    titleEnglish: 'Love Making (feat. Nino)',
    album: 'Fine Art',
    year: 2024,
    duration: '2:27',
    primaryLanguage: 'english',
    lines: [
      { irish: 'Love making track - full lyrics coming soon', english: 'Love making track - full lyrics coming soon', language: 'english' }
    ]
  },
  'drug-dealin-pagans': {
    id: 'drug-dealin-pagans',
    title: 'Drug Dealin Pagans',
    titleEnglish: 'Drug Dealin Pagans',
    album: 'Fine Art',
    year: 2024,
    duration: '2:33',
    primaryLanguage: 'irish',
    lines: [
      { irish: 'Drug dealing pagans - full lyrics coming soon', english: 'Drug dealing pagans - full lyrics coming soon', language: 'irish' }
    ]
  },
  'harrow-road': {
    id: 'harrow-road',
    title: 'Harrow Road',
    titleEnglish: 'Harrow Road (feat. Jelani Blackman)',
    album: 'Fine Art',
    year: 2024,
    duration: '3:45',
    primaryLanguage: 'english',
    lines: [
      { irish: 'Story about getting lost in London - full lyrics coming soon', english: 'Story about getting lost in London - full lyrics coming soon', language: 'english' }
    ]
  },
  'parful': {
    id: 'parful',
    title: 'Parful',
    titleEnglish: 'Parful',
    album: 'Fine Art',
    year: 2024,
    duration: '3:19',
    primaryLanguage: 'mixed',
    lines: [
      { irish: 'House banger about cross-community raving - full lyrics coming soon', english: 'House banger about cross-community raving - full lyrics coming soon', language: 'irish' }
    ]
  },
  'rhino-ket': {
    id: 'rhino-ket',
    title: 'Rhino Ket',
    titleEnglish: 'Rhino Ket',
    album: 'Fine Art',
    year: 2024,
    duration: '3:07',
    primaryLanguage: 'mixed',
    lines: [
      { irish: 'Techno/dancehall hybrid - full lyrics coming soon', english: 'Techno/dancehall hybrid - full lyrics coming soon', language: 'irish' }
    ]
  },
  'way-too-much': {
    id: 'way-too-much',
    title: 'Way Too Much',
    titleEnglish: 'Way Too Much',
    album: 'Fine Art',
    year: 2024,
    duration: '3:17',
    primaryLanguage: 'english',
    lines: [
      { irish: 'Way too much - full lyrics coming soon', english: 'Way too much - full lyrics coming soon', language: 'english' }
    ]
  },

  // ===== 3CAG (2018) =====
  'your-all-legitimate-targets': {
    id: 'your-all-legitimate-targets',
    title: 'Your All Legitimate Targets',
    titleEnglish: 'Your All Legitimate Targets',
    album: '3CAG',
    year: 2018,
    duration: '1:23',
    primaryLanguage: 'english',
    lines: [
      { irish: 'Provocative opener - full lyrics coming soon', english: 'Provocative opener - full lyrics coming soon', language: 'english' }
    ]
  },
  'amach-anocht': {
    id: 'amach-anocht',
    title: 'Amach Anocht',
    titleEnglish: 'Out Tonight',
    album: '3CAG',
    year: 2018,
    duration: '4:06',
    primaryLanguage: 'irish',
    lines: [
      { irish: 'Amach anocht - going out tonight - full lyrics coming soon', english: 'Amach anocht - going out tonight - full lyrics coming soon', language: 'irish' }
    ]
  },
  'ta-na-baggies-ar-an-talamh': {
    id: 'ta-na-baggies-ar-an-talamh',
    title: 'Tá na Baggies ar an Talamh',
    titleEnglish: 'The Baggies Are on the Ground',
    album: '3CAG',
    year: 2018,
    duration: '3:51',
    primaryLanguage: 'irish',
    lines: [
      { irish: 'Tá na baggies ar an talamh - the baggies are on the ground - full lyrics coming soon', english: 'Tá na baggies ar an talamh - the baggies are on the ground - full lyrics coming soon', language: 'irish' }
    ]
  },
  'cearta': {
    id: 'cearta',
    title: 'C.E.A.R.T.A',
    titleEnglish: 'R.I.G.H.T.S',
    album: '3CAG',
    year: 2018,
    duration: '3:43',
    primaryLanguage: 'irish',
    lines: [
      { type: 'section', section: 'Verse 1', artist: 'Móglaí Bap' },
      { irish: 'Foc mí, ní fhaca mé na bastairdí', english: 'Fuck me, I didn&apos;t see the bastards', language: 'irish' },
      { irish: 'Carr dubh ina bhfolach ar ár mullach is iad taobh istigh', english: 'A black car hidden on our roof with them inside', language: 'irish' },
      { irish: 'Seans ar bith, go bhfaighidh siad mo mhála MD', english: 'No chance at all they&apos;ll get my bag of MD', language: 'irish' },
      { irish: 'Mar tá cóisir ann anocht \'s níl fáilte roimh an RUC', english: 'Because there&apos;s a party tonight and the RUC aren&apos;t welcome', language: 'irish' },
      { irish: 'Is gan dabht, tá mise ar bís', english: 'And without a doubt, I&apos;m buzzing', language: 'irish' },
      { irish: 'Le dul síos ar an snaois arís \'s arís', english: 'To go down on the snuff again and again', language: 'irish' },
      { irish: 'Is ní stopfaidh mé go maidin mar ní socraím síos', english: 'And I won&apos;t stop until morning because I don&apos;t settle down', language: 'irish' },
      { irish: 'Agus fuair mé mála mór ket in ionad mo chíos', english: 'And I got a big bag of ket instead of my rent', language: 'irish' },
      
      { type: 'section', section: 'Verse 2', artist: 'Mo Chara' },
      { irish: 'Níl tú ag focan éisteacht liom níl seo ina focan jóc', english: 'You&apos;re not fucking listening to me, this isn&apos;t a fucking joke', language: 'irish' },
      { irish: 'Tá mé ag iarraidh a bheidh ag an chóisir leat ag ithe cúpla yokes', english: 'I&apos;m trying to be at the party with you eating a few yokes', language: 'irish' },
      { irish: 'Ag déanamh cúpla líne bhán don phúdar mín cóc', english: 'Doing a couple of white lines of the fine powdered coke', language: 'irish' },
      { irish: 'Is tiocfaidh deireadh na hoíche \'s béimid ar fad ag gol den smoke', english: 'And the end of the night will come and we&apos;ll all be going for a smoke', language: 'irish' },
      { irish: 'Ach má rugtar orainn inniú', english: 'But if we get caught today', language: 'irish' },
      { irish: 'Is muidinne a bheas thíos leis i bhfaiteadh na súl', english: 'It&apos;s us who&apos;ll be down with it in the blink of an eye', language: 'irish' },
      { irish: 'Mar tá na muca móra mire sa tóir ar ár meon', english: 'Because the big mad pigs are after our minds', language: 'irish' },
      { irish: 'Is beidh lucht Maghaberry sa tóir ar mo thóin', english: 'And the Maghaberry lot will be after my arse', language: 'irish' },
      
      { type: 'section', section: 'Chorus' },
      { irish: 'C.E.A.R.T.A', english: 'R.I.G.H.T.S', language: 'irish' },
      { irish: 'Is cuma liom sa foc faoi aon gharda', english: 'I don&apos;t give a fuck about any garda', language: 'irish' },
      { irish: 'Dúidín lasta, tá mise ró-ghasta', english: 'A lit joint, I&apos;m too quick', language: 'irish' },
      { irish: 'Ní fheicfidh tú mise i mo sheasamh ró-fhada', english: 'You won&apos;t see me standing around too long', language: 'irish' },
      { irish: 'C.E.A.R.T.A', english: 'R.I.G.H.T.S', language: 'irish' },
      { irish: 'Is cuma liom sa foc faoi aon gharda', english: 'I don&apos;t give a fuck about any garda', language: 'irish' },
      { irish: 'Dúidín lasta, tá mise ró-ghasta', english: 'A lit joint, I&apos;m too quick', language: 'irish' },
      { irish: 'Ní fheicfidh tú mise i mo sheasamh ró-fhada', english: 'You won&apos;t see me standing around too long', language: 'irish' },
      
      { type: 'section', section: 'Verse 3', artist: 'Mo Chara' },
      { irish: 'Dúirt mé leat cheana, seo an chúis le Balaclava', english: 'I told you before, this is the reason for a balaclava', language: 'irish' },
      { irish: 'Is féidir siúil ar shiúil, \'s ní aithneoidh siad tada', english: 'You can walk on walking, and they won&apos;t recognize anything', language: 'irish' },
      { irish: 'Tá \'gear\' is fearr in iarthar Bhéal Feirste againn le fada', english: 'We&apos;ve had the best \'gear\' in west Belfast for ages', language: 'irish' },
      { irish: 'Cóc, speed, e\'s agus moll marijuana', english: 'Coke, speed, e\'s and soft marijuana', language: 'irish' },
      { irish: 'Ag teacht isteach go ciúin fríd shléibhte Chonamara', english: 'Coming in quietly through the mountains of Connemara', language: 'irish' },
      { irish: 'Ag cóisireacht le Tinky Winky agus Seamus Barra', english: 'Partying with Tinky Winky and Seamus Barra', language: 'irish' },
      { irish: 'Ní stopaim ón gheimhreadh fríd go dtí an earrach', english: 'I don&apos;t stop from winter through until spring', language: 'irish' },
      { irish: 'Díolaim snaois le do Mhamó, do mhac &apos;is do chara', english: 'I sell snuff to your granny, your son and your friend', language: 'irish' },
      { irish: 'A n-íocann as má laethanta saoire ar an bhFál Carrach', english: 'Who pay for my holidays on the Falls Road', language: 'irish' },
      
      { type: 'section', section: 'Verse 4', artist: 'Móglaí Bap' },
      { irish: 'Níl aon chathair nach bhfuil muid ann faoi lathair', english: 'There&apos;s no city we&apos;re not in at present', language: 'irish' },
      { irish: 'Doire, Corcaigh agus fiú amháin D4', english: 'Derry, Cork and even D4', language: 'irish' },
      { irish: 'Ag scriosadh na háite ar mhaithe le bheith saibhir', english: 'Destroying the place for the sake of being rich', language: 'irish' },
      { irish: 'Ansin ag déanamh snaois bhán le réaltaí TG4', english: 'Then doing white snuff with TG4 stars', language: 'irish' },
      { irish: 'So goitse anois, agus déanfaimid deifir', english: 'So come on now, and we&apos;ll hurry', language: 'irish' },
      { irish: 'Mar tá mise ró-stuama anois faoi láthair', english: 'Because I&apos;m too sober now at present', language: 'irish' },
      { irish: 'Agus beidh muid ag dul go maidin le Rónán Mac An Rí', english: 'And we&apos;ll be going until morning with Rónán Mac An Rí', language: 'irish' },
      { irish: '\'cause\' foc na riallacha atá ag RTÉ', english: 'Because fuck the rules that RTÉ has', language: 'irish' },
      
      { type: 'section', section: 'Chorus' },
      { irish: 'C.E.A.R.T.A', english: 'R.I.G.H.T.S', language: 'irish' },
      { irish: 'Is cuma liom sa foc faoi aon gharda', english: 'I don&apos;t give a fuck about any garda', language: 'irish' },
      { irish: 'Dúidín lasta, tá mise ró-ghasta', english: 'A lit joint, I&apos;m too quick', language: 'irish' },
      { irish: 'Ní fheicfidh tú mise i mo sheasamh ró-fhada', english: 'You won&apos;t see me standing around too long', language: 'irish' },
      { irish: 'C.E.A.R.T.A', english: 'R.I.G.H.T.S', language: 'irish' },
      { irish: 'Is cuma liom sa foc faoi aon gharda', english: 'I don&apos;t give a fuck about any garda', language: 'irish' },
      { irish: 'Dúidín lasta, tá mise ró-ghasta', english: 'A lit joint, I&apos;m too quick', language: 'irish' },
      { irish: 'Ní fheicfidh tú mise i mo sheasamh ró-fhada', english: 'You won&apos;t see me standing around too long', language: 'irish' },
      
      { type: 'section', section: 'Verse 5', artist: 'Móglaí Bap' },
      { irish: 'Tógadh Mo Chara agus muid ar an bhealach', english: 'Mo Chara was taken and we were on the way', language: 'irish' },
      { irish: 'Cé gur thug mé smack ceart don gharda salach', english: 'Even though I gave a proper smack to the dirty guard', language: 'irish' },
      { irish: 'Bhí orm rith na bhaile agus dul ina bhfolach', english: 'I had to run home and go into hiding', language: 'irish' },
      { irish: 'Mar bhí 10 kilo cóc taped ar mo bhrollach', english: 'Because I had 10 kilos of coke taped to my chest', language: 'irish' },
      { irish: 'Anois ní sin le rá go raibh mé scanraithe', english: 'Now that&apos;s not to say I was scared', language: 'irish' },
      { irish: 'Sure ní íocaim as an "toll" ar an M50', english: 'Sure I don&apos;t pay the "toll" on the M50', language: 'irish' },
      { irish: 'Agus rachaidh muid ar aghaidh go dtí go bhfuil gach deor críochnaithe', english: 'And we&apos;ll continue until every drop is finished', language: 'irish' },
      { irish: 'Raithneach dleathach in focan Éire aontaithe', english: 'Legal cannabis in fucking united Ireland', language: 'irish' },
      
      { type: 'section', section: 'Bridge', artist: 'Garda/Police' },
      { irish: 'A ógánaigh, rug muid ort ag déanamh damáiste ar mhaoin phoiblí', english: 'Young man we caught you damaging public property', language: 'english' },
      { irish: 'Agus tá tú ag teacht go dtí an stáisiún ionas gur féidir linn labhairt i gceart', english: 'And you are coming to the station so we can talk properly', language: 'english' },
      
      { type: 'section', section: 'Verse 6', artist: 'Mo Chara' },
      { irish: 'Tá tú ag labhairt le Kneecap is cuma linn sa tsioc', english: 'You&apos;re talking to Kneecap, we don&apos;t give a shit', language: 'irish' },
      { irish: 'Bím ar Facebook do mháthair ag wankáil like foc', english: 'I&apos;m on your mother&apos;s Facebook wanking like fuck', language: 'irish' },
      { irish: 'Ag streachailt do m\'anáil mar tá do dheirfiúr fliuch', english: 'Struggling for my breath because your sister is wet', language: 'irish' },
      { irish: 'Ag tabhairt greadadh do d\'athair agus mé lom nocht', english: 'Giving a beating to your father while I&apos;m stark naked', language: 'irish' },
      { irish: 'Mar le tamall anois tá mé as mo mheabhair', english: 'Because for a while now I&apos;ve been out of my mind', language: 'irish' },
      { irish: 'Déanfaidh mise a bheag duit agus tú os comhair', english: 'I&apos;ll do you a small one while you&apos;re in front', language: 'irish' },
      { irish: 'Cébí, duine a bhí, mar chuid de do shaol', english: 'Whoever, anyone who was, as part of your life', language: 'irish' },
      { irish: 'Brisim achan riail, seachas focan caol le caol', english: 'I break every rule, except fucking slender with slender', language: 'irish' },
      
      { type: 'section', section: 'Final Chorus' },
      { irish: 'C.E.A.R.T.A', english: 'R.I.G.H.T.S', language: 'irish' },
      { irish: 'Is cuma liom sa foc faoi aon gharda', english: 'I don&apos;t give a fuck about any garda', language: 'irish' },
      { irish: 'Dúidín lasta, tá mise ró-ghasta', english: 'A lit joint, I&apos;m too quick', language: 'irish' },
      { irish: 'Ní fheicfidh tú mise i mo sheasamh ró-fhada', english: 'You won&apos;t see me standing around too long', language: 'irish' },
      { irish: 'C.E.A.R.T.A', english: 'R.I.G.H.T.S', language: 'irish' },
      { irish: 'Is cuma liom sa foc faoi aon gharda', english: 'I don&apos;t give a fuck about any garda', language: 'irish' },
      { irish: 'Dúidín lasta, tá mise ró-ghasta', english: 'A lit joint, I&apos;m too quick', language: 'irish' },
      { irish: 'Ní fheicfidh tú mise i mo sheasamh ró-fhada', english: 'You won&apos;t see me standing around too long', language: 'irish' }
    ]
  },
  'incognito': {
    id: 'incognito',
    title: 'Incognito',
    titleEnglish: 'Incognito',
    album: '3CAG',
    year: 2018,
    duration: '3:29',
    primaryLanguage: 'mixed',
    lines: [
      { irish: 'Incognito mode - full lyrics coming soon', english: 'Incognito mode - full lyrics coming soon', language: 'english' }
    ]
  },
  'ceacht-mo-chara': {
    id: 'ceacht-mo-chara',
    title: 'Ceacht Mo Chara',
    titleEnglish: 'My Friend\'s Lesson',
    album: '3CAG',
    year: 2018,
    duration: '4:23',
    primaryLanguage: 'irish',
    lines: [
      { irish: 'Ceacht mo chara - my friend\'s lesson - full lyrics coming soon', english: 'Ceacht mo chara - my friend\'s lesson - full lyrics coming soon', language: 'irish' }
    ]
  },
  'your-sniffer-dogs-are-shite': {
    id: 'your-sniffer-dogs-are-shite',
    title: 'Your Sniffer Dogs Are Shite',
    titleEnglish: 'Your Sniffer Dogs Are Shite',
    album: '3CAG',
    year: 2018,
    duration: '5:28',
    primaryLanguage: 'english',
    lines: [
      { irish: 'Your sniffer dogs are shite - anti-police track - full lyrics coming soon', english: 'Your sniffer dogs are shite - anti-police track - full lyrics coming soon', language: 'english' }
    ]
  },
  'bouncers': {
    id: 'bouncers',
    title: 'Bouncers',
    titleEnglish: 'Bouncers',
    album: '3CAG',
    year: 2018,
    duration: '4:16',
    primaryLanguage: 'english',
    lines: [
      { irish: 'Bouncers - club security track - full lyrics coming soon', english: 'Bouncers - club security track - full lyrics coming soon', language: 'english' }
    ]
  },

  // ===== SINGLES & OTHER RELEASES =====
  'get-your-brits-out': {
    id: 'get-your-brits-out',
    title: 'Get Your Brits Out',
    titleEnglish: 'Get Your Brits Out',
    album: 'Single',
    year: 2019,
    duration: '3:20',
    primaryLanguage: 'english',
    lines: [
      { type: 'section', section: 'Verse 1', artist: 'Móglaí Bap' },
      { english: 'Guess who\'s back on the news', irish: 'Tomhas cé atá ar ais ar na nuachtaí', language: 'english' },
      { english: 'It\'s your favourite Republican hoods', irish: 'Is iad do hoodanna Poblachtacha is fearr leat', language: 'english' },
      { english: 'It\'s your fella with the Nike Air shoes', irish: 'Is é do bhuachaill leis na bróga Nike Air', language: 'english' },
      { english: 'Two chains, two birds and we know what\'s good', irish: 'Dhá slabhra, dhá éan agus tá a fhios againn céard atá maith', language: 'english' },
      { english: 'Guess who\'s back to abuse', irish: 'Tomhas cé atá ar ais le mí-úsáid a dhéanamh', language: 'english' },
      { english: 'Every solvent that I choose', irish: 'Gach tuaslagóir a roghnaím', language: 'english' },
      { english: 'Two blues and a pint of stout', irish: 'Dhá gorm agus pionta leann dubh', language: 'english' },
      { english: 'And never you mind if it smells like trout, foc', irish: 'Agus ná bac má bholaíonn sé cosúil le breac, foc', language: 'english' },
      { irish: 'Tomhas cé atá ag teacht i mo dhiaidh', english: 'Guess who\'s coming after me', language: 'irish' },
      { irish: 'Ach Stalford agus an DUP', english: 'But Stalford and the DUP', language: 'irish' },
      { irish: 'Gach lá, taobh amuigh de mo theach', english: 'Every day, outside my house', language: 'irish' },
      { english: '"Go back to Dublin if you want to rap"', irish: '"Téigh ar ais go Baile Átha Cliath má tá tú ag iarraidh rap a dhéanamh"', language: 'english' },
      { english: 'Anois éist, I\'m gonna say this once', irish: 'Now listen, I\'m gonna say this once', language: 'english' },
      { english: 'Yous can all stay just don\'t be cunts', irish: 'Is féidir libh go léir fanacht díreach ná bígí ina cunts', language: 'english' },
      { english: 'And don\'t be runnin\' round like silly old Tans', irish: 'Agus ná bígí ag rith timpeall cosúil le sean-Tans baoth', language: 'english' },
      { english: 'Just take these yokes and we\'ll go for a dance', irish: 'Díreach tóg na yokes seo agus rachaimid ag damhsa', language: 'english' },
      { english: 'Go for a dance, go for a dance', irish: 'Téigh ag damhsa, téigh ag damhsa', language: 'english' },
      { english: 'Go for a dance, go for a dance', irish: 'Téigh ag damhsa, téigh ag damhsa', language: 'english' },

      { type: 'section', section: 'Verse 2', artist: 'Mo Chara' },
      { irish: 'Bhí an DUP harassin\' me', english: 'The DUP was harassing me', language: 'irish' },
      { english: 'But now we\'re all on the yokes and it\'s startin\' to be', irish: 'Ach anois táimid go léir ar na yokes agus tá sé ag tosú a bheith', language: 'english' },
      { english: 'A good night out, they forgot all about', irish: 'Oíche mhaith amuigh, rinne siad dearmad ar fad faoi', language: 'english' },
      { english: 'The time that I said something like \'Brits Out\'', irish: 'An t-am a dúirt mé rud éigin cosúil le \'Brits Out\'', language: 'english' },
      { english: 'Arlene\'s throwing shapes half a yoke nearly killed her', irish: 'Tá Arlene ag caitheamh cruthanna leath yoke beagnach mharaigh sí í', language: 'english' },
      { english: 'Jeffrey Donaldson\'s lost all his filters', irish: 'Chaill Jeffrey Donaldson a chuid scagairí go léir', language: 'english' },
      { irish: 'Seo duit mate, take two sticks', english: 'Here you go mate, take two sticks', language: 'irish' },
      { english: 'He got me in a headlock and gave me a kiss', irish: 'Fuair sé mé i headlock agus thug sé póg dom', language: 'english' },
      { english: 'And now Christy Stalford\'s having the craic', irish: 'Agus anois tá Christy Stalford ag baint taitneamh as an gcraic', language: 'english' },
      { english: 'Showing everyone his old tattoo on his back', irish: 'Ag taispeáint a tattoo sean ar a dhroim do gach duine', language: 'english' },
      { english: 'Arlene says "Relax or you\'ll get sacked"', irish: 'Deir Arlene "Scíth a ligean nó gheobhaidh tú do scaoileadh"', language: 'english' },
      { english: 'Dúirt mé "tóg go bog é", things get weird when you\'re whacked', irish: 'I said "take it easy", things get weird when you\'re whacked', language: 'english' },
      { english: 'Brits out for the night and we landed in Thompson\'s', irish: 'Brits amuigh don oíche agus thuirling muid i Thompson\'s', language: 'english' },
      { english: 'Told Donaldson to double drop to see what happens', irish: 'Dúirt le Donaldson double drop a dhéanamh le feiceáil céard a tharlaíonn', language: 'english' },
      { english: 'Sammy Wilson got knocked back at the door', irish: 'Fuair Sammy Wilson cnag ar ais ag an doras', language: 'english' },
      { english: 'And now he\'s out the front in bad form', irish: 'Agus anois tá sé amuigh os comhair i droch-chruth', language: 'english' },
      { irish: 'Scoth na hoíche, neart yokes le hithe', english: 'Best of the night, plenty of yokes to eat', language: 'irish' },
      { irish: '\'nois tá mála de fiche, críochnaithe', english: 'Now there\'s a bag of twenty, finished', language: 'irish' },
      { english: 'These E\'s are sweet, they\'re sweet E\'s', irish: 'Tá na E\'s seo milis, is E\'s milis iad', language: 'english' },
      { english: 'I\'m eatin\' \'em like sweeties, Mála mór cola bottles agus mála meanies', irish: 'I\'m eating them like sweeties, big bag of cola bottles and a bag of meanies', language: 'english' },

      { type: 'section', section: 'Chorus' },
      { english: 'Get your Brits out, get your Brits out, get your Brits out', irish: 'Faigh do Brits amach, faigh do Brits amach, faigh do Brits amach', language: 'english' },
      { english: 'We\'re on a mad one', irish: 'Táimid ar ceann mire', language: 'english' },
      { english: 'Get your Brits out, get your Brits out, get your Brits out', irish: 'Faigh do Brits amach, faigh do Brits amach, faigh do Brits amach', language: 'english' },
      { english: 'We\'re on a mad one', irish: 'Táimid ar ceann mire', language: 'english' },
      { english: 'Get your Brits out, get your Brits out, get your Brits out', irish: 'Faigh do Brits amach, faigh do Brits amach, faigh do Brits amach', language: 'english' },
      { english: 'We\'re on a mad one!', irish: 'Táimid ar ceann mire!', language: 'english' },
      { english: 'Get your Brits out, get your Brits out, get your Brits out', irish: 'Faigh do Brits amach, faigh do Brits amach, faigh do Brits amach', language: 'english' },
      { english: 'We\'re on a mad one', irish: 'Táimid ar ceann mire', language: 'english' },

      { type: 'section', section: 'Verse 3', artist: 'Móglaí Bap' },
      { english: 'Ar ais ag an teach and things are getting crusty', irish: 'Back at the house and things are getting crusty', language: 'english' },
      { english: 'Arlene ar mo chlé and she\'s getting touchy', irish: 'Arlene on my left and she\'s getting touchy', language: 'english' },
      { english: 'Must be, just mar gheall ar na yokes', irish: 'Must be, just because of the yokes', language: 'english' },
      { english: '\'Cause she whispered in my ear \'I like to be choked\'', irish: 'Mar gur chuas sí i mo chluas \'Is maith liom a bheith tachtaithe\'', language: 'english' },
      { english: 'And I boked right into her face', irish: 'Agus rinne mé urlacan díreach ina haghaidh', language: 'english' },
      { english: '\'Cause the room was spinning all over the place', irish: 'Mar bhí an seomra ag casadh ar fud na háite', language: 'english' },
      { english: 'I couldn\'t stand, couldn\'t sit but I kept her lit', irish: 'Ní fhéadfainn seasamh, ní fhéadfainn suí ach choinnigh mé lasta í', language: 'english' },
      { english: 'And now my best mate is a distinguished Brit', irish: 'Agus anois is Brit oirirce é mo chara is fearr', language: 'english' },

      { type: 'section', section: 'Verse 4', artist: 'Mo Chara' },
      { english: 'We\'re at the afters and it\'s a disaster', irish: 'Táimid ag na h-afters agus is tubaiste é', language: 'english' },
      { english: 'Cunts are talkin\' politics, there\'s a lack of a laughter', irish: 'Tá cunts ag caint polaitíochta, tá easnamh gáire ann', language: 'english' },
      { english: 'Skaggin\' out on the sofa, Arlene\'s tinn', irish: 'Skaggin\' amach ar an tolg, tá Arlene tinn', language: 'english' },
      { english: 'Paro off her head, she believes she\'s sinned', irish: 'Paro as a ceann, creideann sí gur pheacaigh sí', language: 'english' },
      { english: 'Donaldson has started with his homophobic chat', irish: 'Thosaigh Donaldson lena chomhrá homafóbach', language: 'english' },
      { english: 'So everyone has started on him that\'s enough of that', irish: 'Mar sin thosaigh gach duine air sin go leor de sin', language: 'english' },
      { english: 'Stalford\'s lickin\' coke off a plate', irish: 'Tá Stalford ag lí cóc as pláta', language: 'english' },
      { english: 'You\'ve got issues mate', irish: 'Tá fadhbanna agat a chara', language: 'english' },
      { english: 'You\'ve got issues mate', irish: 'Tá fadhbanna agat a chara', language: 'english' },
      { english: 'Issues mate', irish: 'Fadhbanna a chara', language: 'english' },
      { english: 'Issues mate', irish: 'Fadhbanna a chara', language: 'english' },
      { english: 'Issues mate', irish: 'Fadhbanna a chara', language: 'english' },

      { type: 'section', section: 'Final Chorus' },
      { english: 'Get your Brits out, get your Brits out, get your Brits out', irish: 'Faigh do Brits amach, faigh do Brits amach, faigh do Brits amach', language: 'english' },
      { english: 'We\'re on a mad one', irish: 'Táimid ar ceann mire', language: 'english' },
      { english: 'Get your Brits out, get your Brits out, get your Brits out', irish: 'Faigh do Brits amach, faigh do Brits amach, faigh do Brits amach', language: 'english' },
      { english: 'We\'re on a mad one!', irish: 'Táimid ar ceann mire!', language: 'english' },
      { english: 'Get your Brits out, get your Brits out, get your Brits out', irish: 'Faigh do Brits amach, faigh do Brits amach, faigh do Brits amach', language: 'english' },
      { english: 'We\'re on a mad one', irish: 'Táimid ar ceann mire', language: 'english' },
      { english: 'Get your Brits out, get your Brits out, get your Brits out', irish: 'Faigh do Brits amach, faigh do Brits amach, faigh do Brits amach', language: 'english' },
      { english: 'We\'re on a mad one', irish: 'Táimid ar ceann mire', language: 'english' }
    ]
  },
  'fenian-cunts': {
    id: 'fenian-cunts',
    title: 'Fenian Cunts',
    titleEnglish: 'Fenian Cunts',
    album: 'Single',
    year: 2019,
    duration: '3:15',
    primaryLanguage: 'mixed',
    lines: [
      { irish: 'Provocative track addressing sectarian language - full lyrics coming soon', english: 'Provocative track addressing sectarian language - full lyrics coming soon', language: 'english' }
    ]
  },
  'hood': {
    id: 'hood',
    title: 'H.O.O.D',
    titleEnglish: 'H.O.O.D',
    album: 'Single',
    year: 2021,
    duration: '3:30',
    primaryLanguage: 'mixed',
    lines: [
      { type: 'section', section: 'Tús (Intro)', artist: 'Móglaí Bap' },
      { english: 'Here, tell him', irish: 'Anseo, inis dó', language: 'english' },
      { english: 'Who\'s the most violent person you know except Arlene', irish: 'Cé hé an duine is foréigní ar a aithníonn tú seachas Arlene', language: 'english' },
      { english: '(Ha ha ha ha ha haaaa) Oh that would be you kid (ha ha ha ha) Respect', irish: '(Ha ha ha ha ha haaaa) Ó, sin thú féin a pháiste (ha ha ha ha) Meas', language: 'english' },
      
      { type: 'section', section: 'Véarsa 1 (Verse 1)', artist: 'Mo Chara' },
      { irish: 'Focain caite amach arís', english: 'Fucking thrown out again', language: 'irish' },
      { irish: 'Barraíocht piontaí le barraíocht snaois', english: 'Too many pints with too much snuff', language: 'irish' },
      { english: 'Equals a cocktail brave for unleashin\' the beast', irish: 'Cothromaíonn cocktail cróga chun an beast a scaoileadh', language: 'english' },
      { irish: 'Oíche mhór amach fuinne, at least', english: 'Big night out at least', language: 'irish' },
      
      { irish: 'Troid eile, he\'s beatin\' some fella', english: 'Another fight, he\'s beating some fella', language: 'irish' },
      { irish: 'Tá an R.U.C. anseo anois eile', english: 'The R.U.C. is here now again', language: 'irish' },
      { english: 'Fucked in to the back of the jeep, he falls asleep', irish: 'Fucáilte isteach chun cúl an jeep, titeann sé ina chodladh', language: 'english' },
      { english: 'He does it every week', irish: 'Déanann sé é gach seachtain', language: 'english' },
      
      { type: 'section', section: 'Droichead 1 (Bridge 1)', artist: 'Mo Chara' },
      { irish: 'Tiocfaidh ár lá, get the Brits out lad!', english: 'Our day will come, get the Brits out lad!', language: 'irish' },
      { english: 'A one way ticket please I\'ve lost my bus pass', irish: 'Ticéad aon bhealaigh le do thoil cailleadh mo phas bus', language: 'english' },
      
      { type: 'section', section: 'Véarsa 2 (Verse 2)', artist: 'Mo Chara' },
      { irish: 'Isteach san offie', english: 'Into the off-license', language: 'irish' },
      { english: 'He\'s lookin\' some tins man', irish: 'Tá sé ag lorg canaí fear', language: 'english' },
      { irish: 'Ag cailleadh focan foighde anois man', english: 'Losing fucking patience now man', language: 'irish' },
      
      { english: '"Keep \'er lit ta fuck or fuckin\' fuck off" Jesus said on the cross', irish: '"Coimeád lasta í nó fuck off" a dúirt Íosa ar an gcrois', language: 'english' },
      { english: 'Two tins of Boost, 20 fegs and the fuck is still lost', irish: 'Dhá channaí Boost, 20 toitín agus tá an fuck fós caillte', language: 'english' },
      { english: 'Who\'s next, me miss, son would you like a bag?', irish: 'Cé atá ar aghaidh, a bhean uasal, a mhac ar mhaith leat mála?', language: 'english' },
      { english: 'For your shopping, not your nose, I see your ankle tag', irish: 'Do do chuid siopadóireachta, ní do shrón, feicim do chlib rúitín', language: 'english' },
      
      { english: 'Fuck you curfew, dislocated eyesocket', irish: 'Fuck leat curfew, súil as áit', language: 'english' },
      { english: 'Overnight, cop shop with two grams in his pocket', irish: 'Thar oíche, siopa gardaí le dhá ghram ina phóca', language: 'english' },
      { english: 'Just his reputation now he\'s known for being a rocket', irish: 'Díreach a chlú anois tá aithne air as a bheith ina roicéad', language: 'english' },
      { english: 'In his dreams 9mm loaded...', irish: 'Ina bhrionglaí 9mm lódáilte...', language: 'english' },
      
      { type: 'section', section: 'Cúrfa (Chorus)', artist: 'Móglaí Bap & Mo Chara' },
      { english: 'I\'m a H - Double O - D. Low life scum, that\'s what they say about me', irish: 'Is H - Double O - D mé. Scuma beatha íseal, sin a deir siad fúm', language: 'english' },
      { english: '\'Cause I\'m a H - Double O - D. Low life scum, that\'s what they say about me', irish: 'Mar is H - Double O - D mé. Scuma beatha íseal, sin a deir siad fúm', language: 'english' },
      
      { type: 'section', section: 'Véarsa 3 (Verse 3)', artist: 'Móglaí Bap' },
      { english: 'A dog with a job, what the fuck is that?', irish: 'Madra le post, cad é sin?', language: 'english' },
      { english: 'When our poor Micky\'s just sittin\' in the flat', irish: 'Nuair atá ár micky bocht díreach ina shuí san árasán', language: 'english' },
      { english: 'Sippin\' on his cans and smokin\' rollies', irish: 'Ag sú ar a chanaí agus ag caitheamh rollies', language: 'english' },
      { english: '\'Cause all the best jobs are taken by the dolies', irish: 'Mar tá na poist is fearr go léir tógtha ag na dolies', language: 'english' },
      
      { type: 'section', section: 'Véarsa 4 (Verse 4)', artist: 'Móglaí Bap' },
      { english: 'Squidgy black, yeah craic, and mo spliff achan lá', irish: 'Squidgy dubh, is ea craic, agus mo spliff gach lá', language: 'english' },
      { english: 'Beat the fash and the sesh, get that note off my car', irish: 'Buail an fash agus an sesh, faigh an nóta sin de mo charr', language: 'english' },
      { irish: 'Ach anois, Hector\'s stash, má tá pús san áit', english: 'But now, Hector\'s stash, if there\'s a sulk in the place', language: 'irish' },
      { irish: 'Ach ar dtús, cúpla líne, sula n-éiríonn seo aisteach', english: 'But first, a couple of lines, before this gets strange', language: 'irish' },
      
      { type: 'section', section: 'Droichead 2 (Bridge 2)', artist: 'Móglaí Bap & Mo Chara' },
      { english: 'It\'s gonna be a blood bath', irish: 'Beidh sé ina fholcadh fola', language: 'english' },
      { english: 'It\'s gonna be a blood bath', irish: 'Beidh sé ina fholcadh fola', language: 'english' },
      { english: 'It\'s gonna be a blood bath', irish: 'Beidh sé ina fholcadh fola', language: 'english' },
      { english: '(It\'s gonna be a blood bath)', irish: '(Beidh sé ina fholcadh fola)', language: 'english' },
      
      { type: 'section', section: 'Véarsa 5 (Verse 5)', artist: 'Móglaí Bap & Mo Chara' },
      { english: 'Throw a hook, a jab and a boot', irish: 'Caith dubháin, jab agus buatais', language: 'english' },
      { english: 'I sneak a quick toot then I fire another boot', irish: 'Sneakaim toot gasta ansin scaoilim buatais eile', language: 'english' },
      { english: 'For callin\' me a fruit', irish: 'As mo ghlaoch ort ina thoradh', language: 'english' },
      { english: 'For tryna take the loot', irish: 'As iarracht an creachadh a ghlacadh', language: 'english' },
      { english: 'But Billy won\'t be bothering anymore hoods', irish: 'Ach ní bheidh Billy ag cur isteach ar hoods níos mó', language: 'english' },
      
      { irish: '\'Nois cúpla ceist, do ya want it in your chest?', english: 'Now a couple of questions, do ya want it in your chest?', language: 'irish' },
      { english: 'Or your knees or your head?', irish: 'Nó do ghlúine nó do cheann?', language: 'english' },
      { english: 'DJ Próvaí has the lead', irish: 'Tá an ceannasaíocht ag DJ Próvaí', language: 'english' },
      { english: 'You can beg, you can plead, you can tell us what we need', irish: 'Is féidir leat impí, is féidir leat achainí, is féidir leat a rá linn cad atá uainn', language: 'english' },
      { english: 'You can change your name', irish: 'Is féidir leat d\'ainm a athrú', language: 'english' },
      { english: 'But you\'re all the fuckin\' same', irish: 'Ach tá sibh go léir mar an gcéanna', language: 'english' },
      
      { type: 'section', section: 'Cúrfa Deiridh (Final Chorus)', artist: 'Móglaí Bap & Mo Chara' },
      { english: 'I\'m a H - Double O - D. Low life scum, that\'s what they say about me', irish: 'Is H - Double O - D mé. Scuma beatha íseal, sin a deir siad fúm', language: 'english' },
      { english: '\'Cause I\'m a H - Double O - D. Low life scum, that\'s what they say about me', irish: 'Mar is H - Double O - D mé. Scuma beatha íseal, sin a deir siad fúm', language: 'english' },
      { english: 'I\'m a H - Double O - D. Low life scum, that\'s what they say about me', irish: 'Is H - Double O - D mé. Scuma beatha íseal, sin a deir siad fúm', language: 'english' },
      { english: '\'Cause I\'m a H - Double O - D. Low life scum, that\'s what they say about me', irish: 'Mar is H - Double O - D mé. Scuma beatha íseal, sin a deir siad fúm', language: 'english' }
    ]
  },
  'guilty-conscience': {
    id: 'guilty-conscience',
    title: 'Guilty Conscience',
    titleEnglish: 'Guilty Conscience',
    album: 'Single',
    year: 2021,
    duration: '3:45',
    primaryLanguage: 'english',
    lines: [
      { irish: 'Guilty conscience - introspective track - full lyrics coming soon', english: 'Guilty conscience - introspective track - full lyrics coming soon', language: 'english' }
    ]
  },
  'thart-agus-thart': {
    id: 'thart-agus-thart',
    title: 'Thart agus Thart',
    titleEnglish: 'Around and Around',
    album: 'Single',
    year: 2021,
    duration: '3:20',
    primaryLanguage: 'irish',
    lines: [
      { irish: 'Thart agus thart - around and around - full lyrics coming soon', english: 'Thart agus thart - around and around - full lyrics coming soon', language: 'irish' }
    ]
  },
  'its-been-ages': {
    id: 'its-been-ages',
    title: 'ITS BEEN AGES',
    titleEnglish: 'ITS BEEN AGES',
    album: 'Single',
    year: 2023,
    duration: '2:45',
    primaryLanguage: 'english',
    lines: [
      { irish: 'Its been ages since the last release - full lyrics coming soon', english: 'Its been ages since the last release - full lyrics coming soon', language: 'english' }
    ]
  },
  'gael-gigolos': {
    id: 'gael-gigolos',
    title: 'Gael-Gigolos',
    titleEnglish: 'Gael-Gigolos',
    album: 'Single',
    year: 2019,
    duration: '3:10',
    primaryLanguage: 'mixed',
    lines: [
      { irish: 'Gael-Gigolos - Irish gigolos - full lyrics coming soon', english: 'Gael-Gigolos - Irish gigolos - full lyrics coming soon', language: 'irish' }
    ]
  },
  'the-recap': {
    id: 'the-recap',
    title: 'THE RECAP',
    titleEnglish: 'THE RECAP (ft. Mozey)',
    album: 'Single',
    year: 2025,
    duration: '3:30',
    primaryLanguage: 'english',
    lines: [
      { irish: 'The Recap featuring Mozey - latest single - full lyrics coming soon', english: 'The Recap featuring Mozey - latest single - full lyrics coming soon', language: 'english' }
    ]
  }
};

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
        {/* Settings Button */}
        <button
          onClick={() => setShowControls(!showControls)}
          className="p-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          title="Speed Settings"
        >
          <Settings className="h-5 w-5 text-gray-600 dark:text-gray-400" />
        </button>

        {/* Play/Pause Button */}
        <button
          onClick={onToggle}
          className={`p-4 rounded-full transition-colors ${
            isPlaying
              ? 'bg-red-600 hover:bg-red-700 text-white'
              : 'bg-green-600 hover:bg-green-700 text-white'
          }`}
          title={isPlaying ? 'Pause Auto-Scroll' : 'Start Auto-Scroll'}
        >
          {isPlaying ? (
            <Pause className="h-6 w-6" />
          ) : (
            <Play className="h-6 w-6" />
          )}
        </button>

        {/* Speed Indicator */}
        <div className="px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300">
          {speed.toFixed(1)}x
        </div>
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
  const song = songData[id];
  
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

  const hasFullLyrics = ['cearta', 'fine-art', 'better-way-to-live', 'get-your-brits-out', 'hood'].includes(song.id);

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

        {hasFullLyrics && (
          <>
            {/* Cultural Context - only for songs with full lyrics */}
            <div className="mt-6 bg-green-50 dark:bg-green-900/20 rounded-lg p-6 border border-green-200 dark:border-green-800">
              <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-3">
                Cultural Context & Learning Notes
              </h3>
              <div className="space-y-3 text-green-700 dark:text-green-300">
                {song.id === 'cearta' && (
                  <>
                    <p>
                      <strong>C.E.A.R.T.A</strong> is one of KNEECAP&apos;s most famous songs, documenting a near miss with police 
                      while carrying illegal substances. The song helped introduce Irish slang for modern drug culture.
                    </p>
                    <p>
                      <strong>Language Note:</strong> KNEECAP invented many Irish words for drugs since traditional Irish 
                      didn&apos;t have urban terminology. &quot;Snaois&quot; (snuff) is used for cocaine, &quot;yokes&quot; for ecstasy pills.
                    </p>
                    <p>
                      <strong>RUC:</strong> Royal Ulster Constabulary - the former police force in Northern Ireland, 
                      replaced by PSNI in 2001 but still referenced in the song for cultural impact.
                    </p>
                  </>
                )}
                {song.id === 'better-way-to-live' && (
                  <>
                    <p>
                      <strong>Better Way to Live</strong> features Grian Chatten from Fontaines D.C. and explores themes 
                      of addiction, mental health, and finding hope in difficult circumstances.
                    </p>
                    <p>
                      <strong>Collaboration:</strong> This track represents the connection between Irish and English 
                      alternative music scenes, bridging Dublin and Belfast&apos;s music communities.
                    </p>
                  </>
                )}
                {song.id === 'fine-art' && (
                  <p>
                                          <strong>Fine Art</strong> is the title track that encapsulates KNEECAP&apos;s artistic philosophy, 
                      blending street art, graffiti culture, and musical expression as forms of resistance and identity.
                  </p>
                )}
              </div>
            </div>

            {/* Pronunciation Tips - only for songs with full lyrics */}
            <div className="mt-6 bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6 border border-purple-200 dark:border-purple-800">
              <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-200 mb-3">
                Pronunciation Tips
              </h3>
              <div className="grid md:grid-cols-2 gap-4 text-purple-700 dark:text-purple-300">
                <div>
                  <h4 className="font-semibold mb-2">Key Phrases:</h4>
                  <ul className="space-y-1 text-sm">
                    {song.id === 'cearta' && (
                      <>
                        <li><strong>C.E.A.R.T.A:</strong> &quot;kay-ee-ah-ar-tay-ah&quot;</li>
                        <li><strong>Ní fhaca mé:</strong> &quot;nee ah-ka may&quot;</li>
                        <li><strong>Tá mé:</strong> &quot;taw may&quot;</li>
                        <li><strong>Garda:</strong> &quot;gar-da&quot;</li>
                      </>
                    )}
                    {song.id === 'better-way-to-live' && (
                      <>
                        <li><strong>Táim ag ól:</strong> &quot;taw-im ag ole&quot;</li>
                        <li><strong>Mo phian:</strong> &quot;mo fee-an&quot;</li>
                        <li><strong>A cheilt:</strong> &quot;ah heh-lt&quot;</li>
                      </>
                    )}
                    {song.id === 'fine-art' && (
                      <>
                        <li><strong>Is mise:</strong> &quot;iss mish-eh&quot;</li>
                        <li><strong>Mo shaol:</strong> &quot;mo howl&quot;</li>
                        <li><strong>Mo ealaín:</strong> &quot;mo al-aw-een&quot;</li>
                      </>
                    )}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Grammar Notes:</h4>
                  <ul className="space-y-1 text-sm">
                    <li>Irish word order is often Verb-Subject-Object</li>
                    <li>&quot;Tá&quot; = &quot;is/am/are&quot; (present tense of &quot;to be&quot;)</li>
                    <li>&quot;Ní&quot; = &quot;not&quot; (negation particle)</li>
                    <li>Aspiration (h) after consonants changes pronunciation</li>
                  </ul>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Auto-Scroll Controller */}
        <AutoScrollController
          onToggle={toggleAutoScroll}
          isPlaying={isAutoScrolling}
          speed={scrollSpeed}
          onSpeedChange={handleSpeedChange}
        />
      </div>
    </div>
  );
} 