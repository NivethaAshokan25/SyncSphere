import React, { useEffect } from 'react';
import { useAppStore } from '../../store/useAppStore';

/**
 * Enterprise Architecture: Higher-Order Component for route protection
 * and global security event handling.
 */
export const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  const { user, setUser } = useAppStore();

  useEffect(() => {
    // Audit Comment: Centralized listener for unauthorized API events
    const handleUnauthorized = () => {
      console.warn('[SECURITY] Session expired or unauthorized. Redirecting...');
      localStorage.removeItem('sync_auth_token');
      setUser(null);
    };

    window.addEventListener('auth-unauthorized', handleUnauthorized);
    return () => window.removeEventListener('auth-unauthorized', handleUnauthorized);
  }, [setUser]);

  if (!user) {
    return null; // The main App component handles the Login redirect
  }

  return <>{children}</>;
};
