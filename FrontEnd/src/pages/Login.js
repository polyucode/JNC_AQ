import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import Cookies from 'universal-cookie';


function Login(){

    const cookies = new Cookies();
    const [User,setUsuario] = useState('');
    const [Password,setContraseña] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const login = {
            User, Password
        }

        axios.post('/token/', login)
            .then(res=> {
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('UsuarioActual', JSON.stringify(res.data.item2));
                alert("Bienvenido " + res.data.item2.nombre + ' ' + res.data.item2.apellidos)
                //guardoamos usuario en cookies
                // cookies.set('activo', res.data.item2, {path: '/'})
                // cookies.set('addDate', res.data.item2, {path: '/'})
                // cookies.set('addIdUser', res.data.item2, {path: '/'})
                // cookies.set('apellidos', res.data.item2, {path: '/'})
                // cookies.set('delDate', res.data.item2, {path: '/'})
                // cookies.set('delIdUser', res.data.item2, {path: '/'})
                // cookies.set('deleted', res.data.item2, {path: '/'})
                // cookies.set('firma', res.data.item2, {path: '/'})
                // cookies.set('id', res.data.item2, {path: '/'})
                // cookies.set('idCliente', res.data.item2, {path: '/'})
                // cookies.set('idPerfil', res.data.item2, {path: '/'})
                // cookies.set('login', res.data.item2, {path: '/'})
                // cookies.set('modDate', res.data.item2, {path: '/'})
                // cookies.set('modIdUser', res.data.item2, {path: '/'})
                // cookies.set('nombre', res.data.item2, {path: '/'})
                // cookies.set('telefono', res.data.item2, {path: '/'})
                // cookies.set('usuario', res.data.item2, {path: '/'})
            })
            .catch(err => {
                alert("Usuario o contraseña incorrectos")
                console.log(err)
            })
    }

    return (
        
        <form onSubmit={handleSubmit}>
            <h3>Log In</h3>
            <div className='form-group'>
                <label>Usuario</label>
                <input type="text" className='form-control' placeholder='usuario' value={User}
                 onChange={e => setUsuario(e.target.value)} />
            </div>
            <div className='form-group'>
                <label>Contraseña</label>
                <input type="password" className='form-control' placeholder='Contraseña' value={Password}
                    onChange={e => setContraseña(e.target.value)} />
            </div>

            <button className='btn btn-primary btn-block'>Login</button>
        </form>
    );
}

export default Login;