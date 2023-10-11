import React, { useState, useEffect } from 'react';
import { TextField } from '@material-ui/core';
import { Autocomplete, Typography, Button, Card, Grid, List, ListItemButton, ListItemText, Tooltip, Alert } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import DownloadIcon from '@mui/icons-material/Download';
import Swal from 'sweetalert2';
import { camelCase } from 'lodash';
import ReactFlow, { Background } from "react-flow-renderer";
import { MainLayout } from "../layout/MainLayout";
import {
    getAnalisisNivelesPlantasCliente, getAnalisisNivelesPlantasClientePorIdNivel, getClientes, getConfNivelesPlantasClientePorPlanta, getConfPlantaCliente,
    getConfPlantaClientePorClienteOferta, getElementoPorId, getAnalisis, getOfertas, getParametros, postAnalisisNivelesPlantasCliente, postConfNivelesPlantasCliente,
    postConfPlantaCliente, postElementos, postParametrosElementoPlantaCliente, putAnalisisNivelesPlantasCliente, putConfNivelesPlantasCliente, putConfPlantaCliente, putElementos, deleteConfPlantaCliente, deleteConfNivelesPlantasCliente, deleteAnalisisNivelesPlantasCliente, getElementosPlanta, deleteElementosPlanta
} from "../api";
import { NivelPlanta } from "../components/Plantas/NivelPlanta";
import { CheckBoxAnalisis } from "../components/Plantas/CheckBoxAnalisis";
import { useDiagrama } from "../helpers/generarDiagrama";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useNavigate } from 'react-router-dom';

import DeleteIcon from '@mui/icons-material/Delete';
import { useUsuarioActual } from '../hooks/useUsuarioActual';

