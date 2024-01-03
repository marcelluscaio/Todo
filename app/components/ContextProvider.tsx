"use client";

import { useState, createContext, useContext } from "react";
import type { ToDoItem } from "../types/ToDoItem";
import type { ContextType } from "../types/ContextType";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";

export const Context = createContext<ContextType | null>(null);

export default function ContextProvider() {
	const [toDo, setToDo] = useState<ToDoItem[]>([]);

	return (
		<Context.Provider value={{ toDo, setToDo }}>
			<header>To do App</header>
			<TodoForm />
			<TodoList />
		</Context.Provider>
	);
}
