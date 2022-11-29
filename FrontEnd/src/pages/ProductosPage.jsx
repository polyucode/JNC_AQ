import React, { useState, useEffect } from "react";
import { Grid, Card, Typography, Button } from '@mui/material';
import axios from "axios";
import { MainLayout } from "../layout/MainLayout";
import { ModalLayout, ModalPopup } from "../components/ModalLayout";

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CancelIcon from '@mui/icons-material/Cancel';

import { DataGrid } from '@mui/x-data-grid';
import { GridToolbar } from '@mui/x-data-grid-premium';
import { DATAGRID_LOCALE_TEXT } from '../helpers/datagridLocale';
import { InsertarProductoModal } from "../components/Modals/InsertarProductoModal";
import { EditarProductoModal } from '../components/Modals/EditarProductoModal';
import { insertarBotonesModal } from '../helpers/insertarBotonesModal';
import { axiosOptions } from '../api/apiBackend';


const token = {
    headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
    }
};

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const ProductosPage = () => {

    const [rowsIds, setRowsIds] = useState([]);
    const [rows, setRows] = useState([]);

    const [modalInsertar, setModalInsertar] = useState(false);

    const [modalEditar, setModalEditar] = useState(false);

    const [modalEliminar, setModalEliminar] = useState(false);

    const [productoSeleccionado, setProductoSeleccionado] = useState({
        id: 0,
        codigoProducto: 0,
        descripcion: "",
        addDate: null,
        addIdUser: null,
        modDate: null,
        modIdUser: null,
        delDate: null,
        delIdUser: null,
        deleted: null,
    });

    const [FilasSeleccionadas, setFilasSeleccionadas] = useState([]);

    const [ProductoEliminar, setProductoEliminar] = useState([]);

    const [data, setData] = useState([]);

    const [snackData, setSnackData] = useState({ open: false, msg: 'Testing', severity: 'success' });

    const columnas = [

        //Visibles
        { title: 'CodigoProducto', field: 'codigoProducto', width: 700 },
        { title: 'Descripcion', field: 'descripcion', width: 700 }

    ];

    const getProductos = async () => {
        axios.get("http://172.26.0.169:44343/api/productos", axiosOptions).then(response => {
            setData(response.data.data)
        })
    }

    useEffect(() => {
        getProductos();
    }, [])

    useEffect(() => {

        if (data.length > 0) {
            setRows(data);
        }

    }, [data]);

    const peticionPost = async () => {
        productoSeleccionado.id = null;
        await axios.post("http://172.26.0.169:44343/api/productos", productoSeleccionado, axiosOptions)
            .then(response => {
                //setData(data.concat(response.data));
                abrirCerrarModalInsertar();
                getProductos();
            }).catch(error => {
                console.log(error);
            })
    }

    const peticionPut = async () => {
        await axios.put("http://172.26.0.169:44343/api/productos?id=" + productoSeleccionado.id, productoSeleccionado, axiosOptions)
            .then(response => {
                var productoModificado = data;
                productoModificado.map(producto => {
                    if (producto.id === productoSeleccionado.id) {
                        producto = productoSeleccionado
                    }
                });
                getProductos();
                abrirCerrarModalEditar();
            }).catch(error => {
                console.log(error);
            })
    }

    const peticionDelete = async () => {
        var i = 0;
        while (i < ProductoEliminar.length) {
            await axios.delete("http://172.26.0.169:44343/api/productos/" + ProductoEliminar[i], axiosOptions)
                .then(response => {
                    getProductos();
                    abrirCerrarModalEliminar();
                }).catch(error => {
                    console.log(error);
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
        setProductoSeleccionado(prevState => ({
            ...prevState,
            [e.target.name]: e.target.type === 'number' ? parseInt(e.target.value) : e.target.value
        }));
    }

    const handleSelectRow = (ids) => {

        if (ids.length > 0) {
            setProductoSeleccionado(data.filter(producto => producto.id === ids[0])[0]);
        } else {
            setProductoSeleccionado(productoSeleccionado);
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
        <MainLayout title='Productos'>

            <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} open={snackData.open} autoHideDuration={6000} onClose={handleSnackClose} TransitionComponent={(props) => (<Slide {...props} direction="left" />)} >
                <Alert onClose={handleSnackClose} severity={snackData.severity} sx={{ width: '100%' }}>
                    {snackData.msg}
                </Alert>
            </Snackbar>

            <Grid container spacing={2}>

                {/* Título y botones de opción */}
                <Grid item xs={12}>
                    <Card sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant='h6'>Listado de Productos</Typography>
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
                                                setProductoEliminar(rowsIds)
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
                            columns={columnas}
                            pageSize={9}
                            rowsPerPageOptions={[9]}
                            checkboxSelection
                            disableSelectionOnClick
                            onSelectionModelChange={(ids) => handleSelectRow(ids)}
                            onRowClick={(productoSeleccionado, evt) => {
                                setProductoSeleccionado(productoSeleccionado.row)
                                abrirCerrarModalEditar();
                            }}
                        />
                    </Card>
                </Grid>

                {/* LISTA DE MODALS */}

                {/* Agregar Producto */}
                <ModalLayout
                    titulo="Agregar nuevo cliente"
                    contenido={
                        <InsertarProductoModal change={handleChange} />
                    }
                    botones={[
                        insertarBotonesModal(<AddIcon />, 'Añadir', async () => {
                            abrirCerrarModalInsertar();

                            if (peticionPost()) {
                                setSnackData({ open: true, msg: 'Producto añadido correctamente', severity: 'success' });
                            } else {
                                setSnackData({ open: true, msg: 'Ha habido un error al añadir el producto', severity: 'error' })
                            }

                        }, 'success')
                    ]}
                    open={modalInsertar}
                    onClose={abrirCerrarModalInsertar}
                />

            </Grid>

            {/* Modal Editar Producto*/}

            <ModalLayout
                titulo="Editar producto"
                contenido={
                    <EditarProductoModal
                        productoSeleccionado={productoSeleccionado}
                        change={handleChange}
                    />}
                botones={[insertarBotonesModal(<AddIcon />, 'Editar', async () => {
                    abrirCerrarModalEditar()

                    if (peticionPut()) {
                        setSnackData({ open: true, msg: 'Producto editado correctamente', severity: 'success' });
                    } else {
                        setSnackData({ open: true, msg: 'Ha habido un error al editar el producto', severity: 'error' })
                    }
                })
                ]}
                open={modalEditar}
                onClose={abrirCerrarModalEditar}
            />

            {/* Eliminar producto */}
            <ModalLayout
                titulo="Eliminar producto"
                contenido={
                    <>
                        <Grid item xs={12}>
                            <Typography>Estás seguro que deseas eliminar el producto?</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography><b>{productoSeleccionado.descripcion}</b></Typography>
                        </Grid>
                    </>
                }
                botones={[
                    insertarBotonesModal(<DeleteIcon />, 'Eliminar', async () => {
                        abrirCerrarModalEliminar();

                        if (peticionDelete()) {
                            setSnackData({ open: true, msg: `Producto eliminado correctamente: ${productoSeleccionado.descripcion}`, severity: 'success' });
                        } else {
                            setSnackData({ open: true, msg: 'Ha habido un error al eliminar el producto', severity: 'error' })
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