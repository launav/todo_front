import { el } from 'date-fns/locale';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import todoApi from '../api/todoApi';
import { onAddElement, onCompleteElement, onDeleteElement, onLoadElement } from '../store/todo/todoSlice';

//despachamos los métodos creados en el slice
export const useTodoStore = () => {

    const { elements } = useSelector((state) => state.todo);
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    //me mostrará las cosas de la bbdd
    const getElements = async (_id) => {

        try {
            //desestructuramos la data y accedemos a los todos a través de ella
            const { data } = await todoApi.get('/todo');
            //estraemos de la data los todos
            const { todos } = data;
            /*creamos una constante a la que le vamos a pasar como parametro el id y nos va a devolver el array que coincida
            con el id del usuario y el id del usuario que ha añadido/modificado el todo*/
            const encontrados = (_id) => todos.filter(todo => todo.user._id === user.uid || user.uid === todo.user._id);
            //lo despachamos pasandole la función de encontrados
            dispatch(onLoadElement(encontrados()));

        } catch (error) {
            // console.log(error);
            Swal.fire('Error getting todo', error.response.data.msg);
        };
    };

    //creara un elemento y lo añadirá a la bbdd
    const addElement = async (element) => {

        try {
            //crear
            const { data } = await todoApi.post('/todo/', element);

            // console.log(data);
            /*por el formulario (...element será el formulario) nos entrará el titulo, la fecha y descricion, 
            por lo que por aquí le tenemos que pasar el id*/
            dispatch(onAddElement({ _id: data.newTodo._id, ...element }));

        } catch (error) {
            // console.log(error)
            Swal.fire('Error adding To-do', error.response.data.msg);
        };
    };

    //completar el todo
    const completeElement = async (element) => {

        try {
            /*cogemos el id del todo y se lo pasamos como params a la url, despues de eso le pasamos el elemento 
            que nos vaya a devolver, una vez hecho esto despachamos el reducer de completar el todo y le pasamos 
            el rest del elemento como argumento y el usuario que ha modificado el todo */
            if (element._id) {
                await todoApi.put(`/todo/${element._id}`, element);
                dispatch(onCompleteElement({ ...element, user }))
            }
        } catch (error) {
            Swal.fire('Error updating todo', error.response.data.msg);
        };
    };

    //eliminar todo
    const deleteElement = async (_id) => {
        //como argumneto el id, que se lo pasaremos como param a la url, no nos devuelve nada, solo elimina
        try {
            await todoApi.delete(`/todo/${_id}`)
            dispatch(onDeleteElement(_id));

        } catch (error) {
            Swal.fire('Error deleting todo', error.response.data.msg);
        }

        // console.log('borrando desde store');
    };

    return {
        elements,
        getElements,
        addElement,
        deleteElement,
        completeElement
    }
};

