import { useState, useEffect } from 'react';
import { Grid, TextField, Typography } from '@mui/material';
import { getUsuarios } from '../../api';

export const InsertarVisModalAerobio = ({ change: handleChangeInput, analisisSeleccionado, setAnalisisSeleccionado, analisisid, analisis, errorFecha }) => {

    const [operarios, setOperarios] = useState([]);
    const [nombreAnalisis, setNombreAnalisis] = useState([]);

    useEffect(() => {

        getUsuarios(operarios => {
            setOperarios(operarios);
        })
    }, [])

    useEffect(() => {

        const analisi = analisis.find((an) => an.id === analisisid)
        setNombreAnalisis(analisi.nombre)

    }, [analisis])

    useEffect(() => {

        setAnalisisSeleccionado(prevState => ({
            ...prevState,
            analisis: analisisid
        }))
    }, [nombreAnalisis])

    return (
        <>
            <Grid item xs={3} md={3}>
                <TextField sx={{ width: '100%' }} disabled label="Código Cliente" name="codigoCliente" type="number" onChange={handleChangeInput} value={analisisSeleccionado && analisisSeleccionado.codigoCliente} />
            </Grid>

            <Grid item xs={3} md={5}>
                <TextField sx={{ width: '100%' }} disabled label="Nombre Cliente" name="nombreCliente" onChange={handleChangeInput} value={analisisSeleccionado && analisisSeleccionado.nombreCliente} />
            </Grid>

            <Grid item xs={6} md={3}>
                <TextField sx={{ width: '100%' }} disabled label="Oferta" name="oferta" onChange={handleChangeInput} value={analisisSeleccionado && analisisSeleccionado.oferta} />
            </Grid>

            <Grid item xs={6} md={4}>
                <TextField sx={{ width: '100%' }} disabled label="Elemento" name="elemento" onChange={handleChangeInput} value={analisisSeleccionado && analisisSeleccionado.nombreElemento} />
            </Grid>

            <Grid item xs={6} md={6}>
                <TextField sx={{ width: '100%' }} disabled label="Analisis" name="analisis" onChange={handleChangeInput} value={nombreAnalisis} />
            </Grid>

            <Grid item xs={12} md={2}>
                <TextField sx={{ width: '100%' }} label="Periodo" name="periodo" onChange={handleChangeInput} />
            </Grid>

            <Grid item xs={12} md={2} style={{ display: 'flex' }}>
                <Typography> Fecha </Typography>
            </Grid>
            <Grid item xs={8} md={4}>
                <TextField
                    id="fecha"
                    type="date"
                    name="fecha"
                    sx={{ width: '100%', marginTop: '22px' }}
                    onChange={handleChangeInput}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    error={errorFecha}
                    helperText={errorFecha ? 'Introduzca una fecha' : ' '}
                />
            </Grid>
        </>
    )
}