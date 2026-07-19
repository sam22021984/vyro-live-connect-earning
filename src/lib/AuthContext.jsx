import React, { createContext, useState, useContext, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { supabaseAuth } from '@/lib/supabaseAuth';
import { appParams } from '@/lib/app-params';
import { createAxiosClient } from '@base44/sdk/dist/utils/axios-client';
import { trackEvent } from '@/lib/eventTracker';
import { refreshBackendIdentity } from '@/lib/refreshBackendIdentity';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [isLoadingPublicSettings, setIsLoadingPublicSettings] = useState(true);
  const [authError, setAuthError] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [appPublicSettings, setAppPublicSettings] = useState(null); // Contains only { id, public_settings }

  useEffect(() => {
    checkAppState();
  }, []);

  const checkAppState = async () => {
    try {
      setIsLoadingPublicSettings(false);
      setAuthError(null);

      // Check for OAuth callback tokens in URL hash
      supabaseAuth.extractHashTokens();

      const token = supabaseAuth.getToken();
      if (!token) {
        setUser(null);
        setIsAuthenticated(false);
        setIsLoadingAuth(false);
        setAuthChecked(true);
        return;
      }

      await checkUserAuth();
    } catch (error) {
      setAuthError({
        type: 'unknown',
        message: error.message || 'An unexpected error occurred'
      });
      setIsLoadingAuth(false);
    }
  };

  const checkUserAuth = async () => {
    try {
      setIsLoadingAuth(true);
      const currentUser = await supabaseAuth.me();
      if (currentUser) {
        setUser(currentUser);
        setIsAuthenticated(true);
        // Track login event → event-tracker → database → live-analytics dashboard
        trackEvent('login');
        // Refresh canonical backend identity (RPC) + invalidate profile/dashboard.
        refreshBackendIdentity();
      } else {
        // me() returned null. If token was cleared by me() (real 401/403/refresh
        // failure), this is a real logout — clear auth state. If token still
        // exists, me() failed transiently (network, redeploy) — keep state.
        const tokenStillExists = supabaseAuth.getToken();
        if (!tokenStillExists) {
          setUser(null);
          setIsAuthenticated(false);
        }
      }
      setIsLoadingAuth(false);
      setAuthChecked(true);
    } catch (error) {
      // Transient error — don't clear auth state
      setIsLoadingAuth(false);
      setAuthChecked(true);
    }
  };

  const logout = (shouldRedirect = true) => {
    supabaseAuth.logout();
    setUser(null);
    setIsAuthenticated(false);
    setAuthChecked(true);

    if (shouldRedirect) {
      window.location.href = '/login';
    }
  };

  const navigateToLogin = () => {
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated, 
      isLoadingAuth,
      isLoadingPublicSettings,
      authError,
      appPublicSettings,
      authChecked,
      logout,
      navigateToLogin,
      checkUserAuth,
      checkAppState
    }}>
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