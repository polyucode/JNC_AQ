import React, { useContext, useEffect, useState } from 'react';
//import { Grid, Card, CardContent, TextField, Typography, Autocomplete, Chip, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, IconButton, Tooltip } from '@mui/material';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Tab, Tabs, Card, CardContent, TextField, Typography, Autocomplete, Chip, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, IconButton, Tooltip } from '@mui/material';

import {
    Chart,
    ChartSeries,
    ChartSeriesItem,
    ChartCategoryAxis,
    ChartCategoryAxisItem,
} from "@progress/kendo-react-charts";
import "hammerjs";

import '@progress/kendo-theme-default/dist/all.css';
import { bajarPdf, getUsuarios, getFicheros, getAnalisis, getClientes, getConfPlantaClientePorClienteOferta, getOfertas, getParametros, getParametrosAnalisisPlanta, getTareas, getValorParametros, bajarPdfNoFQ, bajarPdfDashBoard } from '../api';
import { AuthContext } from '../context/AuthContext';
import { useDiagrama } from '../helpers/generarDiagrama';
import ReactFlow, { Background } from 'react-flow-renderer';
import { DashboardContext } from '../context/DashboardContext';
import TimelineIcon from '@mui/icons-material/Timeline';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import RemoveIcon from '@mui/icons-material/Remove';

//Icono para incidencias
import ErrorIcon from '@mui/icons-material/Error';
//Icono para descargar PDF
import DownloadPDF_Icon from '@mui/icons-material/FileDownload';
//Iconos para sumar / restar contador año para Calendario Tareas
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
//Icono para subir al principio de la pagina
import OpenInBrowserIcon from '@mui/icons-material/OpenInBrowser';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { isNull } from 'lodash';

//David pestanyes
const TabPanel = ({ children, value, index }) => {
    return (
        <div role="tabpanel" hidden={value !== index}>
            {value === index && <div>{children}</div>}
        </div>
    );
};
//David pestanyes


