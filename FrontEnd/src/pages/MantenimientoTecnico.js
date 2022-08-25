import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import { makeStyles } from '@material-ui/core/styles';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import PersonIcon from '@mui/icons-material/Person';
import DeleteIcon from '@mui/icons-material/Delete';
import FolderIcon from '@mui/icons-material/Folder';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import Divider from '@mui/material/Divider';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import './MantenimientoTecnico.css';

const token = {
    headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
    }
};

const useStyles = makeStyles((theme) => ({
    modal: {
        position: 'absolute',
        width: 1050,
        height: 750,
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

const useStyles2 = makeStyles((theme) => ({
    modal: {
        position: 'absolute',
        width: 1150,
        height: 750,
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
        width: '45%',
        height: 55
    }
}));

function MantenimientoTecnico() {

    const [open, setOpen] = React.useState(true);
    const [contextMenu, setContextMenu] = React.useState(null);

    const [clientes, setClientes] = useState([]);
    const [elementos, setElementos] = useState([]);
    const [ofertas, setOfertas] = useState([]);

    const [confAnalisisNivelesPlantasCliente, setConfAnalisisNivelesPlantasCliente] = useState([]);

    const [parametrosSeleccionado, setParametrosSeleccionado] = useState({

        id: 0,
        codigoCliente: 0,
        nombreCliente: '',
        oferta: '',
        elemento: '',
        fecha: ''

    })

    const styles = useStyles();
    const styles2 = useStyles2();

    const GetClientes = async () => {
        axios.get("/cliente", token).then(response => {
            const cliente = Object.entries(response.data.data).map(([key, value]) => (key, value))
            setClientes(cliente);
        }, [])
    }

    const GetElementos = async () => {
        axios.get("/elementosplanta", token).then(response => {
            const elemento = Object.entries(response.data.data).map(([key, value]) => (key, value))
            setElementos(elemento);
        }, [])
    }

    const GetOfertas = async () => {
        axios.get("/ofertasclientes", token).then(response => {
            const oferta = Object.entries(response.data.data).map(([key, value]) => (key, value))
            setOfertas(oferta);
        }, [])
    }

    const GetConfAnalisisNivelesPlantasCliente = async () => {
        axios.get("/analisisnivelesplantascliente", token).then(response => {
            const niveles = Object.entries(response.data.data).map(([key, value]) => (key, value))
            setConfAnalisisNivelesPlantasCliente(niveles);
        }, [])
    }

    useEffect(() => {
        GetClientes();
        GetElementos();
        GetOfertas();
        GetConfAnalisisNivelesPlantasCliente();
    }, [])

    useEffect(() => {

        const nombre = clientes.filter(cliente => cliente.codigo === parametrosSeleccionado.codigoCliente);
        (nombre.length > 0) && setParametrosSeleccionado({
            ...parametrosSeleccionado,
            nombreCliente: nombre[0].razonSocial,
            oferta: '',
    
        })
    
    }, [parametrosSeleccionado.codigoCliente])

    const handleClick = () => {
        setOpen(!open);
    };

    const handleContextMenu = (event) => {
        event.preventDefault();
        setContextMenu(
            contextMenu === null
                ? {
                    mouseX: event.clientX - 2,
                    mouseY: event.clientY - 4,
                }
                : // repeated contextmenu when it is already open closes it with Chrome 84 on Ubuntu
                // Other native context menus might behave different.
                // With this behavior we prevent contextmenu from the backdrop to re-locale existing context menus.
                null,
        );
    };

    const handleChange = e => {
        const { name, value } = e.target;
        setParametrosSeleccionado(prevState => ({
          ...prevState,
          [name]: value
        }));
    }

    const handleClose = () => {
        setContextMenu(null);
    };

    function createData(parametro, unidad, valor) {
        return { parametro, unidad, valor };
    }

    const rows = [
        createData('pH', 'pH'),
        createData('Temperatura', 'ºC'),
        createData('Conductividad a 25 ºC', 'uS/cm'),
        createData('TDS', 'mg/l'),
        createData('Dureza cálcica', 'mg/l CaCO3'),
    ];

    return (
        <div className="main-container">
            <div className='row1'>
                <h4>Mantenimiento</h4>
                <hr />
                <div className='header-contenedor'>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell><b>Codigo Cliente</b></TableCell>
                                    <TableCell><b>Nombre Cliente</b></TableCell>
                                    <TableCell><b>Referencia</b></TableCell>
                                    <TableCell><b>Oferta</b></TableCell>
                                    <TableCell><b>Elemento</b></TableCell>
                                    <TableCell><b>Fecha</b></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell>
                                        <Autocomplete
                                            disableClearable={true}
                                            className={styles2.inputMaterial}
                                            id="codigoCliente"
                                            options={clientes}
                                            getOptionLabel={option => option.codigo}
                                            sx={{ width: 200 }}
                                            renderInput={(params) => <TextField {...params} name="codigoCliente" />}
                                            onChange={(event, value) => setParametrosSeleccionado(prevState => ({
                                                ...prevState,
                                                codigoCliente: parseInt(value.codigo)
                                            }))}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            id='nombreCliente'
                                            className={styles.inputMaterial}
                                            value={parametrosSeleccionado && parametrosSeleccionado.nombreCliente}
                                            name="nombreCliente"
                                            onChange={handleChange}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            id='referencia'
                                            className={styles.inputMaterial}
                                            name="referencia"
                                            onChange={handleChange}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Autocomplete
                                            disableClearable={true}
                                            className={styles2.inputMaterial}
                                            id="Oferta"
                                            inputValue={parametrosSeleccionado.oferta}
                                            options={ofertas}
                                            filterOptions={options => ofertas.filter(oferta => oferta.codigoCliente === parametrosSeleccionado.codigoCliente)}
                                            getOptionLabel={option => option.numeroOferta}
                                            sx={{ width: 150 }}
                                            renderInput={(params) => <TextField {...params} name="oferta" />}
                                            onChange={(event, value) => setParametrosSeleccionado(prevState => ({
                                                ...prevState,
                                                oferta: value.numeroOferta,
                                                elemento: ''
                                            }))}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Autocomplete
                                            disableClearable={true}
                                            className={styles2.inputMaterial}
                                            id="elemento"
                                            inputValue={parametrosSeleccionado.elemento}
                                            options={elementos}
                                            filterOptions={options => confAnalisisNivelesPlantasCliente.filter(planta => planta.codigoCliente === parametrosSeleccionado.codigoCliente && planta.oferta === parametrosSeleccionado.oferta)}
                                            getOptionLabel={option => option.elemento}
                                            sx={{ width: 225 }}
                                            renderInput={(params) => <TextField {...params} name="elemento" />}
                                            onChange={(event, value) => setParametrosSeleccionado(prevState => ({
                                                ...prevState,
                                                elemento: value.elemento
                                            }))}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            className={styles.inputMaterial}
                                            id="fecha"
                                            type="date"
                                            name="fecha"
                                            sx={{ width: 225 }}
                                            onChange={handleChange}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
            <div className='row2'>
                <div className='col1'>
                    <h5>Parámetros</h5>
                    <hr />
                    <div className='parametros-contenedor'>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell><b>Parámetro</b></TableCell>
                                        <TableCell><b>Un.</b></TableCell>
                                        <TableCell><b>Valor</b></TableCell>
                                        <TableCell><b>Valor mes pasado (fecha) </b></TableCell>
                                        <TableCell><b>Valor de hace 2 meses (fecha)</b></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((row) => (
                                        <TableRow key={row.parametro}>
                                            <TableCell component="th" scope="row">
                                                {row.parametro}
                                            </TableCell>
                                            <TableCell>{row.unidad}</TableCell>
                                            <TableCell>
                                                {<TextField id="filled-basic" hiddenLabel variant="filled" size="small" />}
                                            </TableCell>
                                            <TableCell>
                                                {<TextField id="filled-basic" hiddenLabel variant="filled" size="small" />}
                                            </TableCell>
                                            <TableCell>
                                                {<TextField id="filled-basic" hiddenLabel variant="filled" size="small" />}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
                <div className='col3'>
                    <h5>Comentarios del Elemento de Planta</h5>
                    <hr />
                    <div className='box-com-contenedor'>
                        <List>
                            <ListItem
                                alignItems="flex-start"
                                secondaryAction={
                                    <IconButton edge="end" aria-label="delete">
                                        <DeleteIcon />
                                    </IconButton>
                                }
                            >
                                <ListItemAvatar>
                                    <Avatar>
                                        <PersonIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary="Hola, esto es un mensaje de prueba"
                                    secondary="Usuario Random"
                                />
                            </ListItem>
                            <Divider variant="inset" component="li" />
                            <ListItem
                                alignItems="flex-start"
                                secondaryAction={
                                    <IconButton edge="end" aria-label="delete">
                                        <DeleteIcon />
                                    </IconButton>
                                }
                            >
                                <ListItemAvatar>
                                    <Avatar>
                                        <PersonIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary="Hola, esto es un mensaje de prueba"
                                    secondary="Usuario Random"
                                />
                            </ListItem>
                            <Divider variant="inset" component="li" />
                            <ListItem
                                alignItems="flex-start"
                                secondaryAction={
                                    <IconButton edge="end" aria-label="delete">
                                        <DeleteIcon />
                                    </IconButton>
                                }
                            >
                                <ListItemAvatar>
                                    <Avatar>
                                        <PersonIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary="Hola, esto es un mensaje de prueba"
                                    secondary="Usuario Random"
                                />
                            </ListItem>
                        </List>
                    </div>
                    <div className='box-com-crear'>
                        <TextField
                            id="filled-multiline-static"
                            label="Introduce un comentario"
                            multiline
                            rows={4}
                            variant="filled"
                            style={{ marginBottom: '18px' }}
                        />
                        <Button
                            variant="contained"
                            startIcon={<AddOutlinedIcon />}
                            style={{ width: '100%' }}
                        >Añadir</Button>
                    </div>
                </div>
                <div className='col4'>
                    <h5>Documentos</h5>
                    <hr />
                    <div className='documentos-contenedor'>
                        <List component="nav" aria-labelledby="nested-list-subheader">

                            <ListItemButton onClick={handleClick}>
                                <ListItemIcon>
                                    <FolderIcon />
                                </ListItemIcon>
                                <ListItemText primary="Carpeta principal" />
                                {open ? <ExpandLess /> : <ExpandMore />}
                            </ListItemButton>

                            <Collapse in={open} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>

                                    <ListItemButton sx={{ pl: 4 }} onClick={handleClick}>
                                        <ListItemIcon>
                                            <FolderIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="GENERALES" />
                                        {open ? <ExpandLess /> : <ExpandMore />}
                                    </ListItemButton>

                                    <Collapse in={open} timeout="auto" unmountOnExit>
                                        <List component="div" disablePadding>

                                            <ListItemButton onContextMenu={handleContextMenu} sx={{ pl: 6 }}>
                                                <ListItemIcon>
                                                    <InsertDriveFileIcon />
                                                </ListItemIcon>
                                                <ListItemText primary="Archivo 1.pdf" />
                                            </ListItemButton>

                                            <ListItemButton sx={{ pl: 6 }}>
                                                <ListItemIcon>
                                                    <InsertDriveFileIcon />
                                                </ListItemIcon>
                                                <ListItemText primary="Archivo 2.pdf" />
                                            </ListItemButton>

                                        </List>
                                    </Collapse>

                                    <ListItemButton onClick={handleClick}>
                                        <ListItemIcon>
                                            <FolderIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Carpeta 2" />
                                        {open ? <ExpandLess /> : <ExpandMore />}
                                    </ListItemButton>

                                </List>
                            </Collapse>
                        </List>
                        <Menu
                            open={contextMenu !== null}
                            onClose={handleClose}
                            anchorReference="anchorPosition"
                            anchorPosition={
                                contextMenu !== null
                                    ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
                                    : undefined
                            }
                        >
                            <MenuItem onClick={handleClose}>Crear carpeta</MenuItem>
                            <MenuItem onClick={handleClose}>Cambiar nombre</MenuItem>
                            <MenuItem onClick={handleClose}>Subir documento</MenuItem>
                            <MenuItem onClick={handleClose}>Abrir</MenuItem>
                        </Menu>
                    </div>
                </div>
            </div>
            <div className="botones-menu">
                <button> Guardar datos </button>
            </div>
        </div>
    )
}

export default MantenimientoTecnico;