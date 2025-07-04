import Link from 'next/link';
import { ArrowLeft, BookOpen, Headphones, Users, Star, Music, Languages, Target } from 'lucide-react';

export default function LearnPage() {
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
            Learn Irish Through Music
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Discover the beauty of the Irish language (Gaeilge) through KNEECAP's powerful lyrics. 
            Music is one of the most effective ways to learn a new language.
          </p>
        </div>

        {/* Learning Methods */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <Headphones className="h-12 w-12 text-green-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Listen & Repeat
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Listen to KNEECAP songs while following along with lyrics to improve pronunciation and rhythm.
            </p>
            <Link href="/songs" className="text-green-600 hover:text-green-700 transition-colors">
              Start Listening →
            </Link>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <Languages className="h-12 w-12 text-orange-500 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Translation Practice
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Use our side-by-side translation feature to understand meaning while learning new vocabulary.
            </p>
            <Link href="/songs" className="text-green-600 hover:text-green-700 transition-colors">
              Practice Translation →
            </Link>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <BookOpen className="h-12 w-12 text-blue-500 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Cultural Context
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Learn about Irish culture, history, and contemporary issues through song meanings and themes.
            </p>
            <Link href="/about" className="text-green-600 hover:text-green-700 transition-colors">
              Learn More →
            </Link>
          </div>
        </div>

        {/* Irish Language Basics */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Irish Language Basics
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-green-700 dark:text-green-400 mb-4">
                Common Phrases in KNEECAP Songs
              </h3>
              <div className="space-y-3">
                <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded">
                  <p className="font-semibold text-green-800 dark:text-green-200">Tá mé</p>
                  <p className="text-green-600 dark:text-green-400 text-sm">I am</p>
                </div>
                <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded">
                  <p className="font-semibold text-green-800 dark:text-green-200">Mo chara</p>
                  <p className="text-green-600 dark:text-green-400 text-sm">My friend</p>
                </div>
                <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded">
                  <p className="font-semibold text-green-800 dark:text-green-200">Ár dteanga</p>
                  <p className="text-green-600 dark:text-green-400 text-sm">Our language</p>
                </div>
                <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded">
                  <p className="font-semibold text-green-800 dark:text-green-200">Go deo</p>
                  <p className="text-green-600 dark:text-green-400 text-sm">Forever</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400 mb-4">
                Pronunciation Tips
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Broad vs. Slender Consonants</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Irish consonants change pronunciation based on surrounding vowels (a, o, u = broad; e, i = slender)
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Silent Letters</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Many letters in Irish are silent. The spelling shows historical pronunciation.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Stress Patterns</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Usually on the first syllable, but music can change natural stress for rhythm.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Learning Resources */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Additional Learning Resources
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <Target className="h-8 w-8 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Online Courses
              </h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>• Duolingo Irish Course</li>
                <li>• Bitesize Irish Gaelic</li>
                <li>• TG4's "Now You're Talking"</li>
                <li>• Memrise Irish</li>
              </ul>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <Users className="h-8 w-8 text-orange-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Community Resources
              </h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>• Irish language meetups</li>
                <li>• r/gaeilge on Reddit</li>
                <li>• Conradh na Gaeilge</li>
                <li>• Local Irish language classes</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Tips for Learning with Music */}
        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-8 border border-green-200 dark:border-green-800">
          <h2 className="text-2xl font-bold text-green-800 dark:text-green-200 mb-6">
            Tips for Learning Irish with KNEECAP
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-green-700 dark:text-green-300 mb-3">Before Listening:</h3>
              <ul className="space-y-2 text-green-600 dark:text-green-400">
                <li>• Read the English translation first</li>
                <li>• Look up unfamiliar words</li>
                <li>• Understand the song's context</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-green-700 dark:text-green-300 mb-3">While Listening:</h3>
              <ul className="space-y-2 text-green-600 dark:text-green-400">
                <li>• Follow along with Irish lyrics</li>
                <li>• Pay attention to rhythm and pronunciation</li>
                <li>• Don't worry about understanding everything</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-green-700 dark:text-green-300 mb-3">After Listening:</h3>
              <ul className="space-y-2 text-green-600 dark:text-green-400">
                <li>• Practice singing along</li>
                <li>• Write down new phrases</li>
                <li>• Discuss meanings and cultural references</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-green-700 dark:text-green-300 mb-3">Regular Practice:</h3>
              <ul className="space-y-2 text-green-600 dark:text-green-400">
                <li>• Listen to songs repeatedly</li>
                <li>• Create vocabulary flashcards</li>
                <li>• Join discussion forums</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 