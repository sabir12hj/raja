import { create } from 'zustand';
import { jwtDecode } from 'jwt-decode';

interface GoogleUser {
  email: string;
  name?: string;
  displayName?: string;
  picture?: string;
  sub: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: GoogleUser | null;
  isAdmin: boolean;
  isLoading: boolean;
  error: string | null;
  login: (credential: string) => Promise<void>;
  logout: () => void;
  checkAuth: () => void;
  setError: (error: string | null) => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  isAuthenticated: false,
  user: null,
  isAdmin: false,
  isLoading: true,
  error: null,

  login: async (credential: string) => {
    try {
      set({ isLoading: true, error: null });
      
      // Decode the JWT token
      const decoded = jwtDecode<GoogleUser>(credential);
      
      // Store token in localStorage
      localStorage.setItem('ludoToken', credential);
      
      // Create user object
      const user = {
        email: decoded.email,
        name: decoded.name,
        displayName: decoded.name,
        picture: decoded.picture,
        sub: decoded.sub
      };
      
      // Check if user is admin (in a real app, this would be handled server-side)
      const isAdmin = decoded.email === 'admin@example.com';
      
      set({ 
        isAuthenticated: true, 
        user, 
        isAdmin,
        isLoading: false,
        error: null
      });
      
    } catch (error) {
      console.error('Login error:', error);
      set({ 
        isLoading: false, 
        error: 'Failed to authenticate. Please try again.',
        isAuthenticated: false,
        user: null,
        isAdmin: false
      });
    }
  },

  logout: () => {
    localStorage.removeItem('ludoToken');
    set({ 
      isAuthenticated: false, 
      user: null, 
      isAdmin: false,
      error: null 
    });
  },

  checkAuth: () => {
    try {
      set({ isLoading: true });
      const token = localStorage.getItem('ludoToken');
      
      if (!token) {
        set({ 
          isAuthenticated: false, 
          user: null, 
          isAdmin: false,
          isLoading: false 
        });
        return;
      }
      
      // Decode the token
      const decoded = jwtDecode<GoogleUser>(token);
      
      // Check token expiration (exp is in seconds)
      const currentTime = Date.now() / 1000;
      
      // If token is expired
      if (decoded.exp && decoded.exp < currentTime) {
        localStorage.removeItem('ludoToken');
        set({ 
          isAuthenticated: false, 
          user: null, 
          isAdmin: false,
          isLoading: false 
        });
        return;
      }
      
      // Create user object
      const user = {
        email: decoded.email,
        name: decoded.name,
        displayName: decoded.name,
        picture: decoded.picture,
        sub: decoded.sub
      };
      
      // Check if user is admin (in a real app, this would be handled server-side)
      const isAdmin = decoded.email === 'admin@example.com';
      
      set({ 
        isAuthenticated: true, 
        user, 
        isAdmin,
        isLoading: false 
      });
      
    } catch (error) {
      console.error('Auth check error:', error);
      localStorage.removeItem('ludoToken');
      set({ 
        isAuthenticated: false, 
        user: null, 
        isAdmin: false,
        isLoading: false 
      });
    }
  },

  setError: (error: string | null) => {
    set({ error });
  }
}));