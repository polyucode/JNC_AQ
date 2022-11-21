import { useState, useEffect } from 'react';
import { Grid, TextField, Autocomplete } from '@mui/material';
import { getComarcas, getPoblaciones, getProvincias } from '../../api/apiBackend';

export const EditarTareaModal = ({ change:handleChange, autocompleteChange, tareaSeleccionada }) =>{

    return (
        <>
            <Grid item xs={ 3 } md={ 4 }>
                <TextField sx={{ width: '100%' }} label="CódigoCliente" name="codigoCliente" type="number" onChange={ handleChange } value={tareaSeleccionada && tareaSeleccionada.codigoCliente} />
            </Grid>

            <Grid item xs={ 3 } md={ 4 }>
                <TextField sx={{ width: '100%' }} label="Nombre Cliente" name="nombreCliente" onChange={ handleChange } value={tareaSeleccionada && tareaSeleccionada.nombreCliente} />
            </Grid>

            <Grid item xs={ 6 } md={ 4 }>
                <TextField sx={{ width: '100%' }} label="Oferta" name="oferta" onChange={ handleChange } value={tareaSeleccionada && tareaSeleccionada.oferta} />
            </Grid>

            <Grid item xs={ 6 } md={ 3 }>
                <TextField sx={{ width: '100%' }} label="Pedido" name="pedido" onChange={ handleChange } value={tareaSeleccionada && tareaSeleccionada.pedido} />
            </Grid>

            <Grid item xs={ 6 } md={ 3 }>
                <TextField sx={{ width: '100%' }} label="Operario" name="operario" onChange={ handleChange } value={tareaSeleccionada && tareaSeleccionada.operario} />
            </Grid>

            <Grid item xs={ 12 } md={ 6 }>
                <TextField sx={{ width: '100%' }} label="Protocolo" name="protocolo" onChange={ handleChange } value={tareaSeleccionada && tareaSeleccionada.protocolo} />
            </Grid>

            <Grid item xs={ 8 } md={ 9 }>
                <TextField sx={{ width: '100%' }} label="Elemento" name="elementoPlanta" onChange={ handleChange } value={tareaSeleccionada && tareaSeleccionada.elementoPlanta} />
            </Grid>

            <Grid item xs={ 4 } md={ 3 }>
                <TextField sx={{ width: '100%' }} label="Analisis" name="analisis" onChange={ handleChange } value={tareaSeleccionada && tareaSeleccionada.analisis} />
            </Grid>

            <Grid item xs={ 4 } md={ 3 }>
                <TextField sx={{ width: '100%' }} label="Final" name="final" onChange={ handleChange } value={tareaSeleccionada && tareaSeleccionada.final} />
            </Grid>

            <Grid item xs={ 4 } md={ 3 }>
                <TextField sx={{ width: '100%' }} label="Valor" name="valor" onChange={ handleChange } value={tareaSeleccionada && tareaSeleccionada.valor} />
            </Grid>

            <Grid item xs={ 4 } md={ 3 }>
                <TextField sx={{ width: '100%' }} label="Nombre Valor" name="nombreValor" onChange={ handleChange } value={tareaSeleccionada && tareaSeleccionada.nombreValor} />
            </Grid>

            <Grid item xs={ 4 } md={ 3 }>
                <TextField sx={{ width: '100%' }} label="Unidades" name="unidades" onChange={ handleChange } value={tareaSeleccionada && tareaSeleccionada.unidades} />
            </Grid>

            <Grid item xs={ 4 } md={ 3 }>
                <TextField sx={{ width: '100%' }} label="Tipo" name="tipo" onChange={ handleChange } value={tareaSeleccionada && tareaSeleccionada.tipo} />
            </Grid>

            <Grid item xs={ 4 } md={ 3 }>
                <TextField sx={{ width: '100%' }} label="Cancelado" name="cancelado" onChange={ handleChange } value={tareaSeleccionada && tareaSeleccionada.cancelado} />
            </Grid>

            <Grid item xs={ 4 } md={ 3 }>
                <TextField sx={{ width: '100%' }} label="Comentarios" name="comentarios" onChange={ handleChange } value={tareaSeleccionada && tareaSeleccionada.comentarios} />
            </Grid>

        </>
    )
}