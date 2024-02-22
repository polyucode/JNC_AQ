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
import {
    getConfNivelesPlantasCliente, getParametrosElementoPlantaClienteConFiltros, getUsuarios, getClientes, getElementos, getOfertas,
    getParametros, getFilasParametros, putValorParametros, getAnalisis, getAnalisisNivelesPlantasCliente, getParametrosAnalisisPlanta, generarPdf,
    getParametrosAnalisisFiltrados, putParametrosAnalisisPlanta, postValorParametros, getElementosPlanta, getAnalisisId, bajarPdf, getTareas, bajarPdfInstrucciones, getContactos
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
    const [tareas, setTareas] = useState([]);
    const [contactos, setContactos] = useState([]);
    const [contactosCliente, setContactosCliente] = useState([]);
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
        fechaIso: null,
        parametro: 0,
        unidad: '',
        valor: '',
        metodo: '1. 18'
    })

    const [parametrosFiltrados, setParametrosFiltrados] = useState([]);

    const [data, setData] = useState([]);
    const [dataParametros, setDataParametros] = useState([]);

    const [nombreOperario, setNombreOperario] = useState([]);

    const { usuarioActual } = useUsuarioActual();

    const GetConfNivelesPlantasCliente = async () => {

        const resp = await getConfNivelesPlantasCliente();
        const niveles = Object.entries(resp).map(([key, value]) => (key, value))
        setConfNivelesPlantasCliente(niveles);

    }

    /*** EFECTOS ***/

    useEffect(() => {
        setParametrosSeleccionado(prevState => ({
            ...prevState,
            idOperario: usuarioActual.id
        }))
    }, [usuarioActual])

    // Peticiones a la api
    useEffect(() => {

        getClientes()
            .then((res) => setClientes(res));

        getOfertas()
            .then((res) => setOfertas(res));

        getElementosPlanta()
            .then((res) => setElementos(res));

        getParametros()
            .then((res) => setParametros(res));

        getAnalisis()
            .then(resp => setAnalisis(resp));

        getTareas()
            .then(tarea => {
                setTareas(tarea)
            })

        getContactos()
            .then(contacto => {
                setContactos(contacto)
            })

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

    useEffect(() => {

        if (parametrosSeleccionado.codigoCliente != 0) {
            const codigo = clientes.filter(cliente => cliente.codigo === parametrosSeleccionado.codigoCliente)[0];
            setParametrosSeleccionado({
                ...parametrosSeleccionado,
                nombreCliente: codigo.razonSocial
            });
        }

    }, [parametrosSeleccionado.codigoCliente]);

    useEffect(() => {

        if (parametrosSeleccionado.nombreCliente != "") {
            const nombre = clientes.filter(cliente => cliente.razonSocial === parametrosSeleccionado.nombreCliente)[0];
            setParametrosSeleccionado({
                ...parametrosSeleccionado,
                codigoCliente: nombre.codigo
            });
        }

    }, [parametrosSeleccionado.nombreCliente]);

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

    const onChangeOferta = (e, value, name) => {

        setParametrosSeleccionado((prevState) => ({
            ...prevState,
            [name]: value.numeroOferta,
            idElemento: 0,
            nombreElemento: '',
            idAnalisis: 0,
            nombreAnalisis: '',
            fecha: null,
            fechaIso: ''
        }))

    }

    const onChangeElemento = (e, value, name) => {

        setParametrosSeleccionado((prevState) => ({
            ...prevState,
            [name]: value.id,
            nombreElemento: e.target.textContent,
            idAnalisis: 0,
            nombreAnalisis: "",
            fecha: null,
            fechaIso: ''
        }))
    }

    const onChangeAnalisis = (e, value, name) => {

        if (e.target.innerText !== "") {
            setParametrosFiltrados(tareas.filter(tarea => tarea.codigoCliente === parametrosSeleccionado.codigoCliente && tarea.oferta === parametrosSeleccionado.oferta && tarea.elemento === parametrosSeleccionado.idElemento && tarea.analisis === value.id))
        }

        setParametrosSeleccionado((prevState) => ({
            ...prevState,
            [name]: value.id,
            nombreAnalisis: e.target.textContent,
            fecha: null,
            fechaIso: ''
        }))
    }

    const onChangeFecha = (e, value, name) => {

        setValoresParametros([])
        setTareaAnalisisPlanta({})

        setParametrosSeleccionado((prevState) => ({
            ...prevState,
            [name]: value.fecha,
            fechaIso: e.target.textContent
        }))
    }

    const onChangeOperario = (e, value, name) => {

        setParametrosSeleccionado((prevState) => ({
            ...prevState,
            [name]: value.id
        }))

        if (tareaAnalisisPlanta != {}) {
            setTareaAnalisisPlanta((prevState) => ({
                ...prevState,
                operario: value.id
            }))
        }
    }

    const guardarPDF = async () => {

        const valoresParametrosParseado = valoresParametros.map((parametro) => ({ ...parametro, fecha: parametrosSeleccionado.fecha, valor: parametro.valor, metodo: parametrosSeleccionado.metodo }))

        const fechaActual = Date.now();
        const hoy = new Date(fechaActual);

        const response = await generarPdf(valoresParametrosParseado)
        setTareaAnalisisPlanta(valorPrevio => ({
            ...valorPrevio,
            pdf: response,
            nombreElemento: parametrosSeleccionado.nombreElemento,
            operario: parametrosSeleccionado.idOperario,
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

        if (resp2[0].analisis == 1 || resp2[0].analisis == 2 || resp2[0].analisis == 3 || resp2[0].analisis == 4 || resp2[0].analisis == 5 || resp2[0].analisis == 6 || resp2[0].analisis == 7 || resp2[0].analisis == 8) {
            resp.map(registro => {

                const valoresPorParametro = datos.filter(param => param.parametro === registro.parametro)

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
                    id: registro.id,
                    codigoCliente: parametrosSeleccionado.codigoCliente,
                    fecha: registro.fecha,
                    id_Elemento: parametrosSeleccionado.idElemento,
                    oferta: parametrosSeleccionado.oferta,
                    id_Analisis: parametrosSeleccionado.idAnalisis,
                    id_Operario: (registro.id_Operario != null) ? registro.id_Operario : parametrosSeleccionado.idOperario,
                    parametro: registro.parametro,
                    referencia: parametrosSeleccionado.referencia,
                    unidad: registro.unidad,
                    valor: registro.valor,
                    limInf: valoresPorParametro[0] ? valoresPorParametro[0].limInf : 0,
                    limSup: valoresPorParametro[0] ? valoresPorParametro[0].limSup : 0,
                    dosMeses: valoresMeses
                })

            })

            // Finalmente, añadimos los datos al estado
            setValoresParametros(parametrosMostrar);

            const operario = operarios.find((op) => op.id === parametrosMostrar[0].id_Operario)
            setNombreOperario(operario.nombre + ' ' + operario.apellidos)
        }
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

    const descargarPdf = async () => {

        const resp = await getAnalisisId(parametrosSeleccionado.idAnalisis)

        const fecha = new Date(parametrosSeleccionado.fecha); // Convertir la cadena a un objeto de fecha

        // Obtener año y mes de la fecha
        const año = fecha.getFullYear();
        const mes = fecha.getMonth() + 1; // Los meses van de 0 a 11, por lo que se suma 1

        // Formatear el mes para asegurarse de que siempre tenga dos dígitos (por ejemplo, '08' en lugar de '8')
        const mesFormateado = mes < 10 ? `0${mes}` : mes;

        // Crear la cadena de fecha en formato 'YYYY-MM'
        const fechaFormateada = `${año}-${mesFormateado}`;

        const response = await bajarPdfInstrucciones(parametrosFiltrados[0].pdf, parametrosFiltrados[0].codigoCliente, parametrosFiltrados[0].elemento, resp.nombre, fechaFormateada, { headers: { 'Content-type': 'application/pdf' } });

    }

    const guardarParametros = async () => {

        // Recorremos parametro por parametro para hacer una petición POST
        await valoresParametros.map(async (parametro) => {

            let parametroPut = {}

            if (parametro.fecha != null) {
                parametroPut = {
                    Id: parametro.id,
                    CodigoCliente: parametro.codigoCliente,
                    Referencia: parametro.referencia,
                    Oferta: parametro.oferta,
                    Id_Elemento: parametro.id_Elemento,
                    Id_Analisis: parametro.id_Analisis,
                    Id_Operario: (parametro.id_Operario === parametrosSeleccionado.idOperario) ? parametro.id_Operario : parametrosSeleccionado.idOperario,
                    Parametro: parametro.parametro,
                    Fecha: parametro.fecha,
                    Valor: parametro.valor,
                    Unidad: parametro.unidad,
                    Metodo: parametrosSeleccionado.metodo
                }

                setTareaAnalisisPlanta(valorPrevio => ({
                    ...valorPrevio,
                    nombreElemento: parametrosSeleccionado.nombreElemento,
                    operario: parametrosSeleccionado.idOperario
                }))

                const resp = await putValorParametros(parametroPut);

                await putParametrosAnalisisPlanta(tareaAnalisisPlanta);

                if (resp) {
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
                        text: `Ha habido un error en el guardado de datos!`,
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


            } else {

                parametroPut = {
                    CodigoCliente: parametro.codigoCliente,
                    Referencia: parametro.referencia,
                    Oferta: parametro.oferta,
                    Id_Elemento: parametro.id_Elemento,
                    Id_Analisis: parametro.id_Analisis,
                    Id_Operario: (parametro.id_Operario === 0) ? usuarioActual.id : parametro.id_Operario,
                    Parametro: parametro.parametro,
                    Fecha: parametrosSeleccionado.fecha,
                    Valor: parametro.valor,
                    Unidad: parametro.unidad,
                    Metodo: parametrosSeleccionado.metodo
                }

                setTareaAnalisisPlanta(valorPrevio => ({
                    ...valorPrevio,
                    nombreElemento: parametrosSeleccionado.nombreElemento,
                    operario: parametrosSeleccionado.idOperario
                }))

                const resp = await postValorParametros(parametroPut);

                await putParametrosAnalisisPlanta(tareaAnalisisPlanta);

                if (resp) {
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
                        text: `Ha habido un error en el guardado de datos!`,
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

        });



        if (parametrosSeleccionado.idAnalisis === 7 || parametrosSeleccionado.idAnalisis === 8 || parametrosSeleccionado.idAnalisis === 9 || parametrosSeleccionado.idAnalisis === 10 || parametrosSeleccionado.idAnalisis === 12 || parametrosSeleccionado.idAnalisis === 13 || parametrosSeleccionado.idAnalisis === 14 || parametrosSeleccionado.idAnalisis === 15 || parametrosSeleccionado.idAnalisis === 16 || parametrosSeleccionado.idAnalisis === 17 || parametrosSeleccionado.idAnalisis === 18) {

            setTareaAnalisisPlanta(valorPrevio => ({
                ...valorPrevio,
                nombreElemento: parametrosSeleccionado.nombreElemento,
                operario: parametrosSeleccionado.idOperario
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
        } else {

            await putParametrosAnalisisPlanta(tareaAnalisisPlanta)

        }

    }

    const clientesUnicos = clientes.filter((cliente, index, self) =>
        index === self.findIndex(c => c.razonSocial === cliente.razonSocial && !c.deleted)
    );

    return (
        <MainLayout title='Mantenimiento técnico'>
            <Grid container spacing={3}>

                {/* Sección de búsqueda */}
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Grid container spacing={2}>

                                <Grid item xs={3}>
                                    <Autocomplete
                                        disableClearable={true}
                                        id="codigoCliente"
                                        options={clientes}
                                        value={clientes.find(cliente => cliente.razonSocial === parametrosSeleccionado.nombreCliente) || null}
                                        filterOptions={options => clientes.filter(cliente => !cliente.deleted)}
                                        getOptionLabel={option => option.razonSocial}
                                        renderInput={params => <TextField {...params} label="Nombre cliente" name="nombreCliente" />}
                                        onChange={(event, value) => setParametrosSeleccionado(prevState => ({
                                            ...prevState,
                                            nombreCliente: value ? value.razonSocial : null,
                                            oferta: '',
                                            idElemento: 0,
                                            nombreElemento: '',
                                            idAnalisis: 0,
                                            nombreAnalisis: '',
                                            fecha: null,
                                            fechaIso: ''
                                        }))}
                                    />
                                </Grid>

                                <Grid item xs={2}>
                                    <Autocomplete
                                        disableClearable={true}
                                        id="codigoCliente"
                                        options={clientes}
                                        value={clientes.find(cliente => cliente.codigo === parametrosSeleccionado.codigoCliente) || null}
                                        filterOptions={options => clientes.filter(cliente => !cliente.deleted)}
                                        getOptionLabel={option => option.codigo.toString()}
                                        renderInput={params => <TextField {...params} label="Código de cliente" name="codigoCliente" />}
                                        onChange={(event, value) => setParametrosSeleccionado(prevState => ({
                                            ...prevState,
                                            codigoCliente: value ? parseInt(value.codigo) : null,
                                            nombreCliente: value ? value.razonSocial : null,
                                            oferta: '',
                                            idElemento: 0,
                                            nombreElemento: '',
                                            idAnalisis: 0,
                                            nombreAnalisis: '',
                                            fecha: null,
                                            fechaIso: ''
                                        }))}
                                    />
                                </Grid>

                                <Grid item xs={2}>
                                    <Autocomplete
                                        disableClearable={true}
                                        id="codigoOferta"
                                        options={ofertas.sort((a, b) => b.numeroOferta - a.numeroOferta)}
                                        inputValue={parametrosSeleccionado.oferta.toString()}
                                        filterOptions={options => ofertas.filter(oferta => oferta.codigoCliente === parametrosSeleccionado.codigoCliente && !oferta.deleted)}
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
                                        getOptionLabel={option => option.descripcion !== null ? option.nombre + ' ' + option.descripcion : option.nombre + ' ' + option.numero}
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
                                        onChange={(event, value) => onChangeOperario(event, value, "idOperario")}
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

                                <Grid item xs={12} md={1} style={{ display: 'flex', marginTop: '12px' }}>
                                    <p> Fecha </p>
                                </Grid>
                                <Grid item xs={2} style={{ display: 'flex' }}>
                                    <Autocomplete
                                        disableClearable={true}
                                        sx={{ width: '100%' }}
                                        id="fecha"
                                        inputValue={parametrosSeleccionado.fechaIso}
                                        options={parametrosAnalisisPlanta.sort((a, b) => new Date(a.fechas).getTime() > new Date(b.fechas).getTime())}
                                        filterOptions={options => parametrosAnalisisPlanta.filter(cliente => cliente.codigoCliente === parametrosSeleccionado.codigoCliente && cliente.oferta === parametrosSeleccionado.oferta && cliente.elemento === parametrosSeleccionado.idElemento && cliente.analisis === parametrosSeleccionado.idAnalisis && cliente.realizado === parametrosSeleccionado.realizado && !cliente.deleted).sort((a, b) => new Date(a.fechas).getTime() > new Date(b.fechas).getTime())}
                                        getOptionLabel={option => new Date(option.fecha).toLocaleDateString()}
                                        renderInput={(params) => <TextField {...params} name="fecha" />}
                                        onChange={(event, value) => onChangeFecha(event, value, "fecha")}
                                    />
                                </Grid>
                                {parametrosFiltrados.length > 0 &&
                                    <Grid item xs={2} md={2}>
                                        <button style={{ display: 'inline-block', width: '200px', height: '40px', backgroundColor: '#545355', borderRadius: '6px', color: 'white', fontSize: '15px' }} onClick={descargarPdf}>PDF Instrucciones</button>
                                    </Grid>
                                }
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
                {valoresParametros != "" && usuarioActual.idPerfil === 1004 && valoresParametros[0].id_Operario !== usuarioActual.id ?
                    <Grid item xs={12}>
                        <Card>
                            <CardContent>
                                <Typography>Esta tarea la ha realizado {nombreOperario}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    :
                    false
                }

                {/* Sección tabla de parámetros */}
                <Grid item xs={12}>
                    <Card>
                        {
                            (parametrosSeleccionado.idAnalisis === 7 || parametrosSeleccionado.idAnalisis === 9 || parametrosSeleccionado.idAnalisis === 10 || parametrosSeleccionado.idAnalisis === 12 || parametrosSeleccionado.idAnalisis === 13 || parametrosSeleccionado.idAnalisis === 14 || parametrosSeleccionado.idAnalisis === 15 || parametrosSeleccionado.idAnalisis === 16 || parametrosSeleccionado.idAnalisis === 17 || parametrosSeleccionado.idAnalisis === 18) && tareaAnalisisPlanta.codigoCliente ?
                                (<CardContent style={{ padding: '30px', margin: '15px' }}>
                                    <Grid container spacing={4}>
                                        <Grid item xs={4}>
                                            <FormControlLabel control={<Checkbox />} sx={{ width: '100%' }} label="Recogida de Muestras" name="recogido" checked={tareaAnalisisPlanta.recogido} onChange={handleChangeCheckbox} />
                                            <FormControlLabel control={<Checkbox />} sx={{ width: '100%' }} label="Realizado" name="realizado" checked={tareaAnalisisPlanta.realizado} onChange={handleChangeCheckbox2} />
                                        </Grid>
                                        <Grid item xs={6} md={6}>
                                            <p> Observaciones </p>
                                            <TextareaAutosize
                                                aria-label="empty textarea"
                                                minRows={8}
                                                name="observaciones"
                                                style={{ width: '100%' }}
                                                onChange={handleTextArea}
                                                defaultValue={tareaAnalisisPlanta.observaciones}
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
                                                <>
                                                    <TextField
                                                        label="Metodo Analítico"
                                                        id='metodo'
                                                        name="metodo"
                                                        onChange={handleChange}
                                                        value={parametrosSeleccionado && parametrosSeleccionado.metodo}
                                                    />
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
                                                </>
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
                                {
                                    (tareaAnalisisPlanta.realizado || tareaAnalisisPlanta.recogido) &&
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
                                }
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