import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  todos: [{ id: 1, text: "Hello world", isTodoEdit: false }],
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const todo = {
        id: nanoid(),
        text: action.payload,
      };
      state.todos.push(todo);
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    updateTodo: (state, action) => {
      state.todos = state.todos.map((todo) =>
        todo.id === action.payload ? todo : todo
      );
    },

    // to change mode of todo
    editTodo: (state, action) => {
      
      state.todos = state.todos.map((todo) => {
        if (action.payload === todo.id) {
          return { ...todo, isTodoEdit: !todo.isTodoEdit };
        } else {
          return todo;
        }
      });
    },

    // To submit todo
    editTodoSubmitToStore: (state, action) => {
      state.todos = state.todos.map((todo) => {
        if (action.payload.todoId === todo.id && todo.isTodoEdit === true) {
          return {
            ...todo,
            isTodoEdit: !todo.isTodoEdit,
            text: action.payload.editInput,
          };
        } else {
          return todo;
        }
      });
    },
  },
});

export const {
  addTodo,
  removeTodo,
  updateTodo,
  editTodo,
  editTodoSubmitToStore,
} = todoSlice.actions;

export default todoSlice.reducer;
