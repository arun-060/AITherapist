'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { detectEmotionFromVideo, getEmotionColor, getEmotionDescription, type Emotion } from '@/utils/emotionDetection';
import SessionAnalytics, { saveSessionData } from '@/components/analytics/SessionAnalytics';

export default function SessionPage() {
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [sessionId, setSessionId] = useState<string>('');
  const [messages, setMessages] = useState<{ text: string; sender: 'user' | 'ai'; emotion?: string; timestamp?: Date }[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [detectedEmotion, setDetectedEmotion] = useState<Emotion | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Interval for emotion detection
  const [emotionDetectionInterval, setEmotionDetectionInterval] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Scroll to bottom of messages
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Start camera and emotion detection when session becomes active
  useEffect(() => {
    if (isSessionActive && videoRef.current) {
      startCamera();
      
      // Start emotion detection at intervals
      const interval = setInterval(async () => {
        if (videoRef.current) {
          try {
            const emotion = await detectEmotionFromVideo(videoRef.current);
            setDetectedEmotion(emotion);
          } catch (error) {
            console.error('Error detecting emotion:', error);
          }
        }
      }, 3000); // Check emotion every 3 seconds
      
      setEmotionDetectionInterval(interval);
    }
    
    return () => {
      // Clean up video stream and interval when component unmounts
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
      
      if (emotionDetectionInterval) {
        clearInterval(emotionDetectionInterval);
      }
    };
  }, [isSessionActive]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
      // Add fallback or error message for users
      setMessages(prev => [...prev, { 
        text: 'Unable to access camera. Please check your permissions and try again.', 
        sender: 'ai' 
      }]);
    }
  };

  const startSession = () => {
    // Generate a unique session ID
    const newSessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substring(2, 9);
    setSessionId(newSessionId);
    setIsSessionActive(true);
    setMessages([{ 
      text: 'Hello! I\'m your AI therapist. How are you feeling today?', 
      sender: 'ai',
      timestamp: new Date()
    }]);
  };

  const endSession = () => {
    // Stop camera
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    
    // Clear emotion detection interval
    if (emotionDetectionInterval) {
      clearInterval(emotionDetectionInterval);
      setEmotionDetectionInterval(null);
    }
    
    setIsSessionActive(false);
    setMessages([]);
    setDetectedEmotion(null);
  };

  const handleSendMessage = async () => {
    if (!currentMessage.trim()) return;
    
    // Add user message with timestamp
    const userMessage = currentMessage;
    const userMessageTimestamp = new Date();
    setMessages(prev => [...prev, { 
      text: userMessage, 
      sender: 'user',
      timestamp: userMessageTimestamp
    }]);
    setCurrentMessage('');
    
    try {
      // Call the API route
      const response = await fetch('/api/therapist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          currentEmotion: detectedEmotion
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to get AI response');
      }
      
      const data = await response.json();
      
      // Update the detected emotion
      setDetectedEmotion(data.detectedEmotion);
      
      // Add AI response to messages with timestamp
      setMessages(prev => [...prev, { 
        text: data.response, 
        sender: 'ai', 
        emotion: data.detectedEmotion,
        timestamp: new Date()
      }]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      setMessages(prev => [...prev, { 
        text: 'Sorry, I encountered an issue. Please try again.', 
        sender: 'ai' 
      }]);
    }
  };

  // Handle session end and save analytics
  const handleSessionEnd = (sessionData: any) => {
    saveSessionData(sessionData);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* Analytics component (invisible) */}
      {isSessionActive && sessionId && (
        <SessionAnalytics 
          sessionId={sessionId}
          messages={messages}
          onSessionEnd={handleSessionEnd}
        />
      )}
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm py-4 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-xl font-bold text-blue-600 dark:text-blue-400">
              TherapAIst
            </Link>
            <Link href="/dashboard" className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
              Dashboard
            </Link>
          </div>
          {isSessionActive && (
            <button 
              onClick={endSession}
              className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
            >
              End Session
            </button>
          )}
        </div>
      </header>

      {/* Main content */}
      <main className="flex-grow flex flex-col md:flex-row p-4 md:p-6 gap-4 max-w-7xl mx-auto w-full">
        {/* Left side - Video */}
        <div className="w-full md:w-1/2 flex flex-col">
          <div className="bg-black rounded-lg overflow-hidden aspect-video relative flex items-center justify-center">
            {isSessionActive ? (
              <video 
                ref={videoRef} 
                autoPlay 
                muted 
                playsInline
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-center p-8">
                <div className="mb-4 text-gray-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-white mb-2">Start Your Therapy Session</h3>
                <p className="text-gray-400 mb-6">Connect with your AI therapist through video</p>
                <button 
                  onClick={startSession}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full transition-colors"
                >
                  Begin Session
                </button>
              </div>
            )}
          </div>
          
          {/* Emotion detection panel */}
          {isSessionActive && (
            <div className="mt-4 bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Detected Emotion</h3>
              <div className="flex items-center">
                <div className={`w-3 h-3 rounded-full mr-2 ${detectedEmotion ? getEmotionColor(detectedEmotion) : 'bg-gray-300'}`}></div>
                <span className="font-medium">
                  {detectedEmotion ? detectedEmotion.charAt(0).toUpperCase() + detectedEmotion.slice(1) : 'Analyzing...'}
                </span>
              </div>
              {detectedEmotion && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  {getEmotionDescription(detectedEmotion)}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Right side - Chat */}
        <div className="w-full md:w-1/2 flex flex-col bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
          {isSessionActive ? (
            <>
              <div className="flex-grow p-4 overflow-y-auto">
                <div className="space-y-4">
                  {messages.map((message, index) => (
                    <div 
                      key={index} 
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div 
                        className={`max-w-[80%] rounded-lg px-4 py-2 ${message.sender === 'user' 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
                      >
                        <p>{message.text}</p>
                        {message.emotion && (
                          <span className="text-xs opacity-70 mt-1 block">
                            Detected: {message.emotion}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700 p-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={currentMessage}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type your message..."
                    className="flex-grow px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-full bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={handleSendMessage}
                    className="p-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-grow flex items-center justify-center p-8 text-center">
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-2">Chat with Your AI Therapist</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Start a session to begin your conversation
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}