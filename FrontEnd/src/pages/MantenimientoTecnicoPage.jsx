import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Grid, Card, CardContent, Autocomplete, Typography, RadioGroup, FormControl } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import FileOpenIcon from '@mui/icons-material/FileOpen';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
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
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import Checkbox from '@mui/material/Checkbox';
import TextareaAutosize from '@mui/base/TextareaAutosize';
//import './MantenimientoTecnico.css';
import { MainLayout } from "../layout/MainLayout";
import { ParametroMantenimiento } from "../components/Mantenimiento/ParametroMantenimiento";
import Swal from "sweetalert2";
import { useUsuarioActual } from '../hooks/useUsuarioActual';
import { AuthContext } from "../context/AuthContext";
import { getConfNivelesPlantasCliente, getParametrosElementoPlantaClienteConFiltros, getUsuarios, getClientes, getElementos, getOfertas, 
    getParametros, getFilasParametros, putValorParametros, getAnalisis, getAnalisisNivelesPlantasCliente, getParametrosAnalisisPlanta, generarPdf, 
    getParametrosAnalisisFiltrados, putParametrosAnalisisPlanta 
} from "../api";

const token = {
    headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
    }
};

export const MantenimientoTecnicoPage = () => {

    const { user } = useContext(AuthContext);

    /*** VARIABLES ***/
    let opcionesFiltradasAnalisis = [];
    let opcionesNombreFiltradasAnalisis = [];

    /*** ESTADOS ***/

    // Declaración de variables
    const [clientes, setClientes] = useState([]);
    const [ofertas, setOfertas] = useState([]);
    const [elementos, setElementos] = useState([]);
    const [analisis, setAnalisis] = useState([]);
    const [operarios, setOperarios] = useState([]);
    const [parametros, setParametros] = useState([]);
    const [parametrosElemento, setParametrosElemento] = useState([]);
    const [parametrosAnalisisPlanta, setParametrosAnalisisPlanta] = useState([]);
    const [tareaAnalisisPlanta, setTareaAnalisisPlanta] = useState({});
    const [confNivelesPlantasCliente, setConfNivelesPlantasCliente] = useState([]);
    const [confAnalisisNivelesPlantasCliente, setConfAnalisisNivelesPlantasCliente] = useState([]);
    const { parametrosBack, setDatosParametrosBack } = useParserBack();
    const { parametrosFront } = useParserFront(setDatosParametrosBack);
    const [elementosAutocomplete, setElementosAutocomplete] = useState([]);
    const [analisisAutocomplete, setAnalisisAutocomplete] = useState([]);
    const [valoresParametros, setValoresParametros] = useState([]);
    const [parametrosSeleccionado, setParametrosSeleccionado] = useState({
        id: 0,
        codigoCliente: 0,
        nombreCliente: '',
        referencia: '',
        oferta: 0,
        idElemento: 0,
        nombreElemento: '',
        idAnalisis: 0,
        nombreAnalisis: '',
        idOperario: 0,
        realizado: false,
        fecha: null,
        parametro: 0,
        unidad: '',
        valor: 0
    })

    const [data, setData] = useState([]);
    const [dataParametros, setDataParametros] = useState([]);

    const { usuarioActual } = useUsuarioActual();

    const GetConfNivelesPlantasCliente = async () => {

        const resp = getConfNivelesPlantasCliente();
        const niveles = Object.entries(resp).map(([key, value]) => (key, value))
        setConfNivelesPlantasCliente(niveles);

    }

    console.log(usuarioActual)

    /*** EFECTOS ***/

    // Peticiones a la api
    useEffect(() => {

        getClientes()
            .then((res) => setClientes(res));

        getOfertas()
            .then((res) => setOfertas(res));

        getElementos()
            .then((res) => setElementos(res));

        getParametros()
            .then((res) => setParametros(res));

        getAnalisis()
            .then(resp => setAnalisis(resp));


        getUsuarios()
            .then(operarios => {
                setOperarios(operarios)
            })

        getAnalisisNivelesPlantasCliente()
            .then(resp => setConfAnalisisNivelesPlantasCliente(resp));

        getParametrosAnalisisPlanta()
            .then(resp => setParametrosAnalisisPlanta(resp))

        GetConfNivelesPlantasCliente();
    }, [])

    // Filtramos elementos para el desplegable
    useEffect(() => {

        let elementosLista = [];

        confNivelesPlantasCliente.filter(planta => planta.codigoCliente === parametrosSeleccionado.codigoCliente && planta.oferta === parametrosSeleccionado.oferta).map(elem => {
            elementosLista.push(elementos.filter(elementoLista => elementoLista.id === elem.id_Elemento)[0]);
        })

        setElementosAutocomplete(elementosLista);

    }, [parametrosSeleccionado.codigoCliente, parametrosSeleccionado.oferta]);


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

    useEffect(() => {

        opcionesFiltradasAnalisis = [];
        opcionesNombreFiltradasAnalisis = [];

        const lista = confNivelesPlantasCliente.filter(planta => planta.codigoCliente === parametrosSeleccionado.codigoCliente && planta.oferta === parametrosSeleccionado.oferta && planta.id_Elemento === parametrosSeleccionado.idElemento);

        lista.map(analisis => {
            opcionesFiltradasAnalisis.push(confAnalisisNivelesPlantasCliente.filter(anal => anal.id_NivelesPlanta === analisis.id));
        })

        opcionesFiltradasAnalisis.map(nomAnalisis => {
            nomAnalisis.map(anal => {
                opcionesNombreFiltradasAnalisis.push(analisis.filter(an => an.id === anal.id_Analisis)[0])
            })
        })

        setAnalisisAutocomplete(opcionesNombreFiltradasAnalisis)

    }, [parametrosSeleccionado.idElemento])

    // useEffect(() => {

    //     valoresParametros.map( parametro => {


    //     });

    // },[valoresParametros])

    /*** FUNCIONES ***/

    const handleChange = e => {
        const { name, value } = e.target;
        setParametrosSeleccionado(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleChangeRadioButton = e => {
        const { name, value } = e.target
        if (value === "false") {
            setParametrosSeleccionado(prevState => ({
                ...prevState,
                [name]: false
            }))
        } else {
            setParametrosSeleccionado(prevState => ({
                ...prevState,
                [name]: true
            }))
        }
    };

    const handleChangeCheckbox = e => {
        const { name, value, checked } = e.target
        const fechaActual = Date.now();
        const hoy = new Date(fechaActual);
        setTareaAnalisisPlanta(valorPrevio => ({
            ...valorPrevio,
            [name]: checked,
            fechaRecogido: hoy.toISOString()
        }))
    }

    const handleChangeCheckbox2 = e => {
        const { name, value, checked } = e.target
        const fechaActual = Date.now();
        const hoy = new Date(fechaActual);
        setTareaAnalisisPlanta(valorPrevio => ({
            ...valorPrevio,
            [name]: checked,
            fechaRealizado: hoy.toISOString()
        }))
    }

    const handleTextArea = e => {
        const { name, value } = e.target
        setTareaAnalisisPlanta((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    const onChangeCliente = (e, value, name) => {

        setParametrosSeleccionado((prevState) => ({
            ...prevState,
            [name]: value.codigo,
            oferta: '',
            idElemento: '',
            nombreElemento: '',
            idAnalisis: '',
            nombreAnalisis: ''
        }))

    }

    const onChangeOferta = (e, value, name) => {

        setParametrosSeleccionado((prevState) => ({
            ...prevState,
            [name]: value.numeroOferta,
            idElemento: '',
            nombreElemento: '',
            idAnalisis: '',
            nombreAnalisis: ''
        }))

    }

    const onChangeElemento = (e, value, name) => {

        setParametrosSeleccionado((prevState) => ({
            ...prevState,
            [name]: value.id,
            nombreElemento: e.target.textContent,
            idAnalisis: '',
            nombreAnalisis: ""
        }))
    }

    const onChangeAnalisis = (e, value, name) => {

        setParametrosSeleccionado((prevState) => ({
            ...prevState,
            [name]: value.id,
            nombreAnalisis: e.target.textContent
        }))
    }

    const guardarPDF = async () => {

        const valoresParametrosParseado = valoresParametros.map((parametro) => ({ ...parametro, valor: parseInt(parametro.valor, 10) }))

        const fechaActual = Date.now();
        const hoy = new Date(fechaActual);

        const response = await generarPdf(valoresParametrosParseado)
        setTareaAnalisisPlanta(valorPrevio => ({
            ...valorPrevio,
            pdf: response,
            nombreElemento: parametrosSeleccionado.nombreElemento,
            realizado: true,
            fechaRealizado: hoy.toISOString()
        }))

        Swal.fire({
            position: 'center',
            icon: 'info',
            title: 'Pdf guardado',
            text: `El pdf se ha guardado`,
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

    const handleGetParametros = async () => {

        const resp = await getFilasParametros(parametrosSeleccionado.codigoCliente, parametrosSeleccionado.oferta, parametrosSeleccionado.idElemento, parametrosSeleccionado.idAnalisis, parametrosSeleccionado.fecha);
        setParametrosElemento(resp);

        const resp2 = await getParametrosAnalisisFiltrados(parametrosSeleccionado.codigoCliente, parametrosSeleccionado.oferta, parametrosSeleccionado.idElemento, parametrosSeleccionado.idAnalisis, parametrosSeleccionado.fecha)
        setTareaAnalisisPlanta(resp2[0])

        // Preparamos la variable que almacenará los valores de los parametros
        let parametrosMostrar = [];
        const datos = await getParametrosElementoPlantaClienteConFiltros(parametrosSeleccionado.codigoCliente, parametrosSeleccionado.oferta, parametrosSeleccionado.idElemento, parametrosSeleccionado.idAnalisis);

        // Recorremos los registros para ver que valores podemos guardar (activo)
        datos.map(registro => {

            // Si está activo, seteamos los valores
            if (registro.activo) {

                // Obtenemos todos los valores del parametro actual (valores del mismo parametro, enero, febrero, ...)
                const valoresPorParametro = resp.filter(param => param.parametro === registro.parametro);

                // Preparamos el valor del mes actual y el arreglo de meses
                let mesActual = new Date().getMonth();
                let fechas = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

                // Mapeamos los valores en un array, y si no hay datos seteamos un 0
                valoresPorParametro.map(val => {

                    const fecha = new Date(val.fecha);

                    for (let i = 0; i < 12; i++) {
                        if (fecha.getMonth() === i) {
                            fechas[i] = val.valor;
                        }
                    }

                });

                // Volteamos las fechas para obtener los meses anteriores
                fechas = fechas.reverse();

                // Obtenemos los dos últimos meses y si no hay registros, seteamos un 0
                let valoresMeses = fechas.slice(12 - mesActual, (12 - mesActual) + 2);
                if (valoresMeses.length < 2) {
                    valoresMeses.push(0);
                }

                // Creamos el objeto
                parametrosMostrar.push({
                    id: valoresPorParametro[0] ? valoresPorParametro[0].id : 0,
                    codigoCliente: parametrosSeleccionado.codigoCliente,
                    fecha: parametrosSeleccionado.fecha,
                    id_Elemento: parametrosSeleccionado.idElemento,
                    oferta: parametrosSeleccionado.oferta,
                    id_Analisis: parametrosSeleccionado.idAnalisis,
                    id_Operario: parametrosSeleccionado.idOperario,
                    parametro: registro.parametro,
                    referencia: parametrosSeleccionado.referencia,
                    unidad: registro.unidades,
                    valor: valoresPorParametro[0] ? parseInt(valoresPorParametro[0].valor, 10) : 0,
                    limInf: registro.limInf,
                    limSup: registro.limSup,
                    dosMeses: valoresMeses
                })
            }

        });

        // Finalmente, añadimos los datos al estado
        setValoresParametros(parametrosMostrar);

    }

    const handleEditarParametro = (e, id) => {

        // Recorremos el array del estado para encontrar el objeto que hemos modificado
        setValoresParametros(prev => (prev.map(row => {
            if (row.parametro === id) {
                return { ...row, valor: e.target.value };
            } else {
                return row;
            }
        })));

    }

    const guardarParametros = async () => {

        // Recorremos parametro por parametro para hacer una petición POST
        await valoresParametros.map(async (parametro) => {

            let parametroPut = {
                Id: parametro.id,
                CodigoCliente: parametro.codigoCliente,
                Referencia: parametro.referencia,
                Oferta: parametro.oferta,
                Id_Elemento: parametro.id_Elemento,
                Id_Analisis: parametro.id_Analisis,
                Id_Operario: (parametro.id_Operario === 0) ? usuarioActual.id : parametro.id_Operario,
                Parametro: parametro.parametro,
                Fecha: parametro.fecha,
                Valor: parseInt(parametro.valor, 10),
                Unidad: parametro.unidad
            }

            // Nos aseguramos de que tengamos código de referencia y fecha
            if (parametrosSeleccionado.fecha !== null) {

                if(parametrosSeleccionado.referencia !== ""){
                    parametroPut.Referencia = parametrosSeleccionado.referencia 
                }

                parametroPut.Fecha = parametrosSeleccionado.fecha

                const resp = await putValorParametros(parametroPut);

                await putParametrosAnalisisPlanta(tareaAnalisisPlanta)

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

        if (parametrosSeleccionado.idAnalisis === 7 || parametrosSeleccionado.idAnalisis === 8 || parametrosSeleccionado.idAnalisis === 9 || parametrosSeleccionado.idAnalisis === 10 || parametrosSeleccionado.idAnalisis === 12 || parametrosSeleccionado.idAnalisis === 13 || parametrosSeleccionado.idAnalisis === 14 || parametrosSeleccionado.idAnalisis === 15 || parametrosSeleccionado.idAnalisis === 16 || parametrosSeleccionado.idAnalisis === 17 || parametrosSeleccionado.idAnalisis === 18) {

            setTareaAnalisisPlanta(valorPrevio => ({
                ...valorPrevio,
                nombreElemento: parametrosSeleccionado.nombreElemento
            }))


            await putParametrosAnalisisPlanta(tareaAnalisisPlanta)

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

    }

    return (
        <MainLayout title='Mantenimiento técnico'>
            <Grid container spacing={3}>

                {/* Sección de búsqueda */}
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Grid container spacing={2}>

                                <Grid item xs={2}>
                                    <Autocomplete
                                        disableClearable={true}
                                        id="codigoCliente"
                                        options={clientes}
                                        getOptionLabel={option => option.codigo.toString()}
                                        renderInput={params => <TextField {...params} label="Código de cliente" name="codigoCliente" />}
                                        onChange={(event, value) => onChangeCliente(event, value, "codigoCliente")}
                                    />
                                </Grid>

                                <Grid item xs={3}>
                                    <TextField
                                        sx={{ width: '100%' }}
                                        label="Nombre del cliente"
                                        id='nombreCliente'
                                        name="nombreCliente"
                                        value={parametrosSeleccionado && parametrosSeleccionado.nombreCliente}
                                        onChange={handleChange}
                                    />
                                </Grid>

                                <Grid item xs={2}>
                                    <Autocomplete
                                        disableClearable={true}
                                        id="codigoOferta"
                                        options={ofertas.sort((a, b) => b.numeroOferta - a.numeroOferta)}
                                        inputValue={parametrosSeleccionado.oferta}
                                        filterOptions={options => ofertas.filter(oferta => oferta.codigoCliente === parametrosSeleccionado.codigoCliente)}
                                        getOptionLabel={option => option.numeroOferta.toString()}
                                        renderInput={params => <TextField {...params} label="Código de oferta" name="oferta" />}
                                        onChange={(event, value) => onChangeOferta(event, value, "oferta")}
                                    />
                                </Grid>

                                <Grid item xs={2}>
                                    <Autocomplete
                                        disableClearable={true}
                                        id="elemento"
                                        options={elementosAutocomplete}
                                        inputValue={parametrosSeleccionado.nombreElemento}
                                        getOptionLabel={option => option.nombre + ' ' + option.numero}
                                        renderInput={params => <TextField {...params} label="Elemento" name="idElemento" />}
                                        onChange={(event, value) => onChangeElemento(event, value, "idElemento")}
                                    />
                                </Grid>

                                <Grid item xs={3}>
                                    <Autocomplete
                                        disableClearable={true}
                                        id="analisis"
                                        inputValue={parametrosSeleccionado.nombreAnalisis}
                                        options={analisisAutocomplete}
                                        getOptionLabel={option => option.nombre}
                                        renderInput={(params) => <TextField {...params} name="idAnalisis" label="Analisis y Revisiones" />}
                                        onChange={(event, value) => onChangeAnalisis(event, value, "idAnalisis")}
                                    />
                                </Grid>

                                <Grid item xs={3}>
                                    <Autocomplete
                                        disableClearable={true}
                                        sx={{ width: '100%' }}
                                        id="Operarios"
                                        options={operarios}
                                        defaultValue={user.idPerfil === 1004 ? user : undefined}
                                        filterOptions={options => operarios.filter(cliente => cliente.idPerfil === 1004)}
                                        getOptionLabel={option => option.nombre + ' ' + option.apellidos}
                                        renderInput={(params) => <TextField {...params} label="Operario" name="operario" />}
                                        onChange={(event, value) => setParametrosSeleccionado(prevState => ({
                                            ...prevState,
                                            idOperario: value.id
                                        }))}
                                    />
                                </Grid>

                                <Grid item xs={2}>
                                    <TextField
                                        sx={{ width: '100%' }}
                                        label="Referencia"
                                        id='referencia'
                                        name="referencia"
                                        onChange={handleChange}
                                    />
                                </Grid>

                                <Grid item xs={2}>
                                    <FormControl>
                                        <RadioGroup
                                            aria-labelledby="demo-radio-buttons-group-label"
                                            defaultValue={false}
                                            value={parametrosSeleccionado.realizado}
                                            onChange={handleChangeRadioButton}
                                        >
                                            <FormControlLabel value={false} control={<Radio />} name="realizado" label="Pendientes" />
                                            <FormControlLabel value={true} control={<Radio />} name="realizado" label="Realizado" />

                                        </RadioGroup>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={3}>
                                    <Autocomplete
                                        disableClearable={true}
                                        sx={{ width: '100%' }}
                                        id="fecha"
                                        options={parametrosAnalisisPlanta.sort((a, b) => new Date(a.fechas).getTime() > new Date(b.fechas).getTime())}
                                        filterOptions={options => parametrosAnalisisPlanta.filter(cliente => cliente.codigoCliente === parametrosSeleccionado.codigoCliente && cliente.oferta === parametrosSeleccionado.oferta && cliente.elemento === parametrosSeleccionado.idElemento && cliente.analisis === parametrosSeleccionado.idAnalisis && cliente.realizado === parametrosSeleccionado.realizado)}
                                        getOptionLabel={option => option.fecha}
                                        renderInput={(params) => <TextField {...params} label="Fecha" name="fecha" />}
                                        onChange={(event, value) => setParametrosSeleccionado(prevState => ({
                                            ...prevState,
                                            fecha: value.fecha
                                        }))}
                                    />
                                </Grid>

                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Sección tabla de parámetros */}
                <Grid item xs={12}>
                    <Card>
                        {
                            (parametrosSeleccionado.idAnalisis === 7 || parametrosSeleccionado.idAnalisis === 8 || parametrosSeleccionado.idAnalisis === 9 || parametrosSeleccionado.idAnalisis === 10 || parametrosSeleccionado.idAnalisis === 12 || parametrosSeleccionado.idAnalisis === 13 || parametrosSeleccionado.idAnalisis === 14 || parametrosSeleccionado.idAnalisis === 15 || parametrosSeleccionado.idAnalisis === 16 || parametrosSeleccionado.idAnalisis === 17 || parametrosSeleccionado.idAnalisis === 18) ?
                                (<CardContent style={{ padding: '30px', margin: '15px' }}>
                                    <Grid container spacing={4}>
                                        <Grid item xs={4}>
                                            <FormControlLabel control={<Checkbox />} sx={{ width: '100%' }} label="Recogida de Muestras" name="recogido" onChange={handleChangeCheckbox} />
                                            <FormControlLabel control={<Checkbox />} sx={{ width: '100%' }} label="Realizado" name="realizado" onChange={handleChangeCheckbox2} />
                                        </Grid>
                                        <Grid item xs={6} md={6}>
                                            <p> Observaciones </p>
                                            <TextareaAutosize
                                                aria-label="empty textarea"
                                                minRows={8}
                                                name="observaciones"
                                                style={{ width: '100%' }}
                                                onChange={handleTextArea}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={4}>

                                    </Grid>
                                </CardContent>
                                ) :
                                (
                                    <CardContent>
                                        {
                                            (parametrosElemento.length > 0) ? (
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
                                                                valoresParametros.map((parametro, index) => {

                                                                    const nombreParametro = parametros.filter(param => param.id === parametro.parametro)[0].nombre;

                                                                    return (
                                                                        <ParametroMantenimiento
                                                                            limite={({ limSup: parametro.limSup, limInf: parametro.limInf })}
                                                                            key={index}
                                                                            indice={index}
                                                                            parametros={valoresParametros}
                                                                            onChange={handleEditarParametro}
                                                                            nombre={nombreParametro}
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
                                )}
                    </Card>
                </Grid>

                {/* Sección de botones */}
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Grid container sx={{ justifyContent: 'flex-end' }} spacing={2}>
                                {valoresParametros != "" &&
                                    <Grid item sx={{ justifyContent: 'flex-start' }}>
                                        <Button
                                            variant="contained"
                                            startIcon={<PictureAsPdfIcon />}
                                            onClick={guardarPDF}
                                        >
                                            Generar PDF
                                        </Button>
                                    </Grid>
                                }

                                <Grid item>
                                    <Button
                                        variant="contained"
                                        color="success"
                                        startIcon={<SaveIcon />}
                                        onClick={guardarParametros}
                                    >
                                        Guardar datos
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button
                                        variant="contained"
                                        startIcon={<FileOpenIcon />}
                                        onClick={handleGetParametros}
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