const withTM = require('next-transpile-modules')([
	'@anima/ui',
	'@anima/ai',
	'@anima/core',
	'@anima/api',
	'@anima/supabase',
	'@anima/constants',
	'@anima/hooks',
]);

module.exports = withTM({
	reactStrictMode: true,
});
