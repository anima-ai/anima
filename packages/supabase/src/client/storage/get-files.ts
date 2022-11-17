import { supabase } from '../client';

export const getFiles = async () => {
	const user = await supabase.auth.getUser();
	const { data, error } = await supabase.storage
		.from(`files-${user.data.user?.id}`)
		.list();

	if (error) {
		throw error;
	}
	return data;
};
