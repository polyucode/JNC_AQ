import { useState, useEffect } from 'react';
import { Grid, TextField, Autocomplete } from '@mui/material';
import { getAnalisis, getClientes, getElementos, getOfertas, getOperarios } from '../../api/apiBackend';
import MenuItem from '@mui/material/MenuItem';

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
    /*{ id: 6, nombre: "Semanal" },
    { id: 7, nombre: "Bisemanal" }*/
]

export const EditarTareaModal = ({ change: handleChange, autocompleteChange, tareaSeleccionada, handleChangeFecha, setTareaSeleccionada, handleChangeAnalisis, estadoProtocolo, estadoOperario, codigoClienteEditar, tecnicoTareaEditar, tipoTareaEditar, elementosAutocomplete, analisisAutocomplete, elementoTareaEditar, analisisEditar }) =>{


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
        
        getOperarios()
            .then(operarios => {
                setOperarios(operarios)
            })
        
    }, []);
    

    function formateandofechas(fecha) {
        const fecha1 = new Date(fecha)

        const fecha2 = fecha1.getFullYear() +
            '-' + String(fecha1.getMonth() + 1).padStart(2, '0') +
            '-' + String(fecha1.getDate()).padStart(2, '0')

        return fecha2
    }

    return (
        <>
            <Grid item xs={3} md={3}>
                <Autocomplete
                    disableClearable={true}
                    id="CboClientes"
                    options={clientes}
                    getOptionLabel={option => option.codigo}
                    defaultValue={codigoClienteEditar[0]}
                    sx={{ width: '100%' }}
                    renderInput={(params) => <TextField {...params} label="Codigo Cliente" name="codigoCliente" />}
                    onChange={(event, value) => setTareaSeleccionada(prevState => ({
                        ...prevState,
                        codigoCliente: parseInt(value.codigo),
                        oferta: '',
                        pedido: '',
                        elementoPlanta: ''
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
                    sx={{ width: '100%' }}
                    id="Oferta"
                    inputValue={tareaSeleccionada.oferta}
                    options={ofertas}
                    filterOptions={options => ofertas.filter(oferta => oferta.codigoCliente === tareaSeleccionada.codigoCliente)}
                    getOptionLabel={option => option.numeroOferta}
                    renderInput={(params) => <TextField {...params} label="Oferta" name="oferta" />}
                    onChange={(event, value) => setTareaSeleccionada(prevState => ({
                        ...prevState,
                        oferta: parseInt(value.numeroOferta)
                    }))}
                />
            </Grid>

            <Grid item xs={6} md={3}>
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
                    defaultValue={elementoTareaEditar[0]}
                    options={elementosAutocomplete}
                    getOptionLabel={option => (option.nombre + ' ' + option.numero)}
                    sx={{ width: '100%' }}
                    renderInput={(params) => <TextField {...params} label="Elemento" name="elemento" />}
                    onChange={(event, value) => setTareaSeleccionada(prevState => ({
                        ...prevState,
                        elemento: value.id
                    }))}
                />
            </Grid>

            <Grid item xs={4} md={5}>
                <Autocomplete
                    disableClearable={true}
                    id="analisis"
                    options={analisisAutocomplete}
                    defaultValue={analisisEditar[0]}
                    getOptionLabel={option => option.nombre}
                    sx={{ width: '100%' }}
                    renderInput={(params) => <TextField {...params} label="Analisis" name="analisis" />}
                    onChange={handleChangeAnalisis}
                />
            </Grid>

            <Grid item xs={6} md={6}>
                <Autocomplete
                    disabled={estadoOperario}
                    disableClearable={true}
                    sx={{ width: '100%' }}
                    id="Operarios"
                    options={operarios}
                    defaultValue={tecnicoTareaEditar[0]}
                    filterOptions={options => operarios.filter(cliente => cliente.idPerfil === 1004)}
                    getOptionLabel={option => option.nombre + ' ' + option.apellidos}
                    renderInput={(params) => <TextField {...params} label="Operario" name="operario" />}
                    onChange={(event, value) => setTareaSeleccionada(prevState => ({
                        ...prevState,
                        operario: value.nombre + ' ' + value.apellidos
                    }))}
                />
            </Grid>

            <Grid item xs={4} md={3}>
                <TextField
                    id="fecha"
                    type="date"
                    name="fecha"
                    sx={{ width: '100%' }}
                    onChange={handleChangeFecha}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={ tareaSeleccionada && formateandofechas(tareaSeleccionada.fecha)}
                />
            </Grid>

            <Grid item xs={4} md={3}>
                <Autocomplete
                    disableClearable={true}
                    id="CboTipos"
                    options={tipos}
                    defaultValue={tipoTareaEditar[0]}
                    getOptionLabel={option => option.nombre}
                    sx={{ width: '100%' }}
                    renderInput={(params) => <TextField {...params} label="Periodicidad" name="tipo" />}
                    onChange={(event, value) => setTareaSeleccionada(prevState => ({
                        ...prevState,
                        tipo: value.id
                    }))}
                />
            </Grid>

        </>
    )
}