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
        path: '/',
        icon: <HomeIcon />,
        cName: 'nav-text',
        key: 1
    },
    {
        title: 'Usuarios',
        path: '/usuarios',
        icon: <PersonIcon />,
        cName: 'nav-text',
        key: 2
    },
    {
        title: 'Clientes',
        path: '/clientes',
        icon: <BusinessCenterIcon />,
        cName: 'nav-text',
        key: 3
    },
    {
        title: 'Tareas',
        path: '/tareas',
        icon: <FormatListBulletedIcon />,
        cName: 'nav-text',
        key: 4
    },
    {
        title: 'Plantas',
        path: '/plantas',
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
        path: '/mantenimientoTecnico',
        icon: <EngineeringIcon />,
        cName: 'nav-text',
        key: 7
    },
    {
        title: 'Ofertas',
        path: '/ofertas',
        icon: <LocalOfferIcon />,
        cName: 'nav-text',
        key: 8
    },
    {
        title: 'Productos',
        path: '/productos',
        icon: <InventoryIcon />,
        cName: 'nav-text',
        key: 9
    },
    {
        title: 'Consumos de Articulos',
        path: '/consumoarticulos',
        icon: <CategoryIcon />,
        cName: 'nav-text',
        key: 10
    },
    {
        title: 'Visualizacion',
        path: '/visualizacion',
        icon: <VisibilityIcon />,
        cName: 'nav-text',
        key: 11
    }

]