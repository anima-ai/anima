import {
	SessionContextProvider,
	useSession,
} from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';
import { FC, PropsWithChildren, useState } from 'react';
import useDebouncedEffect from 'use-debounced-effect';

import { supabase } from '@anima/supabase';

interface Props {
	initialSession: any;
}

export const SupabaseProvider: FC<PropsWithChildren<Props>> = ({
	initialSession,
	children,
}) => {
	// Create a new supabase browser client on every first render.
	const [supabaseClient] = useState(() => supabase);

	return (
		<SessionContextProvider
			supabaseClient={supabaseClient}
			initialSession={initialSession}
		>
			<Auth>{children as any}</Auth>
		</SessionContextProvider>
	);
};

const Auth = ({ children }) => {
	const session = useSession();

	const router = useRouter();
	useDebouncedEffect(
		() => {
			if (!session?.access_token) {
				if (router.pathname !== '/auth/signin') {
					window.location.href = '/auth/signin';
				}
			} else {
				if (router.pathname === '/auth/signin') {
					window.location.href = '/';
				}
			}
		},
		{ ignoreInitialCall: true, timeout: 1000 },
		[session],
	);

	return children;
};
