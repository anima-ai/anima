import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import type { Database } from '@anima/core/types/db_types';

export const supabase = createBrowserSupabaseClient<Database>();
