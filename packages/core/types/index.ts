import { Database, Json } from './db_types';
export * from './enums';

export enum PromptModesEnum {
	Complete = 'Complete',
	Insert = 'Insert',
	Edit = 'Edit',
}

export enum GPT3EngineEnum {
	Davinci002 = 'text-davinci-002',
	Curie001 = 'text-curie-001',
	Babbage001 = 'text-babbage-001',
	Ada001 = 'text-ada-001',
	Davinci001 = 'text-davinci-001',
	DavinciInstructBeta = 'davinci-instruct-beta',
	Davinci = 'davinci',
	CurieInstructBeta = 'curie-instruct-beta',
	Curie = 'curie',
	Babbage = 'babbage',
	Ada = 'ada',
}

export type Position = {
	x: number;
	y: number;
};

export type InputNode = Database['public']['Tables']['input_nodes']['Row'] & {
	position: Position;
};
export type PromptNode = Database['public']['Tables']['prompt_nodes']['Row'] & {
	position: Position;
};
export type OutputNode = Database['public']['Tables']['output_nodes']['Row'] & {
	position: Position;
};

export type CommentNode =
	Database['public']['Tables']['comment_nodes']['Row'] & { position: Position };

export type Edge = Database['public']['Tables']['edges']['Row'];

export type Flow = Database['public']['Tables']['flows']['Row'] & {
	prompt_nodes: PromptNode[];
	input_nodes: InputNode[];
	comment_nodes: CommentNode[];
	output_nodes: OutputNode[];
	edges: Edge[];
};

export type Workspace = Database['public']['Tables']['workspaces']['Row'] & {
	owner: Database['public']['Tables']['users']['Row'];
	flows: Flow[];
};

export enum OtherEngineEnum {
	Similarity = 'curie-similarity-fast',
}

export interface PromptSettings {
	model: GPT3EngineEnum | OtherEngineEnum | any;
	temperature: number;
	max_tokens: number;
	top_p: number;
	best_of: number;
	frequency_penalty: number;
	presence_penalty: number;
	stops: string[] | any;
}

export enum ChunksHandleTypeEnum {
	single = 'single',
	multiple = 'multiple',
}
export type BaseNodeData =
	| (Database['public']['Tables']['prompt_nodes']['Row'] & {
			timestamp: number;
	  })
	| Database['public']['Tables']['input_nodes']['Row']
	| Database['public']['Tables']['comment_nodes']['Row'];

export interface PromptNodeData {
	id: string;
	timestamp: number;
	label: string;
	description: string;
	result: string;
	chunks_range: { start: number; end: number };
	contents: Json;
	settings: PromptSettings;
}

export const initialPromptData: PromptNodeData = {
	id: 'anon',
	label: 'Untitled',
	chunks_range: { start: 0, end: 0 },
	description: '',
	result: '',
	timestamp: Date.now(),
	contents: { ops: [] },
	settings: {
		model: GPT3EngineEnum.Davinci002,
		temperature: 0,
		max_tokens: 500,
		top_p: 1,
		best_of: 1,
		frequency_penalty: 0,
		presence_penalty: 0,
		stops: [],
	},
};

export const initialNode = {
	label: '',
	chunks_range: [0, 0],
	description: '',
	result: '',
	contents: { ops: [] },
	settings: {
		model: GPT3EngineEnum.Davinci002,
		temperature: 0,
		max_tokens: 500,
		top_p: 1,
		best_of: 1,
		frequency_penalty: 0,
		presence_penalty: 0,
		sequences: [],
	},
};
