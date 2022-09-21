import React, { useEffect, useState } from 'react';
import axios from "axios";
import Diagram, { useSchema, createSchema } from 'beautiful-react-diagrams';
import FullCalendar from '@fullcalendar/react'
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { Modal, TextField, Button } from '@material-ui/core';
import Autocomplete from '@mui/material/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';

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
import './HomeCliente.css';

const token = {
    headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
    }
};

const useStylesEditarDet = makeStyles((theme) => ({
    modal: {
        position: 'absolute',
        width: 1500,
        height: 1120,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    },
    iconos: {
        cursor: 'pointer'
    },
    inputMaterial: {
        width: '100%',
        height: 50
    }
}));


function HomeCliente() {

    const [valores, setValores] = useState([]);

    const [ofertas, setOfertas] = useState([]);
    const [clientes, setClientes] = useState([]);

    const [clienteSeleccionado, setClienteSeleccionado] = useState({
        id: 0,
        codigoCliente: 0,
        oferta: 0,
        addDate: null,
        addIdUser: null,
        modDate: null,
        modIdUser: null,
        delDate: null,
        delIdUser: null,
        deleted: null
    })

    const stylesEditarDet = useStylesEditarDet();


    const getValorParametros = async () => {
        axios.get("http://172.26.0.169:44343/api/valorparametros", token).then(response => {
            const valor = Object.entries(response.data.data).map(([key, value]) => (key, value))
            setValores(valor);
        }, [])
    }

    const GetClientes = async () => {
        axios.get("/cliente", token).then(response => {
            const cliente = Object.entries(response.data.data).map(([key, value]) => (key, value))
            setClientes(cliente);
        }, [])
    }

    const GetOfertas = async () => {
        axios.get("/ofertasclientes", token).then(response => {
            const oferta = Object.entries(response.data.data).map(([key, value]) => (key, value))
            setOfertas(oferta);
        }, [])
    }

    useEffect(() => {
        getValorParametros();
        GetClientes();
        GetOfertas();
    }, [])


    const CustomRender = ({ id, content, data, inputs, outputs }) => (
        <div onClick={prueba(data.id)} style={{ background: data.background, border: '1px solid ' + data.selector, borderRadius: '5px', color: data.color }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                {inputs.map((port) => React.cloneElement(port, { style: { width: '10px', height: '34px', background: data.selector } }))}
                <div role="button" style={{ padding: '5px' }}>
                    {content}
                </div>
                {outputs.map((port) => React.cloneElement(port, { style: { width: '10px', height: '34px', background: data.selector } }))}
            </div>
        </div>
    );

    const initialSchema = createSchema({
        nodes: [
            {
                id: 'node-1',
                content: 'Osmosis 1',
                coordinates: [20, 120],
                render: CustomRender,
                data: { background: '#d1c4e9', selector: '#b39ddb', color: '#4527a0' },
                outputs: [{ id: 'port-1' }],
                onClick: mostrarElementos()
            },
            {
                id: 'node-2',
                content: 'Torre 1',
                coordinates: [260, 50],
                render: CustomRender,
                data: { background: '#c5cae9', selector: '#9fa8da', color: '#283593' },
                inputs: [{ id: 'port-2' }],
                outputs: [{ id: 'port-3' }]
            },
            {
                id: 'node-3',
                content: 'Torre 2',
                coordinates: [260, 120],
                render: CustomRender,
                data: { background: '#c5cae9', selector: '#9fa8da', color: '#283593' },
                inputs: [{ id: 'port-4' }],
                outputs: [{ id: 'port-5' }]
            },
            {
                id: 'node-4',
                content: 'Depósito 1',
                coordinates: [260, 190],
                render: CustomRender,
                data: { background: '#c5cae9', selector: '#9fa8da', color: '#283593' },
                inputs: [{ id: 'port-6' }],
                outputs: [{ id: 'port-7' }]
            },
            {
                id: 'node-5',
                content: 'Caldera 1',
                coordinates: [480, 120],
                render: CustomRender,
                data: { background: '#bbdefb', selector: '#90caf9', color: '#1565c0' },
                inputs: [{ id: 'port-8' }],
                outputs: [{ id: 'port-9' }]
            }
        ],
        links: [
            { input: 'port-1', output: 'port-2' },
            { input: 'port-1', output: 'port-4' },
            { input: 'port-1', output: 'port-6' },
            { input: 'port-3', output: 'port-8' },
            { input: 'port-5', output: 'port-8' },
            { input: 'port-7', output: 'port-8' },

        ]
    })

    const [schema, { onChange, addNode, removeNode }] = useSchema(initialSchema);

    const categories = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

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

    function prueba(id) {
        console.log('Prueba: ' + id);
    }

    function mostrarElementos() {
        console.log("Me ha seleccionado")
    }

    return (
        <div className="home-container">
            <h4>Hola! Hecha un vistazo al estado de tu planta</h4>
            <div className='autocomplete'>
                <div className="col-md-2">
                    <h5> Codigo Cliente </h5>
                    {/* Desplegable de Clientes */}
                    <Autocomplete
                        disableClearable={true}
                        id="CboClientes"
                        options={clientes}
                        className={stylesEditarDet.inputMaterial}
                        getOptionLabel={option => option.codigo}
                        sx={{ width: 200 }}
                        renderInput={(params) => <TextField {...params} name="codigoCliente" />}
                        onChange={(event, value) => setClienteSeleccionado(prevState => ({
                            ...prevState,
                            codigoCliente: value.codigo
                        }))}
                    />
                </div>
                <div className="col-md-2">
                    <h5> Oferta </h5>
                    <Autocomplete
                        disableClearable={true}
                        id="Oferta"
                        options={ofertas}
                        className={stylesEditarDet.inputMaterial}
                        filterOptions={options => ofertas.filter(oferta => oferta.codigoCliente === clienteSeleccionado.codigoCliente)}
                        getOptionLabel={option => option.numeroOferta}
                        sx={{ width: 200 }}
                        renderInput={(params) => <TextField {...params} name="oferta" />}
                        onChange={(event, value) => setClienteSeleccionado(prevState => ({
                            ...prevState,
                            oferta: parseInt(value.numeroOferta)
                        }))}
                    />
                </div>
            </div>
            <div className='home-container-elements'>
                <div className="home-col-1">
                    <div className="home-diagrama">
                        <h5>Diagrama de planta</h5>
                        <hr />
                        <div style={{ height: '22rem' }}>
                            <Diagram schema={schema} onChange={onChange} />
                        </div>
                    </div>
                    <div className="home-tabla-parametros-elemento">
                        <h5>Parámetros del elemento: <b>Torre 1</b></h5>
                        <hr />
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
                    </div>
                </div>
                <div className="home-col-2">
                    <div className='home-calendario-mantenimiento'>
                        <h5>Calendario de mantenimientos</h5>
                        <hr />
                        <FullCalendar
                            plugins={[resourceTimelinePlugin, dayGridPlugin, timeGridPlugin, listPlugin]}
                            headerToolbar={{
                                left: 'today prev,next',
                                center: 'title',
                                right: 'resourceTimelineYear,resourceTimelineMonth',
                            }}
                            locale='esLocale'
                            timeZone='UTC'
                            initialView='resourceTimelineYear'
                            scrollTime='08:00'
                            aspectRatio={1.5}
                            weekends={false}
                            height={350}
                            resourceAreaHeaderContent='Elementos'
                            resources={[
                                {
                                    id: 1,
                                    title: 'Elemento 1'
                                },
                                {
                                    id: 2,
                                    title: 'Elemento 2'
                                },
                                {
                                    id: 3,
                                    title: 'Elemento 3'
                                },
                            ]}
                            events={[
                                {
                                    id: 1,
                                    title: 'Mantenimiento 1',
                                    start: '2022-03-01',
                                    end: '2022-03-06',
                                    resourceId: 1,
                                    color: 'red'
                                },
                                {
                                    id: 2,
                                    title: 'Mantenimiento 2',
                                    start: '2022-03-05',
                                    end: '2022-03-11',
                                    resourceId: 3,
                                    color: 'green'
                                },
                                {
                                    id: 3,
                                    title: 'Mantenimiento 3',
                                    start: '2022-03-15',
                                    end: '2022-03-23',
                                    resourceId: 2,
                                    color: 'orange'
                                }
                            ]}
                        //events= 'https://fullcalendar.io/api/demo-feeds/events.json?single-day&for-resource-timeline'
                        />
                    </div>
                    <div className='home-grafico'>
                        <h5>Parámetros del elemento (gráfico): <b>Torre 1</b></h5>
                        <hr />
                        <ChartContainer />
                    </div>
                </div>
            </div>
        </div>
    );

}

export default HomeCliente;