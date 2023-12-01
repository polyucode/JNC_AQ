import { useState, useEffect } from 'react';
import { Grid, Card, Typography, Button, TextField, Autocomplete } from '@mui/material';
import { getContactos, getClientes, getProductos, getOfertasProductos, putOfertasProductos, deleteOfertasProductos, postOfertasProductos } from '../../api';

import { DataGrid } from '@mui/x-data-grid';
import { GridToolbar } from '@mui/x-data-grid-premium';
import { DATAGRID_LOCALE_TEXT } from '../../helpers/datagridLocale';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CancelIcon from '@mui/icons-material/Cancel';
import { InsertarOfertaProductoModal } from './InsertarOfertaProductoModal';
import { EditarOfertaProductoModal } from './EditarOfertaProductoModal';

import { ModalLayout } from "../ModalLayout";

import Swal from 'sweetalert2';
import { insertarBotonesModal } from '../../helpers/insertarBotonesModal';

export const EditarOfertaModal = ({ change: handleChange, autocompleteChange, ofertaSeleccionada, setOfertaSeleccionada, handleChangeFecha, codigoClienteEditar, contacto1Editar, contacto2Editar, contacto3Editar, productoEditar, errorCodigo, errorFechaFinal, errorFechaInicio, errorPedido, errorOferta }) => {

    const [contactos, setContactos] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [productos, setProductos] = useState([]);

    const [productoEditar2, setProductoEditar2] = useState([]);

    const [ofertaProducto, setOfertaProducto] = useState({
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
    });

    const [OfertaProductoEliminar, setOfertaProductoEliminar] = useState([]);

    const [data, setData] = useState([]);

    const [rowsIds, setRowsIds] = useState([]);
    const [rows, setRows] = useState([]);

    const [modalInsertar, setModalInsertar] = useState(false);

    const [modalEditar, setModalEditar] = useState(false);

    const [modalEliminar, setModalEliminar] = useState(false);


    const columns = [
        { 
            field: 'producto', 
            headerName: 'Productos', 
            width: 200,
            valueFormatter: (params) => {
                const prod = productos.find((producto) => producto.id === params.value);
                return prod ? prod.descripcion : '';
            }
        },
        { field: 'precio', headerName: 'Precio Unitario', width: 150 },
        { field: 'cantidad', headerName: 'Estimación consumo', width: 200 },
        { field: 'consumidos', headerName: 'Consumidos', width: 200 },
        { field: 'pendientes', headerName: 'Pendientes', width: 350 },
    ]

    useEffect(() => {

        peticionGet();

        getContactos()
            .then(contactos => {
                setContactos(contactos);
            })

        getClientes()
            .then(clientes => {
                setClientes(clientes);
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

    const peticionGet = async () => {

        const resp = await getOfertasProductos();
        setData(resp.filter(oferta => oferta.oferta === ofertaSeleccionada.numeroOferta))

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

    const peticionPostProducto = async () => {

        ofertaProducto.id = null;
        ofertaProducto.codigoCliente = ofertaSeleccionada.codigoCliente;
        ofertaProducto.oferta = ofertaSeleccionada.numeroOferta;
        ofertaProducto.pendientes = ofertaProducto.cantidad - ofertaProducto.consumidos;

        const resp = await postOfertasProductos(ofertaProducto);

        abrirCerrarModalInsertar();
        peticionGet();
        setOfertaProducto({
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

    const peticionPutProducto = async () => {

        const resp = await putOfertasProductos(ofertaProducto);

        var productoModificado = data;
        productoModificado.map(producto => {
            if (producto.id === ofertaProducto.id) {
                producto = ofertaProducto
            }
        });
        peticionGet();
        abrirCerrarModalEditar();
        setOfertaProducto({
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
        })
    }

    const peticionDeleteProducto = async () => {

        var i = 0;
        while (i < OfertaProductoEliminar.length) {

            const resp = await deleteOfertasProductos(OfertaProductoEliminar[i]);

            peticionGet();
            abrirCerrarModalEliminar();
            setOfertaProducto({
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

            i++;

        }

        Swal.fire({
            position: 'center',
            icon: 'info',
            title: 'Producto Eliminado',
            text: `El producto se ha eliminado correctamente`,
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

    console.log(rows, "ROWS")

    const abrirCerrarModalInsertar = () => {
        if (modalInsertar) {
            setOfertaProducto({
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
            setModalInsertar(!modalInsertar);
        } else {
            setModalInsertar(!modalInsertar);
        }
    }

    //modal editar cliente
    const abrirCerrarModalEditar = () => {
        if (modalEditar) {
            setOfertaProducto({
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
            setModalEditar(!modalEditar);
        } else {
            setModalEditar(!modalEditar);
        }
    }

    //modal eliminar cliente

    const abrirCerrarModalEliminar = () => {
        if (modalEliminar) {
            setOfertaProducto({
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
            setModalEliminar(!modalEliminar);
        } else {
            setModalEliminar(!modalEliminar);
        }
    }

    const handleChangeProducto = e => {

        const { name, value } = e.target;
        setOfertaProducto(prevState => ({
            ...prevState,
            [e.target.name]: e.target.type === 'number' ? parseInt(e.target.value) : e.target.value
        }));

    }


    const handleSelectRow = (ids) => {

        if (ids.length > 0) {
            setOfertaProducto(data.filter(oferta => oferta.id === ids[0])[0]);
        } else {
            setOfertaProducto(ofertaProducto);
        }
        setRowsIds(ids);
    }

    return (
        <>
            <Grid item xs={3} md={4}>
                <TextField sx={{ width: '100%', marginTop: '25px' }} label="Numero Oferta" name="numeroOferta" type="number" onChange={handleChange} value={ofertaSeleccionada && ofertaSeleccionada.numeroOferta} error={errorOferta} helperText={errorOferta ? 'Este campo es obligatorio' : ' '} />
            </Grid>

            <Grid item xs={6} md={5}>
                <TextField sx={{ width: '100%' }} label="Descripcion" name="descripcion" onChange={handleChange} value={ofertaSeleccionada && ofertaSeleccionada.descripcion} />
            </Grid>

            <Grid item xs={3} md={3}>
                <TextField sx={{ width: '100%', marginTop: '25px' }} label="Pedido" name="pedido" type="number" onChange={handleChange} value={ofertaSeleccionada && ofertaSeleccionada.pedido} error={errorPedido} helperText={errorPedido ? 'Este campo es obligatorio' : ' '} />
            </Grid>

            <Grid item xs={3} md={3}>
                <TextField sx={{ width: '100%' }} label="Referencia" name="referencia" onChange={handleChange} value={ofertaSeleccionada && ofertaSeleccionada.referencia} />
            </Grid>

            <Grid item xs={6} md={3}>
                <Autocomplete
                    disableClearable={true}
                    id="CboClientes"
                    options={clientes}
                    getOptionLabel={option => option.codigo.toString()}
                    defaultValue={codigoClienteEditar[0]}
                    sx={{ width: '100%', marginTop: '25px' }}
                    renderInput={(params) => <TextField {...params} label="Codigo Cliente" name="codigoCliente" error={errorCodigo} helperText={errorCodigo ? 'Este campo es obligatorio' : ' '} />}
                    onChange={(event, value) => setOfertaSeleccionada(prevState => ({
                        ...prevState,
                        codigoCliente: parseInt(value.codigo),
                        contacto1: '',
                        contacto2: '',
                        contacto3: ''
                    }))}
                />
            </Grid>

            <Grid item xs={6} md={6}>
                <TextField
                    id='nombreCliente'
                    label="Nombre Cliente"
                    sx={{ width: '100%' }}
                    value={ofertaSeleccionada && ofertaSeleccionada.nombreCliente}
                    name="nombreCliente"
                    onChange={handleChange}
                />
            </Grid>

            <Grid item xs={12} md={2} style={{ display: 'flex' }}>
                <p> Fecha inicio </p>
            </Grid>
            <Grid item xs={12} md={4}>
                <TextField
                    id="fechainicio"
                    type="date"
                    name="fechaInicio"
                    sx={{ width: '100%', marginTop: '25px' }}
                    onChange={handleChangeFecha}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    error={errorFechaInicio}
                    helperText={errorFechaInicio ? 'Introduzca una fecha' : ' '}
                    value={ofertaSeleccionada && formateandofechas(ofertaSeleccionada.fechaInicio)}
                />
            </Grid>

            <Grid item xs={12} md={2} style={{ display: 'flex' }}>
                <p> Fecha Finalización </p>
            </Grid>
            <Grid item xs={12} md={4}>
                <TextField
                    id="fechafinalizacion"
                    type="date"
                    name="fechaFinalizacion"
                    sx={{ width: '100%', marginTop: '25px' }}
                    onChange={handleChangeFecha}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={ofertaSeleccionada && formateandofechas(ofertaSeleccionada.fechaFinalizacion)}
                    error={errorFechaFinal}
                    helperText={errorFechaFinal ? 'Introduzca una fecha mayor que la de inicio' : ' '}
                />
            </Grid>

            <Grid item xs={4} md={4}>
                <Autocomplete
                    disableClearable={true}
                    id="contacto1"
                    inputValue={ofertaSeleccionada.contacto1}
                    options={contactos}
                    defaultValue={contacto1Editar[0]}
                    filterOptions={options => contactos.filter(contacto => contacto.codigoCliente === ofertaSeleccionada.codigoCliente && contacto.nombre !== ofertaSeleccionada.contacto2)}
                    getOptionLabel={option => option.nombre}
                    sx={{ width: '100%' }}
                    renderInput={(params) => <TextField {...params} name="contacto1" label="Contacto 1" />}
                    onChange={(event, value) => setOfertaSeleccionada(prevState => ({
                        ...prevState,
                        contacto1: value.nombre
                    }))}
                />
            </Grid>

            <Grid item xs={6} md={4}>
                <Autocomplete
                    disableClearable={true}
                    id="contacto2"
                    inputValue={ofertaSeleccionada.contacto2}
                    options={contactos}
                    defaultValue={contacto2Editar[0]}
                    filterOptions={options => contactos.filter(contacto => contacto.codigoCliente === ofertaSeleccionada.codigoCliente && contacto.nombre !== ofertaSeleccionada.contacto1)}
                    getOptionLabel={option => option.nombre}
                    sx={{ width: '100%' }}
                    renderInput={(params) => <TextField {...params} name="contacto2" label="Contacto 2" />}
                    onChange={(event, value) => setOfertaSeleccionada(prevState => ({
                        ...prevState,
                        contacto2: value.nombre
                    }))}
                />
            </Grid>


            <Grid item xs={6} md={4}>
                <Autocomplete
                    disableClearable={true}
                    id="contacto3"
                    inputValue={ofertaSeleccionada.contacto3}
                    options={contactos}
                    defaultValue={contacto3Editar[0]}
                    filterOptions={options => contactos.filter(contacto => contacto.codigoCliente === ofertaSeleccionada.codigoCliente && contacto.nombre !== ofertaSeleccionada.contacto1)}
                    getOptionLabel={option => option.nombre}
                    sx={{ width: '100%' }}
                    renderInput={(params) => <TextField {...params} name="contacto3" label="Contacto 3" />}
                    onChange={(event, value) => setOfertaSeleccionada(prevState => ({
                        ...prevState,
                        contacto3: value.nombre
                    }))}
                />
            </Grid>

            <Grid item xs={6} md={4}>
                <Autocomplete
                    disableClearable={true}
                    id="producto"
                    options={productos}
                    defaultValue={productoEditar[0]}
                    getOptionLabel={option => option.descripcion}
                    sx={{ width: '100%' }}
                    renderInput={(params) => <TextField {...params} name="producto" label="Producto" />}
                    onChange={(event, value) => setOfertaSeleccionada(prevState => ({
                        ...prevState,
                        producto: value.id,
                    }))}
                />
            </Grid>

            <Grid item xs={6} md={4}>
                <TextField sx={{ width: '100%' }} label="Unidades" name="unidades" type='number' onChange={handleChange} value={ofertaSeleccionada && ofertaSeleccionada.unidades} />
            </Grid>

            <Grid item xs={6} md={4}>
                <TextField sx={{ width: '100%' }} label="Precio" name="precio" type='number' onChange={handleChange} value={ofertaSeleccionada && ofertaSeleccionada.precio} />
            </Grid>

            <Grid container spacing={3}>

                <Grid item xs={12}>
                    <Card sx={{ p: 4, display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant='h6'>Productos en Cuota de Contrato</Typography>
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
                                                setOfertaProductoEliminar(rowsIds)
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
                            //components={{ Toolbar: GridToolbar }}
                            localeText={DATAGRID_LOCALE_TEXT}
                            sx={{
                                width: '100%',
                                height: 700,
                                backgroundColor: '#FFFFFF'
                            }}
                            rows={rows}
                            columns={columns}
                            pageSize={6}
                            rowsPerPageOptions={[6]}
                            checkboxSelection
                            disableSelectionOnClick
                            onSelectionModelChange={(ids) => handleSelectRow(ids)}
                            onRowClick={(ofertaProducto, evt) => {
                                setOfertaProducto(ofertaProducto.row)
                                setProductoEditar2(productos.filter(producto => producto.id === ofertaProducto.row.producto))
                                abrirCerrarModalEditar();
                            }}
                        />
                    </Card>
                </Grid>
            </Grid>

            <ModalLayout
                titulo="Agregar nuevo Producto"
                contenido={
                    <InsertarOfertaProductoModal handleChangeProducto={handleChangeProducto} ofertaProducto={ofertaProducto} setOfertaProducto={setOfertaProducto} />
                }
                botones={[
                    insertarBotonesModal(<AddIcon />, 'Insertar', async () => {
                        peticionPostProducto();
                    })
                ]}
                open={modalInsertar}
                onClose={abrirCerrarModalInsertar}
            />

            <ModalLayout
                titulo="Editar Producto"
                contenido={
                    <EditarOfertaProductoModal
                        handleChangeProducto={handleChangeProducto}
                        ofertaProducto={ofertaProducto}
                        setOfertaProducto={setOfertaProducto}
                        productoEditar={productoEditar2}
                    />}
                botones={[insertarBotonesModal(<AddIcon />, 'Guardar', async () => {
                    peticionPutProducto();
                })
                ]}
                open={modalEditar}
                onClose={abrirCerrarModalEditar}
            />

            <ModalLayout
                titulo="Eliminar Producto"
                contenido={
                    <>
                        <Grid item xs={12}>
                            <Typography>Estás seguro que deseas eliminar el producto?</Typography>
                        </Grid>
                    </>
                }
                botones={[
                    insertarBotonesModal(<DeleteIcon />, 'Eliminar', async () => {
                        peticionDeleteProducto();
                    }, 'error')
                ]}
                open={modalEliminar}
                onClose={abrirCerrarModalEliminar}
            />

        </>
    )
}