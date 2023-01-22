import { useDispatch, useSelector } from "react-redux";
import todoApi from "../../api/todoApi";
import { clearErrorMessage, onChecking, onLogin, onLogout } from "../../store/auth/authSlice";


export const useAuthStore = () => {

    const { status, user, errorMessage } = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    //vamos a consultar la bbdd
    const startLogin = async ({ email, password }) => {
        // console.log(email, password);
        dispatch(onChecking());

        try {

            const { data } = await todoApi.post('/auth', { email, password });
            //seteamos el token en la bbdd que nos dejará la sesion iniciada
            localStorage.setItem('token', data.token);

            // console.log(data.token);
            //almacenamos los datos del usuario de la bbdd
            const user = {
                name: data.user.name,
                uid: data.user.uid
            };

            dispatch(onLogin(user));

        } catch (error) {
            dispatch(onLogout(''));
        }

    };

    //registro
    const startRegister = async ({ name, email, password }) => {
        //comprobamos que coincidan los tokens
        dispatch(onChecking());

        try {
            //misma formula que la anterior
            const { data } = await todoApi.post('/auth/new', { name, email, password });
            localStorage.setItem('token', data.token);

            //es exactamente igual ya que lo que estoy es subiendo el user a la bbdd
            const user = {
                name: data.user.name,
                uid: data.user.uid
            };

            dispatch(onLogin(user));

        } catch (error) {
            dispatch(onLogout(error.response.data.msg));
            setTimeout(() => {
                dispatch(clearErrorMessage())
            }, 100)
        }

    }

    //comprobamos el token
    const checkToken = async () => {

        const token = localStorage.getItem('token');

        //si no hay token que me despache el logout
        if (!token) return dispatch(onLogout());

        try {

            //por get llamamos del back al renew y comprobamos que esa sesion no ha caducado
            const { data } = await todoApi.get('/auth/renew');
            localStorage.setItem('token', data.token);

            const user = {
                name: data.user.name,
                uid: data.user.uid
            };

            dispatch(onLogin(user));


        } catch (error) {
            localStorage.clear();
            dispatch(onLogout(''))
        }
        //clase 44->1:37
    };

    const startLogout = async () => {
        // limpiamos el almacenamiento del token del localstorage y despachamos el logout
        localStorage.clear();
        dispatch(onLogout());
    };


    return {
        status,
        user,
        errorMessage,
        startLogin,
        startRegister,
        checkToken,
        startLogout
    }
};


