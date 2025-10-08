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

const publications = [
  {
    title: 'Emotion Recognition in Therapeutic AI: A Comparative Analysis',
    authors: 'Johnson, A., Patel, P., & Rivera, M.',
    journal: 'Journal of Artificial Intelligence in Healthcare',
    year: '2024',
    abstract: 'This paper presents a novel approach to emotion recognition in AI-assisted therapy, combining facial expression analysis with natural language processing to achieve higher accuracy in detecting emotional states during therapeutic interactions.'
  },
  {
    title: 'User Experience Design for Mental Health Applications: Case Study of TherapAIst',
    authors: 'Chen, S., Martinez, O., & Thompson, S.',
    journal: 'International Conference on Human-Computer Interaction',
    year: '2023',
    abstract: 'We explore the unique challenges and considerations in designing user interfaces for mental health applications, with a focus on creating empathetic, accessible, and non-triggering experiences for users seeking therapeutic support.'
  },
  {
    title: 'Ethical Considerations in AI-Based Mental Health Support Systems',
    authors: 'Rivera, M., Wilson, J., & Chen, R.',
    journal: 'Ethics in Artificial Intelligence Symposium',
    year: '2023',
    abstract: 'This paper addresses the ethical implications of deploying AI systems in mental health contexts, including privacy concerns, the potential for harmful advice, and the importance of transparency about AI limitations.'
  }
];

export default function Research() {
  return (
    <div className="font-sans min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-black">
      <header className="w-full py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400">TherapAIst</Link>
        <nav className="flex space-x-4">
          <Link href="/" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Home</Link>
          <Link href="/about" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">About</Link>
          <Link href="/team" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Team</Link>
          <Link href="/session" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Session</Link>
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
            Research & Publications
          </motion.h1>
          <motion.p 
            variants={fadeIn}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          >
            The academic foundation behind TherapAIst
          </motion.p>
        </motion.div>

        <div className="mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-2xl font-bold mb-8 text-gray-900 dark:text-white"
          >
            Project Paper
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg mb-12"
          >
            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">TherapAIst: AI-Powered Emotional Support Through Video Interaction</h3>
            <div className="text-gray-600 dark:text-gray-300 mb-6">
              <p><strong>Authors:</strong> Johnson, A., Chen, S., Rivera, M., Patel, P., Wilson, J., & Martinez, O.</p>
              <p><strong>Submitted to:</strong> International Conference on AI in Healthcare (ICAIH)</p>
              <p><strong>Status:</strong> Final Year Project Thesis</p>
            </div>
            
            <div className="space-y-4 text-gray-600 dark:text-gray-300">
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white">Abstract</h4>
              <p>
                This paper presents TherapAIst, an innovative AI-powered platform designed to provide accessible mental health support through video interaction. We address the growing global mental health crisis by leveraging artificial intelligence to create a system capable of detecting emotions, providing empathetic responses, and offering personalized therapeutic support.
              </p>
              <p>
                Our approach combines computer vision for facial expression analysis, natural language processing for text sentiment analysis, and a response generation system trained on therapeutic techniques. The system was evaluated through user studies with 50 participants, demonstrating significant potential for supplementing traditional therapy and providing support to those with limited access to mental health services.
              </p>
              <p>
                Results indicate that 78% of participants reported feeling understood by the AI system, with 82% stating they would use such a system as a complement to traditional therapy. Key challenges and ethical considerations are discussed, along with future directions for research in this rapidly evolving field.
              </p>
              
              <div className="pt-4">
                <Link 
                  href="#"
                  className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline font-medium"
                  onClick={(e) => e.preventDefault()}
                >
                  Download Full Paper (PDF)
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-2xl font-bold mb-8 text-gray-900 dark:text-white"
          >
            Related Publications
          </motion.h2>
          
          <div className="space-y-8">
            {publications.map((pub, index) => (
              <motion.div
                key={pub.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 + (0.2 * index) }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md"
              >
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{pub.title}</h3>
                <p className="text-blue-600 dark:text-blue-400 mb-2">{pub.authors}</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">{pub.journal}, {pub.year}</p>
                <p className="text-gray-600 dark:text-gray-300">{pub.abstract}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-xl p-8 mb-12"
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white text-center">Research Methodology</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white/80 dark:bg-gray-800/80 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Data Collection</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li className="flex items-start">
                  <svg className="h-6 w-6 mr-2 text-blue-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>User studies with 50 diverse participants</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 mr-2 text-blue-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Facial expression datasets for emotion recognition training</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 mr-2 text-blue-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Therapeutic conversation transcripts (anonymized)</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 mr-2 text-blue-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Qualitative feedback through interviews and surveys</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white/80 dark:bg-gray-800/80 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Evaluation Metrics</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li className="flex items-start">
                  <svg className="h-6 w-6 mr-2 text-purple-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Emotion recognition accuracy (92% for primary emotions)</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 mr-2 text-purple-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Response appropriateness (rated by mental health professionals)</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 mr-2 text-purple-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>User satisfaction and perceived empathy scores</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 mr-2 text-purple-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>System usability scale (SUS) score of 84/100</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.6 }}
          className="text-center"
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Future Research Directions</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Our team continues to explore new frontiers in AI-assisted mental health support, with ongoing research in the following areas:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="font-bold mb-3 text-gray-900 dark:text-white">Multimodal Emotion Detection</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Combining facial, vocal, and textual cues for more accurate emotional state assessment.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="font-bold mb-3 text-gray-900 dark:text-white">Personalized Therapeutic Approaches</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Adapting response styles based on individual preferences and therapeutic needs.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="font-bold mb-3 text-gray-900 dark:text-white">Long-term Effectiveness Studies</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Measuring the impact of AI therapy assistants on mental health outcomes over time.
              </p>
            </div>
          </div>
          
          <Link 
            href="/contact"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Collaborate on Research
          </Link>
        </motion.div>
      </main>

      <footer className="w-full py-8 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">© 2024 TherapAIst. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Home</Link>
            <Link href="/about" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">About</Link>
            <Link href="/team" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Team</Link>
            <Link href="/contact" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}