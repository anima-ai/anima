import { AxiosResponse } from 'axios';
import { showNotification } from '@mantine/notifications';

export const apiErrorBoundary = async (api: Promise<any>) => {
	try {
		const { data }: AxiosResponse = await api;
		return data;
	} catch (error: any) {
		showNotification({
			title: 'API Error',
			message: error?.message ?? error,
			color: 'red',
		});
	}
};
