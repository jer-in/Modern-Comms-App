import { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isAnonymous: boolean;
  anonymousId: string | null;
  displayName: string;
  setDisplayName: (name: string) => void;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [anonymousId, setAnonymousId] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState<string>('');

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    // Generate or retrieve anonymous ID
    let storedAnonymousId = localStorage.getItem('chat-anonymous-id');
    let storedDisplayName = localStorage.getItem('chat-display-name');
    
    if (!storedAnonymousId) {
      storedAnonymousId = `anon_${Math.random().toString(36).substring(2, 15)}`;
      localStorage.setItem('chat-anonymous-id', storedAnonymousId);
    }
    
    if (!storedDisplayName) {
      storedDisplayName = `Guest${Math.floor(Math.random() * 1000)}`;
      localStorage.setItem('chat-display-name', storedDisplayName);
    }
    
    setAnonymousId(storedAnonymousId);
    setDisplayName(storedDisplayName);

    return () => subscription.unsubscribe();
  }, []);

  const handleDisplayNameChange = (name: string) => {
    setDisplayName(name);
    localStorage.setItem('chat-display-name', name);
  };

  const signOut = async () => {
    try {
      // Clean up auth state
      localStorage.removeItem('chat-anonymous-id');
      localStorage.removeItem('chat-display-name');
      
      // Attempt global sign out
      try {
        await supabase.auth.signOut({ scope: 'global' });
      } catch (err) {
        // Continue even if this fails
      }
      
      // Force page reload for a clean state
      window.location.href = '/';
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const value: AuthContextType = {
    user,
    session,
    isAnonymous: !user,
    anonymousId,
    displayName,
    setDisplayName: handleDisplayNameChange,
    signOut
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}