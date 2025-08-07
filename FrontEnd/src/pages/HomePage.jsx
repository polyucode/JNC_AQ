import React, { useContext } from 'react';
import { MainLayout } from '../layout/MainLayout';
import HomeCliente from '../components/HomeCliente';

import './Home.css';
import { AuthContext } from '../context/AuthContext';
import HomeInspector from '../components/HomeInspector';

export const HomePage = () => {

    const { user } = useContext(AuthContext);

    return (
        <MainLayout title='Inicio'>
            {
                user.idPerfil !== 4 ?
                    <HomeCliente /> 
                    :
                    <HomeInspector />
            }

        </MainLayout>
    );
}