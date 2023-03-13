import { useState, useEffect } from 'react';
import { Grid, TextField, Autocomplete } from '@mui/material';

import MenuItem from '@mui/material/MenuItem';
import { getOperarios } from '../../api/apiBackend';

const protocolos = [
    {
        value: 'Desinfeccion Parado 4B',
        label: 'Desinfeccion Parado 4B'
    },
    {
        value: 'Desinfeccion Continuo 4B',
        label: 'Desinfeccion Continuo 4B'
    },
    {
        value: 'Desinfeccion limpieza parado',
        label: 'Desinfeccion limpieza parado'
    },
    {
        value: 'Desinfeccion limpieza continuo',
        label: 'Desinfeccion limpieza continuo'
    },
    {
        value: 'Desinfeccion Protocolo 4C',
        label: 'Desinfeccion Protocolo 4C'
    },
    {
        value: 'Desinfeccion de aporte',
        label: 'Desinfeccion de aporte'
    },
    {
        value: 'Desinfeccion contraincendios',
        label: 'Desinfeccion contraincendios'
    },
    {
        value: 'Desinfeccion parado fuente ornamental',
        label: 'Desinfeccion parado fuente ornamental'
    },
    {
        value: 'Desinfeccion ACS (termico)',
        label: 'Desinfeccion ACS (termico)'
    },
    {
        value: 'Desinfeccion AFCH (cloracion)',
        label: 'Desinfeccion AFCH (cloracion)'
    }
]

export const InsertarVisModal1 = ({ change: handleChangeInput, analisisSeleccionado, setAnalisisSeleccionado }) => {

    const [operarios, setOperarios] = useState([]);

    useEffect(() => {

        getOperarios(operarios => {
            setOperarios(operarios);
        })
    }, [])

    return (
        <>
            <Grid item xs={3} md={4}>
                <TextField sx={{ width: '100%' }} disabled label="Código Cliente" name="codigoCliente" type="number" onChange={handleChangeInput} value={analisisSeleccionado && analisisSeleccionado.codigoCliente} />
            </Grid>

            <Grid item xs={3} md={4}>
                <TextField sx={{ width: '100%' }} disabled label="Nombre Cliente" name="nombreCliente" onChange={handleChangeInput} value={analisisSeleccionado && analisisSeleccionado.nombreCliente} />
            </Grid>

            <Grid item xs={6} md={4}>
                <TextField sx={{ width: '100%' }} disabled label="Oferta" name="oferta" onChange={handleChangeInput} value={analisisSeleccionado && analisisSeleccionado.oferta} />
            </Grid>

            <Grid item xs={6} md={3}>
                <TextField sx={{ width: '100%' }} disabled label="Elemento" name="elemento" onChange={handleChangeInput} value={analisisSeleccionado && analisisSeleccionado.elemento} />
            </Grid>

            <Grid item xs={6} md={3}>
                <TextField sx={{ width: '100%' }} disabled label="Analisis" name="analisis" onChange={handleChangeInput} value={analisisSeleccionado && analisisSeleccionado.analisis} />
            </Grid>

            <Grid item xs={12} md={6}>
                <TextField sx={{ width: '100%' }} label="Periodo" name="periodo" onChange={handleChangeInput} />
            </Grid>

            <Grid item xs={8} md={9}>
                <TextField
                    id="fecha"
                    type="date"
                    name="fecha"
                    sx={{ width: '100%' }}
                    onChange={handleChangeInput}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </Grid>

            <Grid item xs={6} md={4}>
                <TextField sx={{ width: '100%' }} label="observaciones" name="observaciones" onChange={handleChangeInput} />
            </Grid>

        </>
    )
}