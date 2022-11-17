import React from 'react'
import * as AiIcons from 'react-icons/ai';
import { HiOutlineBriefcase } from 'react-icons/hi';
import { MdOutlineConstruction } from 'react-icons/md';

export const SlidebarData = [
    {
        title: 'Inicio',
        path: '/',
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text',
        key: 1
    },
    {
        title: 'Usuarios',
        path: '/usuarios',
        icon: <AiIcons.AiOutlineUser/>,
        cName: 'nav-text',
        key: 2
    },
    {
        title: 'Clientes',
        path: '/clientes',
        icon: <HiOutlineBriefcase />,
        cName: 'nav-text',
        key: 3
    },
    {
        title: 'Tareas',
        path: '/tareas',
        icon: <MdOutlineConstruction/>,
        cName: 'nav-text',
        key: 4
    },
    {
        title: 'Plantas',
        path: '/plantas',
        icon: <MdOutlineConstruction/>,
        cName: 'nav-text',
        key: 5
    },
    {
        title: 'Plantas (Tabla)',
        path: '/plantasTabla',
        icon: <MdOutlineConstruction/>,
        cName: 'nav-text',
        key: 6
    },
    {
        title: 'Mantenimiento (Tecnico)',
        path: '/mantenimientoTecnico',
        icon: <AiIcons.AiOutlineDatabase />,
        cName: 'nav-text',
        key: 7
    },
    {
        title: 'Ofertas',
        path: '/ofertas',
        icon: <AiIcons.AiOutlineDatabase />,
        cName: 'nav-text',
        key: 8
    },
    {
        title: 'Productos',
        path: '/productos',
        icon: <AiIcons.AiOutlineDatabase />,
        cName: 'nav-text',
        key: 9
    },
    {
        title: 'Consumos de Articulos',
        path: '/consumoarticulos',
        icon: <AiIcons.AiOutlineDatabase />,
        cName: 'nav-text',
        key: 10
    },
    {
        title: 'Visualizacion',
        path: '/visualizacion',
        icon: <AiIcons.AiOutlineDatabase />,
        cName: 'nav-text',
        key: 11
    }

]