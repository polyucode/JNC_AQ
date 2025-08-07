import { useState, useEffect, useContext } from "react";
import { MainLayout } from "../layout/MainLayout";
import { Grid, Card, Typography, Button, TextField, InputAdornment, IconButton } from '@mui/material';

import { DataGrid } from '@mui/x-data-grid';
import { DATAGRID_LOCALE_TEXT } from '../helpers/datagridLocale';
import { InsertarOfertaModal } from '../components/Modals/InsertarOfertaModal';
import { EditarOfertaModal } from '../components/Modals/EditarOfertaModal';
import { insertarBotonesModal } from '../helpers/insertarBotonesModal';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import FileCopyIcon from '@mui/icons-material/FileCopy';

import { ModalLayout } from "../components/ModalLayout";
import {
    getClientes, getOfertas, postOfertas, putOfertas, getProductos, postOfertasProductos, getConfPlantaCliente, getConfNivelesPlantasCliente,
    getElementosPlanta, postElementosPlanta, postConfNivelesPlantasCliente, getAnalisisNivelesPlantasCliente, postConfPlantaCliente,
    postAnalisisNivelesPlantasCliente, getTareas, getParametrosAnalisisPlanta, postParametrosAnalisisPlanta, postTareas,
    getParametrosElementoPlantaCliente, postParametrosElementoPlantaCliente, getValorParametros, postValorParametros,
    putConfPlantaCliente, putOfertasProductos, getOfertasProductos, insertContactosOferta, putOfertasContactos, postOfertasContactos,
    getOfertasContactos, deleteOfertas
} from "../api";
import { ModalLayout2 } from "../components/ModalLayout2";

import Swal from 'sweetalert2';

import { TailSpin } from 'react-loader-spinner';
import './MantenimientoTecnico.css';
import { AuthContext } from "../context/AuthContext";

