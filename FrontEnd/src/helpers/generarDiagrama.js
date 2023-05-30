import { useCallback, useState } from 'react';
import { addEdge, applyEdgeChanges } from 'react-flow-renderer';
import { NodoElemento } from '../components/Diagrama/NodoElemento';
import { NodoElementoDashboard } from '../components/Diagrama/NodoElementoDashboard';
import { NodoGrupo } from '../components/Diagrama/NodoGrupo';

const nodeTypes = { nodoGrupo: NodoGrupo, nodoElemento: NodoElemento };
const nodeTypesDashboard = { nodoGrupo: NodoGrupo, nodoElemento: NodoElementoDashboard };

export const useDiagrama = () => {

    const [nodos, setNodos] = useState([]);
    const [lados, setLados] = useState([]);
    const [diagramaGenerado, setDiagramaGenerado] = useState(false);

    const onEdgesChange = useCallback( cambios => {
        setLados( (eds) => applyEdgeChanges(cambios, eds) )
    },[]);

    const onConnect = useCallback( params => {
        setLados( (eds) => addEdge(params, eds) )
    },[]);

    const generarDiagrama = ( numNiveles, elementosPlanta ) => {

        console.log(numNiveles, "NUM NIVELESS")
        console.log(elementosPlanta, "ELEMENTOS PLANTA")

        // Preparamos las variables necesarias
        const anchoNodoHijo = 120;
        const altoNodoHijo = 40;
        const anchoNodoPadre = 120;

        const espacioNombreNivel = 40;
        const separacion = 8;

        let posXPadre = 0;
        let nodosNiveles = [];
        let nodosElementos = [];

        // Generación de los nodos padre
        for( let i = 1; i <= numNiveles; i++) {

            // Obtenemos los elementos del nivel y generamos el alto del nodo padre
            const elementosNivel = elementosPlanta.filter( elemento => elemento.nivel === i );
            const altoNodoPadre = espacioNombreNivel + ( altoNodoHijo * elementosNivel.length ) + ( separacion * elementosNivel.length );

            // Dato para saber donde poner los puntos de conexión
            let posNivel = 0;

            if( i === 1 ) {
                posNivel = 0;
            } else if( i === numNiveles ) {
                posNivel = 2;
            } else {
                posNivel = 1;
            }

            // Generamos el nodo
            const nodoPadre = {
                id: `nivel-${ i }`,
                type: 'nodoGrupo',
                data: { label: `Nivel ${ i }` },
                position: { x: posXPadre, y: 0 },
                style: {
                    width: anchoNodoPadre,
                    height: altoNodoPadre,
                    zIndex: -1
                },
                draggable: false
            }

            // Preparamos datos para los elementos hijo
            let posYHijo = espacioNombreNivel;

            // Generamos los nodos hijo del padre
            elementosNivel.map( (elemento) => {

                // Creamos el objeto del nodo hijo
                const nodoHijo = {
                    id: `${ elemento.nombre }-${ elemento.numero }`,
                    type: 'nodoElemento',
                    data: {
                        id: elemento.id,
                        label: `${ elemento.nombre } ${ elemento.numero }`,
                        edges: posNivel
                    },
                    position: { x: separacion, y: posYHijo },
                    style: {
                        width: anchoNodoHijo,
                        height: altoNodoHijo
                    },
                    parentNode: nodoPadre.id,
                    draggable: false
                }

                // Seteamos la posición para el nuevo elemento
                posYHijo = posYHijo + altoNodoHijo + separacion;

                // Añadimos el nodo elemento a la lista
                nodosElementos.push( nodoHijo );

            });

            // Actualizamos la posición para el siguiente nodo
            posXPadre = posXPadre + anchoNodoPadre + separacion;

            // Finalmente añadimos el nodo a la lista
            nodosNiveles.push( nodoPadre );

        }

        // Seteamos todos los nodos en el estado principal
        setNodos([ ...nodosNiveles, ...nodosElementos ]);
        setDiagramaGenerado(true);

    }

    return {
        nodos,
        lados,
        nodeTypes,
        nodeTypesDashboard,
        diagramaGenerado,
        generarDiagrama,
        onEdgesChange,
        onConnect
    }

}