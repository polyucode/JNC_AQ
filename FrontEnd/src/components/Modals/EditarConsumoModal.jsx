import { useState, useEffect } from 'react';
import { Grid, TextField, Autocomplete, TextareaAutosize } from '@mui/material';
import { getModoEnvio, getOfertasProductos } from '../../api';

export const EditarConsumoModal = ({ change: handleChange, setConsumoSeleccionado, consumoSeleccionado, productoEditar, ofertaEditar, modoEnvioEditar, ofertas, clientes, productos, errorFecha, errorCantidad, clienteEditar }) => {

    const [modoEnvio, setModoEnvio] = useState([]);

    const [productosSeleccionables, setProductosSeleccionables] = useState([]);
    const [codigoClienteSeleccionado, setCodigoClienteSeleccionado] = useState('');
    const [ofertaSeleccionada, setOfertaSeleccionada] = useState('');

    useEffect(() => {

        getModoEnvio()
            .then(resp => setModoEnvio(resp.filter(envio => !envio.deleted)));

            setCodigoClienteSeleccionado(clienteEditar[0].codigo);
            setOfertaSeleccionada(ofertaEditar[0].id);
    },[])

    useEffect(() =>{
        CargarProductosSeleccionables();
    }, [codigoClienteSeleccionado, ofertaSeleccionada]);

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
        setOfertaSeleccionada(value.id);
        setCodigoClienteSeleccionado(value.codigoCliente)
        setConsumoSeleccionado(prevState => ({
            ...prevState,
            codigoCliente: value.codigoCliente,
            nombreCliente: value.nombreCliente,
            oferta: parseInt(value.numeroOferta)
        }))
    }

    async function CargarProductosSeleccionables(){
        if (codigoClienteSeleccionado.toString() !== '' && ofertaSeleccionada.toString() !== '') {
            const resp = await getOfertasProductos();
            const filtrados = resp.filter((producto) => producto.idOferta === ofertaSeleccionada && !producto.deleted);
            const idFiltrados = filtrados.map(producto => producto.idProducto);
            setProductosSeleccionables(productos.filter((producto) => idFiltrados.includes(producto.id)));
        }
    }

    return (
        <>
            <Grid item xs={3} md={3}>
                <Autocomplete
                    disableClearable={true}
                    id="nombreCliente"
                    options={clientes}
                    defaultValue={clienteEditar[0]}
                    getOptionLabel={option => option.razonSocial}
                    renderInput={params => <TextField {...params} label="Nombre cliente" name="nombreCliente" />}
                    onChange={(event, value) => ModificarCodigoClienteSeleccionado(value)}
                />
            </Grid>

            <Grid item xs={3} md={3}>
                <Autocomplete
                    disableClearable={true}
                    sx={{ width: '100%' }}
                    id="Oferta"
                    options={ofertas}
                    defaultValue={ofertaEditar[0]}
                    getOptionLabel={option => option.numeroOferta.toString()}
                    filterOptions={options => ofertas.filter(oferta => oferta.nombreCliente === consumoSeleccionado.nombreCliente)}
                    renderInput={(params) => <TextField {...params} label="Oferta" name="oferta" />}
                    onChange={(event, value) => ModificarOfertaSeleccionada(value)}
                />
            </Grid>

            <Grid item xs={3} md={1}>
                <p> Fecha </p>
            </Grid>
            <Grid item xs={3} md={4}>
                <TextField sx={{ width: '100%', marginTop: '22px' }} name="fecha" type="date" onChange={handleChange} value={consumoSeleccionado && formateandofechas(consumoSeleccionado.fecha)} error={errorFecha} helperText={errorFecha ? 'Introduzca una fecha' : ' '} />
            </Grid>

            <Grid item xs={6} md={3}>
                <Autocomplete
                    disableClearable={true}
                    id="producto"
                    options={productosSeleccionables}
                    getOptionLabel={option => option.descripcion}
                    defaultValue={productoEditar[0]}
                    sx={{ width: '100%' }}
                    renderInput={(params) => <TextField {...params} name="producto" label="Producto" />}
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
                    value={consumoSeleccionado && consumoSeleccionado.cantidad}
                    error={errorCantidad}
                    helperText={errorCantidad ? 'Introduzca una cantidad' : ' '}
                />
            </Grid>

            <Grid item xs={6} md={3}>
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
                    value={consumoSeleccionado && consumoSeleccionado.albaran}
                />
            </Grid>

            <Grid item xs={6} md={4}>
                <Autocomplete
                    disableClearable={true}
                    id="producto"
                    options={modoEnvio}
                    defaultValue={modoEnvioEditar[0]}
                    getOptionLabel={option => option.nombre}
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
                    value={consumoSeleccionado && consumoSeleccionado.observaciones}
                />
            </Grid>

        </>
    )
}