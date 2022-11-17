import create from 'zustand';

import { initialPromptData, PromptNodeData } from './types';

type RFState = {
	visible: boolean;
	onShow: (id: string, data: PromptNodeData) => void;
	onHide: () => void;
	toggleReadOnly: () => void;
	readOnly: boolean;
	data: PromptNodeData;
	nodeId: string;
};

const useActionSheet = create<RFState>((set, get) => ({
	visible: false,
	data: initialPromptData,
	nodeId: '',
	readOnly: false,
	toggleReadOnly: () => set({ readOnly: !get().readOnly }),
	onShow: (id, data) => {
		set({
			visible: true,
			data: data,
			readOnly: false,
			nodeId: String(id),
		});
	},
	onHide: () => {
		set({
			visible: false,
			readOnly: false,
		});
	},
}));

export { useActionSheet as default, useActionSheet };
