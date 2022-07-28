import { Routes, Route } from 'react-router-dom';

import { HomePage, UsuariosPage, ClientesPage } from '../pages';

import Login from '../pages/Login';
import Mantenimientos from '../pages/Mantienimientos';
import Perfil from '../pages/Perfil';
import Plantas from '../pages/Plantas';
import PlantasTabla from '../pages/PlantasTabla';
import MantenimientoTecnico from '../pages/MantenimientoTecnico';
import OfertasClientes from '../pages/OfertasClientes';
import Productos from '../pages/Productos';
import ConsumoArticulos from '../pages/ConsumoArticulos'
import Visualizacion from '../pages/Visualizacion';

export const AppRouter = () => {

    return (
        <Routes>
            <Route path='/' exact element={<HomePage />} />
            <Route path='/login' element={<Login />} />
            <Route path='/usuarios' element={<UsuariosPage />} />
            <Route path='/clientes' element={<ClientesPage />} />
            <Route path='/mantenimientos' element={<Mantenimientos />} />
            <Route path='/perfil' element={<Perfil />} />
            <Route path='/plantas' element={<Plantas />} />
            <Route path='/plantasTabla' element={<PlantasTabla />} />
            <Route path="/mantenimientoTecnico" element={<MantenimientoTecnico />} />
            <Route path="/ofertas" element={<OfertasClientes />} />
            <Route path='/productos' element={<Productos />} />
            <Route path='/consumoarticulos' element={<ConsumoArticulos />} />
            <Route path='/visualizacion' element={<Visualizacion />} />
        </Routes>
    );
}