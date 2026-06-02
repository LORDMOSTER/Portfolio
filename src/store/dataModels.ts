export interface ProjectData {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  assetPath?: string;
  status: 'active' | 'completed' | 'archived';
  metrics?: {
    latencyReduction?: string;
    users?: number;
    uptime?: string;
  };
}

export interface LeetCodeStats {
  username: string;
  solvedTotal: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  ranking: number;
  lastUpdated: string;
}

export interface AppState {
  projects: ProjectData[];
  leetcodeStats: LeetCodeStats | null;
  isLoading: boolean;
  error: string | null;
}

// Initial placeholder states
export const initialAppState: AppState = {
  projects: [
    {
      id: 'proj-001',
      title: 'Campus Canteen System',
      description: 'A comprehensive management platform streamlining campus dining operations with real-time order tracking, inventory management, and digital payments.',
      techStack: ['React', 'Node.js', 'Express', 'MongoDB'],
      githubUrl: 'https://github.com/LORDMOSTER/Campus-Canteen',
      status: 'completed',
      metrics: {
        users: 500,
        latencyReduction: '40%'
      }
    },
    {
      id: 'proj-002',
      title: 'Smart Wi-Fi Intrusion System',
      description: 'An intelligent intrusion detection system analyzing network traffic patterns to identify unauthorized access and potential security breaches in real-time.',
      techStack: ['FastAPI', 'React', 'Python', 'Machine Learning'],
      status: 'active',
      metrics: {
        uptime: '99.9%'
      }
    },
    {
      id: 'proj-003',
      title: 'AI Receptionist',
      description: 'A conversational AI agent designed to handle appointment scheduling, answer FAQs, and route calls autonomously using NLP.',
      techStack: ['Next.js', 'OpenAI API', 'WebSockets', 'TailwindCSS'],
      githubUrl: 'https://github.com/LORDMOSTER/AI-Receptionist',
      status: 'completed'
    },
    {
      id: 'proj-004',
      title: 'Krishi Route',
      description: 'An agricultural supply chain tracking application enhancing transparency and efficiency from farm to table.',
      techStack: ['React Native', 'Firebase', 'Google Maps API'],
      status: 'completed'
    }
  ],
  leetcodeStats: null,
  isLoading: false,
  error: null
};

// In a real implementation, you might use Zustand, Redux, or Context API.
// Here we're defining the shapes and initial baseline.
