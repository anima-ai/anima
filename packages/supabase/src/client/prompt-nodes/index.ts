import { findByFlow } from './find-prompts-by-flow';
import { create } from './create-prompt-node';
import { update } from './update-prompt-node';
import { _delete } from './delete-prompt-node';

export const promptNodes = {
	create,
	update,
	delete: _delete,
	findByFlow,
};