const HomeCliente = () => {
  
    // Guardado de datos
    const [clientes, setClientes] = useState([]);
    const [ofertas, setOfertas] = useState([]);
    const [parametros, setParametros] = useState([]);
    const [tareas, setTareas] = useState([]);
    const [analisis, setAnalisis] = useState([]);
    const [parametrosAnalisis, setParametrosAnalisis] = useState([]);
    const [tareasFiltradas, setTareasFiltradas] = useState([]);
    const [parametrosAnalisisFiltrados, setParametrosAnalisisFiltrados] = useState([]);
    const [plantaActiva, setPlantaActiva] = useState({});

    // David
    // ficherosAnalisis hace peticion get y devuelve todos los registros de las tabla GES_Ficheros
    const [ficherosAll, setFicheros] = useState([]);

    // operarios hace peticion get y devuelve todos los usuarios de la tabla SYS_Usuarios
    const [operarios, setOperarios] = useState([]);

    //parametrosIncidencias son solo los parametrosAnalisisFiltrados donde el campo Observaciones tiene contenido
    const [parametrosIncidencias, setIncidencias] = useState([]); //parametrosIncidencias son solo los parametrosAnalisisFiltrados donde el campo Observaciones tiene contenido
    const [parametrosPDF, setPDF_Analisis] = useState([]); //parametrosPDF son solo los parametrosAnalisisFiltrados donde el campo pdf es <> 0 o diferente null
    //// David

    const [clienteSeleccionado, setClienteSeleccionado] = useState({
        id: 0,
        codigoCliente: 0,
        oferta: 0
    })

    // Variables para el diagrama
    const [nodos, setNodos] = useState([]);
    const [lados, setLados] = useState([]);
    const { nodeTypesDashboard } = useDiagrama();

    // Variables de contexto
    const { user } = useContext(AuthContext);
    const { elementoActivo, parametroActivo, analisisActivo, valoresParametros, analisisParametros, parametrosFiltrados, setElementoActivo, setAnalisisActivo, handleSeleccionarParametro, handleSeleccionarAnalisis } = useContext(DashboardContext);

    useEffect(() => {
        
        setElementoActivo({})
        setAnalisisActivo({})

    }, [])

    // Efecto que realiza las peticiones al cargar la página
    useEffect(() => {

        //
        getUsuarios()
            .then(resp => setOperarios(resp))

        getFicheros()
            .then(resp => setFicheros(resp))

        getClientes()
            .then(resp => setClientes(resp));

        getOfertas()
            .then(resp => setOfertas(resp));

        getParametros()
            .then(resp => setParametros(resp));

        getTareas()
            .then(resp => setTareas(resp));

        getAnalisis()
            .then(resp => setAnalisis(resp));

        getParametrosAnalisisPlanta()
            .then(resp => setParametrosAnalisis(resp));

        setElementoActivo({})       
        

    }, []);

    console.log(ficherosAll, "FICHEROS")

    // Efecto que carga el diagrama cada vez que se cambia de planta
    useEffect(() => {

        if (plantaActiva.diagrama) {

            const datosDiagrama = JSON.parse(plantaActiva.diagrama);

            setNodos(datosDiagrama.nodos);
            setLados(datosDiagrama.lados);

        } else {

            setNodos([]);
            setLados([]);

        }

    }, [plantaActiva]);

    // Efecto que filtra las tareas al cambiar los datos de planta activa
    useEffect(() => {
        if (plantaActiva.codigoCliente) {
            setTareasFiltradas(tareas.filter(tarea => tarea.codigoCliente === plantaActiva.codigoCliente && tarea.oferta === plantaActiva.oferta && parseInt(tarea.elemento, 10) === elementoActivo.id));
        }

        if (elementoActivo.nombre) {
            const scroll = document.getElementById("scroll");
            scroll.scrollIntoView({ behavior: "smooth" });   
        }

        setIncidencias(parametrosFiltrados.filter(inc => inc.observaciones !== ""));

        //Aqui filtramos los prametrosAnalisisFiltrados que tengan Observaciones
        setPDF_Analisis(parametrosFiltrados.filter(pdf => pdf.pdf !== null));


    }, [plantaActiva, elementoActivo, parametrosFiltrados ]);

    console.log(elementoActivo, "ELEMENTO ACTIVO")
    console.log(parametrosAnalisisFiltrados, "PARAMETROS ANALISIS FILTRADOS")

    const ChartContainer = () => (
        <Chart style={{ height: '500px' }}>
            <ChartCategoryAxis>
                <ChartCategoryAxisItem
                    title={{
                        text: "Meses",
                    }}
                    categories={["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]}
                />
            </ChartCategoryAxis>
            <ChartSeries>
                <ChartSeriesItem type="line" data={parametroActivo.datos} />
            </ChartSeries>
        </Chart>
    );

    // Con esta función, al seleccionar una oferta seteamos la planta activa
    const handleSeleccionOferta = (e) => {

        const ofertaSeleccionada = parseInt(e.target.textContent);

        getConfPlantaClientePorClienteOferta(clienteSeleccionado.codigoCliente, ofertaSeleccionada)
            .then(res => res ? setPlantaActiva(res) : setPlantaActiva({}));      
    }

    console.log(parametrosAnalisisFiltrados, "PARAM FILTRADOS")

    //Buscar nombre fichero tabla GES_Files segun id pdf en Analisis
    const buscaNombreFicheroPorId = (pdf) => {
        const ficheroEncontrado = ficherosAll.find(row => row.id === pdf);
        return ficheroEncontrado ? ficheroEncontrado.name : '';
    }
    //Buscar nombre fichero tabla GES_Files segun id pdf en Analisis

    //Buscar nombre operario tabla SYS_Usuarios segun id operario en Analisis
    const buscaNombreOperario = (operarioId) => {
        const operarioEncontrado = operarios.find(row => row.id === operarioId);
        return operarioEncontrado ? operarioEncontrado.nombre + ' ' + operarioEncontrado.apellidos : '';
    }
    //Buscar nombre operario tabla SYS_Usuarios segun id operario en Analisis

    //Contador para mover o simular desplazamiento año en calendario y parametros análisis, inicializando al año fecha sistema (2 Contadores)
    //Contador1 para Calendario Tareas
    const [contadorYear, setCount] = useState(new Date().getFullYear());

    const handleIncrementarContador = () => {
        setCount(contadorYear + 1);
    };

    const handleDecrementarContador = () => {
        if (contadorYear > 0) {
            setCount(contadorYear - 1);
        }
    };

    //Contador2 para Parametros del Anaálisis
    const [contadorYear2, setCount2] = useState(new Date().getFullYear());

    const handleIncrementarContador2 = () => {
        setCount2(contadorYear2 + 1);
        //Reactivamos pestaña PDF
        setActiveTab(0)
    };

    const handleDecrementarContador2 = () => {
        if (contadorYear2 > 0) {
            setCount2(contadorYear2 - 1);
            //Reactivamos pestaña PDF
            setActiveTab(0)
        }
    };
    //Contador para mover o simular desplazamiento año en calendario y parametros análisis, inicializando al año fecha sistema (2 Contadores)

    //Pestanyes David
    const [activeTab, setActiveTab] = useState(0);

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    const handleTabClick = (tabIndex, nombre, datos) => { //Activa penstaña Grafico
        setActiveTab(tabIndex)

        // { console.log("NOMBRE: ", nombre) }
        // { console.log("Datos fechas: ", datos) }
        
        handleSeleccionarParametro({ nombre: nombre, datos: datos })
    }
    //Pestanyes David

    //PopUp David per mostrar incidencia   
    const [open, setOpen] = useState(false);

    const handleOpenClosePopUp = () => {
        setOpen(!open);
    }

    const Popup = ({ open, onClose, incidencia }) => {
        return (
            <Dialog
                open={open}
                maxWidth="sm"
                fullWidth
                onClose={onClose}
            >
                <DialogTitle>Incidéncia</DialogTitle>
                <DialogContent>
                    <TextField
                        multiline
                        rows={6}
                        value={incidencia}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleOpenClosePopUp()}>CERRAR</Button>
                </DialogActions>
            </Dialog>
        );
    };
    //PopUp David per mostrar incidencia

    //Posicionar al principio página al hacer clic en botón
    const handleInicioPagina = () => {
        //posiciona la página al principio
        window.scroll(0, 0);
    }
    //Posicionar al principio página al hacer clic en botón

    //Posicionar al final página al hacer clic en botón
    const handleScrollToBottom = () => {
        window.scrollTo(0, document.body.scrollHeight);
    };
    //Posicionar al final página al hacer clic en botón


    //Ordenacion por columnas (Apartado Incidencias)
    const [ordenColumnaIncidencias, setOrdenColumnaIncidencia] = useState(null);
    const [ordenAscendenteIncidencia, setOrdenAscendenteIncidencia] = useState(true);
 
    const manejarOrdenColumnaIncidencia = (nombreColumna) => {
        if (ordenColumnaIncidencias === nombreColumna) {
            setOrdenAscendenteIncidencia(!ordenAscendenteIncidencia);
        }
        else {
            setOrdenColumnaIncidencia(nombreColumna);
            setOrdenAscendenteIncidencia(true);
        }
    };
 
    // Ordenar los datos según la columna seleccionada fecha y el orden ascendente/descendente
    const datosOrdenadosIncdencias = ordenColumnaIncidencias
        ? parametrosIncidencias.sort((a, b) => {
            const valorA = a[ordenColumnaIncidencias];
            const valorB = b[ordenColumnaIncidencias];
            if (valorA < valorB) {
                return ordenAscendenteIncidencia ? -1 : 1;
            }
            if (valorA > valorB) {
                return ordenAscendenteIncidencia ? 1 : -1;
            }
            return 0;
        })
        : parametrosIncidencias;
    //Ordenacion por columnas (Apartado Incidencias)
 
    //Ordenacion por columnas (Apartado PDF'S)
    const [ordenColumnaPDF, setOrdenColumnaPDF] = useState(null);
    const [ordenAscendentePDF, setOrdenAscendentePDF] = useState(true);
    
    const manejarOrdenColumnaPDF = (nombreColumna) => {
        if (ordenColumnaPDF === nombreColumna) {
            setOrdenAscendentePDF(!ordenAscendentePDF);
        }
        else {
            setOrdenColumnaPDF(nombreColumna);
            setOrdenAscendentePDF(true);
        }
    };
 
    // Ordenar los datos según la columna seleccionada fecha y el orden ascendente/descendente
    const datosOrdenadosPDF = ordenColumnaPDF
        ? parametrosPDF.sort((a, b) => {
            const valorA = a[ordenColumnaPDF];
            const valorB = b[ordenColumnaPDF];
            if (valorA < valorB) {
                return ordenAscendentePDF ? -1 : 1;
            }
            if (valorA > valorB) {
                return ordenAscendentePDF ? 1 : -1;
            }
            return 0;
        })
        : parametrosPDF;
    //Ordenacion por columnas (Apartado PDF'S)

    return (
        <>
            <Grid container spacing={2}>

                {/* APARTADO INICIAL, SELECCIÓN DE PLANTA */}
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Grid container sx={{ alignItems: 'center' }}>

                                <Grid item xs={6}>
                                    <Typography variant="h6">
                                        {
                                            plantaActiva.nombreCliente
                                                ? plantaActiva.nombreCliente
                                                : 'Selecciona un código de oferta'
                                        }
                                    </Typography>
                                </Grid>
                                <Grid item xs={2}>
                                    {
                                        plantaActiva.descripcion && (
                                            <Typography>{plantaActiva.descripcion}</Typography>
                                        )
                                    }
                                </Grid>
                                <Grid item xs={2}>
                                    <Autocomplete
                                        disableClearable={true}
                                        id="clientes"
                                        options={clientes}
                                        getOptionLabel={option => option.codigo}
                                        renderInput={params => <TextField {...params} label="Código Cliente" name="codigoCliente" />}
                                        onChange={(event, value) => setClienteSeleccionado(prevState => ({
                                            ...prevState,
                                            codigoCliente: parseInt(value.codigo),
                                            oferta: ''
                                        }))}
                                    />
                                </Grid>
                                <Grid item xs={2}>
                                    <Autocomplete
                                        disableClearable={true}
                                        id="ofertas"
                                        options={ofertas}
                                        filterOptions={options => ofertas.filter(oferta => oferta.codigoCliente === clienteSeleccionado.codigoCliente)}
                                        getOptionLabel={option => option.numeroOferta}
                                        renderInput={params => <TextField {...params} label="Código oferta" name="codigoOferta" />}
                                        onChange={handleSeleccionOferta}
                                    />
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>

                {/* APARTADO DEL DIAGRAMA */}
                <Grid item xs={12}>
                    <Card>
                        <CardContent sx={{ p: 0 }}>
                            <Grid container>
                                <Grid item xs={12}>
                                    <Typography variant="h6" sx={{ pt: 1, pb: 1, pl: 2 }}>Diagrama de la planta</Typography>
                                </Grid>
                                {/* <Grid item xs={12} sx={{ height: 950 }}> */}
                                <Grid item xs={12} sx={{ height: 600 }}>
                                    <ReactFlow
                                        nodes={nodos}
                                        edges={lados}
                                        nodeTypes={nodeTypesDashboard}
                                        fitView
                                    >
                                        <Background />
                                    </ReactFlow>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Trampilla para posicionar pantalla al hacer clic en elemento del diagrama */}
                <Grid item id='scroll' xs={12}></Grid>
                <Grid item xs={12}></Grid>
                {/* Trampilla para posicionar pantalla al hacer clic en elemento del diagrama */}

                {/*Apartado incidencias */}
                <Grid item xs={6} id='scroll'>
                    <Card style={{ height: '600px', overflowY: 'auto' }}>
                        <CardContent sx={{ p: 2 }}>

                            <Grid containter spacing={2}>

                                <Grid item xs={12} sx={{ pb: 2 }}>
                                    <Typography variant="h6">Incidéncias</Typography>
                                </Grid>

                                <Grid item xs={12}>
                                    <TableContainer component={Paper}>
                                        <Table sx={{ minWidth: 650 }}>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell width="50px;"></TableCell>
                                                    {/* <TableCell align="left" width="100px;">Fecha</TableCell> */}
                                                    <TableCell onClick={() => manejarOrdenColumnaIncidencia('fecha')} align="left" width="100px;">
                                                        Fecha
                                                        {ordenColumnaIncidencias === 'fecha' && (ordenAscendenteIncidencia ? ' ▲' : ' ▼')}
                                                    </TableCell>
                                                    <TableCell onClick={() => manejarOrdenColumnaIncidencia('fechaRealizado')} align="left" width="110px;">
                                                        Realizado
                                                        {ordenColumnaIncidencias === 'fechaRealizado' && (ordenAscendenteIncidencia ? ' ▲' : ' ▼')}
                                                    </TableCell>
                                                    <TableCell>Operario</TableCell>
                                                    <TableCell>Incidéncia</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {
                                                    
                                                    elementoActivo.nombre &&
                                                    // parametrosAnalisisFiltrados.map(row => {
                                                    // parametrosIncidencias.map(row => {
                                                    datosOrdenadosIncdencias.map(row => {
                                                        return (
                                                            <TableRow>
                                                                <TableCell>
                                                                    {/* <Tooltip title="Ver tarea" placement="right"> */}
                                                                    {/* <IconButton onClick={() => alert("Abrir Mantenimiento")}> */}
                                                                    {/* <IconButton onClick={handleOpenClosePopUp}> */}
                                                                    {/* <Popup open={open} onClose={handleOpenClosePopUp} incidencia={row.observaciones} /> */}
                                                                    <IconButton className='' onClick={() => alert(row.observaciones)}>
                                                                        <ErrorIcon />
                                                                    </IconButton>
                                                                    {/* </Tooltip> */}
                                                                </TableCell>
                                                                <TableCell>
                                                                    {new Date(row.fecha).toLocaleDateString()}
                                                                </TableCell>
                                                                <TableCell>
                                                                    {new Date(row.fechaRealizado).toLocaleDateString()}
                                                                </TableCell>
                                                                <TableCell>
                                                                    {buscarNombreOperario(row.operario)}
                                                                </TableCell>
                                                                <TableCell>
                                                                    {row.observaciones}
                                                                </TableCell>
                                                            </TableRow>
                                                        )
                                                    }
                                                    )

                                                }
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>



                {/* APARTADO CALENDARIO DE TAREAS POR ELEMENTO */}
                <Grid item xs={6}>
                    <Card style={{ height: '600px', overflowY: 'auto' }}>
                        <CardContent sx={{ p: 2 }}>

                            <Grid containter spacing={2}>

                                <Grid container spacing={3} sx={{ mb: 5, justifyContent: 'space-between' }}>
                                    {
                                        elementoActivo.nombre ? (
                                            <>
                                                <Grid item>
                                                    <Typography variant="h6">Calendario de tareas</Typography>
                                                    <IconButton onClick={handleDecrementarContador}>
                                                        <NavigateBeforeIcon />
                                                    </IconButton>

                                                    <span>{contadorYear}</span>

                                                    <IconButton onClick={handleIncrementarContador}>
                                                        <NavigateNextIcon />
                                                    </IconButton>
                                                </Grid>
                                                <Grid item>
                                                    <Chip label={elementoActivo.nombre} color="primary" />
                                                </Grid>
                                            </>
                                        ) : (
                                            <Grid item>
                                                <Typography variant="h6">Calendario de tareas</Typography>
                                                <IconButton onClick={handleDecrementarContador}>
                                                    <NavigateBeforeIcon />
                                                </IconButton>

                                                <span>{new Date().getFullYear()}</span>

                                                <IconButton onClick={handleIncrementarContador}>
                                                    <NavigateNextIcon />
                                                </IconButton>
                                            </Grid>
                                        )
                                    }
                                </Grid>

                                <Grid item xs={12}>
                                    <TableContainer component={Paper}>
                                        <Table sx={{ minWidth: 650 }}>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell></TableCell>
                                                    <TableCell align="left">Tipo de análisis</TableCell>
                                                    <TableCell>Ene</TableCell>
                                                    <TableCell>Feb</TableCell>
                                                    <TableCell>Mar</TableCell>
                                                    <TableCell>Abr</TableCell>
                                                    <TableCell>May</TableCell>
                                                    <TableCell>Jun</TableCell>
                                                    <TableCell>Jul</TableCell>
                                                    <TableCell>Ago</TableCell>
                                                    <TableCell>Sep</TableCell>
                                                    <TableCell>Oct</TableCell>
                                                    <TableCell>Nov</TableCell>
                                                    <TableCell>Dic</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {
                                                    elementoActivo.nombre &&
                                                    // Mapeamos todos los parametros
                                                    analisis.map(row => {

                                                        // row -> id, nombre
                                                        // tareasFiltradas -> analisis, elemento
                                                        var currentTime = new Date();

                                                        // Obtenemos todos los valores del parametro actual (valores del mismo parametro, enero, febrero, ...)
                                                        const valoresPorTarea = parametrosFiltrados.filter(analisis => parseInt(analisis.analisis, 10) === row.id);
                                                        let fechas = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]; // -1 = no existe registro, 0 = existe, pero no realizado, 1 = existe y realizado

                                                        if (valoresPorTarea.length > 0) {

                                                            console.log({ valoresPorTarea });

                                                            // Mapeamos los valores en un array, y los registro que no estén seteamos una raya
                                                            valoresPorTarea.map(val => {

                                                                // Convertimos la fecha del registro en un objeto de fecha
                                                                const fecha = new Date(val.fecha);

                                                                // Contamos solo si los registros son de este año
                                                                //if (fecha.getFullYear() === currentTime.getFullYear()) {
                                                                if (fecha.getFullYear() === contadorYear) {
                                                                    for (let i = 0; i < 12; i++) {
                                                                        if (fecha.getMonth() === i) {
                                                                            val.realizado
                                                                                ? fechas[i] = 1
                                                                                : fechas[i] = 0
                                                                        }
                                                                    }
                                                                }

                                                                console.log("FECHAS: ", { fechas })

                                                            });

                                                        }

                                                        // Devolvemos los valores
                                                        return (
                                                            valoresPorTarea.length > 0 && (
                                                                <TableRow
                                                                    key={row.id}
                                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                                >
                                                                    <TableCell>
                                                                        <Tooltip title="Ver parametros del elemento" placement="right">
                                                                            <IconButton onClick={() => handleSeleccionarAnalisis(row.id)}>                                                                            
                                                                                <TimelineIcon />
                                                                            </IconButton>
                                                                        </Tooltip>
                                                                    </TableCell>
                                                                    <TableCell aligh="left" component="th" scope="row">
                                                                        {row.nombre}
                                                                    </TableCell>
                                                                    {
                                                                        fechas.map((fecha, index) => (
                                                                            <TableCell key={index}>
                                                                                <IconButton
                                                                                    onClick={() => { }}
                                                                                    color={fecha === -1 ? 'primary' : fecha === 0 ? 'error' : 'success'}
                                                                                    disabled={fecha === -1 ? true : false}
                                                                                >
                                                                                    {
                                                                                        fecha === -1
                                                                                            ? <RemoveIcon />
                                                                                            : fecha === 0
                                                                                                ? <ClearIcon />
                                                                                                : <CheckIcon />
                                                                                    }
                                                                                </IconButton>
                                                                            </TableCell>
                                                                        ))
                                                                    }
                                                                </TableRow>
                                                            )
                                                        )
                                                    })
                                                }
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Grid>

                            </Grid>

                        </CardContent>
                    </Card>
                </Grid>

                
                <Grid container align="right">
                    <Grid item xs={12}>
                        <IconButton onClick={() => handleScrollToBottom()}>
                            <ArrowDownwardIcon fontSize="large" />
                        </IconButton>
                        <IconButton onClick={() => handleInicioPagina()}>
                            <ArrowUpwardIcon fontSize="large" />
                        </IconButton>
                    </Grid>
                </Grid>


                {/* APARTADO TABLA DE PARAMETROS */}
                <Grid item xs={6}>
                    <Card style={{ height: '600px', overflowY: 'auto' }}>
                        <CardContent>

                            <Grid container spacing={3} sx={{ mb: 5, justifyContent: 'space-between' }}>
                                {
                                    analisisActivo.nombre ? (
                                        <>
                                            <Grid item>
                                                <Typography variant='h6'>Parámetros del Análisis</Typography>
                                                <IconButton onClick={handleDecrementarContador2}>
                                                    <NavigateBeforeIcon />
                                                </IconButton>

                                                <span>{contadorYear2}</span>

                                                <IconButton onClick={handleIncrementarContador2}>
                                                    <NavigateNextIcon />
                                                </IconButton>
                                            </Grid>
                                            <Grid item>
                                                <Chip label={analisisActivo.nombre} color="primary" />
                                            </Grid>
                                        </>
                                    ) : (
                                        <Grid item>
                                            <Typography variant='h6'>Selecciona un análisis del calendario</Typography>
                                            <IconButton onClick={handleDecrementarContador2}>
                                                <NavigateBeforeIcon />
                                            </IconButton>

                                            <span>{new Date().getFullYear()}</span>

                                            <IconButton onClick={handleIncrementarContador2}>
                                                <NavigateNextIcon />
                                            </IconButton>
                                        </Grid>
                                    )
                                }
                            </Grid>
                            {
                                analisisActivo.nombre && (
                                    <TableContainer component={Paper}>
                                        <Table sx={{ minWidth: 650 }}>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell></TableCell>
                                                    <TableCell align="left">Parámetro</TableCell>
                                                    <TableCell>Ene</TableCell>
                                                    <TableCell>Feb</TableCell>
                                                    <TableCell>Mar</TableCell>
                                                    <TableCell>Abr</TableCell>
                                                    <TableCell>May</TableCell>
                                                    <TableCell>Jun</TableCell>
                                                    <TableCell>Jul</TableCell>
                                                    <TableCell>Ago</TableCell>
                                                    <TableCell>Sep</TableCell>
                                                    <TableCell>Oct</TableCell>
                                                    <TableCell>Nov</TableCell>
                                                    <TableCell>Dic</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {
                                                    // Mapeamos todos los parametros
                                                    parametros.map(row => {

                                                        // Obtenemos todos los valores del parametro actual (valores del mismo parametro, enero, febrero, ...)
                                                        const valoresPorParametro = analisisParametros.filter(param => param.parametro === row.id);
                                                        let fechas = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

                                                        // Mapeamos los valores en un array, y si no hay datos seteamos un 0
                                                        valoresPorParametro.map(val => {

                                                            const fecha = new Date(val.fecha);

                                                            if (fecha.getFullYear() === contadorYear2) {
                                                                for (let i = 0; i < 12; i++) {
                                                                    if (fecha.getMonth() === i) {
                                                                        fechas[i] = val.valor;
                                                                    }
                                                                }
                                                            }

                                                        });

                                                        // Devolvemos los valores
                                                        return (
                                                            valoresPorParametro.length > 0 && (
                                                                <TableRow
                                                                    key={row.id}
                                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                                >
                                                                    <TableCell>
                                                                        <Tooltip title="Ver en la gráfica" placement="right">
                                                                            {/* <IconButton onClick={() => handleSeleccionarParametro({ nombre: row.nombre, datos: fechas })}> */}
                                                                            {/* Se modifica para que al hacer clic en boton cambie automaticamente de pestaña y pasamos los parametros para dibujar gráfico  */}
                                                                            <IconButton onClick={() => handleTabClick(1, row.nombre, fechas)}>
                                                                                <TimelineIcon />
                                                                            </IconButton>
                                                                        </Tooltip>
                                                                    </TableCell>
                                                                    <TableCell aligh="left" component="th" scope="row">
                                                                        {row.nombre}
                                                                    </TableCell>
                                                                    {
                                                                        fechas.map((fecha, index) => <TableCell key={index}>{fecha}</TableCell>)
                                                                    }
                                                                </TableRow>
                                                            )
                                                        )
                                                    })
                                                }
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                )
                            }

                        </CardContent>
                    </Card>
                </Grid>



                {/* ------ APARTADO GRÁFICO ------
                <Grid item xs={6}>
                    <Card style={{ height: '600px', overflowY: 'auto' }}>
                        <CardContent sx={{ p: 2 }}>

                            <Grid container spacing={6} sx={{ mb: 2, justifyContent: 'space-between' }}>
                                {
                                    parametroActivo.nombre ? (
                                        <>
                                            <Grid item>
                                                <Typography variant='h6'>Vista gráfica del parámetro</Typography>
                                            </Grid>
                                            <Grid item>
                                                <Chip label={parametroActivo.nombre} color="primary" />
                                            </Grid>
                                        </>
                                    ) : (
                                        <Grid item>
                                            <Typography variant='h6'>Selecciona un parámetro de la tabla</Typography>
                                        </Grid>
                                    )
                                }
                            </Grid>

                            <ChartContainer />

                        </CardContent>
                    </Card>
                </Grid>


                ------ Apartado PDF'S ------
                <Grid item xs={6} id='scroll'>
                    <Card style={{ height: '600px', overflowY: 'auto' }}>
                        <CardContent sx={{ p: 2 }}>

                            <Grid containter spacing={2}>

                                <Grid item xs={12} sx={{ pb: 2 }}>
                                    <Typography variant="h6">PDF'S</Typography>
                                </Grid>

                                <Grid item xs={12}>
                                    <TableContainer component={Paper}>
                                        <Table sx={{ minWidth: 650 }}>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell width="50px;"></TableCell>
                                                    <TableCell align="left">PDF</TableCell>                                                    
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {
                                                    // Mapeamos todos los parametros
                                                    
                                                    //ficherosAnalisis.map(row => {
                                                    parametrosPDF.map(row => {
                                                        return(
                                                        <TableRow>
                                                            <TableCell>
                                                                <Tooltip title="Descargar PDF" placement="right">
                                                                    <IconButton onClick={() => bajarPdfNoFQ(row.pdf)}>
                                                                        <DownloadPDF_Icon/>
                                                                    </IconButton>
                                                                </Tooltip>
                                                            </TableCell>
                                                            <TableCell>
                                                                {row.pdf}
                                                            </TableCell>        
                                                        </TableRow>
                                                        )    
                                                    }
                                                    )
                                                    
                                                }                                
                                            </TableBody>                                            
                                        </Table>
                                    </TableContainer>
                                </Grid>

                            </Grid>

                        </CardContent>
                    </Card>
                </Grid>
                */}


                {console.log(activeTab, "TAB ACTIVO")}

                {/* APARTAT PESTANYES */}
                <Grid item xs={6}>
                    <Card style={{ height: '600px', overflowY: 'auto' }}>
                        <CardContent sx={{ p: 2 }}>

                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Tabs
                                        value={activeTab}
                                        onChange={handleTabChange}
                                        indicatorColor="primary"
                                        textColor="primary"
                                    /*centered*/
                                    >
                                        <Tab label="Documentos" />
                                        <Tab label="Gráfico" />
                                    </Tabs>
                                </Grid>
                                <Grid item xs={12}>
                                    <TabPanel value={activeTab} index={0}>
                                        {/* Contingut del grid PDF'S */}
                                        {/*Apartado PDF'S */}
                                        <Grid item xs={12}>
                                            <Card style={{ height: '600px', overflowY: 'auto' }}>
                                                <CardContent sx={{ p: 2 }}>

                                                    <Grid containter spacing={2}>

                                                        <Grid item xs={12} sx={{ pb: 2 }}>
                                                            <Typography variant="h6">PDF'S</Typography>
                                                        </Grid>

                                                        <Grid item xs={12}>
                                                            <TableContainer component={Paper}>
                                                                <Table sx={{ minWidth: 650 }}>
                                                                    <TableHead>
                                                                        <TableRow>
                                                                            <TableCell width="50px;"></TableCell>
                                                                            <TableCell onClick={() => manejarOrdenColumnaPDF('fecha')} align="left" width="100px;">
                                                                                Fecha
                                                                                {ordenColumnaPDF === 'fecha' && (ordenAscendentePDF ? ' ▲' : ' ▼')}
                                                                            </TableCell>
                                                                            <TableCell>PDF</TableCell>
                                                                        </TableRow>
                                                                    </TableHead>
                                                                    <TableBody>
                                                                        {
                                                                            elementoActivo.nombre &&
                                                                            // Mapeamos todos los parametros                                                                            
                                                                            //ficherosAnalisis.map(row => {
                                                                            //parametrosPDF.map(row => {
                                                                            datosOrdenadosPDF.map(row => {
                                                                                return (
                                                                                    <TableRow>
                                                                                        <TableCell>
                                                                                            <Tooltip title="Descargar PDF" placement="right">
                                                                                                {/* <IconButton onClick={() => bajarPdfNoFQ(row.pdf)}> */}
                                                                                                <IconButton onClick={() => bajarPdfDashBoard(row.pdf, buscaNombreFicheroPorId(row.pdf))}>
                                                                                                    <DownloadPDF_Icon />
                                                                                                </IconButton>
                                                                                            </Tooltip>
                                                                                        </TableCell>
                                                                                        <TableCell>
                                                                                            {new Date(row.fecha).toLocaleDateString()}
                                                                                        </TableCell>
                                                                                        <TableCell>
                                                                                            {/* {row.pdf} */}
                                                                                            {buscaNombreFicheroPorId(row.pdf)}
                                                                                        </TableCell>
                                                                                    </TableRow>
                                                                                )
                                                                            }
                                                                            )

                                                                        }
                                                                    </TableBody>
                                                                </Table>
                                                            </TableContainer>
                                                        </Grid>

                                                    </Grid>

                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    </TabPanel>

                                    <TabPanel value={activeTab} index={1}>
                                        {/* Contingut del grid Gràfics */}
                                        <Grid item xs={12}>
                                            <Card style={{ height: '600px', overflowY: 'auto' }}>
                                                <CardContent sx={{ p: 2 }}>

                                                    <Grid container spacing={6} sx={{ mb: 2, justifyContent: 'space-between' }}>
                                                        {
                                                            parametroActivo.nombre ? (
                                                                <>
                                                                    <Grid item>
                                                                        <Typography variant='h6'>Vista gráfica del parámetro</Typography>
                                                                    </Grid>
                                                                    <Grid item>
                                                                        <Chip label={parametroActivo.nombre} color="primary" />
                                                                    </Grid>
                                                                </>
                                                            ) : (
                                                                <Grid item>
                                                                    <Typography variant='h6'>Selecciona un parámetro de la tabla</Typography>
                                                                </Grid>
                                                            )
                                                        }
                                                    </Grid>

                                                    <ChartContainer />

                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    </TabPanel>
                                </Grid>
                            </Grid>

                        </CardContent>
                    </Card>
                </Grid>

                <Grid container align="right">
                    <Grid item xs={12}>
                        <IconButton onClick={() => handleInicioPagina()}>
                            <ArrowUpwardIcon fontSize="large" />
                        </IconButton>
                    </Grid>
                </Grid>

            </Grid>
        </>
    );

}

export default HomeCliente;