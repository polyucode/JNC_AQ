import React, { useState, useEffect } from 'react';
import { Grid, Card, Typography, Button, TextField, Autocomplete } from '@mui/material';
import TextareaAutosize from '@mui/base/TextareaAutosize';

import MuiAlert from '@mui/material/Alert';

import { DataGrid } from '@mui/x-data-grid';
import { DATAGRID_LOCALE_TEXT } from '../../helpers/datagridLocale';
import { insertarBotonesModal } from '../../helpers/insertarBotonesModal';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CancelIcon from '@mui/icons-material/Cancel';

import { ModalLayout } from "../ModalLayout";
import { InsertarDetalleModal } from './InsertarDetalleModal';
import { EditarDetalleModal } from './EditarDetalleModal';
import { deleteParametrosAnalisisPlanta, postParametrosAnalisisPlanta, putParametrosAnalisisPlantaPorId, getAnalisis, 
    getClientes, getElementos, getOfertas, getParametrosAnalisisPlanta, getUsuarios, getElementosPlanta 
} from '../../api';
import Swal from 'sweetalert2';

const token = {
    headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
    }
};

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const protocolos = [
    {
        value: 'Desinfeccion Parado 4B',
        label: 'Desinfeccion Parado 4B'
    },
    {
        value: 'Desinfeccion Continuo 4B',
        label: 'Desinfeccion Continuo 4B'
    },
    {
        value: 'Desinfeccion limpieza parado',
        label: 'Desinfeccion limpieza parado'
    },
    {
        value: 'Desinfeccion limpieza continuo',
        label: 'Desinfeccion limpieza continuo'
    },
    {
        value: 'Desinfeccion Protocolo 4C',
        label: 'Desinfeccion Protocolo 4C'
    },
    {
        value: 'Desinfeccion de aporte',
        label: 'Desinfeccion de aporte'
    },
    {
        value: 'Desinfeccion contraincendios',
        label: 'Desinfeccion contraincendios'
    },
    {
        value: 'Desinfeccion parado fuente ornamental',
        label: 'Desinfeccion parado fuente ornamental'
    },
    {
        value: 'Desinfeccion ACS (termico)',
        label: 'Desinfeccion ACS (termico)'
    },
    {
        value: 'Desinfeccion AFCH (cloracion)',
        label: 'Desinfeccion AFCH (cloracion)'
    }
]

const tipos = [
    { id: 1, nombre: "Mensual" },
    { id: 2, nombre: "Bimensual" },
    { id: 3, nombre: "Trimestral" },
    { id: 4, nombre: "Semestral" },
    { id: 5, nombre: "Anual" }
]

