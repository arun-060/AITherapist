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

export default function Terms() {
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
            Terms of Service
          </motion.h1>
          <motion.p 
            variants={fadeIn}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          >
            Please read these terms carefully before using TherapAIst
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="prose prose-lg dark:prose-invert max-w-none"
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-md mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">1. Agreement to Terms</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              By accessing or using TherapAIst, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this platform.
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              These Terms of Service apply to all users of the platform, including without limitation users who are browsers, researchers, students, and contributors of content.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-md mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">2. Academic Project Disclaimer</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              TherapAIst is a final year academic project and is provided for educational and research purposes only. It is not intended to be a substitute for professional medical advice, diagnosis, or treatment.
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              <strong>Important limitations:</strong>
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-600 dark:text-gray-300">
              <li>The AI therapist is not a licensed mental health professional</li>
              <li>The platform may not be continuously available beyond the academic project timeline</li>
              <li>The service is provided "as is" without warranties of any kind</li>
              <li>The emotion detection and response systems are experimental technologies</li>
            </ul>
            <p className="text-gray-600 dark:text-gray-300">
              Always seek the advice of qualified health providers with any questions you may have regarding medical or mental health conditions.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-md mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">3. User Responsibilities</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              As a user of TherapAIst, you agree to:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-600 dark:text-gray-300">
              <li>Provide accurate information during interactions with the platform</li>
              <li>Use the platform responsibly and for its intended purpose</li>
              <li>Not attempt to manipulate, hack, or disrupt the service</li>
              <li>Not use the platform to harm yourself or others</li>
              <li>Seek professional help for serious mental health concerns</li>
              <li>Not share access to your therapy sessions with others</li>
              <li>Report any technical issues or concerning responses from the AI</li>
            </ul>
            <p className="text-gray-600 dark:text-gray-300">
              In case of emergency or if you're experiencing thoughts of self-harm, please contact a crisis helpline or emergency services immediately.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-md mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">4. Intellectual Property</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              TherapAIst and its original content, features, and functionality are owned by the project team and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              As this is an academic project, certain components may be made available under open-source licenses. The specific licensing terms for such components will be provided separately.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-md mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">5. Data Usage and Research</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              By using TherapAIst, you acknowledge and agree that:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-600 dark:text-gray-300">
              <li>Anonymized data from your interactions may be used for academic research purposes</li>
              <li>Such research may be published in academic journals or presented at conferences</li>
              <li>All published research will maintain user anonymity and confidentiality</li>
              <li>You can request the deletion of your data at any time (subject to academic research requirements)</li>
            </ul>
            <p className="text-gray-600 dark:text-gray-300">
              For more details on how we collect, use, and protect your data, please refer to our <Link href="/privacy" className="text-blue-600 dark:text-blue-400 hover:underline">Privacy Policy</Link>.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-md mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">6. Limitation of Liability</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              To the fullest extent permitted by applicable law, the project team and its members shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-600 dark:text-gray-300">
              <li>Your access to or use of or inability to access or use the service</li>
              <li>Any conduct or content of any third party on the service</li>
              <li>Any content obtained from the service</li>
              <li>Unauthorized access, use, or alteration of your transmissions or content</li>
            </ul>
            <p className="text-gray-600 dark:text-gray-300">
              This limitation applies whether the alleged liability is based on contract, tort, negligence, strict liability, or any other basis, even if we have been advised of the possibility of such damage.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-md mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">7. Modifications to Terms</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days' notice prior to any new terms taking effect.
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              By continuing to access or use our platform after those revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, please stop using the platform.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">8. Contact Us</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              If you have any questions about these Terms, please contact us:
            </p>
            <ul className="list-none mb-4 text-gray-600 dark:text-gray-300">
              <li><strong>By email:</strong> terms@therapaist-project.edu</li>
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
            <Link href="/privacy" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Privacy</Link>
            <Link href="/contact" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}