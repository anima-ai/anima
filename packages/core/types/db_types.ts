export type Json =
	| string
	| number
	| boolean
	| null
	| { [key: string]: Json }
	| Json[];

export interface Database {
	public: {
		Tables: {
			comment_nodes: {
				Row: {
					id: number;
					created_at: string | null;
					contents: Json | null;
					flow_id: number | null;
					position: unknown | null;
				};
				Insert: {
					id?: number;
					created_at?: string | null;
					contents?: Json | null;
					flow_id?: number | null;
					position?: unknown | null;
				};
				Update: {
					id?: number;
					created_at?: string | null;
					contents?: Json | null;
					flow_id?: number | null;
					position?: unknown | null;
				};
			};
			edges: {
				Row: {
					id: number;
					created_at: string | null;
					flow_id: number | null;
					source: number;
					target: number;
					source_type: Database['public']['Enums']['node_type'];
					target_type: Database['public']['Enums']['node_type'];
				};
				Insert: {
					id?: number;
					created_at?: string | null;
					flow_id?: number | null;
					source: number;
					target: number;
					source_type?: Database['public']['Enums']['node_type'];
					target_type?: Database['public']['Enums']['node_type'];
				};
				Update: {
					id?: number;
					created_at?: string | null;
					flow_id?: number | null;
					source?: number;
					target?: number;
					source_type?: Database['public']['Enums']['node_type'];
					target_type?: Database['public']['Enums']['node_type'];
				};
			};
			flows: {
				Row: {
					id: number;
					created_at: string;
					updated_at: string;
					workspace_id: number | null;
				};
				Insert: {
					id?: number;
					created_at?: string;
					updated_at?: string;
					workspace_id?: number | null;
				};
				Update: {
					id?: number;
					created_at?: string;
					updated_at?: string;
					workspace_id?: number | null;
				};
			};
			input_nodes: {
				Row: {
					id: number;
					created_at: string;
					chunk_size: number;
					chunk_overlap: number;
					chunk_pattern: string;
					file: string | null;
					label: string;
					chunking_type: Database['public']['Enums']['chunking_type'];
					flow_id: number | null;
					position: unknown | null;
				};
				Insert: {
					id?: number;
					created_at?: string;
					chunk_size?: number;
					chunk_overlap?: number;
					chunk_pattern?: string;
					file?: string | null;
					label?: string;
					chunking_type?: Database['public']['Enums']['chunking_type'];
					flow_id?: number | null;
					position?: unknown | null;
				};
				Update: {
					id?: number;
					created_at?: string;
					chunk_size?: number;
					chunk_overlap?: number;
					chunk_pattern?: string;
					file?: string | null;
					label?: string;
					chunking_type?: Database['public']['Enums']['chunking_type'];
					flow_id?: number | null;
					position?: unknown | null;
				};
			};
			output_nodes: {
				Row: {
					id: number;
					created_at: string | null;
					contents: Json | null;
					flow_id: number | null;
					position: unknown | null;
					label: string;
					headers: unknown[];
					webhook_url: string;
					enabled: boolean;
					password: string | null;
				};
				Insert: {
					id?: number;
					created_at?: string | null;
					contents?: Json | null;
					flow_id?: number | null;
					position?: unknown | null;
					label?: string;
					headers?: unknown[];
					webhook_url?: string;
					enabled?: boolean;
					password?: string | null;
				};
				Update: {
					id?: number;
					created_at?: string | null;
					contents?: Json | null;
					flow_id?: number | null;
					position?: unknown | null;
					label?: string;
					headers?: unknown[];
					webhook_url?: string;
					enabled?: boolean;
					password?: string | null;
				};
			};
			prompt_nodes: {
				Row: {
					id: number;
					created_at: string;
					updated_at: string;
					label: string;
					description: string;
					result: string;
					contents: Json;
					flow_id: number | null;
					settings: unknown | null;
					position: unknown | null;
					chunks_range: unknown;
				};
				Insert: {
					id?: number;
					created_at?: string;
					updated_at?: string;
					label?: string;
					description?: string;
					result?: string;
					contents?: Json;
					flow_id?: number | null;
					settings?: unknown | null;
					position?: unknown | null;
					chunks_range?: unknown;
				};
				Update: {
					id?: number;
					created_at?: string;
					updated_at?: string;
					label?: string;
					description?: string;
					result?: string;
					contents?: Json;
					flow_id?: number | null;
					settings?: unknown | null;
					position?: unknown | null;
					chunks_range?: unknown;
				};
			};
			users: {
				Row: {
					id: string;
					email: string;
					first_name: string;
					last_name: string;
				};
				Insert: {
					id: string;
					email?: string;
					first_name?: string;
					last_name?: string;
				};
				Update: {
					id?: string;
					email?: string;
					first_name?: string;
					last_name?: string;
				};
			};
			workspaces: {
				Row: {
					id: number;
					created_at: string;
					updated_at: string;
					title: string;
					description: string;
					type: Database['public']['Enums']['workspace_type'];
					owner_id: string;
					is_favorite: boolean;
					is_public: boolean;
				};
				Insert: {
					id?: number;
					created_at?: string;
					updated_at?: string;
					title?: string;
					description?: string;
					type?: Database['public']['Enums']['workspace_type'];
					owner_id: string;
					is_favorite?: boolean;
					is_public?: boolean;
				};
				Update: {
					id?: number;
					created_at?: string;
					updated_at?: string;
					title?: string;
					description?: string;
					type?: Database['public']['Enums']['workspace_type'];
					owner_id?: string;
					is_favorite?: boolean;
					is_public?: boolean;
				};
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			[_ in never]: never;
		};
		Enums: {
			chunking_type: 'PATTERN' | 'TOKENS';
			gpt3_models:
				| 'text-davinci-002'
				| 'text-curie-001'
				| 'text-babbage-001'
				| 'text-ada-001'
				| 'text-davinci-001'
				| 'davinci-instruct-beta'
				| 'davinci'
				| 'curie-instruct-beta'
				| 'curie'
				| 'babbage'
				| 'ada';
			node_type: 'INPUT' | 'PROMPT' | 'COMMENT' | 'OUTPUT';
			workspace_type: 'PUBLIC' | 'PRIVATE';
		};
	};
}