export const OfertasClientesPage = () => {

    const [modalInsertar, setModalInsertar] = useState(false);

    const [modalEditar, setModalEditar] = useState(false);

    const [modalEliminar, setModalEliminar] = useState(false);

    const [rows, setRows] = useState([]);
    const [rowsIds, setRowsIds] = useState([]);

    const [ofertaSeleccionada, setOfertaSeleccionada] = useState({
        id: 0,
        numeroOferta: 0,
        pedido: 0,
        referencia: '',
        codigoCliente: 0,
        nombreCliente: '',
        descripcion: '',
        fechaInicio: null,
        fechaFinalizacion: null,
        addDate: null,
        addIdUser: null,
        modDate: null,
        modIdUser: null,
        delDate: null,
        delIdUser: null,
        deleted: null,
    });

    const [OfertaEliminar, setOfertaEliminar] = useState([]);

    const [clientes, setClientes] = useState([]);
    const [productos, setProductos] = useState([]);
    const [plantas, setPlantas] = useState([]);
    const [parametrosAnalisis, setParametrosAnalisis] = useState([]);
    const [elementosPlanta, setElementosPlanta] = useState([]);
    const [tareas, setTareas] = useState([]);
    const [nivelesPlanta, setNivelesPlanta] = useState([]);
    const [analisisPlanta, setAnalisisPlanta] = useState([]);
    const [parametrosElemento, setParametrosElemento] = useState([]);
    const [valorParametros, setValorParametros] = useState([]);
    const [productosAsociados, setProductosAsociados] = useState([]);
    const [contactosAsociados, setContactosAsociados] = useState([]);

    const [clienteCodigoEditar, setClientesCodigoEditar] = useState([]);

    const [data, setData] = useState([]);

    const { user } = useContext(AuthContext);

    const [errorOferta, setErrorOferta] = useState(false);
    const [errorPedido, setErrorPedido] = useState(false);
    const [errorCodigo, setErrorCodigo] = useState(false);
    const [errorFechaInicio, setErrorFechaInicio] = useState(false);
    const [errorFechaFinal, setErrorFechaFinal] = useState(false);

    const [filterText, setFilterText] = useState('');

    const [openModal, setOpenModal] = useState(false);

    const [ofertaNueva, setOfertaNueva] = useState(0);

    const [ofertaContactosSeleccionados, setOfertaContactosSeleccionados] = useState([]);
    const [ofertaProductosSeleccionados, setOfertaProductosSeleccionados] = useState([]);

    const [cargando, setCargando] = useState(false);

    const columns = [

        //Visibles
        { headerName: 'Nº Oferta', field: 'numeroOferta', width: 150 },
        { headerName: 'Descripcion', field: 'descripcion', width: 400 },
        { headerName: 'Pedido', field: 'pedido', width: 150 },
        { headerName: 'Referencia Cliente', field: 'referencia', width: 250 },
        { headerName: 'CodigoCliente', field: 'codigoCliente', width: 150 },
        { headerName: 'NombreCliente', field: 'nombreCliente', width: 250 },
        {
            headerName: 'Fecha de Inicio',
            field: 'fechaInicio',
            width: 200,
            valueFormatter: (params) => {
                const date = new Date(params.value);
                return date.toLocaleDateString();
            }
        },
        {
            headerName: 'Fecha de Finalizacion',
            field: 'fechaFinalizacion',
            width: 200,
            valueFormatter: (params) => {
                const date = new Date(params.value);
                return date.toLocaleDateString();
            }
        },
        {
            headerName: 'Producto',
            field: 'producto',
            width: 200,
            valueFormatter: (params) => {
                const prod = productos.find((producto) => producto.id === params.value);
                return prod ? prod.descripcion : '';
            }
        },
        { headerName: 'Unidades', field: 'unidades', width: 200 },
        {
            headerName: 'Precio',
            field: 'precio',
            width: 200,
            valueFormatter: (params) => {
                if (params.value !== 0 && params.value !== null && params.value !== undefined) {
                    const formattedValue = String(params.value).replace(".", ",");
                    return formattedValue;
                } else {
                    return params.value === 0 ? '0' : '';
                }
            }
        }
    ];

    const getOferta = async () => {

        const resp = await getOfertas();
        const ofertasFiltrados = resp.filter(oferta => !oferta.deleted);
        setData(ofertasFiltrados);

    }

    useEffect(() => {
        getOferta();
        getClientes()
            .then(resp => setClientes(resp.filter(cliente => !cliente.deleted)));

        getProductos()
            .then(resp => setProductos(resp.filter(producto => !producto.deleted)));

        getConfPlantaCliente()
            .then(resp => setPlantas(resp.filter(planta => !planta.deleted)));

        getConfNivelesPlantasCliente()
            .then(resp => setNivelesPlanta(resp.filter(nivel => !nivel.deleted)));

        getElementosPlanta()
            .then(resp => setElementosPlanta(resp.filter(elem => !elem.deleted)));

        getAnalisisNivelesPlantasCliente()
            .then(resp => setAnalisisPlanta(resp.filter(an => !an.deleted)));

        getTareas()
            .then(resp => setTareas(resp.filter(tarea => !tarea.deleted)));

        getParametrosAnalisisPlanta()
            .then(resp => setParametrosAnalisis(resp.filter(param => !param.deleted)));

        getParametrosElementoPlantaCliente()
            .then(resp => setParametrosElemento(resp.filter(param => !param.deleted)));

        getValorParametros()
            .then(resp => setValorParametros(resp.filter(valor => !valor.deleted)));

        getOfertasProductos()
            .then(resp => setProductosAsociados(resp.filter(prod => !prod.deleted)))

        getOfertasContactos()
            .then(resp => setContactosAsociados(resp.filter(cont => !cont.deleted)))
    }, [])

    useEffect(() => {
        if (data.length > 0) {
            setRows(data);
        } else {
            setRows([]);
        }
    }, [data]);

    const peticionPost = async () => {

        const ofertaRepetida = data.filter(of => of.numeroOferta === ofertaSeleccionada.numeroOferta && !of.deleted)

        if (ofertaSeleccionada.numeroOferta !== 0) {
            setErrorOferta(false)
        } else {
            setErrorOferta(true)
        }

        if (ofertaSeleccionada.pedido !== 0) {
            setErrorPedido(false)
        } else {
            setErrorPedido(true)
        }

        if (ofertaSeleccionada.codigoCliente !== 0) {
            setErrorCodigo(false)
        } else {
            setErrorCodigo(true)
        }

        if (ofertaSeleccionada.fechaInicio !== null) {
            setErrorFechaInicio(false)
        } else {
            setErrorFechaInicio(true)
        }

        if (ofertaSeleccionada.fechaFinalizacion !== null && ofertaSeleccionada.fechaFinalizacion >= ofertaSeleccionada.fechaInicio) {
            setErrorFechaFinal(false)
        } else {
            setErrorFechaFinal(true)
        }

        if (ofertaRepetida.length === 0 && ofertaSeleccionada.numeroOferta !== 0 && ofertaSeleccionada.pedido !== 0 && ofertaSeleccionada.codigoCliente !== 0 && ofertaSeleccionada.fechaInicio !== null && ofertaSeleccionada.fechaFinalizacion !== null && ofertaSeleccionada.fechaFinalizacion >= ofertaSeleccionada.fechaInicio) {
            ofertaSeleccionada.id = 0;

            const resp = await postOfertas(ofertaSeleccionada);

            const decimalRegex = /^-?\d+([.,]\d{1,2})?$/;

            if (ofertaProductosSeleccionados.length > 0) {
                ofertaProductosSeleccionados.map(async producto => {
                    if (decimalRegex.test(producto.precio)) {
                        const normalizedValue = normalizeDecimal(producto.precio);
                        producto.precio = Number(normalizedValue.replace(',', '.')) || 0
                    }
                    producto.idOferta = resp.data.data.id
                    await postOfertasProductos(producto);
                })
            }

            await insertContactosOferta(ofertaContactosSeleccionados, ofertaSeleccionada.numeroOferta);

            getOferta();

            Swal.fire({
                position: 'center',
                icon: 'info',
                title: 'Oferta Creada',
                text: `La oferta se ha creado correctamente`,
                showConfirmButton: false,
                timer: 2000,
                showClass: {
                    popup: 'animate__animated animate__bounceIn'
                },
                hideClass: {
                    popup: 'animate__animated animate__bounceOut'
                }
            });
        } else if (ofertaRepetida.length > 0) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Error',
                text: `Este número de oferta ya existe`,
                showConfirmButton: true
            });
        } else {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Error',
                text: `Faltan valores obligatorios por introducir`,
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

    const peticionPut = async () => {

        const ofertaRepetida = data.filter(of => of.numeroOferta === ofertaSeleccionada.numeroOferta && of.id !== ofertaSeleccionada.id && !of.deleted)

        if (ofertaSeleccionada.numeroOferta !== 0) {
            setErrorOferta(false)
        } else {
            setErrorOferta(true)
        }

        if (ofertaSeleccionada.pedido !== 0) {
            setErrorPedido(false)
        } else {
            setErrorPedido(true)
        }

        if (ofertaSeleccionada.codigoCliente !== 0) {
            setErrorCodigo(false)
        } else {
            setErrorCodigo(true)
        }

        if (ofertaSeleccionada.fechaInicio !== null) {
            setErrorFechaInicio(false)
        } else {
            setErrorFechaInicio(true)
        }

        if (ofertaSeleccionada.fechaFinalizacion !== null && ofertaSeleccionada.fechaFinalizacion > ofertaSeleccionada.fechaInicio) {
            setErrorFechaFinal(false)
        } else {
            setErrorFechaFinal(true)
        }

        if (ofertaRepetida.length === 0 && ofertaSeleccionada.numeroOferta !== 0 && ofertaSeleccionada.pedido !== 0 && ofertaSeleccionada.codigoCliente !== 0 && ofertaSeleccionada.fechaInicio !== null && ofertaSeleccionada.fechaFinalizacion !== null && ofertaSeleccionada.fechaFinalizacion > ofertaSeleccionada.fechaInicio) {

            await putOfertas(ofertaSeleccionada);

            const decimalRegex = /^-?\d+([.,]\d{1,2})?$/;

            var ofertaModificada = data;
            ofertaModificada.map(oferta => {
                if (oferta.id === ofertaSeleccionada.id) {
                    oferta = ofertaSeleccionada
                }
            });
            getOferta();

            if (ofertaProductosSeleccionados.length > 0) {
                ofertaProductosSeleccionados.map(async producto => {
                    if (producto.id !== 0) {
                        if (decimalRegex.test(producto.precio)) {
                            const normalizedValue = normalizeDecimal(producto.precio);
                            producto.precio = Number(normalizedValue.replace(',', '.')) || 0
                        }
                        await putOfertasProductos(producto)
                    }
                    else {
                        if (decimalRegex.test(producto.precio)) {
                            const normalizedValue = normalizeDecimal(producto.precio);
                            producto.precio = Number(normalizedValue.replace(',', '.')) || 0
                        }
                        await postOfertasProductos(producto);
                    }
                })
            }

            if (ofertaContactosSeleccionados.length > 0) {
                ofertaContactosSeleccionados.map(async contacto => {
                    if (contacto.id !== 0) {
                        await putOfertasContactos(contacto)
                    }
                    else {
                        await postOfertasContactos(contacto);
                    }
                })
            }

            Swal.fire({
                position: 'center',
                icon: 'info',
                title: 'Oferta Editada',
                text: `La oferta se ha editado correctamente`,
                showConfirmButton: false,
                timer: 2000,
                showClass: {
                    popup: 'animate__animated animate__bounceIn'
                },
                hideClass: {
                    popup: 'animate__animated animate__bounceOut'
                }
            });
        } else if (ofertaRepetida.length > 0) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Error',
                text: `Este número de oferta ya existe`,
                showConfirmButton: true
            });
        } else {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Error',
                text: `Faltan datos obligatorios por introducir`,
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

    const peticionDelete = async () => {
        abrirCerrarModalEliminar();
        setCargando(true);

        try {

            var i = 0
            while (i < OfertaEliminar.length) {

                await deleteOfertas(OfertaEliminar[i]);
                setOfertaSeleccionada({
                    id: 0,
                    numeroOferta: 0,
                    pedido: 0,
                    referencia: '',
                    codigoCliente: 0,
                    nombreCliente: '',
                    descripcion: '',
                    fechaInicio: '',
                    fechaFinalizacion: '',
                    contacto1: '',
                    contacto2: '',
                    contacto3: '',
                    producto: 0,
                    unidades: 0,
                    precio: 0,
                    addDate: null,
                    addIdUser: null,
                    modDate: null,
                    modIdUser: null,
                    delDate: null,
                    delIdUser: null,
                    deleted: null,
                });

                i++;
            }

            getOferta();
            Swal.fire({
                position: 'center',
                icon: 'info',
                title: 'Oferta Eliminada',
                text: 'La oferta se ha eliminado correctamente',
                showConfirmButton: false,
                timer: 2000,
                showClass: {
                    popup: 'animate__animated animate__bounceIn'
                },
                hideClass: {
                    popup: 'animate__animated animate__bounceOut'
                }
            });
        } catch (error) {
            console.error("Error al borrar la oferta", error);
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Error',
                text: 'Error al borrar la oferta',
                showConfirmButton: true,
            });
        } finally {
            setCargando(false);
        }
    }

    const normalizeDecimal = (value) => {
        if (typeof value !== 'string') {
            value = String(value);
        }

        return value.replace('.', ',');
    };

    //Modales
    const abrirCerrarModalInsertar = () => {
        setErrorCodigo(false)
        setErrorFechaFinal(false)
        setErrorFechaInicio(false)
        setErrorOferta(false)
        setErrorPedido(false)
        if (modalInsertar) {
            setOfertaSeleccionada({
                id: 0,
                numeroOferta: 0,
                pedido: 0,
                referencia: '',
                codigoCliente: 0,
                nombreCliente: '',
                descripcion: '',
                fechaInicio: null,
                fechaFinalizacion: null,
                contacto1: '',
                contacto2: '',
                contacto3: '',
                producto: 0,
                unidades: 0,
                precio: 0,
                addDate: null,
                addIdUser: null,
                modDate: null,
                modIdUser: null,
                delDate: null,
                delIdUser: null,
                deleted: null,
            })
            setModalInsertar(!modalInsertar);
        } else {
            setModalInsertar(!modalInsertar);
        }
    }

    const abrirCerrarModalEliminar = () => {
        setErrorCodigo(false)
        setErrorFechaFinal(false)
        setErrorFechaInicio(false)
        setErrorOferta(false)
        setErrorPedido(false)
        if (modalEliminar) {
            setOfertaSeleccionada({
                id: 0,
                numeroOferta: 0,
                pedido: 0,
                referencia: '',
                codigoCliente: 0,
                nombreCliente: '',
                descripcion: '',
                fechaInicio: null,
                fechaFinalizacion: null,
                contacto1: '',
                contacto2: '',
                contacto3: '',
                producto: 0,
                unidades: 0,
                precio: 0,
                addDate: null,
                addIdUser: null,
                modDate: null,
                modIdUser: null,
                delDate: null,
                delIdUser: null,
                deleted: null,
            })
            setModalEliminar(!modalEliminar);
        } else {
            setModalEliminar(!modalEliminar);
        }
    }

    const abrirCerrarModalEditar = () => {
        setErrorCodigo(false)
        setErrorFechaFinal(false)
        setErrorFechaInicio(false)
        setErrorOferta(false)
        setErrorPedido(false)
        if (modalEditar) {
            setOfertaSeleccionada({
                id: 0,
                numeroOferta: 0,
                pedido: 0,
                referencia: '',
                codigoCliente: 0,
                nombreCliente: '',
                descripcion: '',
                fechaInicio: null,
                fechaFinalizacion: null,
                contacto1: '',
                contacto2: '',
                contacto3: '',
                producto: 0,
                unidades: 0,
                precio: 0,
                addDate: null,
                addIdUser: null,
                modDate: null,
                modIdUser: null,
                delDate: null,
                delIdUser: null,
                deleted: null,
            })
            setModalEditar(!modalEditar);
        } else {
            setModalEditar(!modalEditar);
        }
    }

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleClonOferta = () => {
        setOpenModal(true);
    };

    const handleChangeOferta = (event) => {
        setOfertaNueva(parseInt(event.target.value))
    }

    const clonarOferta = async (oferta) => {

        const ofertaRepetida = data.filter(of => of.numeroOferta === oferta && !of.deleted)

        if (ofertaRepetida.length === 0) {
            handleCloseModal();
            abrirCerrarModalEditar();
            setCargando(true);

            try {

                //await cloneOferta(ofertaSeleccionada.id, oferta)

                const nivelesOferta = nivelesPlanta.filter(nivel => nivel.oferta === ofertaSeleccionada.numeroOferta);
                const plantaOferta = plantas.filter(planta => planta.oferta === ofertaSeleccionada.numeroOferta);
                const diagramaParseado = JSON.parse(plantaOferta[0].diagrama);
                const plantaClonada = { ...plantaOferta[0], id: 0, oferta, diagrama: "" };

                const respPlanta = await postConfPlantaCliente(plantaClonada);

                await Promise.all(nivelesOferta.map(async (nivel) => {
                    const elementosOferta = elementosPlanta.filter(elem => elem.id === nivel.id_Elemento);
                    const parametrosOferta = parametrosElemento.filter(parametro => parametro.oferta === ofertaSeleccionada.numeroOferta && parametro.id_Elemento === nivel.id_Elemento);
                    const elementosClonados = { ...elementosOferta[0], id: 0, oferta };

                    const respElemento = await postElementosPlanta(elementosClonados);

                    diagramaParseado.nodos.forEach(param => {
                        if (param.type === 'nodoElemento' && param.data.id === elementosOferta[0].id) {
                            param.data.id = respElemento.id;
                        }
                    });

                    const nivelClonado = { ...nivel, id: 0, oferta, id_Elemento: respElemento.id, id_Planta: respPlanta.id };
                    const respNiveles = await postConfNivelesPlantasCliente(nivelClonado);

                    const analisisOferta = analisisPlanta.filter(anal => anal.id_NivelesPlanta === nivel.id);
                    const tareasPorElemento = parametrosAnalisis.filter(parametro => parametro.elemento === nivel.id_Elemento);
                    const tareasAnalisis = tareas.filter(tarea => tarea.elemento === nivel.id_Elemento);
                    const valoresOferta = valorParametros.filter(valor => valor.id_Elemento === nivel.id_Elemento);

                    await Promise.all([
                        ...analisisOferta.map(anal => {
                            anal.id = 0;
                            anal.id_NivelesPlanta = respNiveles.id;
                            return postAnalisisNivelesPlantasCliente(anal);
                        }),
                        ...tareasPorElemento.map(tarea => {
                            tarea.id = 0;
                            tarea.oferta = oferta;

                            var fecha = new Date(tarea.fecha);
                            var year = fecha.getFullYear() + 1;
                            var month = fecha.getMonth() + 1;
                            var day = fecha.getDate();

                            var monthFormatted = month < 10 ? '0' + month : month;
                            var dayFormatted = day < 10 ? '0' + day : day;

                            var fechaFormateada = year + '-' + monthFormatted + '-' + dayFormatted;

                            tarea.fecha = fechaFormateada;
                            fecha.setFullYear(fecha.getFullYear() + 1);
                            tarea.periodo = fecha.toLocaleDateString('es', { year: 'numeric', month: 'short' });
                            tarea.elemento = respElemento.id;
                            tarea.cancelado = false;
                            tarea.facturado = false;
                            tarea.fechaPdf = null;
                            tarea.fechaRealizado = null;
                            tarea.fechaRecogido = null;
                            tarea.numeroFacturado = "";
                            tarea.observaciones = "";
                            tarea.pdf = 0;
                            tarea.realizado = false;
                            tarea.recibido = false;
                            tarea.recogido = false;
                            tarea.resultado = "";
                            tarea.noValido = false;
                            tarea.incorrecto = false;
                            tarea.textoCorreo = "";

                            return postParametrosAnalisisPlanta(tarea);
                        }),
                        ...tareasAnalisis.map(analisi => {
                            analisi.id = 0;
                            analisi.oferta = oferta;

                            var fecha = new Date(analisi.fecha);
                            var year = fecha.getFullYear() + 1;
                            var month = fecha.getMonth() + 1;
                            var day = fecha.getDate();
                            var monthFormatted = month < 10 ? '0' + month : month;
                            var dayFormatted = day < 10 ? '0' + day : day;
                            var fechaFormateada = year + '-' + monthFormatted + '-' + dayFormatted;
                            analisi.fecha = fechaFormateada;

                            analisi.elemento = respElemento.id;
                            return postTareas(analisi);
                        }),
                        ...valoresOferta.map(valor => {
                            if (valor.fecha == null) {
                                valor.id = 0;
                                valor.oferta = oferta;
                                valor.id_Elemento = respElemento.id;
                                return postValorParametros(valor);
                            }
                        }),
                        ...parametrosOferta.map(param => {
                            param.id = 0;
                            param.oferta = oferta;
                            param.id_Elemento = respElemento.id;
                            return postParametrosElementoPlantaCliente(param);
                        })
                    ]);

                    const stringed = JSON.stringify(diagramaParseado);
                    respPlanta.diagrama = stringed;
                    await putConfPlantaCliente(respPlanta);
                }));

                const ofertaClonada = { ...ofertaSeleccionada, id: 0, numeroOferta: oferta };

                ofertaClonada.fechaInicio = new Date(ofertaClonada.fechaInicio);
                ofertaClonada.fechaFinalizacion = new Date(ofertaClonada.fechaFinalizacion);

                var yearFI = ofertaClonada.fechaInicio.getFullYear() + 1;
                var monthFI = ofertaClonada.fechaInicio.getMonth() + 1;
                var dayFI = ofertaClonada.fechaInicio.getDate();

                var yearFF = ofertaClonada.fechaFinalizacion.getFullYear() + 1;
                var monthFF = ofertaClonada.fechaFinalizacion.getMonth() + 1;
                var dayFF = ofertaClonada.fechaFinalizacion.getDate();

                var monthFormatted = monthFI < 10 ? '0' + monthFI : monthFI;
                var dayFormatted = dayFI < 10 ? '0' + dayFI : dayFI;

                var monthFormattedFF = monthFF < 10 ? '0' + monthFF : monthFF;
                var dayFormattedFF = dayFF < 10 ? '0' + dayFF : dayFF;

                var fechaFormateada = yearFI + '-' + monthFormatted + '-' + dayFormatted;
                var fechaFormateadaFF = yearFF + '-' + monthFormattedFF + '-' + dayFormattedFF;

                ofertaClonada.fechaInicio = fechaFormateada;
                ofertaClonada.fechaFinalizacion = fechaFormateadaFF;

                const resp = await postOfertas(ofertaClonada);

                const productosOferta = productosAsociados.filter(producto => producto.idOferta === ofertaSeleccionada.id);
                const contactosOferta = contactosAsociados.filter(contacto => contacto.idOferta === ofertaSeleccionada.id)

                await Promise.all([
                    ...productosOferta.map(producto => {
                        producto.id = 0;
                        producto.idOferta = resp.data.data.id;
                        return postOfertasProductos(producto);
                    }),
                    ...contactosOferta.map(contacto => {
                        contacto.id = 0;
                        contacto.idOferta = resp.data.data.id;
                        return postOfertasContactos(contacto);
                    })
                ]);

                getOferta();
                setOfertaSeleccionada({
                    id: 0,
                    numeroOferta: 0,
                    pedido: 0,
                    referencia: '',
                    codigoCliente: 0,
                    nombreCliente: '',
                    descripcion: '',
                    fechaInicio: null,
                    fechaFinalizacion: null,
                    contacto1: '',
                    contacto2: '',
                    contacto3: '',
                    producto: 0,
                    unidades: 0,
                    precio: 0,
                    addDate: null,
                    addIdUser: null,
                    modDate: null,
                    modIdUser: null,
                    delDate: null,
                    delIdUser: null,
                    deleted: null,
                });

                Swal.fire({
                    position: 'center',
                    icon: 'info',
                    title: 'Oferta Clonada',
                    text: `La oferta se ha clonado correctamente`,
                    showConfirmButton: false,
                    timer: 2000,
                    showClass: {
                        popup: 'animate__animated animate__bounceIn'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__bounceOut'
                    }
                });
            } catch (error) {
                console.error("Error al clonar la oferta", error);
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Error',
                    text: 'Error al clonar la oferta',
                    showConfirmButton: true,
                });
            } finally {
                setCargando(false);
            }
        } else {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Error',
                text: 'Este número de oferta ya existe. Introduzca otro',
                showConfirmButton: true,
            });
        }
    }

    const handleChange = e => {
        setOfertaSeleccionada(prevState => ({
            ...prevState,
            [e.target.name]: e.target.type === 'number' ? parseInt(e.target.value) : e.target.value
        }));
    }

    const handleChangeFecha = e => {
        const { name, value } = e.target;
        setOfertaSeleccionada(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleSelectRow = (ids) => {

        if (ids.length > 0) {
            setOfertaSeleccionada(data.filter(oferta => oferta.id === ids[0])[0]);
        } else {
            setOfertaSeleccionada(ofertaSeleccionada);
        }
        setRowsIds(ids);
    }

    const handleFilterChange = (event) => {
        setFilterText(event.target.value);
    };

    const filteredData = rows.filter(item =>
        item.nombreCliente.toLowerCase().includes(filterText.toLowerCase())
    );

    return (
        <>
            {
                user.idPerfil === 1 ?
                    <MainLayout title="Ofertas">
                        <Grid container spacing={2}>
                            {/* Título y botones de opción */}
                            <Grid item xs={12}>
                                <Card sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography variant='h6'>Listado de ofertas</Typography>
                                    <Grid item xs={5}>
                                        <TextField
                                            label="Filtrar cliente"
                                            variant="outlined"
                                            value={filterText}
                                            onChange={handleFilterChange}
                                            sx={{ width: '50%' }}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton>
                                                            <SearchIcon />
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Grid>
                                    {
                                        (rowsIds.length > 0) ?
                                            (
                                                <Grid item>
                                                    <Button
                                                        sx={{ height: '40px' }}
                                                        color='error'
                                                        variant='contained'
                                                        startIcon={<DeleteIcon />}
                                                        onClick={(event, rowData) => {
                                                            setOfertaEliminar(rowsIds)
                                                            abrirCerrarModalEliminar()
                                                        }}
                                                    >
                                                        Eliminar
                                                    </Button>
                                                </Grid>
                                            ) : (
                                                <Button
                                                    sx={{ height: '40px' }}
                                                    color='success'
                                                    variant='contained'
                                                    startIcon={<AddIcon />}
                                                    onClick={abrirCerrarModalInsertar}
                                                >Añadir</Button>
                                            )
                                    }
                                </Card>
                            </Grid>
                            {cargando && (
                                <div className="spinner-overlay">
                                    <TailSpin
                                        height="80"
                                        width="80"
                                        color="#4fa94d"
                                        ariaLabel="tail-spin-loading"
                                        radius="1"
                                        visible={true}
                                    />
                                </div>
                            )}
                            {/* Tabla donde se muestran los registros de los clientes */}
                            <Grid item xs={12}>
                                <Card>
                                    <DataGrid
                                        key="ofertas"
                                        localeText={DATAGRID_LOCALE_TEXT}
                                        sx={{
                                            width: '100%',
                                            height: 1000,
                                            backgroundColor: '#FFFFFF'
                                        }}
                                        rows={filteredData}
                                        columns={columns}
                                        checkboxSelection
                                        disableSelectionOnClick
                                        onSelectionModelChange={(ids) => handleSelectRow(ids)}
                                        onRowClick={(ofertaSeleccionada, evt) => {
                                            setOfertaSeleccionada(ofertaSeleccionada.row)
                                            setClientesCodigoEditar(clientes.filter(cliente => cliente.codigo === ofertaSeleccionada.row.codigoCliente));
                                            abrirCerrarModalEditar();
                                        }}
                                    />
                                </Card>
                            </Grid>

                            {/* LISTA DE MODALS */}

                            {/* Agregar Oferta */}
                            <ModalLayout
                                key={`oferta-añadir-${ofertaSeleccionada.id}`}
                                titulo="Agregar nueva oferta"
                                contenido={
                                    <InsertarOfertaModal
                                        ofertaSeleccionada={ofertaSeleccionada}
                                        change={handleChange}
                                        handleChangeFecha={handleChangeFecha}
                                        setOfertaSeleccionada={setOfertaSeleccionada}
                                        errorCodigo={errorCodigo}
                                        errorFechaFinal={errorFechaFinal}
                                        errorFechaInicio={errorFechaInicio}
                                        errorOferta={errorOferta}
                                        errorPedido={errorPedido}
                                        setOfertaContactosSeleccionados={setOfertaContactosSeleccionados}
                                        setOfertaProductosSeleccionados={setOfertaProductosSeleccionados}
                                    />
                                }
                                botones={[
                                    insertarBotonesModal(<AddIcon />, 'Insertar', async () => {
                                        peticionPost();
                                    })
                                ]}
                                open={modalInsertar}
                                onClose={abrirCerrarModalInsertar}
                            />

                        </Grid>

                        {/* Modal Editar Oferta*/}

                        <ModalLayout
                            key={`oferta-editar-${ofertaSeleccionada.id}`}
                            titulo="Editar Oferta"
                            contenido={
                                <EditarOfertaModal
                                    ofertaSeleccionada={ofertaSeleccionada}
                                    setOfertaSeleccionada={setOfertaSeleccionada}
                                    handleChangeFecha={handleChangeFecha}
                                    change={handleChange}
                                    codigoClienteEditar={clienteCodigoEditar}
                                    errorCodigo={errorCodigo}
                                    errorFechaFinal={errorFechaFinal}
                                    errorFechaInicio={errorFechaInicio}
                                    errorOferta={errorOferta}
                                    errorPedido={errorPedido}
                                    setOfertaContactosSeleccionados={setOfertaContactosSeleccionados}
                                    setOfertaProductosSeleccionados={setOfertaProductosSeleccionados}
                                />}
                            botones={[
                                insertarBotonesModal(<FileCopyIcon />, 'Clonar Oferta', () => handleClonOferta()),
                                insertarBotonesModal(<AddIcon />, 'Guardar', async () => {
                                    peticionPut();
                                })
                            ]}
                            open={modalEditar}
                            onClose={abrirCerrarModalEditar}
                        />

                        {/* Eliminar oferta */}
                        <ModalLayout
                            key={`oferta-eliminar-${ofertaSeleccionada.id}`}
                            titulo="Eliminar oferta"
                            contenido={
                                rowsIds.length > 1 ? (
                                    <Grid item xs={12}>
                                        <Typography>
                                            ¿Estás seguro que deseas eliminar las <b>{rowsIds.length}</b> ofertas seleccionadas?
                                        </Typography>
                                    </Grid>
                                ) : (
                                    <>
                                        <Grid item xs={12}>
                                            <Typography>Estás seguro que deseas eliminar la oferta?</Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography><b>{ofertaSeleccionada.numeroOferta}</b></Typography>
                                        </Grid>
                                    </>
                                )
                            }
                            botones={[
                                insertarBotonesModal(<DeleteIcon />, 'Eliminar', async () => {
                                    peticionDelete();
                                }, 'error'),
                            ]}
                            open={modalEliminar}
                            onClose={abrirCerrarModalEliminar}
                        />

                        <ModalLayout2
                            titulo="Nuevo Número de Oferta"
                            contenido={
                                <Grid item xs={12}>
                                    <Grid container sx={{ textAlign: 'center' }}>
                                        <Grid item xs={4}>
                                            <TextField
                                                sx={{
                                                    width: '100%',
                                                    marginTop: '25px',
                                                    '& input[type=number]': {
                                                        MozAppearance: 'textfield',
                                                        '&::-webkit-outer-spin-button': {
                                                            WebkitAppearance: 'none',
                                                            margin: 0
                                                        },
                                                        '&::-webkit-inner-spin-button': {
                                                            WebkitAppearance: 'none',
                                                            margin: 0
                                                        }
                                                    }
                                                }}
                                                name="ofertaNueva"
                                                type="number"
                                                onChange={handleChangeOferta}
                                                onKeyDown={(e) => {
                                                    if (e.key === '.' || e.key === ',' || e.key === '-' || e.key === 'e') {
                                                        e.preventDefault();
                                                    }
                                                }}
                                            />
                                        </Grid>
                                    </Grid>

                                </Grid>
                            }
                            botones={[insertarBotonesModal(<FileCopyIcon />, 'Clonar', async () => {
                                clonarOferta(ofertaNueva);
                            })
                            ]}
                            open={openModal}
                            onClose={handleCloseModal}
                        />
                    </MainLayout>
                    :
                    <MainLayout title="Ofertas">

                        <Grid container spacing={2}>

                            {/* Título y botones de opción */}
                            <Grid item xs={12}>
                                <Card sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography variant='h6'>Listado de ofertas</Typography>
                                    <Grid item xs={8}>
                                        <TextField
                                            label="Filtrar cliente"
                                            variant="outlined"
                                            value={filterText}
                                            onChange={handleFilterChange}
                                            sx={{ width: '30%' }}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton>
                                                            <SearchIcon />
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Grid>
                                </Card>
                            </Grid>

                            {/* Tabla donde se muestran los registros de los clientes */}
                            <Grid item xs={12}>
                                <Card>
                                    <DataGrid
                                        localeText={DATAGRID_LOCALE_TEXT}
                                        sx={{
                                            width: '100%',
                                            height: 1000,
                                            backgroundColor: '#FFFFFF'
                                        }}
                                        rows={filteredData}
                                        columns={columns}
                                        onSelectionModelChange={(ids) => handleSelectRow(ids)}
                                        onRowClick={(ofertaSeleccionada, evt) => {
                                            setOfertaSeleccionada(ofertaSeleccionada.row)
                                            setClientesCodigoEditar(clientes.filter(cliente => cliente.codigo === ofertaSeleccionada.row.codigoCliente));
                                            abrirCerrarModalEditar();
                                        }}
                                    />
                                </Card>
                            </Grid>

                        </Grid>

                        <ModalLayout2
                            titulo="Editar Oferta"
                            contenido={
                                <EditarOfertaModal
                                    ofertaSeleccionada={ofertaSeleccionada}
                                    setOfertaSeleccionada={setOfertaSeleccionada}
                                    change={handleChange}
                                    codigoClienteEditar={clienteCodigoEditar}
                                    errorCodigo={errorCodigo}
                                    errorFechaFinal={errorFechaFinal}
                                    errorFechaInicio={errorFechaInicio}
                                    errorOferta={errorOferta}
                                    errorPedido={errorPedido}
                                    setOfertaContactosSeleccionados={setOfertaContactosSeleccionados}
                                    setOfertaProductosSeleccionados={setOfertaProductosSeleccionados}
                                />}
                            botones={[insertarBotonesModal(<AddIcon />, 'Guardar')]}
                            open={modalEditar}
                            onClose={abrirCerrarModalEditar}
                        />

                    </MainLayout>
            }

        </>

    )
}