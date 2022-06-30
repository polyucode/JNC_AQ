import React from 'react'
import * as AiIcons from "react-icons/ai";
import { HiOutlineBriefcase } from "react-icons/hi";
import { MdOutlineConstruction } from "react-icons/md";


export const SlidebarData = [
    {
        title: 'Inicio',
        path: '/',
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text'
    },
    {
        title: 'Usuarios',
        path: '/usuarios',
        icon: <AiIcons.AiOutlineUser/>,
        cName: 'nav-text'
    },
    {
        title: 'Clientes',
        path: '/clientes',
        icon: <HiOutlineBriefcase />,
        cName: 'nav-text'
    },
    {
        title: 'Tareas',
        path: '/tareas',
        icon: <MdOutlineConstruction/>,
        cName: 'nav-text'
    },
    {
        title: 'Plantas',
        path: '/plantas',
        icon: <MdOutlineConstruction/>,
        cName: 'nav-text'
    },
    {
        title: 'Plantas (Tabla)',
        path: '/plantasTabla',
        icon: <MdOutlineConstruction/>,
        cName: 'nav-text'
    },
    {
        title: 'Mantenimiento (Tecnico)',
        path: '/mantenimientoTecnico',
        icon: <AiIcons.AiOutlineDatabase />,
        cName: 'nav-text'
    },
    {
        title: 'Ofertas',
        path: '/ofertas',
        icon: <AiIcons.AiOutlineDatabase />,
        cName: 'nav-text'
    },
    {
        title: 'Productos',
        path: '/productos',
        icon: <AiIcons.AiOutlineDatabase />,
        cName: 'nav-text'
    },
    {
        title: 'Consumos de Articulos',
        path: '/consumoarticulos',
        icon: <AiIcons.AiOutlineDatabase />,
        cName: 'nav-text'
    },
    {
        title: 'Visualizacion',
        path: '/visualizacion',
        icon: <AiIcons.AiOutlineDatabase />,
        cName: 'nav-text'
    },

]