import { useState, useEffect } from 'react';
import { Grid, TextField, Autocomplete, Typography } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

import '../../pages/Visualizacion.css';
import { ObservacionesElementos } from '../ObservacionesElementos/ObservacionesElementos';
import { ComentariosElementos } from '../ComentariosElementos/ComentariosElementos';
import { EditorTextoEmail } from '../EditorTextoEmail/EditorTextoEmail';
import { ComentariosElementosNoFQ } from '../ComentariosElementos/ComentariosElementosNoFQ';


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

export const EditarVisModalAerobio = ({ change: handleChangeInput, analisisSeleccionado, setAnalisisSeleccionado, handleChangeCheckbox, analisisAutocomplete, analisisEditar, elementoTareaEditar, elementosAutocomplete, handlePdf, fileChange, mandarCorreo, pdfEditar, operarios, operarioEditar, observaciones, setObservaciones, observacion, setObservacion, observacionEditar, setObservacionEditar, setContactosEnviarCorreo }) => {

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
    const [textoEmailEditor, setTextoEmailEditor] = useState('');

    useEffect(() => {
        // handleChangeCorreoHTML(textoEmailEditor)
        setAnalisisSeleccionado(prevState => ({
            ...prevState,
            textoCorreo: textoEmailEditor
        }))
        //analisisSeleccionado.textoCorreo = textoEmailEditor;
        // handleChangeTextoCorreoAux(textoEmailEditor);
    }, [textoEmailEditor])

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

            <Grid item xs={12} md={5} style={{ display: 'flex' }}>
            </Grid>

            <Grid item xs={12} md={2} style={{ display: 'flex' }}>
                <FormControlLabel control={<Checkbox />} sx={{ width: '100%' }} checked={analisisSeleccionado.recogido} label="Recogido" name="recogido" onChange={handleChangeCheckbox} />
            </Grid>
            <Grid item xs={12} md={4}>
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

            <Grid item xs={12} md={2} style={{ display: 'flex' }}>
                <FormControlLabel control={<Checkbox />} sx={{ width: '100%' }} checked={analisisSeleccionado.realizado} label="Realizado/ Entregado" name="realizado" onChange={handleChangeCheckbox} />
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

            <Grid item xs={8} md={3}>
                <div className="file-select" id="src-file" >
                    <input type="file" name="src-file" aria-label="Archivo" onChange={handlePdf} />
                </div>
                <Typography> {fileChange ? fileChange.name : "Seleccionar un archivo"} </Typography>
            </Grid>

            <Grid item xs={12} md={2}>
                <FormControlLabel control={<Checkbox />} sx={{ width: '100%' }} checked={analisisSeleccionado.recibido} label="Resultados Recibidos y pdf publicado" name="recibido" onChange={handleChangeCheckbox} />
            </Grid>

            <Grid item xs={12} md={3} style={{ display: "flex" }}>
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
            </Grid>
            <Grid item xs={12} md={2}>
                <TextField sx={{ width: '100%' }} name="resultado" label="Resultado" onChange={handleChangeInput} value={analisisSeleccionado && analisisSeleccionado.resultado} />
            </Grid>

            <Grid item xs={12} md={2}>
                <FormControlLabel control={<Checkbox />} sx={{ width: '100%' }} checked={analisisSeleccionado.incorrecto} label="Incorrecto" name="incorrecto" onChange={handleChangeCheckbox} />
                <FormControlLabel control={<Checkbox />} sx={{ width: '100%' }} checked={analisisSeleccionado.noValido} label="Analisis No Válido" name="noValido" onChange={handleChangeCheckbox} />
            </Grid>

            <Grid item xs={12} md={12}>
                <Typography> PDF Adjunto: {pdfEditar.length > 0 ? pdfEditar[0].name + "." + pdfEditar[0].format : ""} </Typography>
            </Grid>

            <Grid item xs={12} md={12}>
                <EditorTextoEmail
                    setTextoEmailEditor={setTextoEmailEditor}
                    correoGuardado={analisisSeleccionado.textoCorreo}
                    codigoCliente={analisisSeleccionado.codigoCliente}
                    setContactosEnviarCorreo={setContactosEnviarCorreo}
                    idTarea={elementoTareaEditar[0].id}>
                </EditorTextoEmail>
            </Grid>

            <Grid item xs={12} md={12}>
                <Button sx={{ float: 'right' }} variant="contained" endIcon={<SendIcon />} onClick={mandarCorreo} disabled={fileChange === undefined ? true : false}>
                    Mandar Correo
                </Button>
            </Grid>

            <Grid item xs={6} md={3}>
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
                <ComentariosElementosNoFQ
                    idElemento={elementoTareaEditar[0].id}
                    idAnalisis={analisisEditar[0].id}
                    nombreAnalisis={analisisEditar[0].nombre}>
                </ComentariosElementosNoFQ>
            </Grid>

        </>
    )
}