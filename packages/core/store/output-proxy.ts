import { proxy } from 'valtio';

interface Props {
	id: string;
	visible: boolean;
	headers: Record<string, string>[];
	webhook_url: string;
	password: string | null;
	enabled: boolean;
}

export const outputProxy = proxy<Props>({
	id: '',
	visible: false,
	headers: [],
	webhook_url: '',
	password: null,
	enabled: true,
});
