import { useDispatch, useSelector } from 'react-redux';
import { onCloseModal, onOpenModal, uiSlice } from '../store/ui/uiSlice'

//despachamos el uiSlice
export const useUiStore = () => {
    //   del initialState vamos a usar isOpenModal para definir lo que vamos a hacer
    const { isOpenModal } = useSelector((state) => state.ui);
    const dispatch = useDispatch();

    //abre la modal
    const openModal = () => {
        dispatch(onOpenModal());
    };

    //cierra la modal
    const closeModal = () => {
        dispatch(onCloseModal());
    };

    return {
        isOpenModal,
        openModal,
        closeModal
    };
};
