import { useState, useEffect } from 'react';
import { Grid, TextField, Autocomplete } from '@mui/material';

export const InsertarProductoModal = ({ change:handleChange, errorProducto }) =>{

    return (
        <>
            <Grid item xs={ 3 } md={ 3 }>
                <TextField sx={{ width: '100%', marginTop: '22px' }} label="Código Producto" name="codigoProducto" onChange={ handleChange } error={errorProducto} helperText={errorProducto ? 'Este campo es obligatorio' : ' '} />
            </Grid>

            <Grid item xs={ 3 } md={ 9 }>
                <TextField sx={{ width: '100%' }} label="Descripcion" name="descripcion" onChange={ handleChange } />
            </Grid>

        </>
    )
}