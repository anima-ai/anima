import { findAll } from './find-all-workspaces';
import { findFavorite } from './find-favorite-workspaces';
import { findPrivate } from './find-private-workspaces';
import { findPublic } from './find-public-workspaces';
import { findById } from './find-workspace-by-id';

import { update } from './update-workspace';
import { create } from './create-workspace';
import { fork } from './fork-workspace';

export const workspaces = {
	create,
	update,
	fork,

	findAll,
	findFavorite,
	findPrivate,
	findPublic,
	findById,
};
