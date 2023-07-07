import { useState, useEffect } from 'react';
import { Grid, TextField, Autocomplete } from '@mui/material';
import { getContactos, getClientes } from '../../api';

export const EditarOfertaModal = ({ change: handleChange, autocompleteChange, ofertaSeleccionada, setOfertaSeleccionada, handleChangeFecha, codigoClienteEditar, contacto1Editar, contacto2Editar, contacto3Editar }) => {

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

    function formateandofechas(fecha) {
        if(fecha !== null){
            const fecha1 = new Date(fecha)

            const fecha2 = fecha1.getFullYear() +
                '-' + String(fecha1.getMonth() + 1).padStart(2, '0') +
                '-' + String(fecha1.getDate()).padStart(2, '0')
    
            return fecha2
        } else{
            return null
        }       
    }

    return (
        <>
            <Grid item xs={3} md={4}>
                <TextField sx={{ width: '100%' }} label="Numero Oferta" name="numeroOferta" type="number" onChange={handleChange} value={ofertaSeleccionada && ofertaSeleccionada.numeroOferta} />
            </Grid>

            <Grid item xs={6} md={8}>
                <TextField sx={{ width: '100%' }} label="Descripcion" name="descripcion" onChange={handleChange} value={ofertaSeleccionada && ofertaSeleccionada.descripcion} />
            </Grid>

            <Grid item xs={3} md={3}>
                <TextField sx={{ width: '100%' }} label="Pedido" name="pedido" type="number" onChange={handleChange} value={ofertaSeleccionada && ofertaSeleccionada.pedido} />
            </Grid>

            <Grid item xs={6} md={3}>
                <Autocomplete
                    disableClearable={true}
                    id="CboClientes"
                    options={clientes}
                    getOptionLabel={option => option.codigo}
                    defaultValue={codigoClienteEditar[0]}
                    sx={{ width: '100%' }}
                    renderInput={(params) => <TextField {...params} label="Codigo Cliente" name="codigoCliente" />}
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
                    id='nombreCliente'
                    label="Nombre Cliente"
                    sx={{ width: '100%' }}
                    value={ofertaSeleccionada && ofertaSeleccionada.nombreCliente}
                    name="nombreCliente"
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
                    value={ofertaSeleccionada && formateandofechas(ofertaSeleccionada.fechaInicio)}
                />
            </Grid>

            <Grid item xs={12} md={3} style={{ display: 'flex' }}>
                <p> Fecha Finalización </p>
            </Grid>
            <Grid item xs={12} md={9}>
                <TextField
                    id="fechafinalizacion"
                    type="date"
                    name="fechaFinalizacion"
                    sx={{ width: '100%' }}
                    onChange={handleChangeFecha}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={ofertaSeleccionada && formateandofechas(ofertaSeleccionada.fechaFinalizacion)}
                />
            </Grid>

            <Grid item xs={4} md={4}>
                <Autocomplete
                    disableClearable={true}
                    id="contacto1"
                    inputValue={ofertaSeleccionada.contacto1}
                    options={contactos}
                    defaultValue={contacto1Editar[0]}
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
                    defaultValue={contacto2Editar[0]}
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
                    defaultValue={contacto3Editar[0]}
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

        </>
    )
}