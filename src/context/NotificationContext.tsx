import React, { createContext, useContext, useState, useEffect } from 'react';
import { AppNotification } from '../types';
import { getNotifications, markNotificationsRead } from '../services/api';
import { toast } from 'sonner';

interface NotificationContextType {
  notifications: AppNotification[];
  unreadCount: number;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  markAllRead: () => Promise<void>;
  refreshNotifications: () => Promise<void>;
  playSoundAlert: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

// Web Audio API Chime Generator (No external MP3 file dependency needed!)
const playChimeSound = () => {
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();

    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();

    osc1.type = 'sine';
    osc2.type = 'sine';

    // Elegant hotel doorbell chime notes (E5 -> G#5)
    osc1.frequency.setValueAtTime(659.25, ctx.currentTime); // E5
    osc2.frequency.setValueAtTime(830.61, ctx.currentTime + 0.15); // G#5

    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.8);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(ctx.destination);

    osc1.start(ctx.currentTime);
    osc1.stop(ctx.currentTime + 0.3);
    osc2.start(ctx.currentTime + 0.15);
    osc2.stop(ctx.currentTime + 0.8);
  } catch (e) {
    // Ignore audio autoplay policies if blocked
  }
};

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    return localStorage.getItem('vr_sound_enabled') !== 'false';
  });

  const refreshNotifications = async () => {
    const list = await getNotifications();
    setNotifications(list);
  };

  useEffect(() => {
    refreshNotifications();
    // Poll every 10 seconds for real-time notification simulation
    const interval = setInterval(refreshNotifications, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    localStorage.setItem('vr_sound_enabled', String(soundEnabled));
  }, [soundEnabled]);

  const markAllRead = async () => {
    await markNotificationsRead();
    await refreshNotifications();
    toast.success('All notifications marked as read');
  };

  const playSoundAlert = () => {
    if (soundEnabled) {
      playChimeSound();
    }
  };

  const unreadCount = notifications.filter(n => !n.is_read).length;

  return (
    <NotificationContext.Provider value={{
      notifications,
      unreadCount,
      soundEnabled,
      setSoundEnabled,
      markAllRead,
      refreshNotifications,
      playSoundAlert,
    }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) throw new Error('useNotifications must be used within NotificationProvider');
  return context;
};
