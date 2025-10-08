import { NextResponse } from 'next/server';
import { detectEmotionFromText, type Emotion } from '@/utils/emotionDetection';

// Mock emotions for demo purposes
const emotions: Emotion[] = ['neutral', 'happy', 'sad', 'anxious', 'frustrated'];

// Mock responses based on emotions
const emotionResponses: Record<string, string[]> = {
  neutral: [
    "Thank you for sharing. Could you tell me more about how that makes you feel?",
    "I understand. How long have you been feeling this way?",
    "That's interesting. What thoughts come up for you when you experience this?"
  ],
  happy: [
    "I'm glad you're feeling positive! What's contributing to your happiness today?",
    "It's wonderful to hear you're in good spirits. What activities have been bringing you joy?",
    "That positive energy comes through clearly. How can we build on these good feelings?"
  ],
  sad: [
    "I notice you might be feeling down. Would you like to talk about what's troubling you?",
    "I'm sorry to hear you're feeling sad. Remember that it's okay to experience these emotions.",
    "When you feel this sadness, where do you notice it in your body? Sometimes being aware of physical sensations can help us process emotions."
  ],
  anxious: [
    "It seems like you might be experiencing some anxiety. Let's try a quick breathing exercise together.",
    "Anxiety can be challenging. What typically helps you when you're feeling this way?",
    "I notice some signs of worry. Can you identify what specific concerns are on your mind right now?"
  ],
  frustrated: [
    "I sense some frustration. Sometimes naming what's bothering us can help us process it better.",
    "Feeling frustrated is completely valid. What would be most helpful for you right now?",
    "When you feel this frustration, what would you like to change about the situation?"
  ]
};

export async function POST(request: Request) {
  try {
    const { message, currentEmotion } = await request.json();
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Detect emotion from the message text
    // If currentEmotion is provided, we'll use that instead (simulating video detection)
    const detectedEmotion = currentEmotion || detectEmotionFromText(message);
    
    // Get appropriate responses for the emotion
    const possibleResponses = emotionResponses[detectedEmotion] || emotionResponses.neutral;
    
    // Select a random response from the possible ones
    const responseText = possibleResponses[Math.floor(Math.random() * possibleResponses.length)];
    
    return NextResponse.json({
      response: responseText,
      detectedEmotion: detectedEmotion
    });
  } catch (error) {
    console.error('Error processing therapist response:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}