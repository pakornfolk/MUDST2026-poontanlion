import React from 'react';
import { Bell, Volume2, VolumeX, CheckCheck } from 'lucide-react';
import { useNotifications } from '../../context/NotificationContext';

export const NotificationCenter: React.FC = () => {
  const { notifications, unreadCount, markAllRead, soundEnabled, setSoundEnabled } = useNotifications();

  return (
    <div className="space-y-8 pb-10">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-nike-hairline dark:border-nike-dark-card pb-4">
        <div>
          <h1 className="text-[28px] font-medium text-nike-ink dark:text-white flex items-center gap-2">
            <Bell className="w-6 h-6" /> Notifications ({unreadCount} Unread)
          </h1>
          <p className="text-[14px] text-nike-mute dark:text-nike-stone mt-0.5">
            System alerts, booking requests, and slip uploads
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`px-4 py-2 text-[13px] font-medium rounded-full border transition-colors flex items-center gap-1.5 ${
              soundEnabled
                ? 'border-nike-ink text-nike-ink dark:border-white dark:text-white'
                : 'border-nike-hairline text-nike-mute'
            }`}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            {soundEnabled ? 'Sound On' : 'Sound Off'}
          </button>

          {unreadCount > 0 && (
            <button
              onClick={markAllRead}
              className="bg-nike-ink dark:bg-white text-white dark:text-nike-ink text-[13px] font-medium px-5 py-2 rounded-full hover:opacity-80 transition-opacity flex items-center gap-1.5"
            >
              <CheckCheck className="w-4 h-4" /> Mark All Read
            </button>
          )}
        </div>
      </div>

      <div className="bg-nike-canvas dark:bg-nike-dark-elevated border border-nike-hairline dark:border-nike-dark-card p-6 space-y-3">
        {notifications.length === 0 ? (
          <p className="text-center text-[14px] text-nike-mute py-8">No system notifications</p>
        ) : (
          notifications.map(n => (
            <div
              key={n.id}
              className={`p-4 border-l-2 text-[14px] ${
                n.is_read
                  ? 'border-nike-hairline bg-nike-soft-cloud dark:bg-nike-dark-card'
                  : 'border-nike-ink bg-white dark:bg-nike-dark-surface'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium text-nike-ink dark:text-white">{n.title}</span>
                <span className="text-[12px] text-nike-stone">
                  {new Date(n.created_at).toLocaleString()}
                </span>
              </div>
              <p className="text-nike-mute dark:text-nike-stone mt-1">{n.message}</p>
            </div>
          ))
        )}
      </div>

    </div>
  );
};
