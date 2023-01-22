//aquí irán las rutas
import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { LoginBar, } from '../auth/pages';
import { LoginBtnPages, RegisterBtnPages } from '../auth/Components';

import { TodoPage } from '../TodoPages/pages/TodoPage'
import { LandingPage } from '../auth/pages/LandingPage';
import { getEnvs } from '../helpers/getEnvs';
import { useAuthStore } from '../auth/hooks/useAuthStore';


export const AppRouter = () => {
    // vamos a necesitar el check token del back y el check status
    //esto va a cambiar aquí y en el app.jsx

    //si no está autenticado nos llevará a unas rutas y sino a otras
    const { status, checkToken } = useAuthStore();

    //chequeamos el token
    useEffect(() => {
        checkToken()
    }, []);

    if (status === 'checking') {
        return (
            <h3>Cargando...</h3>
        )
    }

    return (
        <Routes>
            {
                (status === 'not-authenticated')
                    ? (
                        <>
                            {/* aquí le estoy diciendo que la ruta predeterminada si no esta logueado sea homepage */}
                            <Route path='/' element={<LandingPage />} />
                            {/* <Route path='/auth' element={<Navigate to='/auth/login' />} /> */}
                            <Route path='/*' element={<Navigate to='/' />} />
                            <Route path='/auth/*' element={<LoginBtnPages />} />
                            <Route path='/auth/register' element={<RegisterBtnPages />} />
                        </>
                    )
                    : (
                        //  {/*rutas para el login y el inicio de sesion */}
                        <>
                            {/* rutas para cuando te hayas auntenticado */}
                            <Route path='/' element={<TodoPage />} />
                            <Route path='/*' element={<Navigate to='/' />} />
                        </>

                    )

            }
            <Route path='/*' element={<Navigate to='/' />} />

        </Routes>
    )
}
