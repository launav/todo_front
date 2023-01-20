import { useAuthStore } from '../hooks/useAuthStore';

import '../style/logoutBar.css'



export const LogoutBar = () => {

    const { startLogout, user } = useAuthStore()

    return (
        <div className='containerLogout'>
            {/* el nombre lo cogeremos de la bbdd */}
            <div className='name'>
                <p>Hola <strong>{user.name}</strong></p>
            </div>
            <div className='btn-logout'>
                <button
                    type='text'
                    onClick={startLogout}
                >Logout
                </button>
            </div>
        </div>
    )
}
