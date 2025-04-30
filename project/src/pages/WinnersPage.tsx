import { useState, useEffect } from 'react';
import { AlertCircle, Award } from 'lucide-react';
import WinnerCard from '../components/WinnerCard';
import { Winner } from '../types';
import { getWinners } from '../services/winnerService';

const WinnersPage = () => {
  const [winners, setWinners] = useState<Winner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchWinners = async () => {
      try {
        setLoading(true);
        const data = await getWinners();
        setWinners(data);
        setError(null);
      } catch (err) {
        setError('Failed to load winners. Please try again later.');
        console.error('Error fetching winners:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchWinners();
  }, []);

  return (
    <div>
      <div className="bg-gradient-to-r from-accent-600 to-accent-700 rounded-lg shadow-xl p-6 sm:p-10 text-white mb-8">
        <div className="max-w-3xl mx-auto text-center">
          <Award className="h-12 w-12 mx-auto mb-4" />
          <h1 className="text-3xl sm:text-4xl font-heading font-bold mb-4">
            Tournament Winners
          </h1>
          <p className="text-lg opacity-90">
            Congratulations to all our tournament champions. You could be next!
          </p>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
        </div>
      ) : error ? (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded mb-6">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 mr-2" />
            <p>{error}</p>
          </div>
        </div>
      ) : winners.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {winners.map(winner => (
            <WinnerCard key={winner.id} winner={winner} />
          ))}
        </div>
      ) : (
        <div className="bg-gray-100 rounded-lg p-6 text-center">
          <p className="text-gray-600">No winners to display yet. Be the first one!</p>
        </div>
      )}
    </div>
  );
};

export default WinnersPage;