import React from 'react';

export const RoomCardSkeleton: React.FC = () => (
  <div className="animate-pulse">
    <div className="aspect-[1/1] bg-nike-soft-cloud dark:bg-nike-dark-elevated" />
    <div className="pt-3 space-y-2">
      <div className="h-3 bg-nike-hairline-soft dark:bg-nike-dark-card rounded w-1/4" />
      <div className="h-4 bg-nike-hairline-soft dark:bg-nike-dark-card rounded w-3/4" />
      <div className="h-3 bg-nike-hairline-soft dark:bg-nike-dark-card rounded w-1/2" />
      <div className="h-4 bg-nike-hairline-soft dark:bg-nike-dark-card rounded w-1/3" />
      <div className="h-10 bg-nike-soft-cloud dark:bg-nike-dark-card rounded-full w-full mt-2" />
    </div>
  </div>
);
