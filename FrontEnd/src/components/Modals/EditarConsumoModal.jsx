import { useState, useEffect } from 'react';
import { Grid, TextField, Autocomplete } from '@mui/material';
import { getOfertas, getProductos } from '../../api';

export const EditarConsumoModal = ({ change: handleChange, setConsumoSeleccionado, consumoSeleccionado, productoEditar, ofertaEditar, ofertas, productos, errorFecha, errorCantidad }) => {

    function formateandofechas(fecha) {
        if(fecha !== null){
            const fecha1 = new Date(fecha)

            const fecha2 = fecha1.getFullYear() +
                '-' + String(fecha1.getMonth() + 1).padStart(2, '0') +
                '-' + String(fecha1.getDate()).padStart(2, '0')
    
            return fecha2
        } else{
            return null
        }       
    }

    return (
        <>
            <Grid item xs={3} md={4}>
                <Autocomplete
                    disableClearable={true}
                    sx={{ width: '100%' }}
                    id="Oferta"
                    options={ofertas}
                    defaultValue={ofertaEditar[0]}
                    getOptionLabel={option => option.numeroOferta.toString()}
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
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} name="producto" />}
                    onChange={(event, value) => setConsumoSeleccionado(prevState => ({
                        ...prevState,
                        producto: value.descripcion
                    }))}
                />
            </Grid>

            <Grid item xs={6} md={3}>
                <TextField sx={{ width: '100%', marginTop: '22px' }} label="Cantidad" name="cantidad" type="number" onChange={handleChange} value={consumoSeleccionado && consumoSeleccionado.cantidad} error={errorCantidad} helperText={errorCantidad ? 'Introduzca una cantidad' : ' '} />
            </Grid>

        </>
    )
}