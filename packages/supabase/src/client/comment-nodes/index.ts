import { create } from './create-comment-node';
import { update } from './update-comment-node';
import { _delete } from './delete-comment-node';

export const commentNodes = {
	create,
	delete: _delete,
	update,
};
