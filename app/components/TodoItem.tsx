import { useContext } from "react";
import { extractValidContext } from "../utils/extractValidContext";
import { Context } from "./ContextProvider";
import type { ToDoItem } from "../types/ToDoItem";

type Props = {
	task: ToDoItem;
};

export default function TodoItem({ task }: Props) {
	const { setToDo } = extractValidContext(useContext(Context));

	function toggleTaskStatus(id: string) {
		setToDo((previous) =>
			previous.map((task) =>
				task.id === id
					? {
							id: task.id,
							name: task.name,
							userId: task.userId,
							completed: !task.completed,
					  }
					: task
			)
		);
	}

	function editTask(e: React.ChangeEvent, id: string) {
		const target = e.target as HTMLInputElement;
		const value = target.value;
		const response = fetch(`/api/editTask/${id}`, {
			method: "PUT",
			body: JSON.stringify({ name: value }),
		}).then((response) => response.json());
		setToDo((previous) =>
			previous.map((task) =>
				task.id === id
					? {
							id: task.id,
							name: value,
							userId: task.userId,
							completed: task.completed,
					  }
					: task
			)
		);
	}

	function deleteTask(id: string) {
		const response = fetch(`/api/deleteTask/${id}`, { method: "DELETE" })
			.then((response) => response.json())
			.then((response) =>
				setToDo((previous) => previous.filter((task) => task.id !== response.id))
			);
	}

	return (
		<li key={task.id}>
			<input
				type="checkbox"
				checked={task.completed}
				onChange={() => {
					toggleTaskStatus(task.id);
				}}
			/>
			<input
				value={task.name}
				onChange={(e) => editTask(e, task.id)}
			/>
			<button onClick={() => deleteTask(task.id)}>Delete</button>
		</li>
	);
}
