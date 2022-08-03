import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Cookies from 'universal-cookie';

import { LoginLayout } from '../layout/LoginLayout';
// import './Login.css';
import logo from '../img/jncLogoDark.jpg'

import { FormControl, Grid } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useTheme } from '@material-ui/core';
import TextField from '@mui/material/TextField';


export const LoginPage = () => {

    const theme = useTheme();

    const navigate = useNavigate();
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
                localStorage.setItem('Perfil', res.data.item2.idPerfil);
                window.location.reload(false);
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

        <LoginLayout title="Login">

            <Grid container justifyContent="center">

                <Grid item xs={10} sm={7} md={5} lg={4} >

                    <Card sx={{ p: 4 }}>
                        <CardMedia
                            component="img"
                            width="80"
                            image="/img/logo2.svg"
                            alt="Logo JNegre"
                        />
                        <CardContent>
                            <FormControl>
                            <TextField id="filled-basic" label="Filled" variant="filled" />
                            </FormControl>
                            
                        </CardContent>
                        <CardActions>
                            <Button size="small">Share</Button>
                            <Button size="small">Learn More</Button>
                        </CardActions>
                    </Card>

                </Grid>

            </Grid>
            

{/* 
                <div className='card login-form'>
                    <div className='card-body'>
                        <h1 className='card-title text-center'>LOGIN</h1>
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
                </div> */}
        </LoginLayout>
    );
}