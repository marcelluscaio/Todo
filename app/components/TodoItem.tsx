import { SetStateAction, useContext, useRef, Dispatch } from "react";
import { extractValidContext } from "../utils/extractValidContext";
import { Context } from "./ContextProvider";
import type { ToDoItem } from "../types/ToDoItem";

type IsEditingItemId = string | null;

type Props = {
	task: ToDoItem;
	isEditingItemId: IsEditingItemId;
	setIsEditingItemId: Dispatch<SetStateAction<IsEditingItemId>>;
};

export default function TodoItem({
	task,
	isEditingItemId,
	setIsEditingItemId,
}: Props) {
	const ref = useRef<HTMLInputElement>(null);
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

	function startEditingTask(id: string) {
		setIsEditingItemId(id);
	}

	function editTask(input: HTMLInputElement, id: string) {
		setIsEditingItemId(null);

		const value = input.value;
		const response = fetch(`/api/editTask/${id}`, {
			method: "PUT",
			body: JSON.stringify({ name: value }),
		});

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
				ref={ref}
				className={`task-input ${isEditingItemId === task.id ? "editing" : ""}`}
				tabIndex={isEditingItemId === task.id ? 0 : -1}
				readOnly={isEditingItemId === task.id ? false : true}
				onChange={(e) =>
					setToDo((previous) =>
						previous.map((tasksItem) =>
							tasksItem.id === task.id
								? {
										id: tasksItem.id,
										name: e.target.value,
										userId: tasksItem.userId,
										completed: tasksItem.completed,
								  }
								: tasksItem
						)
					)
				}
			/>
			<button
				disabled={
					isEditingItemId === task.id || isEditingItemId === null ? false : true
				}
				onClick={() => {
					isEditingItemId !== task.id || isEditingItemId === null
						? startEditingTask(task.id)
						: editTask(ref.current!, task.id);
				}}
			>
				{isEditingItemId !== task.id || isEditingItemId === null
					? "Edit"
					: "Confirm"}
			</button>
			<button
				disabled={
					isEditingItemId === task.id || isEditingItemId === null ? false : true
				}
				onClick={() => deleteTask(task.id)}
			>
				Delete
			</button>
		</li>
	);
}
