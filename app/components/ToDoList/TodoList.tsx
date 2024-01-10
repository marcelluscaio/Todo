import { useContext, useState } from "react";
import { extractValidContext } from "../../utils/extractValidContext";
import { Context } from "../ContextProvider";
import TodoItem from "../ToDoItem/TodoItem";
import styles from "./styles.module.scss";

export default function TodoList() {
	const { toDo } = extractValidContext(useContext(Context));

	const [isEditingItemId, setIsEditingItemId] = useState<string | null>(null);

	return (
		<ul className={styles.list}>
			<h2>Tasks</h2>
			{toDo.map((task) => (
				<TodoItem
					task={task}
					isEditingItemId={isEditingItemId}
					setIsEditingItemId={setIsEditingItemId}
					key={task.id}
				/>
			))}
			{toDo.length < 1 && <p>Use form to add tasks to your list</p>}
		</ul>
	);
}
