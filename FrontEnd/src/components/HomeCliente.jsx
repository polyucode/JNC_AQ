import React, { useEffect, useState } from 'react';
import axios from "axios";
//import Diagram, { useSchema, createSchema } from 'beautiful-react-diagrams';
import { FormControl, Grid, Card, CardActions, CardContent, CardMedia, Button, TextField, Typography, Alert, AlertTitle } from '@mui/material';

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
import { getOfertas } from '../api/apiBackend';

const token = {
    headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
    }
};



const HomeCliente = () => {

    const [ valores, setValores ] = useState([]);
    const [ ofertas, setOfertas ] = useState();

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


    return (
        <>
            <Grid container spacing={ 2 }>

                <Grid item xs={ 12 }>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Info de la planta</Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={ 12 }>
                    <Card>
                        <CardContent sx={{ p: 0, height: 400 }}>
                            <Diagrama />
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