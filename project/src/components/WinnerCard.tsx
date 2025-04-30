import { Trophy, Calendar, Hash } from 'lucide-react';
import { Winner } from '../types';

interface WinnerCardProps {
  winner: Winner;
}

const WinnerCard = ({ winner }: WinnerCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden p-5 transform transition-all hover:shadow-lg hover:-translate-y-1">
      <div className="flex items-center mb-4">
        <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center mr-3">
          <Trophy className="h-6 w-6 text-primary-600" />
        </div>
        <div>
          <h3 className="text-lg font-heading font-semibold text-gray-800">
            {winner.userName}
          </h3>
          <p className="text-sm text-gray-600">
            Won ₹{winner.prizeAmount}
          </p>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center text-sm text-gray-600">
          <Hash className="h-4 w-4 mr-2 text-primary-600" />
          <span>Game ID: {winner.gameId}</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-600">
          <Calendar className="h-4 w-4 mr-2 text-primary-600" />
          <span>
            {new Date(winner.winDate).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default WinnerCard;