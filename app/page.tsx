"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { FormEvent, MouseEventHandler, useState } from "react";

export default function Home() {
	type ToDo = string;

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
		setToDo((previous) => [...previous, value]);
		input.value = "";
	}
	return (
		<>
			<header>To do App</header>
			<form onSubmit={(e) => handleButton(e)}>
				<input name="todo" />
				<button type="submit">Create</button>
			</form>
			<ul>
				{toDo.map((task, index) => (
					<li key={index}>{task}</li>
				))}
			</ul>
		</>
	);
}
