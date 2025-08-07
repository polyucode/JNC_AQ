import { useCallback, useState } from 'react';
import ReactFlow, { addEdge, applyEdgeChanges, applyNodeChanges, Background } from 'react-flow-renderer';
import { useDiagrama } from '../../helpers/generarDiagrama';
import { NodoGrupo } from './NodoGrupo';


const initialEdges = [{ id: 'b-c', source: 'B', target: 'C' }];

const nodeTypes = { nodoGrupo: NodoGrupo };

const nodeDataMock = [
  {
    Id: 0,
    CodigoCliente: 1234,
    Oferta: 2222,
    Id_Planta: 3333,
    Nivel: 1,
    Elemento: 31,
    Visible: true,
    Conecta: '',
    AddDate: new Date,
    AddIdUser: 1,
    ModDate: new Date,
    ModIdUser: 1 ,
    DelDate: new Date,
    DelIdUser: 1,
    Deleted: false,
  },
  {
    Id: 0,
    CodigoCliente: 1234,
    Oferta: 2222,
    Id_Planta: 3333,
    Nivel: 1,
    Elemento: 32,
    Visible: true,
    Conecta: '',
    AddDate: new Date,
    AddIdUser: 1,
    ModDate: new Date,
    ModIdUser: 1 ,
    DelDate: new Date,
    DelIdUser: 1,
    Deleted: false,
  },
  {
    Id: 0,
    CodigoCliente: 1234,
    Oferta: 2222,
    Id_Planta: 3333,
    Nivel: 2,
    Elemento: 32,
    Visible: true,
    Conecta: '',
    AddDate: new Date,
    AddIdUser: 1,
    ModDate: new Date,
    ModIdUser: 1 ,
    DelDate: new Date,
    DelIdUser: 1,
    Deleted: false,
  },
  {
    Id: 0,
    CodigoCliente: 1234,
    Oferta: 2222,
    Id_Planta: 3333,
    Nivel: 3,
    Elemento: 32,
    Visible: true,
    Conecta: '',
    AddDate: new Date,
    AddIdUser: 1,
    ModDate: new Date,
    ModIdUser: 1 ,
    DelDate: new Date,
    DelIdUser: 1,
    Deleted: false,
  },
  {
    Id: 0,
    CodigoCliente: 1234,
    Oferta: 2222,
    Id_Planta: 3333,
    Nivel: 4,
    Elemento: 32,
    Visible: true,
    Conecta: '',
    AddDate: new Date,
    AddIdUser: 1,
    ModDate: new Date,
    ModIdUser: 1 ,
    DelDate: new Date,
    DelIdUser: 1,
    Deleted: false,
  },
  {
    Id: 0,
    CodigoCliente: 1234,
    Oferta: 2222,
    Id_Planta: 3333,
    Nivel: 5,
    Elemento: 32,
    Visible: true,
    Conecta: '',
    AddDate: new Date,
    AddIdUser: 1,
    ModDate: new Date,
    ModIdUser: 1 ,
    DelDate: new Date,
    DelIdUser: 1,
    Deleted: false,
  }
]

export const Diagrama = ({ nodeData = nodeDataMock }) => {

  // Preparamos la variable de los nodos
  //const [nodes, setNodes] = useState([]);
  let nodes = [];
  const [edges, setEdges] = useState(initialEdges);

  // Seteamos el alto base para el grupo
  const baseHeight = 30;
  const elementHeight = 40;

  // Obtenemos los datos de los elementos y los dividimos por nivel
  const nodeNivel1 = nodeData.filter( node => node.Nivel === 1 );
  const nodeNivel2 = nodeData.filter( node => node.Nivel === 2 );
  const nodeNivel3 = nodeData.filter( node => node.Nivel === 3 );
  const nodeNivel4 = nodeData.filter( node => node.Nivel === 4 );
  const nodeNivel5 = nodeData.filter( node => node.Nivel === 5 );

  // Comprobamos si existen elementos por cada nivel y creamos los grupos si los hay
  if( nodeNivel1.length > 0 ) {
    nodes.push({
      id: 'nivel-1',
      type: 'nodoGrupo',
      data: { label: 'Nivel 1' },
      position: { x: 0, y: 0 },
      style: {
        width: 150,
        height: baseHeight + ( elementHeight * nodeNivel1.length ),
        zIndex: -1
      },
      draggable: false
    });
  }

  if( nodeNivel2.length > 0 ) {
    nodes.push({
      id: 'nivel-2',
      type: 'nodoGrupo',
      data: { label: 'Nivel 2' },
      position: { x: 160, y: 0 },
      style: {
        width: 150,
        height: baseHeight + ( elementHeight * nodeNivel2.length ),
        zIndex: -1
      },
      draggable: false
    });
  }

  if( nodeNivel3.length > 0 ) {
    nodes.push({
      id: 'nivel-3',
      type: 'nodoGrupo',
      data: { label: 'Nivel 3' },
      position: { x: 320, y: 0 },
      style: {
        width: 150,
        height: baseHeight + ( elementHeight * nodeNivel3.length ),
        zIndex: -1
      },
      draggable: false
    });
  }

  if( nodeNivel4.length > 0 ) {
    nodes.push({
      id: 'nivel-4',
      type: 'nodoGrupo',
      data: { label: 'Nivel 4' },
      position: { x: 480, y: 0 },
      style: {
        width: 150,
        height: baseHeight + ( elementHeight * nodeNivel4.length ),
        zIndex: -1
      },
      draggable: false
    });
  }

  if( nodeNivel5.length > 0 ) {
    nodes.push({
      id: 'nivel-5',
      type: 'nodoGrupo',
      data: { label: 'Nivel 5' },
      position: { x: 640, y: 0 },
      style: {
        width: 150,
        height: baseHeight + ( elementHeight * nodeNivel5.length ),
        zIndex: -1
      },
      draggable: false
    });
  }

    // const onNodesChange = useCallback(
    //     (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    //     [setNodes]
    // );

    // const onEdgesChange = useCallback(
    //     (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    //     [setEdges]
    // );

    // const onConnect = useCallback(
    //     (connection) => setEdges((eds) => addEdge(connection, eds)),
    //     [setEdges]
    // );

    return (     
        <ReactFlow
            nodes={nodes}
            edges={edges}
            // onNodesChange={onNodesChange}
            // onEdgesChange={onEdgesChange}
            // onConnect={onConnect}
            nodeTypes={ nodeTypes }
            fitView
            //style={rfStyle}
            //attributionPosition="top-right"
        >
            <Background />
        </ReactFlow>
    )
}