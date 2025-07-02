import Link from "next/link";
import { Music, Languages, BookOpen, Users } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-orange-50 dark:from-gray-900 dark:to-gray-800">
      {/* Navigation */}
      <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Music className="h-8 w-8 text-green-600" />
              <span className="text-2xl font-bold text-gray-900 dark:text-white">KNEECAP</span>
              <span className="text-sm text-gray-600 dark:text-gray-400">Educational Platform</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-700 dark:text-gray-300 hover:text-green-600 transition-colors">
                Home
              </Link>
              <Link href="/songs" className="text-gray-700 dark:text-gray-300 hover:text-green-600 transition-colors">
                Songs
              </Link>
              <Link href="/learn" className="text-gray-700 dark:text-gray-300 hover:text-green-600 transition-colors">
                Learn Irish
              </Link>
              <Link href="/about" className="text-gray-700 dark:text-gray-300 hover:text-green-600 transition-colors">
                About
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6">
            <span className="bg-gradient-to-r from-green-600 to-orange-500 bg-clip-text text-transparent">
              KNEECAP
            </span>
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
            Irish Rap • Educational Platform
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto">
            Learn Irish through the powerful lyrics of KNEECAP. Explore their bilingual rap songs, 
            translate between English and Irish, and discover the beauty of the Irish language through music.
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
              Start Learning
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-gray-800/50">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Platform Features
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
              <Music className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Song Lyrics
              </h4>
              <p className="text-gray-600 dark:text-gray-400">
                Access complete lyrics for all KNEECAP songs in both Irish and English
              </p>
            </div>
            <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
              <Languages className="h-12 w-12 text-orange-500 mx-auto mb-4" />
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Translation
              </h4>
              <p className="text-gray-600 dark:text-gray-400">
                Instant translation between Irish (Gaeilge) and English
              </p>
            </div>
            <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
              <BookOpen className="h-12 w-12 text-blue-500 mx-auto mb-4" />
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Educational
              </h4>
              <p className="text-gray-600 dark:text-gray-400">
                Learn Irish language and culture through contemporary music
              </p>
            </div>
            <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
              <Users className="h-12 w-12 text-purple-500 mx-auto mb-4" />
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Community
              </h4>
              <p className="text-gray-600 dark:text-gray-400">
                Connect with others learning Irish through KNEECAP&apos;s music
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About KNEECAP Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            About KNEECAP
          </h3>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
            KNEECAP is a groundbreaking Irish rap group that performs in both Irish (Gaeilge) and English. 
            They&apos;ve revolutionized the Irish music scene by bringing the Irish language into contemporary hip-hop, 
            making it accessible and relevant to new generations.
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            This educational platform celebrates their work while providing tools for language learning, 
            cultural preservation, and musical appreciation.
          </p>
          <div className="bg-green-100 dark:bg-green-900/30 p-6 rounded-lg">
            <p className="text-green-800 dark:text-green-200 font-semibold">
              &quot;Music is a powerful tool for language learning and cultural connection.&quot;
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Music className="h-6 w-6 text-green-400" />
            <span className="text-xl font-bold">KNEECAP Educational Platform</span>
          </div>
          <p className="text-gray-400 mb-4">
            Educational platform for learning Irish through KNEECAP&apos;s bilingual rap music
          </p>
          <p className="text-sm text-gray-500">
            This is an educational resource. All rights to the music and lyrics belong to KNEECAP.
          </p>
        </div>
      </footer>
    </div>
  );
}
