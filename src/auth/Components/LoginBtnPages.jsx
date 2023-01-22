//este será el form del login para iniciar sesión
import { useForm } from '../../hooks/useForm';
import { useAuthStore } from '../hooks/useAuthStore';
import Swal from 'sweetalert2';
import { useEffect } from 'react';

import '../style/loginBtnPages.css'


//nos creamos un obj con el email y la contraseña vacios
//tendré que exportar el helper de useForm y traerlo aquí para completarlo
const loginFormInputs = {
  loginEmail: '',
  loginPassword: ''
}


export const LoginBtnPages = () => {

  const { loginEmail, loginPassword, onInputChange: onLoginInputChange } = useForm(loginFormInputs);

  const { startLogin, errorMessage } = useAuthStore();

  //le pasamos los inputs del formulario al starlogin
  const loginSubmitForm = (ev) => {
    ev.preventDefault();
    // console.log(ev);
    startLogin({ email: loginEmail, password: loginPassword });
  };

  // si hay error, es decir, si es distinto a undefined que me salte el msg de error
  useEffect(() => {
    if (errorMessage !== undefined) {
      Swal.fire('Incorrect email or password', errorMessage, 'error')
    }
  }, []);


  return (

    <div className=''>

      {/* formulario de registro */}
      <div className='div-form-login-page'>
        <h3>Login in ToDoToday</h3>

        <form onSubmit={loginSubmitForm}
          className='form-login-page'>

          <input
            className='email-input-login'
            type="text"
            placeholder='Email'
            name='loginEmail'
            value={loginEmail}
            onChange={onLoginInputChange}
          />

          <input
            className='password-input-login'
            type="password"
            placeholder='Password'
            name='loginPassword'
            value={loginPassword}
            onChange={onLoginInputChange}
          />

          <div>
            <button className='btn-submit-login'>Login</button>
          </div>

        </form>
      </div>
    </div>
  )
}
