import { useState, useEffect } from 'react';
import { Grid, TextField, FormControlLabel, Checkbox, Autocomplete, Typography } from '@mui/material';
import { getPerfiles, getClientes } from '../../api';

export const EditarUsuarioModal = ({ change: handleChange, handleChangeContraseña, handleChangePerfil, handleChangeCheckbox, estadoCliente, usuarioSeleccionado, handlePdf, setUsuarioSeleccionado, perfilUsuario, clienteUsuario, fileChange, errorPerfil, errorNombre, errorContraseña, clientesUnicos }) => {

    const [perfiles, setPerfiles] = useState([]);

    useEffect(() => {

        getPerfiles()
            .then(resp => setPerfiles(resp.filter(perfil => !perfil.deleted)))
            .catch(err => console.log('Ha habido un error:', err));

    }, []);

    return (
        <>
            <Grid item xs={6} md={4}>
                <TextField sx={{ width: '100%', marginTop: '25px' }} label="Nombre" name="nombre" onChange={handleChange} value={usuarioSeleccionado && usuarioSeleccionado.nombre} error={errorNombre} helperText={errorNombre ? 'Este campo es obligatorio' : ' '} />
            </Grid>

            <Grid item xs={6} md={5}>
                <TextField sx={{ width: '100%' }} label="Apellidos" name="apellidos" onChange={handleChange} value={usuarioSeleccionado && usuarioSeleccionado.apellidos} />
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
                    value={usuarioSeleccionado && usuarioSeleccionado.telefono}
                />
            </Grid>

            <Grid item xs={6} md={4}>
                <TextField sx={{ width: '100%' }} label="Usuario" name="usuario" onChange={handleChange} value={usuarioSeleccionado && usuarioSeleccionado.usuario} />
            </Grid>

            <Grid item xs={4} md={4}>
                <TextField sx={{ width: '100%', marginTop: '25px' }} label="Contraseña" name="password" type="password" onChange={handleChangeContraseña} error={errorContraseña} helperText={errorContraseña ? 'Este campo tiene que ser mayor de 3 caracteres' : ' '} />
            </Grid>

            <Grid item xs={4}>
                <FormControlLabel
                    control={<Checkbox />}
                    checked={usuarioSeleccionado.activo}
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
                    options={perfiles}
                    style={{ marginTop: '25px' }}
                    defaultValue={perfilUsuario[0]}
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
                    defaultValue={clienteUsuario[0]}
                    options={clientesUnicos}
                    getOptionLabel={option => option.razonSocial}
                    renderInput={params => <TextField {...params} label="Clientes" name="idCliente" />}
                    onChange={(event, value) => setUsuarioSeleccionado(prevState => ({
                        ...prevState,
                        idCliente: value.codigo
                    }))}
                />
            </Grid>
            <Grid item xs={8} md={12}>
                <div className="file-select" id="src-file2" >
                    <input type="file" name="src-file2" aria-label="Archivo" onChange={handlePdf} />
                </div>
                <Typography> {fileChange ? fileChange.name : "Seleccionar un archivo"} </Typography>
            </Grid>
        </>
    )
}