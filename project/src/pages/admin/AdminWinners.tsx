import { useState, useEffect } from 'react';
import { PlusCircle, Search, Edit, Trash, AlertCircle } from 'lucide-react';
import { Winner, Tournament } from '../../types';
import { getWinners, addWinner, updateWinner, deleteWinner } from '../../services/adminService';
import { getTournaments } from '../../services/tournamentService';

const AdminWinners = () => {
  const [winners, setWinners] = useState<Winner[]>([]);
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentWinner, setCurrentWinner] = useState<Winner | null>(null);
  const [formData, setFormData] = useState({
    tournamentId: '',
    userName: '',
    userId: '',
    gameId: '',
    prizeAmount: 0,
    winDate: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [winnersData, tournamentsData] = await Promise.all([
        getWinners(),
        getTournaments()
      ]);
      setWinners(winnersData);
      setTournaments(tournamentsData);
      setError(null);
    } catch (err) {
      setError('Failed to load data. Please try again.');
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  const openCreateModal = () => {
    setCurrentWinner(null);
    setFormData({
      tournamentId: tournaments.length > 0 ? tournaments[0].id : '',
      userName: '',
      userId: '',
      gameId: '',
      prizeAmount: 0,
      winDate: new Date().toISOString().slice(0, 10),
    });
    setIsModalOpen(true);
  };

  const openEditModal = (winner: Winner) => {
    setCurrentWinner(winner);
    setFormData({
      tournamentId: winner.tournamentId || '',
      userName: winner.userName,
      userId: winner.userId,
      gameId: winner.gameId,
      prizeAmount: winner.prizeAmount,
      winDate: new Date(winner.winDate).toISOString().slice(0, 10),
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentWinner(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      
      // Parse numeric values
      const numericFormData = {
        ...formData,
        prizeAmount: Number(formData.prizeAmount),
      };
      
      if (currentWinner) {
        // Update existing winner
        await updateWinner(currentWinner.id, numericFormData);
      } else {
        // Add new winner
        await addWinner(numericFormData);
      }
      
      closeModal();
      fetchData();
    } catch (err) {
      setError('Failed to save winner data. Please try again.');
      console.error('Error saving winner:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this winner?')) return;
    
    try {
      setLoading(true);
      await deleteWinner(id);
      fetchData();
    } catch (err) {
      setError('Failed to delete winner. Please try again.');
      console.error('Error deleting winner:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredWinners = winners.filter(winner => 
    winner.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    winner.gameId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold text-gray-900">Manage Winners</h1>
          <p className="text-gray-600">View, add, edit and delete winners</p>
        </div>
        <button
          onClick={openCreateModal}
          className="mt-3 sm:mt-0 inline-flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-md shadow-sm transition-colors"
        >
          <PlusCircle className="h-5 w-5 mr-2" />
          Add Winner
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded mb-6">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 mr-2" />
            <p>{error}</p>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search winners..."
              className="pl-10 px-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
        </div>

        {loading && !winners.length ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
          </div>
        ) : filteredWinners.length === 0 ? (
          <div className="p-4 text-center text-gray-600">
            No winners found
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Winner
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Game ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tournament
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Prize
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredWinners.map(winner => (
                  <tr key={winner.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-accent-100 flex items-center justify-center">
                          <span className="text-accent-600 font-medium">
                            {winner.userName.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{winner.userName}</div>
                          <div className="text-sm text-gray-500">ID: {winner.userId.substring(0, 8)}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {winner.gameId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {tournaments.find(t => t.id === winner.tournamentId)?.title || 'Unknown Tournament'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ₹{winner.prizeAmount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(winner.winDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button 
                        onClick={() => openEditModal(winner)}
                        className="text-secondary-600 hover:text-secondary-900 mr-3"
                      >
                        <Edit className="h-5 w-5" />
                      </button>
                      <button 
                        onClick={() => handleDelete(winner.id)}
                        className="text-error-600 hover:text-error-900"
                      >
                        <Trash className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Winner Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form onSubmit={handleSubmit}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                    {currentWinner ? 'Edit Winner' : 'Add Winner'}
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="tournamentId" className="block text-sm font-medium text-gray-700">
                        Tournament
                      </label>
                      <select
                        id="tournamentId"
                        name="tournamentId"
                        value={formData.tournamentId}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                      >
                        <option value="">Select a tournament</option>
                        {tournaments.map(tournament => (
                          <option key={tournament.id} value={tournament.id}>
                            {tournament.title}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="userName" className="block text-sm font-medium text-gray-700">
                        Winner Name
                      </label>
                      <input
                        type="text"
                        id="userName"
                        name="userName"
                        value={formData.userName}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                      />
                    </div>

                    <div>
                      <label htmlFor="userId" className="block text-sm font-medium text-gray-700">
                        User ID
                      </label>
                      <input
                        type="text"
                        id="userId"
                        name="userId"
                        value={formData.userId}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                      />
                    </div>

                    <div>
                      <label htmlFor="gameId" className="block text-sm font-medium text-gray-700">
                        Game ID
                      </label>
                      <input
                        type="text"
                        id="gameId"
                        name="gameId"
                        value={formData.gameId}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                      />
                    </div>

                    <div>
                      <label htmlFor="prizeAmount" className="block text-sm font-medium text-gray-700">
                        Prize Amount (₹)
                      </label>
                      <input
                        type="number"
                        id="prizeAmount"
                        name="prizeAmount"
                        value={formData.prizeAmount}
                        onChange={handleChange}
                        min="0"
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                      />
                    </div>

                    <div>
                      <label htmlFor="winDate" className="block text-sm font-medium text-gray-700">
                        Win Date
                      </label>
                      <input
                        type="date"
                        id="winDate"
                        name="winDate"
                        value={formData.winDate}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    {currentWinner ? 'Update Winner' : 'Add Winner'}
                  </button>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminWinners;