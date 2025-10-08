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

const teamMembers = [
  {
    name: 'Alex Johnson',
    role: 'Project Lead & AI Developer',
    bio: 'Alex specializes in machine learning and natural language processing, with a focus on emotional intelligence in AI systems.',
    image: '/team/alex.jpg'
  },
  {
    name: 'Samantha Chen',
    role: 'Frontend Developer',
    bio: 'Samantha is passionate about creating intuitive user interfaces and has expertise in React and modern web technologies.',
    image: '/team/samantha.jpg'
  },
  {
    name: 'Dr. Michael Rivera',
    role: 'Psychology Consultant',
    bio: 'Dr. Rivera brings clinical psychology expertise to ensure the AI responses align with therapeutic best practices.',
    image: '/team/michael.jpg'
  },
  {
    name: 'Priya Patel',
    role: 'Computer Vision Specialist',
    bio: 'Priya developed the emotion detection algorithms that analyze facial expressions in real-time video.',
    image: '/team/priya.jpg'
  },
  {
    name: 'James Wilson',
    role: 'Backend Developer',
    bio: 'James architected the system infrastructure, ensuring secure data handling and efficient API responses.',
    image: '/team/james.jpg'
  },
  {
    name: 'Olivia Martinez',
    role: 'UX Researcher',
    bio: 'Olivia conducted user testing and gathered feedback to refine the therapeutic experience and interface.',
    image: '/team/olivia.jpg'
  }
];

export default function Team() {
  return (
    <div className="font-sans min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-black">
      <header className="w-full py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400">TherapAIst</Link>
        <nav className="flex space-x-4">
          <Link href="/" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Home</Link>
          <Link href="/about" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">About</Link>
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
            Our Team
          </motion.h1>
          <motion.p 
            variants={fadeIn}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          >
            Meet the talented individuals behind TherapAIst
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              whileHover={{ y: -5, boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)' }}
            >
              <div className="h-64 bg-gradient-to-r from-blue-400/20 to-purple-400/20 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-24 w-24 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{member.name}</h3>
                <p className="text-blue-600 dark:text-blue-400 font-medium mb-4">{member.role}</p>
                <p className="text-gray-600 dark:text-gray-300">{member.bio}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-xl p-8 mb-12"
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white text-center">Project Supervision</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white/80 dark:bg-gray-800/80 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Academic Supervisor</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                <strong>Prof. Sarah Thompson</strong> - Department of Computer Science
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Prof. Thompson provided guidance on the technical implementation and research methodology, ensuring the project met academic standards while pushing the boundaries of AI applications in mental health.
              </p>
            </div>
            
            <div className="bg-white/80 dark:bg-gray-800/80 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Industry Advisor</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                <strong>Dr. Robert Chen</strong> - Chief Innovation Officer, MindTech Solutions
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Dr. Chen offered valuable insights from an industry perspective, helping the team align their academic research with practical applications and ethical considerations in digital mental health services.
              </p>
            </div>
          </div>
        </motion.div> */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="text-center"
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Interested in Collaboration?</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            We're always open to collaborating with researchers, developers, and mental health professionals who share our vision of making mental health support more accessible through technology.
          </p>
          
          <Link 
            href="/contact"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Get in Touch
          </Link>
        </motion.div>
      </main>

      <footer className="w-full py-8 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">© 2024 TherapAIst. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Home</Link>
            <Link href="/about" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">About</Link>
            <Link href="/session" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Session</Link>
            <Link href="/dashboard" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Dashboard</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}