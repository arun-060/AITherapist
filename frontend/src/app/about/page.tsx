'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut'
    }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

export default function About() {
  return (
    <div className="font-sans min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-black">
      <header className="w-full py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400">TherapAIst</Link>
        <nav className="flex space-x-4">
          <Link href="/" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Home</Link>
          <Link href="/session" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Session</Link>
          <Link href="/dashboard" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Dashboard</Link>
        </nav>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.h1 
            variants={fadeIn}
            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6"
          >
            About TherapAIst
          </motion.h1>
          <motion.p 
            variants={fadeIn}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          >
            A revolutionary approach to mental health support through artificial intelligence
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Our Mission</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              TherapAIst was created with a clear mission: to make mental health support accessible to everyone, everywhere, at any time. By leveraging cutting-edge artificial intelligence, we've developed a platform that provides empathetic, personalized therapeutic interactions without the barriers of traditional therapy.
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              We believe that emotional well-being should be a priority, not a privilege. Our AI-powered assistant is designed to complement traditional therapy methods, providing continuous support between sessions or serving as an entry point for those new to therapy.
            </p>
          </motion.div>

          <motion.div
            className="relative rounded-xl overflow-hidden h-[500px] lg:h-[400px]"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 z-10" />
            <div className="absolute inset-0 bg-[url('/about-mission.jpg')] bg-cover bg-center" />
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <div className="bg-white/10 dark:bg-gray-800/10 p-8 rounded-xl max-w-md text-center backdrop-blur-lg border border-white/20">
                <h3 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">Innovation in Mental Health</h3>
                <p className="text-gray-100 dark:text-gray-200">
                  TherapAIst represents the convergence of advanced AI technology, psychology, and human-computer interaction, delivering personalized mental health support through innovative therapeutic approaches.
                </p>
                <div className="mt-6 flex justify-center space-x-12">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-400">24/7</div>
                    <div className="text-sm text-gray-300">Availability</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-400">100%</div>
                    <div className="text-sm text-gray-300">Private</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-indigo-400">AI</div>
                    <div className="text-sm text-gray-300">Powered</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg mb-20"
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white text-center">Project Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Privacy-Focused</h3>
              <p className="text-gray-600 dark:text-gray-300">
                All interactions are confidential and secure. We prioritize user privacy in every aspect of our design.
              </p>
            </div>

            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Research-Based</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Built on evidence-based therapeutic approaches and cutting-edge AI research in emotional intelligence.
              </p>
            </div>

            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">User-Centered</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Designed with continuous user feedback to ensure an intuitive, helpful, and compassionate experience.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <h2 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white text-center">Technical Implementation</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white/70 dark:bg-gray-800/70 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Frontend Technologies</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li className="flex items-start">
                  <svg className="h-6 w-6 mr-2 text-blue-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span><strong>Next.js:</strong> React framework for server-rendered applications</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 mr-2 text-blue-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span><strong>TailwindCSS:</strong> Utility-first CSS framework for rapid UI development</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 mr-2 text-blue-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span><strong>Framer Motion:</strong> Animation library for creating fluid UI transitions</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 mr-2 text-blue-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span><strong>WebRTC:</strong> Real-time communication for video streaming</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white/70 dark:bg-gray-800/70 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">AI Components</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li className="flex items-start">
                  <svg className="h-6 w-6 mr-2 text-purple-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span><strong>Emotion Detection:</strong> Computer vision models for facial expression analysis</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 mr-2 text-purple-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span><strong>Natural Language Processing:</strong> Text analysis for sentiment and context understanding</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 mr-2 text-purple-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span><strong>Response Generation:</strong> Contextual and empathetic AI-generated therapeutic responses</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 mr-2 text-purple-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span><strong>Analytics Engine:</strong> Pattern recognition for emotional trends and insights</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Meet the Team</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            TherapAIst is developed by a dedicated team combining expertise in artificial intelligence, human-computer interaction, and therapeutic approaches to deliver innovative mental health solutions.
          </p>
          
          <Link 
            href="/team"
            className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-full transition-all shadow-lg hover:shadow-xl"
          >
            View Team Members
          </Link>
        </motion.div>
      </main>

      <footer className="w-full py-8 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">© 2024 TherapAIst. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Home</Link>
            <Link href="/session" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Session</Link>
            <Link href="/dashboard" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Dashboard</Link>
            <Link href="/contact" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}