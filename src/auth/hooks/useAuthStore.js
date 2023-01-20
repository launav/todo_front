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
            localStorage.setItem('token', data.token);

            console.log(data.token);

            const user = {
                name: data.user.name,
                uid: data.user.uid
            };

            dispatch(onLogin(user));

        } catch (error) {
            dispatch(onLogout(''));
            // setTimeout(() => {
            //     dispatch(clearErrorMessage())
            // }, 100)
        }

    };

    const startRegister = async ({ name, email, password }) => {
        //comprobamos que coincidan los tokens
        dispatch(onChecking());

        try {

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

    const checkToken = async () => {

        const token = localStorage.getItem('token');

        if (!token) return dispatch(onLogout());

        try {

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


