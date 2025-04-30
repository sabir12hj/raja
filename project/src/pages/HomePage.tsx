import { useState, useEffect } from 'react';
import { Trophy, AlertCircle } from 'lucide-react';
import TournamentCard from '../components/TournamentCard';
import { Tournament } from '../types';
import { getTournaments } from '../services/tournamentService';

const HomePage = () => {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        setLoading(true);
        const data = await getTournaments();
        setTournaments(data);
        setError(null);
      } catch (err) {
        setError('Failed to load tournaments. Please try again later.');
        console.error('Error fetching tournaments:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchTournaments();
  }, []);
  
  const upcomingTournaments = tournaments.filter(t => t.status === 'upcoming');
  const ongoingTournaments = tournaments.filter(t => t.status === 'ongoing');

  return (
    <div>
      <section className="mb-10">
        <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-lg shadow-xl p-6 sm:p-10 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl font-heading font-bold mb-4">
              Play Ludo Tournaments & Win Real Cash!
            </h1>
            <p className="text-lg sm:text-xl opacity-90 mb-6">
              Join thousands of players competing in exciting Ludo tournaments.
              Sign up, play, and win real cash prizes!
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
              <a 
                href="#upcoming" 
                className="px-6 py-3 bg-white text-primary-600 font-heading font-semibold rounded-lg shadow-md hover:bg-gray-100 transition-colors"
              >
                Join a Tournament
              </a>
              <a 
                href="https://t.me/ludotournaments" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="px-6 py-3 bg-accent-600 text-white font-heading font-semibold rounded-lg shadow-md hover:bg-accent-700 transition-colors"
              >
                Join Our Community
              </a>
            </div>
          </div>
        </div>
      </section>

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
      ) : (
        <>
          {ongoingTournaments.length > 0 && (
            <section className="mb-10">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-accent-100 rounded-full flex items-center justify-center mr-2">
                  <div className="w-3 h-3 bg-accent-600 rounded-full animate-pulse"></div>
                </div>
                <h2 className="text-2xl font-heading font-semibold text-gray-800">Live Tournaments</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {ongoingTournaments.map(tournament => (
                  <TournamentCard key={tournament.id} tournament={tournament} />
                ))}
              </div>
            </section>
          )}
          
          <section id="upcoming" className="mb-10">
            <div className="flex items-center mb-4">
              <Trophy className="h-6 w-6 text-primary-600 mr-2" />
              <h2 className="text-2xl font-heading font-semibold text-gray-800">Upcoming Tournaments</h2>
            </div>
            {upcomingTournaments.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcomingTournaments.map(tournament => (
                  <TournamentCard key={tournament.id} tournament={tournament} />
                ))}
              </div>
            ) : (
              <div className="bg-gray-100 rounded-lg p-6 text-center">
                <p className="text-gray-600">No upcoming tournaments at the moment. Check back soon!</p>
              </div>
            )}
          </section>
          
          <section className="mb-10">
            <div className="bg-secondary-50 border border-secondary-200 rounded-lg p-6">
              <h2 className="text-xl font-heading font-semibold text-gray-800 mb-4">How to Play & Win</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary-100 text-primary-600 mb-3">
                    <span className="text-lg font-bold">1</span>
                  </div>
                  <h3 className="text-lg font-medium mb-2">Sign Up</h3>
                  <p className="text-gray-600">Login with your Google account and complete your profile.</p>
                </div>
                
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary-100 text-primary-600 mb-3">
                    <span className="text-lg font-bold">2</span>
                  </div>
                  <h3 className="text-lg font-medium mb-2">Join Tournament</h3>
                  <p className="text-gray-600">Pay the entry fee via UPI and join the tournament.</p>
                </div>
                
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary-100 text-primary-600 mb-3">
                    <span className="text-lg font-bold">3</span>
                  </div>
                  <h3 className="text-lg font-medium mb-2">Win & Withdraw</h3>
                  <p className="text-gray-600">Play and win prizes. Receive winnings directly to your UPI ID.</p>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default HomePage;