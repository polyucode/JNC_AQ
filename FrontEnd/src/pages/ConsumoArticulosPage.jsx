import React, { useState, useEffect } from "react";
import { Grid, Card, Typography, Button, TextField, InputAdornment, IconButton } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { MainLayout } from "../layout/MainLayout";
import { ModalLayout } from "../components/ModalLayout";

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';

import { DataGrid } from '@mui/x-data-grid';
import { DATAGRID_LOCALE_TEXT } from '../helpers/datagridLocale';
import { InsertarConsumoModal } from "../components/Modals/InsertarConsumoModal";
import { EditarConsumoModal } from '../components/Modals/EditarConsumoModal';
import { insertarBotonesModal } from '../helpers/insertarBotonesModal';
import { getOfertas, postConsumos, putConsumos, getProductos, getConsumos, getModoEnvio, getClientes, getConsumosById } from "../api";
import './ConsumosArticulos.css'

import Swal from 'sweetalert2';

export const ConsumoArticulosPage = () => {

    const [rowsIds, setRowsIds] = useState([]);
    const [rows, setRows] = useState([]);

    const [modalInsertar, setModalInsertar] = useState(false);

    const [modalEditar, setModalEditar] = useState(false);

    const [modalEliminar, setModalEliminar] = useState(false);

    const [consumoSeleccionado, setConsumoSeleccionado] = useState({
        id: 0,
        oferta: 0,
        nombreCliente: '',
        fecha: null,
        producto: 0,
        descripcionProducto: '',
        cantidad: 0,
        albaran: 0,
        modoEnvio: 0,
        observaciones: '',
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
    const [modoEnvio, setModoEnvio] = useState([]);

    const [clienteEditar, setClienteEditar] = useState([]);
    const [ofertaEditar, setOfertaEditar] = useState([]);
    const [productoEditar, setProductoEditar] = useState([]);
    const [modoEnvioEditar, setModoEnvioEditar] = useState([]);

    const [errorOferta, setErrorOferta] = useState(false);
    const [errorProducto, setErrorProducto] = useState(false);
    const [errorFecha, setErrorFecha] = useState(false);
    const [errorCantidad, setErrorCantidad] = useState(false);

    const [filterText, setFilterText] = useState('');
    const [filterOferta, setFilterOferta] = useState(0);

    const columnas = [

        //Visibles
        { headerName: 'Oferta', field: 'oferta', width: 150 },
        { headerName: 'Nombre Cliente', field: 'nombreCliente', width: 250 },
        {
            headerName: 'Fecha',
            field: 'fecha',
            type: 'date',
            width: 200,
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
        {
            field: 'producto',
            headerName: 'Producto',
            width: 200,
            valueFormatter: (params) => {
                const prod = productos.find((producto) => producto.id === params.value);
                return prod ? prod.descripcion : '';
            }
        },
        { headerName: 'Cantidad', field: 'cantidad', width: 150 },
        { headerName: 'Numero Albaran', field: 'albaran', width: 150 },
        {
            headerName: 'Metodo Entrega',
            field: 'modoEnvio',
            width: 200,
            valueFormatter: (params) => {
                const env = modoEnvio.find((envio) => envio.id === params.value);
                return env ? env.nombre : '';
            }
        },
        { headerName: 'Observaciones', field: 'observaciones', width: 400 }
    ];


    const peticionGet = async () => {
        const resp = await getConsumos();
        const consumosFiltrados = resp.filter(consumo => !consumo.deleted);
        setData(consumosFiltrados);
    }

    useEffect(() => {
        peticionGet();

        getOfertas()
            .then(resp => setOfertas(resp.filter(oferta => !oferta.deleted)));

        getProductos()
            .then(resp => setProductos(resp.filter(producto => !producto.deleted)));

        getModoEnvio()
            .then(resp => setModoEnvio(resp.filter(envio => !envio.deleted)));

        getClientes()
            .then(resp => setClientes(resp.filter(cliente => !cliente.deleted)));

    }, [])

    useEffect(() => {
        if (data.length > 0) {
            setRows(data);
        } else {
            setRows([]);
        }
    }, [data]);


    const peticionPost = async () => {

        if (consumoSeleccionado.oferta !== 0) {
            setErrorOferta(false)
        } else {
            setErrorOferta(true)
        }

        if (consumoSeleccionado.fecha !== null) {
            setErrorFecha(false)
        } else {
            setErrorFecha(true)
        }

        if (consumoSeleccionado.producto !== "") {
            setErrorProducto(false)
        } else {
            setErrorProducto(true)
        }

        if (consumoSeleccionado.cantidad !== 0) {
            setErrorCantidad(false)
        } else {
            setErrorCantidad(true)
        }

        if (consumoSeleccionado.oferta !== 0 && consumoSeleccionado.fecha !== null && consumoSeleccionado.producto !== "" && consumoSeleccionado.cantidad !== 0) {
            consumoSeleccionado.id = 0;
            await postConsumos(consumoSeleccionado);

            peticionGet();

            Swal.fire({
                position: 'center',
                icon: 'info',
                title: 'Consumo Creado',
                text: `El consumo se ha creado correctamente`,
                showConfirmButton: false,
                timer: 2000,
                showClass: {
                    popup: 'animate__animated animate__bounceIn'
                },
                hideClass: {
                    popup: 'animate__animated animate__bounceOut'
                },
                customClass: {
                    popup: 'custom-swal-popup'
                }
            });
        }
    }

    const peticionPut = async () => {

        if (consumoSeleccionado.fecha !== "") {
            setErrorFecha(false)
        } else {
            setErrorFecha(true)
        }

        if (consumoSeleccionado.cantidad !== 0) {
            setErrorCantidad(false)
        } else {
            setErrorCantidad(true)
        }

        if (consumoSeleccionado.fecha !== "" && consumoSeleccionado.cantidad !== 0) {
            await putConsumos(consumoSeleccionado);

            var consumoModificado = data;
            consumoModificado.map(consumo => {
                if (consumo.id === consumoSeleccionado.id) {
                    consumo = consumoSeleccionado
                }
            });
            peticionGet();

            Swal.fire({
                position: 'center',
                icon: 'info',
                title: 'Consumo Editado',
                text: `El consumo se ha editado correctamente`,
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
        while (i < ConsumoEliminar.length) {

            const resp = await getConsumosById(ConsumoEliminar[i]);
            resp.deleted = true;

            await putConsumos(resp);

            peticionGet();
            abrirCerrarModalEliminar();
            setConsumoSeleccionado({
                id: 0,
                oferta: 0,
                fecha: null,
                producto: 0,
                descripcionProducto: '',
                cantidad: 0,
                albaran: 0,
                modoEnvio: 0,
                observaciones: '',
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
            title: 'Consumo Eliminado',
            text: `El consumo se ha eliminado correctamente`,
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
        setErrorFecha(false)
        setErrorCantidad(false)
        setErrorOferta(false)
        setErrorProducto(false)
        if (modalInsertar) {
            setConsumoSeleccionado({
                id: 0,
                oferta: 0,
                fecha: null,
                producto: 0,
                descripcionProducto: '',
                cantidad: 0,
                albaran: 0,
                modoEnvio: 0,
                observaciones: '',
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
        setErrorFecha(false)
        setErrorCantidad(false)
        setErrorOferta(false)
        setErrorProducto(false)
        if (modalEliminar) {
            setConsumoSeleccionado({
                id: 0,
                oferta: 0,
                fecha: null,
                producto: 0,
                descripcionProducto: '',
                cantidad: 0,
                albaran: 0,
                modoEnvio: 0,
                observaciones: '',
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
        setErrorFecha(false)
        setErrorCantidad(false)
        setErrorOferta(false)
        setErrorProducto(false)
        if (modalEditar) {
            setConsumoSeleccionado({
                id: 0,
                oferta: 0,
                fecha: null,
                producto: 0,
                descripcionProducto: '',
                cantidad: 0,
                albaran: 0,
                modoEnvio: 0,
                observaciones: '',
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

    const handleFilterChange = (event) => {
        setFilterText(event.target.value);
    };

    const handleFilterOferta = (event) => {
        if(event.target.innerText !== undefined){
            setFilterOferta(parseInt(event.target.innerText));
        } else{
            setFilterOferta(0)
        }        
    };

    const filteredData = rows.filter(item =>
        item.nombreCliente.toLowerCase().includes(filterText.toLowerCase()) &&
        (filterOferta !== 0 ? item.oferta === filterOferta : true)
    );

    return (
        <>
            <MainLayout title='Consumos'>

                <Grid container spacing={2}>

                    {/* Título y botones de opción */}
                    <Grid item xs={12}>
                        <Card sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant='h6'>Listado de Consumos</Typography>
                            <Grid item xs={4}>
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
                            <Grid item xs={3}>
                                <Autocomplete
                                    sx={{ width: '50%' }}
                                    id="Oferta"
                                    options={ofertas}
                                    getOptionLabel={option => option.numeroOferta.toString()}
                                    renderInput={(params) => <TextField {...params} label="Filtrar por oferta" name="oferta" />}
                                    onChange={handleFilterOferta}
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
                                                    setConsumoEliminar(rowsIds)
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
                                localeText={DATAGRID_LOCALE_TEXT}
                                sx={{
                                    width: '100%',
                                    height: 1000,
                                    backgroundColor: '#FFFFFF'
                                }}
                                rows={filteredData}
                                columns={columnas}
                                checkboxSelection
                                disableSelectionOnClick
                                onSelectionModelChange={(ids) => handleSelectRow(ids)}
                                onRowClick={(consumoSeleccionado, evt) => {
                                    setConsumoSeleccionado(consumoSeleccionado.row)
                                    setProductoEditar(productos.filter(producto => producto.id === consumoSeleccionado.row.producto))
                                    setOfertaEditar(ofertas.filter(oferta => oferta.numeroOferta === consumoSeleccionado.row.oferta))
                                    setClienteEditar(clientes.filter(cliente => cliente.razonSocial === consumoSeleccionado.row.nombreCliente))
                                    setModoEnvioEditar(modoEnvio.filter(envio => envio.id === consumoSeleccionado.row.modoEnvio))
                                    abrirCerrarModalEditar();
                                }}
                            />
                        </Card>
                    </Grid>

                    <ModalLayout
                        titulo="Agregar nuevo consumo"
                        contenido={
                            <InsertarConsumoModal
                                change={handleChange}
                                setConsumoSeleccionado={setConsumoSeleccionado}
                                consumoSeleccionado={consumoSeleccionado}
                                ofertas={ofertas}
                                clientes={clientes}
                                productos={productos}
                                errorCantidad={errorCantidad}
                                errorFecha={errorFecha}
                                errorOferta={errorOferta}
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
                            modoEnvioEditar={modoEnvioEditar}
                            ofertas={ofertas}
                            productos={productos}
                            clientes={clientes}
                            errorFecha={errorFecha}
                            errorCantidad={errorCantidad}
                            clienteEditar={clienteEditar}
                        />}
                    botones={[insertarBotonesModal(<AddIcon />, 'Guardar', async () => {
                        peticionPut();
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
                            peticionDelete();
                        }, 'error'),
                    ]}
                    open={modalEliminar}
                    onClose={abrirCerrarModalEliminar}
                />
            </MainLayout>
        </>

    )
}