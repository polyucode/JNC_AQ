import React, { useState, useEffect, useContext } from 'react';
import { Grid, Card, Typography, Button, TextField, Autocomplete } from '@mui/material';
import { getContactos, getClientes, getProductos, getConsumos, getOfertasProductosById, getOfertasProductos, getOfertasProductosByOfertaId, 
    postOfertasProductos, putOfertasProductos, getOfertasContactosByOfertaId
 } from '../../api';

import { DataGrid } from '@mui/x-data-grid';
import { DATAGRID_LOCALE_TEXT } from '../../helpers/datagridLocale';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { InsertarOfertaProductoModal } from './InsertarOfertaProductoModal';
import { EditarOfertaProductoModal } from './EditarOfertaProductoModal';

import { ModalLayout } from "../ModalLayout";

import Swal from 'sweetalert2';
import { insertarBotonesModal } from '../../helpers/insertarBotonesModal';
import { MostrarConsumoModal } from './MostrarConsumoModal';
import { ModalLayout3 } from '../ModalLayout3';
import { ModalLayout2 } from '../ModalLayout2';
import { AuthContext } from '../../context/AuthContext';

import '../../pages/OfertasClientes.css'

export const EditarOfertaModal = ({ change: handleChange, ofertaSeleccionada, setOfertaSeleccionada, handleChangeFecha, codigoClienteEditar, errorCodigo, errorFechaFinal, errorFechaInicio, errorPedido, errorOferta, setOfertaContactosSeleccionados, setOfertaProductosSeleccionados }) => {

    const [contactos, setContactos] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [productos, setProductos] = useState([]);
    const [consumos, setConsumos] = useState([]);
    const [ofertaContactos, setOfertaContactos] = useState([]);
    const [productosAsociados, setProductosAsociados] = useState([]);

    const [inputCodigoCliente, setInputCodigoCliente] = useState('');
    const [inputNombreCliente, setInputNombreCliente] = useState('');

    const [productoEditar2, setProductoEditar2] = useState([]);

    const [ofertaProducto, setOfertaProducto] = useState({
        id: 0,
        idOferta: 0,
        idProducto: 0,
        precio: 0,
        unidades: 0,
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

    const [modalInsertar, setModalInsertar] = useState(false);
    const [modalEditar, setModalEditar] = useState(false);
    const [modalEliminar, setModalEliminar] = useState(false);
    const [modalConsumo, setModalConsumo] = useState(false);

    const [errorProductoPrecio, setErrorProductoPrecio] = useState(false);

    const { user } = useContext(AuthContext);


    const columns = [
        {
            field: 'idProducto',
            headerName: 'Productos',
            width: 350,
            valueFormatter: (params) => {
                const prod = productos.find((producto) => producto.id === params.value);
                return prod ? prod.descripcion : '';
            }
        },
        {
            field: 'precio',
            headerName: 'Precio Unitario',
            width: 150,
            valueFormatter: (params) => {
                if (params.value !== 0 && params.value !== null && params.value !== undefined) {
                    const formattedValue = String(params.value).replace(".", ",");
                    return formattedValue;
                } else {
                    return params.value === 0 ? '0' : '';
                }
            }
        },
        { field: 'unidades', headerName: 'Unidades', width: 150 },
        {
            field: 'consumidos',
            headerName: 'Consumidos',
            width: 150,
            valueGetter: (params) => {
                const ofertaProductoKey = `${ofertaSeleccionada.numeroOferta}_${params.row.idProducto}`;
                const consumoInfo = consumos[ofertaProductoKey];
                return consumoInfo ? consumoInfo.totalCantidad : 0;
            }
        },
        {
            field: 'pendientes',
            headerName: 'Pendientes',
            width: 200,
            valueGetter: (params) => {
                const cantidad = params.row.unidades;
                const ofertaProductoKey = `${ofertaSeleccionada.numeroOferta}_${params.row.idProducto}`;
                const consumoInfo = consumos[ofertaProductoKey];
                const consumidos = consumoInfo ? consumoInfo.totalCantidad : 0;
                const pendientes = cantidad - consumidos;
                return pendientes >= 0 ? pendientes : pendientes;
            },
            cellClassName: (params) => {
                return params.value < 0 ? 'negative-value' : '';
            }
        },
    ]

    useEffect(() => {

        peticionGet();

        getContactos()
            .then(resp => setContactos(resp.filter(contacto => !contacto.deleted)));

        getClientes()
            .then(resp => setClientes(resp.filter(cliente => !cliente.deleted)));

        getProductos()
            .then(resp => setProductos(resp.filter(producto => !producto.deleted)));

        getConsumos()
            .then(consumos => {
                const consumosFiltrados = consumos.filter(consumo => !consumo.deleted)
                const sumByOfferAndProduct = sumarCantidadesPorOfertaYProducto(consumosFiltrados);
                setConsumos(sumByOfferAndProduct);
            })
        getOfertasContactosByOfertaId(ofertaSeleccionada.id)
            .then(ofertaContactos => {
                const ofertaContactoFiltrada = ofertaContactos.filter(oferta => !oferta.deleted)
                setOfertaContactos(ofertaContactoFiltrada);
                setOfertaContactosSeleccionados(ofertaContactoFiltrada);
            });

        GetOfertasProductosByOfertaId(ofertaSeleccionada.id)

    }, [])

    const GetOfertasProductosByOfertaId = async (id) => {

        const resp = await getOfertasProductosByOfertaId(id)
        const ofertaProductoFiltrada = resp.filter(oferta => !oferta.deleted)
        setProductosAsociados(ofertaProductoFiltrada)
        setOfertaProductosSeleccionados(ofertaProductoFiltrada);
    }

    const peticionGet = async () => {

        const resp = await getOfertasProductos();
        setData(resp.filter(oferta => oferta.idOferta === ofertaSeleccionada.id && !oferta.deleted))

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

    const sumarCantidadesPorOfertaYProducto = (consumos) => {
        return consumos.reduce((acc, consumo) => {
            const key = `${consumo.oferta}_${consumo.producto}`;
            if (!acc[key]) {
                acc[key] = {
                    oferta: consumo.oferta,
                    producto: consumo.producto,
                    totalCantidad: 0
                };
            }
            acc[key].totalCantidad += consumo.cantidad;
            return acc;
        }, {});
    };

    const peticionPostProducto = async () => {

        ofertaProducto.id = 0;
        ofertaProducto.idOferta = ofertaSeleccionada.id;

        await postOfertasProductos(ofertaProducto);
        peticionGet();
        GetOfertasProductosByOfertaId(ofertaSeleccionada.id)

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

        const decimalRegex = /^-?\d+(\,\d{1,2})?|\.\d{1,2}$/;
        if (decimalRegex.test(ofertaProducto.precio)) {
            const normalizedValue = normalizeDecimal(ofertaProducto.precio);
            const decimalSeparator = normalizedValue.includes(',') ? ',' : '.';
            const decimalPart = normalizedValue.split(decimalSeparator)[1] || '';
            if (decimalPart.length > 2) {
                setErrorProductoPrecio(true);
            } else {
                setErrorProductoPrecio(false);
                ofertaProducto.precio = Number(normalizedValue.replace(',', '.')) || 0

                await putOfertasProductos(ofertaProducto);

                var productoModificado = data;
                productoModificado.map(producto => {
                    if (producto.id === ofertaProducto.id) {
                        producto = ofertaProducto
                    }
                });
                peticionGet();
                GetOfertasProductosByOfertaId(ofertaSeleccionada.id)

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

        }
    }

    const peticionDeleteProducto = async () => {

        var i = 0;
        while (i < OfertaProductoEliminar.length) {

            const resp = await getOfertasProductosById(OfertaProductoEliminar[i]);
            resp.deleted = true;

            await putOfertasProductos(resp)

            peticionGet();
            GetOfertasProductosByOfertaId(ofertaSeleccionada.id)
            abrirCerrarModalEliminar();
            setOfertaProducto({
                id: 0,
                idOferta: 0,
                idProducto: 0,
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

    const abrirCerrarModalInsertar = () => {
        if (modalInsertar) {
            setOfertaProducto({
                id: 0,
                idOferta: 0,
                idProducto: 0,
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
                idOferta: 0,
                idProducto: 0,
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
                idOferta: 0,
                idProducto: 0,
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

    const abrirCerrarModalConsumo = () => {
        if (modalConsumo) {
            setModalConsumo(!modalConsumo);
        } else {
            setModalConsumo(!modalConsumo);
        }
    }

    const handleChangeProducto = e => {
        setOfertaProducto(prevState => ({
            ...prevState,
            [e.target.name]: e.target.type === 'number' ? parseInt(e.target.value) : e.target.value
        }));
    }

    const handleChangeProductoAsociado = (event, producto) => {
        const { name, value } = event.target;
        let productosModificado = productosAsociados.map((elemento) => {
            if (elemento.idProducto === producto.idProducto) {
                return { ...elemento, [name]: event.target.type === 'number' ? parseInt(value) : value };
            }
            return elemento;
        });

        setProductosAsociados(productosModificado);
        setOfertaProductosSeleccionados(productosModificado);
    };

    const handleChangeDecimal = (event) => {
        const { value } = event.target;
        const decimalRegex = /^-?\d+(\,\d{1,2})?|\.\d{1,2}$/;
        if (decimalRegex.test(value)) {
            const normalizedValue = normalizeDecimal(value);
            const decimalSeparator = normalizedValue.includes(',') ? ',' : '.';
            const decimalPart = normalizedValue.split(decimalSeparator)[1] || '';
            if (decimalPart.length > 2) {
                setErrorProductoPrecio(true);
            } else {
                setErrorProductoPrecio(false);
                setOfertaProducto(prevState => ({
                    ...prevState,
                    precio: Number(normalizedValue.replace(',', '.')) || 0
                }));
            }
        }
    };


    const normalizeDecimal = (value) => {
        if (typeof value !== 'string') {
            value = String(value);
        }

        return value.replace('.', ',');
    };


    const handleSelectRow = (ids) => {

        if (ids.length > 0) {
            setOfertaProducto(data.filter(oferta => oferta.id === ids[0])[0]);
        } else {
            setOfertaProducto(ofertaProducto);
        }
        setRowsIds(ids);
    }
    //AMF INI
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

    function handleCambiarContactoSeleccionado(contacto, nuevoContacto) {
        let contactosModificado = [];
        if (nuevoContacto === null) {
            contactosModificado = ofertaContactos.filter((element) => element.idContacto !== contacto.idContacto)
        } else {
            ofertaContactos.map((elemento) => {
                if (elemento.idContacto === contacto.idContacto) {
                    elemento.idContacto = nuevoContacto.id;
                }
                contactosModificado.push(elemento);
            })
        }

        // const contactoModificado = ofertaContactos.filter((element) => element.idContacto === contacto.idContacto)[0].idContacto = nuevoContacto.id;
        setOfertaContactos(contactosModificado);
        setOfertaContactosSeleccionados(contactosModificado);

    }

    function handleAddContacto() {

        if (contactos.filter((contacto) => contacto.codigoCliente === ofertaSeleccionada.codigoCliente && !contacto.deleted).length === ofertaContactos.length) {
            Swal.fire({
                position: 'center',
                icon: 'info',
                title: 'Error',
                text: `No hay mas contactos disponibles`,
                showConfirmButton: false,
                timer: 2000,
                showClass: {
                    popup: 'animate__animated animate__bounceIn'
                },
                hideClass: {
                    popup: 'animate__animated animate__bounceOut'
                }
            });
            return;
        }

        let contactoVacio = {
            id: 0,
            idOferta: ofertaSeleccionada.id,
            idContacto: 0,
            addDate: null,
            addIdUser: null,
            modDate: null,
            modIdUser: null,
            delDate: null,
            delIdDate: null,
            deleted: false
        }
        let users = [];
        ofertaContactos.map((e) => {
            users.push(e)
        })
        users.push(contactoVacio)
        setOfertaContactos(users);
        setOfertaContactosSeleccionados(users);
    }
    function comprobarContactoSeleccionado(contacto, options) {
        if (contacto.codigoCliente === ofertaSeleccionada.codigoCliente) {
            let idsContactosSeleccionados = [];
            ofertaContactos.map((oferCon) => {
                idsContactosSeleccionados.push(oferCon.idContacto);
            })
            if (idsContactosSeleccionados.includes(contacto.id)) {
                return false;
            } else {
                return true;
            }
        } else {
            return false;
        }
    }

    function handleAddProducto() {

        let productoVacio = {
            id: 0,
            idOferta: ofertaSeleccionada.id,
            idProducto: 0,
            unidades: 0,
            precio: 0,
            addDate: null,
            addIdUser: null,
            modDate: null,
            modIdUser: null,
            delDate: null,
            delIdDate: null,
            deleted: false
        }
        let productos = [];
        productosAsociados.map((e) => {
            productos.push(e)
        })
        productos.push(productoVacio)
        setProductosAsociados(productos);
        setOfertaProductosSeleccionados(productos)
    }

    function comprobarProductoSeleccionado(producto, options) {
        let idsProductosSeleccionados = [];
        productosAsociados.map((prod) => {
            idsProductosSeleccionados.push(prod.idProducto);
        })
        if (idsProductosSeleccionados.includes(producto.id)) {
            return false;
        } else {
            return true;
        }
    }

    function handleCambiarProductoSeleccionado(producto, nuevoProducto) {
        let productosModificado = [];
        if (nuevoProducto === null) {
            productosModificado = productosAsociados.filter((element) => element.idProducto !== producto.idProducto)
        } else {
            productosAsociados.map((elemento) => {
                if (elemento.idProducto === producto.idProducto) {
                    elemento.idProducto = nuevoProducto.id;
                }
                productosModificado.push(elemento);
            })
        }

        setProductosAsociados(productosModificado);
        setOfertaProductosSeleccionados(productosModificado)

    }

    return (
        <>
            <Grid item xs={3} md={4}>
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
                    label="Numero Oferta"
                    name="numeroOferta"
                    type="number"
                    onChange={handleChange}
                    value={ofertaSeleccionada && ofertaSeleccionada.numeroOferta}
                    error={errorOferta}
                    helperText={errorOferta ? 'Este campo es obligatorio' : ' '}
                />
            </Grid>

            <Grid item xs={6} md={5}>
                <TextField sx={{ width: '100%' }} label="Descripcion" name="descripcion" onChange={handleChange} value={ofertaSeleccionada && ofertaSeleccionada.descripcion} />
            </Grid>

            <Grid item xs={3} md={3}>
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
                    label="Pedido"
                    name="pedido"
                    type="number"
                    onChange={handleChange}
                    value={ofertaSeleccionada && ofertaSeleccionada.pedido}
                    error={errorPedido}
                    helperText={errorPedido ? 'Este campo es obligatorio' : ' '}
                />
            </Grid>

            <Grid item xs={3} md={3}>
                <TextField sx={{ width: '100%' }} label="Referencia Cliente" name="referencia" onChange={handleChange} value={ofertaSeleccionada && ofertaSeleccionada.referencia} />
            </Grid>

            <Grid item xs={6} md={3}>
                <Autocomplete
                    disableClearable={true}
                    id="CboClientes"
                    options={clientes}
                    filterOptions={options => clientes.filter((cliente) => filtrarCodigoCliente(cliente))}
                    getOptionLabel={option => option.codigo.toString()}
                    defaultValue={codigoClienteEditar[0]}
                    sx={{ width: '100%', marginTop: '25px' }}
                    renderInput={(params) => <TextField {...params} label="Codigo Cliente" name="codigoCliente" error={errorCodigo} helperText={errorCodigo ? 'Este campo es obligatorio' : ' '} />}
                    onChange={(event, value) => setOfertaSeleccionada(prevState => ({
                        ...prevState,
                        codigoCliente: parseInt(value.codigo),
                        nombreCliente: value ? value.razonSocial : null
                    }))}
                    onInputChange={(event, newInputValue) => {
                        setInputCodigoCliente(newInputValue);
                    }}
                    inputValue={inputCodigoCliente}
                />
            </Grid>

            <Grid item xs={6} md={6}>
                <Autocomplete
                    disableClearable={true}
                    id="nombreCliente"
                    options={clientes}
                    value={clientes.find(cliente => cliente.razonSocial === ofertaSeleccionada.nombreCliente && !cliente.deleted) || null}
                    filterOptions={options => clientes.filter((cliente) => filtrarNombreCliente(cliente))}
                    onInputChange={(event, newInputValue) => {
                        setInputNombreCliente(newInputValue);
                    }}
                    getOptionLabel={option => option.razonSocial}
                    sx={{ width: '100%' }}
                    renderInput={(params) => <TextField {...params} label="Nombre Cliente" name="nombreCliente" />}
                    onChange={(event, value) => setOfertaSeleccionada(prevState => ({
                        ...prevState,
                        codigoCliente: value ? parseInt(value.codigo) : null,
                        nombreCliente: value ? value.razonSocial : null
                    }))}
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
            <Grid item xs={12} md={12}>
                <Button
                    sx={{ mr: 2 }}
                    startIcon={<AddIcon />}
                    onClick={() => {
                        handleAddContacto();
                    }}
                >
                    Añadir contacto
                </Button>
            </Grid>
            {
                ofertaContactos.map((ofertaContacto, index) => {
                    let con = contactos.filter(contacto => contacto.id === ofertaContacto.idContacto)[0];
                    if (con !== undefined) {
                        return <Grid item xs={4} md={4}>
                            <Autocomplete
                                key={con.id}
                                inputValue={con.nombre}
                                options={contactos}
                                defaultValue={con.nombre}
                                filterOptions={options => contactos.filter(contacto => comprobarContactoSeleccionado(contacto, options) && !contacto.deleted)}
                                getOptionLabel={(option) => option.nombre || ''}
                                sx={{ width: '100%' }}
                                renderInput={(params) => <TextField {...params} name="contacto" label="Contacto" />}
                                onChange={(event, value) => handleCambiarContactoSeleccionado(ofertaContacto, value)}
                            />
                        </Grid>
                    } else {
                        return <Grid item xs={4} md={4}>
                            <Autocomplete
                                key={index}
                                options={contactos}
                                filterOptions={options => contactos.filter(contacto => comprobarContactoSeleccionado(contacto) && !contacto.deleted)}
                                getOptionLabel={(option) => option.nombre || ''}
                                sx={{ width: '100%' }}
                                renderInput={(params) => <TextField {...params} name="contacto" label="Contacto" />}
                                onChange={(event, value) => handleCambiarContactoSeleccionado(ofertaContacto, value)}
                            />
                        </Grid>
                    }

                })
            }

            <Grid item xs={12} md={12}>
                <Button
                    sx={{ mr: 2 }}
                    startIcon={<AddIcon />}
                    onClick={() => {
                        handleAddProducto();
                    }}
                >
                    Añadir Producto
                </Button>

            </Grid>
            {
                productosAsociados.map((producto, index) => {
                    let pro = productos.filter(prod => prod.id === producto.idProducto)[0];
                    return (
                        <React.Fragment key={index}>
                            <Grid item xs={6} md={4}>
                                <Autocomplete
                                    key={pro ? pro.id : index}
                                    disableClearable={true}
                                    id="producto"
                                    options={productos}
                                    inputValue={pro ? pro.descripcion : ''}
                                    filterOptions={options => productos.filter(producto => comprobarProductoSeleccionado(producto, options) && !producto.deleted)}
                                    getOptionLabel={option => option.descripcion}
                                    sx={{ width: '100%' }}
                                    renderInput={(params) => <TextField {...params} name="producto" label="Producto" />}
                                    onChange={(event, value) => handleCambiarProductoSeleccionado(producto, value)}
                                />
                            </Grid>

                            <Grid item xs={6} md={4}>
                                <TextField
                                    sx={{ 
                                        width: '100%',  
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
                                    label="Unidades"
                                    name="unidades"
                                    type='number'
                                    onChange={(event) => handleChangeProductoAsociado(event, producto)}
                                    value={producto.unidades || ''}
                                />
                            </Grid>

                            <Grid item xs={6} md={4}>
                                <TextField
                                    sx={{ width: '100%' }}
                                    label="Precio Unitario"
                                    name="precio"
                                    onChange={(event) => handleChangeProductoAsociado(event, producto)}
                                    value={(producto && producto.precio) || ''}
                                />
                            </Grid>
                        </React.Fragment>
                    )

                })
            }

            {user.idPerfil === 1 ?
                <>
                    <Grid container spacing={3}>

                        <Grid item xs={12}>
                            <Card sx={{ p: 4, display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
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
                                    localeText={DATAGRID_LOCALE_TEXT}
                                    sx={{
                                        width: '100%',
                                        height: 700,
                                        backgroundColor: '#FFFFFF'
                                    }}
                                    rows={productosAsociados}
                                    columns={columns}
                                    pageSize={6}
                                    rowsPerPageOptions={[6]}
                                    checkboxSelection
                                    disableSelectionOnClick
                                    onSelectionModelChange={(ids) => handleSelectRow(ids)}
                                    onRowClick={(ofertaProducto, evt) => {
                                        const clickedColumn = evt.target.dataset.field;
                                        if (clickedColumn === 'consumidos') {
                                            setOfertaProducto(ofertaProducto.row)
                                            setProductoEditar2(productos.filter(producto => producto.id === ofertaProducto.row.idProducto))
                                            abrirCerrarModalConsumo();
                                        } else {
                                            setOfertaProducto(ofertaProducto.row)
                                            setProductoEditar2(productos.filter(producto => producto.id === ofertaProducto.row.idProducto))
                                            abrirCerrarModalEditar();
                                        }
                                    }}
                                />
                            </Card>
                        </Grid>
                    </Grid>

                    <ModalLayout
                        titulo="Agregar nuevo Producto"
                        contenido={
                            <InsertarOfertaProductoModal 
                                handleChangeProducto={handleChangeProducto}
                                setOfertaProducto={setOfertaProducto}
                                handleChangeDecimal={handleChangeDecimal}
                                errorProductoPrecio={errorProductoPrecio}
                            />
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
                                consumos={consumos}
                                ofertaSeleccionada={ofertaSeleccionada}
                                errorProductoPrecio={errorProductoPrecio}
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
                :
                <>
                    <Grid container spacing={3}>

                        <Grid item xs={12}>
                            <Card sx={{ p: 4, display: 'flex', justifyContent: 'space-between' }}>
                                <Typography variant='h6'>Productos en Cuota de Contrato</Typography>
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
                                    rows={productosAsociados}
                                    columns={columns}
                                    pageSize={6}
                                    rowsPerPageOptions={[6]}
                                    checkboxSelection
                                    disableSelectionOnClick
                                    onSelectionModelChange={(ids) => handleSelectRow(ids)}
                                    onRowClick={(ofertaProducto, evt) => {
                                        const clickedColumn = evt.target.dataset.field;
                                        if (clickedColumn === 'consumidos') {
                                            setOfertaProducto(ofertaProducto.row)
                                            abrirCerrarModalConsumo();
                                        } else {
                                            setOfertaProducto(ofertaProducto.row)
                                            setProductoEditar2(productos.filter(producto => producto.id === ofertaProducto.row.producto))
                                            abrirCerrarModalEditar();
                                        }
                                    }}
                                />
                            </Card>
                        </Grid>
                    </Grid>

                    <ModalLayout2
                        titulo="Editar Producto"
                        contenido={
                            <EditarOfertaProductoModal
                                handleChangeProducto={handleChangeProducto}
                                ofertaProducto={ofertaProducto}
                                setOfertaProducto={setOfertaProducto}
                                productoEditar={productoEditar2}
                                consumos={consumos}
                                ofertaSeleccionada={ofertaSeleccionada}
                            />}
                        botones={[insertarBotonesModal(<AddIcon />, 'Guardar', async () => {
                            peticionPutProducto();
                        })
                        ]}
                        open={modalEditar}
                        onClose={abrirCerrarModalEditar}
                    />

                </>

            }


            <ModalLayout3
                titulo="Detalle Consumo"
                contenido={
                    <MostrarConsumoModal ofertaProducto={ofertaProducto} ofertaSeleccionada={ofertaSeleccionada} productoEditar={productoEditar2} />
                }
                open={modalConsumo}
                onClose={abrirCerrarModalConsumo}
            />

        </>
    )
}