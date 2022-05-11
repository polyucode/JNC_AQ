import react from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Home from './pages/Home'
import Login from './pages/Login';
import Navbar from './components/Nabvar';
import Usuarios from './pages/Usuarios';
import Mantenimientos from './pages/Mantienimientos';
import Clientes from './pages/Clientes';
import Perfil from './pages/Perfil';
import Plantas from './pages/Plantas';
import PlantasTabla from './pages/PlantasTabla';
import MantenimientoTecnico from './pages/MantenimientoTecnico';
import OfertasClientes from './pages/OfertasClientes';
import Articulos from './pages/Articulos';
import ConsumoArticulos from './pages/ConsumoArticulos'

export default function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <div className='container-fluid'>
        <Routes>
          <Route path='/' exact element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/usuarios' element={<Usuarios />} />
          <Route path='/clientes' element={<Clientes />} />
          <Route path='/mantenimientos' element={<Mantenimientos />} />
          <Route path='/perfil' element={<Perfil />} />
          <Route path='/plantas' element={<Plantas />} />
          <Route path='/plantasTabla' element={<PlantasTabla />} />
          <Route path="/mantenimientoTecnico" element={<MantenimientoTecnico />} />
          <Route path="/ofertas" element={<OfertasClientes />} />
          <Route path='/articulos' element={<Articulos />} />
          <Route path='/consumoarticulos' element={<ConsumoArticulos />} />
        </Routes>
        </div>

      </Router>
    </div>

  );
}


