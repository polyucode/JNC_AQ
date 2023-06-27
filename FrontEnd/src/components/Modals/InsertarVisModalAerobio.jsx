import { useState, useEffect } from 'react';
import { Grid, TextField, Typography } from '@mui/material';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { getUsuarios } from '../../api';

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

export const InsertarVisModalAerobio = ({ change: handleChangeInput, analisisSeleccionado, setAnalisisSeleccionado, analisisid, analisis }) => {

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

            <Grid item xs={3} md={4}>
                <TextField sx={{ width: '100%' }} disabled label="Nombre Cliente" name="nombreCliente" onChange={handleChangeInput} value={analisisSeleccionado && analisisSeleccionado.nombreCliente} />
            </Grid>

            <Grid item xs={6} md={2}>
                <TextField sx={{ width: '100%' }} disabled label="Oferta" name="oferta" onChange={handleChangeInput} value={analisisSeleccionado && analisisSeleccionado.oferta} />
            </Grid>

            <Grid item xs={6} md={3}>
                <TextField sx={{ width: '100%' }} disabled label="Elemento" name="elemento" onChange={handleChangeInput} value={analisisSeleccionado && analisisSeleccionado.nombreElemento} />
            </Grid>

            <Grid item xs={6} md={6}>
                <TextField sx={{ width: '100%' }} disabled label="Analisis" name="analisis" onChange={handleChangeInput} value={nombreAnalisis} />
            </Grid>

            <Grid item xs={12} md={4}>
                <TextField sx={{ width: '100%' }} label="Periodo" name="periodo" onChange={handleChangeInput} />
            </Grid>

            <Grid item xs={12} md={3} style={{ display: 'flex' }}>
                <Typography> Fecha </Typography>
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

            <Grid item xs={12} md={6}>
                <p> Observaciones </p>
                <TextareaAutosize
                    aria-label="empty textarea"
                    minRows={8}
                    style={{ width: '100%' }}
                    name="observaciones"
                    onChange={handleChangeInput}
                />
            </Grid>

        </>
    )
}