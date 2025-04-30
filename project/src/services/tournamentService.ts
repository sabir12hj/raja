import { Tournament } from '../types';

// Mock database - in a real app, these would be API calls
const mockTournaments: Tournament[] = [
  {
    id: '1',
    title: 'Weekend Ludo Championship',
    description: 'Compete with the best Ludo players and win big prizes!',
    startTime: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
    maxPlayers: 4,
    playerCount: 2,
    entryFee: 50,
    prizePool: 175,
    status: 'upcoming'
  },
  {
    id: '2',
    title: 'Ludo Pro Tournament',
    description: 'For experienced players only. Higher stakes, bigger rewards!',
    startTime: new Date(Date.now() + 172800000).toISOString(), // Day after tomorrow
    maxPlayers: 4,
    playerCount: 1,
    entryFee: 100,
    prizePool: 350,
    status: 'upcoming'
  },
  {
    id: '3',
    title: 'Beginner Friendly Ludo',
    description: 'Perfect for new players. Learn as you play and win prizes!',
    startTime: new Date(Date.now() + 259200000).toISOString(), // 3 days later
    maxPlayers: 4,
    playerCount: 0,
    entryFee: 25,
    prizePool: 80,
    status: 'upcoming'
  },
  {
    id: '4',
    title: 'Live Tournament',
    description: 'Watch the ongoing tournament now!',
    startTime: new Date(Date.now() - 3600000).toISOString(), // Started 1 hour ago
    maxPlayers: 4,
    playerCount: 4,
    entryFee: 75,
    prizePool: 250,
    status: 'ongoing'
  },
  {
    id: '5',
    title: 'Completed Championship',
    description: 'This tournament has ended. See winners page for results.',
    startTime: new Date(Date.now() - 86400000).toISOString(), // Yesterday
    maxPlayers: 4,
    playerCount: 4,
    entryFee: 50,
    prizePool: 175,
    status: 'completed'
  }
];

// Get all tournaments
export const getTournaments = async (): Promise<Tournament[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 800));
  return mockTournaments;
};

// Get a single tournament by ID
export const getTournamentById = async (id: string): Promise<Tournament | null> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  const tournament = mockTournaments.find(t => t.id === id);
  return tournament || null;
};