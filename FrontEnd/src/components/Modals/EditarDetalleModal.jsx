import { useState, useEffect } from 'react';
import { Grid, TextField, Autocomplete, Typography } from '@mui/material';

import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import { ObservacionesElementos } from '../ObservacionesElementos/ObservacionesElementos';
import { ComentariosElementos } from '../ComentariosElementos/ComentariosElementos';

export const EditarDetalleModal = ({ change: handleChangeDet, analisisSeleccionado, tareaSeleccionada, setAnalisisSeleccionado, handleChangeCheckbox, handlePdf, fileChange, analisis, elementos, operarios, operarioEditar, observaciones, setObservaciones, observacion, setObservacion, observacionEditar, setObservacionEditar }) => {

    const [nombreAnalisis, setNombreAnalisis] = useState([]);
    const [nombreElemento, setNombreElemento] = useState([]);

    useEffect(() => {

        const analisi = analisis.find((an) => an.id === tareaSeleccionada.analisis)
        setNombreAnalisis(analisi.nombre)

        const elemento = elementos.find((el) => el.id === tareaSeleccionada.elemento)
        if (elemento.descripcion !== null) {
            setNombreElemento(elemento.nombre + ' ' + elemento.descripcion)
        } else {
            setNombreElemento(elemento.nombre + ' ' + elemento.numero)
        }


    }, [analisis, elementos])

    function formateandofechas(fecha) {
        if (fecha !== null) {
            const fecha1 = new Date(fecha)

            const fecha2 = fecha1.getFullYear() +
                '-' + String(fecha1.getMonth() + 1).padStart(2, '0') +
                '-' + String(fecha1.getDate()).padStart(2, '0')

            return fecha2
        } else {
            return null
        }
    }

    return (
        <>
            <Grid item xs={3} md={4}>
                <TextField sx={{ width: '100%' }} disabled label="Código Cliente" name="codigoCliente" type="number" onChange={handleChangeDet} value={tareaSeleccionada && tareaSeleccionada.codigoCliente} />
            </Grid>

            <Grid item xs={3} md={4}>
                <TextField sx={{ width: '100%' }} disabled label="Nombre Cliente" name="nombreCliente" onChange={handleChangeDet} value={tareaSeleccionada && tareaSeleccionada.nombreCliente} />
            </Grid>

            <Grid item xs={6} md={4}>
                <TextField sx={{ width: '100%' }} disabled label="Oferta" name="oferta" onChange={handleChangeDet} value={tareaSeleccionada && tareaSeleccionada.oferta} />
            </Grid>

            <Grid item xs={6} md={4}>
                <TextField sx={{ width: '100%' }} disabled label="Elemento" name="elemento" onChange={handleChangeDet} value={nombreElemento} />
            </Grid>

            <Grid item xs={6} md={5}>
                <TextField sx={{ width: '100%' }} disabled label="Analisis" name="analisis" onChange={handleChangeDet} value={nombreAnalisis} />
            </Grid>

            <Grid item xs={12} md={3}>
                <TextField sx={{ width: '100%' }} label="Periodo" name="periodo" onChange={handleChangeDet} value={analisisSeleccionado && analisisSeleccionado.periodo} />
            </Grid>


            <Grid item xs={12} md={2} style={{ display: 'flex' }}>
                <p> Fecha Prevista </p>
            </Grid>
            <Grid item xs={12} md={4} style={{ display: 'flex' }}>
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

            <Grid item xs={12} md={2} style={{ display: 'flex' }}>
                <FormControlLabel control={<Checkbox />} sx={{ width: '100%' }} checked={analisisSeleccionado.realizado} label="Realizado" name="realizado" onChange={handleChangeCheckbox} />
            </Grid>
            <Grid item xs={6} md={4} style={{ display: 'flex' }}>

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

            <Grid item xs={7} md={12}>
                <ObservacionesElementos
                    idElemento={tareaSeleccionada.elemento}
                    observaciones={observaciones}
                    setObservaciones={setObservaciones}
                    observacion={observacion}
                    setObservacion={setObservacion}
                    observacionEditar={observacionEditar}
                    setObservacionEditar={setObservacionEditar}
                >
                </ObservacionesElementos>
            </Grid>

            <Grid item xs={8} md={4}>
                <div class="file-select" id="src-file" >
                    <input type="file" name="src-file" aria-label="Archivo" onChange={handlePdf} />
                </div>
                <Typography> {fileChange ? fileChange.name : "Seleccionar un archivo"} </Typography>
            </Grid>

            <Grid item xs={12} md={3}>
                <FormControlLabel control={<Checkbox />} sx={{ width: '100%' }} checked={analisisSeleccionado.recibido} label="Resultados Recibidos y pdf publicado" name="recibido" onChange={handleChangeCheckbox} />
            </Grid>

            <Grid item xs={12} md={4} style={{ display: "flex" }}>
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

            <Grid item xs={4} md={4}>
                <TextField sx={{ width: '100%' }} name="numeroFacturado" label="Numero Factura" onChange={handleChangeDet} value={analisisSeleccionado && analisisSeleccionado.numeroFacturado} />
            </Grid>

            <Grid item xs={4} md={5}>
                <Autocomplete
                    disableClearable={true}
                    sx={{ width: '100%' }}
                    id="Operarios"
                    options={operarios}
                    defaultValue={operarioEditar[0]}
                    filterOptions={options => operarios.filter(cliente => cliente.idPerfil === 1004)}
                    getOptionLabel={option => option.nombre + ' ' + option.apellidos}
                    renderInput={(params) => <TextField {...params} label="Operario" name="operario" />}
                    onChange={(event, value) => setAnalisisSeleccionado(prevState => ({
                        ...prevState,
                        operario: value.id
                    }))}
                />
            </Grid>

            <Grid item xs={7} md={12}>
                <FormControlLabel control={<Checkbox />} sx={{ width: '100%' }} checked={analisisSeleccionado.cancelado} label="Cancelado" name="cancelado" onChange={handleChangeCheckbox} />
                <ComentariosElementos
                    idTarea={tareaSeleccionada.id}
                    idElemento={tareaSeleccionada.elemento}
                    idAnalisis={tareaSeleccionada.analisis}
                    nombreAnalisis={nombreAnalisis}>
                </ComentariosElementos>
            </Grid>

        </>
    )
}