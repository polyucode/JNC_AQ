import { Grid, TextField, Autocomplete, Typography } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { ObservacionesElementos } from '../ObservacionesElementos/ObservacionesElementos';
import { ComentariosElementos } from '../ComentariosElementos/ComentariosElementos';

export const EditarVisModal1 = ({ change: handleChangeInput, analisisSeleccionado, setAnalisisSeleccionado, handleChangeCheckbox, analisisAutocomplete, analisisEditar, elementoTareaEditar, elementosAutocomplete, operarios, operarioEditar, pdfEditar, observaciones, setObservaciones, observacion, setObservacion, observacionEditar, setObservacionEditar }) => {

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
                    getOptionLabel={option => option.descripcion !== null ? (option.nombre + ' ' + option.descripcion) : (option.nombre + ' ' + option.numero)}
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

            <Grid item xs={12} md={2} style={{ display: 'flex' }}>
                <p> Fecha Prevista </p>
            </Grid>
            <Grid item xs={12} md={4} style={{ display: 'flex' }}>
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

            <Grid item xs={12} md={2} style={{ display: 'flex' }}>
                <FormControlLabel control={<Checkbox />} sx={{ width: '100%' }} checked={analisisSeleccionado.realizado} label="Realizado" name="realizado" onChange={handleChangeCheckbox} />
            </Grid>
            <Grid item xs={6} md={4} style={{ display: 'flex' }}>

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

            <Grid item xs={7} md={12}>
                <ObservacionesElementos
                    idElemento={elementoTareaEditar[0].id}
                    observaciones={observaciones}
                    setObservaciones={setObservaciones}
                    observacion={observacion}
                    setObservacion={setObservacion}
                    observacionEditar={observacionEditar}
                    setObservacionEditar={setObservacionEditar}
                >
                </ObservacionesElementos>
            </Grid>

            <Grid item xs={4} md={3}>
                <FormControlLabel control={<Checkbox />} sx={{ width: '100%' }} checked={analisisSeleccionado.facturado} label="Facturado" name="facturado" onChange={handleChangeCheckbox} />
            </Grid>

            <Grid item xs={4} md={4}>
                <TextField sx={{ width: '100%' }} name="numeroFacturado" label="Numero Factura" onChange={handleChangeInput} value={analisisSeleccionado && analisisSeleccionado.numeroFacturado} />
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
                {/* <p> Comentario </p>
                <TextareaAutosize
                    aria-label="empty textarea"
                    minRows={8}
                    style={{ width: '100%' }}
                    name="comentarios"
                    defaultValue={analisisSeleccionado.comentarios}
                    onChange={handleChangeInput}
                /> */}
                <ComentariosElementos
                    idTarea={analisisSeleccionado.id}
                    idElemento={elementoTareaEditar[0].id}
                    idAnalisis={analisisEditar[0].id}
                    nombreAnalisis={analisisEditar[0].nombre}>
                </ComentariosElementos>
            </Grid>

            <Grid item xs={12} md={12}>
                <Typography> PDF Adjunto:  {pdfEditar.length > 0 ? pdfEditar[0].name + "." + pdfEditar[0].format : ""} </Typography>
            </Grid>

        </>
    )
}