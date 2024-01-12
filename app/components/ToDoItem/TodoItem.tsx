import { SetStateAction, useContext, useRef, Dispatch } from "react";
import { extractValidContext } from "../../utils/extractValidContext";
import { Context } from "../ContextProvider";
import type { ToDoItem } from "../../types/ToDoItem";
import styles from "./styles.module.scss";
import Button from "../Button/Button";

type Props = {
	task: ToDoItem;
	isEditingItemId: string | null;
	setIsEditingItemId: Dispatch<SetStateAction<Props["isEditingItemId"]>>;
};

export default function TodoItem({
	task,
	isEditingItemId,
	setIsEditingItemId,
}: Props) {
	const ref = useRef<HTMLInputElement>(null);
	const { setToDo } = extractValidContext(useContext(Context));

	function toggleTaskStatus(id: string, isCompleted: boolean) {
		const response = fetch(`/api/editTask/${id}`, {
			method: "PUT",
			body: JSON.stringify({ completed: !isCompleted }),
		}).then((response) => JSON.stringify(response));

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
		<li
			className={styles.item}
			key={task.id}
		>
			<div className={styles["input-container"]}>
				<input
					type="checkbox"
					checked={task.completed}
					aria-label={`Mark task ${task.name} as complete`}
					disabled={isEditingItemId === null ? false : true}
					onChange={() => {
						toggleTaskStatus(task.id, task.completed);
					}}
				/>
				<input
					value={task.name}
					type="text"
					ref={ref}
					className={`${isEditingItemId === task.id ? styles.editing : ""}`}
					tabIndex={isEditingItemId === task.id ? 0 : -1}
					readOnly={isEditingItemId === task.id ? false : true}
					onClick={() => {
						isEditingItemId === null && !task.completed
							? startEditingTask(task.id)
							: undefined;
					}}
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							editTask(ref.current!, task.id);
						}
					}}
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
			</div>
			<div className={styles["buttons-container"]}>
				<Button
					text={
						isEditingItemId !== task.id || isEditingItemId === null
							? "Edit"
							: "Confirm"
					}
					disabled={
						(isEditingItemId !== task.id && isEditingItemId !== null) ||
						task.completed
							? true
							: false
					}
					onClick={() => {
						isEditingItemId !== task.id || isEditingItemId === null
							? startEditingTask(task.id)
							: editTask(ref.current!, task.id);
					}}
				/>
				<Button
					text="Delete"
					disabled={isEditingItemId === null ? false : true}
					onClick={() => deleteTask(task.id)}
				/>
			</div>
		</li>
	);
}
