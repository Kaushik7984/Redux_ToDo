import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addTodo, editTodo, removeTodo, updateTodo, editTodoSubmitToStore } from '../features/todo/todoSlice'
import AddTodo from './AddTodo'

function Todos() {
  const [todoType, setTodoType] = useState("div")
  const [editInput, setEditInput] = useState("error")

  const todos = useSelector(state => state.todos)
  const dispatch = useDispatch()


  const editTodoSubmit = (event, todoId, mode, todoText) => {
    event.preventDefault()
    let value

    if (mode === "Submit") {
      console.log("Submit Edit!")
      if (editInput === '') {
        value = todoText
        dispatch(editTodoSubmitToStore({ todoId, value }))
      }
      else {
        value = editInput
        dispatch(editTodoSubmitToStore({ todoId, value }))
      }
    }
    if (mode === "Edit") {
      console.log("Switch to Edit!")
      dispatch(editTodo(todoId))
    }

    setEditInput('')

  }



  return (
    <>
      {/* <div>Todos</div> */}
      <ul className="list-none">
        {console.log(todos)}
        {todos.length === 0 ?
          <p className="mt-10 flex  justify-center items-center bg-zinc-800 px-4 py-2 rounded text-white text-3xl font-sans" >You have no pendin tasks !!</p>
          :

          todos.map((todo) => {
            console.log(todo.isTodoEdit)
            return (
              <li
                className="mt-4 flex justify-between items-center bg-zinc-800 px-4 py-2 rounded"
                key={todo.id}
              >

                <form onSubmit={() => { editTodoSubmit(event, todo.id, todo.isTodoEdit === true ? "Submit" : "Edit", todo.text) }} >

                  {todo.isTodoEdit === true ? <input defaultValue={todo.text} type="text" onChange={(e) => setEditInput(e.target.value)} required /> : <div className='text-white'> {todo.text}</div>}


                  {/* Edit and Submit Button */}
                  <button
                    type='submit'
                    className={`absolute right-[430px] text-white h-8 bg-red-500 border-0 py-1  ${todo.isTodoEdit === true ? "mt-[-4px]" : "mt-[-28px]"} px-4 focus:outline-none  hover:bg-red-600 rounded text-md`}
                  >{todo.isTodoEdit === true ? "Submit" : "Edit"}
                  </button>
                </form>


                {/* Delete Button */}
                <button
                  onClick={() => dispatch(removeTodo(todo.id))}
                  className="text-white bg-red-500 border-0 py-1 px-4 focus:outline-none relative hover:bg-red-600 rounded text-md"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </button>
              </li>
            )
          })
        }

      </ul>
    </>

  )

}

export default Todos