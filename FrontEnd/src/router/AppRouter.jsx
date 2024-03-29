import { Routes, Route, Navigate } from 'react-router-dom';
import Perfil from '../pages/Perfil';
import {
    HomePage,
    UsuariosPage,
    ClientesPage,
    MantenimientosPage,
    PlantasPage,
    PlantasTablaPage,
    MantenimientoTecnicoPage,
    OfertasClientesPage,
    ProductosPage,
    ConsumoArticulosPage,
    VisualizacionPage,
    LoginPage
} from '../pages';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';

export const AppRouter = () => {

    return (
        <Routes>

            <Route path='/login' element={
                <PublicRoute>
                    <LoginPage />
                </PublicRoute>
            } />

            <Route path='/*' element={
                <PrivateRoute>
                    <Routes>
                        <Route path='/' exact element={ <HomePage /> } />
                        <Route path='/login' element={ <Navigate to="/" replace={ true } /> } />
                        <Route path='/usuarios' element={ <UsuariosPage /> } />
                        <Route path='/clientes' element={ <ClientesPage /> } />
                        <Route path='/mantenimientos' element={ <MantenimientosPage /> } />
                        <Route path='/perfil' element={ <Perfil /> } />
                        <Route path='/plantas' element={ <PlantasPage /> } />
                        <Route path='/plantasTabla' element={ <PlantasTablaPage /> } />
                        <Route path="/mantenimientoTecnico" element={ <MantenimientoTecnicoPage /> } />
                        <Route path="/ofertas" element={ <OfertasClientesPage /> } />
                        <Route path='/productos' element={ <ProductosPage /> } />
                        <Route path='/consumoarticulos' element={ <ConsumoArticulosPage /> } />
                        <Route path='/visualizacion' element={ <VisualizacionPage /> } />
                    </Routes>
                </PrivateRoute>
            } />

        </Routes>
    );
}