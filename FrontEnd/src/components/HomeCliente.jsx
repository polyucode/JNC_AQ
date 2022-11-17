import React, { useContext, useEffect, useState } from 'react';
//import Diagram, { useSchema, createSchema } from 'beautiful-react-diagrams';
import { Grid, Card, CardContent, TextField, Typography, Autocomplete, Chip, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, IconButton, Tooltip } from '@mui/material';

import {
    Chart,
    ChartSeries,
    ChartSeriesItem,
    ChartCategoryAxis,
    ChartCategoryAxisItem,
} from "@progress/kendo-react-charts";
import "hammerjs";

import '@progress/kendo-theme-default/dist/all.css';
import { getConfPlantaClientePorClienteOferta, getOfertas, getParametros, getValorParametros } from '../api/apiBackend';
import { AuthContext } from '../context/AuthContext';
import { useDiagrama } from '../helpers/generarDiagrama';
import ReactFlow, { Background } from 'react-flow-renderer';
import { DashboardContext } from '../context/DashboardContext';
import TimelineIcon from '@mui/icons-material/Timeline';


const HomeCliente = () => {

    // Guardado de datos
    const [ ofertas, setOfertas ] = useState([]);
    const [ parametros, setParametros ] = useState([]);
    const [ plantaActiva, setPlantaActiva ] = useState({});

    // Variables para el diagrama
    const [ nodos, setNodos ] = useState([]);
    const [ lados, setLados ] = useState([]);
    const { nodeTypesDashboard } = useDiagrama();

    // Variables de contexto
    const { user } = useContext( AuthContext );
    const { elementoActivo, parametroActivo, valoresParametros, handleSeleccionarParametro } = useContext( DashboardContext );

    // Efecto que realiza las peticiones al cargar la página
    useEffect(() => {

        getOfertas()
            .then( resp => setOfertas( resp ));

        getParametros()
            .then( resp => setParametros( resp ));

    }, []);

    // Efecto que carga el diagrama cada vez que se cambia de planta
    useEffect(() => {

        if( plantaActiva.diagrama ) {

            const datosDiagrama = JSON.parse( plantaActiva.diagrama );
            console.log( datosDiagrama );

            setNodos( datosDiagrama.nodos );
            setLados( datosDiagrama.lados );

        } else {

            setNodos([]);
            setLados([]);

        }

    }, [ plantaActiva ])

    const ChartContainer = () => (
        <Chart>
            <ChartCategoryAxis>
                <ChartCategoryAxisItem
                    title={{
                        text: "Meses",
                    }}
                    categories={["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul","Ago","Sep","Oct","Nov","Dic"]}
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

        getConfPlantaClientePorClienteOferta( user.idCliente, ofertaSeleccionada )
            .then( res => res ? setPlantaActiva( res ) : setPlantaActiva({}) );

    }

    return (
        <>
            <Grid container spacing={ 2 }>

                {/* APARTADO INICIAL, SELECCIÓN DE PLANTA */}
                <Grid item xs={ 12 }>
                    <Card>
                        <CardContent>
                            <Grid container sx={{ alignItems: 'center' }}>

                                <Grid item xs={ 6 }>
                                    <Typography variant="h6">
                                        {
                                            plantaActiva.nombreCliente
                                             ? plantaActiva.nombreCliente
                                             : 'Selecciona un código de oferta'
                                        }
                                    </Typography>
                                </Grid>
                                <Grid item xs={ 4 }> 
                                    {
                                        plantaActiva.descripcion && (
                                            <Typography>{ plantaActiva.descripcion }</Typography>
                                        ) 
                                    }
                                </Grid>
                                <Grid item xs={ 2 }>
                                    <Autocomplete
                                        disableClearable={ true }
                                        id="ofertas"
                                        options={ ofertas }
                                        getOptionLabel={ option => option.numeroOferta.toString() }
                                        renderInput={ params => <TextField {...params} label="Código oferta" name="codigoOferta" /> }
                                        onChange={ handleSeleccionOferta }
                                    />
                                </Grid>

                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>

                {/* APARTADO DEL DIAGRAMA */}
                <Grid item xs={ 12 }>
                    <Card>
                        <CardContent sx={{ p: 0 }}>
                            <Grid container>
                                <Grid item xs={ 12 }>
                                    <Typography variant="h6" sx={{ pt: 1, pb: 1, pl: 2 }}>Diagrama de la planta</Typography>
                                </Grid>
                                <Grid item xs={ 12 } sx={{ height: 400 }}>
                                    <ReactFlow
                                        nodes={ nodos }
                                        edges={ lados }
                                        nodeTypes={ nodeTypesDashboard }
                                        fitView
                                    >
                                        <Background />
                                    </ReactFlow>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>

                {/* APARTADO TABLA DE PARAMETROS */}
                <Grid item xs={ 12 }>
                    <Card>
                        <CardContent>

                            <Grid container spacing={ 3 } sx={{ mb: 2, justifyContent: 'space-between' }}>
                                {
                                    elementoActivo.nombre ? (
                                        <>
                                            <Grid item>
                                                <Typography variant='h6'>Parámetros del elemento</Typography>
                                            </Grid>
                                            <Grid item>
                                                <Chip label={ elementoActivo.nombre } color="primary" />
                                            </Grid>
                                        </>
                                    ) : (
                                        <Grid item>
                                            <Typography variant='h6'>Selecciona un elemento del diagrama</Typography>
                                        </Grid>
                                    )
                                }
                            </Grid>
                            {
                                elementoActivo.nombre && (
                                    <TableContainer component={ Paper }>
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
                                                    parametros.map( row => {

                                                        // Obtenemos todos los valores del parametro actual (valores del mismo parametro, enero, febrero, ...)
                                                        const valoresPorParametro = valoresParametros.filter( param => param.parametro === row.id );
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

                                                        // Devolvemos los valores
                                                        return (
                                                            valoresPorParametro.length > 0 && (
                                                                <TableRow
                                                                    key={ row.id }
                                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                                >
                                                                    <TableCell>
                                                                        <Tooltip title="Ver en la gráfica" placement="right">
                                                                            <IconButton onClick={ () => handleSeleccionarParametro({ nombre: row.nombre, datos: fechas }) }>
                                                                                <TimelineIcon />
                                                                            </IconButton>
                                                                        </Tooltip>
                                                                    </TableCell>
                                                                    <TableCell aligh="left" component="th" scope="row">
                                                                        { row.nombre }
                                                                    </TableCell>
                                                                    {
                                                                        fechas.map( (fecha, index) => <TableCell key={ index }>{ fecha }</TableCell> )
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

                {/* APARTADO GRÁFICO */}
                <Grid item xs={ 12 }>
                    <Card>
                        <CardContent sx={{ p: 2 }}>

                            <Grid container spacing={ 3 } sx={{ mb: 2, justifyContent: 'space-between' }}>
                                {
                                    parametroActivo.nombre ? (
                                        <>
                                            <Grid item>
                                            <Typography variant='h6'>Vista gráfica del parámetro</Typography>
                                            </Grid>
                                            <Grid item>
                                                <Chip label={ parametroActivo.nombre } color="primary" />
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

            </Grid>
            
        </>
    );

}

export default HomeCliente;