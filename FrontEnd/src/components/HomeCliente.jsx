import React, { useContext, useEffect, useState } from 'react';
import axios from "axios";
//import Diagram, { useSchema, createSchema } from 'beautiful-react-diagrams';
import { FormControl, Grid, Card, CardActions, CardContent, CardMedia, Button, TextField, Typography, Alert, AlertTitle, Autocomplete } from '@mui/material';

import {
    Chart,
    ChartTitle,
    ChartSeries,
    ChartSeriesItem,
    ChartCategoryAxis,
    ChartCategoryAxisItem,
} from "@progress/kendo-react-charts";
import "hammerjs";

import '@progress/kendo-theme-default/dist/all.css';
import { Diagrama } from './Diagrama/Diagrama';
import { getConfPlantaClientePorClienteOferta, getOfertas } from '../api/apiBackend';
import { AuthContext } from '../context/AuthContext';
import { useDiagrama } from '../helpers/generarDiagrama';
import ReactFlow, { Background } from 'react-flow-renderer';

const token = {
    headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
    }
};



const HomeCliente = () => {

    const [ valores, setValores ] = useState([]);
    const [ ofertas, setOfertas ] = useState([]);
    const [ plantaActiva, setPlantaActiva ] = useState({});
    const [ nodos, setNodos ] = useState();
    const [ lados, setLados ] = useState();

    const { user } = useContext( AuthContext );
    const { nodeTypes } = useDiagrama();



    const getValorParametros = async () => {
        axios.get("/valorparametros", token).then(response => {
            const valor = Object.entries(response.data.data).map(([key, value]) => (key, value))
            setValores(valor);
        }, [])
    }

    useEffect(() => {

        getValorParametros();

        getOfertas()
            .then( resp => setOfertas( resp ));

    }, [])

    // Efecto que carga el diagrama cada vez que se cambi de planta
    useEffect(() => {

        if( plantaActiva.diagrama ) {

            const datosDiagrama = JSON.parse( plantaActiva.diagrama );
            console.log( datosDiagrama );

            setNodos( datosDiagrama.nodos );
            setLados( datosDiagrama.lados );
        }

    }, [ plantaActiva ])

    
    const categories = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul","Ago","Sep","Oct","Nov","Dic"];

    const ChartContainer = () => (
        <Chart>
          <ChartCategoryAxis>
            <ChartCategoryAxisItem
              title={{
                text: "Meses",
              }}
              categories={categories}
            />
          </ChartCategoryAxis>
          <ChartSeries>
            <ChartSeriesItem type="line" data={[4.5, 4.4, 4.4, 4.3, 0, 0, 0, 0, 0, 0, 0, 0]} />
            <ChartSeriesItem type="line" data={[25, 32, 26, 37, 0, 0, 0, 0, 0, 0, 0, 0]} />
          </ChartSeries>
        </Chart>
      );

    // Con esta función, al seleccionar una oferta seteamos la planta activa
    const handleSeleccionOferta = (e) => {

        const ofertaSeleccionada = parseInt(e.target.textContent);

        getConfPlantaClientePorClienteOferta( user.idCliente, ofertaSeleccionada )
            .then( res => setPlantaActiva( res ) );

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
                        <CardContent sx={{ p: 0, height: 400 }}>
                            <ReactFlow
                                nodes={ nodos }
                                edges={ lados }
                                //onEdgesChange={onEdgesChange}
                                //onConnect={onConnect}
                                nodeTypes={ nodeTypes }
                                fitView
                            >
                                <Background />
                            </ReactFlow>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={ 6 }>
                    <Card>
                        <CardContent sx={{ p: 0, mb: 2 }}>

                            <Typography variant='h5'>Parámetros del elemento: <b>Torre 1</b></Typography>
                            <table>
                                <tbody>
                                    <tr>
                                        <th>Parámetro</th>
                                        <th>Un.</th>
                                        <th>Ene</th>
                                        <th>Feb</th>
                                        <th>Mar</th>
                                        <th>Abr</th>
                                        <th>May</th>
                                        <th>Jun</th>
                                        <th>Jul</th>
                                        <th>Ago</th>
                                        <th>Sep</th>
                                        <th>Oct</th>
                                        <th>Nov</th>
                                        <th>Dic</th>
                                    </tr>
                                    <tr>
                                        <td>pH</td>
                                        <td>pH</td>
                                        <td>4,5</td>
                                        <td>4,4</td>
                                        <td>4,4</td>
                                        <td>4,3</td>
                                        <td>0</td>
                                        <td>0</td>
                                        <td>0</td>
                                        <td>0</td>
                                        <td>0</td>
                                        <td>0</td>
                                        <td>0</td>
                                        <td>0</td>
                                    </tr>
                                    <tr>
                                        <td>Temperatura</td>
                                        <td>ºC</td>
                                        <td>25</td>
                                        <td>32</td>
                                        <td>26</td>
                                        <td>37</td>
                                        <td>0</td>
                                        <td>0</td>
                                        <td>0</td>
                                        <td>0</td>
                                        <td>0</td>
                                        <td>0</td>
                                        <td>0</td>
                                        <td>0</td>
                                    </tr>
                                </tbody>
                            </table>

                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={ 6 }>
                    <Card>
                        <CardContent sx={{ p: 0, mb: 2 }}>

                            <Typography variant='h5'>Parámetros del elemento (gráfico): <b>Torre 1</b></Typography>
                            <ChartContainer />

                        </CardContent>
                    </Card>
                </Grid>

            </Grid>
            
        </>
    );

}

export default HomeCliente;