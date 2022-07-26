import { Avatar, Grid, AppBar, Toolbar, IconButton, Typography, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

export const MainLayout = () => {

    return (
        <>
        <Grid container>

            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Avatar alt="Logo JNegre" src="/img/logo.svg" sx={{ mr: 2 }} />
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Inicio
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>

        </Grid>
        </>
    );
}