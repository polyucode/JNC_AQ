import { useState, useEffect } from 'react';
import { Grid, TextField, Autocomplete, TextareaAutosize } from '@mui/material';
import { getModoEnvio, getOfertasProductos } from '../../api';

export const InsertarConsumoModal = ({ change: handleChange, setConsumoSeleccionado, consumoSeleccionado, ofertas, clientes, productos, errorCantidad, errorOferta, errorProducto, errorFecha }) => {

    const [modoEnvio, setModoEnvio] = useState([]);

    const [productosSeleccionables, setProductosSeleccionables] = useState([]);
    const [codigoClienteSeleccionado, setCodigoClienteSeleccionado] = useState('');

    const [inputNombreCliente, setInputNombreCliente] = useState('');
    useEffect(() => {

        getModoEnvio()
            .then(resp => setModoEnvio(resp.filter(envio => !envio.deleted)));
    }, [])

    useEffect(() =>{
        if(consumoSeleccionado.oferta !== 0){
            CargarProductosSeleccionables();
        }
    }, [codigoClienteSeleccionado, consumoSeleccionado.oferta]);

    function ModificarCodigoClienteSeleccionado(value){
        setCodigoClienteSeleccionado(value.codigo);
        setConsumoSeleccionado(prevState => ({
            ...prevState,
            nombreCliente: value.razonSocial,
            oferta: parseInt(value.numeroOferta),
            producto: ''
        }))
    };

    function ModificarOfertaSeleccionada(value){
        setCodigoClienteSeleccionado(value.codigoCliente)
        setConsumoSeleccionado(prevState => ({
            ...prevState,
            codigoCliente: value.codigoCliente,
            nombreCliente: value.nombreCliente,
            oferta: parseInt(value.numeroOferta)
        }))
    }

    async function CargarProductosSeleccionables(){
        if (codigoClienteSeleccionado.toString() !== '' && consumoSeleccionado.oferta.toString() !== '') {
            const resp = await getOfertasProductos();
            const oferta = ofertas.filter(ofer => ofer.numeroOferta === consumoSeleccionado.oferta && !ofer.deleted)[0]
            const filtrados = resp.filter((producto) => producto.idOferta === oferta.id && !producto.deleted);
            const idFiltrados = filtrados.map(producto => producto.idProducto);
            setProductosSeleccionables(productos.filter((producto) => idFiltrados.includes(producto.id)));
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
                    id="nombreCliente"
                    options={clientes}
                    value={clientes.find(cliente => cliente.razonSocial === consumoSeleccionado.nombreCliente) || null}
                    filterOptions={options => clientes.filter((cliente) => filtrarNombreCliente(cliente))}
                    onInputChange={(event, newInputValue) => {
                        setInputNombreCliente(newInputValue);
                    }}
                    getOptionLabel={option => option.razonSocial}
                    renderInput={params => <TextField {...params} label="Nombre cliente" name="nombreCliente" />}
                    onChange={(event, value) => ModificarCodigoClienteSeleccionado(value)}
                />
            </Grid>

            <Grid item xs={3} md={3}>
                <Autocomplete
                    disableClearable={true}
                    sx={{ width: '100%', marginTop: '25px' }}
                    id="Oferta"
                    options={ofertas}
                    value={ofertas.find(oferta => oferta.numeroOferta === consumoSeleccionado.oferta) || null}
                    getOptionLabel={option => option.numeroOferta.toString()}
                    filterOptions={options => {
                        if (consumoSeleccionado.nombreCliente !== "" && consumoSeleccionado.oferta !== 0) {
                            return options.filter(oferta =>
                                oferta.nombreCliente === consumoSeleccionado.nombreCliente && !oferta.deleted
                            );
                        } else {
                            return options.filter(oferta => !oferta.deleted);
                        }
                    }}
                    renderInput={(params) => <TextField {...params} label="Oferta" name="oferta" error={errorOferta} helperText={errorOferta ? 'Este campo es obligatorio' : ' '} />}
                    onChange={(event, value) => ModificarOfertaSeleccionada(value)}
                />
            </Grid>

            <Grid item xs={3} md={1}>
                <p> Fecha </p>
            </Grid>
            <Grid item xs={3} md={4}>
                <TextField sx={{ width: '100%', marginTop: '25px' }} name="fecha" type="date" onChange={handleChange} error={errorFecha} helperText={errorFecha ? 'Introduzca una fecha' : ' '} />
            </Grid>

            <Grid item xs={3} md={3}>
                <Autocomplete
                    disableClearable={true}
                    id="producto"
                    options={productosSeleccionables}
                    getOptionLabel={option => option.descripcion}
                    sx={{ width: '100%', marginTop: '25px' }}
                    renderInput={(params) => <TextField {...params} name="producto" label="Producto" error={errorProducto} helperText={errorProducto ? 'Este campo es obligatorio' : ' '} />}
                    onChange={(event, value) => setConsumoSeleccionado(prevState => ({
                        ...prevState,
                        producto: value.id,
                        descripcionProducto: value.descripcion
                    }))}
                />
            </Grid>

            <Grid item xs={6} md={2}>
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
                    label="Cantidad"
                    name="cantidad"
                    type="number"
                    onChange={handleChange}
                    error={errorCantidad}
                    helperText={errorCantidad ? 'Introduzca una cantidad' : ' '}
                />
            </Grid>

            <Grid item xs={3} md={3}>
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
                    label="Nº Albaran"
                    name="albaran"
                    type="number"
                    onChange={handleChange}
                />
            </Grid>

            <Grid item xs={3} md={3}>
                <Autocomplete
                    disableClearable={true}
                    id="producto"
                    options={modoEnvio}
                    getOptionLabel={option => option.nombre}
                    sx={{ width: 250 }}
                    renderInput={(params) => <TextField {...params} name="modoEnvio" label="Metodo Entrega" />}
                    onChange={(event, value) => setConsumoSeleccionado(prevState => ({
                        ...prevState,
                        modoEnvio: value.id
                    }))}
                />
            </Grid>

            <Grid item xs={12} md={12}>
                <p> Observaciones </p>
                <TextareaAutosize
                    aria-label="empty textarea"
                    minRows={8}
                    style={{ width: '100%', padding: '10px' }}
                    name="observaciones"
                    onChange={handleChange}
                />
            </Grid>

        </>
    )
}