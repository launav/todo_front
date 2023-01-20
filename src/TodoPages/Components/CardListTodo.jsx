import { CardItem } from './CardItem';
import { useState } from 'react';

import '../styles/cardListTodo.css'


export const CardListTodo = ({ elements, removeElement, completeElement, updateElement }) => {

  const [sort, setSort] = useState('all');

  return (
    <div className='todo'>

      <div className='links-btns'>
        <button onClick={() => setSort('all')}>All</button>
        <button onClick={() => setSort('completed')}>Complete</button>
      </div>
      <div className='card-list'>
        <ul>
          {
            elements.length > 0 && sort === 'all'
              ?
              elements.map(element => {
                return (

                  <CardItem
                    key={element._id}
                    elements={element}
                    removeTodo={removeElement}
                    completeTodo={completeElement}
                    updateTodo={updateElement}
                  />
                )

              }) :
              null
          }
          {/* para los completados */}
          {
            elements.length > 0 && sort === 'completed'
              ?
              elements.map(element => {
                return (
                  element.completed && (
                    <CardItem
                      key={element._id}
                      elements={element}
                      removeTodo={removeElement}
                      completeTodo={completeElement}
                      updateTodo={updateElement}
                    />
                  )
                );
              }) :
              null}
        </ul>
      </div>
    </div >
  )
}
