"use client";

import { useState, createContext, useEffect } from "react";
import type { ToDoItem } from "../types/ToDoItem";
//@ts-ignore
import { Tasks } from "@prisma/client"; //apagar o tipo todoItem???
import type { ContextType } from "../types/ContextType";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";

export const Context = createContext<ContextType | null>(null);

export default function ContextProvider() {
	function getTasks() {
		fetch("/api/getTasks", {
			cache: "no-store",
		})
			.then((response) => response.json())
			.then((data) => setToDo(data));
	}

	useEffect(() => {
		console.log("useEffect");

		getTasks();
	}, []);

	const [toDo, setToDo] = useState<ToDoItem[]>([]);

	return (
		<Context.Provider value={{ toDo, setToDo }}>
			<header>To do App</header>
			<TodoForm />
			<TodoList />
		</Context.Provider>
	);
}
