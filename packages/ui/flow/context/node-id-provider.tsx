import { createContext, FC, PropsWithChildren, useContext } from 'react';

const NodeIdContext = createContext({ id: '' });

interface Props {
	id: string;
}

export const NodeIdProvider: FC<PropsWithChildren<Props>> = ({
	id,
	children,
}) => {
	return (
		<NodeIdContext.Provider value={{ id }}>{children}</NodeIdContext.Provider>
	);
};

export const useNodeId = () => useContext(NodeIdContext);
