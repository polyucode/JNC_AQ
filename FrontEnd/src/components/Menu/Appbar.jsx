import { Avatar, AppBar, Toolbar, IconButton, Typography, Button, Grid } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';

export const Appbar = ({ title, variant, drawerWidth = 0, onDrawerToggle }) => {

    const navigate = useNavigate();

    const onLoginClick = () => {

        navigate('/login', { replace: true });

    }

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
                <Avatar alt="Logo JNegre" src="/img/logo.svg" sx={{ mr: 2 }} />
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    { title }
                </Typography>
                <Button color="inherit" onClick={ onLoginClick }>Login</Button>
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