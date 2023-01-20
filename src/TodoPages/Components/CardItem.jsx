// import { useRef } from 'react';
import '../styles/cardItem.css';


export const CardItem = ({ elements: element, removeTodo, completeTodo, updateTodo }) => {
  const { _id, title, description, date, completed } = element;

  //funcion que cogeria el valor y los atrbs de textarea para actualizarla
  // const inputRef = useRef(true);

  // const handleTextArea = (_id,description) => {
  //   if (inputRef.current.disabled === true) {
  //     inputRef.current.disabled = false
  //     inputRef.current.focus();
  //     updateTodo({ _id, description })
  //   } else {
  //     inputRef.current.disabled = true
  //   }
  // };




  return (
    <li className='card-list-item'>
      <div>
        <p>{title}</p>
        <p>{description}</p>
        {/* esto es lo que quiero poner */}
        {/* <textarea
          ref={inputRef}
          disabled={true}
          defaultValue={description}
        ></textarea> */}
        <p>{date}</p>
        <div className='btns-card-item'>
          <button
            className='material-symbols-outlined'
            onClick={() => removeTodo(_id)}>Delete</button>
          <button
            // disabled={completed ? true : false}
            onClick={() => completeTodo({ _id })}>{completed ? 'Complete' : 'Pending'}</button>
          {/* <button onClick={() => handleTextArea(description)}>edit</button> */}
        </div>
      </div>
    </li>
  )

}

