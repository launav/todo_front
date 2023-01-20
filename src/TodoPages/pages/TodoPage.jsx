import { useTodoStore } from '../../hooks/useTodoStore';
import { CardListTodo, NavBar, TodoModal } from '../Components';

import '../styles/todoPage.css'



export const TodoPage = () => {

  const { elements, addElement, deleteElement, completeElement, updateElement } = useTodoStore();

  console.log(useTodoStore())

  return (
    <section className='todo'>
      <div className='navBar'>
        <NavBar elements={elements} />
        <TodoModal todos={elements} addTodo={addElement} updateTodo={updateElement} />
        {console.log(elements)}
      </div>
      <div className='card-list-page'>
        <CardListTodo elements={elements} removeElement={deleteElement} completeElement={completeElement} updateElement={updateElement} />
      </div>
    </section >
  )
}
