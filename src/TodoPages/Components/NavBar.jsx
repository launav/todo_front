import { useUiStore } from '../../hooks/useUiStore';

import '../styles/navBar.css'



export const NavBar = ({todo}) => {
  /*funcion click-> me abre la modal, la importamos aquí y 
    traemos aquí la funcionalidad del dispatch de open modal*/
  const { openModal } = useUiStore();

  const handleNewEvent = () => {
    //esta funcion solo sirve para que al hacer click se abra la ventana modal
    openModal();
  };

 
  return (
    <div className='navBarList'>
      <p>Todo-List</p>
      <div>
        <button className='btn-add' onClick={handleNewEvent}>Add New Todo</button>
        <button className='btn-add-hidden' onClick={handleNewEvent}><span>+</span></button>
        <p>Total todos: {todo.length}</p>
      </div>
    </div>

  )
}
