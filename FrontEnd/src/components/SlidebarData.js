import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import BusinessIcon from '@mui/icons-material/Business';
import SettingsIcon from '@mui/icons-material/Settings';
import EngineeringIcon from '@mui/icons-material/Engineering';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import InventoryIcon from '@mui/icons-material/Inventory';
import CategoryIcon from '@mui/icons-material/Category';
import VisibilityIcon from '@mui/icons-material/Visibility';

export const SlidebarData = [
    {
        title: 'Inicio',
        path: '/YC_React',
        icon: <HomeIcon />,
        cName: 'nav-text',
        key: 1
    },
    {
        title: 'Usuarios',
        path: '/YC_React/usuarios',
        icon: <PersonIcon />,
        cName: 'nav-text',
        key: 2
    },
    {
        title: 'Clientes',
        path: '/YC_React/clientes',
        icon: <BusinessCenterIcon />,
        cName: 'nav-text',
        key: 3
    },
    {
        title: 'Tareas',
        path: '/YC_React/tareas',
        icon: <FormatListBulletedIcon />,
        cName: 'nav-text',
        key: 4
    },
    {
        title: 'Plantas',
        path: '/YC_React/plantas',
        icon: <BusinessIcon />,
        cName: 'nav-text',
        key: 5
    },
    {
        title: 'Parametrización de planta',
        path: '/plantasTabla',
        icon: <SettingsIcon/>,
        cName: 'nav-text',
        key: 6
    },
    {
        title: 'Mantenimiento (Tecnico)',
        path: '/YC_React/mantenimientoTecnico',
        icon: <EngineeringIcon />,
        cName: 'nav-text',
        key: 7
    },
    {
        title: 'Ofertas',
        path: '/YC_React/ofertas',
        icon: <LocalOfferIcon />,
        cName: 'nav-text',
        key: 8
    },
    {
        title: 'Productos',
        path: '/YC_React/productos',
        icon: <InventoryIcon />,
        cName: 'nav-text',
        key: 9
    },
    {
        title: 'Consumos de Articulos',
        path: '/YC_React/consumoarticulos',
        icon: <CategoryIcon />,
        cName: 'nav-text',
        key: 10
    },
    {
        title: 'Visualizacion',
        path: '/YC_React/visualizacion',
        icon: <VisibilityIcon />,
        cName: 'nav-text',
        key: 11
    }

]