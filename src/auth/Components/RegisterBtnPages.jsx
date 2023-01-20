// esta será para que cuando clicke en el botón de registrarse aparezca esto
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { useForm } from '../../hooks/useForm';
import { useAuthStore } from '../hooks/useAuthStore';


import '../style/registerBtnPages.css'
//clase 43 -> 1:57

//creamos los estados iniciales aqui para que no se vuelvan a cargar cuando cargue el componente
const registerFormInputs = {
  registerName: '',
  registerEmail: '',
  registerPassword: '',
  registerPassword2: ''
};


export const RegisterBtnPages = () => {

  const { registerName, registerEmail, registerPassword, registerPassword2, onInputChange: onRegisterInputChange } = useForm(registerFormInputs)

  const { status, startRegister, errorMessage } = useAuthStore();


  const registerSubmitForm = (ev) => {
    ev.preventDefault();

    //comprobamos que las contraseñas son iguales
    if (registerPassword != registerPassword2) {
      Swal.fire("Password doesn't macht", errorMessage, 'error');
      return
    };

    startRegister({ name: registerName, email: registerEmail, password: registerPassword });

  };

  useEffect(() => {
    if (status === "checking") {
      return (<h3>Cargando...</h3>)
    };
  });

  return (
    <div>

      {/* formulario de registro */}
      <div
        className='div-form-register-page'>
        <h3>Sign In</h3>

        <form
          onSubmit={registerSubmitForm}
          className='form-register-pages'>
          <input
            className='input-register'
            type="text"
            placeholder='nombre'
            name='registerName'
            id='nombre'
            value={registerName}
            onChange={onRegisterInputChange}
          />

          <input
            className='input-register'
            type="text"
            placeholder='email'
            name='registerEmail'
            id='email'
            value={registerEmail}
            onChange={onRegisterInputChange}
          />

          <input
            className='password-input-register'
            type="text"
            placeholder='contraseña'
            name='registerPassword'
            id='registerPassword'
            value={registerPassword}
            onChange={onRegisterInputChange}
          />

          <input
            className='password-input-register'
            type="text"
            placeholder='Repite la contraseña'
            name='registerPassword2'
            id='registerPassword2'
            value={registerPassword2}
            onChange={onRegisterInputChange}
          />
          <div>
            <button
              className='btn-submit-register'>Register</button>
          </div>

        </form>
      </div>
    </div>
  )
}
