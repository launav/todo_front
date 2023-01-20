import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css'
import { useAuthStore } from './auth/hooks/useAuthStore';
import { LoginBar } from './auth/pages/LoginBar'
import { LogoutBar } from './auth/pages/LogoutBar';
import { AppRouter } from './router/AppRouter'


function App() {
  //  {/* aqui va el menú de lo que va a ir conectado con approuter */}
  // const authStatus = 'not-authenticated';
  const { status, checkToken } = useAuthStore();
  // quiere decir que si no está autenticado que me ponga un estilo de header diferente

  useEffect(() => {
    checkToken()
  }, []);

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/');
  };

  

  return (
    <>
      <header>
        {/* va directamente a la home */}

        <img className='icon' src="../public/icono.png" alt="icon" />

        <h1
          onClick={handleNavigate}
        >ToDoToday</h1>
        {
          (status === 'not-authenticated') ?
            // cuando lo cambio aquí lo tengo que cambiar en rutas
            (
              <div>
                <LoginBar />
              </div>
            )
            :
            (
              <div>
                <LogoutBar />
              </div>
            )

        }


      </header>
      <main className='appRouter'>
        <AppRouter />
      </main>

    </>
  )
}

export default App
