import { useState, useEffect } from 'react';
import { Grid, Card, Typography, Button, TextField, Autocomplete } from '@mui/material';
import { deleteContactos, getComarcas, getPoblaciones, getProvincias, postContactos, putContactos, getContactos } from '../../api';

import { ModalLayout } from "../ModalLayout";

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CancelIcon from '@mui/icons-material/Cancel';

import { DataGrid } from '@mui/x-data-grid';
import { GridToolbar } from '@mui/x-data-grid-premium';
import { DATAGRID_LOCALE_TEXT } from '../../helpers/datagridLocale';

import { InsertarContactoModal } from './InsertarContactoModal';
import { EditarContactoModal } from './EditarContactoModal';
import { insertarBotonesModal } from '../../helpers/insertarBotonesModal';
import { useUsuarioActual } from '../../hooks/useUsuarioActual';

const token = {
    headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
    }
};

export const EditarClienteModal = ({ handleChange, autocompleteChange, clienteSeleccionado, comarcaEditar, setClienteSeleccionado, errorCP, errorCodigo, errorTelefono, errorDireccion, errorNombre, errorEmail }) => {

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

    const { usuarioActual } = useUsuarioActual();


    const columns = [
        { field: 'nombre', headerName: 'Nombre', width: 200 },
        { field: 'telefono', headerName: 'Telefono', width: 150 },
        { field: 'email', headerName: 'Email', width: 200 },
        { field: 'cargo', headerName: 'Cargo', width: 200 },
        { field: 'comentarios', headerName: 'Comentarios', width: 350 },
    ]

    // Obtener la lista de Comarcas
    useEffect(() => {

        getComarcas()
            .then(comarcas => {
                setComarcas(comarcas);
            });

        getProvincias()
            .then(provincias => {
                setProvincias(provincias);
            });

        getPoblaciones()
            .then(poblaciones => {
                setPoblaciones(poblaciones);
            });

        peticionGet();

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

        const resp = await getContactos();
        setData(resp.filter(contacto => contacto.codigoCliente === clienteSeleccionado.codigo))

    }

    const peticionPostContacto = async () => {

        contactoSeleccionado.id = null;
        contactoSeleccionado.codigoCliente = clienteSeleccionado.codigo;

        const resp = await postContactos(contactoSeleccionado);

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
        });

    }

    const peticionDeleteContacto = async () => {

        var i = 0;
        while (i < ContactoClienteEliminar.length) {

            const resp = await deleteContactos(ContactoClienteEliminar[i]);

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
            });

            i++;

        }
    }

    const peticionPutContacto = async () => {

        const resp = await putContactos(contactoSeleccionado);

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
            <Grid item xs={3} md={3}>
                <TextField sx={{ width: '100%', marginTop: '20px' }} label="Código" name="codigo" onChange={handleChange} value={clienteSeleccionado && clienteSeleccionado.codigo} error={errorCodigo} helperText={errorCodigo ? 'Este campo es obligatorio' : ' '} />
            </Grid>

            <Grid item xs={3} md={3}>
                <TextField sx={{ width: '100%' }} label="CIF" name="cif" onChange={handleChange} value={clienteSeleccionado && clienteSeleccionado.cif} />
            </Grid>

            <Grid item xs={3} md={6}>
                <TextField sx={{ width: '100%', marginTop: '20px' }} label="Razón social" name="razonSocial" onChange={handleChange} value={clienteSeleccionado && clienteSeleccionado.razonSocial} error={errorNombre} helperText={errorNombre ? 'Este campo es obligatorio' : ' '} />
            </Grid>

            <Grid item xs={3} md={3}>
                <TextField sx={{ width: '100%', marginTop: '20px' }} label="Teléfono" name="telefono" onChange={handleChange} value={clienteSeleccionado && clienteSeleccionado.telefono} error={errorTelefono} helperText={errorTelefono ? 'Este campo es obligatorio' : ' '} />
            </Grid>

            <Grid item xs={3} md={3}>
                <TextField sx={{ width: '100%' }} label="Móvil" name="movil" onChange={handleChange} value={clienteSeleccionado && clienteSeleccionado.movil} />
            </Grid>

            <Grid item xs={3} md={6}>
                <TextField sx={{ width: '100%', marginTop: '20px' }} label="Email" name="email" type="email" onChange={handleChange} value={clienteSeleccionado && clienteSeleccionado.email} error={errorEmail} helperText={errorEmail ? 'Este campo es obligatorio' : ' '} />
            </Grid>

            <Grid item xs={3} md={8}>
                <TextField sx={{ width: '100%', marginTop: '20px' }} label="Dirección" name="direccion" onChange={handleChange} value={clienteSeleccionado && clienteSeleccionado.direccion} error={errorDireccion} helperText={errorDireccion ? 'Este campo es obligatorio' : ' '} />
            </Grid>

            <Grid item xs={3} md={3}>
                <TextField sx={{ width: '100%', marginTop: '20px' }} label="CP" name="cp" onChange={handleChange} value={clienteSeleccionado && clienteSeleccionado.cp} error={errorCP} helperText={errorCP ? 'Este campo es obligatorio' : ' '} />
            </Grid>

            <Grid item xs={3} md={4}>
                <Autocomplete
                    disableClearable={true}
                    id="comarca"
                    options={comarcas}
                    getOptionLabel={option => option.descripcion}
                    defaultValue={comarcaEditar[0]}
                    renderInput={params => <TextField {...params} label="Comarca" name="comarca" />}
                    onChange={(event, value) => setClienteSeleccionado(prevState => ({
                        ...prevState,
                        comarca: value.descripcion
                    }))}
                />
            </Grid>

            <Grid item xs={3} md={4}>
                <TextField sx={{ width: '100%' }} label="Província" name="provincia" onChange={handleChange} value={clienteSeleccionado && clienteSeleccionado.provincia} />
            </Grid>

            <Grid item xs={3} md={4}>
                <TextField sx={{ width: '100%' }} label="Población" name="poblacion" onChange={handleChange} value={clienteSeleccionado && clienteSeleccionado.poblacion} />
            </Grid>

            <Grid container spacing={3}>

                <Grid item xs={12}>
                    <Card sx={{ p: 4, display: 'flex', justifyContent: 'space-between' }}>
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
                            pageSize={4}
                            rowsPerPageOptions={[4]}
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
                key={`contacto-añadir-${contactoSeleccionado.id}`}
                titulo="Agregar nuevo contacto"
                contenido={
                    <InsertarContactoModal change={handleChangeContacto} cliente={clienteSeleccionado} />
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

            <ModalLayout
                key={`contacto-editar-${contactoSeleccionado.id}`}
                titulo="Editar contacto"
                contenido={
                    <EditarContactoModal
                        contactoSeleccionado={contactoSeleccionado}
                        change={handleChangeContacto}
                    />}
                botones={[insertarBotonesModal(<AddIcon />, 'Guardar', async () => {
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

            <ModalLayout
                key={`contacto-eliminar-${contactoSeleccionado.id}`}
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