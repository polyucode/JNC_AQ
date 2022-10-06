import { useState } from 'react';
import { Toolbar, Box } from '@mui/material';
import { Appbar, Sidebar } from '../components/Menu';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';

export const MainLayout = ({ title, children }) => {

    const drawerWidth = 300;
    const [mobileOpen, setMobileOpen] = useState(false);

    const onDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    

    return (
        <>
            <Box sx={{ display: 'flex '}}>

                <Appbar title={ title } drawerWidth={ drawerWidth } onDrawerToggle={ onDrawerToggle } />
                <Sidebar drawerWidth={ drawerWidth } mobileOpen={ mobileOpen } onDrawerToggle={ onDrawerToggle } />

                <Box
                    component='main'
                    sx={{
                        flexGrow: 1,
                        p: 2,
                        width: { sm: `calc(100% - ${ drawerWidth }px)` },
                        ml: { sm: `${ drawerWidth }px` }
                    }}
                    className="animate__animated animate__fadeInDown"
                >
                    <Toolbar />

                    {/* La página en sí será cargada en este punto */}
                    { children }

                </Box>

            </Box>
        </>
    );
}