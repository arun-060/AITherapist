'use client';

import { useState, useEffect } from 'react';
import { Emotion } from '@/utils/emotionDetection';

type EmotionCount = Record<Emotion, number>;

type SessionData = {
  sessionId: string;
  startTime: Date;
  endTime?: Date;
  messageCount: number;
  emotionCounts: EmotionCount;
  averageResponseTime: number; // in milliseconds
};

type SessionAnalyticsProps = {
  sessionId: string;
  messages: { text: string; sender: 'user' | 'ai'; emotion?: string; timestamp?: Date }[];
  onSessionEnd?: (data: SessionData) => void;
};

export default function SessionAnalytics({ sessionId, messages, onSessionEnd }: SessionAnalyticsProps) {
  const [sessionData, setSessionData] = useState<SessionData>({
    sessionId,
    startTime: new Date(),
    messageCount: 0,
    emotionCounts: {
      neutral: 0,
      happy: 0,
      sad: 0,
      anxious: 0,
      frustrated: 0
    },
    averageResponseTime: 0
  });

  // Update analytics when messages change
  useEffect(() => {
    if (messages.length === 0) return;

    // Calculate message count by sender
    const userMessages = messages.filter(m => m.sender === 'user');
    const aiMessages = messages.filter(m => m.sender === 'ai');
    
    // Count emotions
    const emotionCounts: EmotionCount = {
      neutral: 0,
      happy: 0,
      sad: 0,
      anxious: 0,
      frustrated: 0
    };
    
    messages.forEach(message => {
      if (message.emotion && Object.keys(emotionCounts).includes(message.emotion)) {
        emotionCounts[message.emotion as Emotion]++;
      }
    });
    
    // Calculate average response time (if timestamps are available)
    let totalResponseTime = 0;
    let responseCount = 0;
    
    for (let i = 1; i < messages.length; i++) {
      const prevMessage = messages[i-1];
      const currentMessage = messages[i];
      
      if (prevMessage.sender === 'user' && currentMessage.sender === 'ai' && 
          prevMessage.timestamp && currentMessage.timestamp) {
        const responseTime = currentMessage.timestamp.getTime() - prevMessage.timestamp.getTime();
        totalResponseTime += responseTime;
        responseCount++;
      }
    }
    
    const averageResponseTime = responseCount > 0 ? totalResponseTime / responseCount : 0;
    
    // Update session data
    setSessionData(prev => ({
      ...prev,
      messageCount: messages.length,
      emotionCounts,
      averageResponseTime
    }));
  }, [messages, sessionId]);

  // Handle session end
  useEffect(() => {
    return () => {
      if (onSessionEnd) {
        const finalData = {
          ...sessionData,
          endTime: new Date()
        };
        onSessionEnd(finalData);
      }
    };
  }, [sessionData, onSessionEnd]);

  // This component doesn't render anything visible
  return null;
}

// Helper function to save session data to localStorage
export function saveSessionData(data: SessionData): void {
  try {
    // Get existing sessions or initialize empty array
    const existingSessions = JSON.parse(localStorage.getItem('therapist_sessions') || '[]');
    
    // Add new session data
    existingSessions.push({
      ...data,
      startTime: data.startTime.toISOString(),
      endTime: data.endTime ? data.endTime.toISOString() : null
    });
    
    // Save back to localStorage
    localStorage.setItem('therapist_sessions', JSON.stringify(existingSessions));
  } catch (error) {
    console.error('Error saving session data:', error);
  }
}

// Helper function to get all session data
export function getAllSessionData(): SessionData[] {
  try {
    const sessions = JSON.parse(localStorage.getItem('therapist_sessions') || '[]');
    
    // Convert ISO strings back to Date objects
    return sessions.map((session: any) => ({
      ...session,
      startTime: new Date(session.startTime),
      endTime: session.endTime ? new Date(session.endTime) : undefined
    }));
  } catch (error) {
    console.error('Error retrieving session data:', error);
    return [];
  }
}