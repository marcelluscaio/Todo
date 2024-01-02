"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { FormEvent, MouseEventHandler, useState } from "react";

export default function Home() {
	type ToDo = {
		id: string;
		name: string;
	};

	const [toDo, setToDo] = useState<ToDo[]>([]);

	function handleButton(e: FormEvent) {
		e.preventDefault();
		const form = e.target as HTMLFormElement;
		//@ts-ignore
		const input = form.elements["todo"] as HTMLInputElement;
		if (input.value.trim() === "") {
			return;
		}
		const value = input.value;
		const id = crypto.randomUUID();
		setToDo((previous) => [...previous, { id: id, name: value }]);
		input.value = "";
	}

	function handleInput(e: React.ChangeEvent, id: string) {
		const target = e.target as HTMLInputElement;
		const value = target.value;

		setToDo((previous) =>
			previous.map((task) => (task.id === id ? { id: id, name: value } : task))
		);
	}

	function deleteInput(id: string) {
		setToDo((previous) => previous.filter((task) => task.id !== id));
	}

	return (
		<>
			<header>To do App</header>
			<form onSubmit={(e) => handleButton(e)}>
				<input name="todo" />
				<button type="submit">Create</button>
			</form>
			<ul>
				{toDo.map((task) => (
					<li key={task.id}>
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
