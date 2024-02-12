import React, { useState, useEffect } from "react";
import { MainLayout } from "../layout/MainLayout";
import { Grid, Card, Typography, Button, TextField, InputAdornment, IconButton } from '@mui/material';

import MuiAlert from '@mui/material/Alert';

import { DataGrid, gridColumnsTotalWidthSelector } from '@mui/x-data-grid';
import { GridToolbar } from '@mui/x-data-grid-premium';
import { DATAGRID_LOCALE_TEXT } from '../helpers/datagridLocale';
import { InsertarOfertaModal } from '../components/Modals/InsertarOfertaModal';
import { EditarOfertaModal } from '../components/Modals/EditarOfertaModal';
import { insertarBotonesModal } from '../helpers/insertarBotonesModal';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import CancelIcon from '@mui/icons-material/Cancel';

import { ModalLayout, ModalPopup } from "../components/ModalLayout";
import { deleteOfertas, getClientes, getOfertas, postOfertas, putOfertas, getContactos, getProductos, postOfertasProductos, getConfPlantaCliente, getConfNivelesPlantasCliente, getElementosPlanta, postElementosPlanta, postConfNivelesPlantasCliente, getAnalisisNivelesPlantasCliente, postConfPlantaCliente, postAnalisisNivelesPlantasCliente, getTareas, getParametrosAnalisisPlanta, postParametrosAnalisisPlanta, postTareas, getOfertaById } from "../api";
import { useUsuarioActual } from "../hooks/useUsuarioActual";
import { ModalLayout2 } from "../components/ModalLayout2";

import Swal from 'sweetalert2';

