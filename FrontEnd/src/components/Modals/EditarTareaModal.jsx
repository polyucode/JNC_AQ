import React, { useState, useEffect, useContext } from 'react';
import { Grid, Card, Typography, Button, TextField, Autocomplete, IconButton } from '@mui/material';

import MuiAlert from '@mui/material/Alert';

import { DataGrid } from '@mui/x-data-grid';
import { DATAGRID_LOCALE_TEXT } from '../../helpers/datagridLocale';
import { insertarBotonesModal } from '../../helpers/insertarBotonesModal';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

import { ModalLayout } from "../ModalLayout";
import { InsertarDetalleModal } from './InsertarDetalleModal';
import { EditarDetalleModal } from './EditarDetalleModal';
import {
    postParametrosAnalisisPlanta, putParametrosAnalisisPlantaPorId, getAnalisis,
    getClientes, getOfertas, getParametrosAnalisisPlanta, getUsuarios, getElementosPlanta, getParametrosAnalisisById, putParametrosAnalisisPlanta,
    getArchivosByIdTarea,
    getArchivosById,
    deleteArchivo,
    getFicheros
} from '../../api';
import Swal from 'sweetalert2';
import { ObservacionesElementos } from '../ObservacionesElementos/ObservacionesElementos';
import { AuthContext } from '../../context/AuthContext';
import { ModalLayout2 } from '../ModalLayout2';
import { getFiles } from '../../api/files';

import ClearIcon from '@mui/icons-material/Clear';

import '../../pages/Tareas.css';
import { ComentariosElementosNoFQ } from '../ComentariosElementos/ComentariosElementosNoFQ';

const tipos = [
    { id: 1, nombre: "Mensual" },
    { id: 2, nombre: "Bimensual" },
    { id: 3, nombre: "Trimestral" },
    { id: 4, nombre: "Semestral" },
    { id: 5, nombre: "Anual" }
]

