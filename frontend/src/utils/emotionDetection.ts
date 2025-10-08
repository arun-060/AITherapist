// This is a simplified mock of emotion detection
// In a real application, this would use a machine learning model or API

// Define emotion types
export type Emotion = 'neutral' | 'happy' | 'sad' | 'anxious' | 'frustrated';

// Mock function to detect emotion from text
export function detectEmotionFromText(text: string): Emotion {
  // Convert text to lowercase for easier matching
  const lowerText = text.toLowerCase();
  
  // Simple keyword matching
  if (lowerText.includes('happy') || 
      lowerText.includes('joy') || 
      lowerText.includes('great') || 
      lowerText.includes('excited')) {
    return 'happy';
  }
  
  if (lowerText.includes('sad') || 
      lowerText.includes('depressed') || 
      lowerText.includes('unhappy') || 
      lowerText.includes('down')) {
    return 'sad';
  }
  
  if (lowerText.includes('anxious') || 
      lowerText.includes('worried') || 
      lowerText.includes('nervous') || 
      lowerText.includes('stress')) {
    return 'anxious';
  }
  
  if (lowerText.includes('angry') || 
      lowerText.includes('frustrated') || 
      lowerText.includes('annoyed') || 
      lowerText.includes('upset')) {
    return 'frustrated';
  }
  
  // Default to neutral if no keywords match
  return 'neutral';
}

// Mock function to detect emotion from facial expression
// In a real app, this would use computer vision APIs or models
export async function detectEmotionFromVideo(videoElement: HTMLVideoElement): Promise<Emotion> {
  // This is a placeholder that would normally process video frames
  // For demo purposes, we'll just return a random emotion
  
  // Simulate processing delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const emotions: Emotion[] = ['neutral', 'happy', 'sad', 'anxious', 'frustrated'];
  return emotions[Math.floor(Math.random() * emotions.length)];
}

// Helper function to get emotion color for UI
export function getEmotionColor(emotion: Emotion): string {
  switch(emotion) {
    case 'happy':
      return 'bg-green-500';
    case 'sad':
      return 'bg-blue-500';
    case 'anxious':
      return 'bg-yellow-500';
    case 'frustrated':
      return 'bg-red-500';
    default:
      return 'bg-gray-500';
  }
}

// Helper function to get emotion description
export function getEmotionDescription(emotion: Emotion): string {
  switch(emotion) {
    case 'happy':
      return 'You seem to be in a positive mood.';
    case 'sad':
      return 'You appear to be feeling down.';
    case 'anxious':
      return 'You might be experiencing some anxiety.';
    case 'frustrated':
      return 'You seem to be feeling frustrated.';
    default:
      return 'Your emotional state appears neutral.';
  }
}