import { create } from './create-output-node';
import { update } from './update-output-node';
import { _delete } from './delete-output-node';

export const outputNodes = {
	create,
	delete: _delete,
	update,
};
