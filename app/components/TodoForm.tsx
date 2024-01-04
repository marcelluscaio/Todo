import { FormEvent, useContext } from "react";
import { Context } from "./ContextProvider";
import { extractValidContext } from "../utils/extractValidContext";
/* import { createTask } from "../api/createTask/route"; */

export default function TodoForm() {
	const { setToDo } = extractValidContext(useContext(Context));

	function handleButton(e: FormEvent) {
		e.preventDefault();

		const input = getInputFromForm(e);

		if (input.value.trim() !== "") {
			createToDo(input);

			resetInput(input);
		}
	}

	function getInputFromForm(event: FormEvent) {
		const form = event.target as HTMLFormElement;
		const input = form.elements[
			"todo" as keyof typeof form.elements
		] as HTMLInputElement;

		return input;
	}

	async function createToDo(input: HTMLInputElement) {
		const value = input.value;
		const id = crypto.randomUUID();
		setToDo((previous) => [
			...previous,
			{ id: id, name: value, completed: false, userId: "Random ID" },
		]);

		try {
			await fetch("/api/createTask", {
				method: "POST",
				body: JSON.stringify({
					/* id: id, */
					name: value,
					completed: false,
					userId: "Random ID",
				}),
			});
		} catch (error) {
			console.log("Error: ", error);
		}
	}

	function resetInput(input: HTMLInputElement) {
		input.value = "";
	}

	return (
		<form onSubmit={(e) => handleButton(e)}>
			<input name="todo" />
			<button type="submit">Create</button>
		</form>
	);
}
