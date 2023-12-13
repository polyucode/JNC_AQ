import React, { useState, useEffect } from "react";
import { Grid, Card, Typography, Button } from '@mui/material';
import axios from "axios";
import { Modal, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
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
import { deleteProductos, getProductos, postProductos, putProductos } from "../api";
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

export const ProductosPage = () => {

    const [rowsIds, setRowsIds] = useState([]);
    const [rows, setRows] = useState([]);

    const [modalInsertar, setModalInsertar] = useState(false);

    const [modalEditar, setModalEditar] = useState(false);

    const [modalEliminar, setModalEliminar] = useState(false);

    const [productoSeleccionado, setProductoSeleccionado] = useState({
        id: 0,
        codigoProducto: "",
        descripcion: "",
        kg: 0,
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

    const [productos, setProductos] = useState([]);

    const [data, setData] = useState([]);

    const [snackData, setSnackData] = useState({ open: false, msg: 'Testing', severity: 'success' });

    const { usuarioActual } = useUsuarioActual();

    const [errorProducto, setErrorProducto] = useState(false);

    const columnas = [

        //Visibles
        { headerName: 'Codigo del Producto', field: 'codigoProducto', width: 500 },
        { headerName: 'Descripcion', field: 'descripcion', width: 500 },
        { headerName: 'KG', field: 'kg', width: 500}

    ];

    const peticionGet = async () => {

        const resp = await getProductos();
        setData(resp);

    }

    useEffect(() => {
        peticionGet();
    }, [])

    useEffect(() => {

        if (data.length > 0) {
            setRows(data);
        }

    }, [data]);



    const peticionPost = async () => {

        if (productoSeleccionado.codigoProducto != "") {
            setErrorProducto(false)
        } else {
            setErrorProducto(true)
        }

        if (productoSeleccionado.codigoProducto != "") {
            productoSeleccionado.id = null;

            const resp = await postProductos(productoSeleccionado);

            abrirCerrarModalInsertar();
            peticionGet();
            setProductoSeleccionado({
                id: 0,
                codigoProducto: "",
                descripcion: "",
                kg: 0,
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
                title: 'Producto Creado',
                text: `El producto se ha creado correctamente`,
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

        if (productoSeleccionado.codigoProducto != "") {
            setErrorProducto(false)
        } else {
            setErrorProducto(true)
        }

        if (productoSeleccionado.codigoProducto != "") {
            const resp = await putProductos(productoSeleccionado);

            var productoModificado = data;

            productoModificado.map(producto => {
                if (producto.id === productoSeleccionado.id) {
                    producto = productoSeleccionado
                }
            });
            abrirCerrarModalEditar();
            peticionGet();
            setProductoSeleccionado({
                id: 0,
                codigoProducto: "",
                descripcion: "",
                kg: 0,
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
                title: 'Producto Editado',
                text: `El producto se ha editado correctamente`,
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

        var i = 0;
        while (i < ProductoEliminar.length) {

            const resp = await deleteProductos(ProductoEliminar[i]);

            abrirCerrarModalEliminar();
            peticionGet();
            setProductoSeleccionado({
                id: 0,
                codigoProducto: "",
                descripcion: "",
                kg: 0,
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

        Swal.fire({
            position: 'center',
            icon: 'info',
            title: 'Producto Eliminado',
            text: `El prudcto se ha eliminado correctamente`,
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

    //Modales
    const abrirCerrarModalInsertar = () => {
        setErrorProducto(false)
        if (modalInsertar) {
            setProductoSeleccionado({
                id: 0,
                codigoProducto: "",
                descripcion: "",
                kg: 0,
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
        setErrorProducto(false)
        if (modalEliminar) {
            setProductoSeleccionado({
                id: 0,
                codigoProducto: "",
                descripcion: "",
                kg: 0,
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
        setErrorProducto(false)
        if (modalEditar) {
            setProductoSeleccionado({
                id: 0,
                codigoProducto: 0,
                descripcion: "",
                kg: 0,
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
        <>
            {usuarioActual.idPerfil === 1 ?
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
                                    //components={{ Toolbar: GridToolbar }}
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
                            titulo="Agregar nuevo producto"
                            contenido={
                                <InsertarProductoModal 
                                    change={handleChange} 
                                    errorProducto={errorProducto}
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

                    {/* Modal Editar Producto*/}

                    <ModalLayout
                        titulo="Editar producto"
                        contenido={
                            <EditarProductoModal
                                productoSeleccionado={productoSeleccionado}
                                change={handleChange}
                                errorProducto={errorProducto}
                            />}
                        botones={[insertarBotonesModal(<AddIcon />, 'Guardar', async () => {
                            peticionPut();
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
                                peticionDelete()
                            }, 'error'),
                        ]}
                        open={modalEliminar}
                        onClose={abrirCerrarModalEliminar}
                    />
                </MainLayout>
                :
                <MainLayout title='Productos'>

                    <Grid container spacing={2}>

                        {/* Título y botones de opción */}
                        <Grid item xs={12}>
                            <Card sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
                                <Typography variant='h6'>Listado de Productos</Typography>
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
                                    rows={rows}
                                    columns={columnas}
                                    onSelectionModelChange={(ids) => handleSelectRow(ids)}
                                    onRowClick={(productoSeleccionado, evt) => {
                                        setProductoSeleccionado(productoSeleccionado.row)
                                        abrirCerrarModalEditar();
                                    }}
                                />
                            </Card>
                        </Grid>

                    </Grid>

                    {/* Modal Editar Producto*/}

                    <ModalLayout2
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

                </MainLayout>
            }
        </>

    )
}