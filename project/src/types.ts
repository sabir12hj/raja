export interface Tournament {
  id: string;
  title: string;
  description?: string;
  startTime: string;
  maxPlayers: number;
  playerCount: number;
  entryFee: number;
  prizePool: number;
  status: 'upcoming' | 'ongoing' | 'completed';
}

export interface Winner {
  id: string;
  userId: string;
  userName: string;
  tournamentId: string;
  gameId: string;
  prizeAmount: number;
  winDate: string;
}

export interface User {
  id: string;
  email: string;
  name?: string;
  upiId?: string;
  isActive: boolean;
  createdAt: string;
}

export interface UserProfile {
  name: string;
  upiId: string;
}