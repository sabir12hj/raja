import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Check, AlertCircle, CreditCard } from 'lucide-react';
import { Tournament, UserProfile } from '../types';
import { getTournamentById } from '../services/tournamentService';
import { joinTournament } from '../services/playerService';
import { useAuthStore } from '../stores/authStore';

const JoinPage = () => {
  const { tournamentId } = useParams<{ tournamentId: string }>();
  const { user } = useAuthStore();
  const navigate = useNavigate();
  
  const [tournament, setTournament] = useState<Tournament | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  
  const [profile, setProfile] = useState<UserProfile>({
    name: user?.displayName || '',
    upiId: '',
  });

  useEffect(() => {
    const fetchTournament = async () => {
      if (!tournamentId) return;
      
      try {
        setLoading(true);
        const data = await getTournamentById(tournamentId);
        
        if (!data) {
          setError('Tournament not found');
          return;
        }
        
        if (data.status !== 'upcoming') {
          setError('This tournament is no longer accepting new players');
          return;
        }
        
        setTournament(data);
      } catch (err) {
        setError('Failed to load tournament details');
        console.error('Error fetching tournament:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchTournament();
  }, [tournamentId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!tournament || !tournamentId) return;
    
    try {
      if (!profile.name.trim()) {
        setError('Please enter your name');
        return;
      }
      
      if (!profile.upiId.trim()) {
        setError('Please enter your UPI ID');
        return;
      }
      
      setLoading(true);
      setError(null);
      
      await joinTournament(tournamentId, profile);
      setSuccess(true);
      
      setTimeout(() => {
        navigate('/');
      }, 3000);
    } catch (err) {
      setError('Failed to join tournament. Please try again.');
      console.error('Error joining tournament:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !tournament) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error && !success) {
    return (
      <div className="max-w-lg mx-auto">
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 mr-2" />
            <p>{error}</p>
          </div>
        </div>
        <div className="mt-4 text-center">
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 text-sm font-medium text-primary-600 hover:text-primary-700"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="max-w-lg mx-auto text-center">
        <div className="bg-success-50 border border-success-200 rounded-lg p-6">
          <div className="mx-auto w-12 h-12 bg-success-100 rounded-full flex items-center justify-center mb-4">
            <Check className="h-6 w-6 text-success-600" />
          </div>
          <h2 className="text-2xl font-heading font-semibold text-gray-900 mb-2">
            Tournament Joined!
          </h2>
          <p className="text-gray-600 mb-4">
            You have successfully joined the tournament. You will be redirected to the home page shortly.
          </p>
          <p className="text-sm text-gray-500">
            Please join our Telegram group for tournament notifications and updates.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {tournament && (
          <div className="border-b border-gray-200 bg-gray-50 px-4 py-5 sm:px-6">
            <h2 className="text-xl font-heading font-semibold text-gray-900">
              Join Tournament: {tournament.title}
            </h2>
            <p className="mt-1 text-sm text-gray-600">
              Entry Fee: ₹{tournament.entryFee} • Prize Pool: ₹{tournament.prizePool}
            </p>
          </div>
        )}

        <div className="px-4 py-5 sm:p-6">
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label htmlFor="upiId" className="block text-sm font-medium text-gray-700">
                  UPI ID
                </label>
                <input
                  type="text"
                  id="upiId"
                  name="upiId"
                  value={profile.upiId}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  placeholder="username@upi"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Your winnings will be transferred to this UPI ID
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-md">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <CreditCard className="h-5 w-5 text-gray-400" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-gray-700">
                      Payment Instructions
                    </h3>
                    <div className="mt-2 text-sm text-gray-600">
                      <ol className="list-decimal list-inside space-y-1">
                        <li>Pay ₹{tournament?.entryFee} to UPI ID: <span className="font-mono">payment@ludotournaments</span></li>
                        <li>Use your registered email as reference</li>
                        <li>You'll receive confirmation after payment verification</li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  required
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                  I agree to the{' '}
                  <a href="/terms" className="text-primary-600 hover:text-primary-700">
                    terms and conditions
                  </a>
                </label>
              </div>

              {error && (
                <div className="p-3 bg-red-50 border-l-4 border-red-500 text-red-700">
                  <p className="text-sm">{error}</p>
                </div>
              )}

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {loading ? 'Processing...' : 'Join Tournament'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JoinPage;