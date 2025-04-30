import { Link } from 'react-router-dom';
import { Calendar, Users, DollarSign, Trophy } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import { Tournament } from '../types';

interface TournamentCardProps {
  tournament: Tournament;
}

const TournamentCard = ({ tournament }: TournamentCardProps) => {
  const { isAuthenticated } = useAuthStore();
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-secondary-100 text-secondary-700';
      case 'ongoing':
        return 'bg-accent-100 text-accent-700';
      case 'completed':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition-all hover:shadow-lg hover:-translate-y-1">
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-heading font-semibold text-gray-800">
            {tournament.title}
          </h3>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(tournament.status)}`}>
            {tournament.status.charAt(0).toUpperCase() + tournament.status.slice(1)}
          </span>
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="h-4 w-4 mr-2 text-primary-600" />
            <span>
              {new Date(tournament.startTime).toLocaleDateString()} at{' '}
              {new Date(tournament.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <Users className="h-4 w-4 mr-2 text-primary-600" />
            <span>
              {tournament.playerCount} / {tournament.maxPlayers} players
            </span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <DollarSign className="h-4 w-4 mr-2 text-primary-600" />
            <span>Entry Fee: ₹{tournament.entryFee}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <Trophy className="h-4 w-4 mr-2 text-primary-600" />
            <span>Prize Pool: ₹{tournament.prizePool}</span>
          </div>
        </div>

        {tournament.status === 'upcoming' && (
          <Link
            to={isAuthenticated ? `/join/${tournament.id}` : '/login'}
            className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
          >
            {isAuthenticated ? 'Join Tournament' : 'Login to Join'}
          </Link>
        )}
        
        {tournament.status === 'ongoing' && (
          <div className="w-full px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-accent-600 text-center">
            Tournament is Live
          </div>
        )}
        
        {tournament.status === 'completed' && (
          <div className="w-full px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-gray-600 text-center">
            Tournament Ended
          </div>
        )}
      </div>
    </div>
  );
};

export default TournamentCard;