import { useState } from 'react';
import { Toolbar, Box } from '@mui/material';
import { Appbar } from '../components/Menu';

export const LoginLayout = ({ title, children }) => {

    const drawerWidth = 0;
    const [mobileOpen, setMobileOpen] = useState(false);

    const onDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <>
            <Box sx={{ display: 'flex '}}>

                <Appbar title={ title } drawerWidth={ drawerWidth } onDrawerToggle={ onDrawerToggle } />

                <Box
                    component='main'
                    sx={{
                        flexGrow: 1,
                        p: 2,
                        width: { sm: `calc(100% - ${ drawerWidth }px)` },
                        ml: { sm: `${ drawerWidth }px` }
                    }}
                >
                    <Toolbar />

                    {/* La página en sí será cargada en este punto */}
                    { children }

                </Box>

            </Box>
        </>
    );
}