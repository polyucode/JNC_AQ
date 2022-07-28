import React from 'react';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
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
import { MainLayout } from '../layout/MainLayout';

export const MantenimientoTecnicoPage = () => {

    const [open, setOpen] = React.useState(true);
    const [contextMenu, setContextMenu] = React.useState(null);

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

    const handleClose = () => {
        setContextMenu(null);
    };

    function createData(parametro, unidad, valor) {
        return { parametro, unidad, valor};
    }
      
    const rows = [
        createData('pH','pH'),
        createData('Temperatura','ºC'),
        createData('Conductividad a 25 ºC','uS/cm'),
        createData('TDS','mg/l'),
        createData('Dureza cálcica','mg/l CaCO3'),
    ];

    return (
        <MainLayout title="Mantenimiento (Técnico)">
        <div className="main-container">
            <div className='row1'>
                <h4>Mantenimiento</h4>
                <hr />
                <div className='header-contenedor'>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell><b>Referencia</b></TableCell>
                                    <TableCell><b>Fecha</b></TableCell>
                                    <TableCell><b>Nº registro de laboratorio</b></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell>212036638</TableCell>
                                    <TableCell>25/11/2021</TableCell>
                                    <TableCell>LSAA-313-13</TableCell>
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
                            style={{marginBottom: '18px'}}
                        />
                        <Button
                            variant="contained"
                            startIcon={<AddOutlinedIcon/>}
                            style={{width: '100%'}}
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
        </div>
        </MainLayout>
    )
}