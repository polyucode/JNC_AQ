import React, { useState, useEffect } from "react";
import axios from "axios";
import { Grid, Card, CardContent, Autocomplete, Typography } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import FileOpenIcon from '@mui/icons-material/FileOpen';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { useParserFront } from "../hooks/useParserFront";
import { useParserBack } from "../hooks/useParserBack";

//import './MantenimientoTecnico.css';
import { MainLayout } from "../layout/MainLayout";
import { ParametroMantenimiento } from "../components/Mantenimiento/ParametroMantenimiento";
import { getClientes, getElementos, getOfertas, getParametros, getParametrosElemento, getFilasParametros } from "../api/apiBackend";

const token = {
     headers: {
         Authorization: 'Bearer ' + localStorage.getItem('token')
     }
};

export const MantenimientoTecnicoPage = () => {

    // Declaración de variables
    const [clientes, setClientes] = useState([]);
    const [ofertas, setOfertas] = useState([]);
    const [elementos, setElementos] = useState([]);
    const [parametros, setParametros] = useState([]);
    const [parametrosElemento, setParametrosElemento] = useState([]);

    const [confNivelesPlantasCliente, setConfNivelesPlantasCliente] = useState([]);

    const { parametrosBack, setDatosParametrosBack } = useParserBack();
    const { parametrosFront, setDatosParametrosFront, cambiarCampoFijo, cambiarCampoPersonalizado } = useParserFront(setDatosParametrosBack);
    const [open, setOpen] = React.useState(true);
    const [contextMenu, setContextMenu] = React.useState(null);

    const [parametrosSeleccionado, setParametrosSeleccionado] = useState({
        id: 0,
        codigoCliente: 0,
        nombreCliente: '',
        referencia: '',
        oferta: 0,
        idElemento: 0,
        fecha: null,
        parametro: 0,
        unidad: '',
        valor: 0
    })

    const [data, setData] = useState([]);
    const [dataParametros, setDataParametros] = useState([]);
    // const styles = useStyles();
    // const styles2 = useStyles2(); 

    function Parametros() {
        setDataParametros(data.filter(parametro => parametro.codigoCliente === parametrosSeleccionado.codigoCliente && parametro.oferta === parametrosSeleccionado.oferta && parametro.elemento === parametrosSeleccionado.elemento (parametro.parametrosFijos + 'Activo') === true))
    }

    const GetConfNivelesPlantasCliente = async () => {
        axios.get("/confnivelesplantascliente", token).then(response => {
            const niveles = Object.entries(response.data.data).map(([key, value]) => (key, value))
            setConfNivelesPlantasCliente(niveles);
        })
    }
    
    console.log(parametrosSeleccionado)

    // Peticiones a la api
    useEffect(() => {

        getClientes()
            .then(( res ) => setClientes( res ));

        getOfertas()
            .then(( res ) => setOfertas( res ));

        getElementos()
            .then(( res ) => setElementos( res ));

        getParametros()
            .then(( res ) => setParametros( res ));

        GetConfNivelesPlantasCliente();
    }, [])

    useEffect(() => {
        setDatosParametrosBack(parametrosFront)

    }, [parametrosFront])

    useEffect(() => {

        const nombre = clientes.filter(cliente => cliente.codigo === parametrosSeleccionado.codigoCliente);
        (nombre.length > 0) && setParametrosSeleccionado({
            ...parametrosSeleccionado,
            nombreCliente: nombre[0].razonSocial,
            oferta: '',

        })

    }, [parametrosSeleccionado.codigoCliente])

    const handleClick = () => {
        setOpen(!open);
    };

    const handleChange = e => {
        const { name, value } = e.target;
        setParametrosSeleccionado(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleClose = () => {
        setContextMenu(null);
    };

    const onChangeCliente = (e, value, name) => {

        if (e.target.textContent !== "") {
            setDataParametros(data.filter(parametro => parametro.codigoCliente === parseInt(e.target.textContent) && parametro.oferta === parametrosSeleccionado.oferta && parametro.idElemento === parametrosSeleccionado.idElemento))
        }

        setParametrosSeleccionado((prevState) => ({
            ...prevState,
            [name]: value.codigo
        }))

    }

    const onChangeOferta = (e, value, name) => {

        if(e.target.textContent !== ""){
            setDataParametros(data.filter(parametro => parametro.codigoCliente === parametrosSeleccionado.codigoCliente && parametro.oferta === parseInt(e.target.textContent) && parametro.idElemento === parametrosSeleccionado.idElemento))
        }

        setParametrosSeleccionado((prevState) => ({
            ...prevState,
            [name]: value.numeroOferta
        }))

    }

    const onChangeElemento = (e, value, name) => {

        if(e.target.textContent !== ""){
            setDataParametros(data.filter(parametro => parametro.codigoCliente === parametrosSeleccionado.codigoCliente && parametro.oferta === parametrosSeleccionado.oferta && parametro.idElemento === parseInt(e.target.textContent)))
        }

        setParametrosSeleccionado((prevState) => ({
            ...prevState,
            [name]: value.id
        }))
    }

    console.log(parametrosElemento)


    const handleGetParametros = async () => {

        const resp = await getFilasParametros( parametrosSeleccionado.codigoCliente, parametrosSeleccionado.oferta , parametrosSeleccionado.idElemento );

        setParametrosElemento( resp );
    }

    async function guardarParametros(){

        parametrosElemento.map(parametro => {
            if(parametrosSeleccionado.referencia !== "" && parametrosSeleccionado.fecha !== null){
                parametro.referencia = parametrosSeleccionado.referencia
                parametro.fecha = parametrosSeleccionado.fecha
                axios.put("/valorparametros?id=" + parametro.id, parametro, token)
                    .then(response => {
                        var parametroModificado = data;
                        parametroModificado.map(param => {
                            if(param.id === parametro.id){
                                param = parametro
                            }
                        })
                    })
                    .catch(error => {
                        console.log(error)
                    })
                alert("Los valores se han guardado correctamente")
            }
            else{
                alert("Falta introducir algun dato")
            }
        })      
    }

    return (
        <MainLayout title='Mantenimiento técnico'>
            <Grid container spacing={ 3 }>

                {/* Sección de búsqueda */}
                <Grid item xs={ 12 }>
                    <Card>
                        <CardContent>
                            <Grid container spacing={ 2 }>

                                <Grid item xs={ 4 }>
                                    <Autocomplete
                                        disableClearable={ true }
                                        id="codigoCliente"
                                        options={ clientes }
                                        getOptionLabel={ option => option.codigo.toString() }
                                        renderInput={ params => <TextField {...params} label="Código de cliente" name="codigoCliente" /> }
                                        onChange={ (event, value) => onChangeCliente(event, value, "codigoCliente") }
                                    />
                                </Grid>

                                <Grid item xs={ 4 }>
                                    <Autocomplete
                                        disableClearable={ true }
                                        id="codigoOferta"
                                        options={ ofertas }
                                        filterOptions={ options => ofertas.filter(oferta => oferta.codigoCliente === parametrosSeleccionado.codigoCliente) }
                                        getOptionLabel={ option => option.numeroOferta.toString() }
                                        renderInput={ params => <TextField {...params} label="Código de oferta" name="oferta" /> }
                                        onChange={ (event, value) => onChangeOferta(event, value, "oferta") }
                                    />
                                </Grid>

                                <Grid item xs={ 4 }>
                                    <Autocomplete
                                        disableClearable={ true }
                                        id="elemento"
                                        options={ elementos }
                                        filterOptions={options => confNivelesPlantasCliente.filter(planta => planta.codigoCliente === parametrosSeleccionado.codigoCliente && planta.oferta === parametrosSeleccionado.oferta)}
                                        getOptionLabel={ option => option.id_Elemento }
                                        renderInput={ params => <TextField {...params} label="Elemento" name="idElemento" /> }
                                        onChange={ (event, value) => onChangeElemento(event, value, "idElemento") }
                                    />
                                </Grid>

                                <Grid item xs={ 4 }>
                                    <TextField
                                        sx={{ width: '100%' }}
                                        label="Nombre del cliente"
                                        id='nombreCliente'
                                        name="nombreCliente"
                                        value={ parametrosSeleccionado && parametrosSeleccionado.nombreCliente }
                                        onChange={ handleChange }
                                    />
                                </Grid>

                                <Grid item xs={ 4 }>
                                    <TextField
                                        sx={{ width: '100%' }}
                                        label="Referencia"
                                        id='referencia'
                                        name="referencia"
                                        onChange={ handleChange }
                                    />
                                </Grid>

                                <Grid item xs={ 4 }>
                                    <TextField
                                        sx={{ width: '100%' }}
                                        id="fecha"
                                        name="fecha"
                                        type="date"
                                        onChange={ handleChange }
                                    />
                                </Grid>

                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Sección tabla de parámetros */}
                <Grid item xs={ 12 }>
                    <Card>
                        <CardContent>
                            {
                                ( parametrosElemento.length > 0 ) ? (
                                    <TableContainer>
                                        <Table size="small">

                                            <TableHead>
                                                <TableRow>
                                                    <TableCell><b>Parámetro</b></TableCell>
                                                    <TableCell><b>Valor</b></TableCell>
                                                    <TableCell><b>Valor mes pasado (fecha) </b></TableCell>
                                                    <TableCell><b>Valor de hace 2 meses (fecha)</b></TableCell>
                                                </TableRow>
                                            </TableHead>

                                            <TableBody>
                                                {
                                                    parametrosElemento.map( (parametro, index) => {
                                                        return (
                                                            <ParametroMantenimiento
                                                                key={ parametro.id }
                                                                index={ parametro.id }
                                                                nombre={ parametros.filter( param => param.id === parametro.parametro)[0].nombre}
                                                                unidades={ parametro.unidad }
                                                                valor = { parametro.valor }
                                                                parametrosElemento = { setParametrosElemento }
                                                                parametros = { parametrosElemento }
                                                            />
                                                        )
                                                    })
                                                }
                                            </TableBody>

                                        </Table>
                                    </TableContainer>
                                ) : (
                                    <Typography>No hay parametros para mostrar</Typography>
                                )
                            }   
                        </CardContent>
                    </Card>
                </Grid>

                {/* Sección de botones */}
                <Grid item xs={ 12 }>
                    <Card>
                        <CardContent>
                            <Grid container sx={{ justifyContent: 'flex-end' }} spacing={ 2 }>

                                <Grid item>
                                    <Button
                                        variant="contained"
                                        color="success"
                                        startIcon={ <SaveIcon /> }
                                        onClick={ guardarParametros }
                                    >
                                        Guardar datos
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button
                                        variant="contained"
                                        startIcon={ <FileOpenIcon /> }
                                        onClick={ handleGetParametros }
                                    >
                                        Abrir Plantilla
                                    </Button>
                                </Grid>

                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>

            </Grid>
        </MainLayout>
    )
}