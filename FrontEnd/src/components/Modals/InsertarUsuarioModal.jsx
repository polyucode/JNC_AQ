import { useState, useEffect } from 'react';
import { Grid, Button, TextField, FormControlLabel, Checkbox, Autocomplete } from '@mui/material';
import { getClientes, getPerfiles } from '../../api';

export const InsertarUsuarioModal = ({ change: handleChange, handleChangePerfil, handleChangeCheckbox, estadoCliente, setUsuarioSeleccionado, errorPerfil, errorContraseña, errorNombre, errorRepetirContraseña, clientesUnicos }) => {

    const [perfiles, setPerfiles] = useState([]);
    const [clientes, setClientes] = useState([]);

    useEffect(() => {

        getPerfiles()
            .then(perfil => {
                setPerfiles(perfil);
            })
            .catch(err => console.log('Ha habido un error:', err));

        getClientes()
            .then(clientes => {
                setClientes(clientes);
            })

    }, []);

    return (
        <>
            <Grid item xs={6} md={4}>
                <TextField sx={{ width: '100%', marginTop: '25px' }} label="Nombre" name="nombre" onChange={handleChange} error={errorNombre} helperText={errorNombre ? 'Este campo es obligatorio' : ' '} />
            </Grid>

            <Grid item xs={6} md={5}>
                <TextField sx={{ width: '100%' }} label="Apellidos" name="apellidos" onChange={handleChange} />
            </Grid>

            <Grid item xs={6} md={3}>
                <TextField
                    sx={{
                        width: '100%',
                        '& input[type=number]': {
                            MozAppearance: 'textfield',
                            '&::-webkit-outer-spin-button': {
                                WebkitAppearance: 'none',
                                margin: 0
                            },
                            '&::-webkit-inner-spin-button': {
                                WebkitAppearance: 'none',
                                margin: 0
                            }
                        }
                    }}
                    label="Teléfono"
                    name="telefono"
                    type="number"
                    onChange={handleChange}
                />
            </Grid>

            <Grid item xs={6} md={4}>
                <TextField sx={{ width: '100%' }} label="Usuario" name="usuario" onChange={handleChange} />
            </Grid>

            <Grid item xs={4} md={4}>
                <TextField sx={{ width: '100%', marginTop: '25px' }} label="Contraseña" name="password" type="password" onChange={handleChange} error={errorContraseña} helperText={errorContraseña ? 'Este campo tiene que ser mayor de 3 caracteres' : ' '} />
            </Grid>

            <Grid item xs={4} md={4}>
                <TextField sx={{ width: '100%', marginTop: '25px' }} label="Repetir Contraseña" name="repetir_contraseña" type="password" onChange={handleChange} error={errorRepetirContraseña} helperText={errorRepetirContraseña ? 'Este campo no coincide con la contraseña' : ' '} />
            </Grid>

            <Grid item xs={4}>
                <FormControlLabel
                    control={<Checkbox />}
                    label="Usuario activo"
                    name="activo"
                    onChange={handleChangeCheckbox}
                />
            </Grid>

            {/* Desplegable de Perfiles */}
            <Grid item xs={4}>
                <Autocomplete
                    disableClearable={true}
                    id="CboPerfiles"
                    style={{ marginTop: '25px' }}
                    options={perfiles}
                    getOptionLabel={option => option.nombre}
                    renderInput={params => <TextField {...params} label="Perfil" name="idPerfil" error={errorPerfil} helperText={errorPerfil ? 'Este campo es obligatorio' : ' '} />}
                    onChange={handleChangePerfil}
                />
            </Grid>

            {/* Desplegable de Clientes */}
            <Grid item xs={4}>
                <Autocomplete
                    disableClearable={true}
                    disabled={estadoCliente}
                    id="CboClientes"
                    options={clientesUnicos}
                    getOptionLabel={option => option.razonSocial}
                    renderInput={params => <TextField {...params} label="Clientes" name="idCliente" />}
                    onChange={(event, value) => setUsuarioSeleccionado(prevState => ({
                        ...prevState,
                        idCliente: value.codigo
                    }))}
                />
            </Grid>
        </>
    )
}