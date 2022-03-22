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
import PlantasTabla from './pages/PlantasTabla';

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
          <Route path='/plantasTabla' element={<PlantasTabla />} />
        </Routes>
        </div>

      </Router>
    </div>

  );
}


