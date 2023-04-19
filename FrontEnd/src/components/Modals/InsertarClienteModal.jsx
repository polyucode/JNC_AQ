import { useState, useEffect } from 'react';
import { Grid, TextField, Autocomplete } from '@mui/material';
import { getComarcas, getPoblaciones, getProvincias } from '../../api';

export const InsertarClienteModal = ({ change:handleChange, autocompleteChange, clienteSeleccionado }) =>{

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
                <TextField sx={{ width: '100%' }} label="Código" name="codigo" type="number" onChange={ handleChange } />
            </Grid>

            <Grid item xs={ 3 } md={ 4 }>
                <TextField sx={{ width: '100%' }} label="CIF" name="cif" onChange={ handleChange } />
            </Grid>

            <Grid item xs={ 6 } md={ 4 }>
                <TextField sx={{ width: '100%' }} label="Razón social" name="razonSocial" onChange={ handleChange } />
            </Grid>

            <Grid item xs={ 6 } md={ 3 }>
                <TextField sx={{ width: '100%' }} label="Teléfono" name="telefono" onChange={ handleChange } />
            </Grid>

            <Grid item xs={ 6 } md={ 3 }>
                <TextField sx={{ width: '100%' }} label="Móvil" name="movil" onChange={ handleChange } />
            </Grid>

            <Grid item xs={ 12 } md={ 6 }>
                <TextField sx={{ width: '100%' }} label="Email" name="email" type="email" onChange={ handleChange } />
            </Grid>

            <Grid item xs={ 8 } md={ 9 }>
                <TextField sx={{ width: '100%' }} label="Dirección" name="direccion" onChange={ handleChange } />
            </Grid>

            <Grid item xs={ 4 } md={ 3 }>
                <TextField sx={{ width: '100%' }} label="CP" name="cp" onChange={ handleChange } />
            </Grid>

            {/* Desplegable de Comarcas */}
            <Grid item xs={ 6 } md={ 4 }>
                <Autocomplete
                    disableClearable={ true }
                    id="comarca"
                    options={ comarcas }
                    getOptionLabel={ option => option.descripcion }
                    renderInput={ params => <TextField {...params} label="Comarca" name="comarca" /> }
                    onChange={ autocompleteChange }
                />
            </Grid>

            {/* Desplegable de Provincias */}
            <Grid item xs={ 6 } md={ 4 }>
                <TextField sx={{ width: '100%' }} label="Província" name="provincia" onChange={handleChange} value={clienteSeleccionado && clienteSeleccionado.provincia} />
            </Grid>

            {/* Deplegable de Poblaciones */}
            <Grid item xs={ 12 } md={ 8 }>
                <TextField sx={{ width: '100%' }} label="Población" name="poblacion" onChange={handleChange} value={clienteSeleccionado && clienteSeleccionado.poblacion} />
            </Grid>

        </>
    )
}