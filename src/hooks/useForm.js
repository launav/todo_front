import { useEffect, useMemo, useState } from 'react';

export const useForm = (initialForm = {}, formValidations = {}) => {

    const [formState, setFormState] = useState(initialForm);

    //cuando sucede algún cambio en el estado del formulario invoca al createValidatos
    useEffect(() => {
        createValidators();
    }, [formState])

    //cuando cambia el initial state disparamos el setForm al que le estamos enviando los inital states
    useEffect(() => {
        setFormState(initialForm)
    }, [initialForm])


    const [formValidation, setFormValidation] = useState({})

    //recogemos el input, capturamos el name y value y expandimos el valor que actualmente tenga en el que le modificamos el name y value
    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [name]: value
        });
    }

    const onResetForm = () => {
        setFormState(initialForm);
    }

    //damos una vuelta por cada vuelta por cada llave de ese objeto y recibimos una desestructuración del obj
    const createValidators = () => {
        const formCheckedValues = {};

        for (const formField of Object.keys(formValidations)) {
            const [fn, errorMessage] = formValidations[formField]

            formCheckedValues[`${formField}Valid`] = fn(formState[formField]) ? null : errorMessage
        }

        setFormValidation(formCheckedValues);
    }

    const isFormValid = useMemo(() => {

        for (const formValue of Object.keys(formValidation)) {
            if (formValidation[formValue] !== null) return false;
        }

        return true;


    }, [formValidation])

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,

        ...formValidation,
        isFormValid
    }
}