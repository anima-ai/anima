import { FC, PropsWithChildren, createContext } from 'react';

type PromptProviderProps = {
	id: string;
};

const PromptContext = createContext<PromptProviderProps>({ id: '' });

export const PromptProvider: FC<
	PropsWithChildren<{ value: PromptProviderProps }>
> = ({ children, value }) => {
	return (
		<PromptContext.Provider value={value}>{children}</PromptContext.Provider>
	);
};
