import { Routes, Route, Navigate } from 'react-router-dom';
import { useUsuarioActual } from '../hooks/useUsuarioActual';
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

export const AppRouter = () => {

    const { usuarioActual } = useUsuarioActual();

    console.log( usuarioActual.activo );

    return (
        <Routes>
            {
                ( usuarioActual.activo )
                    ? (
                        <>
                            { console.log('Es usuario valido') }
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
                        </>
                    ) : (
                        <>
                            { console.log('Es usuario NO valido') }
                            <Route path='/login' element={ <LoginPage /> } />
                            <Route path='/*' element={ <Navigate to="/login" replace={ true } /> } />
                        </>
                    )
            }
        </Routes>
    );
}