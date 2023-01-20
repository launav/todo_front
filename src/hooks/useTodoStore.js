import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { onAddElement, onCompleteElement, onDeleteElement, onUpdateTodo, todoSlice } from '../store/todo/todoSlice';

//despachamos los métodos creados en el slice
export const useTodoStore = () => {
    const { elements } = useSelector((state) => state.todo);
    const dispatch = useDispatch();

    //pongo en duda si lo voy a utilizar porque realmente no quiero modificar, solo quiero un toggle desde un btn

    const addElement = (newTodo) => {
        dispatch(onAddElement(newTodo));
    };
    const deleteElement = (_id) => {
        dispatch(onDeleteElement(_id));
        console.log('borrando desde store')
    };
    const completeElement = (_id) => {
        dispatch(onCompleteElement(_id))
        console.log('completando desde store')
    };
    const updateElement = ({ _id, description }) => {
        // dispatch(onUpdateTodo(_id, description));
        console.log(_id, description)
    }
    //completar

    return {
        elements,
        addElement,
        deleteElement,
        completeElement,
        updateElement
    }
};

