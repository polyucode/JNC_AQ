import React, { useState, useEffect } from 'react';
import { Grid, TextField, Autocomplete, Button } from '@mui/material';
import { getClientes, getContactos, getProductos } from '../../api';
import Swal from 'sweetalert2';
import AddIcon from '@mui/icons-material/Add';

export const InsertarOfertaModal = ({ change: handleChange, ofertaSeleccionada, setOfertaSeleccionada, handleChangeFecha, errorCodigo, errorFechaFinal, errorFechaInicio, errorPedido, errorOferta, setOfertaContactosSeleccionados, setOfertaProductosSeleccionados }) => {

    const [contactos, setContactos] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [productos, setProductos] = useState([]);
    const [ofertaContactos, setOfertaContactos] = useState([]);
    const [productosAsociados, setProductosAsociados] = useState([]);

    const [inputCodigoCliente, setInputCodigoCliente] = useState('');
    const [inputNombreCliente, setInputNombreCliente] = useState('');

    useEffect(() => {

        getContactos()
            .then(resp => setContactos(resp.filter(contacto => !contacto.deleted)));

        getClientes()
            .then(resp => setClientes(resp.filter(cliente => !cliente.deleted)));

        getProductos()
            .then(resp => setProductos(resp.filter(producto => !producto.deleted)));

    }, [])

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

        setOfertaContactos(contactosModificado);
        setOfertaContactosSeleccionados(contactosModificado);

    }

    function handleAddContacto() {

        if (contactos.filter((contacto) => contacto.codigoCliente === ofertaSeleccionada.codigoCliente).length === ofertaContactos.length) {
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
    function comprobarContactoSeleccionado(contacto) {
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
                    error={errorOferta}
                    helperText={errorOferta ? 'Este campo es obligatorio' : ' '}
                />
            </Grid>

            <Grid item xs={6} md={5}>
                <TextField sx={{ width: '100%' }} label="Descripcion" name="descripcion" onChange={handleChange} />
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
                    error={errorPedido} helperText={errorPedido ? 'Este campo es obligatorio' : ' '}
                />
            </Grid>

            <Grid item xs={3} md={3}>
                <TextField sx={{ width: '100%' }} label="Referencia Cliente" name="referencia" onChange={handleChange} />
            </Grid>

            <Grid item xs={6} md={3}>
                <Autocomplete
                    id="CodigoCliente"
                    options={clientes}
                    value={clientes.find(cliente => cliente.codigo === ofertaSeleccionada.codigoCliente) || null}
                    inputValue={inputCodigoCliente}
                    filterOptions={options => clientes.filter((cliente) => filtrarCodigoCliente(cliente))}
                    onInputChange={(event, newInputValue) => {
                        setInputCodigoCliente(newInputValue);
                    }}
                    getOptionLabel={option => option.codigo.toString()}
                    sx={{ width: '100%', marginTop: '25px' }}
                    renderInput={(params) => <TextField {...params} label="CodigoCliente" name="codigoCliente" error={errorCodigo} helperText={errorCodigo ? 'Este campo es obligatorio' : ' '} />}

                    onChange={(event, value) => setOfertaSeleccionada(prevState => ({
                        ...prevState,
                        codigoCliente: value ? parseInt(value.codigo) : null,
                        nombreCliente: value ? value.razonSocial : null
                    }))}
                />
            </Grid>

            <Grid item xs={6} md={6}>
                <Autocomplete
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
                />
            </Grid>

            <Grid item xs={12} md={2} style={{ display: 'flex' }}>
                <p> Fecha Finalización </p>
            </Grid>
            <Grid item xs={8} md={4}>
                <TextField
                    id="fechafinalizacion"
                    type="date"
                    name="fechaFinalizacion"
                    sx={{ width: '100%', marginTop: '25px' }}
                    onChange={handleChangeFecha}
                    InputLabelProps={{
                        shrink: true,
                    }}
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
                                filterOptions={options => contactos.filter(contacto => comprobarContactoSeleccionado(contacto))}
                                getOptionLabel={option => option.nombre || ''}
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
                                filterOptions={options => contactos.filter(contacto => comprobarContactoSeleccionado(contacto))}
                                getOptionLabel={option => option.nombre || ''}
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
                            <Grid item xs={3} md={4}>
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

                            <Grid item xs={3} md={4}>
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

                            <Grid item xs={3} md={4}>
                                <TextField
                                    sx={{ width: '100%' }}
                                    label="Precio"
                                    name="precio"
                                    onChange={(event) => handleChangeProductoAsociado(event, producto)}
                                    value={producto.precio || ''}
                                />
                            </Grid>
                        </React.Fragment>
                    )

                })
            }

        </>
    )
}