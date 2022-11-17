import { Database } from '@anima/core/types/db_types';
import { createClient } from '@supabase/supabase-js';

// Note: supabaseAdmin uses the SERVICE_ROLE_KEY which you must only use in a secure server-side context
// as it has admin priviliges and overwrites RLS policies!

let supabaseAdmin: any = {};

if (typeof window === 'undefined') {
	if (
		process.env.NEXT_PUBLIC_SUPABASE_URL &&
		process.env.SUPABASE_SERVICE_ROLE_KEY
	) {
		supabaseAdmin = createClient<Database>(
			process.env.NEXT_PUBLIC_SUPABASE_URL,
			process.env.SUPABASE_SERVICE_ROLE_KEY,
		);
	} else {
		throw 'Supabase Admin keys not found';
	}
}

export { supabaseAdmin };
