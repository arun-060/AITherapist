This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

# TherapAIst - AI-Powered Emotional Therapy Assistant

TherapAIst is an MVP (Minimum Viable Product) for an AI-powered emotional therapy assistant that provides empathetic support through video interaction. This application uses Next.js, TypeScript, and Tailwind CSS to create a modern, responsive web application.

## Features

- **Landing Page**: Introduces the application and its key features
- **Video Therapy Session**: Real-time video interface with AI therapist
- **AI Therapist Engine**: Simulated AI responses based on user input
- **Emotion Detection**: Basic emotion analysis from text and simulated video detection
- **Analytics Dashboard**: Track session data and emotion trends

## Tech Stack

- **Frontend**: Next.js with TypeScript and Tailwind CSS
- **State Management**: React useState and useEffect hooks
- **API Routes**: Next.js API routes for backend functionality
- **Analytics**: Client-side analytics with localStorage

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
src/
├── app/                  # Next.js App Router
│   ├── api/              # API routes
│   │   └── therapist/    # AI therapist API
│   ├── dashboard/        # Analytics dashboard
│   ├── session/          # Video therapy session
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Landing page
├── components/           # React components
│   └── analytics/        # Analytics components
└── utils/                # Utility functions
    └── emotionDetection.ts # Emotion detection utilities
```

## MVP Scope

This MVP focuses on demonstrating the core functionality of the AI therapist concept:

1. **User Interface**: Clean, intuitive interface for therapy sessions
2. **Video Integration**: Basic video capture functionality
3. **AI Interaction**: Simulated AI responses based on detected emotions
4. **Emotion Analysis**: Simple text-based emotion detection with simulated video analysis
5. **Session Tracking**: Basic analytics for session data

## Future Enhancements

- Integration with real AI models for more sophisticated responses
- Advanced emotion detection using computer vision and machine learning
- User accounts and authentication
- Session history and progress tracking
- Mobile application
- Integration with professional therapy resources

