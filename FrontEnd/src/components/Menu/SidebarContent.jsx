import { Toolbar, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { SlidebarDataAdmin } from '../SlidebarDataAdmin';
import { SlidebarDataCliente } from '../SlidebarDataCliente';
import { SlidebarDataOperario1 } from '../SlidebarDataOperario1';
import { SlidebarDataOperario2 } from '../SlidebarDataOperario2';
import { useContext, useEffect, useState } from 'react';
import { getParametrosAnalisisPlanta } from '../../api';
import { AuthContext } from '../../context/AuthContext';

export const SidebarContent = () => {

    // Importamos el hook de navegación para cambiar entre páginas
    const navigate = useNavigate();

    const [rows, setRows] = useState([]);
    const [tareas, setTareas] = useState([]);
    const { user } = useContext(AuthContext);

    const peticionTareasPendientes = async () => {
        const today = new Date(); // Obtén la fecha actual
        const filteredTasks = tareas.filter(tarea => new Date(tarea.fecha) <= today)
        setRows(filteredTasks);
    }

    useEffect(() => {

        getParametrosAnalisisPlanta()
            .then(resp => {
                setTareas(resp.filter(tarea => tarea.operario === user.id && !tarea.realizado && !tarea.deleted))
            })
    }, [])

    useEffect(() => {
        peticionTareasPendientes();
    }, [tareas])

    return (
        <>
            <Toolbar>
                {
                    user.activo && (
                        <>
                            <Avatar alt="Logo JNegre" src="/img/logo.svg" sx={{ mr: 2 }} />
                            <Typography sx={{ fontWeight: 'bold' }}>
                                {user.nombre}
                            </Typography>
                        </>
                    )
                }
            </Toolbar>
            <Divider />
            {user.idPerfil === 1 ?
                <List>
                    {
                        // Recorremos todos los elementos del array para crear las opciones del menú
                        SlidebarDataAdmin.map(({ key, title, path, icon }) => (

                            <ListItem key={key} disablePadding>
                                <ListItemButton
                                    onClick={() => navigate(path, { replace: false })}
                                >
                                    <ListItemIcon>
                                        {icon}
                                    </ListItemIcon>
                                    <ListItemText primary={title} />
                                </ListItemButton>
                            </ListItem>

                        ))

                    }
                </List> :

                false
            }
            {user.idPerfil === 1004 && rows.length > 0 ?
                <List>
                    {
                        // Recorremos todos los elementos del array para crear las opciones del menú
                        SlidebarDataOperario1.map(({ key, title, path, icon }) => (

                            <ListItem key={key} disablePadding>
                                <ListItemButton
                                    onClick={() => navigate(path, { replace: false })}
                                >
                                    <ListItemIcon>
                                        {icon}
                                    </ListItemIcon>
                                    <ListItemText primary={title} />
                                </ListItemButton>
                            </ListItem>

                        ))
                    }
                </List> :
                false
            }
            {user.idPerfil === 1004 && rows.length === 0 ?
                <List>
                    {
                        // Recorremos todos los elementos del array para crear las opciones del menú
                        SlidebarDataOperario2.map(({ key, title, path, icon }) => (

                            <ListItem key={key} disablePadding>
                                <ListItemButton
                                    onClick={() => navigate(path, { replace: false })}
                                >
                                    <ListItemIcon>
                                        {icon}
                                    </ListItemIcon>
                                    <ListItemText primary={title} />
                                </ListItemButton>
                            </ListItem>
                        ))
                    }
                </List> :
                false
            }
            {user.idPerfil === 2 || user.idPerfil === 4 ?
                <List>
                    {
                        // Recorremos todos los elementos del array para crear las opciones del menú
                        SlidebarDataCliente.map(({ key, title, path, icon }) => (

                            <ListItem key={key} disablePadding>
                                <ListItemButton
                                    onClick={() => navigate(path, { replace: false })}
                                >
                                    <ListItemIcon>
                                        {icon}
                                    </ListItemIcon>
                                    <ListItemText primary={title} />
                                </ListItemButton>
                            </ListItem>

                        ))

                    }
                </List> :

                false
            }
        </>
    );
}