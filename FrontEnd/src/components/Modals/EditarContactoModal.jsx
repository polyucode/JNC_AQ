import { useState, useEffect } from 'react';
import { Grid, Button, TextField, FormControlLabel, Checkbox, Autocomplete } from '@mui/material';
import { getPerfiles } from '../../api';

export const EditarContactoModal = ({ change:handleChangeContacto, contactoSeleccionado }) =>{

    const [perfiles, setPerfiles] = useState([]);

    useEffect(() => {

        getPerfiles()
            .then( perfil => {
                setPerfiles(perfil);
            })
            .catch( err => console.log('Ha habido un error:', err));

    }, []);

    return (
        <>
            <Grid item xs={ 6 } md={ 4 }>
                <TextField sx={{ width: '100%' }} label="CodigoCliente" disabled name="codigoCliente" onChange={ handleChangeContacto } value={contactoSeleccionado && contactoSeleccionado.codigoCliente}  />
            </Grid>
            <Grid item xs={ 6 } md={ 4 }>
                <TextField sx={{ width: '100%' }} label="Nombre" name="nombre" onChange={ handleChangeContacto } value={contactoSeleccionado && contactoSeleccionado.nombre}  />
            </Grid>

            <Grid item xs={ 6 } md={ 5}>
                <TextField sx={{ width: '100%' }} label="Telefono" name="telefono" onChange={ handleChangeContacto } value={contactoSeleccionado && contactoSeleccionado.telefono} />
            </Grid>

            <Grid item xs={ 6 } md={ 3 }>
                <TextField sx={{ width: '100%' }} label="Email" name="email" onChange={ handleChangeContacto } value={contactoSeleccionado && contactoSeleccionado.email} />
            </Grid>

            <Grid item xs={ 6 } md={ 4 }>
                <TextField sx={{ width: '100%' }} label="Cargo" name="cargo" onChange={ handleChangeContacto } value={contactoSeleccionado && contactoSeleccionado.cargo} />
            </Grid>

            <Grid item xs={ 6 } md={ 4 }>
                <TextField sx={{ width: '100%' }} label="Comentarios" name="comentarios" onChange={ handleChangeContacto } value={contactoSeleccionado && contactoSeleccionado.comentarios} />
            </Grid>
        </>
    )
}