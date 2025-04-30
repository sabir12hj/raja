import { Tournament, User, Winner } from '../types';

// Mock stats data
export const getTournamentStats = async () => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return {
    totalUsers: 147,
    activeUsers: 89,
    totalTournaments: 24,
    upcomingTournaments: 8,
    totalRevenue: 12500,
    totalPrizes: 9800
  };
};

// Mock user data
const mockUsers: User[] = [
  {
    id: 'user123',
    email: 'priya.sharma@example.com',
    name: 'Priya Sharma',
    upiId: 'priya@upi',
    isActive: true,
    createdAt: new Date(Date.now() - 2592000000).toISOString() // 30 days ago
  },
  {
    id: 'user456',
    email: 'rahul.kumar@example.com',
    name: 'Rahul Kumar',
    upiId: 'rahul@upi',
    isActive: true,
    createdAt: new Date(Date.now() - 1728000000).toISOString() // 20 days ago
  },
  {
    id: 'user789',
    email: 'amit.patel@example.com',
    name: 'Amit Patel',
    upiId: 'amit@upi',
    isActive: false,
    createdAt: new Date(Date.now() - 864000000).toISOString() // 10 days ago
  },
  {
    id: 'user101',
    email: 'sneha.gupta@example.com',
    name: 'Sneha Gupta',
    upiId: 'sneha@upi',
    isActive: true,
    createdAt: new Date(Date.now() - 432000000).toISOString() // 5 days ago
  },
  {
    id: 'user202',
    email: 'vikram.singh@example.com',
    name: 'Vikram Singh',
    upiId: 'vikram@upi',
    isActive: true,
    createdAt: new Date(Date.now() - 86400000).toISOString() // 1 day ago
  }
];

// Tournament-related admin functions
export const getTournaments = async (): Promise<Tournament[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // In a real app, this would fetch data from a backend
  return [
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
};

export const createTournament = async (tournamentData: Partial<Tournament>): Promise<Tournament> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // In a real app, this would send data to a backend
  console.log('Creating tournament:', tournamentData);
  
  // Return a mock tournament with an ID
  return {
    id: Math.random().toString(36).substring(2, 9),
    title: tournamentData.title || '',
    description: tournamentData.description || '',
    startTime: tournamentData.startTime || new Date().toISOString(),
    maxPlayers: tournamentData.maxPlayers || 4,
    playerCount: 0,
    entryFee: tournamentData.entryFee || 0,
    prizePool: tournamentData.prizePool || 0,
    status: tournamentData.status || 'upcoming'
  };
};

export const updateTournament = async (id: string, tournamentData: Partial<Tournament>): Promise<Tournament> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // In a real app, this would send data to a backend
  console.log('Updating tournament:', id, tournamentData);
  
  // Return the updated tournament
  return {
    id,
    title: tournamentData.title || '',
    description: tournamentData.description || '',
    startTime: tournamentData.startTime || new Date().toISOString(),
    maxPlayers: tournamentData.maxPlayers || 4,
    playerCount: 0,
    entryFee: tournamentData.entryFee || 0,
    prizePool: tournamentData.prizePool || 0,
    status: tournamentData.status || 'upcoming'
  };
};

export const deleteTournament = async (id: string): Promise<boolean> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // In a real app, this would send a delete request to a backend
  console.log('Deleting tournament:', id);
  
  return true;
};

// User-related admin functions
export const getUsers = async (): Promise<User[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return mockUsers;
};

export const toggleUserStatus = async (id: string, isActive: boolean): Promise<boolean> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // In a real app, this would update the user's status in a database
  console.log('Toggling user status:', id, isActive);
  
  return true;
};

// Winner-related admin functions
export const getWinners = async (): Promise<Winner[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // In a real app, this would fetch from a database
  return [
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
};

export const addWinner = async (winnerData: Partial<Winner>): Promise<Winner> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // In a real app, this would add a winner to the database
  console.log('Adding winner:', winnerData);
  
  return {
    id: Math.random().toString(36).substring(2, 9),
    userId: winnerData.userId || '',
    userName: winnerData.userName || '',
    tournamentId: winnerData.tournamentId || '',
    gameId: winnerData.gameId || '',
    prizeAmount: winnerData.prizeAmount || 0,
    winDate: winnerData.winDate || new Date().toISOString()
  };
};

export const updateWinner = async (id: string, winnerData: Partial<Winner>): Promise<Winner> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // In a real app, this would update a winner in the database
  console.log('Updating winner:', id, winnerData);
  
  return {
    id,
    userId: winnerData.userId || '',
    userName: winnerData.userName || '',
    tournamentId: winnerData.tournamentId || '',
    gameId: winnerData.gameId || '',
    prizeAmount: winnerData.prizeAmount || 0,
    winDate: winnerData.winDate || new Date().toISOString()
  };
};

export const deleteWinner = async (id: string): Promise<boolean> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // In a real app, this would delete a winner from the database
  console.log('Deleting winner:', id);
  
  return true;
};