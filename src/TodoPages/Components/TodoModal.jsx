import React, { useState } from 'react'

import DatePicker, { registerLocale } from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";//estilos del calendario

import Modal from 'react-modal';

import { useUiStore } from '../../hooks/useUiStore';

import es from 'date-fns/locale/es';
registerLocale('es', es);

import '../styles/todoModal.css';

import { useTodoStore } from '../../hooks/useTodoStore';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        backgroundColor: '#050622',
        borderRadius: '10px',
        transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#root');

export const TodoModal = ({ addTodo, updateTodo }) => {

    //acciones de la modal
    const { isOpenModal, closeModal } = useUiStore();
    const [todo, setTodo] = useState('');
    const [description, setDescription] = useState('')

    //esto lo usaré para guardar la fecha
    const [form, setForm] = useState({
        _id: new Date().getTime(),
        title: 'titulo desde modal',
        date: new Date()
    });

    const handleDateChange = (date, field) => {
        setForm({
            ...form,
            [field]: date
        })
    };

    const onCloseModal = () => {
        //cerrar modal
        closeModal();
    };

    //cogerá el valor de lo que entre por el input
    const handleInputChange = (ev) => {//cambiar
        setTodo(ev.target.value);
    };

    const handleTextAreaChange = (ev) => {//cambiar
        setDescription(ev.target.value);
    };

    //useState de los errores, le pasaremos un array vacío para hacer las validaciones
    const [error, setError] = useState([]);

    //funcion para añadir el obj al add, validar el formulario y cerrar la modal
    const handleAddTodo = (ev) => {
        ev.preventDefault();
        //aqui vamos a meter los errores
        setError([]);
        //esta variable va a servir para utilizar la fecha actual y compararla con la que entra por el valor de date del formulario
        const actualDate = new Date();

        if (actualDate >= form.date || ev.target.title.value >= 0) {
            if (actualDate >= form.date) setError((error) => [...error, 'Date must be higher than actual date.']);
            if (ev.target.title.value >= 0) setError((error) => [...error, 'You must write something.']);
            return;
        };

        // console.log(ev.target.tarea.value)
        console.log('añadiendo todo desde la modal', form.title);
        //añado el objeto del evento al addElements

        const newTodo = {
            _id: new Date().getTime(),
            title: todo,
            description: description,
            date: form.date.toLocaleDateString(),
            // date: new Date().toLocaleDateString(),
            completed: false,
            user: {//entrará por la bbdd
                _id: '1234',
                name: 'ana'
            }
        };

        addTodo(newTodo);
        //cerramos la modal
        closeModal();
    };

    return (
        <>
            <Modal
                isOpen={isOpenModal}
                onRequestClose={onCloseModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <form onSubmit={handleAddTodo}
                className='form-todo-modal'>
                    <p>Add Todo</p>
                    <div className='input-Text'>
                        <input
                            className='description-text'
                            type="text"
                            name='title'
                            id='title'
                            placeholder='Add title'
                            onChange={handleInputChange} />
                    </div>
                    <div className='description-text'>
                        <input
                            className='description-text'
                            type="text"
                            name='description'
                            id='description'
                            placeholder='Add description'
                            maxLength={31}
                            onChange={handleTextAreaChange} />
                    </div>

                    <DatePicker
                        dateFormat="dd/MM/yyyy"
                        className='description-text'
                        selected={form.date}
                        locale="es"
                        onChange={(date) => handleDateChange(date, 'date')}
                    />
                    <div>
                        {/* mapeo de errores */}
                        <div className='errors'>
                            <ul>
                                {
                                    error.length > 0 && (
                                        error.map(error =>
                                            <li key={error}>{error}</li>)
                                    )
                                }
                            </ul>
                        </div>
                        <button
                            type='submit'
                            className='btn-submit'
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </Modal>
        </>
    )
}
