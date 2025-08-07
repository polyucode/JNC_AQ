import React, { useState, useEffect, useContext } from 'react';
import { Autocomplete, Typography, Button, TextField, Card, Grid, List, ListItemButton, ListItemText, Tooltip, Alert, RadioGroup, Radio, FormControl, FormLabel } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import SaveIcon from '@mui/icons-material/Save';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import DownloadIcon from '@mui/icons-material/Download';
import Swal from 'sweetalert2';
import { camelCase } from 'lodash';
import ReactFlow, { Background, ConnectionMode, ReactFlowProvider, useEdgesState, useNodesState } from "react-flow-renderer";
import { MainLayout } from "../layout/MainLayout";
import {
    getAnalisisNivelesPlantasCliente, getAnalisisNivelesPlantasClientePorIdNivel, getClientes, getConfNivelesPlantasClientePorPlanta, getConfPlantaCliente,
    getConfPlantaClientePorClienteOferta, getElementoPorId, getAnalisis, getOfertas, getParametros, postAnalisisNivelesPlantasCliente, postConfNivelesPlantasCliente,
    postConfPlantaCliente, postElementos, postParametrosElementoPlantaCliente, putAnalisisNivelesPlantasCliente, putConfNivelesPlantasCliente, putConfPlantaCliente, putElementos, deleteConfPlantaCliente, deleteConfNivelesPlantasCliente, deleteAnalisisNivelesPlantasCliente, getElementosPlanta, deleteElementosPlanta, getElementoPlantaPorId, postElementosPlanta, putElementosPlanta, getElementos,
    postAnalisis,
    putAnalisis,
    SubirIconoElementoPlanta
} from "../api";
import { NivelPlanta } from "../components/Plantas/NivelPlanta";
import { CheckBoxAnalisis } from "../components/Plantas/CheckBoxAnalisis";
import { useDiagrama } from "../helpers/generarDiagrama";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useNavigate } from 'react-router-dom';

import DeleteIcon from '@mui/icons-material/Delete';
import { preguntarParaEliminar } from '../helpers/swalHelper';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { insertarBotonesModal } from '../helpers/insertarBotonesModal';
import { ModalLayout4 } from '../components/ModalLayout4';
import { AuthContext } from '../context/AuthContext';
import { edgeTypes, initialEdges, initialNodes } from '../components/DiagramaEditableEdges/initialElements';
import { ConnectionLine } from '../components/DiagramaEditableEdges/edges/ConnectionLine'
import FlowWithProvider from '../components/DiagramaEditableEdges/components/FlowWithProvider';

