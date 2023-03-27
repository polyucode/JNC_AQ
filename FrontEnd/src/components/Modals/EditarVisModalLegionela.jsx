import { useState, useEffect } from 'react';
import { Grid, TextField, Autocomplete } from '@mui/material';

import MenuItem from '@mui/material/MenuItem';

import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import Button from '@mui/material/Button';
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

export const EditarVisModalLegionela = ({ change: handleChangeInput, analisisSeleccionado, setAnalisisSeleccionado, handleChangeCheckbox, analisisAutocomplete, analisisEditar, elementoTareaEditar, elementosAutocomplete, handlePdf }) => {

    function formateandofechas(fecha) {
        const fecha1 = new Date(fecha)

        const fecha2 = fecha1.getFullYear() +
            '-' + String(fecha1.getMonth() + 1).padStart(2, '0') +
            '-' + String(fecha1.getDate()).padStart(2, '0')

        return fecha2
    }

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

            <Grid item xs={6} md={4}>
                <Autocomplete
                    disableClearable={true}
                    id="CboElementosPlanta"
                    disabled
                    defaultValue={elementoTareaEditar[0]}
                    options={elementosAutocomplete}
                    getOptionLabel={option => (option.nombre + ' ' + option.numero)}
                    sx={{ width: '100%' }}
                    renderInput={(params) => <TextField {...params} label="Elemento" name="elemento" />}
                    onChange={handleChangeInput}
                />
            </Grid>

            <Grid item xs={6} md={5}>
                <Autocomplete
                    disableClearable={true}
                    id="analisis"
                    disabled
                    options={analisisAutocomplete}
                    defaultValue={analisisEditar[0]}
                    getOptionLabel={option => option.nombre}
                    sx={{ width: '100%' }}
                    renderInput={(params) => <TextField {...params} label="Analisis" name="analisis" />}
                    onChange={handleChangeInput}
                />
            </Grid>

            <Grid item xs={12} md={3}>
                <TextField sx={{ width: '100%' }} label="Periodo" name="periodo" onChange={handleChangeInput} value={analisisSeleccionado && analisisSeleccionado.periodo} />
            </Grid>

            <Grid item xs={12} md={7} style={{ display: 'flex' }}>
                <p style={{ width: '100%' }}> Fecha Prevista </p>
                <TextField
                    id="fecha"
                    type="date"
                    name="fecha"
                    sx={{ width: '100%' }}
                    onChange={handleChangeInput}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={analisisSeleccionado && formateandofechas(analisisSeleccionado.fecha)}
                />
            </Grid>

            <Grid item xs={12} md={3} style={{ display: 'flex' }}>
                <FormControlLabel control={<Checkbox />} sx={{ width: '100%' }} checked={analisisSeleccionado.recogido} label="Recogido" name="recogido" onChange={handleChangeCheckbox} />
            </Grid>
            <Grid item xs={12} md={9}>
                <TextField
                    id="fechaRecogido"
                    type="date"
                    name="fechaRecogido"
                    sx={{ width: '100%' }}
                    onChange={handleChangeInput}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={analisisSeleccionado && formateandofechas(analisisSeleccionado.fechaRecogido)}
                />
            </Grid>

            <Grid item xs={6} md={6} style={{ display: 'flex' }}>
                <FormControlLabel control={<Checkbox />} sx={{ width: '100%' }} checked={analisisSeleccionado.realizado} label="Realizado" name="realizado" onChange={handleChangeCheckbox} />
                <TextField
                    id="fechaRealizado"
                    type="date"
                    name="fechaRealizado"
                    sx={{ width: '100%' }}
                    onChange={handleChangeInput}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={analisisSeleccionado && formateandofechas(analisisSeleccionado.fechaRealizado)}
                />
            </Grid>

            <br />

            <Grid item xs={7} md={6}>
                <p> Observaciones </p>
                <TextareaAutosize
                    aria-label="empty textarea"
                    minRows={8}
                    style={{ width: '100%' }}
                    name="observaciones"
                    onChange={handleChangeInput}
                    defaultValue={analisisSeleccionado.observaciones}
                />
            </Grid>

            <Grid item xs={12} md={12} style={{ display: "flex" }}>
                <input type="file" onChange={handlePdf}/>
                {/*<Button variant="contained" component="label" sx={{ width: '40%', marginRight: '15px' }}>
                    Subir PDF
                </Button>*/}
                <FormControlLabel control={<Checkbox />} sx={{ width: '100%' }} checked={analisisSeleccionado.recibido} label="Resultados Recibidos y pdf publicado" name="recibido" onChange={handleChangeCheckbox} />
                <TextField
                    id="fechaPdf"
                    type="date"
                    name="fechaPdf"
                    sx={{ width: '100%' }}
                    onChange={handleChangeInput}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={analisisSeleccionado && formateandofechas(analisisSeleccionado.fechaPdf)}
                />
                <TextField sx={{ width: '100%' }} name="resultado" label="Resultado" onChange={handleChangeInput} value={analisisSeleccionado && analisisSeleccionado.resultado} />
            </Grid>

            <br/>

            <Grid item xs={6} md={4}>
                <FormControlLabel control={<Checkbox />} sx={{ width: '100%' }} checked={analisisSeleccionado.facturado} label="Facturado" name="facturado" onChange={handleChangeCheckbox} />
            </Grid>

            <Grid item xs={4} md={5}>
                <TextField sx={{ width: '100%' }} name="numeroFacturado" label="Numero Factura" onChange={handleChangeInput} value={analisisSeleccionado && analisisSeleccionado.numeroFacturado} />
            </Grid>

            <Grid item xs={4} md={5}>
                <FormControlLabel control={<Checkbox />} sx={{ width: '100%' }} checked={analisisSeleccionado.cancelado} label="Cancelado" name="cancelado" onChange={handleChangeCheckbox} />
            </Grid>

            <Grid item xs={7} md={6}>
                <p> Comentario </p>
                <TextareaAutosize
                    aria-label="empty textarea"
                    minRows={8}
                    style={{ width: '100%' }}
                    name="comentarios"
                    defaultValue={analisisSeleccionado.comentarios}
                    onChange={handleChangeInput}
                />
            </Grid>

        </>
    )
}