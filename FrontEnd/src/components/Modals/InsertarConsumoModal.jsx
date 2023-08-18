import { useState, useEffect } from 'react';
import { Grid, TextField, Autocomplete } from '@mui/material';
import { getOfertas, getProductos } from '../../api';

export const InsertarConsumoModal = ({ change: handleChange, setConsumoSeleccionado, ofertas, productos, errorCantidad, errorOferta, errorProducto, errorFecha }) => {

    return (
        <>
            <Grid item xs={3} md={4}>
                <Autocomplete
                    disableClearable={true}
                    sx={{ width: '100%', marginTop: '20px' }}
                    id="Oferta"
                    options={ofertas}
                    getOptionLabel={option => option.numeroOferta}
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
                <TextField sx={{ width: '100%', marginTop: '20px' }} name="fecha" type="date" onChange={handleChange} error={errorFecha} helperText={errorFecha ? 'Introduzca una fecha' : ' '} />
            </Grid>

            <Grid item xs={6} md={4}>
                <Autocomplete
                    disableClearable={true}
                    id="producto"                   
                    options={productos}
                    getOptionLabel={option => option.descripcion}
                    sx={{ width: 300, marginTop: '20px' }}
                    renderInput={(params) => <TextField {...params} name="producto" label="Producto" error={errorProducto} helperText={errorProducto ? 'Este campo es obligatorio' : ' '} />}
                    onChange={(event, value) => setConsumoSeleccionado(prevState => ({
                        ...prevState,
                        producto: value.descripcion
                    }))}
                />
            </Grid>

            <Grid item xs={6} md={3}>
                <TextField sx={{ width: '100%', marginTop: '20px' }} label="Cantidad" name="cantidad" type="number" onChange={handleChange} error={errorCantidad} helperText={errorCantidad ? 'Introduzca una cantidad' : ' '} />
            </Grid>

        </>
    )
}