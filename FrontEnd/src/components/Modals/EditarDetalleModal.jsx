import { useState, useEffect } from 'react';
import { Grid, TextField, Autocomplete, Typography } from '@mui/material';

import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import TextareaAutosize from '@mui/base/TextareaAutosize';

import MenuItem from '@mui/material/MenuItem';
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

export const EditarDetalleModal = ({ change: handleChangeDet, analisisSeleccionado, tareaSeleccionada, setAnalisisSeleccionado, handleChangeCheckbox, handlePdf, fileChange, analisis, elementos }) => {

    const [operarios, setOperarios] = useState([]);
    const [nombreAnalisis, setNombreAnalisis] = useState([]);
    const [nombreElemento, setNombreElemento] = useState([]);

    useEffect(() => {

        getUsuarios()
            .then(operarios => {
                setOperarios(operarios);
            })
    }, [])

    useEffect(() => {

        const analisi = analisis.find((an) => an.id === tareaSeleccionada.analisis)
        setNombreAnalisis(analisi.nombre)

        const elemento = elementos.find((el) => el.id === tareaSeleccionada.elemento)
        setNombreElemento(elemento.nombre + ' ' + elemento.numero)

    }, [analisis, elementos])

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
                <TextField sx={{ width: '100%' }} disabled label="Código Cliente" name="codigoCliente" type="number" onChange={handleChangeDet} value={tareaSeleccionada && tareaSeleccionada.codigoCliente} />
            </Grid>

            <Grid item xs={3} md={4}>
                <TextField sx={{ width: '100%' }} disabled label="Nombre Cliente" name="nombreCliente" onChange={handleChangeDet} value={tareaSeleccionada && tareaSeleccionada.nombreCliente}  />
            </Grid>

            <Grid item xs={6} md={4}>
                <TextField sx={{ width: '100%' }} disabled label="Oferta" name="oferta" onChange={handleChangeDet} value={tareaSeleccionada && tareaSeleccionada.oferta} />
            </Grid>

            <Grid item xs={6} md={3}>
                <TextField sx={{ width: '100%' }} disabled label="Elemento" name="elemento" onChange={handleChangeDet} value={nombreElemento} />
            </Grid>

            <Grid item xs={6} md={4}>
                <TextField sx={{ width: '100%' }} disabled label="Analisis" name="analisis" onChange={handleChangeDet} value={nombreAnalisis} />
            </Grid>

            <Grid item xs={12} md={3}>
                <TextField sx={{ width: '100%' }} label="Periodo" name="periodo" onChange={handleChangeDet} value={analisisSeleccionado && analisisSeleccionado.periodo} />
            </Grid>


            <Grid item xs={12} md={3} style={{ display: 'flex' }}>
                <Typography>Fecha Prevista</Typography>
            </Grid>
            <Grid item xs={12} md={7}>
                <TextField
                    id="fecha"
                    type="date"
                    name="fecha"
                    sx={{ width: '100%' }}
                    onChange={handleChangeDet}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={analisisSeleccionado && formateandofechas(analisisSeleccionado.fecha)}
                />
            </Grid>

            <Grid item xs={12} md={3} style={{ display: 'flex' }}>
                <FormControlLabel control={<Checkbox />} sx={{ width: '100%' }} checked={analisisSeleccionado.recogido} label="Recogido" name="recogido" onChange={handleChangeCheckbox} />
            </Grid>
            <Grid item xs={12} md={7}>
                <TextField
                    id="fechaRecogido"
                    type="date"
                    name="fechaRecogido"
                    sx={{ width: '100%' }}
                    onChange={handleChangeDet}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={analisisSeleccionado && formateandofechas(analisisSeleccionado.fechaRecogido)}
                />
            </Grid>
            

            <Grid item xs={12} md={3} style={{ display: 'flex' }}>
                <FormControlLabel control={<Checkbox />} sx={{ width: '100%' }} checked={tareaSeleccionada.realizado} label="Realizado" name="realizado" onChange={handleChangeCheckbox} />
            </Grid>
            <Grid item xs={12} md={3}>
                <TextField
                    id="fechaRealizado"
                    type="date"
                    name="fechaRealizado"
                    sx={{ width: '100%' }}
                    onChange={handleChangeDet}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={analisisSeleccionado && formateandofechas(analisisSeleccionado.fechaRealizado)}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <p> Observaciones </p>
                <TextareaAutosize
                    aria-label="empty textarea"
                    minRows={8}
                    style={{ width: '100%' }}
                    name="observaciones"
                    onChange={handleChangeDet}
                    defaultValue={analisisSeleccionado.observaciones}
                />
            </Grid>

            <Grid item xs={8} md={5}>
            <div class="file-select" id="src-file" >
                <input type="file" name="src-file" aria-label="Archivo" onChange={handlePdf}/>                
            </div>
            <Typography> {fileChange ? fileChange.name : "Seleccionar un archivo"} </Typography>

            </Grid>
            <Grid item xs={12} md={3}>
                <FormControlLabel control={<Checkbox />} sx={{ width: '100%' }} checked={analisisSeleccionado.recibido} label="Resultados Recibidos y pdf publicado" name="recibido" onChange={handleChangeCheckbox} />
            </Grid>
            <Grid item xs={12} md={3}>
                <TextField
                    id="fechaPdf"
                    type="date"
                    name="fechaPdf"
                    sx={{ width: '100%' }}
                    onChange={handleChangeDet}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={analisisSeleccionado && formateandofechas(analisisSeleccionado.fechaPdf)}
                />
            </Grid>


            <Grid item xs={6} md={3}>
                <FormControlLabel control={<Checkbox />} sx={{ width: '100%' }} checked={analisisSeleccionado.facturado} label="Facturado" name="facturado" onChange={handleChangeCheckbox} />
            </Grid>
            <Grid item xs={6} md={8}>
                <TextField sx={{ width: '100%' }} name="numeroFacturado" label="Numero Factura" onChange={handleChangeDet} value={analisisSeleccionado && analisisSeleccionado.numeroFacturado} />
            </Grid>

            <Grid item xs={6} md={3}>
                <FormControlLabel control={<Checkbox />} sx={{ width: '100%' }} checked={analisisSeleccionado.cancelado} label="Cancelado" name="cancelado" onChange={handleChangeCheckbox} />
            </Grid>
            <Grid item xs={6} md={8}>
                <p> Comentario </p>
                <TextareaAutosize
                    aria-label="empty textarea"
                    minRows={8}
                    style={{ width: '100%' }}
                    name="comentarios"
                    defaultValue={analisisSeleccionado.comentarios}
                    onChange={handleChangeDet}
                />
            </Grid>

        </>
    )
}