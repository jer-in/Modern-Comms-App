import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://ghoumxgjdvawyzugaazr.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdob3VteGdqZHZhd3l6dWdhYXpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI3MjIyMDcsImV4cCI6MjA2ODI5ODIwN30.3Vfh-OGrvxSmL_Aq1aoVypPJbr7vGA_k8DJ2baV5sGM";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});