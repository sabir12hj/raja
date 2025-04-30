import { Link } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center text-center px-4">
      <AlertTriangle className="h-16 w-16 text-primary-600 mb-4" />
      <h1 className="text-4xl font-heading font-bold text-gray-900 mb-2">404</h1>
      <h2 className="text-2xl font-heading font-semibold text-gray-800 mb-4">Page Not Found</h2>
      <p className="text-gray-600 max-w-md mb-6">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-primary-600 text-white font-heading font-semibold rounded-lg shadow-md hover:bg-primary-700 transition-colors"
      >
        Return to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;