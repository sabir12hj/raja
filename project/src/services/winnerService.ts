import { Winner } from '../types';

// Mock winners data
const mockWinners: Winner[] = [
  {
    id: '1',
    userId: 'user123',
    userName: 'Priya Sharma',
    tournamentId: '5',
    gameId: 'GAME58392',
    prizeAmount: 100,
    winDate: new Date(Date.now() - 86400000).toISOString() // Yesterday
  },
  {
    id: '2',
    userId: 'user456',
    userName: 'Rahul Kumar',
    tournamentId: '3',
    gameId: 'GAME64728',
    prizeAmount: 50,
    winDate: new Date(Date.now() - 172800000).toISOString() // 2 days ago
  },
  {
    id: '3',
    userId: 'user789',
    userName: 'Amit Patel',
    tournamentId: '2',
    gameId: 'GAME92847',
    prizeAmount: 200,
    winDate: new Date(Date.now() - 259200000).toISOString() // 3 days ago
  },
  {
    id: '4',
    userId: 'user101',
    userName: 'Sneha Gupta',
    tournamentId: '1',
    gameId: 'GAME38471',
    prizeAmount: 75,
    winDate: new Date(Date.now() - 345600000).toISOString() // 4 days ago
  },
  {
    id: '5',
    userId: 'user202',
    userName: 'Vikram Singh',
    tournamentId: '4',
    gameId: 'GAME74619',
    prizeAmount: 150,
    winDate: new Date(Date.now() - 432000000).toISOString() // 5 days ago
  }
];

// Get all winners
export const getWinners = async (): Promise<Winner[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 800));
  return mockWinners;
};