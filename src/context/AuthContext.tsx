import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import { loginAdmin } from '../services/api';
import { toast } from 'sonner';

interface AuthContextType {
  user: User | null;
  role: UserRole;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('apt_auth_user');
    if (savedUser) {
      try { return JSON.parse(savedUser); } catch (e) {}
    }
    return null;
  });

  const role: UserRole = user?.role || 'admin';

  useEffect(() => {
    if (user) {
      localStorage.setItem('apt_auth_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('apt_auth_user');
    }
  }, [user]);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    const result = await loginAdmin(email.trim().toLowerCase(), password.trim());

    if (result.success && result.user) {
      const adminUser: User = {
        id: result.user.id,
        fullname: result.user.fullname,
        email: result.user.email,
        role: 'admin',
      };
      setUser(adminUser);
      toast.success(`Welcome back, ${adminUser.fullname}`);
      return { success: true };
    }

    const err = result.error || 'Invalid credentials. Use admin/admin to login.';
    toast.error(err);
    return { success: false, error: err };
  };

  const logout = () => {
    setUser(null);
    toast.info('Logged out successfully');
  };

  return (
    <AuthContext.Provider value={{
      user,
      role,
      isAuthenticated: Boolean(user),
      login,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
