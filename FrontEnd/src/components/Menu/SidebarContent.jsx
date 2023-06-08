import { Toolbar, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useUsuarioActual } from '../../hooks/useUsuarioActual';

import { SlidebarData } from '../SlidebarData';

export const SidebarContent = () => {

    // Importamos el hook de navegación para cambiar entre páginas
    const navigate = useNavigate();

    const { usuarioActual } = useUsuarioActual();

    return (
        <>
            <Toolbar>
                {
                    usuarioActual.activo && (
                        <>
                            <Avatar alt="Logo JNegre" src="/img/logo.svg" sx={{ mr: 2 }} />
                            <Typography sx={{ fontWeight: 'bold' }}>
                                { usuarioActual.nombre }
                            </Typography>
                        </>
                    )
                }
            </Toolbar>
            <Divider />
            <List>
                {
                    // Recorremos todos los elementos del array para crear las opciones del menú
                    SlidebarData.map( ({ key, title, path, icon }) => (

                        <ListItem key={ key } disablePadding>
                            <ListItemButton
                                onClick={ () => navigate( path, { replace: false } ) }
                            >
                                <ListItemIcon>
                                    { icon }
                                </ListItemIcon>
                                <ListItemText primary={ title } />
                            </ListItemButton>
                        </ListItem>
                        
                    ))

                }
            </List>
        </>
    );
}