declare module '*.woff';
declare module '*.woff2';
declare module '*.ttf';

declare module 'gpt-3-encoder' {
	export function encode(str: string): any;
	export function decode(str: string): any;
}
