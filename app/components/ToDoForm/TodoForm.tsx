import { FormEvent, useContext } from "react";
import { Context } from "../ContextProvider";
import { extractValidContext } from "../../utils/extractValidContext";
import Button from "../Button/Button";
import styles from "./styles.module.scss";

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

		try {
			const response = await fetch("/api/createTask", {
				method: "POST",
				body: JSON.stringify({
					name: value,
					completed: false,
					userId: "Random ID",
				}),
			});

			const task = await response.json();
			setToDo((previous) => [...previous, task]);
		} catch (error) {
			console.log("Error: ", error);
		}
	}

	function resetInput(input: HTMLInputElement) {
		input.value = "";
	}

	return (
		<form
			className={styles.form}
			onSubmit={(e) => handleButton(e)}
		>
			<div>
				<input
					autoComplete="off"
					name="todo"
					aria-label="Add task to list"
				/>
				<Button
					type="submit"
					text="Create"
				/>
			</div>
		</form>
	);
}
