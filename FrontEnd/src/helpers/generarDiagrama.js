import { useCallback, useRef, useState } from 'react';
import { addEdge, applyEdgeChanges, updateEdge } from 'react-flow-renderer';
import NodoElemento from '../components/Diagrama/NodoElemento';
import { NodoElementoDashboard } from '../components/Diagrama/NodoElementoDashboard';
import { NodoGrupo } from '../components/Diagrama/NodoGrupo';

import Swal from 'sweetalert2';
import { GetIconoElementoPlanta } from '../api';

const nodeTypes = { nodoGrupo: NodoGrupo, nodoElemento: NodoElemento };
const nodeTypesDashboard = { nodoGrupo: NodoGrupo, nodoElemento: NodoElementoDashboard };

export const useDiagrama = () => {

    const [nodos, setNodos] = useState([]);
    const [lados, setLados] = useState([]);
    const [diagramaGenerado, setDiagramaGenerado] = useState(false);
    const [editandoDiagramaCargado, setEditandoDiagramaCargado] = useState(false);

    const edgeUpdateSuccessful = useRef(true);

    const onEdgesChange = useCallback(cambios => {
        // console.log('ENTRO EN EL EDDGES CHANGE')
        // setLados( (eds) => applyEdgeChanges(cambios, eds) )
    }, []);

    const onConnect = useCallback((params) => {
        console.log('ALBERTO CHANGE EDGE')
        setLados((eds) => addEdge(params, eds))
    }, []);

    //AMF INI MODIFICACION PARA BORRAR LADO
    const onEdgeUpdateStart = useCallback(() => {
        edgeUpdateSuccessful.current = false;
    }, []);

    const onEdgeUpdate = useCallback((oldEdge, newConnection) => {
        edgeUpdateSuccessful.current = true;
        setLados((els) => updateEdge(oldEdge, newConnection, els));
    }, []);

    const onEdgeUpdateEnd = useCallback((_, edge) => {
        if (!edgeUpdateSuccessful.current) {
            setLados((eds) => eds.filter((e) => e.id !== edge.id));
        }
        edgeUpdateSuccessful.current = true;
    }, []);
    //AMF FIN

    const modificarEditandoDiagramaCargadoTrue = () => {
        setEditandoDiagramaCargado(true);
    }
    const modificarEditandoDiagramaCargadoFalse = () => {
        setEditandoDiagramaCargado(false);
    }

    const modificarNodosDesdeFueraComponente = (nodos, lados) => {
        setNodos(nodos);
        setLados(lados);
    }

    const generarDiagrama = (numNiveles, elementosPlanta, setNodos2, setLados2) => {

        // Preparamos las variables necesarias
        const anchoNodoHijo = 180;
        const altoNodoHijo = 40;
        const anchoNodoPadre = 200;

        const espacioNombreNivel = 40;
        const separacion = 12;

        let posXPadre = 0;
        let nodosNiveles = [];
        let nodosElementos = [];

        if (elementosPlanta.length !== 0) {

            // Generación de los nodos padre
            for (let i = 1; i <= numNiveles; i++) {

                // Obtenemos los elementos del nivel y generamos el alto del nodo padre
                const elementosNivel = elementosPlanta.sort((a, b) => {
                    // Comparar primero por el nombre (orden alfabético)
                    if (a.nombre < b.nombre) return -1;
                    if (a.nombre > b.nombre) return 1;
                
                    // Si los nombres son iguales, comparar por número (orden numérico)
                    return a.numero - b.numero;
                }).filter(elemento => elemento.nivel === i);

                if (elementosNivel.length !== 0) {
                    const altoNodoPadre = espacioNombreNivel + (altoNodoHijo * elementosNivel.length) + (separacion * elementosNivel.length);

                    // Dato para saber donde poner los puntos de conexión
                    let posNivel = 0;

                    if (i === 1) {
                        posNivel = 0;
                    } else if (i === numNiveles) {
                        posNivel = 2;
                    } else {
                        posNivel = 1;
                    }

                    // Generamos el nodo
                    const nodoPadre = {
                        draggable: true,
                        dragHandle: '.custom-drag-handle',
                        id: `nivel-${i}`,
                        type: 'nodoGrupo',
                        data: { label: `Nivel ${i}` },
                        position: { x: posXPadre, y: 0 },
                        style: {
                            width: anchoNodoPadre,
                            height: altoNodoPadre,
                            zIndex: -1
                        }
                    }

                    // Preparamos datos para los elementos hijo
                    let posYHijo = espacioNombreNivel;

                    // Generamos los nodos hijo del padre
                    elementosNivel.map((elemento) => {

                        // Creamos el objeto del nodo hijo
                        const nodoHijo = {
                            id: `${elemento.nombre}-${elemento.numero}`,
                            type: 'nodoElemento',
                            data: {
                                id: elemento.id,
                                label: elemento.descripcion !== null ? `${elemento.nombre} ${elemento.descripcion}` : `${elemento.nombre} ${elemento.numero}`,
                                edges: posNivel,
                                verInsp: elemento.verInsp
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
                        nodosElementos.push(nodoHijo);

                    });

                    // Actualizamos la posición para el siguiente nodo
                    posXPadre = posXPadre + anchoNodoPadre + separacion;

                    // Finalmente añadimos el nodo a la lista
                    nodosNiveles.push(nodoPadre);
                }
            }

            // Seteamos todos los nodos en el estado principal
            setNodos([...nodosNiveles, ...nodosElementos]);
            setNodos2([...nodosNiveles, ...nodosElementos]);
            setLados2([]);
            setDiagramaGenerado(true);
        } else {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Error',
                text: `No hay elementos para generar el diagrama`,
                showConfirmButton: false,
                timer: 2000,
                showClass: {
                    popup: 'animate__animated animate__bounceIn'
                },
                hideClass: {
                    popup: 'animate__animated animate__bounceOut'
                }
            });
        }
    }

    return {
        nodos,
        lados,
        nodeTypes,
        nodeTypesDashboard,
        diagramaGenerado,
        generarDiagrama,
        onEdgesChange,
        onConnect,
        onEdgeUpdate,
        onEdgeUpdateStart,
        onEdgeUpdateEnd,
        editandoDiagramaCargado,
        modificarEditandoDiagramaCargadoTrue,
        modificarEditandoDiagramaCargadoFalse,
        modificarNodosDesdeFueraComponente
    }

}