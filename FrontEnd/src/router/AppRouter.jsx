import { Routes, Route } from 'react-router-dom';
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
    VisualizacionPage
} from '../pages';

import Login from '../pages/Login';
import Perfil from '../pages/Perfil';

export const AppRouter = () => {

    return (
        <Routes>
            <Route path='/' exact element={<HomePage />} />
            <Route path='/login' element={<Login />} />
            <Route path='/usuarios' element={<UsuariosPage />} />
            <Route path='/clientes' element={<ClientesPage />} />
            <Route path='/mantenimientos' element={<MantenimientosPage />} />
            <Route path='/perfil' element={<Perfil />} />
            <Route path='/plantas' element={<PlantasPage />} />
            <Route path='/plantasTabla' element={<PlantasTablaPage />} />
            <Route path="/mantenimientoTecnico" element={<MantenimientoTecnicoPage />} />
            <Route path="/ofertas" element={<OfertasClientesPage />} />
            <Route path='/productos' element={<ProductosPage />} />
            <Route path='/consumoarticulos' element={<ConsumoArticulosPage />} />
            <Route path='/visualizacion' element={<VisualizacionPage />} />
        </Routes>
    );
}