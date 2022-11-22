import React, { useState, useEffect, useContext } from 'react';
import axios from "axios";
import { Autocomplete, Button, Card, Grid, TableContainer, TextField, Typography, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { ThemeContext } from '../router/AppRouter';
import { MainLayout } from "../layout/MainLayout";
import { useParserFront } from "../hooks/useParserFront";
import { useParserBack } from "../hooks/useParserBack";
import TaskIcon from '@mui/icons-material/Task';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
//import CreateIcon from '@mui/icons-material/Create';
import { useLocation } from "react-router-dom";
import { getClientes, putParametrosElementoPlantaCliente } from '../api/apiBackend';
import {
    getConfNivelesPlantasCliente,
    getConfParametrosElementoPlantaCliente,
    getElementos, getOfertas, getParametros,
    getParametrosAnalisisPlanta,
    getParametrosPlanta
} from '../api/apiBackend';
import { LineaParametro } from '../components/LineaParametro';
import Swal from 'sweetalert2';

const token = {
    headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
    }
};

export const PlantasTablaPage = () => {

    /*** VARIABLES ***/
    let opcionesFiltradas = [];

    /*** ESTADOS ***/
    const [confNivelesPlantasCliente, setConfNivelesPlantasCliente] = useState([]);
    const [oferta, setOferta] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [elementos, setElementos] = useState([]);
    const [parametros, setParametros] = useState([]);
    const [elementosAutocomplete, setElementosAutocomplete] = useState([]);
    const [parametrosAnalisisPlanta, setParametrosAnalisisPlanta] = useState([]);
    const [parametrosElementoPlanta, setParametrosElementoPlanta] = useState([]);
    const [tipoParametros, setTipoParametros] = useState([]);
    const [parametrosSeleccionado, setParametrosSeleccionado] = useState({
        id: 0,
        codigoCliente: '',
        nombreCliente: "",
        oferta: '',
        idElemento: 0,
        nombreElemento: "",
        fecha: null,
        esPlantilla: false,
        ComptadorLimInf: 0,
        ComptadorLimSup: 0,
        ComptadorUnidades: "",
        ComptadorActivo: false,
        ComptadorVerInspector: false,
        pHLimInf: 0,
        pHLimSup: 0,
        pHUnidades: "",
        pHActivo: false,
        pHVerInspector: false,
        TemperaturaLimInf: 0,
        TemperaturaLimSup: 0,
        TemperaturaUnidades: "",
        TemperaturaActivo: false,
        TemperaturaVerInspector: false,
        ConductivitatLimInf: 0,
        ConductivitatLimSup: 0,
        ConductivitatUnidades: "",
        ConductivitatActivo: false,
        ConductivitatVerInspector: false,
        TDSLimInf: 0,
        TDSLimSup: 0,
        TDSUnidades: "",
        TDSActivo: false,
        TDSVerInspector: false,
        AlcalinitatMLimInf: 0,
        AlcalinitatMLimSup: 0,
        AlcalinitatMUnidades: "",
        AlcalinitatMActivo: false,
        AlcalinitatMVerInspector: false,
        AlcalinitatPLimInf: 0,
        AlcalinitatPLimSup: 0,
        AlcalinitatPUnidades: "",
        AlcalinitatPActivo: false,
        AlcalinitatPVerInspector: false,
        DuresaCalcicaLimInf: 0,
        DuresaCalcicaLimSup: 0,
        DuresaCalcicaUnidades: "",
        DuresaCalcicaActivo: false,
        DuresaCalcicaVerInspector: false,
        DuresaTotalLimInf: 0,
        DuresaTotalLimSup: 0,
        DuresaTotalUnidades: "",
        DuresaTotalActivo: false,
        DuresaTotalVerInspector: false,
        TerbolesaLimInf: 0,
        TerbolesaLimSup: 0,
        TerbolesaUnidades: "",
        TerbolesaActivo: false,
        TerbolesaVerInspector: false,
        FeLimInf: 0,
        FeLimSup: 0,
        FeUnidades: "",
        FeActivo: false,
        FeVerInspector: false,
        ClorursLimInf: 0,
        ClorursLimSup: 0,
        ClorursUnidades: "",
        ClorursActivo: false,
        ClorursVerInspector: false,
        SulfatsLimInf: 0,
        SulfatsLimSup: 0,
        SulfatsUnidades: "",
        SulfatsActivo: false,
        SulfatsVerInspector: false,
        SilicatsLimInf: 0,
        SilicatsLimSup: 0,
        SilicatsUnidades: "",
        SilicatsActivo: false,
        SilicatsVerInspector: false,
        ClorLliureLimInf: 0,
        ClorLliureLimSup: 0,
        ClorLliureUnidades: "",
        ClorLliureActivo: false,
        ClorLliureVerInspector: false,
        ClorTotalLimInf: 0,
        ClorTotalLimSup: 0,
        ClorTotalUnidades: "",
        ClorTotalActivo: false,
        ClorTotalVerInspector: false,
        BromLimInf: 0,
        BromLimSup: 0,
        BromUnidades: "",
        BromActivo: false,
        BromVerInspector: false,
        SulfitsLimInf: 0,
        SulfitsLimSup: 0,
        SulfitsUnidades: "",
        SulfitsActivo: false,
        SulfitsVerInspector: false,
        OrtofosfatsPO4LimInf: 0,
        OrtofosfatsPO4LimSup: 0,
        OrtofosfatsPO4Unidades: "",
        OrtofosfatsPO4Activo: false,
        OrtofosfatsPO4VerInspector: false,
        MoO4LimInf: 0,
        MoO4LimSup: 0,
        MoO4Unidades: "",
        MoO4Activo: false,
        MoO4VerInspector: false,
        IsotiazolonaLimInf: 0,
        IsotiazolonaLimSup: 0,
        IsotiazolonaUnidades: "",
        IsotiazolonaActivo: false,
        IsotiazolonaVerInspector: false,
        AquaproxAB5310LimInf: 0,
        AquaproxAB5310LimSup: 0,
        AquaproxAB5310Unidades: "",
        AquaproxAB5310Activo: false,
        AquaproxAB5310VerInspector: false,
        BiopolLB5LimInf: 0,
        BiopolLB5LimSup: 0,
        BiopolLB5Unidades: "",
        BiopolLB5Activo: false,
        BiopolLB5VerInspector: false,
        MefacideLGLimInf: 0,
        MefacideLGLimSup: 0,
        MefacideLGUnidades: "",
        MefacideLGActivo: false,
        MefacideLGVerInspector: false,
        BiopolIB200LimInf: 0,
        BiopolIB200LimSup: 0,
        BiopolIB200Unidades: "",
        BiopolIB200Activo: false,
        BiopolIB200VerInspector: false,
        Campo1Nombre: "",
        Campo1LimInf: 0,
        Campo1LimSup: 0,
        Campo1Unidades: "",
        Campo1Activo: false,
        Campo1VerInspector: false,
        Campo2Nombre: "",
        Campo2LimInf: 0,
        Campo2LimSup: 0,
        Campo2Unidades: "",
        Campo2Activo: false,
        Campo2VerInspector: false,
        Campo3Nombre: "",
        Campo3LimInf: 0,
        Campo3LimSup: 0,
        Campo3Unidades: "",
        Campo3Activo: false,
        Campo3VerInspector: false,
        Campo4Nombre: "",
        Campo4LimInf: 0,
        Campo4LimSup: 0,
        Campo4Unidades: "",
        Campo4Activo: false,
        Campo4VerInspector: false,
        Campo5Nombre: "",
        Campo5LimInf: 0,
        Campo5LimSup: 0,
        Campo5Unidades: "",
        Campo5Activo: false,
        Campo5VerInspector: false,
        Campo6Nombre: "",
        Campo6LimInf: 0,
        Campo6LimSup: 0,
        Campo6Unidades: "",
        Campo6Activo: false,
        Campo6VerInspector: false,
        Campo7Nombre: "",
        Campo7LimInf: 0,
        Campo7LimSup: 0,
        Campo7Unidades: "",
        Campo7Activo: false,
        Campo7VerInspector: false,
        Campo8Nombre: "",
        Campo8LimInf: 0,
        Campo8LimSup: 0,
        Campo8Unidades: "",
        Campo8Activo: false,
        Campo8VerInspector: false,
    });
    
    /*** HOOKS ***/
    const { state } = useLocation();
    const { valores } = useContext(ThemeContext);
    const { parametrosBack, setDatosParametrosBack } = useParserBack();
    const { parametrosFront, setDatosParametrosFront, cambiarCampoFijo, cambiarCampoPersonalizado } = useParserFront(setDatosParametrosBack);

    /*** EFECTOS ***/

    // Efecto que comprueba si se reciben parametros de la página anterior y los setea
    useEffect(() => {
        if( state != null ) {
            setParametrosSeleccionado( prevParam => ({ ...prevParam, codigoCliente: state.codigoCliente, oferta: state.codigoOferta }) );
        }
    },[]);

    // Peticiones al backend
    useEffect(() => {
        
        getClientes()
            .then( resp => setClientes(resp) );
        
        getOfertas()
            .then( resp => setOferta(resp) );
        
        getElementos()
            .then( resp => setElementos(resp) );
        
        getParametros()
            .then( resp => setParametros(resp) );

        getParametrosAnalisisPlanta()
            .then( resp => setParametrosAnalisisPlanta(resp) );
        
        getConfParametrosElementoPlantaCliente()
            .then( resp => setParametrosElementoPlanta(resp) );

        getConfNivelesPlantasCliente()
            .then( resp => setConfNivelesPlantasCliente(resp) );

    }, []);

    // Efecto que selecciona el nombre del cliente cuando cambia el código
    useEffect(() => {

        const nombre = clientes.filter(cliente => cliente.codigo === parametrosSeleccionado.codigoCliente);
        (nombre.length > 0) && setParametrosSeleccionado({
            ...parametrosSeleccionado,
            nombreCliente: nombre[0].razonSocial,
            oferta: '',
            elemento: ''
        })

    }, [parametrosSeleccionado.codigoCliente, clientes]);

    // Efecto para preparar el listado de elementos en el autocompletado
    useEffect(() => {

        opcionesFiltradas = [];

        const lista = confNivelesPlantasCliente.filter(planta => planta.codigoCliente === parametrosSeleccionado.codigoCliente && planta.oferta === parametrosSeleccionado.oferta);
        lista.map( elemento => {
            opcionesFiltradas.push(elementos.filter( elem => elem.id === elemento.id_Elemento )[0]);
        });

        setElementosAutocomplete( opcionesFiltradas );

    },[parametrosSeleccionado.codigoCliente, parametrosSeleccionado.oferta, confNivelesPlantasCliente ]);

    // Revisar si sirve o no
    useEffect(() => {
        setDatosParametrosBack(parametrosFront)
    }, [parametrosFront]);

    useEffect(() => {
        setTipoParametros(parametros.map(parametro => ({ id: parametro.id, nombre: parametro.nombre, limInf: 0, limSup: 0, unidades: parametro.unidad, activo: false, verInspector: false })))
    }, [parametros]);

    /*** FUNCIONES ***/

    const handleLimitInferior = (e) => {

        // Extraemos los datos necesarios
        const { name, value } = e.target;

        // Seteamos el estado recorriendo los valores hasta encontrar la linea correcta
        setTipoParametros( prev => (prev.map( parametro => {

            if (name === parametro.nombre) {
                return { ...parametro, limInf: value };
            } else {
                return parametro;
            }

        })));

    }

    const handleLimitSuperior = (e) => {
        
        // Extraemos los datos necesarios
        const { name, value } = e.target;

        // Seteamos el estado recorriendo los valores hasta encontrar la linea correcta
        setTipoParametros( prev => (prev.map( parametro => {

            if (name === parametro.nombre) {
                return { ...parametro, limSup: value };
            } else {
                return parametro;
            }

        })));

    }

    const handleUnidad = (e) => {

        // Extraemos los datos necesarios
        const { name, value } = e.target;

        // Seteamos el estado recorriendo los valores hasta encontrar la linea correcta
        setTipoParametros( prev => (prev.map( parametro => {

            if (name === parametro.nombre) {
                return { ...parametro, unidades: value };
            } else {
                return parametro;
            }

        })));

    }

    const handleActivo = (e) => {

        // Extraemos los datos necesarios
        const { name, checked } = e.target;

        // Seteamos el estado recorriendo los valores hasta encontrar la linea correcta
        setTipoParametros( prev => (prev.map( parametro => {

            if (name === parametro.nombre) {
                return { ...parametro, activo: checked };
            } else {
                return parametro;
            }

        })));

    }

    const handleVerInspector = (e) => {

        // Extraemos los datos necesarios
        const { name, checked } = e.target;

        // Seteamos el estado recorriendo los valores hasta encontrar la linea correcta
        setTipoParametros( prev => (prev.map( parametro => {

            if (name === parametro.nombre) {
                return { ...parametro, verInspector: checked };
            } else {
                return parametro;
            }

        })));

    }

    // const editarPlantilla = async () => {

    //     tipoParametros.map(parametro => {

    //         if (parametro.activo == true) {
    //             axios.put("/parametroselementoplantacliente?id=" + parametro.id, parametro, token)
    //                 .then(response => {
    //                     var parametrosModificado = parametrosElementoPlanta;
    //                     parametrosModificado.map(param => {
    //                         if (param.id === parametro.id) {
    //                             param = parametro
    //                         }
    //                     });
    //                     getConfParametrosElementoPlantaCliente();
    //                 }).catch(error => {
    //                     console.log(error);
    //                 })
    //         }
    //     })

    // }

    async function valorParametros() {

        tipoParametros.map((parametro) => {
            if (parametro.activo == true) {
                const param2 = {
                    id: 0,
                    CodigoCliente: parametrosSeleccionado.codigoCliente,
                    Referencia: "",
                    Oferta: parametrosSeleccionado.oferta,
                    Id_Elemento: parametrosSeleccionado.idElemento,
                    Parametro: parametro.id,
                    Fecha: null,
                    Valor: 0,
                    Unidad: parametro.unidades,
                    addDate: null,
                    addIdUser: null,
                    modDate: null,
                    modIdUser: null,
                    delDate: null,
                    delIdUser: null,
                    deleted: null
                }
                axios.post("/valorparametros", param2, token)
                    .then(response => {
                        return response
                    })
                    .catch(error => {
                        console.log(error)
                    })
            }
        })
    }

    const abrirPlantilla = async () => {

        const resp = await getParametrosPlanta(parametrosSeleccionado.codigoCliente, parametrosSeleccionado.oferta, parametrosSeleccionado.idElemento);

        //let tipoParametrosActualizados = tipoParametros;

        const datosMapeados = resp.map( datos => {

            // Obtenemos el índice del elemeto actual, para poder obtener su nombre luego
            const indiceElemento = tipoParametros.indexOf(tipoParametros.filter(param => param.id === datos.parametro)[0]);

            // Devolvemos la linea mapeada
            return {
                dbId: datos.id,
                id: datos.parametro,
                nombre: tipoParametros[indiceElemento].nombre,
                limInf: datos.limInf,
                limSup: datos.limSup,
                unidades: datos.unidades,
                activo: datos.activo,
                verInspector: datos.verInspector
            }

        });

        // Una vez mapeado, seteamos los datos en el estado
        setTipoParametros([ ...datosMapeados ]);

    }

    const guardarPlantilla = async () => {

        valorParametros()

        await tipoParametros.map( async (parametro) => {

            // Mapeamos el registro a actualizar en la base de datos
            const param = {
                id: parametro.dbId,
                Parametro: parametro.id,
                CodigoCliente: parametrosSeleccionado.codigoCliente,
                NombreCliente: parametrosSeleccionado.nombreCliente,
                Oferta: parametrosSeleccionado.oferta,
                Id_Elemento: parametrosSeleccionado.idElemento,
                EsPlantilla: true,
                LimInf: parseInt(parametro.limInf, 10),
                LimSup: parseInt(parametro.limSup, 10),
                Unidades: parametro.unidades,
                Activo: parametro.activo,
                VerInspector: parametro.verInspector,
                addDate: null,
                addIdUser: null,
                modDate: null,
                modIdUser: null,
                delDate: null,
                delIdUser: null,
                deleted: null
            }

            // TODO: PUT
            const resp = await putParametrosElementoPlantaCliente( param );

        });

        // Avisamos al usuario
        Swal.fire({
            position: 'center',
            icon: 'info',
            title: 'Parámetros guardados',
            text: `Los parámetros del elemento han sido guardados`,
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
        <MainLayout title="Parametrización de planta">

            <Grid container spacing={2}>

                {/* SELECCIÓN DE CLIENTE Y OFERTA */}
                <Grid item xs={ 12 }>
                    <Card sx={{ p: 2, display: 'flex' }}>
                        <Grid container spacing={ 2 } sx={{ alignItems: 'center' }}>

                            <Grid item xs={ 3 }>
                                <Autocomplete
                                    disableClearable={true}
                                    id="codigoCliente"
                                    inputValue={parametrosSeleccionado.codigoCliente.toString()}
                                    options={clientes}
                                    getOptionLabel={ option => option.codigo.toString() }
                                    renderInput={(params) => <TextField {...params} name="codigoCliente" label="Código cliente" />}
                                    onChange={(event, value) => setParametrosSeleccionado(prevState => ({
                                        ...prevState,
                                        codigoCliente: parseInt(value.codigo)
                                    }))}
                                />
                            </Grid>

                            <Grid item xs={ 3 }>
                                <Autocomplete
                                    disableClearable={true}
                                    id="CboClientes"
                                    inputValue={parametrosSeleccionado.nombreCliente.toString()}
                                    options={clientes}
                                    filterOptions={options => clientes.filter(cliente => cliente.codigo === parametrosSeleccionado.codigoCliente)}
                                    getOptionLabel={ option => option.razonSocial }
                                    renderInput={ (params) => <TextField {...params} name="nombreCliente" label="Nombre" /> }
                                    onChange={(event, value) => setParametrosSeleccionado(prevState => ({
                                        ...prevState,
                                        nombreCliente: value.razonSocial
                                    }))}
                                />    
                            </Grid>

                            <Grid item xs={ 3 }>
                                <Autocomplete
                                    disableClearable={true}
                                    id="Oferta"
                                    inputValue={parametrosSeleccionado.oferta.toString()}
                                    options={oferta}
                                    filterOptions={options => oferta.filter(oferta => oferta.codigoCliente === parametrosSeleccionado.codigoCliente)}
                                    getOptionLabel={ option => option.numeroOferta.toString() }
                                    renderInput={(params) => <TextField {...params} name="oferta" label="Código oferta" />}
                                    onChange={(event, value) => setParametrosSeleccionado(prevState => ({
                                        ...prevState,
                                        oferta: parseInt(value.numeroOferta),
                                        elemento: ''
                                    }))}
                                />   
                            </Grid>

                            <Grid item xs={ 3 }>
                                <Autocomplete
                                    disableClearable={true}
                                    id="elemento"
                                    inputValue={ parametrosSeleccionado.nombreElemento }
                                    options={ elementosAutocomplete }
                                    getOptionLabel={option => ( option.nombre+' '+option.numero )}
                                    renderInput={(params) => <TextField {...params} name="elemento" label="Elemento" />}
                                    onChange={(event, value) => {
                                        setParametrosSeleccionado(prevState => ({
                                            ...prevState,
                                            idElemento: value.id,
                                            nombreElemento: event.target.innerText
                                        }))
                                    }}
                                />
                            </Grid>

                        </Grid>
                    </Card>
                </Grid>

                {/* BOTONES DE ACCIONES */}
                <Grid item xs={ 12 }>
                    <Card sx={{ p: 2, display: 'flex', justifyContent: 'flex-end' }}>
                        <Grid container spacing={ 2 } sx={{ justifyContent: 'flex-end' }}>
                            {
                                valores.codigo ? (
                                    <Grid item>
                                        <Button
                                            color='success'
                                            variant='contained'
                                            startIcon={ <NoteAddIcon /> }
                                            onClick={ guardarPlantilla }
                                        >
                                            Guardar plantilla
                                        </Button>
                                    </Grid>
                                ) : (
                                    <>
                                        <Grid item>
                                            <Button
                                                color='primary'
                                                variant='contained'
                                                startIcon={ <TaskIcon /> }
                                                onClick={ abrirPlantilla }
                                            >
                                                Abrir plantilla
                                            </Button>
                                        </Grid>

                                        <Grid item>
                                            <Button
                                                color='success'
                                                variant='contained'
                                                startIcon={ <NoteAddIcon /> }
                                                onClick={ guardarPlantilla }
                                            >
                                                Guardar plantilla
                                            </Button>
                                        </Grid>

                                        {/* <Grid item>
                                            <Button
                                                //sx={{ ml: 2 }}
                                                color='warning'
                                                variant='contained'
                                                startIcon={ <CreateIcon /> }
                                                onClick={ editarPlantilla }
                                            >
                                                Editar plantilla
                                            </Button>
                                        </Grid> */}
                                    </>
                                )
                            }
                        </Grid>
                    </Card>
                </Grid>

                {/* TABLA DE PARAMETRIZACIÓN */}
                <Grid item xs={ 12 }>
                    <Card sx={{ p: 2 }}>
                        <Grid container spacing={ 2 } sx={{ flexDirection: 'column' }}>

                            <Grid item>
                                <Typography variant="h6">Parámetros</Typography>
                            </Grid>

                            <Grid item>
                                <TableContainer component={Paper}>
                                    <Table sx={{ minWidth: 650 }}>

                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Nombre</TableCell>
                                                <TableCell>Lim. Mín.</TableCell>
                                                <TableCell>Lim. Máx.</TableCell>
                                                <TableCell>Unidades</TableCell>
                                                <TableCell>Activar</TableCell>
                                                <TableCell>Ver Insp.</TableCell>
                                            </TableRow>
                                        </TableHead>

                                        <TableBody>
                                            {
                                                tipoParametros.map( (parametro, index) => (
                                                    <LineaParametro
                                                        key={ index }
                                                        parametros={ tipoParametros }
                                                        indice={ index }
                                                        limInf={ handleLimitInferior }
                                                        limSup={ handleLimitSuperior }
                                                        unidades={ handleUnidad }
                                                        activar={ handleActivo }
                                                        verInsp={ handleVerInspector }
                                                    />
                                                ))
                                            }
                                        </TableBody>

                                    </Table>
                                </TableContainer>
                            </Grid>

                        </Grid>
                    </Card>
                </Grid>

            </Grid>
        </MainLayout>
    );
}