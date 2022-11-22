import { useState, useEffect } from 'react';
import { Grid, Card, Typography, Button, Autocomplete } from '@mui/material';
import { getComarcas, getPoblaciones, getProvincias } from '../../api/apiBackend';
import axios from "axios";
import { Modal, TextField } from '@material-ui/core';

import { MainLayout } from "../../layout/MainLayout";
import { ModalLayout, ModalPopup } from "../ModalLayout";

import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CancelIcon from '@mui/icons-material/Cancel';

import { DataGrid } from '@mui/x-data-grid';
import { GridToolbar } from '@mui/x-data-grid-premium';
import { DATAGRID_LOCALE_TEXT } from '../../helpers/datagridLocale';

import { InsertarContactoModal } from './InsertarContactoModal';
import { EditarContactoModal } from './EditarContactoModal';
import { insertarBotonesModal } from '../../helpers/insertarBotonesModal';

const token = {
    headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
    }
};

export const EditarClienteModal = ({ change: handleChange, autocompleteChange, clienteSeleccionado }) => {

    // Declaramos variables necesarias
    const [comarcas, setComarcas] = useState([]);
    const [provincias, setProvincias] = useState([]);
    const [poblaciones, setPoblaciones] = useState([]);

    const [contactoSeleccionado, setContactoSeleccionado] = useState({

        id: 0,
        nombre: '',
        telefono: '',
        email: '',
        cargo: '',
        comentarios: '',
        idCliente: "",
        addDate: null,
        addIdUser: null,
        modDate: null,
        modIdUser: null,
        delDate: null,
        delIdUser: null,
        deleted: null,
    });

    const [ContactoClienteEliminar, setContactoClienteEliminar] = useState([]);


    const [data, setData] = useState([]);

    const [rowsIds, setRowsIds] = useState([]);
    const [rows, setRows] = useState([]);

    const [modalInsertar, setModalInsertar] = useState(false);

    const [modalEditar, setModalEditar] = useState(false);

    const [modalEliminar, setModalEliminar] = useState(false);

    const [snackData, setSnackData] = useState({ open: false, msg: 'Testing', severity: 'success' });


    const columns = [
        { field: 'codigoCliente', headerName: 'CódigoCliente', width: 120 },
        { field: 'nombre', headerName: 'Nombre', width: 150 },
        { field: 'telefono', headerName: 'Telefono', width: 150 },
        { field: 'email', headerName: 'Email', width: 130 },
        { field: 'cargo', headerName: 'Cargo', width: 200 },
        { field: 'comentarios', headerName: 'Comentarios', width: 250 },
    ]

    // Obtener la lista de Comarcas
    useEffect(() => {

        getComarcas()
            .then(comarcas => {
                setComarcas(comarcas);
            });

        peticionGet();

    }, []);

    // Obtener la lista de Provincias
    useEffect(() => {

        getProvincias()
            .then(provincias => {
                setProvincias(provincias);
            });

    }, []);

    // Obtener la lista de Poblaciones
    useEffect(() => {

        getPoblaciones()
            .then(poblaciones => {
                setPoblaciones(poblaciones);
            });

    }, []);

    useEffect(() => {

        if (data.length > 0) {
            setRows(data);
        }

    }, [data]);

    const handleChangeContacto = e => {

        const { name, value } = e.target;
        setContactoSeleccionado(prevState => ({
            ...prevState,
            [e.target.name]: e.target.type === 'number' ? parseInt(e.target.value) : e.target.value
        }));

    }

    const peticionGet = async () => {
        axios.get("/clientescontactos", token).then(response => {
            setData(response.data.data)
        })
    }

    const peticionPostContacto = async () => {
        console.log("Peticion Post ejecutandose");
        contactoSeleccionado.id = null;
        await axios.post("/clientescontactos", contactoSeleccionado, token)
            .then(response => {
                abrirCerrarModalInsertar();
                peticionGet();
                setContactoSeleccionado({
                    id: 0,
                    nombre: '',
                    telefono: '',
                    email: '',
                    cargo: '',
                    comentarios: '',
                    idCliente: "",
                    addDate: null,
                    addIdUser: null,
                    modDate: null,
                    modIdUser: null,
                    delDate: null,
                    delIdUser: null,
                    deleted: null,
                })
            })
            .catch(error => {
                console.log(error);
            })
    }

    const peticionDeleteContacto = async () => {
        var i = 0;
        while (i < ContactoClienteEliminar.length) {
            await axios.delete("/clientescontactos/" + ContactoClienteEliminar[i], token)
                .then(response => {
                    peticionGet();
                    abrirCerrarModalEliminar();
                    setContactoSeleccionado({
                        id: 0,
                        nombre: '',
                        telefono: '',
                        email: '',
                        cargo: '',
                        comentarios: '',
                        idCliente: "",
                        addDate: null,
                        addIdUser: null,
                        modDate: null,
                        modIdUser: null,
                        delDate: null,
                        delIdUser: null,
                        deleted: null,
                    })
                }).catch(error => {
                    console.log(error);
                })
            i++;
        }
    }

    const peticionPutContacto = async () => {
        await axios.put("/clientescontactos?id=" + contactoSeleccionado.id, contactoSeleccionado, token)
            .then(response => {
                var contactoModificado = data;
                contactoModificado.map(contacto => {
                    if (contacto.id === contactoSeleccionado.id) {
                        contacto = contactoSeleccionado
                    }
                });
                peticionGet();
                abrirCerrarModalEditar();
                setContactoSeleccionado({
                    id: 0,
                    nombre: '',
                    telefono: '',
                    email: '',
                    cargo: '',
                    comentarios: '',
                    idCliente: "",
                    addDate: null,
                    addIdUser: null,
                    modDate: null,
                    modIdUser: null,
                    delDate: null,
                    delIdUser: null,
                    deleted: null,
                })
            }).catch(error => {
                console.log(error);
            })
    }

    const abrirCerrarModalInsertar = () => {
        if (modalInsertar) {
            setContactoSeleccionado({
                id: 0,
                nombre: '',
                telefono: '',
                email: '',
                cargo: '',
                comentarios: '',
                idCliente: "",
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

    //modal editar cliente
    const abrirCerrarModalEditar = () => {
        if (modalEditar) {
            setContactoSeleccionado({
                id: 0,
                nombre: '',
                telefono: '',
                email: '',
                cargo: '',
                comentarios: '',
                idCliente: "",
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

    //modal eliminar cliente

    const abrirCerrarModalEliminar = () => {
        if (modalEliminar) {
            setContactoSeleccionado({
                id: 0,
                nombre: '',
                telefono: '',
                email: '',
                cargo: '',
                comentarios: '',
                idCliente: "",
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

    const handleSelectRow = (ids) => {

        if (ids.length > 0) {
            setContactoSeleccionado(data.filter(contacto => contacto.id === ids[0])[0]);
        } else {
            setContactoSeleccionado(contactoSeleccionado);
        }
        setRowsIds(ids);
    }

    return (
        <>
            <Grid item xs={3} md={4}>
                <TextField sx={{ width: '100%' }} label="Código" name="codigo" type="number" onChange={handleChange} value={clienteSeleccionado && clienteSeleccionado.codigo} />
            </Grid>

            <Grid item xs={3} md={4}>
                <TextField sx={{ width: '100%' }} label="CIF" name="cif" onChange={handleChange} value={clienteSeleccionado && clienteSeleccionado.cif} />
            </Grid>

            <Grid item xs={6} md={4}>
                <TextField sx={{ width: '100%' }} label="Razón social" name="razonSocial" onChange={handleChange} value={clienteSeleccionado && clienteSeleccionado.razonSocial} />
            </Grid>

            <Grid item xs={6} md={3}>
                <TextField sx={{ width: '100%' }} label="Teléfono" name="telefono" onChange={handleChange} value={clienteSeleccionado && clienteSeleccionado.telefono} />
            </Grid>

            <Grid item xs={6} md={3}>
                <TextField sx={{ width: '100%' }} label="Móvil" name="movil" onChange={handleChange} value={clienteSeleccionado && clienteSeleccionado.movil} />
            </Grid>

            <Grid item xs={12} md={6}>
                <TextField sx={{ width: '100%' }} label="Email" name="email" type="email" onChange={handleChange} value={clienteSeleccionado && clienteSeleccionado.email} />
            </Grid>

            <Grid item xs={8} md={9}>
                <TextField sx={{ width: '100%' }} label="Dirección" name="direccion" onChange={handleChange} value={clienteSeleccionado && clienteSeleccionado.direccion} />
            </Grid>

            <Grid item xs={4} md={3}>
                <TextField sx={{ width: '100%' }} label="CP" name="cp" onChange={handleChange} value={clienteSeleccionado && clienteSeleccionado.cp} />
            </Grid>

            {/* Desplegable de Comarcas */}
            <Grid item xs={6} md={4}>
                <Autocomplete
                    disableClearable={true}
                    id="comarca"
                    options={comarcas}
                    getOptionLabel={option => option.descripcion}
                    inputValue={ clienteSeleccionado.comarca }
                    renderInput={params => <TextField {...params} label="Comarca" name="comarca" />}
                    onChange={autocompleteChange}
                />
            </Grid>

            {/* Desplegable de Provincias */}

            <Grid item xs={ 6 } md={ 4 }>
                <TextField sx={{ width: '100%' }} label="Província" name="provincia" onChange={handleChange} value={clienteSeleccionado && clienteSeleccionado.provincia} />
            </Grid>

            {/* Deplegable de Poblaciones */}

            <Grid item xs={ 12 } md={ 8 }>
                <TextField sx={{ width: '100%' }} label="Población" name="poblacion" onChange={handleChange} value={clienteSeleccionado && clienteSeleccionado.poblacion} />
            </Grid>

            {/*<Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} open={snackData.open} autoHideDuration={6000} onClose={handleSnackClose} TransitionComponent={(props) => (<Slide {...props} direction="left" />)} >
                    <Alert onClose={handleSnackClose} severity={snackData.severity} sx={{ width: '100%' }}>
                        {snackData.msg}
                    </Alert>
                </Snackbar>*/}

            <Grid container spacing={2}>

                {/* Título y botones de opción */}
                <Grid item xs={12}>
                    <Card sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant='h6'>Listado de Contactos</Typography>
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
                                                setContactoClienteEliminar(rowsIds)
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

                {/* Tabla donde se muestran los registros de los clientes */}
                <Grid item xs={12}>
                    <Card>
                        <DataGrid
                            components={{ Toolbar: GridToolbar }}
                            localeText={DATAGRID_LOCALE_TEXT}
                            sx={{
                                width: '100%',
                                height: 700,
                                backgroundColor: '#FFFFFF'
                            }}
                            rows={rows}
                            columns={columns}
                            pageSize={9}
                            rowsPerPageOptions={[9]}
                            checkboxSelection
                            disableSelectionOnClick
                            onSelectionModelChange={(ids) => handleSelectRow(ids)}
                            onRowClick={(contactoSeleccionado, evt) => {
                                setContactoSeleccionado(contactoSeleccionado.row)
                                abrirCerrarModalEditar();
                            }}
                        />
                    </Card>
                </Grid>
            </Grid>

            <ModalLayout
                titulo="Agregar nuevo contacto"
                contenido={
                    <InsertarContactoModal change={handleChangeContacto} />
                }
                botones={[
                    insertarBotonesModal(<AddIcon />, 'Añadir', async () => {
                        abrirCerrarModalInsertar();

                        if (peticionPostContacto()) {
                            setSnackData({ open: true, msg: 'Contacto añadido correctamente', severity: 'success' });
                        } else {
                            setSnackData({ open: true, msg: 'Ha habido un error al añadir el contacto', severity: 'error' })
                        }

                    }, 'success')
                ]}
                open={modalInsertar}
                onClose={abrirCerrarModalInsertar}
            />
            {/* Modal Editar Cliente*/}

            <ModalLayout
                titulo="Editar contacto"
                contenido={
                    <EditarContactoModal
                        contactoSeleccionado={contactoSeleccionado}
                        change={handleChangeContacto}
                    />}
                botones={[insertarBotonesModal(<AddIcon />, 'Editar', async () => {
                    abrirCerrarModalEditar()

                    if (peticionPutContacto()) {
                        setSnackData({ open: true, msg: 'Contacto editado correctamente', severity: 'success' });
                    } else {
                        setSnackData({ open: true, msg: 'Ha habido un error al editar el contacto', severity: 'error' })
                    }
                })
                ]}
                open={modalEditar}
                onClose={abrirCerrarModalEditar}
            />

            {/* Eliminar cliente */}
            <ModalLayout
                titulo="Eliminar contacto"
                contenido={
                    <>
                        <Grid item xs={12}>
                            <Typography>Estás seguro que deseas eliminar el contacto?</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography><b>{contactoSeleccionado.nombre}</b></Typography>
                        </Grid>
                    </>
                }
                botones={[
                    insertarBotonesModal(<DeleteIcon />, 'Eliminar', async () => {
                        abrirCerrarModalEliminar();

                        if (peticionDeleteContacto()) {
                            setSnackData({ open: true, msg: `Contacto eliminado correctamente: ${contactoSeleccionado.nombre}`, severity: 'success' });
                        } else {
                            setSnackData({ open: true, msg: 'Ha habido un error al eliminar el contacto', severity: 'error' })
                        }

                    }, 'error'),
                    insertarBotonesModal(<CancelIcon />, 'Cancelar', () => abrirCerrarModalEliminar(), 'success')
                ]}
                open={modalEliminar}
                onClose={abrirCerrarModalEliminar}
            />
        </>
    )
}