export const PlantasPage = () => {

    /** ESTADOS **/

    // Configuración planta del cliente
    const [confPlantaCliente, setConfPlantaCliente] = useState({
        Id: 0,
        CodigoCliente: 0,
        NombreCliente: '',
        Oferta: 0,
        NumNiveles: '',
        Diagrama: ""
    });
    const [crearPlanta, setCrearPlanta] = useState(true);
    const [plantaCreada, setPlantaCreada] = useState(false);
    const [niveles, setNiveles] = useState([]);

    // Datos de los autocomplete
    const [clientes, setClientes] = useState([]);
    const [ofertas, setOfertas] = useState([]);
    const [analisis, setAnalisis] = useState([]);
    const [parametros, setParametros] = useState([]);

    // Listado de elementos
    const [elementosPlanta, setElementosPlanta] = useState([]);
    const [contadorElemento, setContadorElemento] = useState({});
    const [indiceElemento, setIndiceElemento] = useState(-1);
    const [elementoSeleccionado, setElementoSeleccionado] = useState(0);

    const [snackData, setSnackData] = useState({ open: false, msg: 'Testing', severity: 'success' });
    const [confNivelesPlantaCliente, setConfNivelesPlantaCliente] = useState([]);
    const [analisisNiveles, setAnalisisNiveles] = useState([]);
    const [datosGuardados, setDatosGuardados] = useState(false);
    const [diagramaGuardado, setDiagramaGuardado] = useState(false);

    const [estadoEliminarPlanta, setEstadoEliminarPlanta] = useState(false);

    /** HOOKS **/
    const navigate = useNavigate();
    const [nodos2, setNodos2] = useState([]);
    const [lados2, setLados2] = useState([]);
    const { nodos, lados, nodeTypes, diagramaGenerado, generarDiagrama, onEdgesChange, onConnect } = useDiagrama();

    const { usuarioActual } = useUsuarioActual();


    /** EFECTOS **/

    // Obtenemos todos los datos necesarios de la base de datos
    useEffect(() => {

        getClientes()
            .then(resp => { setClientes(resp) });

        getOfertas()
            .then(resp => { setOfertas(resp) });

        getAnalisis()
            .then(resp => { setAnalisis(resp) });

        getParametros()
            .then(resp => { setParametros(resp) });

    }, []);

    // Setea el nombre del cliente cada vez que se selecciona un código de cliente
    useEffect(() => {

        if (confPlantaCliente.CodigoCliente != 0) {
            const clienteSeleccionado = clientes.filter(cliente => cliente.codigo === confPlantaCliente.CodigoCliente)[0];
            setConfPlantaCliente({
                ...confPlantaCliente,
                NombreCliente: clienteSeleccionado.razonSocial
            });
        }

    }, [confPlantaCliente.CodigoCliente]);

    // Convierte los datos del diagrama en un string para almacenar en la base de datos
    useEffect(() => {

        const datosDiagrama = {
            nodos,
            lados
        }

        setConfPlantaCliente({
            ...confPlantaCliente,
            Diagrama: JSON.stringify(datosDiagrama)
        });

    }, [nodos, lados]);

    // Efecto que oculta el mensaje pasados unos segundos
    useEffect(() => {

        if (snackData.open) {

            setTimeout(() => {
                document.getElementById('snack').classList.add('animate__flipOutX');
            }, 2000);

            setTimeout(() => {
                setSnackData(prevSnackData => ({ ...prevSnackData, open: false }));
                document.getElementById('snack').classList.remove('animate__flipOutX');
            }, 2800);

        }

    }, [snackData.open]);

    // Acemos una petición automáticamente para saber si existe la planta o no
    useEffect(() => {

        getConfPlantaClientePorClienteOferta(confPlantaCliente.CodigoCliente, confPlantaCliente.Oferta)
            .then(res => {
                if (res == null) {
                    setCrearPlanta(true);
                } else {
                    setCrearPlanta(false);
                    setConfPlantaCliente(prev => ({ ...prev, NumNiveles: res.numNiveles.toString() }));
                }

            });

    }, [confPlantaCliente.CodigoCliente, confPlantaCliente.Oferta]);

    // Actualizamos el contador (por si se crean mas elementos)
    useEffect(() => {

        let contadorLocal = {};

        // Solo generamos el contador si no existe ninguno
        if (Object.entries(contadorElemento).length === 0) {

            elementosPlanta.map(elemento => {

                const texto = elemento.nombre;

                if (contadorLocal[texto]) {
                    contadorLocal = {
                        ...contadorLocal,
                        [texto]: contadorLocal[texto] + 1
                    }
                } else {
                    contadorLocal = {
                        ...contadorLocal,
                        [texto]: 1
                    }
                }

            });

            setContadorElemento({ ...contadorLocal });

        }

    }, [elementosPlanta]);

    // FUNCIONES

    const handleCrearCargarPlanta = async () => {

        let numNivelesInt = 0;

        // Comprobamos el valor del número de niveles
        if (confPlantaCliente.NumNiveles === '') {
            numNivelesInt = 0;
        } else {
            numNivelesInt = parseInt(confPlantaCliente.NumNiveles, 10);
        }

        // Comprobamos para que no hayan errores
        if (numNivelesInt > 5) {

            // Avisamos al usuario
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Error',
                text: 'El número máximo de niveles que se pueden crear son 5',
                showConfirmButton: false,
                timer: 2000,
                showClass: {
                    popup: 'animate__animated animate__bounceIn'
                },
                hideClass: {
                    popup: 'animate__animated animate__bounceOut'
                }
            });
            return;



        } else if (confPlantaCliente.CodigoCliente == null || confPlantaCliente.Oferta == null || numNivelesInt <= 0 || numNivelesInt == null) {

            // Avisamos al usuario
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Error',
                text: 'Faltan introducir datos correctos para crear los niveles',
                showConfirmButton: false,
                timer: 2000,
                showClass: {
                    popup: 'animate__animated animate__bounceIn'
                },
                hideClass: {
                    popup: 'animate__animated animate__bounceOut'
                }
            });
            return;

        } else {

            // Comprobamos si se debe crear o cargar la planta
            if (crearPlanta) {

                // Petición para crear la planta
                const resp = await postConfPlantaCliente({ ...confPlantaCliente, NumNiveles: numNivelesInt });
                setConfPlantaCliente(prevState => ({ ...prevState, Id: resp.id }));

                // Indicamos que la planta ha sido creada
                setPlantaCreada(true);

                // Generamos los niveles según lo indicado por el usuario
                for (let i = 0; i < confPlantaCliente.NumNiveles; i++) {
                    setNiveles(prevState => [...prevState, i + 1]);
                }

            } else {

                // Obtener los datos de la planta
                const respPlanta = await getConfPlantaClientePorClienteOferta(confPlantaCliente.CodigoCliente, confPlantaCliente.Oferta);

                if (respPlanta) {
                    setEstadoEliminarPlanta(true)
                }

                const datosDiagrama = JSON.parse(respPlanta.diagrama);
                setNodos2(datosDiagrama.nodos)
                setLados2(datosDiagrama.lados)

                // Actualizamos los datos de la planta
                setConfPlantaCliente(prevState => ({ ...prevState, Id: respPlanta.id, NumNiveles: respPlanta.numNiveles, Diagrama: respPlanta.diagrama }));
                setPlantaCreada(true);

                // Generamos los niveles según lo indicado por el usuario
                for (let i = 0; i < respPlanta.numNiveles; i++) {
                    setNiveles(prevState => [...prevState, i + 1]);
                }

                // Obtenemos todos los niveles
                const respNiveles = await getConfNivelesPlantasClientePorPlanta(respPlanta.id)
                setConfNivelesPlantaCliente(respNiveles);

                // Obtenemos todos los registros de analisis - elemento (nivel)
                const respAnalisis = await getAnalisisNivelesPlantasCliente();

                let niveles = [];

                // Recorremos cada nivel para obtener los datos del elemento
                const nivelesPromise = await Promise.all(
                    respNiveles.map(async (nivel) => {

                        // Obtenemos los datos del elemento
                        const resp = await getElementoPorId(nivel.id_Elemento);

                        // Obtenemos los analisis por este elemento
                        const analisisFiltro = respAnalisis.filter(anali => anali.id_NivelesPlanta === nivel.id)

                        // Preparamos el objeto de analisis
                        let analisisObjeto = {}

                        // Recorremos la lista de analisis para crear un objeto coherente
                        analisisFiltro.map(an => {

                            // Evaluamos si este elemento está desmarcado (para no añadirlo al objeto)
                            if (!an.deleted) {

                                // Preparamos el nombre del analisis
                                const nombreAnalisis = camelCase(analisis.filter(anali => anali.id === an.id_Analisis)[0].nombre);

                                // Añadimos el análisis al objeto
                                analisisObjeto = { ...analisisObjeto, [nombreAnalisis]: true };

                            }

                        });

                        // Creamos el objecto con los datos
                        if (resp != null) {

                            niveles.push({
                                id: resp.id,
                                nivel: nivel.nivel,
                                nombre: resp.nombre,
                                numero: resp.numero,
                                analisis: analisisObjeto
                            });

                        }

                    })
                );

                // Añadimos el elemento al estado
                setElementosPlanta([...niveles]);

            }

        }

    }

    const handleConfPlantaClienteChange = (event) => {

        switch (event.target.tagName) {

            case 'LI':

                const name = event.target.id.split('-')[0];
                setConfPlantaCliente({
                    ...confPlantaCliente,
                    [name]: parseInt(event.target.textContent, 10)
                });

                break;

            case 'INPUT':

                setConfPlantaCliente({
                    ...confPlantaCliente,
                    [event.target.name]: event.target.value
                });

                break;

            default:
                break;

        }

    }

    const handleAnalisis = (event) => {

        setElementoSeleccionado({
            ...elementoSeleccionado,
            analisis: {
                ...elementoSeleccionado.analisis,
                [event.target.name]: event.target.checked
            }
        });

    }

    const handleSeleccionarElemento = (elemento) => {
        setElementoSeleccionado(elemento);
    }

    const handleGuardarAnalisisElemento = () => {

        const elementosActualizados = elementosPlanta.map(elemento => {

            if (elemento.id === elementoSeleccionado.id) {
                return { ...elemento, analisis: { ...elementoSeleccionado.analisis } }
            } else {
                return elemento
            }

        });

        setElementosPlanta(elementosActualizados);
        setSnackData({ open: true, msg: 'Analisis del elemento guardado correctamente', severity: 'success' });

    }

    const handleSnackClose = (event, reason) => {

        if (reason === 'clickaway') {
            return;
        }

        setSnackData({ open: false, msg: '', severity: 'info' });

    };

    const handleGuardarDatos = async () => {

        let niveles = [];

        // Guardamos los datos de la planta
        await putConfPlantaCliente({ ...confPlantaCliente, NumNiveles: parseInt(confPlantaCliente.NumNiveles, 10) });

        // Guardamos los registros de los elementos de la planta para obtener sus IDs
        let elementosActualizados = [];

        await Promise.all(elementosPlanta.map(async (elemento) => {

            let idElementoActualizado = 0;

            // Preparamos los datos a enviar a la base de datos
            let postElemento = {
                nombre: elemento.nombre,
                numero: elemento.numero
            }

            // Guardamos los registros de los niveles y elementos relacionados al nivel
            // Preparamos los datos a enviar a la base de datos
            let postNivelesPlanta = {
                codigoCliente: confPlantaCliente.CodigoCliente,
                oferta: confPlantaCliente.Oferta,
                id_Planta: confPlantaCliente.Id,
                nivel: elemento.nivel,
                visible: true,
                conecta: null,
            }

            // Realizamos la petición según si tiene id o no y obtenemos el ID
            if (elemento.id > 0) {

                // El elemento ya existe. Añadimos ID y actualizamos
                postElemento = {
                    ...postElemento,
                    id: elemento.id
                }

                // Hacemos un PUT
                await putElementos(postElemento);

                // Añadimos el elemento al listado
                elementosActualizados.push({ ...postElemento, id: elemento.id, nivel: elemento.nivel, analisis: elemento.analisis });
                idElementoActualizado = elemento.id;

                // Añadimos el ID del elemento al registro del nivel
                postNivelesPlanta = {
                    ...postNivelesPlanta,
                    id_Elemento: elemento.id,
                }

            } else {

                // El elemento no existe. Hacemos POST
                const respElemento = await postElementos(postElemento);

                // Añadimos el elemento al listado
                elementosActualizados.push({ ...postElemento, id: respElemento.id, nivel: elemento.nivel, analisis: elemento.analisis });
                idElementoActualizado = respElemento.id;

                // Añadimos el ID del elemento al registro del nivel
                postNivelesPlanta = {
                    ...postNivelesPlanta,
                    id_Elemento: respElemento.id,
                }

            }

            // Filtramos la lista de niveles para comprobar si existe un registro
            const registroNivel = confNivelesPlantaCliente.filter(nivel => nivel.id_Elemento === elemento.id);

            // Si existe un registro, añadimos su ID para actualizar
            if (registroNivel.length > 0) {

                postNivelesPlanta = {
                    ...postNivelesPlanta,
                    id: registroNivel[0].id
                }


                // Hacemos la petición PUT
                await putConfNivelesPlantasCliente(postNivelesPlanta);
                niveles.push(postNivelesPlanta);

            } else {

                // El registro no existe. Realizamos un POST y obtenemos el ID
                const respNiveles = await postConfNivelesPlantasCliente(postNivelesPlanta);
                niveles.push(respNiveles);

            }

            // Comprobamos si el elemento tiene analisis
            if (elemento.analisis) {

                // Obtenemos el id del nivel de la planta relacionada al elemento y obtenemos sus registros
                const idNivelPlanta = niveles.filter(nivel => nivel.id_Elemento === idElementoActualizado)[0].id;
                const respNivelesAnalisis = await getAnalisisNivelesPlantasClientePorIdNivel(idNivelPlanta);

                // Recorremos los parametros del objeto de analisis
                for (const anali in elemento.analisis) {

                    // Obtenemos el ID del análisis y nivel
                    const idAnalisis = analisis.filter(analisis => camelCase(analisis.nombre) === anali)[0].id;

                    // Comprobamos si el registro existe en la base de datos
                    const registros = respNivelesAnalisis.filter(nivel => nivel.id_Analisis === idAnalisis);

                    if (registros.length > 0) {

                        // Preparamos el cuerpo de la petición
                        let putAnalisis = {
                            Id: registros[0].id,
                            Id_NivelesPlanta: idNivelPlanta,
                            Id_Analisis: idAnalisis
                        }

                        // El registro existe en BD. Debemos hacer una actualización
                        if (elemento.analisis[anali]) {

                            // El analisis está marcado como Actido. Aplicamos cambios sobre el registro
                            putAnalisis = { ...putAnalisis, deleted: null }

                        } else {

                            // El analisis está marcado como Desactivado. Aplicamos cambios sobre el registro
                            putAnalisis = { ...putAnalisis, deleted: true }

                        }

                        // Finalmente, realizamos la petición PUT
                        const respAnalisis = await putAnalisisNivelesPlantasCliente(putAnalisis);

                    } else {

                        // El registro no existe en la BD. Creamos el registro
                        if (elemento.analisis[anali]) {

                            // Preparamos el cuerpo de la petición
                            const postAnalisis = {
                                Id_NivelesPlanta: idNivelPlanta,
                                Id_Analisis: idAnalisis
                            }

                            // Añadimos a la base de datos los analisis activados
                            const respAnalisis = await postAnalisisNivelesPlantasCliente(postAnalisis);

                        }
                    }
                }
            }

        }));

        // Una vez terminado el mapeo, seteamos el estado con los IDs nuevos
        setElementosPlanta(elementosActualizados);
        setConfNivelesPlantaCliente(niveles)
        setDatosGuardados(true);

        // Avisamos al usuario
        Swal.fire({
            position: 'center',
            icon: 'info',
            title: 'Planta guardada',
            text: `Los datos de la planta ${confPlantaCliente.NombreCliente} han sido guardados`,
            showConfirmButton: false,
            timer: 2000,
            showClass: {
                popup: 'animate__animated animate__bounceIn'
            },
            hideClass: {
                popup: 'animate__animated animate__bounceOut'
            }
        });

    };

    const handleGuardarDiagrama = async () => {

        // Guardamos los datos de la planta
        await putConfPlantaCliente({ ...confPlantaCliente, NumNiveles: parseInt(confPlantaCliente.NumNiveles, 10) });
        setDiagramaGuardado(true);

        // Avisamos al usuario
        Swal.fire({
            position: 'center',
            icon: 'info',
            title: 'Diagrama guardado',
            text: `Los datos del diagrama de la planta ${confPlantaCliente.NombreCliente} han sido guardados`,
            showConfirmButton: false,
            timer: 2000,
            showClass: {
                popup: 'animate__animated animate__bounceIn'
            },
            hideClass: {
                popup: 'animate__animated animate__bounceOut'
            }
        });

    };

    const eliminarPlanta = async (id) => {

        const respAnalisis = await getAnalisisNivelesPlantasCliente();

        const respElementos = await getElementosPlanta();

        confNivelesPlantaCliente.map(async (nivel) => {

            const resp2 = await deleteConfNivelesPlantasCliente(nivel.id);

            const analisisFiltro = respAnalisis.filter(anali => anali.id_NivelesPlanta === nivel.id)

            analisisFiltro.map(async (an) => {

                const resp = await deleteAnalisisNivelesPlantasCliente(an.id);
            })

            const elementoFiltro = respElementos.filter(elem => elem.id === nivel.id_Elemento)

            elementoFiltro.map(async (el) => {

                const resp = await deleteElementosPlanta(el.id);

            })

        })

        const resp = await deleteConfPlantaCliente(id);

        if (resp) {
            // Avisamos al usuario
            Swal.fire({
                position: 'center',
                icon: 'info',
                title: 'Planta eliminada',
                text: `Los datos de la planta de ${confPlantaCliente.NombreCliente} han sido eliminados`,
                showConfirmButton: false,
                timer: 2000,
                showClass: {
                    popup: 'animate__animated animate__bounceIn'
                },
                hideClass: {
                    popup: 'animate__animated animate__bounceOut'
                }
            });

            setTimeout(() => {
                window.location.reload();
            }, 2000)

        } else {
            // Avisamos al usuario
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Error borrado planta',
                text: `Fallo al borrar la planta de  ${confPlantaCliente.NombreCliente}`,
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
        <>
            {usuarioActual.idPerfil === 1 ?
                <MainLayout title="Plantas">

                    <Grid container spacing={2}>

                        {/* APARTADO DE DATOS DE PLANTA */}
                        <Grid item xs={12}>
                            <Card sx={{ p: 2, display: 'flex' }}>
                                <Grid container spacing={2} sx={{ alignItems: 'center' }}>

                                    {/* Código de Cliente */}
                                    <Grid item xs={4}>
                                        <Autocomplete
                                            disabled={plantaCreada}
                                            disableClearable={true}
                                            id="CodigoCliente"
                                            options={clientes}
                                            getOptionLabel={option => option.codigo.toString()}
                                            renderInput={params => <TextField {...params} variant="outlined" type="number" label="Código de Cliente" name="CodigoCliente" />}
                                            onChange={handleConfPlantaClienteChange}
                                        />
                                    </Grid>

                                    {/* Número de Oferta */}
                                    <Grid item xs={4}>
                                        <Autocomplete
                                            disabled={plantaCreada}
                                            disableClearable={true}
                                            id="Oferta"
                                            options={ofertas}
                                            filterOptions={options => ofertas.filter(oferta => oferta.codigoCliente === confPlantaCliente.CodigoCliente)}
                                            getOptionLabel={option => option.numeroOferta.toString()}
                                            renderInput={params => <TextField {...params} variant="outlined" type="number" label="Número de Oferta" name="Oferta" />}
                                            onChange={handleConfPlantaClienteChange}
                                        />
                                    </Grid>

                                    {/* Número de niveles */}
                                    <Grid item xs={2}>
                                        <TextField disabled={!crearPlanta || plantaCreada} sx={{ width: '100%' }} variant="outlined" label="Nº de niveles" name="NumNiveles" onChange={handleConfPlantaClienteChange} value={confPlantaCliente.NumNiveles} />
                                    </Grid>

                                    {/* Botón para crear */}
                                    <Grid item xs={2}>
                                        {
                                            crearPlanta
                                                ? (
                                                    <Button
                                                        disabled={plantaCreada}
                                                        sx={{ width: '100%' }}
                                                        color='success'
                                                        variant='contained'
                                                        startIcon={<AddIcon />}
                                                        onClick={handleCrearCargarPlanta}
                                                    >
                                                        Crear
                                                    </Button>
                                                ) : (
                                                    <Button
                                                        disabled={plantaCreada}
                                                        sx={{ width: '100%' }}
                                                        color='success'
                                                        variant='contained'
                                                        startIcon={<DownloadIcon />}
                                                        onClick={handleCrearCargarPlanta}
                                                    >
                                                        Cargar
                                                    </Button>
                                                )
                                        }
                                    </Grid>

                                </Grid>
                            </Card>
                        </Grid>

                        {/* APARTADO DE NIVELES */}
                        <Grid item xs={12}>
                            <Grid container spacing={2}>
                                {
                                    niveles.map(nivel => (
                                        <NivelPlanta
                                            key={nivel}
                                            nivel={nivel}
                                            contadorElemento={contadorElemento}
                                            setContadorElemento={setContadorElemento}
                                            elementosPlanta={elementosPlanta}
                                            setElementosPlanta={setElementosPlanta}
                                            indiceElemento={indiceElemento}
                                            setIndiceElemento={setIndiceElemento}
                                            confNivelesPlantaCliente={confNivelesPlantaCliente}
                                        />
                                    ))
                                }
                            </Grid>
                        </Grid>

                        {/* APARTADO DE LISTADO DE ELEMENTOS */}
                        <Grid item xs={4}>
                            <Card sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>

                                <Typography variant="h6" sx={{ width: '100%' }}>Listado de elementos</Typography>
                                {
                                    (elementosPlanta.length > 0)
                                        ? (
                                            <List>
                                                {
                                                    elementosPlanta.map(elemento => (
                                                        <ListItemButton
                                                            key={elemento.id}
                                                            selected={elementoSeleccionado.id === elemento.id}
                                                            onClick={() => handleSeleccionarElemento(elemento)}
                                                        >
                                                            <ListItemText primary={elemento.nombre + ' ' + elemento.numero} />
                                                        </ListItemButton>
                                                    ))
                                                }
                                            </List>
                                        ) : (
                                            <Typography>Ningún elemento añadido</Typography>
                                        )
                                }

                            </Card>
                        </Grid>

                        {/* APARTADO DE ANALISIS POR ELEMENTO */}
                        <Grid item xs={8}>
                            <Card sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>

                                <Grid container sx={{ justifyContent: 'space-between', alignItems: 'center', pb: 2 }}>

                                    <Grid item>
                                        <Typography variant="h6" sx={{ width: '100%' }}>Analisis por elemento</Typography>
                                    </Grid>

                                    <Grid item>
                                        <Tooltip title="Guardar analisis del elemento seleccionado" placement="left">
                                            <Button color="primary" startIcon={<SaveIcon />} variant="outlined" onClick={handleGuardarAnalisisElemento}>
                                                Guardar
                                            </Button>
                                        </Tooltip>
                                    </Grid>

                                </Grid>

                                {/* Mensaje de feedback al guardar tipos de analisis del elemento */}
                                <Grid container>
                                    <Grid item xs={12}>
                                        <Alert id="snack" className="animate__animated animate__flipInX" onClose={handleSnackClose} severity={snackData.severity} sx={{
                                            width: '100%',
                                            display: snackData.open ? 'flex' : 'none'
                                        }}>
                                            {snackData.msg}
                                        </Alert>
                                    </Grid>
                                </Grid>

                                {/* Listado de checkboxs para marcar los analisis */}
                                <Grid container spacing={2}>
                                    {/* <FormGroup> */}
                                    {
                                        analisis.map(analisis => (
                                            <Grid item xs={6} key={analisis.id}>
                                                <CheckBoxAnalisis
                                                    label={analisis.nombre}
                                                    name={camelCase(analisis.nombre)}
                                                    onChange={handleAnalisis}
                                                    elementoSeleccionado={elementoSeleccionado}
                                                    elementosPlanta={elementosPlanta}
                                                    usuarioActual={usuarioActual}
                                                />
                                            </Grid>
                                        )
                                        )
                                    }
                                    {/* </FormGroup> */}
                                </Grid>

                            </Card>
                        </Grid>

                        {/* BOTONES DE ACCIONES */}
                        <Grid item xs={12}>
                            <Card sx={{ p: 2, display: 'flex', justifyContent: 'flex-end' }}>
                                <Button
                                    disabled={!estadoEliminarPlanta}
                                    color='error'
                                    variant='contained'
                                    startIcon={<DeleteIcon />}
                                    onClick={() => eliminarPlanta(confPlantaCliente.Id)}
                                >
                                    Eliminar Planta
                                </Button>
                                <Button
                                    sx={{ ml: 2 }}
                                    disabled={!plantaCreada}
                                    color='success'
                                    variant='contained'
                                    startIcon={<SaveIcon />}
                                    onClick={handleGuardarDatos}
                                >
                                    Guardar datos
                                </Button>

                                <Button
                                    sx={{ ml: 2 }}
                                    color='primary'
                                    variant='contained'
                                    startIcon={<AccountTreeIcon />}
                                    disabled={!datosGuardados || diagramaGenerado}
                                    onClick={() => generarDiagrama(confPlantaCliente.NumNiveles, elementosPlanta, setNodos2, setLados2)}>
                                    Generar diagrama
                                </Button>

                                <Button
                                    sx={{ ml: 2 }}
                                    color='success'
                                    variant='contained'
                                    startIcon={<AccountTreeIcon />}
                                    disabled={!datosGuardados || !diagramaGenerado}
                                    onClick={handleGuardarDiagrama}>
                                    Guardar diagrama
                                </Button>

                                {estadoEliminarPlanta ?
                                    <Button
                                        sx={{ ml: 2 }}
                                        color='primary'
                                        variant='contained'
                                        endIcon={<NavigateNextIcon />}
                                        onClick={() => { navigate('/plantasTabla'); }}>
                                        Siguiente
                                    </Button>
                                    :
                                    <Button
                                        sx={{ ml: 2 }}
                                        color='primary'
                                        variant='contained'
                                        endIcon={<NavigateNextIcon />}
                                        disabled={!diagramaGuardado}
                                        onClick={() => { navigate('/plantasTabla'); }}>
                                        Siguiente
                                    </Button>
                                }
                            </Card>
                        </Grid>

                        {/* APARTADO DE DIAGRAMA */}
                        <Grid item xs={12}>
                            <Card sx={{ p: 2, height: '800px', display: 'flex', flexDirection: 'column' }}>

                                <Typography variant="h6">Diagrama de la planta</Typography>
                                {nodos2.length > 0 ?
                                    <ReactFlow
                                        nodes={nodos2}
                                        edges={lados2}
                                        onEdgesChange={onEdgesChange}
                                        onConnect={onConnect}
                                        nodeTypes={nodeTypes}
                                        fitView
                                    >
                                        <Background />
                                    </ReactFlow> :
                                    <ReactFlow
                                        nodes={nodos}
                                        edges={lados}
                                        onEdgesChange={onEdgesChange}
                                        onConnect={onConnect}
                                        nodeTypes={nodeTypes}
                                        fitView
                                    >
                                        <Background />
                                    </ReactFlow>
                                }
                            </Card>
                        </Grid>

                    </Grid>

                </MainLayout>
                :
                <MainLayout title="Plantas">

                    <Grid container spacing={2}>

                        {/* APARTADO DE DATOS DE PLANTA */}
                        <Grid item xs={12}>
                            <Card sx={{ p: 2, display: 'flex' }}>
                                <Grid container spacing={2} sx={{ alignItems: 'center' }}>

                                    {/* Código de Cliente */}
                                    <Grid item xs={4}>
                                        <Autocomplete
                                            disabled={plantaCreada}
                                            disableClearable={true}
                                            id="CodigoCliente"
                                            options={clientes}
                                            getOptionLabel={option => option.codigo.toString()}
                                            renderInput={params => <TextField {...params} variant="outlined" type="number" label="Código de Cliente" name="CodigoCliente" />}
                                            onChange={handleConfPlantaClienteChange}
                                        />
                                    </Grid>

                                    {/* Número de Oferta */}
                                    <Grid item xs={4}>
                                        <Autocomplete
                                            disabled={plantaCreada}
                                            disableClearable={true}
                                            id="Oferta"
                                            options={ofertas}
                                            filterOptions={options => ofertas.filter(oferta => oferta.codigoCliente === confPlantaCliente.CodigoCliente)}
                                            getOptionLabel={option => option.numeroOferta.toString()}
                                            renderInput={params => <TextField {...params} variant="outlined" type="number" label="Número de Oferta" name="Oferta" />}
                                            onChange={handleConfPlantaClienteChange}
                                        />
                                    </Grid>

                                    {/* Número de niveles */}
                                    <Grid item xs={2}>
                                        <TextField disabled={!crearPlanta || plantaCreada} sx={{ width: '100%' }} variant="outlined" label="Nº de niveles" name="NumNiveles" onChange={handleConfPlantaClienteChange} value={confPlantaCliente.NumNiveles} />
                                    </Grid>

                                    {/* Botón para crear */}
                                    <Grid item xs={2}>
                                        {
                                            crearPlanta
                                                ? (
                                                    <Button
                                                        disabled
                                                        sx={{ width: '100%' }}
                                                        color='success'
                                                        variant='contained'
                                                        startIcon={<AddIcon />}
                                                        onClick={handleCrearCargarPlanta}
                                                    >
                                                        Crear
                                                    </Button>
                                                ) : (
                                                    <Button
                                                        disabled={plantaCreada}
                                                        sx={{ width: '100%' }}
                                                        color='success'
                                                        variant='contained'
                                                        startIcon={<DownloadIcon />}
                                                        onClick={handleCrearCargarPlanta}
                                                    >
                                                        Cargar
                                                    </Button>
                                                )
                                        }
                                    </Grid>

                                </Grid>
                            </Card>
                        </Grid>

                        {/* APARTADO DE NIVELES */}
                        <Grid item xs={12}>
                            <Grid container spacing={2}>
                                {
                                    niveles.map(nivel => (
                                        <NivelPlanta
                                            key={nivel}
                                            nivel={nivel}
                                            contadorElemento={contadorElemento}
                                            setContadorElemento={setContadorElemento}
                                            elementosPlanta={elementosPlanta}
                                            setElementosPlanta={setElementosPlanta}
                                            indiceElemento={indiceElemento}
                                            setIndiceElemento={setIndiceElemento}
                                        />
                                    ))
                                }
                            </Grid>
                        </Grid>

                        {/* APARTADO DE LISTADO DE ELEMENTOS */}
                        <Grid item xs={4}>
                            <Card sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>

                                <Typography variant="h6" sx={{ width: '100%' }}>Listado de elementos</Typography>
                                {
                                    (elementosPlanta.length > 0)
                                        ? (
                                            <List>
                                                {
                                                    elementosPlanta.map(elemento => (
                                                        <ListItemButton
                                                            key={elemento.id}
                                                            selected={elementoSeleccionado.id === elemento.id}
                                                            onClick={() => handleSeleccionarElemento(elemento)}
                                                        >
                                                            <ListItemText primary={elemento.nombre + ' ' + elemento.numero} />
                                                        </ListItemButton>
                                                    ))
                                                }
                                            </List>
                                        ) : (
                                            <Typography>Ningún elemento añadido</Typography>
                                        )
                                }

                            </Card>
                        </Grid>

                        {/* APARTADO DE ANALISIS POR ELEMENTO */}
                        <Grid item xs={8}>
                            <Card sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>

                                <Grid container sx={{ justifyContent: 'space-between', alignItems: 'center', pb: 2 }}>

                                    <Grid item>
                                        <Typography variant="h6" sx={{ width: '100%' }}>Analisis por elemento</Typography>
                                    </Grid>

                                    <Grid item>
                                        <Tooltip title="Guardar analisis del elemento seleccionado" placement="left">
                                            <Button color="primary" disabled startIcon={<SaveIcon />} variant="outlined" onClick={handleGuardarAnalisisElemento}>
                                                Guardar
                                            </Button>
                                        </Tooltip>
                                    </Grid>

                                </Grid>

                                {/* Mensaje de feedback al guardar tipos de analisis del elemento */}
                                <Grid container>
                                    <Grid item xs={12}>
                                        <Alert id="snack" className="animate__animated animate__flipInX" onClose={handleSnackClose} severity={snackData.severity} sx={{
                                            width: '100%',
                                            display: snackData.open ? 'flex' : 'none'
                                        }}>
                                            {snackData.msg}
                                        </Alert>
                                    </Grid>
                                </Grid>

                                {/* Listado de checkboxs para marcar los analisis */}
                                <Grid container spacing={2}>
                                    {/* <FormGroup> */}
                                    {
                                        analisis.map(analisis => (
                                            <Grid item xs={6} key={analisis.id}>
                                                <CheckBoxAnalisis
                                                    label={analisis.nombre}
                                                    usuarioActual={usuarioActual}
                                                    name={camelCase(analisis.nombre)}
                                                    onChange={handleAnalisis}
                                                    elementoSeleccionado={elementoSeleccionado}
                                                    elementosPlanta={elementosPlanta}
                                                />
                                            </Grid>
                                        )
                                        )
                                    }
                                    {/* </FormGroup> */}
                                </Grid>

                            </Card>
                        </Grid>

                        {/* BOTONES DE ACCIONES */}
                        {/* <Grid item xs={12}>
                            <Card sx={{ p: 2, display: 'flex', justifyContent: 'flex-end' }}>
                                <Button
                                    disabled={!estadoEliminarPlanta}
                                    color='error'
                                    variant='contained'
                                    startIcon={<DeleteIcon />}
                                    onClick={() => eliminarPlanta(confPlantaCliente.Id)}
                                >
                                    Eliminar Planta
                                </Button>
                                <Button
                                    sx={{ ml: 2 }}
                                    disabled={!plantaCreada}
                                    color='success'
                                    variant='contained'
                                    startIcon={<SaveIcon />}
                                    onClick={handleGuardarDatos}
                                >
                                    Guardar datos
                                </Button>

                                <Button
                                    sx={{ ml: 2 }}
                                    color='primary'
                                    variant='contained'
                                    startIcon={<AccountTreeIcon />}
                                    disabled={!datosGuardados || diagramaGenerado}
                                    onClick={() => generarDiagrama(confPlantaCliente.NumNiveles, elementosPlanta, setNodos2, setLados2)}>
                                    Generar diagrama
                                </Button>

                                <Button
                                    sx={{ ml: 2 }}
                                    color='success'
                                    variant='contained'
                                    startIcon={<AccountTreeIcon />}
                                    disabled={!datosGuardados || !diagramaGenerado}
                                    onClick={handleGuardarDiagrama}>
                                    Guardar diagrama
                                </Button>

                                <Button
                                    sx={{ ml: 2 }}
                                    color='primary'
                                    variant='contained'
                                    endIcon={<NavigateNextIcon />}
                                    disabled={!diagramaGuardado}
                                    onClick={() => { navigate('/plantasTabla', { state: { codigoCliente: confPlantaCliente.CodigoCliente, codigoOferta: confPlantaCliente.Oferta }, replace: true }); }}>
                                    Siguiente
                                </Button>

                            </Card>
                        </Grid> */}

                        {/* APARTADO DE DIAGRAMA */}
                        <Grid item xs={12}>
                            <Card sx={{ p: 2, height: '800px', display: 'flex', flexDirection: 'column' }}>

                                <Typography variant="h6">Diagrama de la planta</Typography>
                                {nodos2.length > 0 ?
                                    <ReactFlow
                                        nodes={nodos2}
                                        edges={lados2}
                                        onEdgesChange={onEdgesChange}
                                        onConnect={onConnect}
                                        nodeTypes={nodeTypes}
                                        fitView
                                    >
                                        <Background />
                                    </ReactFlow> :
                                    <ReactFlow
                                        nodes={nodos}
                                        edges={lados}
                                        onEdgesChange={onEdgesChange}
                                        onConnect={onConnect}
                                        nodeTypes={nodeTypes}
                                        fitView
                                    >
                                        <Background />
                                    </ReactFlow>
                                }
                            </Card>
                        </Grid>

                    </Grid>

                </MainLayout>
            }
        </>

    )

}