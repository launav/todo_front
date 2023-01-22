import { useAuthStore } from '../../auth/hooks/useAuthStore';
import '../styles/cardItem.css';



export const CardItem = ({ elements: element, removeTodo, completeTodo }) => {
  const { _id, date, completed } = element;


  const handleCompleteTodo = (_id) => {
    //si completed es igual a false le pasamos el elemento y seteamos el complete en true
    if (completed === false) {
      completeTodo({ ...element, completed: true })
    };
  };

  return (

    <li className='card-list-item'>
      <div className='esconder-cards'>
        <p>{element.title}</p>
        <p>{element.description}</p>
        <div className='btns-card-item'>
          <button
            className='material-symbols-outlined'
            onClick={() => removeTodo(_id)}>Delete</button>
          <button
            disabled={completed ? true : false}
            onClick={handleCompleteTodo}>{completed ? 'Complete' : 'Pending'}
          </button>
        </div>

      </div>
    </li>
  )

}

