import React, { useState, useEffect } from "react";
import { Grid, Card, Typography, Button, TextField, InputAdornment, IconButton, Autocomplete, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import EuroIcon from '@mui/icons-material/Euro';
import SearchIcon from '@mui/icons-material/Search';
import { MainLayout } from "../layout/MainLayout";
import { DATAGRID_LOCALE_TEXT } from '../helpers/datagridLocale';
import { insertarBotonesModal } from '../helpers/insertarBotonesModal';
import { ModalLayout } from "../components/ModalLayout";
import { getOfertas, getAnalisis, getElementosPlanta, getUsuarios, getParametrosAnalisisPlanta, getFicheros, putParametrosAnalisisPlanta, getParametrosAnalisisById } from "../api";

import Swal from 'sweetalert2';

export const FacturacionPage = () => {

    const [rows, setRows] = useState([]);
    const [rowsIds, setRowsIds] = useState([]);

    const [data, setData] = useState([]);

    const [ficheros, setFicheros] = useState([]);
    const [filterText, setFilterText] = useState('');
    const [filterOferta, setFilterOferta] = useState(0);
    const [filterDateFrom, setFilterDateFrom] = useState('');
    const [filterDateTo, setFilterDateTo] = useState('');
    const [filterFacturado, setFilterFacturado] = useState('no');

    const [modalFacturar, setModalFacturar] = useState(false);

    const [analisis, setAnalisis] = useState([]);
    const [ofertas, setOfertas] = useState([]);
    const [operarios, setOperarios] = useState([]);
    const [elementosplanta, setElementosPlanta] = useState([]);
    const [tareasIds, setTareasIds] = useState([]);
    const [tareaSeleccionada, setTareaSeleccionada] = useState({
        id: 0,
        codigoCliente: 0,
        nombreCliente: '',
        oferta: 0,
        pedido: 0,
        elemento: 0,
        nombreElemento: '',
        periodo: '',
        analisis: 0,
        fecha: null,
        recogido: false,
        fechaRecogido: null,
        realizado: false,
        fechaRealizado: null,
        observaciones: '',
        pdf: 0,
        recibido: false,
        fechaPdf: null,
        resultado: '',
        textoCorreo: '',
        facturado: false,
        numeroFacturado: '',
        cancelado: false,
        comentarios: '',
        incorrecto: false,
        noValido: false,
        addDate: null,
        addIdUser: null,
        modDate: null,
        modIdUser: null,
        delDate: null,
        delIdUser: null,
        deleted: null,
    });

    const columnas = [
        //visibles
        { headerName: 'Cliente', field: 'codigoCliente', width: 120 },
        { headerName: 'Nombre Cliente', field: 'nombreCliente', width: 250 },
        {
            headerName: 'Operario',
            field: 'operario',
            width: 300,
            valueFormatter: (params) => {
                const oper = operarios.find((operario) => operario.id === params.value);
                return oper ? oper.nombre + ' ' + oper.apellidos : '';
            }
        },
        {
            headerName: 'Elemento',
            field: 'elemento',
            width: 250,
            valueFormatter: (params) => {

                const elemento = elementosplanta.find((elemento) => elemento.id === params.value);

                if (elemento) {
                    if (elemento.descripcion !== null && elemento.descripcion !== undefined) {
                        return `${elemento.nombre} ${elemento.descripcion}`;
                    } else {
                        return `${elemento.nombre} ${elemento.numero}`;
                    }
                } else {
                    return '';
                }
            }
        },
        {
            headerName: 'Analisis',
            field: 'analisis',
            width: 250,
            valueFormatter: (params) => {
                const analisi = analisis.find((analisi) => analisi.id === params.value);
                return analisi ? analisi.nombre : '';
            }
        },
        { headerName: 'Oferta', field: 'oferta', width: 150 },
        {
            headerName: 'Fecha',
            field: 'fecha',
            width: 150,
            valueFormatter: (params) => {
                const date = new Date(params.value);
                return date.toLocaleDateString();
            }
        },
        { headerName: 'Periodo', field: 'periodo', width: 150 },
        { headerName: 'Recogido', field: 'recogido', type: 'boolean', width: 100 },
        {
            headerName: 'Fecha Recogido',
            field: 'fechaRecogido',
            width: 150,
            valueFormatter: (params) => {
                if (params.value != null) {
                    const date = new Date(params.value);
                    return date.toLocaleDateString();
                } else {
                    const date = "";
                    return date;
                }
            }
        },
        { headerName: 'Realizado/Entregado', field: 'realizado', type: 'boolean', width: 200 },
        {
            headerName: 'Fecha Realizado',
            field: 'fechaRealizado',
            width: 150,
            valueFormatter: (params) => {
                if (params.value != null) {
                    const date = new Date(params.value);
                    return date.toLocaleDateString();
                } else {
                    const date = "";
                    return date;
                }
            }
        },
        { headerName: 'Facturado', field: 'facturado', type: 'boolean', width: 100 },
        { headerName: 'Numero Factura', field: 'numeroFacturado', width: 150 },
        {
            headerName: 'PDF',
            field: 'pdf',
            width: 700,
            valueFormatter: (params) => {
                const fich = ficheros.find((fichero) => fichero.id === params.value)
                return fich ? fich.name : '';
            }
        },
        { headerName: 'PDF Recibido', field: 'recibido', type: 'boolean', width: 100 },
        {
            headerName: 'Fecha PDF',
            field: 'fechaPdf',
            width: 150,
            valueFormatter: (params) => {
                if (params.value != null) {
                    const date = new Date(params.value);
                    return date.toLocaleDateString();
                } else {
                    const date = "";
                    return date;
                }
            }
        },
        { headerName: 'Cancelado', field: 'cancelado', type: 'boolean', width: 100 }
    ];


    const peticionGet = async (facturado = false) => {
        const resp = await getParametrosAnalisisPlanta();
        const tareasFiltradas = resp.filter(tarea => tarea.facturado === facturado && !tarea.deleted);
        setData(tareasFiltradas);
    };

    useEffect(() => {
        peticionGet(false);

        getFicheros()
            .then(resp => setFicheros(resp.filter(fichero => !fichero.deleted)))

        getAnalisis()
            .then(resp => setAnalisis(resp.filter(an => !an.deleted)))

        getOfertas()
            .then(resp => setOfertas(resp.filter(of => !of.deleted)))

        getUsuarios()
            .then(resp => setOperarios(resp.filter(op => !op.deleted)))

        getElementosPlanta()
            .then(resp => setElementosPlanta(resp.filter(elemento => !elemento.deleted)))
    }, [])

    useEffect(() => {

        if (data.length > 0) {
            setRows(data);
        } else {
            setRows([]);
        }

    }, [data]);

    const handleFilterChange = (event) => {
        setFilterText(event.target.value);
    };

    const handleFilterOferta = (event) => {
        if (event.target.innerText !== undefined) {
            setFilterOferta(parseInt(event.target.innerText));
        } else {
            setFilterOferta(0)
        }
    };

    const handleDateFromChange = (event) => {
        setFilterDateFrom(event.target.value);
    };

    const handleDateToChange = (event) => {
        setFilterDateTo(event.target.value);
    };

    const handleFilterFacturado = async (event) => {
        const selectedValue = event.target.value;
        setFilterFacturado(selectedValue);
    
        if (selectedValue === 'yes') {
            await peticionGet(true); // Obtener registros facturados
        } else{
            await peticionGet(false); // Obtener registros no facturados
        }
    };

    const filteredData = rows.filter(item => {
        const isClientMatch = item.nombreCliente.toLowerCase().includes(filterText.toLowerCase());
        const isOfertaActive = filterOferta !== 0 && !isNaN(filterOferta);

        const isOfertaMatch = isOfertaActive ? item.oferta === filterOferta : true;

        const itemDate = new Date(item.fecha); // Asegúrate de que `item.fecha` sea un string o Date válido.
        const isDateFromMatch = filterDateFrom ? itemDate >= new Date(filterDateFrom) : true;
        const isDateToMatch = filterDateTo ? itemDate <= new Date(filterDateTo) : true;

        return isClientMatch && isOfertaMatch && isDateFromMatch && isDateToMatch;
    });

    const handleSelectRow = (ids) => {

        if (ids.length > 0) {
            setTareaSeleccionada(data.filter(tarea => tarea.id === ids[0])[0]);
        } else {
            setTareaSeleccionada(tareaSeleccionada);
        }

        setRowsIds(ids);

    }

    const peticionFacturacion = async () => {
        var i = 0;

        while (i < tareasIds.length) {

            const tarea = await getParametrosAnalisisById(tareasIds[i])
            tarea.facturado = true;

            await putParametrosAnalisisPlanta(tarea)

            peticionGet();
            abrirCerrarModalFacturar();
            setTareaSeleccionada({
                id: 0,
                codigoCliente: 0,
                nombreCliente: '',
                oferta: 0,
                pedido: 0,
                elemento: 0,
                nombreElemento: '',
                periodo: '',
                analisis: 0,
                fecha: null,
                recogido: false,
                fechaRecogido: null,
                realizado: false,
                fechaRealizado: null,
                observaciones: '',
                pdf: 0,
                recibido: false,
                fechaPdf: null,
                resultado: '',
                textoCorreo: '',
                facturado: false,
                numeroFacturado: '',
                cancelado: false,
                comentarios: '',
                incorrecto: false,
                noValido: false,
                addDate: null,
                addIdUser: null,
                modDate: null,
                modIdUser: null,
                delDate: null,
                delIdUser: null,
                deleted: null,
            })
            i++;
        }
        Swal.fire({
            position: 'center',
            icon: 'info',
            title: 'Tarea Facturadas',
            text: `Las tareas se han facturado correctamente`,
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

    // modal eliminar mantenimiento
    const abrirCerrarModalFacturar = () => {
        if (modalFacturar) {
            setTareaSeleccionada({
                id: 0,
                codigoCliente: 0,
                nombreCliente: '',
                oferta: 0,
                pedido: 0,
                elemento: 0,
                nombreElemento: '',
                periodo: '',
                analisis: 0,
                fecha: null,
                recogido: false,
                fechaRecogido: null,
                realizado: false,
                fechaRealizado: null,
                observaciones: '',
                pdf: 0,
                recibido: false,
                fechaPdf: null,
                resultado: '',
                textoCorreo: '',
                facturado: false,
                numeroFacturado: '',
                cancelado: false,
                comentarios: '',
                incorrecto: false,
                noValido: false,
                addDate: null,
                addIdUser: null,
                modDate: null,
                modIdUser: null,
                delDate: null,
                delIdUser: null,
                deleted: null,
            })
            setModalFacturar(!modalFacturar);
        } else {
            setModalFacturar(!modalFacturar);
        }
    }

    return (
        <>
            {
                <MainLayout title="Facturación">
                    <Grid container spacing={3}>
                        {/* Título y botones de opción */}
                        <Grid item xs={12}>
                            <Card sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
                                <Typography variant='h6'>Listado de Tareas a Facturar</Typography>
                                <Grid item xs={2}>
                                    <TextField
                                        label="Filtrar cliente"
                                        variant="outlined"
                                        value={filterText}
                                        onChange={handleFilterChange}
                                        sx={{ width: '90%' }}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton>
                                                        <SearchIcon />
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={2}>
                                    <Autocomplete
                                        sx={{ width: '90%' }}
                                        id="Oferta"
                                        options={ofertas}
                                        filterOptions={options => ofertas.filter(oferta => !oferta.deleted)}
                                        getOptionLabel={option => option.numeroOferta.toString()}
                                        renderInput={(params) => <TextField {...params} label="Filtrar por oferta" name="oferta" />}
                                        onChange={handleFilterOferta}
                                    />
                                </Grid>
                                <Grid item xs={2}>
                                    <TextField
                                        label="Desde"
                                        type="date"
                                        value={filterDateFrom}
                                        onChange={handleDateFromChange}
                                        sx={{ width: '80%' }}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={2}>
                                    <TextField
                                        label="Hasta"
                                        type="date"
                                        value={filterDateTo}
                                        onChange={handleDateToChange}
                                        sx={{ width: '80%' }}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={2}>
                                    <FormControl fullWidth>
                                        <InputLabel>Facturado</InputLabel>
                                        <Select
                                            value={filterFacturado}
                                            onChange={handleFilterFacturado}
                                            label="Facturado"
                                            sx={{ width: '50%'}}
                                        >
                                            <MenuItem value="no">No</MenuItem>
                                            <MenuItem value="yes">Sí</MenuItem> 
                                        </Select>
                                    </FormControl>
                                </Grid>
                                {
                                    (rowsIds.length > 0) &&
                                    (
                                        <Grid item>
                                            <Button
                                                sx={{ height: '40px' }}
                                                color='info'
                                                variant='contained'
                                                startIcon={<EuroIcon />}
                                                onClick={(event, rowData) => {
                                                    setTareasIds(rowsIds)
                                                    abrirCerrarModalFacturar()
                                                }}
                                            >
                                                Facturar
                                            </Button>
                                        </Grid>
                                    )
                                }
                            </Card>
                        </Grid>


                        {/* Tabla donde se muestran los registros de los clientes */}
                        <Grid item xs={12}>
                            <Card>
                                <DataGrid
                                    localeText={DATAGRID_LOCALE_TEXT}
                                    sx={{
                                        width: '100%',
                                        height: 1000,
                                        backgroundColor: '#FFFFFF'
                                    }}
                                    rows={filteredData}
                                    columns={columnas}
                                    pageSize={100}
                                    initialState={{
                                        sorting: {
                                            sortModel: [{ field: 'fecha', sort: 'asc' }]
                                        }
                                    }}
                                    checkboxSelection
                                    disableSelectionOnClick
                                    onSelectionModelChange={(ids) => handleSelectRow(ids)}
                                    isRowSelectable={(params) => !params.row.facturado}
                                />
                            </Card>
                        </Grid>
                    </Grid>

                    <ModalLayout
                        titulo="Facturación de tareas"
                        contenido={
                            <>
                                <Grid item xs={12}>
                                    <Typography>Estás seguro que deseas facturar estas tareas?</Typography>
                                </Grid>
                            </>
                        }
                        botones={[
                            insertarBotonesModal(<EuroIcon />, 'Facturar', async () => {
                                peticionFacturacion();
                            })
                        ]}
                        open={modalFacturar}
                        onClose={abrirCerrarModalFacturar}
                    />
                </MainLayout>
            }
        </>

    );
}