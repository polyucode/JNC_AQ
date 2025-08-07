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
    MantenimientoTecnicoPage,
    TareasPendientesPage,
    ParametrosPage,
    FacturacionPage
} from '../pages';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';
import { ReactFlowProvider } from 'react-flow-renderer';

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
                                <Route path='/' exact element={<HomePage />} />
                                <Route path='/login' element={<Navigate to="/" replace={true} />} />
                                <Route path='/usuarios' element={<UsuariosPage />} />
                                <Route path='/clientes' element={<ClientesPage />} />
                                <Route path='/perfil' element={<Perfil />} />
                                <Route path='/plantas' element={
                                    <PlantasPage />
                                } />
                                <Route path='/plantasTabla' element={<PlantasTablaPage />} />
                                <Route path='/mantenimientoTecnico' element={<MantenimientoTecnicoPage />} />
                                <Route path="/tareas" element={<TareasPage />} />
                                <Route path="/ofertas" element={<OfertasClientesPage />} />
                                <Route path='/productos' element={<ProductosPage />} />
                                <Route path='/parametros' element={<ParametrosPage />} />
                                <Route path='/consumoarticulos' element={<ConsumoArticulosPage />} />
                                <Route path='/visualizacion' element={<VisualizacionPage />} />
                                <Route path='/tareasPendientes' element={<TareasPendientesPage />} />
                                <Route path='/facturacion' element={<FacturacionPage />} />
                            </Routes>
                        </PrivateRoute>
                    } />
                </Routes>
            </ThemeContext.Provider>
    );
}