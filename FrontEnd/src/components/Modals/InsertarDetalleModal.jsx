import { useState, useEffect } from 'react';
import { Grid, TextField, Autocomplete, Typography } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
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

export const InsertarDetalleModal = ({ handleChangeDet, tareaSeleccionada, handleChangeFecha, setAnalisisSeleccionado, analisisSeleccionado, analisisEditar, elementoTareaEditar }) => {

    const [operarios, setOperarios] = useState([]);

    useEffect(() => {

        getUsuarios()
            .then(operarios => {
                setOperarios(operarios);
            })

    }, [])

    return (
        <>
            <Grid item xs={3} md={3}>
            <TextField sx={{ width: '100%' }} disabled label="Código Cliente" name="codigoCliente" type="number" onChange={handleChangeDet} value={tareaSeleccionada && tareaSeleccionada.codigoCliente} />
            </Grid>

            <Grid item xs={3} md={5}>
                <TextField sx={{ width: '100%' }} disabled label="Nombre Cliente" name="nombreCliente" onChange={handleChangeDet} value={tareaSeleccionada && tareaSeleccionada.nombreCliente} />
            </Grid>

            <Grid item xs={6} md={3}>
                <TextField sx={{ width: '100%' }} disabled label="Oferta" name="oferta" onChange={handleChangeDet} value={tareaSeleccionada && tareaSeleccionada.oferta} />
            </Grid>

            <Grid item xs={6} md={4}>
                <TextField sx={{ width: '100%' }} disabled label="Elemento" name="elemento" onChange={handleChangeDet} value={elementoTareaEditar[0].descripcion != null ? elementoTareaEditar[0].nombre + " " + elementoTareaEditar[0].descripcion : elementoTareaEditar[0].nombre + " " + elementoTareaEditar[0].numero} />
            </Grid>

            <Grid item xs={6} md={6}>
                <TextField sx={{ width: '100%' }} disabled label="Analisis" name="analisis" onChange={handleChangeDet} value={analisisEditar[0].nombre} />
            </Grid>

            <Grid item xs={12} md={2}>
                <TextField sx={{ width: '100%' }} label="Periodo" name="periodo" onChange={handleChangeDet} />
            </Grid>

            <Grid item xs={12} md={2} style={{ display: 'flex' }}>
                <Typography> Fecha </Typography>
            </Grid>
            <Grid item xs={8} md={4}>
                <TextField
                    id="fecha"
                    type="date"
                    name="fecha"
                    sx={{ width: '100%' }}
                    onChange={handleChangeFecha}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </Grid>

            <Grid item xs={12} md={12}>
                <p> Observaciones </p>
                <TextareaAutosize
                    aria-label="empty textarea"
                    minRows={8}
                    style={{ width: '100%' }}
                    name="observaciones"
                    onChange={handleChangeDet}
                />
            </Grid>

        </>
    )
}