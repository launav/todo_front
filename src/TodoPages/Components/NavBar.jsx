import { useUiStore } from '../../hooks/useUiStore';

import '../styles/navBar.css'



export const NavBar = ({ elements: todos }) => {
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
      </div>
    </div>

  )
}
