import { useState, useEffect } from 'react';
import { Grid, TextField, Autocomplete } from '@mui/material';
import { getClientes, getContactos, getProductos } from '../../api';

export const InsertarOfertaModal = ({ change: handleChange, autocompleteChange, ofertaSeleccionada, setOfertaSeleccionada, handleChangeFecha, handleChangeAutocomplete, handleChangeDecimal, errorCodigo, errorFechaFinal, errorFechaInicio, errorPedido, errorOferta, errorPrecio }) => {

    const [contactos, setContactos] = useState([]);
    const [clientes, setClientes] = useState([]); 
    const [productos, setProductos] = useState([]);

    useEffect(() => {

        getContactos()
            .then(contactos => {
                setContactos(contactos);
            })

        getClientes()
            .then(clientes => {
                setClientes(clientes);
            })
        
        getProductos()
            .then(productos => {
                setProductos(productos);
            })

    }, [])

    return (
        <>
            <Grid item xs={3} md={4}>
                <TextField sx={{ width: '100%', marginTop: '25px' }} label="Numero Oferta" name="numeroOferta" type="number" onChange={handleChange} error={errorOferta} helperText={errorOferta ? 'Este campo es obligatorio' : ' '} />
            </Grid>

            <Grid item xs={6} md={5}>
                <TextField sx={{ width: '100%' }} label="Descripcion" name="descripcion" onChange={handleChange} />
            </Grid>

            <Grid item xs={3} md={3}>
                <TextField sx={{ width: '100%', marginTop: '25px' }} label="Pedido" name="pedido" type="number" onChange={handleChange} error={errorPedido} helperText={errorPedido ? 'Este campo es obligatorio' : ' '} />
            </Grid>

            <Grid item xs={3} md={3}>
                <TextField sx={{ width: '100%'}} label="Referencia Cliente" name="referencia" onChange={handleChange} />
            </Grid>

            <Grid item xs={6} md={3}>
                <Autocomplete
                    disableClearable={true}
                    id="CodigoCliente"
                    options={clientes}
                    value={clientes.find(cliente => cliente.codigo === ofertaSeleccionada.codigoCliente) || null}
                    filterOptions={options => clientes.filter(cliente => !cliente.deleted)}
                    getOptionLabel={option => option.codigo.toString()}
                    sx={{ width: '100%', marginTop: '25px' }}
                    renderInput={(params) => <TextField {...params} label="CodigoCliente" name="codigoCliente" error={errorCodigo} helperText={errorCodigo ? 'Este campo es obligatorio' : ' '} />}
                    onChange={(event, value) => setOfertaSeleccionada(prevState => ({
                        ...prevState,
                        codigoCliente: value ? parseInt(value.codigo) : null,
                        contacto1: '',
                        contacto2: '',
                        contacto3: ''
                    }))}
                />
            </Grid>

            <Grid item xs={6} md={6}>
            <Autocomplete
                    disableClearable={true}
                    id="nombreCliente"
                    options={clientes}
                    value={clientes.find(cliente => cliente.razonSocial === ofertaSeleccionada.nombreCliente) || null}
                    filterOptions={options => clientes.filter(cliente => !cliente.deleted)}
                    getOptionLabel={option => option.razonSocial}
                    sx={{ width: '100%'}}
                    renderInput={(params) => <TextField {...params} label="Nombre Cliente" name="nombreCliente" />}
                    onChange={(event, value) => setOfertaSeleccionada(prevState => ({
                        ...prevState,
                        codigoCliente: value ? parseInt(value.codigo) : null,
                        nombreCliente: value ? value.razonSocial : null,
                        contacto1: '',
                        contacto2: '',
                        contacto3: ''
                    }))}
                />
            </Grid>

            <Grid item xs={12} md={2} style={{ display: 'flex' }}>
                <p> Fecha inicio </p>
            </Grid>
            <Grid item xs={12} md={4}>
                <TextField
                    id="fechainicio"
                    type="date"
                    name="fechaInicio"
                    sx={{ width: '100%', marginTop: '25px' }}
                    onChange={handleChangeFecha}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    error={errorFechaInicio}
                    helperText={errorFechaInicio ? 'Introduzca una fecha' : ' '}
                />
            </Grid>

            <Grid item xs={12} md={2} style={{ display: 'flex' }}>
                <p> Fecha Finalización </p>
            </Grid>
            <Grid item xs={8} md={4}>
                <TextField
                    id="fechafinalizacion"
                    type="date"
                    name="fechaFinalizacion"
                    sx={{ width: '100%', marginTop: '25px' }}
                    onChange={handleChangeFecha}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    error={errorFechaFinal}
                    helperText={errorFechaFinal ? 'Introduzca una fecha mayor que la de inicio' : ' '}
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

            <Grid item xs={6} md={4}>
                <Autocomplete
                    disableClearable={true}
                    id="contacto2"
                    inputValue={ofertaSeleccionada.contacto2}
                    options={contactos}
                    filterOptions={options => contactos.filter(contacto => contacto.codigoCliente === ofertaSeleccionada.codigoCliente && contacto.nombre !== ofertaSeleccionada.contacto1)}
                    getOptionLabel={option => option.nombre}
                    sx={{ width: '100%' }}
                    renderInput={(params) => <TextField {...params} name="contacto2" label="Contacto 2" />}
                    onChange={(event, value) => setOfertaSeleccionada(prevState => ({
                        ...prevState,
                        contacto2: value.nombre
                    }))}
                />
            </Grid>

            <Grid item xs={6} md={4}>
                <Autocomplete
                    disableClearable={true}
                    id="contacto3"
                    inputValue={ofertaSeleccionada.contacto3}
                    options={contactos}
                    filterOptions={options => contactos.filter(contacto => contacto.codigoCliente === ofertaSeleccionada.codigoCliente && contacto.nombre !== ofertaSeleccionada.contacto1)}
                    getOptionLabel={option => option.nombre}
                    sx={{ width: '100%' }}
                    renderInput={(params) => <TextField {...params} name="contacto3" label="Contacto 3" />}
                    onChange={(event, value) => setOfertaSeleccionada(prevState => ({
                        ...prevState,
                        contacto3: value.nombre
                    }))}
                />
            </Grid>

            <Grid item xs={6} md={4}>
                <Autocomplete
                    disableClearable={true}
                    id="producto"
                    options={productos}
                    getOptionLabel={option => option.descripcion}
                    sx={{ width: '100%' }}
                    renderInput={(params) => <TextField {...params} name="producto" label="Producto" />}
                    onChange={(event, value) => setOfertaSeleccionada(prevState => ({
                        ...prevState,
                        producto: value.id,
                        descripcionProducto: value.descripcion
                    }))}
                />
            </Grid>

            <Grid item xs={6} md={4}>
                <TextField sx={{ width: '100%' }} label="Unidades" name="unidades" type='number' onChange={handleChange} />
            </Grid>

            <Grid item xs={6} md={4}>
                <TextField sx={{ width: '100%', marginTop: '25px' }} label="Precio" name="precio" onChange={handleChangeDecimal} error={errorPrecio} helperText={errorPrecio ? 'El formato es máximo 2 decimales' : ' '} />
            </Grid>

        </>
    )
}