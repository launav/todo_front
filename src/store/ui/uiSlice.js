// nos va a servir para despachar los métodos que nos vana permitir abrir y cerrar la modal para añadir el evento
import { createSlice } from '@reduxjs/toolkit'
import React from 'react'

export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        isOpenModal: false
    },
    reducers: {
        onOpenModal: (state) => {
            state.isOpenModal = true;
        },
        onCloseModal: (state) => {
            state.isOpenModal = false;
        }
    }
});

export const { onOpenModal, onCloseModal } = uiSlice.actions;
