'use client';

import React, { useEffect, useState } from 'react';
import { useUser } from '@stackframe/stack';

interface DbUser {
  id: string;
  username: string;
  firstName: string | null;
  lastName: string | null;
  email: string;
  profilePicture: string | null;
  bio: string | null;
}

interface UseProfileResult {
  user: DbUser | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

/**
 * Hook to get current user's profile data from database
 * Automatically syncs Stack Auth user with database
 */
export function useProfile(): UseProfileResult {
  const stackUser = useUser();
  const [user, setUser] = useState<DbUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  const syncUser = React.useCallback(async () => {
    if (!stackUser) {
      setUser(null);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      // Sync user with database
      const response = await fetch('/api/profile/sync', {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Failed to sync user');
      }

      const data = await response.json();
      setUser(data.user);
    } catch (err) {
      console.error('Error syncing user:', err);
      setError(err instanceof Error ? err.message : 'Failed to load profile');
    } finally {
      setIsLoading(false);
    }
  }, [stackUser]);

  useEffect(() => {
    syncUser();
  }, [syncUser]);

  return {
    user,
    isLoading,
    error,
    refetch: syncUser,
  };
}
