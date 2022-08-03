import { useState } from 'react';
import { Toolbar, Box, Grid } from '@mui/material';
import { Appbar } from '../components/Menu';

export const LoginLayout = ({ title, children }) => {

    const drawerWidth = 0;
    const [mobileOpen, setMobileOpen] = useState(false);

    const onDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <>
            <Grid container justifyContent="center" flexDirection="column" sx={{ pl: 2, pr: 2 }}>

                <Appbar title={ title } variant='login-variant' onDrawerToggle={ onDrawerToggle } />
                
                <Grid item>
                    <Toolbar sx={{ mb: 2 }} />

                    {/* La página en sí será cargada en este punto */}
                    { children }

                </Grid>

            </Grid>
        </>
    );
}