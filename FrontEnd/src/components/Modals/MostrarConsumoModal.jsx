import { useState, useEffect } from 'react';
import { Grid, Card, Typography, Button, TextField } from '@mui/material';
import { getConsumos, getModoEnvio, getProductos } from '../../api';
import { DataGrid } from '@mui/x-data-grid';
import { DATAGRID_LOCALE_TEXT } from '../../helpers/datagridLocale';

export const MostrarConsumoModal = ({ofertaProducto, ofertaSeleccionada, productoEditar}) => {

    const [rows, setRows] = useState([]);
    const [data, setData] = useState([]);
    const [modoEnvio, setModoEnvio] = useState([]);

    const columns = [

        //Visibles
        {
            headerName: 'Fecha de Entrega',
            field: 'fecha',
            type: 'date',
            width: 150,
            valueFormatter: (params) => {
                if (params.value !== null) {
                    const date = new Date(params.value);
                    return date.toLocaleDateString();
                } else {
                    const date = "";
                    return date;
                }
            }
        },
        { 
            headerName: 'Metodo Entrega', 
            field: 'modoEnvio', 
            width: 200,
            valueFormatter: (params) => {
                const env = modoEnvio.find((envio) => envio.id === params.value);
                return env ? env.nombre : '';
            } 
        },
        { headerName: 'Numero Albaran', field: 'albaran', width: 200 },
        { headerName: 'Nº Unidades', field: 'cantidad', width: 120 },
        { headerName: 'Observaciones', field: 'observaciones', width: 1000 }
    ];

    useEffect(() => {
        
        peticionGet();

        getModoEnvio()
            .then(resp => setModoEnvio(resp.filter(envio => !envio.deleted)));

    }, [])

    useEffect(() => {

        if (data.length > 0) {
            setRows(data);
        }

    }, [data]);

    const peticionGet = async () => {
        const resp = await getConsumos();
        setData(resp.filter(consumo => consumo.oferta === ofertaSeleccionada.numeroOferta && consumo.producto === ofertaProducto.idProducto && !consumo.deleted));
    }

    return (
        <>

            <Grid container spacing={3}>

                <Grid item xs={12}>
                    <Card sx={{ p: 2, textAlign: 'center' }}>
                        <Typography variant='h6'>{productoEditar[0].descripcion ? productoEditar[0].descripcion : ""}</Typography>
                    </Card>
                </Grid>

                <Grid item xs={12}>
                    <Card>
                        <DataGrid
                            localeText={DATAGRID_LOCALE_TEXT}
                            sx={{
                                width: '100%',
                                height: 350,
                                backgroundColor: '#FFFFFF'
                            }}
                            rows={rows}
                            columns={columns}
                            initialState={{
                                sorting: {
                                    sortModel: [{ field: 'fecha', sort: 'asc' }]
                                }
                            }}
                            pageSize={4}
                            rowsPerPageOptions={[4]}
                        />
                    </Card>
                </Grid>
            </Grid>
        </>
    )
}