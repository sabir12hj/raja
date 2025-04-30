import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { Lock } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';

const LoginPage = () => {
  const { isAuthenticated, login, error } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get the path to redirect to after login
  const from = location.state?.from?.pathname || '/';
  
  // If already authenticated, redirect to the intended page
  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  const handleLoginSuccess = async (credentialResponse: any) => {
    await login(credentialResponse.credential);
  };

  const handleLoginError = () => {
    console.error('Login Failed');
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6 sm:p-8">
        <div className="text-center mb-6">
          <div className="mx-auto w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-3">
            <Lock className="h-6 w-6 text-primary-600" />
          </div>
          <h2 className="text-2xl font-heading font-semibold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-gray-600">
            Login to join tournaments and win cash prizes
          </p>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
            <p>{error}</p>
          </div>
        )}

        <div className="flex flex-col items-center">
          <div className="mb-4 w-full">
            <GoogleLogin
              onSuccess={handleLoginSuccess}
              onError={handleLoginError}
              useOneTap
              theme="filled_blue"
              shape="pill"
              text="continue_with"
              width="300"
            />
          </div>
          
          <div className="mt-4 text-center text-sm text-gray-500">
            <p>
              By signing in, you agree to our{' '}
              <a href="/terms" className="text-primary-600 hover:text-primary-700">
                Terms and Conditions
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;