import { useState, useEffect } from 'react';
import { Grid, TextField, Autocomplete } from '@mui/material';
import { getModoEnvio, getOfertas, getProductos } from '../../api';
import TextareaAutosize from '@mui/base/TextareaAutosize';

export const EditarConsumoModal = ({ change: handleChange, setConsumoSeleccionado, consumoSeleccionado, productoEditar, ofertaEditar, modoEnvioEditar, ofertas, clientes, productos, errorFecha, errorCantidad, clienteEditar }) => {

    const [modoEnvio, setModoEnvio] = useState([]);

    useEffect(() => {

        getModoEnvio()
            .then(envio => {
                setModoEnvio(envio);
            })
    })


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

    const clientesUnicos = clientes.filter((cliente, index, self) =>
        index === self.findIndex(c => c.razonSocial === cliente.razonSocial)
    );

    return (
        <>
            <Grid item xs={3} md={3}>
                <Autocomplete
                    disableClearable={true}
                    id="nombreCliente"
                    options={clientesUnicos}
                    defaultValue={clienteEditar[0]}
                    getOptionLabel={option => option.razonSocial}
                    renderInput={params => <TextField {...params} label="Nombre cliente" name="nombreCliente" />}
                    onChange={(event, value) => setConsumoSeleccionado(prevState => ({
                        ...prevState,
                        nombreCliente: value.razonSocial
                    }))}
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
                    onChange={(event, value) => setConsumoSeleccionado(prevState => ({
                        ...prevState,
                        oferta: parseInt(value.numeroOferta)
                    }))}
                />
            </Grid>

            <Grid item xs={3} md={1}>
                <p> Fecha </p>
            </Grid>
            <Grid item xs={3} md={4}>
                <TextField sx={{ width: '100%', marginTop: '22px' }} name="fecha" type="date" onChange={handleChange} value={consumoSeleccionado && formateandofechas(consumoSeleccionado.fecha)} error={errorFecha} helperText={errorFecha ? 'Introduzca una fecha' : ' '} />
            </Grid>

            <Grid item xs={6} md={4}>
                <Autocomplete
                    disableClearable={true}
                    id="producto"
                    options={productos}
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

            <Grid item xs={6} md={3}>
                <TextField sx={{ width: '100%', marginTop: '22px' }} label="Cantidad" name="cantidad" type="number" onChange={handleChange} value={consumoSeleccionado && consumoSeleccionado.cantidad} error={errorCantidad} helperText={errorCantidad ? 'Introduzca una cantidad' : ' '} />
            </Grid>

            <Grid item xs={6} md={3}>
                <TextField sx={{ width: '100%' }} label="Nº Albaran" name="albaran" type="number" onChange={handleChange} value={consumoSeleccionado && consumoSeleccionado.albaran} />
            </Grid>

            <Grid item xs={6} md={4}>
                <Autocomplete
                    disableClearable={true}
                    id="producto"
                    options={modoEnvio}
                    defaultValue={modoEnvioEditar[0]}
                    getOptionLabel={option => option.nombre}
                    sx={{ width: 300 }}
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