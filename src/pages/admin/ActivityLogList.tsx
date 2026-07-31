import React, { useEffect, useState } from 'react';
import { ActivityLog } from '../../types';
import { getActivityLogs } from '../../services/api';

export const ActivityLogList: React.FC = () => {
  const [logs, setLogs] = useState<ActivityLog[]>([]);

  useEffect(() => {
    const fetchLogs = async () => {
      setLogs(await getActivityLogs());
    };
    fetchLogs();
  }, []);

  return (
    <div className="space-y-8 pb-10">
      
      <div className="border-b border-nike-hairline dark:border-nike-dark-card pb-4">
        <h1 className="text-[28px] font-medium text-nike-ink dark:text-white">
          System Activity Log
        </h1>
        <p className="text-[14px] text-nike-mute dark:text-nike-stone mt-0.5">
          Audit trail of administrative actions, room edits, and status changes
        </p>
      </div>

      <div className="bg-nike-canvas dark:bg-nike-dark-elevated border border-nike-hairline dark:border-nike-dark-card overflow-x-auto">
        <table className="w-full text-left border-collapse text-[14px]">
          <thead>
            <tr className="border-b border-nike-hairline-soft dark:border-nike-dark-card text-nike-mute dark:text-nike-stone font-medium text-[13px]">
              <th className="p-4">Timestamp</th>
              <th className="p-4">User</th>
              <th className="p-4">Action</th>
              <th className="p-4">Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-nike-hairline-soft dark:divide-nike-dark-card">
            {logs.map(log => (
              <tr key={log.id} className="hover:bg-nike-soft-cloud dark:hover:bg-nike-dark-card/50 transition-colors">
                <td className="p-4 text-nike-stone text-[12px] whitespace-nowrap">
                  {new Date(log.created_at).toLocaleString()}
                </td>
                <td className="p-4 font-medium text-nike-ink dark:text-white">{log.user_name || 'Admin'}</td>
                <td className="p-4 font-medium text-nike-ink dark:text-white">{log.action}</td>
                <td className="p-4 text-nike-mute dark:text-nike-stone">{log.details}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};
