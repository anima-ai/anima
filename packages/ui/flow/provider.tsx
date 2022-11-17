import { FC, PropsWithChildren } from 'react';
import { ReactFlowProvider } from 'reactflow';

const FlowProvider: FC<PropsWithChildren> = ({ children }) => {
	return <ReactFlowProvider>{children}</ReactFlowProvider>;
};

export default FlowProvider;
