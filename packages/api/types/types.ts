import { ChunkingType, NodeType } from '@anima/core';
import { PromptModel } from './enums';

export type WorkspaceType = {
	id: string;
	name: string;
	description: string | null;
	webhookSettings: WebhookSettings | null;
	nodes: Node[];
	edges: Edge[];
	createdAt: Date;
	updatedAt: Date;
};

export type WebhookSettings = {
	url: string;
	headers: JsonValue;
};

export type JsonObject = { [Key in string]?: JsonValue };

export interface JsonArray extends Array<JsonValue> {}

export type JsonValue =
	| string
	| number
	| boolean
	| JsonObject
	| JsonArray
	| null;

export type WorkspaceCreateInput = {
	name: string;
};

export type Node = {
	id: string;
	type: NodeType;
	contents: any;
	label: string | null;
	description: string | null;
	isExecluded: boolean;
	ChunkBoundries: ChunkBoundries | null;
	inputChunkType: ChunkingType | null;
	inputSettings: InputSettings | null;
	inputFile: string | null;
	inputInlineText: string | null;
	promptExecutionHistory: string[];
	promptLastExecution: string | null;
	promptSettings: PromptSettings | null;
	createdAt: Date;
	updatedAt: Date;
	name: string;
	position: Position;
	flowId: string;
};

export type Edge = {
	id: string;
	graphId: string;
	source: string;
	target: string;
	flowId: string;
};

export type ChunkBoundries = {
	start: number;
	end: number;
};

export type InputSettings = {
	chunkSize: number | null;
	chunkOverlap: number | null;
	chunkPattern: string | null;
};

export type PromptSettings = {
	model: PromptModel;
	temperature: number;
	max_toekns: number;
	top_p: number;
	best_of: number;
	frequency_penalty: number;
	presence_penalty: number;
	sequence: string[];
};

export type Position = {
	x: number;
	y: number;
};