export const PlantasPage = () => {

    /** ESTADOS **/

    // Configuración planta del cliente
    const [confPlantaCliente, setConfPlantaCliente] = useState({
        Id: 0,
        CodigoCliente: 0,
        NombreCliente: '',
        Oferta: 0,
        NumNiveles: '',
        Diagrama: ""
    });

    const [elementoNuevo, setElementoNuevo] = useState({
        id: 0,
        nombre: '',
        nombreIcono: '',
        addDate: null,
        addIdUser: null,
        modDate: null,
        modIdUser: null,
        delDate: null,
        delIdUser: null,
        deleted: null
    });

    const [elementoCambiado, setElementoCambiado] = useState({
        id: 0,
        nombre: '',
        nombreIcono: '',
        addDate: null,
        addIdUser: null,
        modDate: null,
        modIdUser: null,
        delDate: null,
        delIdUser: null,
        deleted: null
    })

    const [analisisNuevo, setAnalisisNuevo] = useState({
        id: 0,
        nombre: '',
        tipo: 0,
        addDate: null,
        addIdUser: null,
        modDate: null,
        modIdUser: null,
        delDate: null,
        delIdUser: null,
        deleted: null
    })

    const [analisisCambiado, setAnalisisCambiado] = useState({
        id: 0,
        nombre: '',
        tipo: 0,
        addDate: null,
        addIdUser: null,
        modDate: null,
        modIdUser: null,
        delDate: null,
        delIdUser: null,
        deleted: null
    })

    const [analisisActivo, setAnalisisActivo] = useState({});
    const [elementoActivo, setElementoActivo] = useState({});

    const [crearPlanta, setCrearPlanta] = useState(true);
    const [plantaCreada, setPlantaCreada] = useState(false);
    const [niveles, setNiveles] = useState([]);
    const [permiteCambiarPlanta, setPermiteCambiarPlanta] = useState(false);

    // Datos de los autocomplete
    const [clientes, setClientes] = useState([]);
    const [ofertas, setOfertas] = useState([]);
    const [analisis, setAnalisis] = useState([]);
    const [parametros, setParametros] = useState([]);
    const [elementos, setElementos] = useState([]);

    const [textFieldValue, setTextFieldValue] = useState('');
    const [textFieldValueAnalisis, setTextFieldValueAnalisis] = useState('');

    // Listado de elementos
    const [elementosPlanta, setElementosPlanta] = useState([]);
    const [contadorElemento, setContadorElemento] = useState({});
    const [indiceElemento, setIndiceElemento] = useState(-1);
    const [elementoSeleccionado, setElementoSeleccionado] = useState(0);

    const [snackData, setSnackData] = useState({ open: false, msg: 'Testing', severity: 'success' });
    const [confNivelesPlantaCliente, setConfNivelesPlantaCliente] = useState([]);
    const [analisisNiveles, setAnalisisNiveles] = useState([]);
    const [diagrama, setDiagrama] = useState([])
    const [datosGuardados, setDatosGuardados] = useState(false);
    const [diagramaGuardado, setDiagramaGuardado] = useState(false);
    const [estadoGenerarDiagrama, setEstadoGenerarDiagrama] = useState(false);

    const [estadoEliminarPlanta, setEstadoEliminarPlanta] = useState(false);

    const [errorElemento, setErrorElemento] = useState(false);
    const [errorElementoCambiado, setErrorElementoCambiado] = useState(false);
    const [errorAnalisis, setErrorAnalisis] = useState(false);

    const [openModal, setOpenModal] = useState(false);
    const [openModalElemento, setOpenModalElemento] = useState(false);
    const [openModalEditar, setOpenModalEditar] = useState(false);
    const [openModalEditarElemento, setOpenModalEditarElemento] = useState(false);

    /** HOOKS **/
    const navigate = useNavigate();
    const [nodos2, setNodos2, onNodesChange] = useNodesState([]);
    const [lados2, setLados2] = useEdgesState([]);
    const { nodos, lados, nodeTypes, diagramaGenerado, generarDiagrama, onEdgesChange, onConnect, onEdgeUpdate, onEdgeUpdateStart, onEdgeUpdateEnd, editandoDiagramaCargado, modificarEditandoDiagramaCargadoTrue, modificarEditandoDiagramaCargadoFalse, modificarNodosDesdeFueraComponente } = useDiagrama();

    const { user } = useContext(AuthContext);

    const [inputCodigoCliente, setInputCodigoCliente] = useState('');
    const [inputNombreCliente, setInputNombreCliente] = useState('');
    const [inputOferta, setInputOferta] = useState('');

    const [iconoElemento, setIconoElemento] = useState({});

    /** EFECTOS **/

    // Obtenemos todos los datos necesarios de la base de datos
    useEffect(() => {

        getClientes()
            .then(resp => setClientes(resp.filter(cliente => !cliente.deleted)));

        getOfertas()
            .then(resp => setOfertas(resp.filter(oferta => !oferta.deleted)));

        getParametros()
            .then(resp => setParametros(resp.filter(param => !param.deleted)));

        getElemento();

        getAnalisi();

    }, []);

    const getElemento = async () => {
        const resp = await getElementos();
        setElementos(resp.filter(el => !el.deleted));
    }

    const getAnalisi = async () => {
        const resp = await getAnalisis();
        setAnalisis(resp.filter(an => !an.deleted));
    }


    // Convierte los datos del diagrama en un string para almacenar en la base de datos
    useEffect(() => {
        // guardarNuevoLocationNodos2);
        const datosDiagrama = {
            nodos,
            lados
        }
        const datosDiagrama2 = {
            nodos2,
            lados2
        }
        if (editandoDiagramaCargado === true) {
            modificarNodosDesdeFueraComponente(datosDiagrama.nodos, datosDiagrama.lados);
            setNodos2(datosDiagrama2.nodos2);
            setLados2(datosDiagrama.lados);
        } else {
            guardarNuevoLocationNodos1();
            modificarNodosDesdeFueraComponente(datosDiagrama.nodos, datosDiagrama.lados);
            setNodos2(datosDiagrama2.nodos2);
            setLados2(datosDiagrama.lados);
        }
        setConfPlantaCliente({
            ...confPlantaCliente,
            Diagrama: JSON.stringify(datosDiagrama)
        });

    }, [nodos, lados]);

    // Efecto que oculta el mensaje pasados unos segundos
    useEffect(() => {

        if (snackData.open) {

            setTimeout(() => {
                document.getElementById('snack').classList.add('animate__flipOutX');
            }, 2000);

            setTimeout(() => {
                setSnackData(prevSnackData => ({ ...prevSnackData, open: false }));
                document.getElementById('snack').classList.remove('animate__flipOutX');
            }, 2800);

        }

    }, [snackData.open]);

    // Acemos una petición automáticamente para saber si existe la planta o no
    useEffect(() => {
        if (confPlantaCliente.CodigoCliente !== null && confPlantaCliente.Oferta !== null) {
            getConfPlantaClientePorClienteOferta(confPlantaCliente.CodigoCliente, confPlantaCliente.Oferta)
                .then(res => {
                    if (res == null) {
                        setCrearPlanta(true);
                    } else {
                        setCrearPlanta(false);
                        setConfPlantaCliente(prev => ({ ...prev, NumNiveles: res.numNiveles.toString() }));
                    }

                });
        } else {
            setCrearPlanta(true)
        }


    }, [confPlantaCliente.CodigoCliente, confPlantaCliente.Oferta]);

    // Actualizamos el contador (por si se crean mas elementos)
    useEffect(() => {

        let contadorLocal = {};

        // Solo generamos el contador si no existe ninguno
        if (Object.entries(contadorElemento).length === 0) {

            elementosPlanta.map(elemento => {

                const texto = elemento.nombre;

                if (contadorLocal[texto]) {
                    contadorLocal = {
                        ...contadorLocal,
                        [texto]: contadorLocal[texto] + 1
                    }
                } else {
                    contadorLocal = {
                        ...contadorLocal,
                        [texto]: 1
                    }
                }

            });

            setContadorElemento({ ...contadorLocal });

        }

    }, [elementosPlanta]);


    // FUNCIONES



    const handleCrearCargarPlanta = async () => {

        let numNivelesInt = 0;

        // Comprobamos el valor del número de niveles
        if (confPlantaCliente.NumNiveles === '') {
            numNivelesInt = 0;
        } else {
            numNivelesInt = parseInt(confPlantaCliente.NumNiveles, 10);
        }

        // Comprobamos para que no hayan errores
        if (numNivelesInt > 5) {

            // Avisamos al usuario
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Error',
                text: 'El número máximo de niveles que se pueden crear son 5',
                showConfirmButton: false,
                timer: 2000,
                showClass: {
                    popup: 'animate__animated animate__bounceIn'
                },
                hideClass: {
                    popup: 'animate__animated animate__bounceOut'
                }
            });
            return;



        } else if (confPlantaCliente.CodigoCliente == null || confPlantaCliente.Oferta == null || numNivelesInt <= 0 || numNivelesInt == null) {

            // Avisamos al usuario
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Error',
                text: 'Faltan introducir datos correctos para crear los niveles',
                showConfirmButton: false,
                timer: 2000,
                showClass: {
                    popup: 'animate__animated animate__bounceIn'
                },
                hideClass: {
                    popup: 'animate__animated animate__bounceOut'
                }
            });
            return;

        } else {

            setPermiteCambiarPlanta(true);
            // Comprobamos si se debe crear o cargar la planta
            if (crearPlanta) {

                // Petición para crear la planta
                const resp = await postConfPlantaCliente({ ...confPlantaCliente, NumNiveles: numNivelesInt });
                setConfPlantaCliente(prevState => ({ ...prevState, Id: resp.id }));

                // Indicamos que la planta ha sido creada
                setPlantaCreada(true);

                // Generamos los niveles según lo indicado por el usuario
                for (let i = 0; i < confPlantaCliente.NumNiveles; i++) {
                    setNiveles(prevState => [...prevState, i + 1]);
                }

            } else {

                // Obtener los datos de la planta
                const respPlanta = await getConfPlantaClientePorClienteOferta(confPlantaCliente.CodigoCliente, confPlantaCliente.Oferta);

                if (respPlanta) {
                    setEstadoEliminarPlanta(true)
                    setEstadoGenerarDiagrama(true)
                }

                const datosDiagrama = JSON.parse(respPlanta.diagrama);
                setNodos2(datosDiagrama.nodos)
                setLados2(datosDiagrama.lados)
                modificarNodosDesdeFueraComponente(datosDiagrama.nodos, datosDiagrama.lados);
                modificarEditandoDiagramaCargadoTrue();


                // Actualizamos los datos de la planta
                setConfPlantaCliente(prevState => ({ ...prevState, Id: respPlanta.id, NumNiveles: respPlanta.numNiveles, Diagrama: respPlanta.diagrama }));
                setPlantaCreada(true);

                // Generamos los niveles según lo indicado por el usuario
                for (let i = 0; i < respPlanta.numNiveles; i++) {
                    setNiveles(prevState => [...prevState, i + 1]);
                }

                // Obtenemos todos los niveles
                const respNiveles = await getConfNivelesPlantasClientePorPlanta(respPlanta.id)
                setConfNivelesPlantaCliente(respNiveles);

                // Obtenemos todos los registros de analisis - elemento (nivel)
                const respAnalisis = await getAnalisisNivelesPlantasCliente();

                let niveles = [];

                // Recorremos cada nivel para obtener los datos del elemento
                const nivelesPromise = await Promise.all(
                    respNiveles.map(async (nivel) => {

                        // Obtenemos los datos del elemento
                        const resp = await getElementoPlantaPorId(nivel.id_Elemento);

                        // Obtenemos los analisis por este elemento
                        const analisisFiltro = respAnalisis.filter(anali => anali.id_NivelesPlanta === nivel.id)

                        // Preparamos el objeto de analisis
                        let analisisObjeto = {}

                        // Recorremos la lista de analisis para crear un objeto coherente
                        analisisFiltro.map(an => {

                            // Evaluamos si este elemento está desmarcado (para no añadirlo al objeto)
                            if (!an.deleted) {

                                // Preparamos el nombre del analisis
                                const nombreAnalisis = analisis.filter(anali => anali.id === an.id_Analisis)[0].nombre;

                                // Añadimos el análisis al objeto
                                analisisObjeto = { ...analisisObjeto, [nombreAnalisis]: true };

                            }

                        });

                        // Creamos el objecto con los datos
                        if (resp != null) {
                            niveles.push({
                                id: resp.id,
                                nivel: nivel.nivel,
                                nombre: resp.nombre,
                                numero: resp.numero,
                                nombreIcono: resp.nombreIcono,
                                descripcion: resp.descripcion,
                                verInsp: resp.verInsp,
                                analisis: analisisObjeto,
                                nombreIcono: resp.nombreIcono,
                            });

                        }

                    })
                );

                // Añadimos el elemento al estado
                setElementosPlanta([...niveles]);
            }

        }

    }

    const handleVaciarBusqueda = () => {
        const confVacia = {
            Id: 0,
            CodigoCliente: 0,
            NombreCliente: '',
            Oferta: 0,
            NumNiveles: '',
            Diagrama: ""
        }
        setNodos2([]);
        setLados2([]);
        modificarNodosDesdeFueraComponente([], []);
        modificarEditandoDiagramaCargadoFalse()
        setConfPlantaCliente(confVacia);
        setElementosPlanta([]);
        setNiveles([]);
        setEstadoEliminarPlanta(false);
        setEstadoGenerarDiagrama(false);
        setPlantaCreada(false);
        setPermiteCambiarPlanta(false);
    }

    const addNivelPlanta = async () => {
        const nivelesTotalesActualizados = parseInt(confPlantaCliente.NumNiveles, 10) + 1
        if (nivelesTotalesActualizados > 5) {
            // Avisamos al usuario
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Error',
                text: 'El número máximo de niveles que se pueden crear son 5',
                showConfirmButton: false,
                timer: 2000,
                showClass: {
                    popup: 'animate__animated animate__bounceIn'
                },
                hideClass: {
                    popup: 'animate__animated animate__bounceOut'
                }
            });
            return;
        }

        if (plantaCreada) {
            putConfPlantaCliente({
                ...confPlantaCliente,
                NumNiveles: nivelesTotalesActualizados
            });

            setConfPlantaCliente({
                ...confPlantaCliente,
                NumNiveles: nivelesTotalesActualizados
            })
            const respPlanta = await getConfPlantaClientePorClienteOferta(confPlantaCliente.CodigoCliente, confPlantaCliente.Oferta);

            if (respPlanta) {
                setEstadoEliminarPlanta(true)
                setEstadoGenerarDiagrama(true)
            }

            setPlantaCreada(true);

            setNiveles([])

            // Generamos los niveles según lo indicado por el usuario
            for (let i = 0; i < nivelesTotalesActualizados; i++) {
                setNiveles(prevState => [...prevState, i + 1]);
            }

            // Obtenemos todos los niveles
            const respNiveles = await getConfNivelesPlantasClientePorPlanta(respPlanta.id)
            setConfNivelesPlantaCliente(respNiveles);

            // Obtenemos todos los registros de analisis - elemento (nivel)
            const respAnalisis = await getAnalisisNivelesPlantasCliente();

            let niveles = [];

            // Recorremos cada nivel para obtener los datos del elemento
            const nivelesPromise = await Promise.all(
                respNiveles.map(async (nivel) => {

                    // Obtenemos los datos del elemento
                    const resp = await getElementoPlantaPorId(nivel.id_Elemento);

                    // Obtenemos los analisis por este elemento
                    const analisisFiltro = respAnalisis.filter(anali => anali.id_NivelesPlanta === nivel.id)

                    // Preparamos el objeto de analisis
                    let analisisObjeto = {}

                    // Recorremos la lista de analisis para crear un objeto coherente
                    analisisFiltro.map(an => {

                        // Evaluamos si este elemento está desmarcado (para no añadirlo al objeto)
                        if (!an.deleted) {

                            // Preparamos el nombre del analisis
                            const nombreAnalisis = analisis.filter(anali => anali.id === an.id_Analisis)[0].nombre;

                            // Añadimos el análisis al objeto
                            analisisObjeto = { ...analisisObjeto, [nombreAnalisis]: true };

                        }

                    });

                    // Creamos el objecto con los datos
                    if (resp != null) {

                        niveles.push({
                            id: resp.id,
                            nivel: nivel.nivel,
                            nombre: resp.nombre,
                            numero: resp.numero,
                            descripcion: resp.descripcion,
                            analisis: analisisObjeto
                        });

                    }

                })
            );
        } else {
            const respPlanta = await getConfPlantaClientePorClienteOferta(confPlantaCliente.CodigoCliente, confPlantaCliente.Oferta);
            if (respPlanta) {
                putConfPlantaCliente({
                    ...respPlanta,
                    NumNiveles: nivelesTotalesActualizados
                });

                setConfPlantaCliente({
                    ...confPlantaCliente,
                    NumNiveles: nivelesTotalesActualizados
                })
            }
        }
    }

    const handleConfPlantaClienteChange = (event) => {

        switch (event.target.tagName) {

            case 'LI':

                const name = event.target.id.split('-')[0];
                setConfPlantaCliente({
                    ...confPlantaCliente,
                    [name]: parseInt(event.target.textContent, 10)
                });

                break;

            case 'INPUT':

                setConfPlantaCliente({
                    ...confPlantaCliente,
                    [event.target.name]: event.target.value
                });

                break;

            default:
                break;

        }

    }

    const handleAddAnalisis = () => {
        setOpenModal(true)

        setAnalisisNuevo({
            id: 0,
            nombre: '',
            tipo: 0,
            addDate: null,
            addIdUser: null,
            modDate: null,
            modIdUser: null,
            delDate: null,
            delIdUser: null,
            deleted: null
        })
    }

    const handleAddElemento = () => {
        setOpenModalElemento(true)

        setElementoNuevo({
            id: 0,
            nombre: '',
            nombreIcono: '',
            addDate: null,
            addIdUser: null,
            modDate: null,
            modIdUser: null,
            delDate: null,
            delIdUser: null,
            deleted: null
        })
    }

    const handleEditElemento = () => {
        setOpenModalEditarElemento(true)
        setElementoActivo(prev => ({ ...prev, nombre: elementoCambiado.nombre, id: elementoCambiado.id, nombreIcono: elementoCambiado.nombreIcono }))
    }

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleCloseModalElemento = () => {
        setOpenModalElemento(false);
    };

    const handleEditAnalisis = () => {
        setOpenModalEditar(true)
        setAnalisisActivo(prev => ({ ...prev, nombre: analisisCambiado.nombre, id: analisisCambiado.id }))
    }

    const handleCloseModalEditar = () => {
        if (openModalEditar) {
            setAnalisisCambiado({
                id: 0,
                nombre: '',
                tipo: 0,
                addDate: null,
                addIdUser: null,
                modDate: null,
                modIdUser: null,
                delDate: null,
                delIdUser: null,
                deleted: null
            })
            setOpenModalEditar(!openModalEditar);
        } else {
            setOpenModalEditar(!openModalEditar);
        }
    };

    const handleCloseModalEditarElemento = () => {
        if (openModalEditarElemento) {
            setElementoCambiado({
                id: 0,
                nombre: '',
                nombreIcono: '',
                addDate: null,
                addIdUser: null,
                modDate: null,
                modIdUser: null,
                delDate: null,
                delIdUser: null,
                deleted: null
            })
            setOpenModalEditarElemento(!openModalEditarElemento);
        } else {
            setOpenModalEditarElemento(!openModalEditarElemento);
        }
    };

    const handleElemento = (e) => {
        const { name, value } = e.target;
        setElementoNuevo(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleAnalisisNuevo = (e) => {
        const { name, value } = e.target;
        const newValue = name === 'tipo' ? parseInt(value) : value;
        setAnalisisNuevo(prevState => ({
            ...prevState,
            [name]: newValue
        }))
    }

    const handleAnalisisCambiado = (e) => {
        const { name, value } = e.target;
        const newValue = name === 'tipo' ? parseInt(value) : value;
        setAnalisisCambiado(prevState => ({
            ...prevState,
            [name]: newValue
        }))
    }

    const handleElementoCambiado = (e) => {
        const { name, value } = e.target;
        setElementoCambiado(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleAnalisis = (event) => {
        setElementoSeleccionado({
            ...elementoSeleccionado,
            analisis: {
                ...elementoSeleccionado.analisis,
                [event.target.name]: event.target.checked
            }
        });
    }

    const handleTextFieldChange = event => {
        const nuevoNombre = event.target.value;
        setTextFieldValue(nuevoNombre);

        setElementoCambiado(prevState => ({
            ...prevState,
            nombre: nuevoNombre
        }));
    };

    const handleSeleccionarElemento = (elemento) => {
        setElementoSeleccionado(elemento);
    }

    const handleGuardarAnalisisElemento = () => {

        const elementosActualizados = elementosPlanta.map(elemento => {

            if (elemento.id === elementoSeleccionado.id) {
                return { ...elemento, analisis: { ...elementoSeleccionado.analisis } }
            } else {
                return elemento
            }

        });

        setElementosPlanta(elementosActualizados);
        setSnackData({ open: true, msg: 'Analisis del elemento guardado correctamente', severity: 'success' });

    }

    const handleSnackClose = (event, reason) => {

        if (reason === 'clickaway') {
            return;
        }

        setSnackData({ open: false, msg: '', severity: 'info' });

    };

    const guardarNuevoLocationNodos1 = () => {
        if (confPlantaCliente.Diagrama === "") {
            return;
        }
        const diagramaModificar = JSON.parse(confPlantaCliente.Diagrama);
        const nodosGrupoNivel = nodos.filter((nodo) => nodo.id.includes('nivel'));
        nodosGrupoNivel.map(nodo => {
            const nuevaPosX = nodo.position.x;
            const nuevaPosY = nodo.position.y;
            let nodoModificar = diagramaModificar.nodos.filter((nod) => nod.id === nodo.id);
            if (nodoModificar[0] !== undefined) {
                nodoModificar[0].position.x = nuevaPosX;
                nodoModificar[0].position.y = nuevaPosY;
            }
        });
        confPlantaCliente.Diagrama = JSON.stringify(diagramaModificar);
    }

    const guardarNuevoLocationNodos2 = () => {
        if (confPlantaCliente.Diagrama === "") {
            return;
        }
        const diagramaModificar = JSON.parse(confPlantaCliente.Diagrama);
        const nodosGrupoNivel = nodos2.filter((nodo) => nodo.id.includes('nivel'));
        nodosGrupoNivel.map(nodo => {
            const nuevaPosX = nodo.position.x;
            const nuevaPosY = nodo.position.y;
            let nodoModificar = diagramaModificar.nodos.filter((nod) => nod.id === nodo.id);
            if (nodoModificar[0] !== undefined) {
                nodoModificar[0].position.x = nuevaPosX;
                nodoModificar[0].position.y = nuevaPosY;
            }
        });
        confPlantaCliente.Diagrama = JSON.stringify(diagramaModificar);
    }

    const handleGuardarDatos = async () => {

        let niveles = [];
        // Guardamos los datos de la planta
        await putConfPlantaCliente({ ...confPlantaCliente, NumNiveles: parseInt(confPlantaCliente.NumNiveles, 10) });

        // Guardamos los registros de los elementos de la planta para obtener sus IDs
        let elementosActualizados = [];

        await Promise.all(elementosPlanta.map(async (elemento) => {

            let idElementoActualizado = 0;
            // Preparamos los datos a enviar a la base de datos
            let postElemento = {
                nombre: elemento.nombre,
                numero: elemento.numero,
                descripcion: elemento.descripcion,
                verInsp: elemento.verInsp,
                nombreIcono: elemento.nombreIcono,
            }

            // Guardamos los registros de los niveles y elementos relacionados al nivel
            // Preparamos los datos a enviar a la base de datos
            let postNivelesPlanta = {
                codigoCliente: confPlantaCliente.CodigoCliente,
                oferta: confPlantaCliente.Oferta,
                id_Planta: confPlantaCliente.Id,
                nivel: elemento.nivel,
                visible: true,
                conecta: null,
            }
            //Si el elemento se actualiza pero no tiene icono, se lo agregamos
            if (elemento.nombreIcono === null || elemento.nombreIcono === undefined) {
                const elementoEncontrado = elementos.filter(x => x.nombre === elemento.nombre)
                console.log(elementoEncontrado, 'ALBERTO ELEMENTO ENCONTRADO ANALISIS')
                if (elementoEncontrado !== undefined) {
                    postElemento = {
                        ...postElemento,
                        nombreIcono: elementoEncontrado[0].nombreIcono
                    }
                }
            }

            // Realizamos la petición según si tiene id o no y obtenemos el ID
            if (elemento.id > 0) {

                // El elemento ya existe. Añadimos ID y actualizamos
                postElemento = {
                    ...postElemento,
                    id: elemento.id
                }

                const diagramaParseado = JSON.parse(confPlantaCliente.Diagrama)

                diagramaParseado.nodos.map(async (param) => {
                    if (param.type === 'nodoElemento') {
                        if (param.data.id === elemento.id) {
                            param.data.verInsp = elemento.verInsp
                        }
                    }
                })

                var stringed = JSON.stringify(diagramaParseado)
                confPlantaCliente.Diagrama = stringed;

                await putConfPlantaCliente(confPlantaCliente)

                // Hacemos un PUT
                await putElementosPlanta(postElemento);

                // Añadimos el elemento al listado
                elementosActualizados.push({ ...postElemento, id: elemento.id, nivel: elemento.nivel, verInsp: elemento.verInsp, analisis: elemento.analisis });
                idElementoActualizado = elemento.id;

                // Añadimos el ID del elemento al registro del nivel
                postNivelesPlanta = {
                    ...postNivelesPlanta,
                    id_Elemento: elemento.id,
                }

            } else {

                // El elemento no existe. Hacemos POST
                const respElemento = await postElementosPlanta(postElemento);

                // Añadimos el elemento al listado
                elementosActualizados.push({ ...postElemento, id: respElemento.id, nivel: elemento.nivel, verInsp: elemento.verInsp, analisis: elemento.analisis });
                idElementoActualizado = respElemento.id;

                // Añadimos el ID del elemento al registro del nivel
                postNivelesPlanta = {
                    ...postNivelesPlanta,
                    id_Elemento: respElemento.id,
                }

            }

            // Filtramos la lista de niveles para comprobar si existe un registro
            const registroNivel = confNivelesPlantaCliente.filter(nivel => nivel.id_Elemento === elemento.id);

            // Si existe un registro, añadimos su ID para actualizar
            if (registroNivel.length > 0) {

                postNivelesPlanta = {
                    ...postNivelesPlanta,
                    id: registroNivel[0].id
                }


                // Hacemos la petición PUT
                await putConfNivelesPlantasCliente(postNivelesPlanta);
                niveles.push(postNivelesPlanta);

            } else {

                // El registro no existe. Realizamos un POST y obtenemos el ID
                const respNiveles = await postConfNivelesPlantasCliente(postNivelesPlanta);
                niveles.push(respNiveles);

            }

            // Comprobamos si el elemento tiene analisis
            if (elemento.analisis) {

                // Obtenemos el id del nivel de la planta relacionada al elemento y obtenemos sus registros
                const idNivelPlanta = niveles.filter(nivel => nivel.id_Elemento === idElementoActualizado)[0].id;
                const respNivelesAnalisis = await getAnalisisNivelesPlantasClientePorIdNivel(idNivelPlanta);

                // Recorremos los parametros del objeto de analisis
                for (const anali in elemento.analisis) {

                    // Obtenemos el ID del análisis y nivel
                    const idAnalisis = analisis.filter(analisis => analisis.nombre === anali)[0].id;

                    // Comprobamos si el registro existe en la base de datos
                    const registros = respNivelesAnalisis.filter(nivel => nivel.id_Analisis === idAnalisis);

                    if (registros.length > 0) {

                        // Preparamos el cuerpo de la petición
                        let putAnalisis = {
                            Id: registros[0].id,
                            Id_NivelesPlanta: idNivelPlanta,
                            Id_Analisis: idAnalisis
                        }

                        // El registro existe en BD. Debemos hacer una actualización
                        if (elemento.analisis[anali]) {

                            // El analisis está marcado como Actido. Aplicamos cambios sobre el registro
                            putAnalisis = { ...putAnalisis, deleted: null }

                        } else {

                            // El analisis está marcado como Desactivado. Aplicamos cambios sobre el registro
                            putAnalisis = { ...putAnalisis, deleted: true }

                        }

                        // Finalmente, realizamos la petición PUT
                        const respAnalisis = await putAnalisisNivelesPlantasCliente(putAnalisis);

                    } else {

                        // El registro no existe en la BD. Creamos el registro
                        if (elemento.analisis[anali]) {

                            // Preparamos el cuerpo de la petición
                            const postAnalisis = {
                                Id_NivelesPlanta: idNivelPlanta,
                                Id_Analisis: idAnalisis
                            }

                            // Añadimos a la base de datos los analisis activados
                            const respAnalisis = await postAnalisisNivelesPlantasCliente(postAnalisis);

                        }
                    }
                }
            }

        }));

        // Una vez terminado el mapeo, seteamos el estado con los IDs nuevos
        setEstadoGenerarDiagrama(true);
        setElementosPlanta(elementosActualizados);
        setConfNivelesPlantaCliente(niveles)
        setDatosGuardados(true);

        // Avisamos al usuario
        Swal.fire({
            position: 'center',
            icon: 'info',
            title: 'Planta guardada',
            text: `Los datos de la planta ${confPlantaCliente.NombreCliente} han sido guardados`,
            showConfirmButton: false,
            timer: 2000,
            showClass: {
                popup: 'animate__animated animate__bounceIn'
            },
            hideClass: {
                popup: 'animate__animated animate__bounceOut'
            }
        });

    };

    const peticionPostElemento = async () => {
        elementoNuevo.id = null;

        const elementoRepetido = elementos.filter(elem => elem.nombre === elementoNuevo.nombre)

        if (elementoRepetido.length == 0 && elementoNuevo.nombre !== "") {
            const resp = await postElementos(elementoNuevo);
            
            if (elementoNuevo.nombreIcono !== '' && elementoNuevo.nombreIcono !== null) {
                const icono = await SubirIconoElementoPlanta(resp.id, iconoElemento)
                elementoNuevo.nombreIcono = icono
                var elementoModificado = elementos;
                elementoModificado.map(elemento => {
                if (elemento.id === resp.id) {
                    elemento = resp
                }
            });
            }

            getElemento();
            setElementoNuevo({
                id: 0,
                nombre: '',
                nombreIcono: '',
                addDate: null,
                addIdUser: null,
                modDate: null,
                modIdUser: null,
                delDate: null,
                delIdUser: null,
                deleted: null
            })

            Swal.fire({
                position: 'center',
                icon: 'info',
                title: 'Elemento Creado',
                text: `El elemento se ha creado correctamente`,
                showConfirmButton: false,
                timer: 2000,
                showClass: {
                    popup: 'animate__animated animate__bounceIn'
                },
                hideClass: {
                    popup: 'animate__animated animate__bounceOut'
                }
            });
        } else if (elementoRepetido.length > 0) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Elemento Repetido',
                text: `Este elemento ya existe, introduzca uno nuevo`,
                showConfirmButton: false,
                timer: 2000,
                showClass: {
                    popup: 'animate__animated animate__bounceIn'
                },
                hideClass: {
                    popup: 'animate__animated animate__bounceOut'
                }
            });
        } else {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Elemento Vacío',
                text: `Introduzca un nombre de Elemento`,
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

    const peticionPutElemento = async () => {

        const elementoRepetido = elementos.filter(elem => elem.nombre === elementoCambiado.nombre && elem.id !== elementoCambiado.id)

        if (elementoRepetido.length == 0 && elementoCambiado.nombre !== "") {

            if (elementoCambiado.nombreIcono !== '' && elementoCambiado.nombreIcono !== null) {
                const resp = await SubirIconoElementoPlanta(elementoCambiado.id, iconoElemento)
                elementoCambiado.nombreIcono = resp;
            }

            const resp = await putElementos(elementoCambiado);
            var elementoModificado = elementos;
            elementoModificado.map(elemento => {
                if (elemento.id === elementoCambiado.id) {
                    elemento = elementoCambiado
                }
            });

            getElemento();
            setElementoCambiado(prev => ({ ...prev, nombre: elementoCambiado.nombre, id: elementoCambiado.id, nombreIcono: elementoCambiado.nombreIcono }))

            Swal.fire({
                position: 'center',
                icon: 'info',
                title: 'Elemento Modificado',
                text: `El elemento se ha modificado correctamente`,
                showConfirmButton: false,
                timer: 2000,
                showClass: {
                    popup: 'animate__animated animate__bounceIn'
                },
                hideClass: {
                    popup: 'animate__animated animate__bounceOut'
                }
            });
        } else if (elementoRepetido.length > 0) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Elemento Repetido',
                text: `Este elemento ya existe, introduzca uno nuevo`,
                showConfirmButton: false,
                timer: 2000,
                showClass: {
                    popup: 'animate__animated animate__bounceIn'
                },
                hideClass: {
                    popup: 'animate__animated animate__bounceOut'
                }
            });
        } else {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Elemento Vacío',
                text: `Introduzca un nombre de Elemento`,
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

    const peticionPostAnalisis = async () => {
        analisisNuevo.id = 0;

        const analisisRepetido = analisis.filter(anal => anal.nombre === analisisNuevo.nombre)

        if (analisisRepetido.length == 0 && analisisNuevo.nombre !== "") {
            const resp = await postAnalisis(analisisNuevo);

            getAnalisi();

            Swal.fire({
                position: 'center',
                icon: 'info',
                title: 'Analisis Creado',
                text: `El analisis se ha creado correctamente`,
                showConfirmButton: false,
                timer: 2000,
                showClass: {
                    popup: 'animate__animated animate__bounceIn'
                },
                hideClass: {
                    popup: 'animate__animated animate__bounceOut'
                }
            });
        } else if (analisisRepetido.length > 0) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Análisis Repetido',
                text: `Este análisis ya existe, introduzca uno nuevo`,
                showConfirmButton: false,
                timer: 2000,
                showClass: {
                    popup: 'animate__animated animate__bounceIn'
                },
                hideClass: {
                    popup: 'animate__animated animate__bounceOut'
                }
            });
        } else {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Análisis Vacío',
                text: `Introduzca un nombre de Análisis`,
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

    const peticionPutAnalisis = async () => {

        const analisisRepetido = analisis.filter(anal => anal.nombre === analisisCambiado.nombre && analisisActivo.nombre !== analisisCambiado.nombre)

        if (analisisRepetido.length == 0 && analisisCambiado.nombre !== "") {
            const resp = await putAnalisis(analisisCambiado);

            var analisisModificado = analisis;
            analisisModificado.map(analisi => {
                if (analisi.id === analisisCambiado.id) {
                    analisi = analisisCambiado
                }
            });

            getAnalisi();
            setAnalisisActivo(prev => ({ ...prev, nombre: analisisCambiado.nombre, id: analisisCambiado.id }))

            Swal.fire({
                position: 'center',
                icon: 'info',
                title: 'Analisis Modificado',
                text: `El analisis se ha modificado correctamente`,
                showConfirmButton: false,
                timer: 2000,
                showClass: {
                    popup: 'animate__animated animate__bounceIn'
                },
                hideClass: {
                    popup: 'animate__animated animate__bounceOut'
                }
            });
        } else if (analisisRepetido.length > 0) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Análisis Repetido',
                text: `Este análisis ya existe, introduzca uno nuevo`,
                showConfirmButton: false,
                timer: 2000,
                showClass: {
                    popup: 'animate__animated animate__bounceIn'
                },
                hideClass: {
                    popup: 'animate__animated animate__bounceOut'
                }
            });
        } else {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Análisis Vacío',
                text: `Introduzca un nombre de Análisis`,
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
    const modificarLadosParaDarlesFormaFlecha = () => {
        const diagramaModificar = JSON.parse(confPlantaCliente.Diagrama);
        const ladoFlecha = {
            type: 'arrowclosed',
            width: 20,
            height: 20,
        }
        // diagramaModificar.lados[0].markerEnd  = ladoFlecha;
        diagramaModificar.lados.map((lado) => {
            lado.markerEnd = ladoFlecha
        });
        confPlantaCliente.Diagrama = JSON.stringify(diagramaModificar);
    }
    const handleGuardarDiagrama = async () => {

        // Guardamos los datos de la planta
        guardarNuevoLocationNodos2();
        modificarLadosParaDarlesFormaFlecha();
        await putConfPlantaCliente({ ...confPlantaCliente, NumNiveles: parseInt(confPlantaCliente.NumNiveles, 10) });
        setDiagramaGuardado(true);

        // Avisamos al usuario
        Swal.fire({
            position: 'center',
            icon: 'info',
            title: 'Diagrama guardado',
            text: `Los datos del diagrama de la planta ${confPlantaCliente.NombreCliente} han sido guardados`,
            showConfirmButton: false,
            timer: 2000,
            showClass: {
                popup: 'animate__animated animate__bounceIn'
            },
            hideClass: {
                popup: 'animate__animated animate__bounceOut'
            }
        });

    };

    const handleElementoChange = (event, value) => {
        if (value) {
            setElementoCambiado({
                id: value.id,
                nombre: value.nombre,
                nombreIcono: value.nombreIcono
            });
            setTextFieldValue(value.nombre);
        } else {
            setElementoCambiado({
                id: value.id,
                nombre: '',
                nombreIcono: ''
            });
            setTextFieldValue('');
        }
    };

    const handleAnalisisChange = (event, value) => {
        if (value) {
            setAnalisisCambiado({
                id: value.id,
                nombre: value.nombre,
                tipo: value.tipo
            });
            setTextFieldValueAnalisis(value.nombre)
        } else {
            setAnalisisCambiado({
                id: '',
                nombre: '',
                tipo: false,
            });
            setTextFieldValueAnalisis('');
        }
    };

    const eliminarPlanta = async (id) => {

        let confirma = await preguntarParaEliminar();
        if (confirma === false) {
            return;
        }

        const respAnalisis = await getAnalisisNivelesPlantasCliente();

        const respElementos = await getElementosPlanta();

        confNivelesPlantaCliente.map(async (nivel) => {

            const resp2 = await deleteConfNivelesPlantasCliente(nivel.id);

            const analisisFiltro = respAnalisis.filter(anali => anali.id_NivelesPlanta === nivel.id)

            analisisFiltro.map(async (an) => {

                const resp = await deleteAnalisisNivelesPlantasCliente(an.id);
            })

            const elementoFiltro = respElementos.filter(elem => elem.id === nivel.id_Elemento)

            elementoFiltro.map(async (el) => {

                const resp = await deleteElementosPlanta(el.id);

            })

        })

        const resp = await deleteConfPlantaCliente(id);

        if (resp) {
            // Avisamos al usuario
            Swal.fire({
                position: 'center',
                icon: 'info',
                title: 'Planta eliminada',
                text: `Los datos de la planta de ${confPlantaCliente.NombreCliente} han sido eliminados`,
                showConfirmButton: false,
                timer: 2000,
                showClass: {
                    popup: 'animate__animated animate__bounceIn'
                },
                hideClass: {
                    popup: 'animate__animated animate__bounceOut'
                }
            });

            setTimeout(() => {
                window.location.reload();
            }, 2000)

        } else {
            // Avisamos al usuario
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Error borrado planta',
                text: `Fallo al borrar la planta de  ${confPlantaCliente.NombreCliente}`,
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

    function filtrarCodigoCliente(cliente) {
        if (!cliente.deleted) {
            if (inputCodigoCliente === '') {
                return true;
            } else {
                if (cliente.codigo?.toString().indexOf(inputCodigoCliente) >= 0) {
                    return true;
                } else {
                    return false;
                }
            }
        } else {
            return false;
        }
    }

    function filtrarNombreCliente(cliente) {
        if (!cliente.deleted) {
            if (inputNombreCliente === '') {
                return true;
            } else {
                const nombreClienteLowerCase = cliente.razonSocial ? cliente.razonSocial.toString().toLowerCase() : '';
                const inputNombreClienteLowerCase = inputNombreCliente.toLowerCase();
                return nombreClienteLowerCase.includes(inputNombreClienteLowerCase);
            }
        } else {
            return false;
        }
    }

    const activarInputFile = () => {
        let input = document.getElementById("seleccionar-icono-input")
        input.click();
    }

    const handleFileChange = (e) => {
        if (e.target.files) {
            setIconoElemento(e.target.files[0]);
            setElementoNuevo(prevState => ({
                ...prevState,
                nombreIcono: e.target.files[0].name
            }))
        }
    };

    const handleFileChangeCambiado = (e) => {
        if (e.target.files) {
            setIconoElemento(e.target.files[0]);
            setElementoCambiado(prevState => ({
                ...prevState,
                nombreIcono: e.target.files[0].name
            }))
        }
    };

    return (
        <>
            {user.idPerfil === 1 ?
                <MainLayout title="Plantas">

                    <Grid container spacing={2}>

                        {/* APARTADO DE DATOS DE PLANTA */}
                        <Grid item xs={12}>
                            <Card sx={{ p: 2, display: 'flex' }}>
                                <Grid container spacing={2} sx={{ alignItems: 'center' }}>

                                    <Grid item xs={3}>
                                        <Autocomplete
                                            disabled={plantaCreada}
                                            id="NombreCliente"
                                            options={clientes}
                                            value={clientes.find(cliente => cliente.razonSocial === confPlantaCliente.NombreCliente) || null}
                                            filterOptions={options => clientes.filter((cliente) => filtrarNombreCliente(cliente))}
                                            getOptionLabel={option => option.razonSocial}
                                            renderInput={params => <TextField {...params} variant="outlined" label="Nombre Cliente" name="NombreCliente" />}
                                            onChange={(event, value) => setConfPlantaCliente(prevState => ({
                                                ...prevState,
                                                CodigoCliente: value ? parseInt(value.codigo) : null,
                                                NombreCliente: value ? value.razonSocial : null,
                                                Oferta: '',
                                                NumNiveles: ""
                                            }))}
                                            onInputChange={(event, newInputValue) => {
                                                setInputNombreCliente(newInputValue);
                                            }}
                                        />
                                    </Grid>

                                    <Grid item xs={2}>
                                        <Autocomplete
                                            disabled={plantaCreada}
                                            id="CodigoCliente"
                                            options={clientes}
                                            value={clientes.find(cliente => cliente.codigo === confPlantaCliente.CodigoCliente) || null}
                                            filterOptions={options => clientes.filter((cliente) => filtrarCodigoCliente(cliente))}
                                            getOptionLabel={option => option.codigo.toString()}
                                            renderInput={params => <TextField {...params} variant="outlined" label="Código de Cliente" name="CodigoCliente" />}
                                            onChange={(event, value) => setConfPlantaCliente(prevState => ({
                                                ...prevState,
                                                CodigoCliente: value ? parseInt(value.codigo) : null,
                                                NombreCliente: value ? value.razonSocial : null,
                                                Oferta: '',
                                                NumNiveles: ''
                                            }))}
                                            onInputChange={(event, newInputValue) => {
                                                setInputCodigoCliente(newInputValue);
                                            }}

                                        />
                                    </Grid>

                                    {/* Número de Oferta */}
                                    <Grid item xs={3}>
                                        <Autocomplete
                                            disabled={plantaCreada}
                                            id="ofertas"
                                            options={ofertas}
                                            value={ofertas.find(oferta => oferta.numeroOferta === confPlantaCliente.Oferta) || null}
                                            filterOptions={options => {
                                                if (confPlantaCliente.NombreCliente !== "" && confPlantaCliente.CodigoCliente !== 0 && confPlantaCliente.Oferta !== 0) {
                                                    return options.filter(oferta =>
                                                        oferta.nombreCliente === confPlantaCliente.NombreCliente && oferta.codigoCliente === confPlantaCliente.CodigoCliente && !oferta.deleted
                                                    );
                                                } else {
                                                    return options.filter(oferta => !oferta.deleted);
                                                }
                                            }}
                                            onInputChange={(event, newInputValue) => {
                                                setInputOferta(newInputValue);
                                            }}
                                            getOptionLabel={option => option.numeroOferta.toString()}
                                            renderInput={params => <TextField {...params} label="Oferta" name="oferta" />}
                                            onChange={(event, value) => setConfPlantaCliente(prevState => ({
                                                ...prevState,
                                                CodigoCliente: value ? parseInt(value.codigoCliente) : null,
                                                NombreCliente: value ? value.nombreCliente : null,
                                                Oferta: value ? value.numeroOferta : null,
                                                NumNiveles: ""
                                            }))}
                                        />
                                    </Grid>

                                    {/* Número de niveles */}
                                    <Grid item xs={2}>
                                        <TextField disabled={!crearPlanta || plantaCreada} sx={{ width: '100%' }} variant="outlined" label="Nº de niveles" name="NumNiveles" onChange={handleConfPlantaClienteChange} value={confPlantaCliente.NumNiveles} />
                                    </Grid>

                                    {/* Botón para crear */}
                                    <Grid item xs={2}>
                                        {
                                            permiteCambiarPlanta
                                                ? (
                                                    <div sx={{ display: 'flex', flexDirection: 'row' }}>
                                                        <Button
                                                            sx={{ width: '10%', marginRight: '5px', height: '40px' }}
                                                            color='success'
                                                            variant='contained'
                                                            startIcon={<AddIcon />}
                                                            onClick={addNivelPlanta}
                                                        >
                                                        </Button>
                                                        <Button
                                                            // disabled={plantaCreada}
                                                            sx={{ width: '70%' }}
                                                            color='success'
                                                            variant='contained'
                                                            startIcon={<SearchOffIcon />}
                                                            onClick={handleVaciarBusqueda}
                                                        >
                                                            Vaciar busqueda
                                                        </Button>
                                                    </div>

                                                ) : (
                                                    crearPlanta
                                                        ? (
                                                            <Button
                                                                disabled={plantaCreada}
                                                                sx={{ width: '100%' }}
                                                                color='success'
                                                                variant='contained'
                                                                startIcon={<AddIcon />}
                                                                onClick={handleCrearCargarPlanta}
                                                            >
                                                                Crear
                                                            </Button>
                                                        ) : (
                                                            <div sx={{ display: 'flex', flexDirection: 'row' }}>
                                                                <Button
                                                                    disabled={plantaCreada}
                                                                    sx={{ width: '100%', height: '40px' }}
                                                                    color='success'
                                                                    variant='contained'
                                                                    startIcon={<DownloadIcon />}
                                                                    onClick={handleCrearCargarPlanta}
                                                                >
                                                                    Cargar
                                                                </Button>
                                                            </div>

                                                        )
                                                )
                                        }
                                    </Grid>

                                </Grid>
                            </Card>
                        </Grid>

                        <Grid item xs={12}>
                            <Card sx={{ p: 2, display: 'flex' }}>
                                <Grid container spacing={2} sx={{ alignItems: 'center' }}>

                                    {/* <Grid item xs={2}>
                                        <TextField
                                            sx={{ width: '100%' }}
                                            name="nombre"
                                            onChange={handleElemento}
                                        />
                                    </Grid> */}

                                    <Grid item xs={2}>
                                        <Button
                                            sx={{ width: '100%' }}
                                            variant='contained'
                                            startIcon={<AddIcon />}
                                            onClick={handleAddElemento}
                                        >
                                            Añadir Elemento
                                        </Button>
                                    </Grid>

                                    <Grid item xs={2}>
                                        <Autocomplete
                                            id="elemento"
                                            options={elementos}
                                            sx={{ width: '100%' }}
                                            getOptionLabel={option => option.nombre}
                                            renderInput={params => <TextField {...params} label="Elemento" name="nombre" value={textFieldValue} />}
                                            onChange={(event, newValue) => {
                                                handleElementoChange(event, newValue);
                                            }}
                                            clearOnBlur
                                            value={elementoCambiado}
                                        />
                                    </Grid>

                                    <Grid item xs={2}>
                                        <Button
                                            sx={{ width: "70%" }}
                                            variant='contained'
                                            onClick={handleEditElemento}
                                            disabled={elementoCambiado.nombre !== "" ? false : true}
                                        >
                                            Modificar Elemento
                                        </Button>
                                    </Grid>

                                    <Grid item xs={2}>
                                        <Button
                                            sx={{ width: "100%" }}
                                            variant='contained'
                                            startIcon={<AddIcon />}
                                            onClick={handleAddAnalisis}
                                        >
                                            Añadir Análisis
                                        </Button>
                                    </Grid>

                                    <Grid item xs={2}>
                                        <Autocomplete
                                            id="analisis"
                                            options={analisis}
                                            sx={{ width: '100%' }}
                                            getOptionLabel={option => option.nombre}
                                            renderInput={params => <TextField {...params} label="Análisis" name="nombre" value={textFieldValueAnalisis} />}
                                            onChange={(event, newValue) => {
                                                handleAnalisisChange(event, newValue);
                                            }}
                                            clearOnBlur
                                            value={analisisCambiado}
                                        />
                                    </Grid>

                                    <Grid item xs={2}>
                                        <Button
                                            sx={{ ml: 1 }}
                                            variant='contained'
                                            onClick={handleEditAnalisis}
                                            disabled={analisisCambiado.nombre !== "" ? false : true}
                                        >
                                            Modificar Análisis
                                        </Button>
                                    </Grid>

                                </Grid>
                            </Card>
                        </Grid>

                        {/* APARTADO DE NIVELES */}
                        <Grid item xs={12}>
                            <Grid container spacing={2}>
                                {
                                    niveles.map(nivel => (
                                        <NivelPlanta
                                            key={nivel}
                                            nivel={nivel}
                                            contadorElemento={contadorElemento}
                                            setContadorElemento={setContadorElemento}
                                            elementos={elementos}
                                            elementosPlanta={elementosPlanta}
                                            setElementosPlanta={setElementosPlanta}
                                            indiceElemento={indiceElemento}
                                            setIndiceElemento={setIndiceElemento}
                                            confNivelesPlantaCliente={confNivelesPlantaCliente}
                                            confPlantaCliente={confPlantaCliente}
                                            datosGuardados={datosGuardados}
                                            plantaCreada={plantaCreada}
                                            setNodos2={setNodos2}
                                            setLados2={setLados2}
                                        />
                                    ))
                                }
                            </Grid>
                        </Grid>

                        {/* APARTADO DE LISTADO DE ELEMENTOS */}
                        <Grid item xs={4}>
                            <Card sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>

                                <Typography variant="h6" sx={{ width: '100%' }}>Listado de elementos</Typography>
                                {
                                    (elementosPlanta.length > 0)
                                        ? (
                                            <List>
                                                {
                                                    elementosPlanta.sort((a, b) => {
                                                        // Comparar primero por nombre (orden alfabético)
                                                        if (a.nombre < b.nombre) return -1;
                                                        if (a.nombre > b.nombre) return 1;

                                                        // Si los nombres son iguales, comparar por descripción (si no es null)
                                                        if (a.descripcion && b.descripcion) {
                                                            if (a.descripcion < b.descripcion) return -1;
                                                            if (a.descripcion > b.descripcion) return 1;
                                                        }
                                                        // Si solo uno tiene descripción, el que la tenga va primero
                                                        else if (a.descripcion && !b.descripcion) {
                                                            return -1;
                                                        }
                                                        else if (!a.descripcion && b.descripcion) {
                                                            return 1;
                                                        }

                                                        // Si los nombres son iguales y las descripciones son iguales o no existen, comparar por número
                                                        return a.numero - b.numero;
                                                    }).map(elemento => (
                                                        <ListItemButton
                                                            key={elemento.id}
                                                            selected={elementoSeleccionado.id === elemento.id}
                                                            onClick={() => handleSeleccionarElemento(elemento)}
                                                        >
                                                            <ListItemText primary={elemento.descripcion !== null ? elemento.nombre + ' ' + elemento.descripcion : elemento.nombre + ' ' + elemento.numero} />
                                                        </ListItemButton>
                                                    ))
                                                }
                                            </List>
                                        ) : (
                                            <Typography>Ningún elemento añadido</Typography>
                                        )
                                }

                            </Card>
                        </Grid>

                        {/* APARTADO DE ANALISIS POR ELEMENTO */}
                        <Grid item xs={8}>
                            <Card sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>

                                <Grid container sx={{ justifyContent: 'space-between', alignItems: 'center', pb: 2 }}>

                                    <Grid item>
                                        <Typography variant="h6" sx={{ width: '100%' }}>Analisis por elemento</Typography>
                                    </Grid>

                                    <Grid item>
                                        <Tooltip title="Guardar analisis del elemento seleccionado" placement="left">
                                            <Button color="primary" startIcon={<SaveIcon />} variant="outlined" onClick={handleGuardarAnalisisElemento}>
                                                Guardar
                                            </Button>
                                        </Tooltip>
                                    </Grid>

                                </Grid>

                                {/* Mensaje de feedback al guardar tipos de analisis del elemento */}
                                <Grid container>
                                    <Grid item xs={12}>
                                        <Alert id="snack" className="animate__animated animate__flipInX" onClose={handleSnackClose} severity={snackData.severity} sx={{
                                            width: '100%',
                                            display: snackData.open ? 'flex' : 'none'
                                        }}>
                                            {snackData.msg}
                                        </Alert>
                                    </Grid>
                                </Grid>

                                {/* Listado de checkboxs para marcar los analisis */}
                                <Grid container spacing={2}>
                                    {/* <FormGroup> */}
                                    {
                                        analisis.map(analisis => (
                                            <Grid item xs={6} key={analisis.id}>
                                                <CheckBoxAnalisis
                                                    label={analisis.nombre}
                                                    name={analisis.nombre}
                                                    onChange={handleAnalisis}
                                                    elementoSeleccionado={elementoSeleccionado}
                                                    elementosPlanta={elementosPlanta}
                                                    user={user}
                                                />
                                            </Grid>
                                        )
                                        )
                                    }
                                    {/* </FormGroup> */}
                                </Grid>

                            </Card>
                        </Grid>

                        {/* BOTONES DE ACCIONES */}
                        <Grid item xs={12}>
                            <Card sx={{ p: 2, display: 'flex', justifyContent: 'flex-end' }}>
                                <Button
                                    disabled={!estadoEliminarPlanta}
                                    color='error'
                                    variant='contained'
                                    startIcon={<DeleteIcon />}
                                    onClick={() => eliminarPlanta(confPlantaCliente.Id)}
                                >
                                    Eliminar Planta
                                </Button>
                                <Button
                                    sx={{ ml: 2 }}
                                    disabled={!plantaCreada}
                                    color='success'
                                    variant='contained'
                                    startIcon={<SaveIcon />}
                                    onClick={handleGuardarDatos}
                                >
                                    Guardar datos
                                </Button>

                                <Button
                                    sx={{ ml: 2 }}
                                    color='primary'
                                    variant='contained'
                                    startIcon={<AccountTreeIcon />}
                                    disabled={!estadoGenerarDiagrama}
                                    onClick={() => {
                                        generarDiagrama(confPlantaCliente.NumNiveles, elementosPlanta, setNodos2, setLados2)
                                        // setNodos2(nodos);
                                    }}>
                                    Generar diagrama
                                </Button>

                                <Button
                                    sx={{ ml: 2 }}
                                    color='success'
                                    variant='contained'
                                    startIcon={<AccountTreeIcon />}
                                    disabled={nodos.length === 0}
                                    onClick={handleGuardarDiagrama}>
                                    Guardar diagrama
                                </Button>

                                {estadoEliminarPlanta ?
                                    <Button
                                        sx={{ ml: 2 }}
                                        color='primary'
                                        variant='contained'
                                        endIcon={<NavigateNextIcon />}
                                        onClick={() => { navigate('/plantasTabla'); }}>
                                        Siguiente
                                    </Button>
                                    :
                                    <Button
                                        sx={{ ml: 2 }}
                                        color='primary'
                                        variant='contained'
                                        endIcon={<NavigateNextIcon />}
                                        disabled={!diagramaGuardado}
                                        onClick={() => { navigate('/plantasTabla'); }}>
                                        Siguiente
                                    </Button>
                                }
                            </Card>
                        </Grid>

                        {/* APARTADO DE DIAGRAMA */}
                        <Grid item xs={12}>
                            <Card sx={{ p: 2, height: '800px', display: 'flex', flexDirection: 'column' }}>

                                <Typography variant="h6">Diagrama de la planta</Typography>
                                {nodos2.length > 0 ?
                                    <FlowWithProvider
                                        nodes={nodos2}
                                        edges={lados2}
                                        onEdgesChange={onEdgesChange}
                                        onNodesChange={onNodesChange}
                                        onConnect={onConnect}
                                        nodeTypes={nodeTypes}
                                        // onEdgeClick={handlerBorrarUnion}
                                        onEdgeUpdate={onEdgeUpdate}
                                        onEdgeUpdateStart={onEdgeUpdateStart}
                                        onEdgeUpdateEnd={onEdgeUpdateEnd}
                                        connectionLineComponent={ConnectionLine}
                                    >
                                        <Background />
                                    </FlowWithProvider>
                                    :
                                    <FlowWithProvider
                                        nodes={nodos}
                                        edges={lados}
                                        onEdgesChange={onEdgesChange}
                                        onNodesChange={onNodesChange}
                                        onConnect={onConnect}
                                        nodeTypes={nodeTypes}
                                        onEdgeUpdate={onEdgeUpdate}
                                        onEdgeUpdateStart={onEdgeUpdateStart}
                                        onEdgeUpdateEnd={onEdgeUpdateEnd}

                                        connectionLineComponent={ConnectionLine}
                                    >
                                        <Background />
                                    </FlowWithProvider>
                                }
                            </Card>
                        </Grid>

                    </Grid>

                    <ModalLayout4
                        titulo="Añadir Elemento"
                        contenido={
                            <Grid item xs={12}>
                                <Grid container sx={{ textAlign: 'center', pb: 2 }}>
                                    <Grid item xs={12}>
                                        <TextField
                                            sx={{ width: '100%', marginBottom: '20px' }}
                                            name="nombre"
                                            onChange={handleElemento}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={12}>
                                        <Grid sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }} md={12}>
                                            <Typography sx={{ marginLeft: '4px' }}>Seleccionar icono:<p>{elementoNuevo.nombreIcono}</p></Typography>
                                            <Button sx={{ marginLeft: '15px' }}
                                                color='primary'
                                                variant='contained'
                                                onClick={() => activarInputFile()}
                                            >
                                                Seleccionar
                                            </Button>
                                            <input id="seleccionar-icono-input" type="file" accept="image/png, image/gif, image/jpeg" style={{ marginTop: '10px', marginLeft: '4px' }} onChange={handleFileChange} />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        }
                        botones={[insertarBotonesModal(<AddIcon />, 'Guardar', async () => {
                            peticionPostElemento();
                        })
                        ]}
                        open={openModalElemento}
                        onClose={handleCloseModalElemento}
                    />

                    <ModalLayout4
                        titulo="Editar Elemento"
                        contenido={
                            <Grid item xs={12}>
                                <Grid container sx={{ textAlign: 'center', pb: 2 }}>
                                    <Grid item xs={12}>
                                        <TextField
                                            sx={{ width: '100%', marginBottom: '20px' }}
                                            name="nombre"
                                            onChange={handleElementoCambiado}
                                            value={elementoCambiado && elementoCambiado.nombre}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={12}>
                                        <Grid sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }} md={12}>
                                            <Typography sx={{ marginLeft: '4px' }}>Seleccionar icono:<p>{elementoCambiado.nombreIcono}</p></Typography>
                                            <Button sx={{ marginLeft: '15px' }}
                                                color='primary'
                                                variant='contained'
                                                onClick={() => activarInputFile()}
                                            >
                                                Seleccionar
                                            </Button>
                                            <input id="seleccionar-icono-input" type="file" accept="image/png, image/gif, image/jpeg" style={{ marginTop: '10px', marginLeft: '4px' }} onChange={handleFileChangeCambiado} />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        }
                        botones={[insertarBotonesModal(<AddIcon />, 'Guardar', async () => {
                            peticionPutElemento();
                        })
                        ]}
                        open={openModalEditarElemento}
                        onClose={handleCloseModalEditarElemento}
                    />

                    <ModalLayout4
                        titulo="Añadir Analisis"
                        contenido={
                            <Grid item xs={12}>
                                <Grid container sx={{ textAlign: 'center', pb: 2 }}>
                                    <Grid item xs={12}>
                                        <TextField
                                            sx={{ width: '100%', marginBottom: '20px' }}
                                            name="nombre"
                                            onChange={handleAnalisisNuevo}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={5}>
                                        <FormControl>
                                            <FormLabel id="demo-controlled-radio-buttons-group">Tipo</FormLabel>
                                            <RadioGroup
                                                aria-labelledby="demo-controlled-radio-buttons-group"
                                                name="controlled-radio-buttons-group"
                                                value={analisisNuevo.tipo}
                                                onChange={handleAnalisisNuevo}
                                            >
                                                <FormControlLabel value="0" name='tipo' control={<Radio />} label="Físico-Químico" />
                                                <FormControlLabel value="1" name='tipo' control={<Radio />} label="No FQ" />
                                                <FormControlLabel value="2" name='tipo' control={<Radio />} label="Aerobios y Legionelas" />
                                            </RadioGroup>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </Grid>
                        }
                        botones={[insertarBotonesModal(<AddIcon />, 'Guardar', async () => {
                            peticionPostAnalisis();
                        })
                        ]}
                        open={openModal}
                        onClose={handleCloseModal}
                    />

                    <ModalLayout4
                        titulo="Editar Analisis"
                        contenido={
                            <Grid item xs={12}>
                                <Grid container sx={{ textAlign: 'center', pb: 2 }}>
                                    <Grid item xs={12}>
                                        <TextField
                                            sx={{ width: '100%', marginBottom: '20px' }}
                                            name="nombre"
                                            onChange={handleAnalisisCambiado}
                                            value={analisisCambiado && analisisCambiado.nombre}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={5}>
                                        <FormControl>
                                            <FormLabel id="demo-controlled-radio-buttons-group">Tipo</FormLabel>
                                            <RadioGroup
                                                aria-labelledby="demo-controlled-radio-buttons-group"
                                                name="controlled-radio-buttons-group"
                                                value={analisisCambiado && analisisCambiado.tipo}
                                                onChange={handleAnalisisCambiado}
                                            >
                                                <FormControlLabel value="0" name='tipo' control={<Radio />} label="Físico-Químico" />
                                                <FormControlLabel value="1" name='tipo' control={<Radio />} label="No FQ" />
                                                <FormControlLabel value="2" name='tipo' control={<Radio />} label="Aerobios y Legionelas" />
                                            </RadioGroup>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </Grid>
                        }
                        botones={[insertarBotonesModal(<AddIcon />, 'Guardar', async () => {
                            peticionPutAnalisis();
                        })
                        ]}
                        open={openModalEditar}
                        onClose={handleCloseModalEditar}
                    />

                </MainLayout>
                :
                <MainLayout title="Plantas">

                    <Grid container spacing={2}>

                        {/* APARTADO DE DATOS DE PLANTA */}
                        <Grid item xs={12}>
                            <Card sx={{ p: 2, display: 'flex' }}>
                                <Grid container spacing={2} sx={{ alignItems: 'center' }}>

                                    <Grid item xs={3}>
                                        <Autocomplete
                                            disabled={plantaCreada}
                                            id="NombreCliente"
                                            options={clientes}
                                            value={clientes.find(cliente => cliente.razonSocial === confPlantaCliente.NombreCliente) || null}
                                            filterOptions={options => clientes.filter((cliente) => filtrarNombreCliente(cliente))}
                                            getOptionLabel={option => option.razonSocial}
                                            renderInput={params => <TextField {...params} variant="outlined" label="Nombre Cliente" name="NombreCliente" />}
                                            onChange={(event, value) => setConfPlantaCliente(prevState => ({
                                                ...prevState,
                                                CodigoCliente: value ? parseInt(value.codigo) : null,
                                                NombreCliente: value ? value.razonSocial : null,
                                                Oferta: '',
                                                NumNiveles: ''
                                            }))}
                                            onInputChange={(event, newInputValue) => {
                                                setInputNombreCliente(newInputValue);
                                            }}
                                        />
                                    </Grid>

                                    <Grid item xs={2}>
                                        <Autocomplete
                                            disabled={plantaCreada}
                                            id="CodigoCliente"
                                            options={clientes}
                                            value={clientes.find(cliente => cliente.codigo === confPlantaCliente.CodigoCliente) || null}
                                            filterOptions={options => clientes.filter((cliente) => filtrarCodigoCliente(cliente))}
                                            getOptionLabel={option => option.codigo.toString()}
                                            renderInput={params => <TextField {...params} variant="outlined" label="Código de Cliente" name="CodigoCliente" />}
                                            onChange={(event, value) => setConfPlantaCliente(prevState => ({
                                                ...prevState,
                                                CodigoCliente: value ? parseInt(value.codigo) : null,
                                                NombreCliente: value ? value.razonSocial : null,
                                                Oferta: '',
                                                NumNiveles: ''
                                            }))}
                                            onInputChange={(event, newInputValue) => {
                                                setInputCodigoCliente(newInputValue);
                                            }}

                                        />
                                    </Grid>

                                    {/* Número de Oferta */}
                                    <Grid item xs={3}>
                                        <Autocomplete
                                            id="clientes"
                                            options={ofertas}
                                            value={ofertas.find(oferta => oferta.numeroOferta === confPlantaCliente.Oferta) || null}
                                            filterOptions={options => {
                                                if (confPlantaCliente.NombreCliente !== "" && confPlantaCliente.CodigoCliente !== 0 && confPlantaCliente.Oferta !== 0) {
                                                    return options.filter(oferta =>
                                                        oferta.nombreCliente === confPlantaCliente.NombreCliente && oferta.codigoCliente === confPlantaCliente.CodigoCliente && !oferta.deleted
                                                    );
                                                } else {
                                                    return options;
                                                }
                                            }}
                                            onInputChange={(event, newInputValue) => {
                                                setInputOferta(newInputValue);
                                            }}
                                            getOptionLabel={option => option.numeroOferta.toString()}
                                            renderInput={params => <TextField {...params} label="Oferta" name="oferta" />}
                                            onChange={(event, value) => setConfPlantaCliente(prevState => ({
                                                ...prevState,
                                                CodigoCliente: value ? parseInt(value.codigoCliente) : null,
                                                NombreCliente: value ? value.nombreCliente : null,
                                                Oferta: value ? value.numeroOferta : null,
                                                NumNiveles: ""
                                            }))}
                                        />
                                    </Grid>

                                    {/* Número de niveles */}
                                    <Grid item xs={2}>
                                        <TextField disabled={!crearPlanta || plantaCreada} sx={{ width: '100%' }} variant="outlined" label="Nº de niveles" name="NumNiveles" onChange={handleConfPlantaClienteChange} value={confPlantaCliente.NumNiveles} />
                                    </Grid>

                                    {/* Botón para crear */}
                                    <Grid item xs={2}>
                                        {
                                            crearPlanta
                                                ? (
                                                    <Button
                                                        disabled={plantaCreada}
                                                        sx={{ width: '100%' }}
                                                        color='success'
                                                        variant='contained'
                                                        startIcon={<AddIcon />}
                                                        onClick={handleCrearCargarPlanta}
                                                    >
                                                        Crear
                                                    </Button>
                                                ) : (
                                                    <Button
                                                        disabled={plantaCreada}
                                                        sx={{ width: '100%' }}
                                                        color='success'
                                                        variant='contained'
                                                        startIcon={<DownloadIcon />}
                                                        onClick={handleCrearCargarPlanta}
                                                    >
                                                        Cargar
                                                    </Button>
                                                )
                                        }
                                    </Grid>

                                </Grid>
                            </Card>
                        </Grid>

                        <Grid item xs={12}>
                            <Card sx={{ p: 2, display: 'flex' }}>
                                <Grid container spacing={2} sx={{ alignItems: 'center' }}>

                                    {/* <Grid item xs={2}>
                                        <TextField
                                            disabled
                                            sx={{ width: '100%' }}
                                            name="nombre"
                                            onChange={handleElemento}
                                            error={errorElemento}
                                            helperText={errorElemento ? 'Este elemento ya existe' : ' '}
                                        />
                                    </Grid> */}

                                    <Grid item xs={1}>
                                        <Button
                                            disabled
                                            sx={{ ml: 1, marginBottom: '22px' }}
                                            variant='contained'
                                            startIcon={<AddIcon />}
                                            onClick={handleAddElemento}
                                        >
                                            Añadir Elemento
                                        </Button>
                                    </Grid>

                                    <Grid item xs={2}>
                                        <Autocomplete
                                            disabled
                                            id="elemento"
                                            options={elementos}
                                            getOptionLabel={option => option.nombre}
                                            renderInput={params => <TextField {...params} label="Elemento" value={textFieldValue} onChange={handleTextFieldChange} name="nombre" error={errorElementoCambiado} helperText={errorElementoCambiado ? 'Este elemento ya existe' : ' '} />}
                                            onChange={handleElementoChange}
                                            value={elementoCambiado}
                                        />
                                    </Grid>

                                    <Grid item xs={2}>
                                        <Button
                                            disabled
                                            sx={{ width: "70%", marginBottom: '22px' }}
                                            variant='contained'
                                            onClick={peticionPutElemento}
                                        >
                                            Modificar Elemento
                                        </Button>
                                    </Grid>

                                    <Grid item xs={1}>
                                        <Button
                                            disabled
                                            sx={{ width: "100%", marginBottom: '22px' }}
                                            variant='contained'
                                            startIcon={<AddIcon />}
                                            onClick={handleAddAnalisis}
                                        >
                                            Añadir Análisis
                                        </Button>
                                    </Grid>

                                    <Grid item xs={2}>
                                        <Autocomplete
                                            disabled
                                            id="analisis"
                                            options={analisis}
                                            sx={{ width: '100%', marginBottom: '22px' }}
                                            getOptionLabel={option => option.nombre}
                                            renderInput={params => <TextField {...params} label="Análisis" name="nombre" value={textFieldValueAnalisis} />}
                                            onChange={(event, newValue) => {
                                                handleAnalisisChange(event, newValue);
                                            }}
                                            clearOnBlur
                                            value={analisisCambiado}
                                        />
                                    </Grid>

                                    <Grid item xs={2}>
                                        <Button
                                            disabled
                                            sx={{ ml: 1, marginBottom: '22px' }}
                                            variant='contained'
                                            onClick={handleEditAnalisis}
                                        >
                                            Modificar Análisis
                                        </Button>
                                    </Grid>

                                </Grid>
                            </Card>
                        </Grid>

                        {/* APARTADO DE NIVELES */}
                        <Grid item xs={12}>
                            <Grid container spacing={2}>
                                {
                                    niveles.map(nivel => (
                                        <NivelPlanta
                                            key={nivel}
                                            nivel={nivel}
                                            contadorElemento={contadorElemento}
                                            setContadorElemento={setContadorElemento}
                                            elementosPlanta={elementosPlanta}
                                            setElementosPlanta={setElementosPlanta}
                                            indiceElemento={indiceElemento}
                                            setIndiceElemento={setIndiceElemento}
                                        />
                                    ))
                                }
                            </Grid>
                        </Grid>

                        {/* APARTADO DE LISTADO DE ELEMENTOS */}
                        <Grid item xs={4}>
                            <Card sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>

                                <Typography variant="h6" sx={{ width: '100%' }}>Listado de elementos</Typography>
                                {
                                    (elementosPlanta.length > 0)
                                        ? (
                                            <List>
                                                {
                                                    elementosPlanta.sort((a, b) => {
                                                        // Comparar primero por nombre (orden alfabético)
                                                        if (a.nombre < b.nombre) return -1;
                                                        if (a.nombre > b.nombre) return 1;

                                                        // Si los nombres son iguales, comparar por descripción (si no es null)
                                                        if (a.descripcion && b.descripcion) {
                                                            if (a.descripcion < b.descripcion) return -1;
                                                            if (a.descripcion > b.descripcion) return 1;
                                                        }
                                                        // Si solo uno tiene descripción, el que la tenga va primero
                                                        else if (a.descripcion && !b.descripcion) {
                                                            return -1;
                                                        }
                                                        else if (!a.descripcion && b.descripcion) {
                                                            return 1;
                                                        }

                                                        // Si los nombres son iguales y las descripciones son iguales o no existen, comparar por número
                                                        return a.numero - b.numero;
                                                    }).map(elemento => (
                                                        <ListItemButton
                                                            key={elemento.id}
                                                            selected={elementoSeleccionado.id === elemento.id}
                                                            onClick={() => handleSeleccionarElemento(elemento)}
                                                        >
                                                            <ListItemText primary={elemento.nombre + ' ' + elemento.numero} />
                                                        </ListItemButton>
                                                    ))
                                                }
                                            </List>
                                        ) : (
                                            <Typography>Ningún elemento añadido</Typography>
                                        )
                                }

                            </Card>
                        </Grid>

                        {/* APARTADO DE ANALISIS POR ELEMENTO */}
                        <Grid item xs={8}>
                            <Card sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>

                                <Grid container sx={{ justifyContent: 'space-between', alignItems: 'center', pb: 2 }}>

                                    <Grid item>
                                        <Typography variant="h6" sx={{ width: '100%' }}>Analisis por elemento</Typography>
                                    </Grid>

                                    <Grid item>
                                        <Tooltip title="Guardar analisis del elemento seleccionado" placement="left">
                                            <Button color="primary" disabled startIcon={<SaveIcon />} variant="outlined" onClick={handleGuardarAnalisisElemento}>
                                                Guardar
                                            </Button>
                                        </Tooltip>
                                    </Grid>

                                </Grid>

                                {/* Mensaje de feedback al guardar tipos de analisis del elemento */}
                                <Grid container>
                                    <Grid item xs={12}>
                                        <Alert id="snack" className="animate__animated animate__flipInX" onClose={handleSnackClose} severity={snackData.severity} sx={{
                                            width: '100%',
                                            display: snackData.open ? 'flex' : 'none'
                                        }}>
                                            {snackData.msg}
                                        </Alert>
                                    </Grid>
                                </Grid>

                                {/* Listado de checkboxs para marcar los analisis */}
                                <Grid container spacing={2}>
                                    {/* <FormGroup> */}
                                    {
                                        analisis.map(analisis => (
                                            <Grid item xs={6} key={analisis.id}>
                                                <CheckBoxAnalisis
                                                    label={analisis.nombre}
                                                    user={user}
                                                    name={camelCase(analisis.nombre)}
                                                    onChange={handleAnalisis}
                                                    elementoSeleccionado={elementoSeleccionado}
                                                    elementosPlanta={elementosPlanta}
                                                />
                                            </Grid>
                                        )
                                        )
                                    }
                                    {/* </FormGroup> */}
                                </Grid>

                            </Card>
                        </Grid>

                        {/* APARTADO DE DIAGRAMA */}
                        <Grid item xs={12}>
                            <Card sx={{ p: 2, height: '800px', display: 'flex', flexDirection: 'column' }}>

                                <Typography variant="h6">Diagrama de la planta</Typography>
                                {nodos2.length > 0 ?
                                    <ReactFlow
                                        nodes={nodos2}
                                        edges={lados2}
                                        onEdgesChange={onEdgesChange}
                                        onNodesChange={onNodesChange}
                                        onConnect={onConnect}
                                        nodeTypes={nodeTypes}
                                        fitView
                                        onEdgeUpdate={onEdgeUpdate}
                                        onEdgeUpdateStart={onEdgeUpdateStart}
                                        onEdgeUpdateEnd={onEdgeUpdateEnd}
                                        snapToGrid
                                        connectionMode={ConnectionMode.Loose}
                                        connectionLineComponent={ConnectionLine}
                                        attributionPosition={null}
                                    >
                                        <Background />
                                    </ReactFlow> :
                                    <ReactFlow
                                        nodes={nodos}
                                        edges={lados}
                                        onEdgesChange={onEdgesChange}
                                        onNodesChange={onNodesChange}
                                        onConnect={onConnect}
                                        nodeTypes={nodeTypes}
                                        fitView
                                        // onEdgeClick={handlerBorrarUnion}
                                        onEdgeUpdate={onEdgeUpdate}
                                        onEdgeUpdateStart={onEdgeUpdateStart}
                                        onEdgeUpdateEnd={onEdgeUpdateEnd}
                                        snapToGrid
                                        connectionMode={ConnectionMode.Loose}
                                        connectionLineComponent={ConnectionLine}
                                        attributionPosition={null}
                                    >
                                        <Background />
                                    </ReactFlow>
                                }
                            </Card>
                        </Grid>

                    </Grid>

                </MainLayout>
            }
        </>

    )

}