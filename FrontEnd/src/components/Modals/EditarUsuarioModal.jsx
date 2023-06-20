import { useState, useEffect } from 'react';
import { Grid, Button, TextField, FormControlLabel, Checkbox, Autocomplete, Typography } from '@mui/material';
import { getPerfiles, getClientes } from '../../api';

export const EditarUsuarioModal = ({ change: handleChange, handleChangePerfil, estadoCliente, usuarioSeleccionado, handlePdf, setUsuarioSeleccionado, perfilUsuario, clienteUsuario, fileChange }) => {

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
                <TextField sx={{ width: '100%' }} label="Nombre" name="nombre" onChange={handleChange} value={usuarioSeleccionado && usuarioSeleccionado.nombre} />
            </Grid>

            <Grid item xs={6} md={5}>
                <TextField sx={{ width: '100%' }} label="Apellidos" name="apellidos" onChange={handleChange} value={usuarioSeleccionado && usuarioSeleccionado.apellidos} />
            </Grid>

            <Grid item xs={6} md={3}>
                <TextField sx={{ width: '100%' }} label="Teléfono" name="telefono" type="number" onChange={handleChange} value={usuarioSeleccionado && usuarioSeleccionado.telefono} />
            </Grid>

            <Grid item xs={6} md={4}>
                <TextField sx={{ width: '100%' }} label="Usuario" name="usuario" onChange={handleChange} value={usuarioSeleccionado && usuarioSeleccionado.usuario} />
            </Grid>

            <Grid item xs={4}>
                <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    label="Usuario activo"
                    name="activo"
                    onChange={handleChange}
                />
            </Grid>

            {/* Desplegable de Perfiles */}
            <Grid item xs={4}>
                <Autocomplete
                    disableClearable={true}
                    id="CboPerfiles"
                    options={perfiles}
                    defaultValue={perfilUsuario[0]}
                    getOptionLabel={option => option.nombre}
                    renderInput={params => <TextField {...params} label="Perfil" name="idPerfil" />}
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
                    options={clientes}
                    getOptionLabel={option => option.razonSocial}
                    renderInput={params => <TextField {...params} label="Clientes" name="idCliente" />}
                    onChange={(event, value) => setUsuarioSeleccionado(prevState => ({
                        ...prevState,
                        idCliente: value.id
                    }))}
                />
            </Grid>
            <Grid item xs={8} md={12}>
                <div className="file-select" id="src-file2" >
                    <input type="file" name="src-file2" aria-label="Archivo" onChange={handlePdf} />
                </div>
                <Typography> {fileChange ? fileChange.name : "Seleccionar un archivo"} </Typography>
                {/*<Button variant="contained" component="label" sx={{ width: '40%', marginRight: '15px' }} onClick={subidaPdf()}>
                    Subir PDF
                </Button>*/}
            </Grid>
        </>
    )
}