import AsyncStorage from '@react-native-async-storage/async-storage';
import { Todo } from '../entities/todo';

const TODO_STORAGE_KEY = '@todo_storage_key';

export const listTodos = async () => {
  const todosJson = await AsyncStorage.getItem(TODO_STORAGE_KEY);
  return todosJson != null ? JSON.parse(todosJson) : [];
};

export const getTodo = async (id: number) => {
  const todos = await listTodos();
  return todos.find((todo: Todo) => todo.id === id);
};

export const createTodo = async (data: Todo) => {
  const todos = await listTodos();
  const newTodo = {
    ...data,
    id: Math.max(...todos.map((todo: Todo) => todo.id), 0) + 1,
  };
  await AsyncStorage.setItem(
    TODO_STORAGE_KEY,
    JSON.stringify([...todos, newTodo]),
  );
  return newTodo;
};

export const deleteTodo = async (id: number) => {
  const todos = await listTodos();
  const newTodos = todos.filter((todo: Todo) => todo.id !== id);
  await AsyncStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(newTodos));
};
