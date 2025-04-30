import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, TrendingUp, Calendar, DollarSign, Award } from 'lucide-react';
import { getTournamentStats } from '../../services/adminService';

interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  totalTournaments: number;
  upcomingTournaments: number;
  totalRevenue: number;
  totalPrizes: number;
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const data = await getTournamentStats();
        setStats(data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-heading font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600">Overview of your tournament platform</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Users Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-primary-100 text-primary-600 mr-4">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-2xl font-heading font-semibold text-gray-900">{stats?.totalUsers || 0}</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center">
              <span className="text-sm text-gray-500">Active Users: </span>
              <span className="ml-1 text-sm font-medium text-gray-700">{stats?.activeUsers || 0}</span>
            </div>
          </div>
        </div>

        {/* Tournaments Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-secondary-100 text-secondary-600 mr-4">
              <Calendar className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total Tournaments</p>
              <p className="text-2xl font-heading font-semibold text-gray-900">{stats?.totalTournaments || 0}</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center">
              <span className="text-sm text-gray-500">Upcoming: </span>
              <span className="ml-1 text-sm font-medium text-gray-700">{stats?.upcomingTournaments || 0}</span>
            </div>
          </div>
        </div>

        {/* Revenue Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-accent-100 text-accent-700 mr-4">
              <TrendingUp className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-heading font-semibold text-gray-900">₹{stats?.totalRevenue || 0}</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center">
              <span className="text-sm text-gray-500">Total Prizes: </span>
              <span className="ml-1 text-sm font-medium text-gray-700">₹{stats?.totalPrizes || 0}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-heading font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              to="/admin/tournaments"
              className="flex items-center p-4 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors"
            >
              <Calendar className="h-5 w-5 text-primary-600 mr-3" />
              <span className="font-medium text-primary-700">Manage Tournaments</span>
            </Link>
            <Link
              to="/admin/users"
              className="flex items-center p-4 bg-secondary-50 rounded-lg hover:bg-secondary-100 transition-colors"
            >
              <Users className="h-5 w-5 text-secondary-600 mr-3" />
              <span className="font-medium text-secondary-700">Manage Users</span>
            </Link>
            <Link
              to="/admin/winners"
              className="flex items-center p-4 bg-accent-50 rounded-lg hover:bg-accent-100 transition-colors"
            >
              <Award className="h-5 w-5 text-accent-700 mr-3" />
              <span className="font-medium text-accent-800">Manage Winners</span>
            </Link>
            <Link
              to="/"
              className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <DollarSign className="h-5 w-5 text-gray-600 mr-3" />
              <span className="font-medium text-gray-700">Payment Reports</span>
            </Link>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-heading font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center">
                <Users className="h-4 w-4 text-primary-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">
                  New user registered
                </p>
                <p className="text-sm text-gray-500">
                  user@example.com - 2 hours ago
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 h-8 w-8 rounded-full bg-secondary-100 flex items-center justify-center">
                <Calendar className="h-4 w-4 text-secondary-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">
                  Tournament created
                </p>
                <p className="text-sm text-gray-500">
                  Weekend Special - 3 hours ago
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 h-8 w-8 rounded-full bg-accent-100 flex items-center justify-center">
                <DollarSign className="h-4 w-4 text-accent-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">
                  Prize paid out
                </p>
                <p className="text-sm text-gray-500">
                  ₹500 to winner ID: #12345 - 5 hours ago
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;