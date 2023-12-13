import { useState, useEffect } from 'react';
import { Grid, TextField, Autocomplete, InputAdornment } from '@mui/material';

export const EditarProductoModal = ({ change:handleChange, productoSeleccionado, errorProducto }) =>{

    return (
        <>
            <Grid item xs={ 3 } md={ 3 }>
                <TextField sx={{ width: '100%', marginTop: '25px' }} label="Código Producto" name="codigoProducto" onChange={ handleChange } value={productoSeleccionado && productoSeleccionado.codigoProducto} error={errorProducto} helperText={errorProducto ? 'Este campo es obligatorio' : ' '} />
            </Grid>

            <Grid item xs={ 3 } md={ 5 }>
                <TextField sx={{ width: '100%' }} label="Descripcion" name="descripcion" type="textbox" onChange={ handleChange } value={productoSeleccionado && productoSeleccionado.descripcion} />
            </Grid>

            <Grid item xs={ 3 } md={ 4 }>
                <TextField 
                    type='number'
                    sx={{ width: '100%' }} 
                    label="Definir unidad" 
                    name="kg" 
                    onChange={ handleChange }
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                KG
                            </InputAdornment>
                        ),
                    }}  
                    value={productoSeleccionado && productoSeleccionado.kg} 
                />
            </Grid>

        </>
    )
}