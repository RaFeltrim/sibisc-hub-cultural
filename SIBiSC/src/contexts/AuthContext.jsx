import { createContext, useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const signIn = async (email, password) => {
    if (!isSupabaseConfigured) throw new Error('Supabase is not configured');
    return supabase.auth.signInWithPassword({ email, password });
  };

  const signUp = async (email, password, options) => {
    if (!isSupabaseConfigured) throw new Error('Supabase is not configured');
    return supabase.auth.signUp({ email, password, options });
  };

  const signOut = async () => {
    if (!isSupabaseConfigured) throw new Error('Supabase is not configured');
    return supabase.auth.signOut();
  };

  const resetPassword = async (email) => {
    if (!isSupabaseConfigured) throw new Error('Supabase is not configured');
    return supabase.auth.resetPasswordForEmail(email);
  };

  const value = {
    user,
    session,
    loading,
    signIn,
    signUp,
    signOut,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