export const EditarTareaModal = ({ handleChange, autocompleteChange, tareaSeleccionada, handleChangeFecha, setTareaSeleccionada, handleChangeAnalisis, estadoProtocolo, estadoOperario, codigoClienteEditar, tecnicoTareaEditar, tipoTareaEditar, elementosAutocomplete, analisisAutocomplete, elementoTareaEditar, analisisEditar, errorFecha, handlePdf, fileChange }) => {


    const [modalInsertar, setModalInsertar] = useState(false);

    const [modalEditar, setModalEditar] = useState(false);

    const [modalEliminar, setModalEliminar] = useState(false);

    const [rows, setRows] = useState([]);
    const [rowsIds, setRowsIds] = useState([]);

    const [data, setData] = useState([]);

    const [AnalisisEliminar, setAnalisisEliminar] = useState([]);

    const [analisisSeleccionado, setAnalisisSeleccionado] = useState({
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
        facturado: false,
        numeroFacturado: '',
        cancelado: false,
        comentarios: '',
        addDate: null,
        addIdUser: null,
        modDate: null,
        modIdUser: null,
        delDate: null,
        delIdUser: null,
        deleted: null,
    });

    // Declaramos variables necesarias
    const [clientes, setClientes] = useState([]);
    const [ofertas, setOfertas] = useState([]);
    const [elementos, setElementos] = useState([]);
    const [analisis, setAnalisis] = useState([]);
    const [operarios, setOperarios] = useState([]);

    const [snackData, setSnackData] = useState({ open: false, msg: 'Testing', severity: 'success' });

    const columns = [
        { headerName: 'Periodo', field: 'periodo', width: 150 },
        { 
            headerName: 'Fecha', 
            field: 'fecha',  
            width: 150,
            valueFormatter: (params) => {
                const date = new Date(params.value);
                return date.toLocaleDateString();
            }
        },
        { headerName: 'Recogido', field: 'recogido', type: 'boolean', width: 100 },
        { 
            headerName: 'Fecha Recogido', 
            field: 'fechaRecogido', 
            width: 150,
            valueFormatter: (params) => {
                if(params.value != null){
                    const date = new Date(params.value);
                    return date.toLocaleDateString();
                } else{
                    const date = "";
                    return date;
                }
            } 
        },
        { headerName: 'Realizado', field: 'realizado', type: 'boolean', width: 100 },
        { 
            headerName: 'Fecha Realizado', 
            field: 'fechaRealizado',
            width: 120,
            valueFormatter: (params) => {
                if(params.value != null){
                    const date = new Date(params.value);
                    return date.toLocaleDateString();
                } else{
                    const date = "";
                    return date;
                }
            }
        },
        { headerName: 'Observaciones', field: 'observaciones', width: 250 },
        { headerName: 'Facturado', field: 'facturado', type: 'boolean', width: 100 },
        { headerName: 'Numero Factura', field: 'numeroFacturado', width: 150 },
        { headerName: 'PDF', field: 'pdf', width: 150 },
        { headerName: 'PDF Recibido', field: 'recibido', type: 'boolean', width: 100 },
        { 
            headerName: 'Fecha PDF', 
            field: 'fechaPdf', 
            width: 150,
            valueFormatter: (params) => {
                if(params.value != null){
                    const date = new Date(params.value);
                    return date.toLocaleDateString();
                } else{
                    const date = "";
                    return date;
                }
            }
        },
        { headerName: 'Cancelado', field: 'cancelado', type: 'boolean', width: 100 },
        { headerName: 'Comentario', field: 'comentario', width: 200 }
    ];

    const peticionGet = async () => {

        const resp = await getParametrosAnalisisPlanta();
        setData(resp.filter(analisi => analisi.codigoCliente === tareaSeleccionada.codigoCliente && analisi.oferta === tareaSeleccionada.oferta && analisi.elemento === tareaSeleccionada.elemento && analisi.analisis === tareaSeleccionada.analisis));

    }

    useEffect(() => {

        getClientes()
            .then(clientes => {
                setClientes(clientes);
            });

        getOfertas()
            .then(ofertas => {
                setOfertas(ofertas);
            })

        getElementosPlanta()
            .then(elementos => {
                setElementos(elementos);
            })

        getAnalisis()
            .then(analisis => {
                setAnalisis(analisis)
            })

        getUsuarios()
            .then(operarios => {
                setOperarios(operarios)
            })

        peticionGet();

    }, []);

    function formateandofechas(fecha) {
        if(fecha !== null){
            const fecha1 = new Date(fecha)

            const fecha2 = fecha1.getFullYear() +
                '-' + String(fecha1.getMonth() + 1).padStart(2, '0') +
                '-' + String(fecha1.getDate()).padStart(2, '0')
    
            return fecha2
        } else{
            return null
        }       
    }

    const handleChangeDet = e => {
        const { name, value } = e.target;
        setAnalisisSeleccionado(prevState => ({
            ...prevState,
            [e.target.name]: e.target.type === 'number' ? parseInt(e.target.value) : e.target.value
        }));
    }

    const handleChangeDetFecha = e => {
        const { name, value } = e.target;
        setAnalisisSeleccionado(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleChangeCheckbox = e => {
        const { name, value, checked } = e.target
        setAnalisisSeleccionado(prevState => ({
            ...prevState,
            [name]: checked
        }))
    }

    //modal insertar detalle
    const abrirCerrarModalInsertar = () => {
        if (modalInsertar) {
            setAnalisisSeleccionado({
                id: 0,
                codigoCliente: 0,
                nombreCliente: '',
                oferta: 0,
                pedido: 0,
                elemento: 0,
                periodo: '',
                analisis: 0,
                fecha: null,
                recogido: false,
                fechaRecogido: null,
                realizado: false,
                fechaRealizado: null,
                operario: '',
                protocolo: '',
                observaciones: '',
                facturado: false,
                numeroFacturado: '',
                cancelado: false,
                comentarios: '',
                addDate: null,
                addIdUser: null,
                modDate: null,
                modIdUser: null,
                delDate: null,
                delIdUser: null,
                deleted: null,
            })
            setModalInsertar(!modalInsertar);
        } else {
            setModalInsertar(!modalInsertar);
        }
    }

    //modal editar detalle

    const abrirCerrarModalEditar = () => {
        if (modalEditar) {
            setAnalisisSeleccionado({
                id: 0,
                codigoCliente: 0,
                nombreCliente: '',
                oferta: 0,
                pedido: 0,
                elemento: 0,
                periodo: '',
                analisis: 0,
                fecha: null,
                recogido: false,
                fechaRecogido: null,
                realizado: false,
                fechaRealizado: null,
                operario: '',
                protocolo: '',
                observaciones: '',
                facturado: false,
                numeroFacturado: '',
                cancelado: false,
                comentarios: '',
                addDate: null,
                addIdUser: null,
                modDate: null,
                modIdUser: null,
                delDate: null,
                delIdUser: null,
                deleted: null,
            })
            setModalEditar(!modalEditar);
        } else {
            setModalEditar(!modalEditar);
        }
    }

    // modal eliminar detalle
    const abrirCerrarModalEliminar = () => {
        if (modalEliminar) {
            setAnalisisSeleccionado({
                id: 0,
                codigoCliente: 0,
                nombreCliente: '',
                oferta: 0,
                pedido: 0,
                elemento: 0,
                periodo: '',
                analisis: 0,
                fecha: null,
                recogido: false,
                fechaRecogido: null,
                realizado: false,
                fechaRealizado: null,
                operario: '',
                protocolo: '',
                observaciones: '',
                facturado: false,
                numeroFacturado: '',
                cancelado: false,
                comentarios: '',
                addDate: null,
                addIdUser: null,
                modDate: null,
                modIdUser: null,
                delDate: null,
                delIdUser: null,
                deleted: null,
            })
            setModalEliminar(!modalEliminar);
        } else {
            setModalEliminar(!modalEliminar);
        }
    }

    const peticionPost = async () => {
        analisisSeleccionado.id = 0;
        analisisSeleccionado.codigoCliente = tareaSeleccionada.codigoCliente;
        analisisSeleccionado.nombreCliente = tareaSeleccionada.nombreCliente;
        analisisSeleccionado.oferta = tareaSeleccionada.oferta;
        analisisSeleccionado.analisis = tareaSeleccionada.analisis;
        analisisSeleccionado.pedido = tareaSeleccionada.pedido;
        analisisSeleccionado.elemento = tareaSeleccionada.elemento;
        analisisSeleccionado.operario = tareaSeleccionada.operario;
        if(analisisSeleccionado.nombreElemento != null || analisisSeleccionado.nombreElemento != ""){
            analisisSeleccionado.nombreElemento = elementoTareaEditar[0].descripcion != null ? elementoTareaEditar[0].nombre + " " + elementoTareaEditar[0].descripcion : elementoTareaEditar[0].nombre + " " + elementoTareaEditar[0].numero;
        }
        
        const resp = await postParametrosAnalisisPlanta(analisisSeleccionado);

        abrirCerrarModalInsertar();
        peticionGet();
        setAnalisisSeleccionado({
            id: 0,
            codigoCliente: 0,
            nombreCliente: '',
            oferta: 0,
            pedido: 0,
            elemento: 0,
            nombreElemento: "",
            periodo: '',
            analisis: 0,
            fecha: null,
            recogido: false,
            fechaRecogido: null,
            realizado: false,
            fechaRealizado: null,
            operario: 0,
            observaciones: '',
            facturado: false,
            numeroFacturado: '',
            cancelado: false,
            comentarios: '',
            addDate: null,
            addIdUser: null,
            modDate: null,
            modIdUser: null,
            delDate: null,
            delIdUser: null,
            deleted: null,
        });

        Swal.fire({
            position: 'center',
            icon: 'info',
            title: 'Tarea Creada',
            text: `La tarea se ha creado correctamente`,
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

    const peticionPut = async () => {
        
        const resp = await putParametrosAnalisisPlantaPorId(analisisSeleccionado);
        
        var analisisModificado = data;
        analisisModificado.map(analisis => {
            if (analisis.id === analisisSeleccionado.id) {
                analisis = analisisSeleccionado
            }
        });

        abrirCerrarModalEditar();
        peticionGet();
        setAnalisisSeleccionado({
            id: 0,
            codigoCliente: 0,
            nombreCliente: '',
            oferta: 0,
            pedido: 0,
            elemento: 0,
            nombreElemento: "",
            periodo: '',
            analisis: 0,
            fecha: null,
            recogido: false,
            fechaRecogido: null,
            realizado: false,
            fechaRealizado: null,
            operario: 0,
            observaciones: '',
            facturado: false,
            numeroFacturado: '',
            cancelado: false,
            comentarios: '',
            addDate: null,
            addIdUser: null,
            modDate: null,
            modIdUser: null,
            delDate: null,
            delIdUser: null,
            deleted: null,
        });

        Swal.fire({
            position: 'center',
            icon: 'info',
            title: 'Tarea Editada',
            text: `La tarea se ha editado correctamente`,
            showConfirmButton: false,
            timer: 2000,
            showClass: {
                popup: 'animate__animated animate__bounceIn'
            },
            hideClass: {
                popup: 'animate__animated animate__bounceOut'
            }
        })

    }

    const peticionDelete = async () => {

        var i = 0;
        while (i < AnalisisEliminar.length) {

            const resp = await deleteParametrosAnalisisPlanta(AnalisisEliminar[i]);

            peticionGet();
            abrirCerrarModalEliminar();
            setAnalisisSeleccionado({
                id: 0,
                codigoCliente: 0,
                nombreCliente: '',
                oferta: 0,
                pedido: 0,
                elemento: 0,
                periodo: '',
                analisis: 0,
                fecha: null,
                recogido: false,
                fechaRecogido: null,
                realizado: false,
                fechaRealizado: null,
                operario: 0,
                observaciones: '',
                facturado: false,
                numeroFacturado: '',
                cancelado: false,
                comentarios: '',
                addDate: null,
                addIdUser: null,
                modDate: null,
                modIdUser: null,
                delDate: null,
                delIdUser: null,
                deleted: null,
            });

            i++;
        }

        Swal.fire({
            position: 'center',
            icon: 'info',
            title: 'Tarea Eliminada',
            text: `La tarea se ha eliminado correctamente`,
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

    const handleSelectRow = (ids) => {

        if (ids.length > 0) {
            setAnalisisSeleccionado(data.filter(analisis => analisis.id === ids[0])[0]);
        } else {
            setAnalisisSeleccionado(analisisSeleccionado);
        }

        setRowsIds(ids);

    }

    return (
        <>
            <Grid item xs={3} md={3}>
                <Autocomplete
                    disableClearable={true}
                    id="CboClientes"
                    options={clientes}
                    getOptionLabel={option => option.codigo.toString()}
                    defaultValue={codigoClienteEditar[0]}
                    sx={{ width: '100%' }}
                    renderInput={(params) => <TextField {...params} label="Codigo Cliente" name="codigoCliente" />}
                    onChange={(event, value) => setTareaSeleccionada(prevState => ({
                        ...prevState,
                        codigoCliente: parseInt(value.codigo),
                        oferta: 0,
                        pedido: 0,
                        elemento: 0,
                        nombreElemento: '',
                        analisis: 0,
                        nombreAnalisis: '',
                    }))}
                />
            </Grid>

            <Grid item xs={3} md={4}>
                <TextField
                    id='nombreCliente'
                    label="Nombre Cliente"
                    sx={{ width: '100%' }}
                    value={tareaSeleccionada && tareaSeleccionada.nombreCliente}
                    name="nombreCliente"
                    onChange={handleChange}
                />
            </Grid>

            <Grid item xs={6} md={3}>
                <Autocomplete
                    disableClearable={true}
                    sx={{ width: '100%' }}
                    id="Oferta"
                    inputValue={tareaSeleccionada.oferta.toString()}
                    options={ofertas}
                    filterOptions={options => ofertas.filter(oferta => oferta.codigoCliente === tareaSeleccionada.codigoCliente)}
                    getOptionLabel={option => option.numeroOferta.toString()}
                    renderInput={(params) => <TextField {...params} label="Oferta" name="oferta" />}
                    onChange={(event, value) => setTareaSeleccionada(prevState => ({
                        ...prevState,
                        oferta: parseInt(value.numeroOferta)
                    }))}
                />
            </Grid>

            <Grid item xs={6} md={3}>
                <TextField
                    id='pedido'
                    sx={{ width: '100%' }}
                    label="Pedido"
                    value={tareaSeleccionada && tareaSeleccionada.pedido}
                    name="pedido"
                    onChange={handleChange}
                />
            </Grid>

            <Grid item xs={8} md={4}>
                <Autocomplete
                    disableClearable={true}
                    id="CboElementosPlanta"
                    inputValue={tareaSeleccionada.nombreElemento}
                    defaultValue={elementoTareaEditar[0]}
                    options={elementosAutocomplete}
                    getOptionLabel={option => option.descripcion !== null ? (option.nombre + ' ' + option.descripcion) : (option.nombre + ' ' + option.numero)}
                    sx={{ width: '100%' }}
                    renderInput={(params) => <TextField {...params} label="Elemento" name="elemento" />}
                    onChange={(event, value) => setTareaSeleccionada(prevState => ({
                        ...prevState,
                        elemento: value.id
                    }))}
                />
            </Grid>

            <Grid item xs={4} md={5}>
                <Autocomplete
                    disableClearable={true}
                    id="analisis"
                    options={analisisAutocomplete}
                    defaultValue={analisisEditar[0]}
                    getOptionLabel={option => option.nombre.toString()}
                    sx={{ width: '100%' }}
                    renderInput={(params) => <TextField {...params} label="Analisis" name="analisis" />}
                    onChange={handleChangeAnalisis}
                />
            </Grid>

            <Grid item xs={6} md={4}>
                <Autocomplete
                    disableClearable={true}
                    sx={{ width: '100%' }}
                    id="Operarios"
                    options={operarios}
                    defaultValue={tecnicoTareaEditar[0]}
                    filterOptions={options => operarios.filter(cliente => cliente.idPerfil === 1004)}
                    getOptionLabel={option => option.nombre + ' ' + option.apellidos}
                    renderInput={(params) => <TextField {...params} label="Operario" name="operario" />}
                    onChange={(event, value) => setTareaSeleccionada(prevState => ({
                        ...prevState,
                        operario: value.id
                    }))}
                />
            </Grid>


            <Grid item xs={12} md={1} style={{ display: 'flex' }}>
                <p> Fecha </p>
            </Grid>
            <Grid item xs={4} md={3} style={{ display: 'flex' }}>
                <TextField
                    id="fecha"
                    type="date"
                    name="fecha"
                    sx={{ width: '100%', marginTop: '22px' }}
                    onChange={handleChangeFecha}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    error={errorFecha}
                    helperText={errorFecha ? 'Introduzca una fecha' : ' '}
                    value={tareaSeleccionada && formateandofechas(tareaSeleccionada.fecha)}
                />
            </Grid>

            <Grid item xs={4} md={3}>
                <Autocomplete
                    disableClearable={true}
                    id="CboTipos"
                    options={tipos}
                    defaultValue={tipoTareaEditar[0]}
                    getOptionLabel={option => option.nombre.toString()}
                    sx={{ width: '100%' }}
                    renderInput={(params) => <TextField {...params} label="Periodicidad" name="tipo" />}
                    onChange={(event, value) => setTareaSeleccionada(prevState => ({
                        ...prevState,
                        tipo: value.id
                    }))}
                />
            </Grid>

            <Grid item xs={6} md={6}>
                <p> Observaciones </p>
                <TextareaAutosize
                    aria-label="empty textarea"
                    minRows={8}
                    style={{ width: '100%', padding: '15px' }}
                    name="observaciones"
                    onChange={handleChange}
                    value={tareaSeleccionada && tareaSeleccionada.observaciones}
                />
            </Grid>

            <Grid item xs={4} md={3}>
                <div class="file-select" id="src-file3" >
                    <input type="file" name="src-file3" label="PDF instrucciones" onChange={handlePdf} />
                </div>
                <Typography> {fileChange ? fileChange.name : "Seleccionar un archivo"} </Typography>
            </Grid>

            <Grid container spacing={2}>

                <Grid item xs={12}>
                    <Card sx={{ p: 4, display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant='h6'>Detalles de la tarea</Typography>
                        {
                            (rowsIds.length > 0) ?
                                (
                                    <Grid item>
                                        <Button
                                            sx={{ mr: 2 }}
                                            color='error'
                                            variant='contained'
                                            startIcon={<DeleteIcon />}
                                            onClick={(event, rowData) => {
                                                setAnalisisEliminar(rowsIds)
                                                abrirCerrarModalEliminar()
                                            }}
                                        >
                                            Eliminar
                                        </Button>
                                    </Grid>
                                ) : (
                                    <Button
                                        color='success'
                                        variant='contained'
                                        startIcon={<AddIcon />}
                                        onClick={abrirCerrarModalInsertar}
                                    >Añadir</Button>
                                )
                        }
                    </Card>
                </Grid>

                <Grid item xs={12}>
                    <Card>
                        <DataGrid
                            localeText={DATAGRID_LOCALE_TEXT}
                            sx={{
                                width: '100%',
                                height: 700,
                                backgroundColor: '#FFFFFF'
                            }}
                            rows={data}
                            columns={columns}
                            initialState={{
                                sorting: {
                                  sortModel: [{ field: 'fecha', sort: 'asc'}]
                                }
                            }}
                            pageSize={12}
                            rowsPerPageOptions={[12]}
                            checkboxSelection
                            disableSelectionOnClick
                            onSelectionModelChange={(ids) => handleSelectRow(ids)}
                            onRowClick={(analisisSeleccionado, evt) => {
                                setAnalisisSeleccionado(analisisSeleccionado.row)
                                abrirCerrarModalEditar();
                            }}
                        />
                    </Card>
                </Grid>
            </Grid>

            <ModalLayout
                titulo="Agregar nuevo detalle"
                contenido={
                    <InsertarDetalleModal
                        handleChangeDet={handleChangeDet}
                        tareaSeleccionada={tareaSeleccionada}
                        handleChangeFecha={handleChangeDetFecha}
                        setAnalisisSeleccionado={setAnalisisSeleccionado}
                        analisisSeleccionado={analisisSeleccionado}
                        analisis={analisis}
                        elementoTareaEditar={elementoTareaEditar}
                        analisisEditar={analisisEditar}
                    />
                }
                botones={[
                    insertarBotonesModal(<AddIcon />, 'Insertar', async () => {
                        peticionPost()
                    })
                ]}
                open={modalInsertar}
                onClose={abrirCerrarModalInsertar}
            />

            <ModalLayout
                titulo="Editar detalle"
                contenido={
                    <EditarDetalleModal
                        setAnalisisSeleccionado={setAnalisisSeleccionado}
                        tareaSeleccionada={tareaSeleccionada}
                        analisisSeleccionado={analisisSeleccionado}
                        change={handleChangeDet}
                        handleChangeFecha={handleChangeDetFecha}
                        handleChangeCheckbox={handleChangeCheckbox}
                        fileChange={fileChange}
                        handlePdf={handlePdf}
                        analisis={analisis}
                        elementos={elementos}
                    />}
                botones={[insertarBotonesModal(<AddIcon />, 'Guardar', async () => {
                    peticionPut()
                })]}
                open={modalEditar}
                onClose={abrirCerrarModalEditar}
            />

            <ModalLayout
                titulo="Eliminar detalle"
                contenido={
                    <>
                        <Grid item xs={12}>
                            <Typography>Estás seguro que deseas eliminar el detalle?</Typography>
                        </Grid>
                    </>
                }
                botones={[
                    insertarBotonesModal(<DeleteIcon />, 'Eliminar', async () => {
                        peticionDelete()
                    }, 'error')
                ]}
                open={modalEliminar}
                onClose={abrirCerrarModalEliminar}
            />

        </>
    )
}