import { Routes, Route, Navigate } from 'react-router-dom';
import React, { useState } from 'react';
import Perfil from '../pages/Perfil';
import {
    HomePage,
    UsuariosPage,
    ClientesPage,
    TareasPage,
    PlantasPage,
    PlantasTablaPage,
    OfertasClientesPage,
    ProductosPage,
    ConsumoArticulosPage,
    VisualizacionPage,
    LoginPage,
    MantenimientoTecnicoPage
} from '../pages';
import OfertasClientes from '../pages/OfertasClientes';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';

export const ThemeContext = React.createContext();

export const AppRouter = () => {

    let [valores, setValores] = useState({});

    return (
        <ThemeContext.Provider value={{ valores, setValores }}>
            <Routes>

                <Route path='/login' element={
                    <PublicRoute>
                        <LoginPage />
                    </PublicRoute>
                } />

                <Route path='/*' element={
                    <PrivateRoute>
                        <Routes>
                            <Route path='/YC_React' exact element={<HomePage />} />
                            <Route path='/YC_React/login' element={<Navigate to="/" replace={true} />} />
                            <Route path='/YC_React/usuarios' element={<UsuariosPage />} />
                            <Route path='/YC_React/clientes' element={<ClientesPage />} />
                            <Route path='/YC_React/perfil' element={<Perfil />} />
                            <Route path='/YC_React/plantas' element={<PlantasPage />} />
                            <Route path='/YC_React/plantasTabla' element={<PlantasTablaPage />} />
                            <Route path='/YC_React/mantenimientoTecnico' element={<MantenimientoTecnicoPage />} />
                            <Route path="/YC_React/tareas" element={<TareasPage />} />
                            <Route path="/YC_React/ofertas" element={<OfertasClientesPage />} />
                            <Route path='/YC_React/productos' element={<ProductosPage />} />
                            <Route path='/YC_React/consumoarticulos' element={<ConsumoArticulosPage />} />
                            <Route path='/YC_React/visualizacion' element={<VisualizacionPage />} />
                        </Routes>
                    </PrivateRoute>
                } />
            </Routes>
        </ThemeContext.Provider>
    );
}