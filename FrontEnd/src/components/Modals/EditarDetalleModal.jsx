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

export const EditarDetalleModal = ({ change: handleChangeDet, analisisSeleccionado, tareaSeleccionada, setAnalisisSeleccionado }) => {

    const [operarios, setOperarios] = useState([]);

    useEffect(() => {

        getOperarios()
            .then(operarios => {
                setOperarios(operarios);
            })
    }, [])

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
                <TextField sx={{ width: '100%' }} disabled label="Elemento" name="elemento" onChange={handleChangeDet} />
            </Grid>

            <Grid item xs={6} md={3}>
                <TextField sx={{ width: '100%' }} disabled label="Analisis" name="analisis" onChange={handleChangeDet} />
            </Grid>

            <Grid item xs={12} md={6}>
                <TextField sx={{ width: '100%' }} label="Periodo" name="periodo" onChange={handleChangeDet} />
            </Grid>

            <Grid item xs={8} md={9}>
                <TextField sx={{ width: '100%' }} name="fecha" type="date" onChange={handleChangeDet} />
            </Grid>

            <Grid item xs={6} md={4}>
                <Autocomplete
                    disableClearable={true}
                    sx={{ width: '100%' }}
                    id="Operarios"
                    options={operarios}
                    filterOptions={options => operarios.filter(cliente => cliente.idPerfil === 1004)}
                    getOptionLabel={option => option.nombre + ' ' + option.apellidos}
                    renderInput={(params) => <TextField {...params} label="Operario" name="operario" />}
                    onChange={(event, value) => setAnalisisSeleccionado(prevState => ({
                        ...prevState,
                        operario: value.nombre + ' ' + value.apellidos
                    }))}
                />
            </Grid>

            <Grid item xs={4} md={3}>
                <TextField
                    //disabled={estadoProtocolo}
                    sx={{ width: '100%' }}
                    id='protocolo'
                    label="Protocolo"
                    select
                    name="protocolo"
                    onChange={handleChangeDet}
                >
                    {protocolos.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
            </Grid>

            <Grid item xs={6} md={4}>
                <TextField sx={{ width: '100%' }} label="observaciones" name="observaciones" onChange={handleChangeDet} />
            </Grid>

        </>
    )
}