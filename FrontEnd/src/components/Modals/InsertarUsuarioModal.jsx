import { useState, useEffect } from 'react';
import { Grid, Button, TextField, FormControlLabel, Checkbox, Autocomplete } from '@mui/material';
import { getClientes, getPerfiles } from '../../api';

export const InsertarUsuarioModal = ({ change:handleChange, handleChangePerfil, estadoCliente, setUsuarioSeleccionado }) =>{

    const [perfiles, setPerfiles] = useState([]);
    const [clientes, setClientes] = useState([]);

    useEffect(() => {

        getPerfiles()
            .then( perfil => {
                setPerfiles(perfil);
            })
            .catch( err => console.log('Ha habido un error:', err));
        
        getClientes()
            .then(clientes => {
                setClientes(clientes);
            })

    }, []);

    return (
        <>
            <Grid item xs={ 6 } md={ 4 }>
                <TextField sx={{ width: '100%' }} label="Nombre" name="nombre" onChange={ handleChange } />
            </Grid>

            <Grid item xs={ 6 } md={ 5}>
                <TextField sx={{ width: '100%' }} label="Apellidos" name="apellidos" onChange={ handleChange } />
            </Grid>

            <Grid item xs={ 6 } md={ 3 }>
                <TextField sx={{ width: '100%' }} label="Teléfono" name="telefono" type="number" onChange={ handleChange } />
            </Grid>

            <Grid item xs={ 6 } md={ 4 }>
                <TextField sx={{ width: '100%' }} label="Usuario" name="usuario" onChange={ handleChange } />
            </Grid>

            <Grid item xs={ 4 } md={ 4 }>
                <TextField sx={{ width: '100%' }} label="Contraseña" name="password" type="password" onChange={ handleChange } />
            </Grid>

            <Grid item xs={4} md={ 4 }>
                <TextField sx={{ width: '100%' }} label="Repetir Contraseña" name="repetir_contraseña" type="password" onChange={ handleChange } />
            </Grid>

            <Grid item xs={ 4 }>
                <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    label="Usuario activo"
                    name="activo"
                    onChange={ handleChange }
                />
            </Grid>

            {/* Desplegable de Perfiles */}
            <Grid item xs={ 4 }>
                <Autocomplete
                    disableClearable={ true }
                    id="CboPerfiles"
                    options={ perfiles }
                    getOptionLabel={ option => option.nombre }
                    renderInput={ params => <TextField {...params} label="Perfil" name="idPerfil" /> }
                    onChange={ handleChangePerfil }
                />
            </Grid>

            {/* Desplegable de Clientes */}
            <Grid item xs={ 4 }>
                <Autocomplete
                    disableClearable={ true }
                    disabled={ estadoCliente }
                    id="CboClientes"
                    options={ clientes }
                    getOptionLabel={ option => option.razonSocial }
                    renderInput={ params => <TextField {...params} label="Clientes" name="idCliente"/> }
                    onChange={ (event, value) => setUsuarioSeleccionado(prevState=>({
                       ...prevState,
                       idCliente: value.id
                    }))}
                />
            </Grid>
        </>
    )
}