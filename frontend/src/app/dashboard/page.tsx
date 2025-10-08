'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getAllSessionData } from '@/components/analytics/SessionAnalytics';
import { getEmotionColor } from '@/utils/emotionDetection';

export default function DashboardPage() {
  const [sessions, setSessions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load session data from localStorage
    const sessionData = getAllSessionData();
    setSessions(sessionData);
    setLoading(false);
  }, []);

  // Calculate total stats
  const totalSessions = sessions.length;
  const totalMessages = sessions.reduce((sum, session) => sum + session.messageCount, 0);
  const averageSessionDuration = sessions.length > 0 
    ? sessions.reduce((sum, session) => {
        if (!session.endTime) return sum;
        return sum + (new Date(session.endTime).getTime() - new Date(session.startTime).getTime());
      }, 0) / sessions.length / 60000 // Convert to minutes
    : 0;

  // Calculate emotion distribution
  const emotionCounts = sessions.reduce((counts, session) => {
    Object.entries(session.emotionCounts).forEach(([emotion, count]) => {
      counts[emotion] = (counts[emotion] || 0) + (count as number);
    });
    return counts;
  }, {} as Record<string, number>);

  const totalEmotions = Object.values(emotionCounts).reduce((sum: number, count) => sum + (count as number), 0);
  const emotionPercentages = Object.entries(emotionCounts).map(([emotion, count]) => ({
    emotion,
    percentage: Number(totalEmotions) > 0 ? Math.round((Number(count) / Number(totalEmotions)) * 100) : 0
  }));

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm py-4 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-blue-600 dark:text-blue-400">
            TherapAIst
          </Link>
          <Link 
            href="/session" 
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium"
          >
            New Session
          </Link>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Analytics Dashboard</h1>
        
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">Loading analytics data...</p>
          </div>
        ) : sessions.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 text-center">
            <p className="text-gray-500 dark:text-gray-400 mb-4">No session data available yet.</p>
            <Link 
              href="/session" 
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium"
            >
              Start Your First Session
            </Link>
          </div>
        ) : (
          <>
            {/* Summary cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Total Sessions</h3>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{totalSessions}</p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Total Messages</h3>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{totalMessages}</p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Avg. Session Duration</h3>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {averageSessionDuration.toFixed(1)} min
                </p>
              </div>
            </div>
            
            {/* Emotion distribution */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Emotion Distribution</h3>
              
              <div className="space-y-4">
                {emotionPercentages.map(({ emotion, percentage }) => (
                  <div key={emotion} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium capitalize">{emotion}</span>
                      <span>{percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                      <div 
                        className={`h-2.5 rounded-full ${getEmotionColor(emotion as any).replace('bg-', 'bg-')}`} 
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Session history */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white p-6 border-b border-gray-200 dark:border-gray-700">
                Session History
              </h3>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-900">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Session ID
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Duration
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Messages
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Primary Emotion
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {sessions.map((session, index) => {
                      // Calculate session duration
                      const duration = session.endTime 
                        ? Math.round((new Date(session.endTime).getTime() - new Date(session.startTime).getTime()) / 60000) 
                        : 0;
                      
                      // Find primary emotion
                      const primaryEmotion = Object.entries(session.emotionCounts)
                        .reduce<{ emotion: string; count: number }>((max, [emotion, count]) => 
                          (count as number) > max.count ? { emotion, count: count as number } : max, 
                          { emotion: 'neutral', count: 0 });
                      
                      return (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                            {session.sessionId.substring(0, 8)}...
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {new Date(session.startTime).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {duration} min
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {session.messageCount}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            <span className="capitalize">{primaryEmotion.emotion}</span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}