import React, { useState, useEffect } from "react";
import { Grid, Card, Typography, Button, TextField } from '@mui/material';
import axios from "axios";
import Autocomplete from '@mui/material/Autocomplete';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { makeStyles } from '@material-ui/core/styles';
import { MainLayout } from "../layout/MainLayout";
import { ModalLayout, ModalPopup } from "../components/ModalLayout";

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';

import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CancelIcon from '@mui/icons-material/Cancel';

import { DataGrid } from '@mui/x-data-grid';
import { GridToolbar } from '@mui/x-data-grid-premium';
import { DATAGRID_LOCALE_TEXT } from '../helpers/datagridLocale';
import { InsertarConsumoModal } from "../components/Modals/InsertarConsumoModal";
import { EditarConsumoModal } from '../components/Modals/EditarConsumoModal';
import { insertarBotonesModal } from '../helpers/insertarBotonesModal';
import { deleteConsumos, getOfertas, postConsumos, putConsumos, getProductos, getConsumos } from "../api";
import { useUsuarioActual } from "../hooks/useUsuarioActual";


const token = {
    headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
    }
};

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const ConsumoArticulosPage = () => {

    const [rowsIds, setRowsIds] = useState([]);
    const [rows, setRows] = useState([]);

    const [modalInsertar, setModalInsertar] = useState(false);

    const [modalEditar, setModalEditar] = useState(false);

    const [modalEliminar, setModalEliminar] = useState(false);

    const [consumoSeleccionado, setConsumoSeleccionado] = useState({
        id: 0,
        oferta: 0,
        fecha: null,
        producto: '',
        cantidad: 0,
        addDate: null,
        addIdUser: null,
        modDate: null,
        modIdUser: null,
        delDate: null,
        delIdUser: null,
        deleted: null,
    });

    const [ConsumoEliminar, setConsumoEliminar] = useState([]);

    const [data, setData] = useState([]);

    const [clientes, setClientes] = useState([]);
    const [ofertas, setOfertas] = useState([]);
    const [productos, setProductos] = useState([]);

    const [clienteEditar, setClienteEditar] = useState([]);
    const [ofertaEditar, setOfertaEditar] = useState([]);
    const [productoEditar, setProductoEditar] = useState([]);
    const [descripcionEditar, setDescripcionEditar] = useState([]);

    const [snackData, setSnackData] = useState({ open: false, msg: 'Testing', severity: 'success' });

    const { usuarioActual } = useUsuarioActual();

    const columnas = [

        //Visibles
        { headerName: 'Oferta', field: 'oferta', width: 400 },
        {
            headerName: 'Fecha',
            field: 'fecha',
            type: 'date',
            width: 400,
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
        { headerName: 'Producto', field: 'producto', width: 400 },
        { headerName: 'Cantidad', field: 'cantidad', width: 400 }
    ];


    const peticionGet = async () => {

        const resp = await getConsumos();
        setData(resp);

    }

    useEffect(() => {
        peticionGet();

        getOfertas()
            .then(ofertas => {
                setOfertas(ofertas);
            })

        getProductos()
            .then(productos => {
                setProductos(productos);
            })

    }, [])

    useEffect(() => {

        if (data.length > 0) {
            setRows(data);
        }

    }, [data]);

    const peticionPost = async () => {
        consumoSeleccionado.id = 0;
        const resp = await postConsumos(consumoSeleccionado);
        abrirCerrarModalInsertar();
        peticionGet();
        setConsumoSeleccionado({
            id: 0,
            oferta: 0,
            fecha: null,
            producto: '',
            cantidad: 0,
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

        const resp = await putConsumos(consumoSeleccionado);

        var consumoModificado = data;
        consumoModificado.map(consumo => {
            if (consumo.id === consumoSeleccionado.id) {
                consumo = consumoSeleccionado
            }
        });
        peticionGet();
        abrirCerrarModalEditar();
        setConsumoSeleccionado({
            id: 0,
            oferta: 0,
            fecha: null,
            producto: '',
            cantidad: 0,
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
        while (i < ConsumoEliminar.length) {

            const resp = await deleteConsumos(ConsumoEliminar[i]);
            peticionGet();
            abrirCerrarModalEliminar();
            setConsumoSeleccionado({
                id: 0,
                oferta: 0,
                fecha: null,
                producto: '',
                cantidad: 0,
                addDate: null,
                addIdUser: null,
                modDate: null,
                modIdUser: null,
                delDate: null,
                delIdUser: null,
                deleted: null,
            })
            i++;
        }
    }

    //Modales
    const abrirCerrarModalInsertar = () => {
        setModalInsertar(!modalInsertar);
    }

    const abrirCerrarModalEliminar = () => {
        setModalEliminar(!modalEliminar);
    }

    const abrirCerrarModalEditar = () => {
        setModalEditar(!modalEditar);
    }


    const handleChange = e => {
        const { name, value } = e.target;
        setConsumoSeleccionado(prevState => ({
            ...prevState,
            [e.target.name]: e.target.type === 'number' ? parseInt(e.target.value) : e.target.value
        }));
    }

    const handleSelectRow = (ids) => {

        if (ids.length > 0) {
            setConsumoSeleccionado(data.filter(consumo => consumo.id === ids[0])[0]);
        } else {
            setConsumoSeleccionado(consumoSeleccionado);
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
            <MainLayout title='Consumos'>

                <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} open={snackData.open} autoHideDuration={6000} onClose={handleSnackClose} TransitionComponent={(props) => (<Slide {...props} direction="left" />)} >
                    <Alert onClose={handleSnackClose} severity={snackData.severity} sx={{ width: '100%' }}>
                        {snackData.msg}
                    </Alert>
                </Snackbar>

                <Grid container spacing={2}>

                    {/* Título y botones de opción */}
                    <Grid item xs={12}>
                        <Card sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant='h6'>Listado de Consumos</Typography>
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
                                                    setConsumoEliminar(rowsIds)
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
                                    height: 1000,
                                    backgroundColor: '#FFFFFF'
                                }}
                                rows={rows}
                                columns={columnas}
                                checkboxSelection
                                disableSelectionOnClick
                                onSelectionModelChange={(ids) => handleSelectRow(ids)}
                                onRowClick={(consumoSeleccionado, evt) => {
                                    setConsumoSeleccionado(consumoSeleccionado.row)
                                    setProductoEditar(productos.filter(producto => producto.descripcion === consumoSeleccionado.row.producto))
                                    setOfertaEditar(ofertas.filter(oferta => oferta.numeroOferta === consumoSeleccionado.row.oferta))
                                    abrirCerrarModalEditar();
                                }}
                            />
                        </Card>
                    </Grid>

                    {/* LISTA DE MODALS */}

                    {/* Agregar consumo */}
                    <ModalLayout
                        titulo="Agregar nuevo consumo"
                        contenido={
                            <InsertarConsumoModal
                                change={handleChange}
                                setConsumoSeleccionado={setConsumoSeleccionado}
                                ofertas={ofertas}
                                productos={productos}
                            />
                        }
                        botones={[
                            insertarBotonesModal(<AddIcon />, 'Añadir', async () => {
                                abrirCerrarModalInsertar();

                                if (peticionPost()) {
                                    setSnackData({ open: true, msg: 'Consumo añadido correctamente', severity: 'success' });
                                } else {
                                    setSnackData({ open: true, msg: 'Ha habido un error al añadir el consumo', severity: 'error' })
                                }

                            }, 'success')
                        ]}
                        open={modalInsertar}
                        onClose={abrirCerrarModalInsertar}
                    />

                </Grid>

                {/* Modal Editar Consumo*/}

                <ModalLayout
                    titulo="Editar consumo"
                    contenido={
                        <EditarConsumoModal
                            consumoSeleccionado={consumoSeleccionado}
                            change={handleChange}
                            setConsumoSeleccionado={setConsumoSeleccionado}
                            productoEditar={productoEditar}
                            ofertaEditar={ofertaEditar}
                            ofertas={ofertas}
                            productos={productos}
                        />}
                    botones={[insertarBotonesModal(<AddIcon />, 'Guardar', async () => {
                        abrirCerrarModalEditar()

                        if (peticionPut()) {
                            setSnackData({ open: true, msg: 'Consumo editado correctamente', severity: 'success' });
                        } else {
                            setSnackData({ open: true, msg: 'Ha habido un error al editar el consumo', severity: 'error' })
                        }
                    })
                    ]}
                    open={modalEditar}
                    onClose={abrirCerrarModalEditar}
                />

                {/* Eliminar consumo */}
                <ModalLayout
                    titulo="Eliminar consumo"
                    contenido={
                        <>
                            <Grid item xs={12}>
                                <Typography>Estás seguro que deseas eliminar el consumo?</Typography>
                            </Grid>
                        </>
                    }
                    botones={[
                        insertarBotonesModal(<DeleteIcon />, 'Eliminar', async () => {
                            abrirCerrarModalEliminar();

                            if (peticionDelete()) {
                                setSnackData({ open: true, msg: `Consumo eliminado correctamente`, severity: 'success' });
                            } else {
                                setSnackData({ open: true, msg: 'Ha habido un error al eliminar el consumo', severity: 'error' })
                            }

                        }, 'error'),
                        insertarBotonesModal(<CancelIcon />, 'Cancelar', () => abrirCerrarModalEliminar(), 'success')
                    ]}
                    open={modalEliminar}
                    onClose={abrirCerrarModalEliminar}
                />
            </MainLayout>
        </>

    )
}