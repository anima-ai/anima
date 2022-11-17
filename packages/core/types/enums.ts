export enum ChunkingType {
	PATTERN = 'PATTERN',
	TOKENS = 'TOKENS',
}

export enum GPT3_MODELS {
	text_davinci_002 = 'text-davinci-002',
	text_davinci_001 = 'text-davinci-001',
	text_curie_001 = 'text-curie-001',
	text_babbage_001 = 'text-babbage-001',
	text_ada_001 = 'text-ada-001',
	davinci = 'davinci',
	curie = 'curie',
	babbage = 'babbage',
	ada = 'ada',
	davinci_instruct_beta = 'davinci-instruct-beta',
	curie_instruct_beta = 'curie-instruct-beta',
}

export enum NodeType {
	INPUT = 'INPUT',
	PROMPT = 'PROMPT',
	COMMENT = 'COMMENT',
	OUTPUT = 'OUTPUT',
}

export enum WorkspaceType {
	PRIVATE = 'PRIVATE',
	PUBLIC = 'PUBLIC',
}

export enum WorkspaceFilterType {
	all = 'My Workspaces',
	favorite = 'Favorites',
	private = 'Private',
	public = 'Public',
}
