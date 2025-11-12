# 30 Days Later - Development Plan

## Project Overview
A real-time interactive story experience that generates personalized video content showing the user's life "30 days later" based on their current situation and choices. The AI director creates evolving scenarios while users can influence the narrative through prompts.

## System Architecture

### Core Components

#### 1. Director Agent (AI Story Engine)
- **Purpose**: Creates and manages the 30-day narrative arc
- **Technology**: LLM (GPT-4/Claude) with structured prompting
- **Responsibilities**:
  - Generate daily scenarios based on user memory
  - Maintain story consistency and progression
  - Adapt to user interventions
  - Time-based scenario triggering

#### 2. Memory System
- **Purpose**: Store and retrieve user context for personalized storytelling
- **Technology**: Supermemory API for structured user memory management
- **Data Structure**:
  - Personal details (age, occupation, relationships)
  - Current life situation
  - Goals and aspirations
  - Previous choices and outcomes
  - Personality traits
  - Contextual memories from user interactions

#### 3. Video Generation Engine
- **Purpose**: Real-time video creation based on scenarios
- **Technology**: 
  - Primary: Sora 2 API
  - Fallback: Static image generation + text overlays
- **Features**:
  - Scene-based generation
  - Character consistency
  - Time-of-day appropriate visuals
  - High-quality cinematic output

#### 4. User Interface
- **Purpose**: Video playback and user interaction
- **Technology**: React.js with video streaming
- **Components**:
  - Video player (full-screen capable)
  - Prompt input box
  - Day counter/timeline
  - Settings panel

#### 5. Backend API
- **Purpose**: Coordinate all components
- **Technology**: Node.js/Express or Python/FastAPI
- **Endpoints**:
  - `/api/story/current` - Get current day scenario
  - `/api/story/prompt` - Submit user prompt
  - `/api/video/generate` - Request video generation
  - `/api/memory/add` - Add memory to Supermemory
  - `/api/memory/search` - Query relevant memories

### Data Flow
```
User Input → Supermemory API → Director Agent → Video Generation → UI Display
     ↓              ↑              ↓               ↓
Time Trigger → Memory Search → Scenario Creation → Sora 2 Stream
```

## System Use Cases

### Primary Use Cases

#### 1. Initial Setup
- User provides basic information (name, age, current situation)
- System stores initial data in Supermemory
- Director queries Supermemory and generates first scenario for "Day 1"

#### 2. Daily Progression
- System automatically advances to next day at real-time intervals
- Director creates new scenario based on previous day's events
- Video generation starts automatically
- User views the day's outcome

#### 3. User Intervention
- User submits custom prompt during any day
- Director incorporates prompt into current or future scenarios
- Supermemory stores user preferences and choices
- Story adapts to maintain coherence

#### 4. Memory Evolution
- Supermemory learns from user choices and prompts
- Personality profile becomes more accurate over time
- Story becomes increasingly personalized through contextual memory

### Secondary Use Cases

#### 5. Story Branching
- Major decisions create alternative timelines
- User can explore "what-if" scenarios
- Multiple endings based on cumulative choices

#### 6. Social Features (Future)
- Share interesting days with friends
- Compare different life trajectories
- Collaborative storytelling

## Technical Implementation Strategy

### Phase 1: UI Foundation (25 minutes)
1. Create responsive video player interface
2. Design and implement prompt input box
3. Add day counter and timeline UI
4. Basic navigation and controls
5. Placeholder video content for testing

### Phase 2: Story Integration (25 minutes)
1. Implement Director Agent with LLM API
2. Integrate Supermemory API for user memory
3. Connect story generation to UI
4. Add user prompt processing with memory updates
5. Day progression logic with memory queries

### Phase 3: Video & Polish (10 minutes)
1. Integrate Sora 2 API for video generation
2. Connect generated videos to player
3. Test end-to-end flow
4. Demo preparation and final polish

## Technology Stack

### Frontend
- **React.js** - Component-based UI
- **Tailwind CSS** - Rapid styling
- **Framer Motion** - Animations
- **Video.js** - Video player

### Backend
- **Node.js/Express** - API server
- **OpenAI API** - Story generation
- **Sora 2 API** - Video generation
- **Supermemory API** - User memory management

### Deployment
- **Vercel/Netlify** - Frontend hosting
- **Railway/Render** - Backend hosting

## Demo Features Showcase

### Key Features to Demonstrate
1. **Personalized Storytelling**: Show how AI adapts to user input
2. **Real-time Video**: Generate and display video for current scenario
3. **Memory Integration**: Demonstrate how past choices affect future scenarios
4. **User Intervention**: Show prompt system changing story direction
5. **Time Progression**: Display automatic day advancement

### Demo Scenario
- User: "College student worried about future career"
- Day 1: Job interview scenario
- User prompt: "I want to start my own company"
- Days 2-5: Entrepreneurship journey with challenges and successes
- Show how memory system tracks progression

## File Structure
```
30-days-later/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   └── utils/
│   └── public/
├── backend/
│   ├── routes/
│   ├── services/
│   └── utils/
├── data/
│   └── memory/
└── docs/
```

## Success Metrics for Demo
- Story coherence across multiple days
- Successful video generation and playback
- Responsive user prompt integration
- Seamless day progression
- Engaging user experience

## Risk Mitigation
- **Video Generation Latency**: Prepare pre-generated content as fallback
- **API Rate Limits**: Implement caching and error handling
- **Story Coherence**: Use structured prompting and memory validation
- **Performance**: Optimize video loading and playback

## Timeline (60 minutes total)
- **0-5 min**: Project setup and basic structure
- **5-30 min**: UI development (video player, prompt box, timeline)
- **30-55 min**: Story system integration (Director Agent, Supermemory, prompts)
- **55-60 min**: Sora 2 integration and final demo polish

This plan prioritizes a working demo that showcases the core concept while being achievable within the hackathon timeframe.