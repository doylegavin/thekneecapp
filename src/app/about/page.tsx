import Link from 'next/link';
import { ArrowLeft, Music, Heart, Globe, Award, Users, BookOpen } from 'lucide-react';

export default function AboutPage() {
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

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            About KNEECAP
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Revolutionary Irish rap group bringing the Irish language into contemporary hip-hop culture
          </p>
        </div>

        {/* KNEECAP Story */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            The KNEECAP Story
          </h2>
          
          <div className="prose prose-lg max-w-none text-gray-600 dark:text-gray-400">
            <p className="mb-6">
              KNEECAP is a groundbreaking Irish rap group from Belfast, Northern Ireland, consisting of members 
              Naoise Ó Cairealláin (Móglaí Bap), Liam Ó hAnnaidh (Mo Chara), and JJ Ó Dochartaigh (DJ Próvaí). 
              The group has revolutionized the Irish music scene by bringing the Irish language (Gaeilge) into 
              contemporary hip-hop culture.
            </p>
            
            <p className="mb-6">
              Formed in the mid-2010s, KNEECAP emerged from the vibrant Belfast music scene with a mission to 
              make Irish relevant to young people through raw, uncompromising rap music. Their lyrics tackle 
              contemporary issues while celebrating Irish identity and language.
            </p>
            
            <p className="mb-6">
              The group's name itself is a statement – referencing both the notorious punishment used during 
              the Troubles and their intention to "kneecap" the forces that seek to suppress Irish culture 
              and language. Their music is both a celebration of Irish identity and a form of cultural resistance.
            </p>
          </div>
        </div>

        {/* Impact & Achievements */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
            <Award className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Cultural Impact
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Pioneering the use of Irish language in hip-hop, inspiring a new generation of Irish speakers
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
            <Globe className="h-12 w-12 text-orange-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              International Recognition
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Bringing Irish culture to global audiences through music festivals and international media
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
            <Users className="h-12 w-12 text-blue-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Youth Engagement
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Making Irish language cool and accessible to young people through contemporary music
            </p>
          </div>
        </div>

        {/* Discography */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Discography
          </h2>
          
          <div className="space-y-6">
            <div className="border-l-4 border-green-500 pl-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Fine Art (2024)</h3>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Their latest album showcasing mature songwriting and continued commitment to bilingual rap. 
                Features powerful tracks like "Cearta" and "H-Ifreann".
              </p>
            </div>
            
            <div className="border-l-4 border-orange-500 pl-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">3CAG (2018)</h3>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Their breakthrough album that put them on the map. Contains iconic tracks like "Fenian Cunts", 
                "Your Man", and "Get Your Brits Out" that established their distinctive sound.
              </p>
            </div>
            
            <div className="border-l-4 border-blue-500 pl-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Various Singles & EPs</h3>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Multiple releases that have contributed to the Irish rap scene and language revival movement.
              </p>
            </div>
          </div>
        </div>

        {/* About This Platform */}
        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-8 border border-green-200 dark:border-green-800 mb-12">
          <h2 className="text-3xl font-bold text-green-800 dark:text-green-200 mb-6">
            About This Educational Platform
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-green-700 dark:text-green-300 mb-4">
                Our Mission
              </h3>
              <p className="text-green-600 dark:text-green-400 mb-4">
                This educational platform celebrates KNEECAP's contribution to Irish culture while providing 
                tools for language learning. We believe music is one of the most powerful ways to connect 
                with a language and culture.
              </p>
              <p className="text-green-600 dark:text-green-400">
                Our goal is to make Irish language accessible and engaging through contemporary music, 
                supporting the revival and preservation of this beautiful language.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-green-700 dark:text-green-300 mb-4">
                Educational Features
              </h3>
              <ul className="space-y-2 text-green-600 dark:text-green-400">
                <li className="flex items-center">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Interactive lyrics with side-by-side translations
                </li>
                <li className="flex items-center">
                  <Music className="h-4 w-4 mr-2" />
                  Cultural context and song meanings
                </li>
                <li className="flex items-center">
                  <Globe className="h-4 w-4 mr-2" />
                  Language learning resources and tips
                </li>
                <li className="flex items-center">
                  <Heart className="h-4 w-4 mr-2" />
                  Celebration of Irish culture and identity
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Start Your Irish Language Journey
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            Explore KNEECAP's powerful lyrics and discover the beauty of the Irish language
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/songs"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors shadow-lg"
            >
              Explore Songs
            </Link>
            <Link
              href="/learn"
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors shadow-lg"
            >
              Learn Irish
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 