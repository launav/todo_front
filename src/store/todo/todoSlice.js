import { createSlice } from '@reduxjs/toolkit'


// const todoElement = {
//     _id: 'fre',
//     title: 'titulo desde slice',
//     description: 'descripcion desde slice',
//     date: '20/04/28',
//     completed: false,
//     user: {
//         // _id porq mongo me devuelve el id con el guion bajo
//         _id: '1234',
//         name: 'usuario'
//     }
// }


export const todoSlice = createSlice({
    name: 'todo',
    initialState: {
        isLoading: true,
        elements: [],
    },
    reducers: {
        //añade un evento 
        onAddElement: (state, { payload }) => {
            //pusheamos el payload/evento
            state.elements.push(payload);
            console.log('guardando elemento');
        },
        //elimina un evento, este reducer nos devolverá un nuevo array sin el elemento que hemos borrado
        onDeleteElement: (state, { payload }) => {
            const newTodoList = state.elements.filter(item => item._id !== payload);
            state.elements = newTodoList;
        },
        //completar, si el item id es igual al del payload que me devuelva el estado del item
        onCompleteElement: (state, { payload }) => {
            state.elements = state.elements.map(item => {
                if (item._id === payload._id) return { ...item, completed: !item.completed }
                return item
            });
        },
        //cargará los toDos en la página de usuario, el payload serán los elementos que le entren de la bbdd
        onLoadElement: (state, { payload }) => {
            state.isLoading = true;
            state.elements = payload;
        }
    }
})

//los exportamos
export const { onAddElement, onDeleteElement, onCompleteElement, onLoadElement } = todoSlice.actions;
//falta exportar el delete y update

