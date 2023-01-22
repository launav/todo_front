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

export const TodoModal = () => {

    //llamamos al dispacth de añadir elementos
    const { addElement } = useTodoStore();

    //acciones de la modal
    const { isOpenModal, closeModal } = useUiStore();

    //esto lo usaré para guardar los datos del form
    const [formValues, setFormValues] = useState({
        title: '',
        description: '',
        completed: false,
        date: new Date()
    });

    //le mandamos como primer argumento el valor inicial del formulario
    const handleDateChange = (date, field) => {
        setFormValues({
            ...formValues,
            [field]: date
        });
    };

    //delegacion de eventos,cada elemento/input seleccionado tendrá el valor que le corresponde debido al name
    const handleInputchange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        });
    }

    //cerramos la modal
    const onCloseModal = () => {
        closeModal();
    };

    const resetForm = () => {
        setFormValues({
            ...formValues,
            title: '',
            description: '',
            completed: false,
            date: new Date()
        })
    }

    //useState de los errores, le pasaremos un array vacío para hacer las validaciones
    const [error, setError] = useState([]);

    //funcion para añadir el obj al add, validar el formulario y cerrar la modal
    const handleAddTodo = (ev) => {
        ev.preventDefault();

        //aqui vamos a meter los errores
        setError([]);

        //esta variable va a servir para utilizar la fecha actual y compararla con la que entra por el valor de date del formulario
        //constante que nos almacenará la fecha actual y que la utilizaremos para ver que lo que nos entre por el formulario
        //sea mayor que la fecha actual
        const actualDate = new Date();

        /*si la fecha actual es mayor que la fecha del formulario que me setee el error de que lo que entre
        debe ser mayor, y si lo que entre por el input del titulo sea mayor que 0, si es igual a 0 que devuelva
        un error */
        if (actualDate >= formValues.date || isNaN(formValues.title.length >= 0)) {
            if (actualDate >= formValues.date) setError((error) => [
                ...error, 'Date must be higher than actual date.'
            ]);
            if (formValues.title.length >= 0) setError((error) => [...error, 'You must write something.']);
            return;
        };

        //añadir elementos y le pasamos el estado del formulario
        addElement(formValues);
        resetForm();
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
                            value={formValues.title}
                            placeholder='Add title'
                            onChange={handleInputchange} />
                    </div>
                    <div className='description-text'>
                        <input
                            className='description-text'
                            type="text"
                            name='description'
                            value={formValues.description}
                            placeholder='Add description'
                            maxLength={31}
                            onChange={handleInputchange} />
                    </div>

                    <DatePicker
                        dateFormat="dd/MM/yyyy"
                        className='description-text'
                        selected={formValues.date}
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
