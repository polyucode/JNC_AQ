import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { postToken } from '../api';

export const useLoginForm = () => {

    const { login } = useContext( AuthContext );
    const navigate = useNavigate();

    const [loginData, setLoginData] = useState({
        usuario: '',
        contrasena: ''
    });

    const [loginError, setLoginError] = useState({
        error: false,
        errorMessage: ''
    });

    useEffect(() => {

        setLoginError({
            error: false,
            errorMessage: ''
        })

    }, [ loginData ]);

    const handleChange = ({ target }) => {

        const { value, name } = target;

        setLoginData({
            ...loginData,
            [name]: value
        });

    }

    const handleSubmit = async ( event ) => {
        event.preventDefault();

        // Seteamos los valores de los campos
        const loginValues = {
            User: loginData.usuario,
            Password: loginData.contrasena
        }

        const data = await postToken(loginValues);
        
        // Revisamos si los campos están rellenados
        if( loginData.usuario.length < 2 || loginData.contrasena.length < 2 || data.data.item2.activo == false) {

            setLoginError({
                ...loginError,
                error: true,
                errorMessage: 'No existe el usuario o el usuario no está activo'
            });
            return;

        }


        try {

            // Seteamos el token en el localStorage
            localStorage.setItem( 'token', data.data.token );
            localStorage.setItem( 'usuarioActual', JSON.stringify( data.data.item2 ) );

            // Despachamos la acción
            login( data.data.item2 );

            // Redireccionamos al usuario
            navigate('/', {
                replace: true
            });
            
        } catch ( error ) {

            setLoginError({
                ...loginError,
                error: true,
                errorMessage: error.message
            });

            console.error( error );

        }
    
    }

    // const logout = () => {

    //     localStorage.clear();


    //     setTimeout(() => {
    //         navigate('/login', { replace: true });
    //     }, 1000);

    // }

    return {
        //* Propiedades
        loginData,
        loginError,

        //* Métodos
        handleChange,
        handleSubmit,
        //logout
    }
}