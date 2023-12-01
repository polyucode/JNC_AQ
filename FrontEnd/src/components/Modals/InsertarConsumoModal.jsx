import { useState, useEffect } from 'react';
import { Grid, TextField, Autocomplete } from '@mui/material';
import { getModoEnvio, getOfertas, getProductos } from '../../api';
import TextareaAutosize from '@mui/base/TextareaAutosize';

export const InsertarConsumoModal = ({ change: handleChange, setConsumoSeleccionado, ofertas, productos, errorCantidad, errorOferta, errorProducto, errorFecha }) => {

    const [modoEnvio, setModoEnvio] = useState([]);

    useEffect(() => {

        getModoEnvio()
            .then(envio => {
                setModoEnvio(envio);
            })
    }, [])


    return (
        <>
            <Grid item xs={3} md={3}>
                <Autocomplete
                    disableClearable={true}
                    sx={{ width: '100%', marginTop: '25px' }}
                    id="Oferta"
                    options={ofertas}
                    getOptionLabel={option => option.numeroOferta.toString()}
                    renderInput={(params) => <TextField {...params} label="Oferta" name="oferta" error={errorOferta} helperText={errorOferta ? 'Este campo es obligatorio' : ' '} />}
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
                <TextField sx={{ width: '100%', marginTop: '25px' }} name="fecha" type="date" onChange={handleChange} error={errorFecha} helperText={errorFecha ? 'Introduzca una fecha' : ' '} />
            </Grid>

            <Grid item xs={6} md={4}>
                <Autocomplete
                    disableClearable={true}
                    id="producto"                   
                    options={productos}
                    getOptionLabel={option => option.descripcion}
                    sx={{ width: '100%', marginTop: '25px' }}
                    renderInput={(params) => <TextField {...params} name="producto" label="Producto" error={errorProducto} helperText={errorProducto ? 'Este campo es obligatorio' : ' '} />}
                    onChange={(event, value) => setConsumoSeleccionado(prevState => ({
                        ...prevState,
                        producto: value.descripcion
                    }))}
                />
            </Grid>

            <Grid item xs={6} md={2}>
                <TextField sx={{ width: '100%', marginTop: '25px' }} label="Cantidad" name="cantidad" type="number" onChange={handleChange} error={errorCantidad} helperText={errorCantidad ? 'Introduzca una cantidad' : ' '} />
            </Grid>

            <Grid item xs={6} md={4}>
                <TextField sx={{ width: '100%' }} label="Nº Albaran" name="albaran" type="number" onChange={handleChange}/>
            </Grid>

            <Grid item xs={6} md={4}>
                <Autocomplete
                    disableClearable={true}
                    id="producto"                   
                    options={modoEnvio}
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
                />
            </Grid>

        </>
    )
}