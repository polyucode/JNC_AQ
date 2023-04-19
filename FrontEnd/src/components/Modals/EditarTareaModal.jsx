import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Grid, Card, Typography, Button, TextField, Autocomplete } from '@mui/material';
import { getAnalisis, getClientes, getElementos, getOfertas } from '../../api/apiBackend';
import MenuItem from '@mui/material/MenuItem';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';

import { DataGrid } from '@mui/x-data-grid';
import { GridToolbar } from '@mui/x-data-grid-premium';
import { DATAGRID_LOCALE_TEXT } from '../../helpers/datagridLocale';
import { insertarBotonesModal } from '../../helpers/insertarBotonesModal';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CancelIcon from '@mui/icons-material/Cancel';

import { ModalLayout } from "../ModalLayout";
import { InsertarDetalleModal } from './InsertarDetalleModal';
import { EditarDetalleModal } from './EditarDetalleModal';
import { deleteParametrosAnalisisPlanta, postParametrosAnalisisPlanta, putParametrosAnalisisPlantaPorId } from '../../api';
import { getUsuarios } from '../../api';

const token = {
    headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
    }
};

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const protocolos = [
    {
        value: 'Desinfeccion Parado 4B',
        label: 'Desinfeccion Parado 4B'
    },
    {
        value: 'Desinfeccion Continuo 4B',
        label: 'Desinfeccion Continuo 4B'
    },
    {
        value: 'Desinfeccion limpieza parado',
        label: 'Desinfeccion limpieza parado'
    },
    {
        value: 'Desinfeccion limpieza continuo',
        label: 'Desinfeccion limpieza continuo'
    },
    {
        value: 'Desinfeccion Protocolo 4C',
        label: 'Desinfeccion Protocolo 4C'
    },
    {
        value: 'Desinfeccion de aporte',
        label: 'Desinfeccion de aporte'
    },
    {
        value: 'Desinfeccion contraincendios',
        label: 'Desinfeccion contraincendios'
    },
    {
        value: 'Desinfeccion parado fuente ornamental',
        label: 'Desinfeccion parado fuente ornamental'
    },
    {
        value: 'Desinfeccion ACS (termico)',
        label: 'Desinfeccion ACS (termico)'
    },
    {
        value: 'Desinfeccion AFCH (cloracion)',
        label: 'Desinfeccion AFCH (cloracion)'
    }
]

const tipos = [
    { id: 1, nombre: "Mensual" },
    { id: 2, nombre: "Bimensual" },
    { id: 3, nombre: "Trimestral" },
    { id: 4, nombre: "Semestral" },
    { id: 5, nombre: "Anual" }
    /*{ id: 6, nombre: "Semanal" },
    { id: 7, nombre: "Bisemanal" }*/
]

