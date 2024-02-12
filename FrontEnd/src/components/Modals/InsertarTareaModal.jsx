import { useState, useEffect } from 'react';
import { Grid, TextField, Autocomplete, Typography } from '@mui/material';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { getAnalisis, getClientes, getElementos, getOfertas, getUsuarios } from '../../api';

const protocolos = [
    {
        value: 'Desinfeccion Parado 4B',
        label: 'Desinfeccion Parado 4B'
    },
    {
        value: 'Desinfeccion Continuo 4B',
        label: 'Desinfeccion Continuo 4B'
    },
    {
        value: 'Desinfeccion limpieza parado',
        label: 'Desinfeccion limpieza parado'
    },
    {
        value: 'Desinfeccion limpieza continuo',
        label: 'Desinfeccion limpieza continuo'
    },
    {
        value: 'Desinfeccion Protocolo 4C',
        label: 'Desinfeccion Protocolo 4C'
    },
    {
        value: 'Desinfeccion de aporte',
        label: 'Desinfeccion de aporte'
    },
    {
        value: 'Desinfeccion contraincendios',
        label: 'Desinfeccion contraincendios'
    },
    {
        value: 'Desinfeccion parado fuente ornamental',
        label: 'Desinfeccion parado fuente ornamental'
    },
    {
        value: 'Desinfeccion ACS (termico)',
        label: 'Desinfeccion ACS (termico)'
    },
    {
        value: 'Desinfeccion AFCH (cloracion)',
        label: 'Desinfeccion AFCH (cloracion)'
    }
]

const tipos = [
    { id: 1, nombre: "Mensual" },
    { id: 2, nombre: "Bimensual" },
    { id: 3, nombre: "Trimestral" },
    { id: 4, nombre: "Semestral" },
    { id: 5, nombre: "Anual" }
]



