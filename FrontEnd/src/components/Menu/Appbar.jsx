import { Avatar, AppBar, Toolbar, IconButton, Typography, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

export const Appbar = ({ title, drawerWidth, onDrawerToggle }) => {

    return (
        <>

            {/* Barra superior del menú. Muestro una variante u otra según el tamaño de la pantalla */}
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
                    <Button color="inherit">Login</Button>
                </Toolbar>

            </AppBar>

        </>
    );
}