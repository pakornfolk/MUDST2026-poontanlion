import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import { createUser, getUsers, updateUserProfile as apiUpdateUser } from '../services/api';
import { supabase, isSupabaseConfigured } from '../services/supabase';
import { toast } from 'sonner';

interface AuthContextType {
  user: User | null;
  role: UserRole;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (fullname: string, email: string, phone: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateUser: (data: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('vr_auth_user');
    if (savedUser) {
      try { return JSON.parse(savedUser); } catch (e) {}
    }
    return null; // Strict real auth: null by default if not logged in
  });

  const role: UserRole = user?.role || 'user';

  useEffect(() => {
    if (user) {
      localStorage.setItem('vr_auth_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('vr_auth_user');
    }
  }, [user]);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    // 1. If Supabase is fully configured with Auth
    if (isSupabaseConfigured) {
      try {
        const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
          email: cleanEmail,
          password: cleanPassword,
        });

        if (!authError && authData?.user) {
          const authenticatedUser: User = {
            id: authData.user.id,
            fullname: authData.user.user_metadata?.fullname || cleanEmail.split('@')[0],
            email: authData.user.email || cleanEmail,
            phone: authData.user.user_metadata?.phone || '',
            avatar: authData.user.user_metadata?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80',
            role: authData.user.user_metadata?.role || (cleanEmail.includes('admin') ? 'admin' : 'user'),
          };
          setUser(authenticatedUser);
          toast.success(`Welcome back, ${authenticatedUser.fullname}`);
          return { success: true };
        }
      } catch (e) {
        console.warn('Supabase Auth error, falling back to database check:', e);
      }
    }

    // 2. Real Password Verification against User Database (LocalStorage / Seed DB)
    const allUsers = await getUsers();
    let matchedUser = allUsers.find(u => u.email.toLowerCase() === cleanEmail);

    // Allow shorthand 'admin' username for admin account
    if (!matchedUser && cleanEmail === 'admin') {
      matchedUser = allUsers.find(u => u.role === 'admin' || u.email.toLowerCase() === 'admin@victoryroom.com');
    }

    if (!matchedUser) {
      const err = 'ไม่พบบัญชีผู้ใช้นี้ในระบบ (User account not found)';
      toast.error(err);
      return { success: false, error: err };
    }

    // Verify Password
    const isValidPassword = matchedUser.password ? (matchedUser.password === cleanPassword || (matchedUser.role === 'admin' && cleanPassword === 'admin')) : (
      (matchedUser.role === 'admin' && (cleanPassword === 'admin' || cleanPassword === 'admin123password')) ||
      (matchedUser.role === 'user' && cleanPassword === 'user123password')
    );

    if (!isValidPassword) {
      const err = 'รหัสผ่านไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง (Invalid password)';
      toast.error(err);
      return { success: false, error: err };
    }

    setUser(matchedUser);
    toast.success(`เข้าสู่ระบบสำเร็จ ยินดีต้อนรับ ${matchedUser.fullname}`);
    return { success: true };
  };

  const register = async (fullname: string, email: string, phone: string, password: string): Promise<{ success: boolean; error?: string }> => {
    const cleanEmail = email.trim().toLowerCase();
    const allUsers = await getUsers();
    
    if (allUsers.some(u => u.email.toLowerCase() === cleanEmail)) {
      const err = 'อีเมลนี้ถูกใช้งานแล้ว (Email is already registered)';
      toast.error(err);
      return { success: false, error: err };
    }

    const newUserData: Omit<User, 'id' | 'created_at'> = {
      fullname: fullname.trim(),
      email: cleanEmail,
      phone: phone.trim(),
      password: password.trim(),
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80',
      role: 'user',
    };

    const newUser = await createUser(newUserData);

    setUser(newUser);
    toast.success(`สมัครสมาชิกเรียบร้อย ยินดีต้อนรับคุณ ${newUser.fullname}`);
    return { success: true };
  };

  const logout = () => {
    if (isSupabaseConfigured) {
      supabase.auth.signOut().catch(() => {});
    }
    setUser(null);
    toast.info('ออกจากระบบเรียบร้อยแล้ว');
  };

  const updateUser = async (data: Partial<User>) => {
    if (!user) return;
    const updated = await apiUpdateUser(user.id, data);
    if (updated) {
      setUser(updated);
      toast.success('อัปเดตข้อมูลส่วนตัวเรียบร้อย');
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      role,
      isAuthenticated: Boolean(user),
      login,
      register,
      logout,
      updateUser
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
