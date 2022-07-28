import { Toolbar, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { SlidebarData } from '../SlidebarData';

export const SidebarContent = () => {

    // Importamos el hook de navegación para cambiar entre páginas
    const navigate = useNavigate();

    return (
        <>
            <Toolbar />
            <Divider />
            <List>
                {
                    // Recorremos todos los elementos del array para crear las opciones del menú
                    SlidebarData.map( ({ key, title, path, icon }) => (

                        <ListItem key={ key } disablePadding>
                            <ListItemButton
                                onClick={ () => navigate( path, { replace: true } ) }
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