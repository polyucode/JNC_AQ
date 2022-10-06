import { Drawer } from '@mui/material';
import { SidebarContent } from '../Menu';

export const Sidebar = ({ drawerWidth, mobileOpen, onDrawerToggle }) => {

    return (
        <>

            {/* Este drawer es el que se verá en modo responsive (mobil) */}
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={onDrawerToggle}
                ModalProps={{
                    keepMounted: true
                }}
                sx={{
                    display: { xs: 'block', sm: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
                }}
            >
                <SidebarContent />
            </Drawer>

            {/* Este drawer es el que se verá en modo normal (PCs y algunas tables quizás) */}
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: 'none', sm: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
                open
            >
                <SidebarContent />
            </Drawer>

        </>
    );
}