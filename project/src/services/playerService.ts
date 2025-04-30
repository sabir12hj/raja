import { UserProfile } from '../types';

// Join a tournament (mock implementation)
export const joinTournament = async (tournamentId: string, profile: UserProfile): Promise<boolean> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // In a real implementation, this would send the data to a server
  console.log('Joining tournament:', { tournamentId, profile });
  
  // Simulate success
  return true;
};