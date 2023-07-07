import { useState, useEffect } from 'react';
import { Grid, TextField, Autocomplete } from '@mui/material';

export const EditarProductoModal = ({ change:handleChange, productoSeleccionado }) =>{

    return (
        <>
            <Grid item xs={ 3 } md={ 3 }>
                <TextField sx={{ width: '100%' }} label="Código Producto" name="codigoProducto" onChange={ handleChange } value={productoSeleccionado && productoSeleccionado.codigoProducto} />
            </Grid>

            <Grid item xs={ 3 } md={ 9 }>
                <TextField sx={{ width: '100%' }} label="Descripcion" name="descripcion" type="textbox" onChange={ handleChange } value={productoSeleccionado && productoSeleccionado.descripcion} />
            </Grid>

        </>
    )
}