import { useUiStore } from '../../hooks/useUiStore'

export const BtnAddElement = () => {
  /*funcion click-> me abre la modal, la importamos aquí y 
  traemos aquí la funcionalidad del dispatch de open modal*/
  const { openModal } = useUiStore();

  const handleNewEvent = () => {
    //esta funcion solo sirve para que al hacer click se abra la ventana modal
    openModal();
  };

  return (
    <button onClick={handleNewEvent}>
      Add element
    </button>
  )
}
