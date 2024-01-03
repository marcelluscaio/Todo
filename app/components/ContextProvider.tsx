"use client";

import { useState, createContext, useContext } from "react";

import type { ToDoItem } from "../types/ToDoItem";
import type { ContextType } from "../types/ContextType";

import { extractValidContext } from "../utils/extractValidContext";
import TodoForm from "./TodoForm";

export const Context = createContext<ContextType | null>(null);

export default function ContextProvider() {
	const [toDo, setToDo] = useState<ToDoItem[]>([]);

	return (
		<Context.Provider value={{ toDo, setToDo }}>
			<Main />
		</Context.Provider>
	);
}

function Main() {
	const context = useContext(Context);
	const { toDo, setToDo } = extractValidContext(context);

	function handleInput(e: React.ChangeEvent, id: string) {
		const target = e.target as HTMLInputElement;
		const value = target.value;

		setToDo((previous) =>
			previous.map((task) =>
				task.id === id ? { id: task.id, name: value, complete: task.complete } : task
			)
		);
	}

	function deleteInput(id: string) {
		setToDo((previous) => previous.filter((task) => task.id !== id));
	}

	function updateStatus(id: string) {
		setToDo((previous) =>
			previous.map((task) =>
				task.id === id
					? { id: task.id, name: task.name, complete: !task.complete }
					: task
			)
		);
	}

	return (
		<>
			<header>To do App</header>
			<TodoForm />
			<ul>
				{toDo.map((task) => (
					<li key={task.id}>
						<input
							type="checkbox"
							checked={task.complete}
							onChange={() => {
								updateStatus(task.id);
							}}
						/>
						<input
							value={task.name}
							onChange={(e) => handleInput(e, task.id)}
						/>
						<button onClick={() => deleteInput(task.id)}>Delete</button>
					</li>
				))}
			</ul>
		</>
	);
}
