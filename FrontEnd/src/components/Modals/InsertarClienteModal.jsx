import { useState, useEffect } from 'react';
import { Grid, TextField, Autocomplete } from '@mui/material';
import { getComarcas, getPoblaciones, getProvincias } from '../../api/apiBackend';

export const InsertarClienteModal = ({ change:handleChange, autocompleteChange, clienteModificado }) =>{

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
                <TextField sx={{ width: '100%' }} label="Código" name="codigo" onChange={ handleChange } />
            </Grid>

            <Grid item xs={ 3 } md={ 4 }>
                <TextField sx={{ width: '100%' }} label="CIF" name="cif" onChange={ handleChange } />
            </Grid>

            <Grid item xs={ 6 } md={ 4 }>
                <TextField sx={{ width: '100%' }} label="Razón social" name="razonSocial" onChange={ handleChange } />
            </Grid>

            <Grid item xs={ 6 } md={ 3 }>
                <TextField sx={{ width: '100%' }} label="Teléfono" name="telefono" type="number" onChange={ handleChange } />
            </Grid>

            <Grid item xs={ 6 } md={ 3 }>
                <TextField sx={{ width: '100%' }} label="Móvil" name="movil" type="number" onChange={ handleChange } />
            </Grid>

            <Grid item xs={ 12 } md={ 6 }>
                <TextField sx={{ width: '100%' }} label="Email" name="email" type="email" onChange={ handleChange } />
            </Grid>

            <Grid item xs={ 8 } md={ 9 }>
                <TextField sx={{ width: '100%' }} label="Dirección" name="direccion" onChange={ handleChange } />
            </Grid>

            <Grid item xs={ 4 } md={ 3 }>
                <TextField sx={{ width: '100%' }} label="CP" name="cp" type="number" onChange={ handleChange } />
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
                <Autocomplete
                    disableClearable={ true }
                    id="provincia"
                    options={ provincias }
                    getOptionLabel={ option => option.descripcion }
                    renderInput={ params => <TextField {...params} label="Provincia" name="provincia" /> }
                    onChange={ autocompleteChange }
                />
            </Grid>

            <Grid item xs={ 6 } md={ 4 }>
                <TextField sx={{ width: '100%' }} label="País" name="pais" onChange={ handleChange } />
            </Grid>

            {/* Deplegable de Poblaciones */}
            <Grid item xs={ 12 } md={ 8 }>
                <Autocomplete
                    disableClearable={ true }
                    id="poblacion"
                    options={ poblaciones }
                    getOptionLabel={ option => option.poblacion }
                    renderOption={ ( props, option ) => {
                        return (<li {...props} key={option.id}>{option.poblacion}</li>)
                    }}
                    renderInput={ params => {
                        return (<TextField {...params} label="Población" name="poblacion" />)
                    }}
                    onChange={ autocompleteChange }
                />
            </Grid>

        </>
    )
}