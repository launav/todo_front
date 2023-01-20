import { createSlice } from '@reduxjs/toolkit'


const todoElement = {
    _id: 'fre',
    title: 'titulo desde slice',
    description: 'descripcion desde slice',
    date: '20/04/28',
    completed: false,
    user: {
        // _id porq mongo me devuelve el id con el guion bajo
        _id: '1234',
        name: 'usuario'
    }
}

//clase 43->33:34

export const todoSlice = createSlice({
    name: 'todo',
    initialState: {
        isLoading: true,
        elements: [todoElement],
        //lo necesitaré para cuando quiera eliminar un todo
    },
    reducers: {
        //añade un evento 
        onAddElement: (state, { payload }) => {
            state.elements.push(payload);
            console.log('guardando elemento');
        },
        //elimina un evento activo? o quiero que me elimine el elemento por el id
        onDeleteElement: (state, { payload }) => {
            const newTodoList = state.elements.filter(item => item._id !== payload);
            state.elements = newTodoList;
        },
        //completar
        onCompleteElement: (state, { payload }) => {
            state.elements = state.elements.map(item => {
                if (item._id === payload._id) return { ...item, completed: !item.completed }
                return item
            });

        }
        //actualizar
        // onUpdateTodo: (state, { payload }) => {
        //     state.elements = state.elements.map(item => {
        //         if (item._id === payload._id) return item= [item.description]
        //         return item
        //     })
        // },
    }
})

export const { onAddElement, onDeleteElement, onCompleteElement, onUpdateTodo } = todoSlice.actions;
//falta exportar el delete y update

