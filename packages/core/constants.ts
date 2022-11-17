const origin =
	typeof window !== 'undefined' && window.location.origin
		? window.location.origin
		: 'https://sansai.vercel.app';

export const ROUTES = {
	origin,
	home: '/',
	workspace: '/workspace',
};
