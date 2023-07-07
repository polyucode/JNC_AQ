import { useState, useEffect } from 'react';
import { Grid, TextField, Autocomplete } from '@mui/material';
import { getOfertas, getProductos } from '../../api';

export const InsertarConsumoModal = ({ change: handleChange, setConsumoSeleccionado, ofertas, productos }) => {

    return (
        <>
            <Grid item xs={3} md={4}>
                <Autocomplete
                    disableClearable={true}
                    sx={{ width: '100%' }}
                    id="Oferta"
                    options={ofertas}
                    getOptionLabel={option => option.numeroOferta}
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
                <TextField sx={{ width: '100%' }} name="fecha" type="date" onChange={handleChange} />
            </Grid>

            <Grid item xs={6} md={4}>
                <Autocomplete
                    disableClearable={true}
                    id="producto"                   
                    options={productos}
                    getOptionLabel={option => option.descripcion}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} name="producto" label="Producto" />}
                    onChange={(event, value) => setConsumoSeleccionado(prevState => ({
                        ...prevState,
                        producto: value.descripcion
                    }))}
                />
            </Grid>

            <Grid item xs={6} md={3}>
                <TextField sx={{ width: '100%' }} label="Cantidad" name="cantidad" type="number" onChange={handleChange} />
            </Grid>

        </>
    )
}