import { useState, useEffect } from 'react';
import { Grid, TextField, Autocomplete } from '@mui/material';
import { getComarcas, getPoblaciones, getProvincias } from '../../api/apiBackend';

export const InsertarTareaModal = ({ change: handleChange, autocompleteChange, setFechaPrevista, handleChangeFecha }) => {

    // Declaramos variables necesarias
    const [comarcas, setComarcas] = useState([]);
    const [provincias, setProvincias] = useState([]);
    const [poblaciones, setPoblaciones] = useState([]);

    const [fechaprevista, setfechaprevista] = useState("");

    // Obtener la lista de Comarcas
    useEffect(() => {

        getComarcas()
            .then(comarcas => {
                setComarcas(comarcas);
            });

    }, []);

    // Obtener la lista de Provincias
    useEffect(() => {

        getProvincias()
            .then(provincias => {
                setProvincias(provincias);
            });

    }, []);

    // Obtener la lista de Poblaciones
    useEffect(() => {

        getPoblaciones()
            .then(poblaciones => {
                setPoblaciones(poblaciones);
            });

    }, []);

    return (
        <>
            <Grid item xs={3} md={4}>
                <TextField sx={{ width: '100%' }} label="CódigoCliente" name="codigoCliente" type="number" onChange={handleChange} />
            </Grid>

            <Grid item xs={3} md={4}>
                <TextField sx={{ width: '100%' }} label="Nombre Cliente" name="nombreCliente" onChange={handleChange} />
            </Grid>

            <Grid item xs={6} md={4}>
                <TextField sx={{ width: '100%' }} label="Oferta" name="oferta" onChange={handleChange} />
            </Grid>

            <Grid item xs={6} md={3}>
                <TextField sx={{ width: '100%' }} label="Pedido" name="pedido" onChange={handleChange} />
            </Grid>

            <Grid item xs={6} md={3}>
                <TextField sx={{ width: '100%' }} label="Operario" name="operario" onChange={handleChange} />
            </Grid>

            <Grid item xs={12} md={6}>
                <TextField sx={{ width: '100%' }} label="Protocolo" name="protocolo" onChange={handleChange} />
            </Grid>

            <Grid item xs={8} md={9}>
                <TextField sx={{ width: '100%' }} label="Elemento" name="elementoPlanta" onChange={handleChange} />
            </Grid>

            <Grid item xs={4} md={3}>
                <TextField sx={{ width: '100%' }} label="Analisis" name="analisis" onChange={handleChange} />
            </Grid>

            <Grid item xs={4} md={3}>
                <TextField sx={{ width: '100%' }} type="date" label="Fecha" name="fecha" onChange={handleChangeFecha} />
            </Grid>

            <Grid item xs={4} md={3}>
                <TextField sx={{ width: '100%' }} label="Final" name="final" onChange={handleChange} />
            </Grid>

            <Grid item xs={4} md={3}>
                <TextField sx={{ width: '100%' }} label="Valor" name="valor" onChange={handleChange} />
            </Grid>

            <Grid item xs={4} md={3}>
                <TextField sx={{ width: '100%' }} label="Nombre Valor" name="nombreValor" onChange={handleChange} />
            </Grid>

            <Grid item xs={4} md={3}>
                <TextField sx={{ width: '100%' }} label="Unidades" name="unidades" onChange={handleChange} />
            </Grid>

            <Grid item xs={4} md={3}>
                <TextField sx={{ width: '100%' }} label="Tipo" name="tipo" onChange={handleChange} />
            </Grid>

            <Grid item xs={4} md={3}>
                <TextField sx={{ width: '100%' }} label="Cancelado" name="cancelado" onChange={handleChange} />
            </Grid>

            <Grid item xs={4} md={3}>
                <TextField sx={{ width: '100%' }} label="Comentarios" name="comentarios" onChange={handleChange} />
            </Grid>

        </>
    )
}