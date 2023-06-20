import { useState, useEffect } from 'react';
import { Grid, TextField, Autocomplete } from '@mui/material';
import { getClientes, getContactos } from '../../api';

export const InsertarOfertaModal = ({ change: handleChange, autocompleteChange, ofertaSeleccionada, setOfertaSeleccionada, handleChangeFecha }) => {

    const [contactos, setContactos] = useState([]);
    const [clientes, setClientes] = useState([]);

    useEffect(() => {

        getContactos()
            .then(contactos => {
                setContactos(contactos);
            })

        getClientes()
            .then(clientes => {
                setClientes(clientes);
            })

    }, [])

    return (
        <>
            <Grid item xs={3} md={4}>
                <TextField sx={{ width: '100%' }} label="Numero Oferta" name="numeroOferta" type="number" onChange={handleChange} />
            </Grid>

            <Grid item xs={6} md={3}>
                <TextField sx={{ width: '100%' }} label="Descripcion" name="descripcion" onChange={handleChange} />
            </Grid>

            <Grid item xs={3} md={4}>
                <TextField sx={{ width: '100%' }} label="Pedido" name="pedido" type="number" onChange={handleChange} />
            </Grid>

            <Grid item xs={6} md={4}>
                <Autocomplete
                    disableClearable={true}
                    id="CodigoCliente"
                    options={clientes}
                    getOptionLabel={option => option.codigo}
                    sx={{ width: '100%' }}
                    renderInput={(params) => <TextField {...params} label="CodigoCliente" name="codigoCliente" />}
                    onChange={(event, value) => setOfertaSeleccionada(prevState => ({
                        ...prevState,
                        codigoCliente: parseInt(value.codigo),
                        contacto1: '',
                        contacto2: '',
                        contacto3: ''
                    }))}
                />
            </Grid>

            <Grid item xs={6} md={6}>
                <TextField
                    sx={{ width: '100%' }}
                    label="Nombre del cliente"
                    id='nombreCliente'
                    name="nombreCliente"
                    value={ofertaSeleccionada && ofertaSeleccionada.nombreCliente}
                    onChange={handleChange}
                />
            </Grid>

            <Grid item xs={12} md={3} style={{ display: 'flex' }}>
                <p> Fecha inicio </p>
            </Grid>
            <Grid item xs={12} md={9}>
                <TextField
                    id="fechainicio"
                    type="date"
                    name="fechaInicio"
                    sx={{ width: '100%' }}
                    onChange={handleChangeFecha}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </Grid>

            <Grid item xs={12} md={3} style={{ display: 'flex' }}>
                <p> Fecha Finalización </p>
            </Grid>
            <Grid item xs={8} md={9}>
                <TextField
                    id="fechafinalizacion"
                    type="date"
                    name="fechaFinalizacion"
                    sx={{ width: '100%' }}
                    onChange={handleChangeFecha}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </Grid>

            <Grid item xs={4} md={4}>
                <Autocomplete
                    disableClearable={true}
                    id="contacto1"
                    inputValue={ofertaSeleccionada.contacto1}
                    options={contactos}
                    filterOptions={options => contactos.filter(contacto => contacto.codigoCliente === ofertaSeleccionada.codigoCliente && contacto.nombre !== ofertaSeleccionada.contacto2)}
                    getOptionLabel={option => option.nombre}
                    sx={{ width: '100%' }}
                    renderInput={(params) => <TextField {...params} name="contacto1" label="Contacto 1" />}
                    onChange={(event, value) => setOfertaSeleccionada(prevState => ({
                        ...prevState,
                        contacto1: value.nombre
                    }))}
                />
            </Grid>

            {/* Desplegable de Comarcas */}
            <Grid item xs={6} md={4}>
                <Autocomplete
                    disableClearable={true}
                    id="contacto2"
                    inputValue={ofertaSeleccionada.contacto2}
                    options={contactos}
                    filterOptions={options => contactos.filter(contacto => contacto.codigoCliente === ofertaSeleccionada.codigoCliente && contacto.nombre !== ofertaSeleccionada.contacto1)}
                    getOptionLabel={option => option.nombre}
                    sx={{ width: '100%' }}
                    renderInput={(params) => <TextField {...params} name="contacto2" label="Contacto 2"  />}
                    onChange={(event, value) => setOfertaSeleccionada(prevState => ({
                        ...prevState,
                        contacto2: value.nombre
                    }))}
                />
            </Grid>

            {/* Desplegable de Provincias */}
            <Grid item xs={6} md={4}>
                <Autocomplete
                    disableClearable={true}
                    id="contacto3"
                    inputValue={ofertaSeleccionada.contacto3}
                    options={contactos}
                    filterOptions={options => contactos.filter(contacto => contacto.codigoCliente === ofertaSeleccionada.codigoCliente && contacto.nombre !== ofertaSeleccionada.contacto1)}
                    getOptionLabel={option => option.nombre}
                    sx={{ width: '100%' }}
                    renderInput={(params) => <TextField {...params} name="contacto3" label="Contacto 3"  />}
                    onChange={(event, value) => setOfertaSeleccionada(prevState => ({
                        ...prevState,
                        contacto3: value.nombre
                    }))}
                />
            </Grid>

        </>
    )
}