const token = {
    headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
    }
};

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

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
        contacto1: '',
        contacto2: '',
        contacto3: '',
        producto: 0,
        descripcionProducto: '',
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

    const [productoSeleccionado, setProductoSeleccionado] = useState({
        id: 0,
        producto: 0,
        descripcionProducto: '',
        precio: 0,
        cantidad: 0,
        consumidos: 0,
        pendientes: 0,
        addDate: null,
        addIdUser: null,
        modDate: null,
        modIdUser: null,
        delDate: null,
        delIdUser: null,
        deleted: null,
    })

    const [FilasSeleccionadas, setFilasSeleccionadas] = useState([]);

    const [ofertaEditar, setOfertaEditar] = useState([]);
    const [OfertaEliminar, setOfertaEliminar] = useState([]);

    const [contactos, setContactos] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [productos, setProductos] = useState([]);
    const [plantas, setPlantas] = useState([]);
    const [parametrosAnalisis, setParametrosAnalisis] = useState([]);
    const [elementosPlanta, setElementosPlanta] = useState([]);
    const [tareas, setTareas] = useState([]);
    const [nivelesPlanta, setNivelesPlanta] = useState([]);
    const [analisisPlanta, setAnalisisPlanta] = useState([]);
    const [clientesTable, setClientesTable] = useState({});

    const [contacto1Editar, setContacto1Editar] = useState([]);
    const [contacto2Editar, setContacto2Editar] = useState([]);
    const [contacto3Editar, setContacto3Editar] = useState([]);

    const [clienteCodigoEditar, setClientesCodigoEditar] = useState([]);
    const [productoEditar, setProductoEditar] = useState([]);

    const [articulos, setArticulos] = useState([]);

    const [data, setData] = useState([]);

    const { usuarioActual } = useUsuarioActual();

    const [errorOferta, setErrorOferta] = useState(false);
    const [errorPedido, setErrorPedido] = useState(false);
    const [errorCodigo, setErrorCodigo] = useState(false);
    const [errorFechaInicio, setErrorFechaInicio] = useState(false);
    const [errorFechaFinal, setErrorFechaFinal] = useState(false);
    const [errorPrecio, setErrorPrecio] = useState(false);

    const [filterText, setFilterText] = useState('');

    const [openModal, setOpenModal] = useState(false);

    const [ofertaNueva, setOfertaNueva] = useState(0);

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
        { headerName: 'Contacto1', field: 'contacto1', width: 200 },
        { headerName: 'Contacto2', field: 'contacto2', width: 200 },
        { headerName: 'Contacto3', field: 'contacto3', width: 200 },
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

    const getCliente = async () => {

        const resp = await getClientes()
        const cliente = Object.entries(resp).map(([key, value]) => (key, value))
        setClientes(cliente);

    }

    useEffect(() => {
        getOferta();
        getCliente();
        getContactos()
            .then(contactos => {
                setContactos(contactos);
            })
        getProductos()
            .then(productos => {
                setProductos(productos);
            })

        getConfPlantaCliente()
            .then(planta => {
                setPlantas(planta);
            })

        getConfNivelesPlantasCliente()
            .then(nivel => {
                setNivelesPlanta(nivel);
            })

        getElementosPlanta()
            .then(elemento => {
                setElementosPlanta(elemento);
            })

        getAnalisisNivelesPlantasCliente()
            .then(analisi => {
                setAnalisisPlanta(analisi);
            })

        getTareas()
            .then(tarea => {
                setTareas(tarea);
            })

        getParametrosAnalisisPlanta()
            .then(parametro => {
                setParametrosAnalisis(parametro);
            })

    }, [])

    useEffect(() => {
        if (data.length > 0) {
            setRows(data);
        }
    }, [data]);

    useEffect(() => {

        const lookupClientes = {};
        clientes.map(fila => lookupClientes[fila.id] = fila.codigo);
        setClientesTable(lookupClientes);

    }, [clientes])

    useEffect(() => {

        const nombre = clientes.filter(cliente => cliente.codigo === ofertaSeleccionada.codigoCliente);
        (nombre.length > 0) && setOfertaSeleccionada({
            ...ofertaSeleccionada,
            nombreCliente: nombre[0].razonSocial
        })

    }, [ofertaSeleccionada.codigoCliente])

    const peticionPost = async () => {

        if (ofertaSeleccionada.numeroOferta != 0) {
            setErrorOferta(false)
        } else {
            setErrorOferta(true)
        }

        if (ofertaSeleccionada.pedido != 0) {
            setErrorPedido(false)
        } else {
            setErrorPedido(true)
        }

        if (ofertaSeleccionada.codigoCliente != 0) {
            setErrorCodigo(false)
        } else {
            setErrorCodigo(true)
        }

        if (ofertaSeleccionada.fechaInicio != null) {
            setErrorFechaInicio(false)
        } else {
            setErrorFechaInicio(true)
        }

        if (ofertaSeleccionada.fechaFinalizacion != null && ofertaSeleccionada.fechaFinalizacion > ofertaSeleccionada.fechaInicio) {
            setErrorFechaFinal(false)
        } else {
            setErrorFechaFinal(true)
        }

        if (ofertaSeleccionada.numeroOferta != 0 && ofertaSeleccionada.pedido != 0 && ofertaSeleccionada.codigoCliente != 0 && ofertaSeleccionada.fechaInicio != null && ofertaSeleccionada.fechaFinalizacion != null && ofertaSeleccionada.fechaFinalizacion > ofertaSeleccionada.fechaInicio) {
            ofertaSeleccionada.id = 0;

            productoSeleccionado.oferta = ofertaSeleccionada.numeroOferta
            productoSeleccionado.codigoCliente = ofertaSeleccionada.codigoCliente
            productoSeleccionado.producto = ofertaSeleccionada.producto
            productoSeleccionado.precio = ofertaSeleccionada.precio
            productoSeleccionado.cantidad = ofertaSeleccionada.unidades
            productoSeleccionado.descripcionProducto = ofertaSeleccionada.descripcionProducto

            const resp = await postOfertas(ofertaSeleccionada);

            await postOfertasProductos(productoSeleccionado)

            abrirCerrarModalInsertar();
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
            })

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

        }
    }

    const peticionPut = async () => {

        if (ofertaSeleccionada.numeroOferta != 0) {
            setErrorOferta(false)
        } else {
            setErrorOferta(true)
        }

        if (ofertaSeleccionada.pedido != 0) {
            setErrorPedido(false)
        } else {
            setErrorPedido(true)
        }

        if (ofertaSeleccionada.codigoCliente != 0) {
            setErrorCodigo(false)
        } else {
            setErrorCodigo(true)
        }

        if (ofertaSeleccionada.fechaInicio != null) {
            setErrorFechaInicio(false)
        } else {
            setErrorFechaInicio(true)
        }

        if (ofertaSeleccionada.fechaFinalizacion != null && ofertaSeleccionada.fechaFinalizacion > ofertaSeleccionada.fechaInicio) {
            setErrorFechaFinal(false)
        } else {
            setErrorFechaFinal(true)
        }

        if (ofertaSeleccionada.numeroOferta != 0 && ofertaSeleccionada.pedido != 0 && ofertaSeleccionada.codigoCliente != 0 && ofertaSeleccionada.fechaInicio != null && ofertaSeleccionada.fechaFinalizacion != null && ofertaSeleccionada.fechaFinalizacion > ofertaSeleccionada.fechaInicio) {

            const decimalRegex = /^-?\d+(\,\d{1,2})?|\.\d{1,2}$/;
            if (decimalRegex.test(ofertaSeleccionada.precio)) {
                const normalizedValue = normalizeDecimal(ofertaSeleccionada.precio);
                const decimalSeparator = normalizedValue.includes(',') ? ',' : '.';
                const decimalPart = normalizedValue.split(decimalSeparator)[1] || '';
                if (decimalPart.length > 2) {
                    setErrorPrecio(true);
                } else {
                    setErrorPrecio(false);
                    ofertaSeleccionada.precio = Number(normalizedValue.replace(',', '.')) || 0
                    const resp = await putOfertas(ofertaSeleccionada);

                    var ofertaModificada = data;
                    ofertaModificada.map(oferta => {
                        if (oferta.id === ofertaSeleccionada.id) {
                            oferta = ofertaSeleccionada
                        }
                    });
                    getOferta();
                    abrirCerrarModalEditar();
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
                }
            }
        }
    }

    const peticionDelete = async () => {

        var i = 0;
        while (i < OfertaEliminar.length) {

            const resp = await getOfertaById(OfertaEliminar[i]);
            resp.deleted = true;

            await putOfertas(resp)

            //const resp = await deleteOfertas(OfertaEliminar[i]);

            getOferta();
            abrirCerrarModalEliminar();
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

        Swal.fire({
            position: 'center',
            icon: 'info',
            title: 'Oferta Eliminada',
            text: `La oferta se ha eliminado correctamente`,
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

        const nivelesOferta = nivelesPlanta.filter(nivel => nivel.oferta === ofertaSeleccionada.numeroOferta)

        const plantaOferta = plantas.filter(planta => planta.oferta === ofertaSeleccionada.numeroOferta)

        const plantaClonada = { ...plantaOferta[0] };

        plantaClonada.id = 0;
        plantaClonada.oferta = oferta;

        const respPlanta = await postConfPlantaCliente(plantaClonada);

        nivelesOferta.map(async (nivel) => {

            const elementosOferta = elementosPlanta.filter(elem => elem.id === nivel.id_Elemento)

            const elementosClonados = { ...elementosOferta[0] };

            elementosClonados.id = 0;
            elementosClonados.oferta = oferta;

            const resp = await postElementosPlanta(elementosClonados);

            const nivelClonado = { ...nivel }

            nivelClonado.id = 0;
            nivelClonado.oferta = oferta;
            nivelClonado.id_Elemento = resp.id;
            nivelClonado.id_Planta = respPlanta.id

            const respNiveles = await postConfNivelesPlantasCliente(nivelClonado)

            const analisisOferta = analisisPlanta.filter(anal => anal.id_NivelesPlanta === nivel.id)

            const analisisClonados = [...analisisOferta];

            analisisClonados.map(async (anal) => {

                anal.id = 0
                anal.id_NivelesPlanta = respNiveles.id
                await postAnalisisNivelesPlantasCliente(anal)

            })

            const tareasPorElemento = parametrosAnalisis.filter(parametro => parametro.elemento === nivel.id_Elemento);
            const tareasPorElementoClonados = [...tareasPorElemento];

            tareasPorElementoClonados.map(async (tarea) => {

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
                tarea.elemento = resp.id;
                tarea.cancelado = false;
                tarea.facturado = false;
                tarea.fechaPdf = null;
                tarea.fechaRealizado = null;
                tarea.fechaRecogido = null;
                tarea.numeroFacturado = "";
                tarea.observaciones = "";
                tarea.operario = null;
                tarea.pdf = 0;
                tarea.realizado = false;
                tarea.recibido = false;
                tarea.recogido = false;
                tarea.resultado = "";
                await postParametrosAnalisisPlanta(tarea)
            })

            const tareasAnalisis = tareas.filter(tarea => tarea.elemento === nivel.id_Elemento);
            const tareasAnalisisClonados = [...tareasAnalisis];

            tareasAnalisisClonados.map(async (analisi) => {

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
                analisi.elemento = resp.id;
                analisi.operario = null;
                analisi.observaciones = "";
                analisi.pdf = null;

                await postTareas(analisi)
            })

        })

        const ofertaClonada = { ...ofertaSeleccionada };

        // Sumar un año a la propiedad fechaInicio
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

        // Establecer el id en 0
        ofertaClonada.id = 0;
        ofertaClonada.numeroOferta = oferta;
        await postOfertas(ofertaClonada)

        getOferta();
        handleCloseModal()
        abrirCerrarModalEditar();
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

    }

    const handleChange = e => {
        const { name, value } = e.target;
        setOfertaSeleccionada(prevState => ({
            ...prevState,
            [e.target.name]: e.target.type === 'number' ? parseInt(e.target.value) : e.target.value
        }));
    }

    const handleChangeDecimal = (event) => {
        const { name, value } = event.target;
        const decimalRegex = /^-?\d+(\,\d{1,2})?|\.\d{1,2}$/;
        if (decimalRegex.test(value)) {
            const normalizedValue = normalizeDecimal(value);
            const decimalSeparator = normalizedValue.includes(',') ? ',' : '.';
            const decimalPart = normalizedValue.split(decimalSeparator)[1] || '';
            if (decimalPart.length > 2) {
                setErrorPrecio(true);
            } else {
                setErrorPrecio(false);
                setOfertaSeleccionada(prevState => ({
                    ...prevState,
                    precio: Number(normalizedValue.replace(',', '.')) || 0
                }));
            }
        }
    };

    const handleChangeFecha = e => {
        const { name, value } = e.target;
        setOfertaSeleccionada(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleChangePrecio = e => {
        const { name, value } = e.target;
        setOfertaSeleccionada(prevState => ({
            ...prevState,
            [e.target.name]: e.target.name === 'price' ? parseFloat(e.target.value) : e.target.value
        }));
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
                usuarioActual.idPerfil === 1 ?
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
                                            setContacto1Editar(contactos.filter(contacto => contacto.nombre === ofertaSeleccionada.row.contacto1))
                                            setContacto2Editar(contactos.filter(contacto => contacto.nombre === ofertaSeleccionada.row.contacto2))
                                            setContacto3Editar(contactos.filter(contacto => contacto.nombre === ofertaSeleccionada.row.contacto3))
                                            setProductoEditar(productos.filter(producto => producto.id === ofertaSeleccionada.row.producto))
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
                                        handleChangeDecimal={handleChangeDecimal}
                                        errorCodigo={errorCodigo}
                                        errorFechaFinal={errorFechaFinal}
                                        errorFechaInicio={errorFechaInicio}
                                        errorOferta={errorOferta}
                                        errorPedido={errorPedido}
                                        errorPrecio={errorPrecio}
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
                                    change={handleChange}
                                    codigoClienteEditar={clienteCodigoEditar}
                                    contacto1Editar={contacto1Editar}
                                    contacto2Editar={contacto2Editar}
                                    contacto3Editar={contacto3Editar}
                                    productoEditar={productoEditar}
                                    errorCodigo={errorCodigo}
                                    errorFechaFinal={errorFechaFinal}
                                    errorFechaInicio={errorFechaInicio}
                                    errorOferta={errorOferta}
                                    errorPedido={errorPedido}
                                    errorPrecio={errorPrecio}
                                />}
                            botones={[
                                insertarBotonesModal(<CancelIcon />, 'Clonar Oferta', () => handleClonOferta()),
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
                                <>
                                    <Grid item xs={12}>
                                        <Typography>Estás seguro que deseas eliminar la oferta?</Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography><b>{ofertaSeleccionada.numeroOferta}</b></Typography>
                                    </Grid>
                                </>
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
                            titulo="Nuevo numero de oferta"
                            contenido={
                                <Grid item xs={12}>
                                    <Grid container sx={{ textAlign: 'center', pb: 2 }}>
                                        <Grid item xs={4}>
                                            <TextField
                                                sx={{ width: '100%' }}
                                                type="number"
                                                name="ofertaNueva"
                                                onChange={handleChangeOferta}
                                            />
                                        </Grid>
                                    </Grid>

                                </Grid>
                            }
                            botones={[insertarBotonesModal(<AddIcon />, 'Clonar', async () => {
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
                                        //components={{ Toolbar: GridToolbar }}
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
                                            setContacto1Editar(contactos.filter(contacto => contacto.nombre === ofertaSeleccionada.row.contacto1))
                                            setContacto2Editar(contactos.filter(contacto => contacto.nombre === ofertaSeleccionada.row.contacto2))
                                            setContacto3Editar(contactos.filter(contacto => contacto.nombre === ofertaSeleccionada.row.contacto3))
                                            setProductoEditar(productos.filter(producto => producto.id === ofertaSeleccionada.row.producto))
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
                                    contacto1Editar={contacto1Editar}
                                    contacto2Editar={contacto2Editar}
                                    contacto3Editar={contacto3Editar}
                                    productoEditar={productoEditar}
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