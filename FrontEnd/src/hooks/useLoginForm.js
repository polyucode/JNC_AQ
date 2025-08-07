import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { postToken } from '../api';

export const useLoginForm = () => {

    const { login } = useContext(AuthContext);
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

    }, [loginData]);

    const handleChange = ({ target }) => {

        const { value, name } = target;

        setLoginData({
            ...loginData,
            [name]: value
        });

    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (loginData.usuario.trim().length === 0 || loginData.contrasena.trim().length === 0) {
            setLoginError({
                error: true,
                errorMessage: 'Por favor, completa todos los campos'
            });
            return;
        }

        // Seteamos los valores de los campos
        const loginValues = {
            User: loginData.usuario,
            Password: loginData.contrasena
        }

        try {

            const response = await postToken(loginValues);
            const data = response.data

            // Validación adicional si el usuario no está activo
            if (!data.item2?.activo) {
                setLoginError({
                    error: true,
                    errorMessage: 'El usuario no está activo'
                });
                return;
            }

            // Seteamos el token en el localStorage
            localStorage.setItem('token', data.token);
            localStorage.setItem('usuarioActual', JSON.stringify(data.item2));

            // Despachamos la acción
            login(data.item2);

            // Redireccionamos al usuario
            navigate('/', {
                replace: true
            });

        } catch (error) {

            let message = 'Error inesperado al iniciar sesión';

            if (error.response?.status === 401 || error.response?.status === 404) {
                message = error.response.data?.message || 'Usuario o contraseña incorrectos';
            } else if (error.message) {
                message = error.message;
            }

            setLoginError({
                error: true,
                errorMessage: message
            });

            console.error('Login error:', error);

        }

    }

    return {
        //* Propiedades
        loginData,
        loginError,

        //* Métodos
        handleChange,
        handleSubmit,
    }
}