import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const useLoginForm = () => {

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
        
        // Revisamos si los campos están rellenados
        if( loginData.usuario.length < 2 || loginData.contrasena.length < 2 ) {

            setLoginError({
                ...loginError,
                error: true,
                errorMessage: 'Los campos deben tener mas de 1 caracter'
            });
            return;

        }

        const login = {
            User: loginData.usuario,
            Password: loginData.contrasena
        }

        try {

            const { data } = await axios.post('/token/', login);

            // Seteamos el token en el localStorage
            localStorage.setItem( 'token', data.token );
            localStorage.setItem( 'usuarioActual', JSON.stringify( data.item2 ) );
            
            // Redireccionamos al usuario
            navigate('/', { replace: true });
            
        } catch ( error ) {

            setLoginError({
                ...loginError,
                error: true,
                errorMessage: error.message
            });

            console.error( error );

        }
    
    }

    const logout = () => {

        localStorage.clear();


        setTimeout(() => {
            navigate('/login', { replace: true });
        }, 1000);

    }

    return {
        //* Propiedades
        loginData,
        loginError,

        //* Métodos
        handleChange,
        handleSubmit,
        logout
    }
}