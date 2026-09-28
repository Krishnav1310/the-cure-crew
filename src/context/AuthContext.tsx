// CAREVAULT Authentication & Role Boundary State Context
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (demoType: 'clinician' | 'admin' | 'patient', customEmail?: string) => Promise<boolean>;
  logout: () => void;
  activePlane: 'CLINICAL' | 'POPULATION' | 'PATIENT' | 'PUBLIC';
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Load initial session from storage
  useEffect(() => {
    try {
      const savedToken = localStorage.getItem('carevault_token');
      const savedUser = localStorage.getItem('carevault_user');
      if (savedToken && savedUser) {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
      }
    } catch (err) {
      console.error('Failed to load session:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (demoType: 'clinician' | 'admin' | 'patient', customEmail?: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ demoType, email: customEmail }),
      });

      if (!res.ok) {
        throw new Error('Authentication rejected');
      }

      const data = await res.json();
      setToken(data.token);
      setUser(data.user);
      localStorage.setItem('carevault_token', data.token);
      localStorage.setItem('carevault_user', JSON.stringify(data.user));
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('carevault_token');
    localStorage.removeItem('carevault_user');
  };

  const activePlane = user
    ? user.role === 'CLINICIAN'
      ? 'CLINICAL'
      : user.role === 'ADMIN'
      ? 'POPULATION'
      : 'PATIENT'
    : 'PUBLIC';

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, logout, activePlane }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
