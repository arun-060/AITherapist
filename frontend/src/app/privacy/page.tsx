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

export default function Privacy() {
  return (
    <div className="font-sans min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-black">
      <header className="w-full py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400">TherapAIst</Link>
        <nav className="flex space-x-4">
          <Link href="/" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Home</Link>
          <Link href="/about" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">About</Link>
          <Link href="/team" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Team</Link>
          <Link href="/research" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Research</Link>
          <Link href="/contact" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Contact</Link>
        </nav>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
            Privacy Policy
          </motion.h1>
          <motion.p 
            variants={fadeIn}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          >
            How we protect your data and privacy
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="prose prose-lg dark:prose-invert max-w-none"
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-md mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Introduction</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              At TherapAIst, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our AI-powered therapy platform. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the application.
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              We reserve the right to make changes to this Privacy Policy at any time and for any reason. We will alert you about any changes by updating the "Last updated" date of this Privacy Policy. You are encouraged to periodically review this Privacy Policy to stay informed of updates.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-md mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Information We Collect</h2>
            
            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Personal Data</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              When using our platform, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you. Personally identifiable information may include, but is not limited to:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-600 dark:text-gray-300">
              <li>Email address (for account creation and communication)</li>
              <li>First name and last name (optional)</li>
              <li>Usage data and session analytics</li>
            </ul>
            
            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Therapy Session Data</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              During therapy sessions, our platform collects:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-600 dark:text-gray-300">
              <li>Text messages exchanged with the AI therapist</li>
              <li>Emotion analysis data from facial expressions (processed locally)</li>
              <li>Session duration and interaction metrics</li>
            </ul>
            <p className="text-gray-600 dark:text-gray-300">
              <strong>Important:</strong> Video data is processed in real-time on your device and is not stored on our servers. Facial expression analysis happens locally to protect your privacy.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-md mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">How We Use Your Information</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              We use the collected data for various purposes:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-600 dark:text-gray-300">
              <li>To provide and maintain our Service</li>
              <li>To personalize your therapy experience</li>
              <li>To improve our AI algorithms and therapeutic responses</li>
              <li>To generate anonymized analytics and research insights</li>
              <li>To communicate with you about service updates or respond to inquiries</li>
              <li>To detect, prevent and address technical issues</li>
            </ul>
            <p className="text-gray-600 dark:text-gray-300">
              All data used for research and improvement purposes is anonymized and aggregated to protect individual privacy.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-md mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Data Security</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Our security measures include:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-600 dark:text-gray-300">
              <li>End-to-end encryption for all communications</li>
              <li>Local processing of video data to minimize privacy risks</li>
              <li>Secure, anonymized storage of conversation data</li>
              <li>Regular security audits and vulnerability testing</li>
              <li>Strict access controls for all systems and databases</li>
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-md mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Your Data Rights</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              As a user of TherapAIst, you have certain rights regarding your personal data:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-600 dark:text-gray-300">
              <li><strong>Right to Access</strong> - You have the right to request copies of your personal data.</li>
              <li><strong>Right to Rectification</strong> - You have the right to request that we correct any information you believe is inaccurate or complete information you believe is incomplete.</li>
              <li><strong>Right to Erasure</strong> - You have the right to request that we erase your personal data, under certain conditions.</li>
              <li><strong>Right to Restrict Processing</strong> - You have the right to request that we restrict the processing of your personal data, under certain conditions.</li>
              <li><strong>Right to Data Portability</strong> - You have the right to request that we transfer the data we have collected to another organization, or directly to you, under certain conditions.</li>
            </ul>
            <p className="text-gray-600 dark:text-gray-300">
              To exercise any of these rights, please contact us using the information provided in the Contact section.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-md mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Limitations for Academic Project</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              TherapAIst is a final year academic project and is not intended to replace professional mental health services. As such:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-600 dark:text-gray-300">
              <li>The platform is provided for educational and research purposes only</li>
              <li>Data collected may be used for academic research with appropriate anonymization</li>
              <li>The service may have limited availability beyond the academic project timeline</li>
            </ul>
            <p className="text-gray-600 dark:text-gray-300">
              We are committed to maintaining high standards of privacy and data protection despite these limitations.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Contact Us</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              If you have any questions about this Privacy Policy, please contact us:
            </p>
            <ul className="list-none mb-4 text-gray-600 dark:text-gray-300">
              <li><strong>By email:</strong> privacy@therapaist-project.edu</li>
              <li><strong>By visiting this page on our website:</strong> <Link href="/contact" className="text-blue-600 dark:text-blue-400 hover:underline">Contact Page</Link></li>
            </ul>
            <p className="text-gray-600 dark:text-gray-300 italic">
              Last updated: May 15, 2024
            </p>
          </div>
        </motion.div>
      </main>

      <footer className="w-full py-8 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">© 2024 TherapAIst. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Home</Link>
            <Link href="/about" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">About</Link>
            <Link href="/terms" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Terms</Link>
            <Link href="/contact" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}