import { ConnectionMode } from '@xyflow/react'
import ReactFlow, { Background, useReactFlow } from 'react-flow-renderer'

function Flow({ nodes, edges, onEdgesChange, onNodesChange, onConnect, nodeTypes, edgeTypes, onEdgeUpdate, onEdgeUpdateStart, onEdgeUpdateEnd, connectionLineComponent }) {
    const { setEdges } = useReactFlow();
    return (
        <ReactFlow
            nodes={nodes}
            edges={edges}
            onEdgesChange={onEdgesChange}
            onNodesChange={onNodesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            fitView
            // onEdgeClick={handlerBorrarUnion}
            onEdgeUpdate={onEdgeUpdate}
            onEdgeUpdateStart={onEdgeUpdateStart}
            onEdgeUpdateEnd={onEdgeUpdateEnd}
            snapToGrid
            connectionMode={ConnectionMode.Loose}
            connectionLineComponent={connectionLineComponent}
        >
            <Background />
        </ReactFlow>
    )
}

export default Flow