export const EditarTareaModal = ({ change: handleChange, autocompleteChange, tareaSeleccionada, handleChangeFecha, setTareaSeleccionada, handleChangeAnalisis, estadoProtocolo, estadoOperario, codigoClienteEditar, tecnicoTareaEditar, tipoTareaEditar, elementosAutocomplete, analisisAutocomplete, elementoTareaEditar, analisisEditar }) => {


    const [modalInsertar, setModalInsertar] = useState(false);

    const [modalEditar, setModalEditar] = useState(false);

    const [modalEliminar, setModalEliminar] = useState(false);

    const [rows, setRows] = useState([]);
    const [rowsIds, setRowsIds] = useState([]);

    const [data, setData] = useState([]);

    const [AnalisisEliminar, setAnalisisEliminar] = useState([]);

    const [analisisSeleccionado, setAnalisisSeleccionado] = useState({

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
        operario: '',
        protocolo: '',
        observaciones: '',
        facturado: false,
        numeroFactura: '',
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

    const [snackData, setSnackData] = useState({ open: false, msg: 'Testing', severity: 'success' });

    const columns = [
        //visibles
        { headerName: 'Periodo', field: 'periodo' },
        { headerName: 'Fecha', field: 'fecha', type: 'date', width: 150},
        { headerName: 'Recogido', field: 'recogido', type: 'boolean', width: 100 },
        { headerName: 'Realizado', field: 'realizado', type: 'boolean', width: 100 },
        //{ headerName: 'Protocolo', field: 'protocolo', width: 220 },
        { headerName: 'Observaciones', field: 'observaciones', width: 300 },
        { headerName: 'Facturado', field: 'facturado', type: 'boolean', width: 100 },
        { headerName: 'Numero Facturado', field: 'numeroFactura', width: 200 },
        { headerName: 'Cancelado', field: 'cancelado', type: 'boolean', width: 100 }
    ];

    const peticionGet = async () => {

        const resp = await getParametrosAnalisisPlanta();
        setData(resp.filter(analisi => analisi.codigoCliente === tareaSeleccionada.codigoCliente && analisi.oferta === tareaSeleccionada.oferta && analisi.elemento === tareaSeleccionada.elemento && analisi.analisis === tareaSeleccionada.analisis));

    }

    useEffect(() => {

        getClientes()
            .then(clientes => {
                setClientes(clientes);
            });

        getOfertas()
            .then(ofertas => {
                setOfertas(ofertas);
            })

        getElementos()
            .then(elementos => {
                setElementos(elementos);
            })

        getAnalisis()
            .then(analisis => {
                setAnalisis(analisis)
            })

        getUsuarios()
            .then(operarios => {
                setOperarios(operarios)
            })

        peticionGet();

    }, []);

    useEffect(() => {

        if (data.length > 0) {
            setRows(data);
        }

    }, [data]);


    function formateandofechas(fecha) {
        const fecha1 = new Date(fecha)

        const fecha2 = fecha1.getFullYear() +
            '-' + String(fecha1.getMonth() + 1).padStart(2, '0') +
            '-' + String(fecha1.getDate()).padStart(2, '0')

        return fecha2
    }

    const handleChangeDet = e => {
        const { name, value } = e.target;
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
                operario: '',
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
                operario: '',
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
                operario: '',
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

        const resp = await postParametrosAnalisisPlanta(analisisSeleccionado);

        peticionGet();
        abrirCerrarModalInsertar();
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
            operario: '',
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
        });

    }

    const peticionPut = async () => {
        
        const resp = await putParametrosAnalisisPlantaPorId(analisisSeleccionado);

        var analisisSeleccionado = data;
        analisisSeleccionado.map(analisis => {
            if (analisis.id === analisisSeleccionado.id) {
                analisis = analisisSeleccionado
            }
        });
        peticionGet();
        abrirCerrarModalEditar();
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
            operario: '',
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
        });

    }

    const peticionDelete = async () => {

        var i = 0;
        while (i < AnalisisEliminar.length) {

            const resp = await deleteParametrosAnalisisPlanta(AnalisisEliminar[i]);

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
                operario: '',
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
            });

            i++;
        }
    }

    const handleSelectRow = (ids) => {

        if (ids.length > 0) {
            setAnalisisSeleccionado(data.filter(analisis => analisis.id === ids[0])[0]);
        } else {
            setAnalisisSeleccionado(analisisSeleccionado);
        }

        setRowsIds(ids);

    }

    const handleSnackClose = (event, reason) => {

        if (reason === 'clickaway') {
            return;
        }

        setSnackData({ open: false, msg: '', severity: 'info' });

    };

    return (
        <>
            <Grid item xs={3} md={3}>
                <Autocomplete
                    disableClearable={true}
                    id="CboClientes"
                    options={clientes}
                    getOptionLabel={option => option.codigo}
                    defaultValue={codigoClienteEditar[0]}
                    sx={{ width: '100%' }}
                    renderInput={(params) => <TextField {...params} label="Codigo Cliente" name="codigoCliente" />}
                    onChange={(event, value) => setTareaSeleccionada(prevState => ({
                        ...prevState,
                        codigoCliente: parseInt(value.codigo),
                        oferta: '',
                        pedido: '',
                        elementoPlanta: ''
                    }))}
                />
            </Grid>

            <Grid item xs={3} md={4}>
                <TextField
                    id='nombreCliente'
                    label="Nombre Cliente"
                    sx={{ width: '100%' }}
                    value={tareaSeleccionada && tareaSeleccionada.nombreCliente}
                    name="nombreCliente"
                    onChange={handleChange}
                />
            </Grid>

            <Grid item xs={6} md={3}>
                <Autocomplete
                    disableClearable={true}
                    sx={{ width: '100%' }}
                    id="Oferta"
                    inputValue={tareaSeleccionada.oferta}
                    options={ofertas}
                    filterOptions={options => ofertas.filter(oferta => oferta.codigoCliente === tareaSeleccionada.codigoCliente)}
                    getOptionLabel={option => option.numeroOferta}
                    renderInput={(params) => <TextField {...params} label="Oferta" name="oferta" />}
                    onChange={(event, value) => setTareaSeleccionada(prevState => ({
                        ...prevState,
                        oferta: parseInt(value.numeroOferta)
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
                    getOptionLabel={option => (option.nombre + ' ' + option.numero)}
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
                    getOptionLabel={option => option.nombre}
                    sx={{ width: '100%' }}
                    renderInput={(params) => <TextField {...params} label="Analisis" name="analisis" />}
                    onChange={handleChangeAnalisis}
                />
            </Grid>

            <Grid item xs={6} md={6}>
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

            <Grid item xs={4} md={3}>
                <TextField
                    id="fecha"
                    type="date"
                    name="fecha"
                    sx={{ width: '100%' }}
                    onChange={handleChangeFecha}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={tareaSeleccionada && formateandofechas(tareaSeleccionada.fecha)}
                />
            </Grid>

            <Grid item xs={4} md={3}>
                <Autocomplete
                    disableClearable={true}
                    id="CboTipos"
                    options={tipos}
                    defaultValue={tipoTareaEditar[0]}
                    getOptionLabel={option => option.nombre}
                    sx={{ width: '100%' }}
                    renderInput={(params) => <TextField {...params} label="Periodicidad" name="tipo" />}
                    onChange={(event, value) => setTareaSeleccionada(prevState => ({
                        ...prevState,
                        tipo: value.id
                    }))}
                />
            </Grid>

            <Grid container spacing={2}>

                <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} open={snackData.open} autoHideDuration={6000} onClose={handleSnackClose} TransitionComponent={(props) => (<Slide {...props} direction="left" />)} >
                    <Alert onClose={handleSnackClose} severity={snackData.severity} sx={{ width: '100%' }}>
                        {snackData.msg}
                    </Alert>
                </Snackbar>

                {/* Título y botones de opción */}
                <Grid item xs={12}>
                    <Card sx={{ p: 4, display: 'flex', justifyContent: 'space-between' }}>
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

                {/* Tabla donde se muestran el detalle de la tarea */}
                <Grid item xs={12}>
                    <Card>
                        <DataGrid
                            components={{ Toolbar: GridToolbar }}
                            localeText={DATAGRID_LOCALE_TEXT}
                            sx={{
                                width: '100%',
                                height: 700,
                                backgroundColor: '#FFFFFF'
                            }}
                            rows={rows}
                            columns={columns}
                            initialState={{
                                sorting: {
                                  sortModel: [{ field: 'fecha', sort: 'asc'}]
                                }
                              }}
                            pageSize={12}
                            rowsPerPageOptions={[12]}
                            checkboxSelection
                            disableSelectionOnClick
                            onSelectionModelChange={(ids) => handleSelectRow(ids)}
                            onRowClick={(analisisSeleccionado, evt) => {
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
                        change={handleChangeDet}
                        tareaSeleccionada={tareaSeleccionada}
                        handleChangeFecha={handleChangeDetFecha}
                        setAnalisisSeleccionado={setAnalisisSeleccionado}
                    />
                }
                botones={[
                    insertarBotonesModal(<AddIcon />, 'Añadir', async () => {
                        abrirCerrarModalInsertar();

                        if (peticionPost()) {
                            setSnackData({ open: true, msg: 'Contacto añadido correctamente', severity: 'success' });
                        } else {
                            setSnackData({ open: true, msg: 'Ha habido un error al añadir el contacto', severity: 'error' })
                        }

                    }, 'success')
                ]}
                open={modalInsertar}
                onClose={abrirCerrarModalInsertar}
            />
            {/* Modal Editar Detalle*/}
            <ModalLayout
                titulo="Editar detalle"
                contenido={
                    <EditarDetalleModal
                        setAnalisisSeleccionado={setAnalisisSeleccionado}
                        tareaSeleccionada={tareaSeleccionada}
                        analisisSeleccionado={analisisSeleccionado}
                        change={handleChangeDet}
                        handleChangeFecha={handleChangeDetFecha}
                    />}
                botones={[insertarBotonesModal(<AddIcon />, 'Editar', async () => {
                    abrirCerrarModalEditar()

                    if (peticionPut()) {
                        setSnackData({ open: true, msg: 'Detalle editado correctamente', severity: 'success' });
                    } else {
                        setSnackData({ open: true, msg: 'Ha habido un error al editar el detalle', severity: 'error' })
                    }
                })
                ]}
                open={modalEditar}
                onClose={abrirCerrarModalEditar}
            />

            {/* Eliminar detalle */}
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
                        abrirCerrarModalEliminar();

                        if (peticionDelete()) {
                            setSnackData({ open: true, msg: `Detalle eliminado correctamente`, severity: 'success' });
                        } else {
                            setSnackData({ open: true, msg: 'Ha habido un error al eliminar el detalle', severity: 'error' })
                        }

                    }, 'error'),
                    insertarBotonesModal(<CancelIcon />, 'Cancelar', () => abrirCerrarModalEliminar(), 'success')
                ]}
                open={modalEliminar}
                onClose={abrirCerrarModalEliminar}
            />

        </>
    )
}