import { useEffect, useState } from 'react';
import { useTodoStore } from '../../hooks/useTodoStore';
import { CardListTodo, NavBar, TodoModal } from '../Components';
import { Pagination } from '../Components/Pagination';

import '../styles/todoPage.css'


// contendrá todos los elementos del ToDo
export const TodoPage = () => {

  const { elements, getElements, deleteElement, completeElement } = useTodoStore();

  //paginacion
  //le damos como valir inicial al cp 1
  const [currentPage, setCurrentPage] = useState(1);
  //meteremos 6 elementos por página
  const [todoPerPage] = useState(6);

  //multiplicamos la cp y los todos para sacar el total de lo que vamos a tener, esto irá aumentando o disminuyendo
  const indexOfLastElement = currentPage * todoPerPage;
  //el indice del ultEl menos los todosPp
  const indexOfFirstElement = indexOfLastElement - todoPerPage;

  //extraemos un array de los elementos desde el primer indice hasta el ultimo, que es lo que le pasamos como argumentos
  const currentElements = elements.slice(indexOfFirstElement, indexOfLastElement);

  //nos divide la longitud del array de elementos por los todos que tenemos por pagina y nos devuelve un entero
  const numPages = Math.ceil(elements.length / todoPerPage);
  //exponer los items de cada usuario

  //utilizamos el getElements del store del todo para que nos pinte los elementos, cada vez que abramos la app
  useEffect(() => {
    //nos va a devolver el array de encontrados que hemos hecho en el useTodoSlice
    getElements()
  }, [])

  return (
    /* contendrá dos div uno con el navbar para añddir elementos que estará conectado con la ventana modal
    y otro div con los todos y la paginacion*/
    <section className='todo'>
      <div className='navBar'>
        <NavBar todo={elements} />
        <TodoModal />
        {/* {console.log(elements)} */}
      </div>
      <div className='card-list-page'>

        <CardListTodo
          pgnt={currentElements}
          elements={elements}
          removeElement={deleteElement}
          completeElement={completeElement}
        />
        <Pagination
          numPages={numPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </section >
  )
}
