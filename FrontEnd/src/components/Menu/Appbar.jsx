import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, AppBar, Toolbar, IconButton, Typography, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import { useUsuarioActual } from '../../hooks/useUsuarioActual';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';

import CoPresent from '@mui/icons-material/CoPresent';
import Logout from '@mui/icons-material/Logout';
import { useLoginForm } from '../../hooks/useLoginForm';
import { AuthContext } from '../../context/AuthContext';

export const Appbar = ({ title, variant, drawerWidth = 0, onDrawerToggle }) => {

    const { logout } = useContext( AuthContext );
    const navigate = useNavigate();

    const { usuarioActual } = useUsuarioActual();

    // Variables para el menu
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const onLoginClick = () => {
        navigate('/login', { replace: true });
    };

    const handleClick = ( event ) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {

        logout();

        navigate('/login', {
            replace: true
        });

    }

    const loginMenu = (
        <Menu
            id="login-menu"
            anchorEl={ anchorEl }
            open={ open }
            onClose={handleClose}
        >
            <MenuItem>
                <ListItemIcon>
                    <CoPresent fontSize="small" />
                </ListItemIcon>
                Perfil
            </MenuItem>
            <MenuItem onClick={ handleLogout }>
                <ListItemIcon>
                    <Logout fontSize="small" />
                </ListItemIcon>
                Cerrar sesión
            </MenuItem>
        </Menu>
    );

    const defaultVariant = (
        <AppBar
            position="fixed"
            sx={{
                width: { sm: `calc(100% - ${ drawerWidth }px)` },
                ml: { sm: `${ drawerWidth }px` }
            }}
        >

            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ display: { xs: 'block', sm: 'none' }, mr: 2 }}
                    onClick={ onDrawerToggle }
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    { title }
                </Typography>

                {
                    usuarioActual.activo
                        ? (
                            <>
                                <Button color="inherit" onClick={ handleClick } variant="outlined" startIcon={ <PersonIcon /> }>Cuenta</Button>
                                { loginMenu }
                            </>
                        )
                        : (<Button color="inherit" onClick={ onLoginClick }>Login</Button>)
                }

            </Toolbar>

        </AppBar>
    );

    const loginVariant = (
        <AppBar position="fixed">

            <Toolbar>

                <Avatar alt="Logo JNegre" src="/img/logo.svg" sx={{ mr: 2 }} />
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    { title }
                </Typography>
                
            </Toolbar>

        </AppBar>
    );

    return (
        <>

            {/* Barra superior del menú. Muestro una variante u otra según el tamaño de la pantalla */}
            {
                ( variant === 'login-variant') ? loginVariant : defaultVariant
            }
            

        </>
    );
}