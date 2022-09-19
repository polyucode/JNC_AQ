import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie';
import './Login.css';
import logo from '../img/jncLogoDark.jpg'


function Login(){

    const navigate = useNavigate();

    const cookies = new Cookies();
    const [User,setUsuario] = useState('');
    const [Password,setContraseña] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const login = {
            User, Password
        }

        axios.post('http://172.26.0.169:44343/api/token/', login)
            .then(res=> {
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('UsuarioActual', JSON.stringify(res.data.item2));
                localStorage.setItem('Perfil', res.data.item2.idPerfil);
                window.location.reload(false);
                alert("Bienvenido " + res.data.item2.nombre + ' ' + res.data.item2.apellidos)

                {res && navigate("http://172.26.0.169/YC_React/", {replace: true})}
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
        
        // <form onSubmit={handleSubmit}>
        //     <h3>Log In</h3>
        //     <div className='form-group'>
        //         <label>Usuario</label>
        //         <input type="text" className='form-control' placeholder='usuario' value={User}
        //          onChange={e => setUsuario(e.target.value)} />
        //     </div>
        //     <div className='form-group'>
        //         <label>Contraseña</label>
        //         <input type="password" className='form-control' placeholder='Contraseña' value={Password}
        //             onChange={e => setContraseña(e.target.value)} />
        //     </div>

        //     <button className='btn btn-primary btn-block'>Login</button>
        // </form>
        <div className='login-contenedor'>
                <div className='card login-form'>
                    <div className='card-body'>
                        {/* <h1 className='card-title text-center'>LOGIN</h1> */}
                        <div><img src={logo}></img></div>
                        <div className='card-text'></div>
                        <form onSubmit={handleSubmit}>
                            <div className='form-group'>
                                <label>Usuario</label>
                                <input type="text" className='form-control form-control-sm usuariologn' id='emailInput' value={User}
                                onChange={e => setUsuario(e.target.value)}></input>
                            </div>

                            <div className='form-group'>
                                <label>Contraseña</label>
                                <input type="password" className='form-control form-control-sm pswdlogn' id='contraseñaInput' value={Password}
                                onChange={e => setContraseña(e.target.value)}></input>
                            </div>
                            <button className='btn btn-primary btn-block'>Login</button>
                        </form>
                    </div>
                </div>
        </div>
    );
}

export default Login;