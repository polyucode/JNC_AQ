import React, { useState, useEffect } from "react";
import axios from "axios";
import { Grid, Card, CardContent, Autocomplete, Typography } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import FileOpenIcon from '@mui/icons-material/FileOpen';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
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
import { getClientes, getElementos, getOfertas, getParametros, getParametrosElemento, getFilasParametros, postValorParametros } from "../api/apiBackend";
import Swal from "sweetalert2";

const token = {
     headers: {
         Authorization: 'Bearer ' + localStorage.getItem('token')
     }
};

export const MantenimientoTecnicoPage = () => {

    /*** ESTADOS ***/

    // Declaración de variables
    const [clientes, setClientes] = useState([]);
    const [ofertas, setOfertas] = useState([]);
    const [elementos, setElementos] = useState([]);
    const [parametros, setParametros] = useState([]);
    const [parametrosElemento, setParametrosElemento] = useState([]);
    const [confNivelesPlantasCliente, setConfNivelesPlantasCliente] = useState([]);
    const { parametrosBack, setDatosParametrosBack } = useParserBack();
    const { parametrosFront } = useParserFront(setDatosParametrosBack);
    const [elementosAutocomplete, setElementosAutocomplete] = useState([]);
    const [valoresParametros, setValoresParametros] = useState([]);
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

    const GetConfNivelesPlantasCliente = async () => {
        axios.get("/confnivelesplantascliente", token).then(response => {
            const niveles = Object.entries(response.data.data).map(([key, value]) => (key, value))
            setConfNivelesPlantasCliente(niveles);
        })
    }
    
    /*** EFECTOS ***/

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

    // Filtramos elementos para el desplegable
    useEffect(() => {

        let elementosLista = [];

        confNivelesPlantasCliente.filter( planta => planta.codigoCliente === parametrosSeleccionado.codigoCliente && planta.oferta === parametrosSeleccionado.oferta ).map( elem => {
            elementosLista.push(elementos.filter( elementoLista => elementoLista.id === elem.id_Elemento )[0]);
        })

        setElementosAutocomplete( elementosLista );

    },[ parametrosSeleccionado.codigoCliente, parametrosSeleccionado.oferta ]);


    useEffect(() => {
        setDatosParametrosBack(parametrosFront)

    }, [parametrosFront])

    // Obtenemos el nombre del cliente al cambiar su código
    useEffect(() => {

        const nombre = clientes.filter(cliente => cliente.codigo === parametrosSeleccionado.codigoCliente);
        (nombre.length > 0) && setParametrosSeleccionado({
            ...parametrosSeleccionado,
            nombreCliente: nombre[0].razonSocial,
            oferta: '',

        })

    }, [parametrosSeleccionado.codigoCliente])

    /*** FUNCIONES ***/

    const handleChange = e => {
        const { name, value } = e.target;
        setParametrosSeleccionado(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

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

    const handleGetParametros = async () => {

        const resp = await getFilasParametros( parametrosSeleccionado.codigoCliente, parametrosSeleccionado.oferta , parametrosSeleccionado.idElemento );
        setParametrosElemento( resp );

        // Preparamos la variable que almacenará los valores de los parametros
        let parametrosMostrar = [];
        const datos = await getParametrosElemento( parametrosSeleccionado.codigoCliente, parametrosSeleccionado.oferta , parametrosSeleccionado.idElemento );

        // Recorremos los registros para ver que valores podemos guardar (activo)
        datos.map( registro => {

            // Si está activo, seteamos los valores
            if( registro.activo ) {

                // Obtenemos todos los valores del parametro actual (valores del mismo parametro, enero, febrero, ...)
                const valoresPorParametro = resp.filter( param => param.parametro === registro.parametro );

                // Preparamos el valor del mes actual y el arreglo de meses
                let mesActual = new Date().getMonth();
                let fechas = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

                // Mapeamos los valores en un array, y si no hay datos seteamos un 0
                valoresPorParametro.map( val => {

                    const fecha = new Date(val.fecha);
                    
                    for(let i = 0; i < 12; i++) {
                        if(fecha.getMonth() === i) {
                            fechas[i] = val.valor;
                        }
                    }

                });

                // Volteamos las fechas para obtener los meses anteriores
                fechas = fechas.reverse();

                // Obtenemos los dos últimos meses y si no hay registros, seteamos un 0
                let valoresMeses = fechas.slice(12 - mesActual, (12 - mesActual) + 2);
                if( valoresMeses.length < 2 ) {
                    valoresMeses.push(0);
                }

                // Creamos el objeto
                parametrosMostrar.push({
                    codigoCliente: parametrosSeleccionado.codigoCliente,
                    fecha: parametrosSeleccionado.fecha,
                    id_Elemento: parametrosSeleccionado.idElemento,
                    oferta: parametrosSeleccionado.oferta,
                    parametro: registro.parametro,
                    referencia: parametrosSeleccionado.referencia,
                    unidad: registro.unidades,
                    valor: '',
                    dosMeses: valoresMeses
                });

            }

        });

        // Finalmente, añadimos los datos al estado
        setValoresParametros( parametrosMostrar );

    }

    const handleEditarParametro = ( e, id ) => {

        // Recorremos el array del estado para encontrar el objeto que hemos modificado
        setValoresParametros( prev => (prev.map( row => {
            if( row.parametro === id ) {
                return { ...row, valor: e.target.value };
            } else {
                return row;
            }
        })));

    }

    const guardarParametros = async () => {

        // Recorremos parametro por parametro para hacer una petición POST
        await valoresParametros.map( async (parametro) => {

            let parametroPost = {
                CodigoCliente: parametro.codigoCliente,
                Referencia: parametro.referencia,
                Oferta: parametro.oferta,
                Id_Elemento: parametro.id_Elemento,
                Parametro: parametro.parametro,
                Fecha: parametro.fecha,
                Valor: parseInt(parametro.valor, 10),
                Unidad: parametro.unidad
            }

            // Nos aseguramos de que tengamos código de referencia y fecha
            if(parametrosSeleccionado.referencia !== "" && parametrosSeleccionado.fecha !== null){

                parametroPost.referencia = parametrosSeleccionado.referencia
                parametroPost.fecha = parametrosSeleccionado.fecha

                console.log({parametroPost});

                const resp = await postValorParametros( parametroPost );

            } else {

                // Avisamos al usuario
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Error al guardar',
                    text: `Faltan introducir algunos datos!`,
                    showConfirmButton: false,
                    timer: 2000,
                    showClass: {
                        popup: 'animate__animated animate__bounceIn'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__bounceOut'
                    }
                });

            }

        });

        // Avisamos al usuario si ha ido bien
        Swal.fire({
            position: 'center',
            icon: 'info',
            title: 'Datos guardados',
            text: `Los parametros han sido guardados`,
            showConfirmButton: false,
            timer: 2000,
            showClass: {
                popup: 'animate__animated animate__bounceIn'
            },
            hideClass: {
                popup: 'animate__animated animate__bounceOut'
            }
        });
        
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
                                        options={ elementosAutocomplete }
                                        getOptionLabel={ option => option.nombre+' '+option.numero }
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
                                                    valoresParametros.map( (parametro, index) => {
                                                        return (
                                                            <ParametroMantenimiento
                                                                key={ index }
                                                                indice={ index }
                                                                parametros={ valoresParametros }
                                                                onChange={ handleEditarParametro }
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