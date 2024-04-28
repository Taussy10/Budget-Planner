
import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
export const supabase = createClient(
    'https://omhvglyticiqjqawurpx.supabase.co', 
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9taHZnbHl0aWNpcWpxYXd1cnB4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI0ODI5NDYsImV4cCI6MjAyODA1ODk0Nn0.Z4pq_Nt2-cmPHgHSPuABu-oid--xE8QSC4Ugl9eOAg8')
    //  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'
