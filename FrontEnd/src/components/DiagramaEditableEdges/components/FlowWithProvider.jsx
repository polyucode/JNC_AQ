import Flow from './Flow'
import { ReactFlowProvider } from 'react-flow-renderer'
import { edgeTypes } from '../initialElements'

function FlowWithProvider({ nodes, edges, onEdgesChange, onNodesChange, onConnect, nodeTypes, onEdgeUpdate, onEdgeUpdateStart, onEdgeUpdateEnd, connectionLineComponent }) {
    return (
        <ReactFlowProvider>
            <Flow
                nodes={nodes}
                edges={edges}
                onEdgesChange={onEdgesChange}
                onNodesChange={onNodesChange}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
                edgeTypes={edgeTypes}
                // onEdgeClick={handlerBorrarUnion}
                onEdgeUpdate={onEdgeUpdate}
                onEdgeUpdateStart={onEdgeUpdateStart}
                onEdgeUpdateEnd={onEdgeUpdateEnd}
                connectionLineComponent={connectionLineComponent}
            >
            </Flow>
        </ReactFlowProvider>
    )
}

export default FlowWithProvider