export const InsertarTareaModal = 
({ 
    change: handleChange, 
    tareaSeleccionada, 
    handleChangeFecha, 
    setTareaSeleccionada, 
    handleChangeAnalisis, 
    elementosAutocomplete, 
    analisisAutocomplete, 
    errorAnalisis, 
    errorCodigo,
    errorElemento,
    errorFecha, 
    errorOferta, 
    errorOperario, 
    errorPeriodo,
    handlePdf,
    fileChange
}) => {

    // Declaramos variables necesarias
    const [clientes, setClientes] = useState([]);
    const [ofertas, setOfertas] = useState([]);
    const [elementos, setElementos] = useState([]);
    const [analisis, setAnalisis] = useState([]);
    const [operarios, setOperarios] = useState([]);


    useEffect(() => {

        getClientes()
            .then(clientes => {
                setClientes(clientes);
            });

        getOfertas()
            .then(ofertas => {
                setOfertas(ofertas);
            })

        getElementos()
            .then(elementos => {
                setElementos(elementos);
            })

        getAnalisis()
            .then(analisis => {
                setAnalisis(analisis)
            })

        getUsuarios()
            .then(operarios => {
                setOperarios(operarios)
            })

    }, []);

    return (
        <>
            <Grid item xs={3} md={3}>
                <Autocomplete
                    disableClearable={true}
                    id="CboClientes"
                    options={clientes}
                    filterOptions={options => clientes.filter(cliente => !cliente.deleted)}
                    getOptionLabel={option => option.codigo.toString()}
                    sx={{ width: '100%', marginTop: '22px' }}
                    renderInput={(params) => <TextField {...params} label="Codigo Cliente" name="codigoCliente" error={errorCodigo} helperText={errorCodigo ? 'Este campo es obligatorio' : ' '} />}
                    onChange={(event, value) => setTareaSeleccionada(prevState => ({
                        ...prevState,
                        codigoCliente: parseInt(value.codigo),
                        pedido: 0,
                        elemento: 0
                    }))}
                />
            </Grid>

            <Grid item xs={3} md={4}>
                <TextField
                    id='nombreCliente'
                    label="Nombre Cliente"
                    sx={{ width: '100%' }}
                    value={tareaSeleccionada && tareaSeleccionada.nombreCliente}
                    name="nombreCliente"
                    onChange={handleChange}
                />
            </Grid>

            <Grid item xs={6} md={3}>
                <Autocomplete
                    disableClearable={true}
                    sx={{ width: '100%', marginTop: '22px' }}
                    id="Oferta"
                    inputValue={tareaSeleccionada.oferta.toString()}
                    options={ofertas}
                    filterOptions={options => ofertas.filter(oferta => oferta.codigoCliente === tareaSeleccionada.codigoCliente && !oferta.deleted)}
                    getOptionLabel={option => option.numeroOferta.toString()}
                    renderInput={(params) => <TextField {...params} label="Oferta" name="oferta" error={errorOferta} helperText={errorOferta ? 'Este campo es obligatorio' : ' '} />}
                    onChange={(event, value) => setTareaSeleccionada(prevState => ({
                        ...prevState,
                        oferta: parseInt(value.numeroOferta)
                    }))}
                />
            </Grid>

            <Grid item xs={6} md={2}>
                <TextField
                    id='pedido'
                    sx={{ width: '100%' }}
                    label="Pedido"
                    value={tareaSeleccionada && tareaSeleccionada.pedido}
                    name="pedido"
                    onChange={handleChange}
                />
            </Grid>

            <Grid item xs={8} md={4}>
                <Autocomplete
                    disableClearable={true}
                    id="CboElementosPlanta"
                    inputValue={tareaSeleccionada.nombreElemento}
                    options={elementosAutocomplete}
                    getOptionLabel={option => option.descripcion !== null ? (option.nombre + ' ' + option.descripcion) : (option.nombre + ' ' + option.numero)}
                    sx={{ width: '100%', marginTop: '22px' }}
                    renderInput={(params) => <TextField {...params} label="Elemento" name="elemento" error={errorElemento} helperText={errorElemento ? 'Este campo es obligatorio' : ' '} />}
                    onChange={(event, value) => setTareaSeleccionada(prevState => ({
                        ...prevState,
                        elemento: parseInt(value.id),
                        nombreElemento: event.target.textContent
                    }))}
                />
            </Grid>

            <Grid item xs={4} md={4}>
                <Autocomplete
                    disableClearable={true}
                    id="analisis"
                    options={analisisAutocomplete}
                    getOptionLabel={option => option.nombre}
                    sx={{ width: '100%', marginTop: '22px' }}
                    renderInput={(params) => <TextField {...params} label="Analisis" name="analisis" error={errorAnalisis} helperText={errorAnalisis ? 'Este campo es obligatorio' : ' '} />}
                    onChange={handleChangeAnalisis}
                />
            </Grid>

            <Grid item xs={6} md={4}>
                <Autocomplete
                    disableClearable={true}
                    sx={{ width: '100%', marginTop: '22px' }}
                    id="Operarios"
                    options={operarios}
                    filterOptions={options => operarios.filter(cliente => cliente.idPerfil === 1004)}
                    getOptionLabel={option => option.nombre + ' ' + option.apellidos}
                    renderInput={(params) => <TextField {...params} label="Operario" name="operario" error={errorOperario} helperText={errorOperario ? 'Este campo es obligatorio' : ' '} />}
                    onChange={(event, value) => setTareaSeleccionada(prevState => ({
                        ...prevState,
                        operario: value.id
                    }))}
                />
            </Grid>

            <Grid item xs={4} md={8} style={{ display: 'flex' }}>
                <h3 style={{ width: '30%', marginTop: '22px' }}> Fecha </h3>
                <TextField
                    id="fecha"
                    type="date"
                    name="fecha"
                    sx={{ width: '100%', marginTop: '22px' }}
                    onChange={handleChangeFecha}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    error={errorFecha}
                    helperText={errorFecha ? 'Introduzca una fecha' : ' '}
                />
            </Grid>

            <Grid item xs={4} md={4}>
                <Autocomplete
                    disableClearable={true}
                    id="CboTipos"
                    options={tipos}
                    getOptionLabel={option => option.nombre}
                    sx={{ width: '100%', marginTop: '22px' }}
                    renderInput={(params) => <TextField {...params} label="Periodicidad" name="tipo" error={errorPeriodo} helperText={errorPeriodo ? 'Este campo es obligatorio' : ' '} />}
                    onChange={(event, value) => setTareaSeleccionada(prevState => ({
                        ...prevState,
                        tipo: value.id
                    }))}
                />
            </Grid>

            <Grid item xs={6} md={6}>
                <p> Observaciones </p>
                <TextareaAutosize
                    aria-label="empty textarea"
                    minRows={8}
                    style={{ width: '100%', padding: '15px' }}
                    name="observaciones"
                    onChange={handleChange}
                />
            </Grid>

            <Grid item xs={4} md={3}>
                <div class="file-select" id="src-file3" >
                    <input type="file" name="src-file3" label="PDF instrucciones" onChange={handlePdf} />
                </div>
                <Typography> {fileChange ? fileChange.name : "Seleccionar un archivo"} </Typography>
            </Grid>

        </>
    )
}