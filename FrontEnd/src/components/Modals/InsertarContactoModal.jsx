import { useState, useEffect } from 'react';
import { Grid, TextField, Autocomplete } from '@mui/material';
import { getComarcas, getPoblaciones, getProvincias } from '../../api/apiBackend';

export const InsertarContactoModal = ({ change:handleChange, autocompleteChange }) =>{

    // Declaramos variables necesarias
    const [comarcas, setComarcas] = useState([]);
    const [provincias, setProvincias] = useState([]);
    const [poblaciones, setPoblaciones] = useState([]);

    // Obtener la lista de Comarcas
    useEffect(() => {
  
        getComarcas()
            .then( comarcas => {
                setComarcas( comarcas );
            });
      
    }, []);

    // Obtener la lista de Provincias
    useEffect(() => {
  
        getProvincias()
            .then( provincias => {
                setProvincias( provincias );
            });
      
    }, []);

    // Obtener la lista de Poblaciones
    useEffect(() => {
  
        getPoblaciones()
            .then( poblaciones => {
                setPoblaciones( poblaciones );
            });
      
    }, []);

    return (
        <>
            <Grid item xs={ 3 } md={ 4 }>
                <TextField sx={{ width: '100%' }} label="Código Cliente" name="codigoCliente" type="number" onChange={ handleChange } />
            </Grid>

            <Grid item xs={ 3 } md={ 4 }>
                <TextField sx={{ width: '100%' }} label="Nombre" name="nombre" onChange={ handleChange } />
            </Grid>

            <Grid item xs={ 6 } md={ 4 }>
                <TextField sx={{ width: '100%' }} label="Telefono" name="telefono" onChange={ handleChange } />
            </Grid>

            <Grid item xs={ 6 } md={ 3 }>
                <TextField sx={{ width: '100%' }} label="Email" name="email" onChange={ handleChange } />
            </Grid>

            <Grid item xs={ 6 } md={ 3 }>
                <TextField sx={{ width: '100%' }} label="Cargo" name="cargo" onChange={ handleChange } />
            </Grid>

            <Grid item xs={ 12 } md={ 6 }>
                <TextField sx={{ width: '100%' }} label="Comentarios" name="comentarios" onChange={ handleChange } />
            </Grid>

        </>
    )
}