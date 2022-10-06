import { createContext, useReducer } from 'react';
import { types } from '../types/types';
import { authReducer } from './authReducer';

export const AuthContext = createContext();

const init = () => {

    const user = JSON.parse( localStorage.getItem('usuarioActual') );

    return {
        logged: !!user,
        user: user
    };
};

export const AuthProvider = ({ children }) => {

    const [authState, dispatch] = useReducer( authReducer, {}, init );

    const login = ( user ) => {

        const action = { type: types.login, payload: user };
        dispatch( action );

    }

    const logout = () => {

        localStorage.removeItem('usuarioActual');

        const action = { type: types.logout };
        dispatch( action );

    }

    return (
        <AuthContext.Provider value={{
            ...authState,
            login,
            logout
        }}>
            { children }
        </AuthContext.Provider>
    )
}