import { CardItem } from './CardItem';
import { useState } from 'react';

import '../styles/cardListTodo.css'

export const CardListTodo = ({ removeElement, completeElement, pgnt }) => {

  //para los botones y los maps que me devolverán los diferentes estados de los elementos: completados, pendientes y todos
  const [sort, setSort] = useState('all');

  return (

    <div className='todo'>
      <div className='links-btns'>
        <button onClick={() => setSort('all')}>All</button>
        <button onClick={() => setSort('completed')}>Complete</button>
        <button onClick={() => setSort('pending')}>Pending</button>
      </div>
      <div className='card-list'>
        <ul>
          {/* si no hay elementos */}
          {
            pgnt.length == 0 ?
              (
                <p>No hay elementos que mostrar</p>
              )
              :
              (null)
          }

          {/* todos los elementos */}
          {
            pgnt.length > 0 && sort === 'all'
              ?
              pgnt.map(element => {

                return (
                  <CardItem
                    key={element._id}
                    elements={element}
                    removeTodo={removeElement}
                    completeTodo={completeElement}
                  />)
              }) :
              null
          }

          {/* elementos completados */}
          {
            pgnt.length > 0 && sort === 'completed'
              ?
              pgnt.map(element => {
                return (
                  element.completed && (
                    <CardItem
                      key={element._id}
                      elements={element}
                      removeTodo={removeElement}
                      completeTodo={completeElement}
                    />
                  )
                );
              }) :
              null
          }

          {/* elementos pendientes */}
          {
            pgnt.length > 0 && sort === 'pending'
              ?
              pgnt.map(element => {
                return (
                  element.completed == false && (
                    <CardItem
                      key={element._id}
                      elements={element}
                      removeTodo={removeElement}
                      completeTodo={completeElement}
                    />
                  )
                );
              }) :
              null
          }

        </ul>
      </div>
    </div >
  )
}
