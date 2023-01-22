//está página será para incluir el login y el register pages en dos btns
import React from 'react'
import { useNavigate } from 'react-router-dom'

import '../style/loginBar.css'

export const LoginBar = () => {

    // voy a realizar dos funciones que me lleven a los otros archivos
    const navigate = useNavigate()

     //me llevará a esa ruta para logearme
    const handleLogin = () => {
        // con el navigate accederé a la ruta especificada en approutes
        navigate('/auth/login', {
            // vigilar el replace
            replace: true
        });
    };

    //me llevará a esa ruta para registrarme
    const handleRegister = () => {
        navigate('/auth/register', {
            // vigilar el replace
            replace: true
        })
    };

    return (
        <div className='container-btns-login'>
            {/* contendrá dos botones, el de registro/iniciar sesión y una imagen a la derecha */}
            <div className='container-btns-login-bar'>
                {/* cada boton ira con un navigate to */}
                <button
                    type='text'
                    onClick={handleLogin}
                >Login
                </button>

                <button
                    type='text'
                    onClick={handleRegister}
                >SIGN IN
                </button>

            </div>
        </div>
    )
}