export const EditarTareaModal = ({ handleChange, autocompleteChange, tareaSeleccionada, handleChangeFecha, setTareaSeleccionada, handleChangeAnalisis, estadoProtocolo, estadoOperario, codigoClienteEditar, tecnicoTareaEditar, tipoTareaEditar, pdfEditar, elementosAutocomplete, analisisAutocomplete, elementoTareaEditar, analisisEditar, errorFecha, handlePdf, fileChange, tareasNuevas, files, archivos, setArchivos, observaciones, setObservaciones, observacion, setObservacion, observacionEditar, setObservacionEditar }) => {


    const [modalInsertar, setModalInsertar] = useState(false);

    const [modalEditar, setModalEditar] = useState(false);

    const [modalEliminar, setModalEliminar] = useState(false);

    const [openModalEliminar, setOpenModalEliminar] = useState(false);

    const [rowsIds, setRowsIds] = useState([]);

    const [data, setData] = useState([]);
    const [dataRealizados, setDataRealizados] = useState([]);

    const [AnalisisEliminar, setAnalisisEliminar] = useState([]);

    const [inputCodigoCliente, setInputCodigoCliente] = useState('');
    const [inputNombreCliente, setInputNombreCliente] = useState('');
    const [operarioEditar, setOperarioEditar] = useState([]);

    const [analisisSeleccionado, setAnalisisSeleccionado] = useState({
        id: 0,
        codigoCliente: 0,
        nombreCliente: '',
        oferta: 0,
        pedido: 0,
        elemento: 0,
        nombreElemento: '',
        periodo: '',
        analisis: 0,
        fecha: null,
        recogido: false,
        fechaRecogido: null,
        realizado: false,
        fechaRealizado: null,
        observaciones: '',
        pdf: 0,
        recibido: false,
        fechaPdf: null,
        resultado: '',
        facturado: false,
        numeroFacturado: '',
        operario: 0,
        cancelado: false,
        comentarios: '',
        addDate: null,
        addIdUser: null,
        modDate: null,
        modIdUser: null,
        delDate: null,
        delIdUser: null,
        deleted: null,
    });

    // Declaramos variables necesarias
    const [clientes, setClientes] = useState([]);
    const [ofertas, setOfertas] = useState([]);
    const [elementos, setElementos] = useState([]);
    const [analisis, setAnalisis] = useState([]);
    const [operarios, setOperarios] = useState([]);
    const [ficheros, setFicheros] = useState([]);
    const [filesPdf, setFilesPdf] = useState([]);

    const [archivoEliminar, setArchivoEliminar] = useState([]);

    const columns = [
        //visibles
        { headerName: 'Periodo', field: 'periodo', width: 150 },
        {
            headerName: 'Fecha',
            field: 'fecha',
            width: 150,
            valueFormatter: (params) => {
                const date = new Date(params.value);
                return date.toLocaleDateString();
            }
        },
        { headerName: 'Recogido', field: 'recogido', type: 'boolean', width: 100 },
        {
            headerName: 'Fecha Recogido',
            field: 'fechaRecogido',
            width: 150,
            valueFormatter: (params) => {
                if (params.value != null) {
                    const date = new Date(params.value);
                    return date.toLocaleDateString();
                } else {
                    const date = "";
                    return date;
                }
            }
        },
        { headerName: 'Realizado/Entregado', field: 'realizado', type: 'boolean', width: 200 },
        {
            headerName: 'Fecha Realizado',
            field: 'fechaRealizado',
            width: 150,
            valueFormatter: (params) => {
                if (params.value != null) {
                    const date = new Date(params.value);
                    return date.toLocaleDateString();
                } else {
                    const date = "";
                    return date;
                }
            }
        },
        { headerName: 'Facturado', field: 'facturado', type: 'boolean', width: 100 },
        { headerName: 'Numero Factura', field: 'numeroFacturado', width: 150 },
        {
            headerName: 'Operario',
            field: 'operario',
            width: 300,
            valueFormatter: (params) => {
                const oper = operarios.find((operario) => operario.id === params.value);
                return oper ? oper.nombre + ' ' + oper.apellidos : '';
            }
        },
        {
            headerName: 'PDF',
            field: 'pdf',
            width: 700,
            valueFormatter: (params) => {
                const fich = ficheros.find((fichero) => fichero.id === params.value)
                return fich ? fich.name : '';
            }
        },
        { headerName: 'PDF Recibido', field: 'recibido', type: 'boolean', width: 100 },
        {
            headerName: 'Fecha PDF',
            field: 'fechaPdf',
            width: 150,
            valueFormatter: (params) => {
                if (params.value != null) {
                    const date = new Date(params.value);
                    return date.toLocaleDateString();
                } else {
                    const date = "";
                    return date;
                }
            }
        },
        { headerName: 'Cancelado', field: 'cancelado', type: 'boolean', width: 100 }
    ];

    const { user } = useContext(AuthContext);

    const peticionGet = async () => {

        const resp = await getParametrosAnalisisPlanta();
        setData(resp.filter(analisi => analisi.codigoCliente === tareaSeleccionada.codigoCliente && analisi.oferta === tareaSeleccionada.oferta && analisi.elemento === tareaSeleccionada.elemento && analisi.analisis === tareaSeleccionada.analisis && !analisi.deleted));
        setDataRealizados(resp.filter(analisi => analisi.codigoCliente === tareaSeleccionada.codigoCliente && analisi.oferta === tareaSeleccionada.oferta && analisi.elemento === tareaSeleccionada.elemento && analisi.analisis === tareaSeleccionada.analisis && analisi.realizado === true && !analisi.deleted))
    }

    const GetFichero = async () => {

        const resp = await getFicheros();
        const ficherosFiltrados = resp.filter(fichero => !fichero.deleted)
        setFicheros(ficherosFiltrados);
    }

    useEffect(() => {

        getClientes()
            .then(resp => setClientes(resp.filter(cliente => !cliente.deleted)));

        getOfertas()
            .then(resp => setOfertas(resp.filter(oferta => !oferta.deleted)));

        getElementosPlanta()
            .then(resp => setElementos(resp.filter(el => !el.deleted)));

        getAnalisis()
            .then(resp => setAnalisis(resp.filter(an => !an.deleted)));

        getUsuarios()
            .then(resp => setOperarios(resp.filter(op => !op.deleted)));

        peticionGet();

        GetFichero();

    }, []);

    useEffect(() => {

        getFiles()
            .then(resp => setFilesPdf(resp.filter(arch => !arch.deleted)));

    }, [archivos])

    useEffect(() => {
        if (tareasNuevas.length > 0) {
            setData(tareasNuevas)
        }
    }, [tareasNuevas])

    const peticionGetArchivos = async () => {
        try {
            const res = await getArchivosByIdTarea(tareaSeleccionada.id);
            const sortedRes = res.sort((a, b) => a.idFile - b.idFile); // Ordenar por idFile
            setArchivos(sortedRes);
        } catch (error) {
            console.error('Error fetching archivos:', error);
        }
    }

    function formateandofechas(fecha) {
        if (fecha !== null) {
            const fecha1 = new Date(fecha)

            const fecha2 = fecha1.getFullYear() +
                '-' + String(fecha1.getMonth() + 1).padStart(2, '0') +
                '-' + String(fecha1.getDate()).padStart(2, '0')

            return fecha2
        } else {
            return null
        }
    }

    const handleChangeDet = e => {
        setAnalisisSeleccionado(prevState => ({
            ...prevState,
            [e.target.name]: e.target.type === 'number' ? parseInt(e.target.value) : e.target.value
        }));
    }

    const handleChangeDetFecha = e => {
        const { name, value } = e.target;
        setAnalisisSeleccionado(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleChangeCheckbox = e => {
        const { name, checked } = e.target
        setAnalisisSeleccionado(prevState => ({
            ...prevState,
            [name]: checked
        }))
    }

    const handleDelete = async (id) => {
        setOpenModalEliminar(true)
        const resp = await getArchivosById(id)
        setArchivoEliminar(prev => ({ ...prev, ...resp }))
    }

    const handleCloseModalEliminar = () => {
        setOpenModalEliminar(false);
    };

    //modal insertar detalle
    const abrirCerrarModalInsertar = () => {
        if (modalInsertar) {
            setAnalisisSeleccionado({
                id: 0,
                codigoCliente: 0,
                nombreCliente: '',
                oferta: 0,
                pedido: 0,
                elemento: 0,
                periodo: '',
                analisis: 0,
                fecha: null,
                recogido: false,
                fechaRecogido: null,
                realizado: false,
                fechaRealizado: null,
                operario: 0,
                protocolo: '',
                observaciones: '',
                facturado: false,
                numeroFacturado: '',
                cancelado: false,
                comentarios: '',
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

    //modal editar detalle

    const abrirCerrarModalEditar = () => {
        if (modalEditar) {
            setAnalisisSeleccionado({
                id: 0,
                codigoCliente: 0,
                nombreCliente: '',
                oferta: 0,
                pedido: 0,
                elemento: 0,
                periodo: '',
                analisis: 0,
                fecha: null,
                recogido: false,
                fechaRecogido: null,
                realizado: false,
                fechaRealizado: null,
                operario: 0,
                protocolo: '',
                observaciones: '',
                facturado: false,
                numeroFacturado: '',
                cancelado: false,
                comentarios: '',
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

    // modal eliminar detalle
    const abrirCerrarModalEliminar = () => {
        if (modalEliminar) {
            setAnalisisSeleccionado({
                id: 0,
                codigoCliente: 0,
                nombreCliente: '',
                oferta: 0,
                pedido: 0,
                elemento: 0,
                periodo: '',
                analisis: 0,
                fecha: null,
                recogido: false,
                fechaRecogido: null,
                realizado: false,
                fechaRealizado: null,
                operario: 0,
                protocolo: '',
                observaciones: '',
                facturado: false,
                numeroFacturado: '',
                cancelado: false,
                comentarios: '',
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

    const peticionPost = async () => {
        analisisSeleccionado.id = 0;
        analisisSeleccionado.codigoCliente = tareaSeleccionada.codigoCliente;
        analisisSeleccionado.nombreCliente = tareaSeleccionada.nombreCliente;
        analisisSeleccionado.oferta = tareaSeleccionada.oferta;
        analisisSeleccionado.analisis = tareaSeleccionada.analisis;
        analisisSeleccionado.pedido = tareaSeleccionada.pedido;
        analisisSeleccionado.elemento = tareaSeleccionada.elemento;
        analisisSeleccionado.operario = tareaSeleccionada.operario;
        if (analisisSeleccionado.nombreElemento !== null || analisisSeleccionado.nombreElemento !== "") {
            analisisSeleccionado.nombreElemento = elementoTareaEditar[0].descripcion !== null ? elementoTareaEditar[0].nombre + " " + elementoTareaEditar[0].descripcion : elementoTareaEditar[0].nombre + " " + elementoTareaEditar[0].numero;
        }

        await postParametrosAnalisisPlanta(analisisSeleccionado);

        peticionGet();

        Swal.fire({
            position: 'center',
            icon: 'info',
            title: 'Tarea Creada',
            text: `La tarea se ha creado correctamente`,
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

    const peticionPut = async () => {

        await putParametrosAnalisisPlantaPorId(analisisSeleccionado);

        var analisisModificado = data;
        analisisModificado.map(analisis => {
            if (analisis.id === analisisSeleccionado.id) {
                analisis = analisisSeleccionado
            }
        });

        peticionGet();

        Swal.fire({
            position: 'center',
            icon: 'info',
            title: 'Tarea Editada',
            text: `La tarea se ha editado correctamente`,
            showConfirmButton: false,
            timer: 2000,
            showClass: {
                popup: 'animate__animated animate__bounceIn'
            },
            hideClass: {
                popup: 'animate__animated animate__bounceOut'
            }
        })

    }

    const peticionDelete = async () => {

        var i = 0;
        while (i < AnalisisEliminar.length) {

            const resp = await getParametrosAnalisisById(AnalisisEliminar[i]);
            resp.deleted = true;

            await putParametrosAnalisisPlanta(resp)

            peticionGet();
            abrirCerrarModalEliminar();
            setAnalisisSeleccionado({
                id: 0,
                codigoCliente: 0,
                nombreCliente: '',
                oferta: 0,
                pedido: 0,
                elemento: 0,
                periodo: '',
                analisis: 0,
                fecha: null,
                recogido: false,
                fechaRecogido: null,
                realizado: false,
                fechaRealizado: null,
                operario: 0,
                observaciones: '',
                facturado: false,
                numeroFacturado: '',
                cancelado: false,
                comentarios: '',
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
            title: 'Tarea Eliminada',
            text: `La tarea se ha eliminado correctamente`,
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

    const peticionDeleteArchivo = async () => {

        await deleteArchivo(archivoEliminar.id)

        peticionGetArchivos()
        handleCloseModalEliminar()

        Swal.fire({
            position: 'center',
            icon: 'info',
            title: 'Archivo Eliminado',
            text: `El archivo se ha eliminado correctamente`,
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

    const handleSelectRow = (ids) => {

        if (ids.length > 0) {
            setAnalisisSeleccionado(data.filter(analisis => analisis.id === ids[0])[0]);
        } else {
            setAnalisisSeleccionado(analisisSeleccionado);
        }

        setRowsIds(ids);

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

    return (
        <>
            <Grid item xs={3} md={3}>
                <Autocomplete
                    disableClearable={true}
                    id="CboClientes"
                    options={clientes}
                    filterOptions={options => clientes.filter((cliente) => filtrarCodigoCliente(cliente))}
                    getOptionLabel={option => option.codigo.toString()}
                    defaultValue={codigoClienteEditar[0]}
                    sx={{ width: '100%' }}
                    onInputChange={(event, newInputValue) => {
                        setInputCodigoCliente(newInputValue);
                    }}
                    renderInput={(params) => <TextField {...params} label="Codigo Cliente" name="codigoCliente" />}
                    onChange={(event, value) => setTareaSeleccionada(prevState => ({
                        ...prevState,
                        codigoCliente: value ? parseInt(value.codigo) : null,
                        nombreCliente: value ? value.razonSocial : null,
                        oferta: '',
                        pedido: '',
                        elemento: 0,
                        nombreElemento: '',
                        analisis: 0,
                        nombreAnalisis: '',
                    }))}
                />
            </Grid>

            <Grid item xs={3} md={4}>
                <Autocomplete
                    disableClearable={true}
                    id="nombreCliente"
                    options={clientes}
                    value={clientes.find(cliente => cliente.razonSocial === tareaSeleccionada.nombreCliente) || null}
                    filterOptions={options => clientes.filter((cliente) => filtrarNombreCliente(cliente))}
                    onInputChange={(event, newInputValue) => {
                        setInputNombreCliente(newInputValue);
                    }}
                    getOptionLabel={option => option.razonSocial}
                    sx={{ width: '100%' }}
                    renderInput={(params) => <TextField {...params} label="Nombre Cliente" name="nombreCliente" />}
                    onChange={(event, value) => setTareaSeleccionada(prevState => ({
                        ...prevState,
                        codigoCliente: value ? parseInt(value.codigo) : null,
                        nombreCliente: value ? value.razonSocial : null,
                        oferta: '',
                        pedido: '',
                        elemento: 0,
                        nombreElemento: '',
                        analisis: 0,
                        nombreAnalisis: '',
                    }))}
                />
            </Grid>

            <Grid item xs={6} md={3}>
                <Autocomplete
                    disableClearable={true}
                    sx={{ width: '100%' }}
                    id="Oferta"
                    inputValue={tareaSeleccionada.oferta.toString()}
                    options={ofertas}
                    filterOptions={options => ofertas.filter(oferta => oferta.codigoCliente === tareaSeleccionada.codigoCliente && !oferta.deleted)}
                    getOptionLabel={option => option.numeroOferta.toString()}
                    renderInput={(params) => <TextField {...params} label="Oferta" name="oferta" />}
                    onChange={(event, value) => setTareaSeleccionada(prevState => ({
                        ...prevState,
                        codigoCliente: value ? parseInt(value.codigoCliente) : null,
                        nombreCliente: value ? value.nombreCliente : null,
                        oferta: value ? parseInt(value.numeroOferta) : null,
                        pedido: value ? value.pedido : null,
                        elemento: 0,
                        nombreElemento: '',
                        analisis: 0,
                        nombreAnalisis: '',
                    }))}
                />
            </Grid>

            <Grid item xs={6} md={3}>
                <TextField
                    id='pedido'
                    sx={{ width: '100%' }}
                    label="Pedido"
                    value={tareaSeleccionada && tareaSeleccionada.pedido}
                    name="pedido"
                    onChange={handleChange}
                />
            </Grid>

            <Grid item xs={8} md={4}>
                <Autocomplete
                    disableClearable={true}
                    id="CboElementosPlanta"
                    inputValue={tareaSeleccionada.nombreElemento}
                    defaultValue={elementoTareaEditar[0]}
                    options={elementosAutocomplete}
                    getOptionLabel={option => option.descripcion !== null ? (option.nombre + ' ' + option.descripcion) : (option.nombre + ' ' + option.numero)}
                    sx={{ width: '100%' }}
                    renderInput={(params) => <TextField {...params} label="Elemento" name="elemento" />}
                    onChange={(event, value) => setTareaSeleccionada(prevState => ({
                        ...prevState,
                        elemento: value.id
                    }))}
                />
            </Grid>

            <Grid item xs={4} md={5}>
                <Autocomplete
                    disableClearable={true}
                    id="analisis"
                    options={analisisAutocomplete}
                    defaultValue={analisisEditar[0]}
                    getOptionLabel={option => option.nombre.toString()}
                    sx={{ width: '100%' }}
                    renderInput={(params) => <TextField {...params} label="Analisis" name="analisis" />}
                    onChange={handleChangeAnalisis}
                />
            </Grid>

            <Grid item xs={6} md={4}>
                <Autocomplete
                    disableClearable={true}
                    sx={{ width: '100%' }}
                    id="Operarios"
                    options={operarios}
                    defaultValue={tecnicoTareaEditar[0]}
                    filterOptions={options => operarios.filter(cliente => cliente.idPerfil === 1004)}
                    getOptionLabel={option => option.nombre + ' ' + option.apellidos}
                    renderInput={(params) => <TextField {...params} label="Operario" name="operario" />}
                    onChange={(event, value) => setTareaSeleccionada(prevState => ({
                        ...prevState,
                        operario: value.id
                    }))}
                />
            </Grid>


            <Grid item xs={12} md={1} style={{ display: 'flex' }}>
                <p> Fecha </p>
            </Grid>
            <Grid item xs={4} md={3} style={{ display: 'flex' }}>
                <TextField
                    id="fecha"
                    type="date"
                    name="fecha"
                    sx={{ width: '100%', marginTop: '22px' }}
                    onChange={handleChangeFecha}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    error={errorFecha}
                    helperText={errorFecha ? 'Introduzca una fecha' : ' '}
                    value={tareaSeleccionada && formateandofechas(tareaSeleccionada.fecha)}
                />
            </Grid>

            {
                dataRealizados.length > 0 ?
                    <Grid item xs={4} md={3}>
                        <Autocomplete
                            disabled
                            disableClearable={true}
                            id="CboTipos"
                            options={tipos}
                            defaultValue={tipoTareaEditar[0]}
                            getOptionLabel={option => option.nombre.toString()}
                            sx={{ width: '100%' }}
                            renderInput={(params) => <TextField {...params} label="Periodicidad" name="tipo" />}
                            onChange={(event, value) => setTareaSeleccionada(prevState => ({
                                ...prevState,
                                tipo: value.id
                            }))}
                        />
                    </Grid>
                    :
                    <Grid item xs={4} md={3}>
                        <Autocomplete
                            disableClearable={true}
                            id="CboTipos"
                            options={tipos}
                            defaultValue={tipoTareaEditar[0]}
                            getOptionLabel={option => option.nombre.toString()}
                            sx={{ width: '100%' }}
                            renderInput={(params) => <TextField {...params} label="Periodicidad" name="tipo" />}
                            onChange={(event, value) => setTareaSeleccionada(prevState => ({
                                ...prevState,
                                tipo: value.id
                            }))}
                        />
                    </Grid>
            }

            <Grid item xs={12} md={12}>
                <div>
                    <ObservacionesElementos
                        idElemento={elementoTareaEditar[0].id}
                        observaciones={observaciones}
                        setObservaciones={setObservaciones}
                        observacion={observacion}
                        setObservacion={setObservacion}
                        observacionEditar={observacionEditar}
                        setObservacionEditar={setObservacionEditar}
                    >
                    </ObservacionesElementos>
                    <br />
                    <ComentariosElementosNoFQ
                        idElemento={elementoTareaEditar[0].id}>
                    </ComentariosElementosNoFQ>
                </div>

            </Grid>


            <Grid item xs={4} md={3}>
                <div className="file-select" id="src-file3" >
                    <input type="file" name="src-file3" label="PDF instrucciones" onChange={handlePdf} multiple />
                </div>
                <Typography className='src-file'>
                    {files.length > 0 ? Array.from(files).map(file => file.name).join(', ') : "Seleccionar un archivo"}
                    {/* {fileChange ? fileChange.name : "Seleccionar un archivo"}  */}
                </Typography>
            </Grid>

            {user.idPerfil !== 1004 ?
                (
                    archivos.map((archivo) => {

                        const nombreArchivo = filesPdf.filter(file => file.id === archivo.idFile)[0]

                        return (
                            <Grid item xs={3} md={3} key={archivo.id}>
                                <div className="file-container" style={{ position: 'relative', padding: '10px', borderRadius: '4px' }}>
                                    <IconButton
                                        size="small"
                                        className="delete-button"
                                        style={{ position: 'absolute', top: '0px', right: '4px' }}
                                        onClick={() => handleDelete(archivo.id)}
                                    >
                                        <ClearIcon fontSize="small" style={{ color: 'red' }} />
                                    </IconButton>
                                    <Typography className="file-name" style={{ color: 'red', marginTop: '7px' }}>
                                        {nombreArchivo ? `${nombreArchivo.name}.${nombreArchivo.format}` : ""}
                                    </Typography>
                                </div>
                            </Grid>
                        )
                    })
                ) :
                (
                    archivos.map((archivo) => {

                        const nombreArchivo = filesPdf.filter(file => file.id === archivo.idFile)[0]

                        return (
                            <Grid item xs={3} md={3} key={archivo.id}>
                                <div className="file-container" style={{ position: 'relative', padding: '10px', borderRadius: '4px' }}>
                                    <Typography className="file-name" style={{ color: 'red', marginTop: '7px' }}>
                                        {nombreArchivo ? `${nombreArchivo.name}.${nombreArchivo.format}` : ""}
                                    </Typography>
                                </div>
                            </Grid>
                        )
                    })
                )
            }



            <br />

            {
                user.idPerfil === 1 ?
                    <>
                        <Grid container spacing={2}>

                            <Grid item xs={12}>
                                <Card sx={{ p: 4, display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                                    <Typography variant='h6'>Detalles de la tarea</Typography>
                                    {
                                        (rowsIds.length > 0) ?
                                            (
                                                <Grid item>
                                                    <Button
                                                        sx={{ mr: 2 }}
                                                        color='error'
                                                        variant='contained'
                                                        startIcon={<DeleteIcon />}
                                                        onClick={(event, rowData) => {
                                                            setAnalisisEliminar(rowsIds)
                                                            abrirCerrarModalEliminar()
                                                        }}
                                                    >
                                                        Eliminar
                                                    </Button>
                                                </Grid>
                                            ) : (
                                                <Button
                                                    color='success'
                                                    variant='contained'
                                                    startIcon={<AddIcon />}
                                                    onClick={abrirCerrarModalInsertar}
                                                >Añadir</Button>
                                            )
                                    }
                                </Card>
                            </Grid>

                            <Grid item xs={12}>
                                <Card>
                                    <DataGrid
                                        localeText={DATAGRID_LOCALE_TEXT}
                                        sx={{
                                            width: '100%',
                                            height: 700,
                                            backgroundColor: '#FFFFFF'
                                        }}
                                        rows={data}
                                        columns={columns}
                                        initialState={{
                                            sorting: {
                                                sortModel: [{ field: 'fecha', sort: 'asc' }]
                                            }
                                        }}
                                        pageSize={12}
                                        rowsPerPageOptions={[12]}
                                        checkboxSelection
                                        disableSelectionOnClick
                                        onSelectionModelChange={(ids) => handleSelectRow(ids)}
                                        onRowClick={(analisisSeleccionado, evt) => {
                                            setOperarioEditar(operarios.filter(operario => operario.id === analisisSeleccionado.row.operario));
                                            setAnalisisSeleccionado(analisisSeleccionado.row)
                                            abrirCerrarModalEditar();
                                        }}
                                    />
                                </Card>
                            </Grid>
                        </Grid>

                        <ModalLayout
                            titulo="Agregar nuevo detalle"
                            contenido={
                                <InsertarDetalleModal
                                    handleChangeDet={handleChangeDet}
                                    tareaSeleccionada={tareaSeleccionada}
                                    handleChangeFecha={handleChangeDetFecha}
                                    setAnalisisSeleccionado={setAnalisisSeleccionado}
                                    analisisSeleccionado={analisisSeleccionado}
                                    analisis={analisis}
                                    elementoTareaEditar={elementoTareaEditar}
                                    analisisEditar={analisisEditar}
                                />
                            }
                            botones={[
                                insertarBotonesModal(<AddIcon />, 'Insertar', async () => {
                                    peticionPost()
                                })
                            ]}
                            open={modalInsertar}
                            onClose={abrirCerrarModalInsertar}
                        />

                        <ModalLayout
                            titulo="Editar detalle"
                            contenido={
                                <EditarDetalleModal
                                    setAnalisisSeleccionado={setAnalisisSeleccionado}
                                    tareaSeleccionada={tareaSeleccionada}
                                    analisisSeleccionado={analisisSeleccionado}
                                    change={handleChangeDet}
                                    handleChangeFecha={handleChangeDetFecha}
                                    handleChangeCheckbox={handleChangeCheckbox}
                                    fileChange={fileChange}
                                    handlePdf={handlePdf}
                                    analisis={analisis}
                                    elementos={elementos}
                                    operarios={operarios}
                                    operarioEditar={operarioEditar}
                                    observaciones={observaciones}
                                    setObservaciones={setObservaciones}
                                    observacion={observacion}
                                    setObservacion={setObservacion}
                                    observacionEditar={observacionEditar}
                                    setObservacionEditar={setObservacionEditar}
                                />}
                            botones={[insertarBotonesModal(<AddIcon />, 'Guardar', async () => {
                                peticionPut()
                            })]}
                            open={modalEditar}
                            onClose={abrirCerrarModalEditar}
                        />

                        <ModalLayout
                            titulo="Eliminar detalle"
                            contenido={
                                <>
                                    <Grid item xs={12}>
                                        <Typography>Estás seguro que deseas eliminar el detalle?</Typography>
                                    </Grid>
                                </>
                            }
                            botones={[
                                insertarBotonesModal(<DeleteIcon />, 'Eliminar', async () => {
                                    peticionDelete()
                                }, 'error')
                            ]}
                            open={modalEliminar}
                            onClose={abrirCerrarModalEliminar}
                        />

                        <ModalLayout
                            titulo="Eliminar archivo"
                            contenido={
                                <>
                                    <Grid item xs={12}>
                                        <Typography>Estás seguro que deseas eliminar este archivo?</Typography>
                                    </Grid>
                                </>
                            }
                            botones={[
                                insertarBotonesModal(<DeleteIcon />, 'Eliminar', async () => {
                                    peticionDeleteArchivo();
                                }, 'error')
                            ]}
                            open={openModalEliminar}
                            onClose={handleCloseModalEliminar}
                        />
                    </>
                    :
                    <>
                        <Grid container spacing={2}>

                            <Grid item xs={12}>
                                <Card sx={{ p: 4, display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                                    <Typography variant='h6'>Detalles de la tarea</Typography>
                                </Card>
                            </Grid>

                            <Grid item xs={12}>
                                <Card>
                                    <DataGrid
                                        localeText={DATAGRID_LOCALE_TEXT}
                                        sx={{
                                            width: '100%',
                                            height: 700,
                                            backgroundColor: '#FFFFFF'
                                        }}
                                        rows={data}
                                        columns={columns}
                                        initialState={{
                                            sorting: {
                                                sortModel: [{ field: 'fecha', sort: 'asc' }]
                                            }
                                        }}
                                        pageSize={12}
                                        rowsPerPageOptions={[12]}
                                        checkboxSelection
                                        disableSelectionOnClick
                                        onSelectionModelChange={(ids) => handleSelectRow(ids)}
                                        onRowClick={(analisisSeleccionado, evt) => {
                                            setOperarioEditar(operarios.filter(operario => operario.id === analisisSeleccionado.row.operario));
                                            setAnalisisSeleccionado(analisisSeleccionado.row)
                                            abrirCerrarModalEditar();
                                        }}
                                    />
                                </Card>
                            </Grid>
                        </Grid>

                        <ModalLayout2
                            titulo="Editar detalle"
                            contenido={
                                <EditarDetalleModal
                                    setAnalisisSeleccionado={setAnalisisSeleccionado}
                                    tareaSeleccionada={tareaSeleccionada}
                                    analisisSeleccionado={analisisSeleccionado}
                                    change={handleChangeDet}
                                    handleChangeFecha={handleChangeDetFecha}
                                    handleChangeCheckbox={handleChangeCheckbox}
                                    fileChange={fileChange}
                                    handlePdf={handlePdf}
                                    analisis={analisis}
                                    elementos={elementos}
                                    operarios={operarios}
                                    operarioEditar={operarioEditar}
                                    observaciones={observaciones}
                                    setObservaciones={setObservaciones}
                                    observacion={observacion}
                                    setObservacion={setObservacion}
                                    observacionEditar={observacionEditar}
                                    setObservacionEditar={setObservacionEditar}
                                />}
                            botones={[insertarBotonesModal(<AddIcon />, 'Guardar', async () => {
                                peticionPut()
                            })]}
                            open={modalEditar}
                            onClose={abrirCerrarModalEditar}
                        />
                    </>
            }
        </>
    )
}