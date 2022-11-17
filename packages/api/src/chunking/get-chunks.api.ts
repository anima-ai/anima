import { Database } from '@anima/core/types/db_types';
import { supabase } from '@anima/supabase';
import { nextApi } from '../../client';

type Params = {
	chunk_overlap: number;
	chunk_size: number;
	chunk_pattern: string;
	chunking_type: Database['public']['Enums']['chunking_type'];
	file: string;
};

export const getChunksApi = async (params: Params): Promise<string[]> => {
	const user = await supabase.auth.getUser();
	const { data } = await nextApi.get('/chunk', {
		params: { ...params, user_id: user.data.user?.id },
	});
	return data.chunks;
};
