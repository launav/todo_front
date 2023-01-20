import { createSlice } from '@reduxjs/toolkit';


export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'checking',
        user: {},
        errorMessage: undefined
    },
    reducers: {
        onChecking: (state) => {
            //vuelve directamente al estado inicial, cuando estemos logeados o deslogeados lo tendremos que llamar para 
            //que restablezca los valores iniciales
            state.status = 'checking';
            state.user = {};
            state.errorMessage = undefined;
        },
        onLogin: (state, { payload }) => {
            state.status = 'authenticated';
            state.user = payload;
            state.errorMessage = undefined;
        },
        onLogout: (state, { payload }) => {
            //se ejecutará cuando el token no sea válido o cuando salgas de tu sesión
            state.status = 'not-authenticated';
            state.user = {};
            state.errorMessage = payload;
        },
        clearErrorMessage: (state) => {
            state.errorMessage = undefined;
        }
    }
});

export const { onChecking, onLogin, onLogout, clearErrorMessage } = authSlice.actions;
//convierte las acciones de los reducers
