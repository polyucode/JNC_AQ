import React, { useState, useEffect } from "react";
import MaterialTable from '@material-table/core';
import axios from "axios";
import { ExportCsv, ExportPdf } from '@material-table/exporters';
import AddCircle from '@material-ui/icons/AddCircle';
import RemoveCircle from '@material-ui/icons/RemoveCircle';
import Edit from '@material-ui/icons/Edit';
import { Modal, TextField } from '@material-ui/core';
import Autocomplete from '@mui/material/Autocomplete';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { makeStyles } from '@material-ui/core/styles';
import { MainLayout } from "../layout/MainLayout";
import { Grid, Card, Typography, Button } from '@mui/material';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';

import { DataGrid } from '@mui/x-data-grid';
import { GridToolbar } from '@mui/x-data-grid-premium';
import { DATAGRID_LOCALE_TEXT } from '../helpers/datagridLocale';
import { InsertarOfertaModal } from '../components/Modals/InsertarOfertaModal';
import { EditarOfertaModal } from '../components/Modals/EditarOfertaModal';
import { insertarBotonesModal } from '../helpers/insertarBotonesModal';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CancelIcon from '@mui/icons-material/Cancel';

import { ModalLayout, ModalPopup } from "../components/ModalLayout";
import { deleteOfertas, getClientes, getOfertas, postOfertas, putOfertas, getContactos } from "../api";

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
        codigoCliente: 0,
        nombreCliente: '',
        descripcion: '',
        fechaInicio: null,
        fechaFinalizacion: null,
        contacto1: '',
        contacto2: '',
        contacto3: '',
        addDate: null,
        addIdUser: null,
        modDate: null,
        modIdUser: null,
        delDate: null,
        delIdUser: null,
        deleted: null,
    });

    const [FilasSeleccionadas, setFilasSeleccionadas] = useState([]);

    const [ofertaEditar, setOfertaEditar] = useState([]);
    const [OfertaEliminar, setOfertaEliminar] = useState([]);

    const [contactos, setContactos] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [clientesTable, setClientesTable] = useState({});

    const [contacto1Editar, setContacto1Editar] = useState([]);
    const [contacto2Editar, setContacto2Editar] = useState([]);
    const [contacto3Editar, setContacto3Editar] = useState([]);

    const [clienteCodigoEditar, setClientesCodigoEditar] = useState([]);

    const [articulos, setArticulos] = useState([]);

    const [fechaInicio, setFechaInicio] = useState("");
    const [fechaFinalizacion, setFechaFinalizacion] = useState("");

    const [data, setData] = useState([]);

    const [snackData, setSnackData] = useState({ open: false, msg: 'Testing', severity: 'success' });

    const columns = [

        //Visibles
        { headerName: 'Nº Oferta', field: 'numeroOferta', width: 150 },
        { headerName: 'Descripcion', field: 'descripcion', width: 200 },
        { headerName: 'Pedido', field: 'pedido', width: 150 },
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
        { headerName: 'Contacto3', field: 'contacto3', width: 200 }
    ];
    const getOferta = async () => {

        const resp = await getOfertas();
        setData(resp);

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

        ofertaSeleccionada.id = null;

        const resp = await postOfertas(ofertaSeleccionada);

        abrirCerrarModalInsertar();
        getOferta();
        setOfertaSeleccionada({
            id: 0,
            numeroOferta: 0,
            pedido: 0,
            codigoCliente: 0,
            nombreCliente: '',
            descripcion: '',
            fechaInicio: '',
            fechaFinalizacion: '',
            contacto1: '',
            contacto2: '',
            contacto3: '',
            addDate: null,
            addIdUser: null,
            modDate: null,
            modIdUser: null,
            delDate: null,
            delIdUser: null,
            deleted: null,
        })

    }

    const peticionPut = async () => {

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
            codigoCliente: 0,
            nombreCliente: '',
            descripcion: '',
            fechaInicio: '',
            fechaFinalizacion: '',
            contacto1: '',
            contacto2: '',
            contacto3: '',
            addDate: null,
            addIdUser: null,
            modDate: null,
            modIdUser: null,
            delDate: null,
            delIdUser: null,
            deleted: null,
        })
        
    }

    const peticionDelete = async () => {

        var i = 0;
        while (i < OfertaEliminar.length) {

            const resp = await deleteOfertas(OfertaEliminar[i]);

            getOferta();
            abrirCerrarModalEliminar();
            setOfertaSeleccionada({
                id: 0,
                numeroOferta: 0,
                pedido: 0,
                codigoCliente: 0,
                nombreCliente: '',
                descripcion: '',
                fechaInicio: '',
                fechaFinalizacion: '',
                contacto1: '',
                contacto2: '',
                contacto3: '',
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

    //Modales
    const abrirCerrarModalInsertar = () => {
        if (modalInsertar) {
            setOfertaSeleccionada({
                id: 0,
                numeroOferta: 0,
                pedido: 0,
                codigoCliente: 0,
                nombreCliente: '',
                descripcion: '',
                fechaInicio: '',
                fechaFinalizacion: '',
                contacto1: '',
                contacto2: '',
                contacto3: '',
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
        if (modalEliminar) {
            setOfertaSeleccionada({
                id: 0,
                numeroOferta: 0,
                pedido: 0,
                codigoCliente: 0,
                nombreCliente: '',
                descripcion: '',
                fechaInicio: '',
                fechaFinalizacion: '',
                contacto1: '',
                contacto2: '',
                contacto3: '',
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
        if (modalEditar) {
            setOfertaSeleccionada({
                id: 0,
                numeroOferta: 0,
                pedido: 0,
                codigoCliente: 0,
                nombreCliente: '',
                descripcion: '',
                fechaInicio: '',
                fechaFinalizacion: '',
                contacto1: '',
                contacto2: '',
                contacto3: '',
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


    const handleChange = e => {
        const { name, value } = e.target;
        setOfertaSeleccionada(prevState => ({
            ...prevState,
            //[name]: value
            [e.target.name]: e.target.type === 'number' ? parseInt(e.target.value) : e.target.value
        }));
        console.log(e.target.type)
    }

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
            //[name]: value
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

    const handleSnackClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackData({ open: false, msg: '', severity: 'info' });
    };



    return (
        <MainLayout title="Ofertas">
            <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} open={snackData.open} autoHideDuration={6000} onClose={handleSnackClose} TransitionComponent={(props) => (<Slide {...props} direction="left" />)} >
                <Alert onClose={handleSnackClose} severity={snackData.severity} sx={{ width: '100%' }}>
                    {snackData.msg}
                </Alert>
            </Snackbar>

            <Grid container spacing={2}>

                {/* Título y botones de opción */}
                <Grid item xs={12}>
                    <Card sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant='h6'>Listado de ofertas</Typography>
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
                                                setOfertaEliminar(rowsIds)
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

                {/* Tabla donde se muestran los registros de los clientes */}
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
                            pageSize={9}
                            rowsPerPageOptions={[9]}
                            checkboxSelection
                            disableSelectionOnClick
                            onSelectionModelChange={(ids) => handleSelectRow(ids)}
                            onRowClick={(ofertaSeleccionada, evt) => {
                                setOfertaSeleccionada(ofertaSeleccionada.row)
                                setClientesCodigoEditar(clientes.filter(cliente => cliente.codigo === ofertaSeleccionada.row.codigoCliente));
                                setContacto1Editar(contactos.filter(contacto => contacto.nombre === ofertaSeleccionada.row.contacto1))
                                setContacto2Editar(contactos.filter(contacto => contacto.nombre === ofertaSeleccionada.row.contacto2))
                                setContacto3Editar(contactos.filter(contacto => contacto.nombre === ofertaSeleccionada.row.contacto3))
                                abrirCerrarModalEditar();
                            }}
                        />
                    </Card>
                </Grid>

                {/* LISTA DE MODALS */}

                {/* Agregar Oferta */}
                <ModalLayout
                    titulo="Agregar nueva oferta"
                    contenido={
                        <InsertarOfertaModal
                            ofertaSeleccionada={ofertaSeleccionada}
                            change={handleChange}
                            handleChangeFecha={handleChangeFecha}
                            setOfertaSeleccionada={setOfertaSeleccionada}
                        />
                    }
                    botones={[
                        insertarBotonesModal(<AddIcon />, 'Añadir', async () => {
                            abrirCerrarModalInsertar();

                            if (peticionPost()) {
                                setSnackData({ open: true, msg: 'Oferta añadida correctamente', severity: 'success' });
                            } else {
                                setSnackData({ open: true, msg: 'Ha habido un error al añadir la oferta', severity: 'error' })
                            }

                        }, 'success')
                    ]}
                    open={modalInsertar}
                    onClose={abrirCerrarModalInsertar}
                />

            </Grid>

            {/* Modal Editar Oferta*/}

            <ModalLayout
                titulo="Editar Oferta"
                contenido={
                    <EditarOfertaModal
                        ofertaSeleccionada={ofertaSeleccionada}
                        change={handleChange}
                        codigoClienteEditar={clienteCodigoEditar}
                        contacto1Editar={contacto1Editar}
                        contacto2Editar={contacto2Editar}
                        contacto3Editar={contacto3Editar}
                    />}
                botones={[insertarBotonesModal(<AddIcon />, 'Editar', async () => {
                    abrirCerrarModalEditar()

                    if (peticionPut()) {
                        setSnackData({ open: true, msg: 'Oferta editada correctamente', severity: 'success' });
                    } else {
                        setSnackData({ open: true, msg: 'Ha habido un error al editar la oferta', severity: 'error' })
                    }
                })
                ]}
                open={modalEditar}
                onClose={abrirCerrarModalEditar}
            />

            {/* Eliminar oferta */}
            <ModalLayout
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
                        abrirCerrarModalEliminar();

                        if (peticionDelete()) {
                            setSnackData({ open: true, msg: `Oferta eliminada correctamente: ${ofertaSeleccionada.numeroOferta}`, severity: 'success' });
                        } else {
                            setSnackData({ open: true, msg: 'Ha habido un error al eliminar la oferta', severity: 'error' })
                        }

                    }, 'error'),
                    insertarBotonesModal(<CancelIcon />, 'Cancelar', () => abrirCerrarModalEliminar(), 'success')
                ]}
                open={modalEliminar}
                onClose={abrirCerrarModalEliminar}
            />
        </MainLayout>
    )
}