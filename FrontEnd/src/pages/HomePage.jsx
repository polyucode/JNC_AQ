import React from 'react';
import { MainLayout } from '../layout/MainLayout';
import HomeCliente from '../components/HomeCliente';

import './Home.css';

export const HomePage = () => {
    console.log("HOME PAGE")
    return (
        <MainLayout title='Inicio'>
            <HomeCliente/>
        </MainLayout>
    );
}