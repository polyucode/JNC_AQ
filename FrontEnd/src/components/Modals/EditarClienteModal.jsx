import { useState, useEffect } from 'react';
import { Grid, TextField, Autocomplete } from '@mui/material';
import { getComarcas, getPoblaciones, getProvincias } from '../../api/apiBackend';

export const EditarClienteModal = ({ change:handleChange, autocompleteChange, clienteSeleccionado }) =>{

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
                <TextField sx={{ width: '100%' }} label="Código" name="codigo" type="number" onChange={ handleChange } value={clienteSeleccionado && clienteSeleccionado.codigo} />
            </Grid>

            <Grid item xs={ 3 } md={ 4 }>
                <TextField sx={{ width: '100%' }} label="CIF" name="cif" onChange={ handleChange } value={clienteSeleccionado && clienteSeleccionado.cif} />
            </Grid>

            <Grid item xs={ 6 } md={ 4 }>
                <TextField sx={{ width: '100%' }} label="Razón social" name="razonSocial" onChange={ handleChange } value={clienteSeleccionado && clienteSeleccionado.razonSocial} />
            </Grid>

            <Grid item xs={ 6 } md={ 3 }>
                <TextField sx={{ width: '100%' }} label="Teléfono" name="telefono" onChange={ handleChange } value={clienteSeleccionado && clienteSeleccionado.telefono} />
            </Grid>

            <Grid item xs={ 6 } md={ 3 }>
                <TextField sx={{ width: '100%' }} label="Móvil" name="movil" onChange={ handleChange } value={clienteSeleccionado && clienteSeleccionado.movil} />
            </Grid>

            <Grid item xs={ 12 } md={ 6 }>
                <TextField sx={{ width: '100%' }} label="Email" name="email" type="email" onChange={ handleChange } value={clienteSeleccionado && clienteSeleccionado.email} />
            </Grid>

            <Grid item xs={ 8 } md={ 9 }>
                <TextField sx={{ width: '100%' }} label="Dirección" name="direccion" onChange={ handleChange } value={clienteSeleccionado && clienteSeleccionado.direccion} />
            </Grid>

            <Grid item xs={ 4 } md={ 3 }>
                <TextField sx={{ width: '100%' }} label="CP" name="cp" onChange={ handleChange } value={clienteSeleccionado && clienteSeleccionado.cp} />
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