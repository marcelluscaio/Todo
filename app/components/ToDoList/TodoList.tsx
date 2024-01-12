import { Suspense, useContext, useState } from "react";
import { extractValidContext } from "../../utils/extractValidContext";
import { Context } from "../ContextProvider";
import TodoItem from "../ToDoItem/TodoItem";
import styles from "./styles.module.scss";

export default function TodoList() {
	const { toDo } = extractValidContext(useContext(Context));

	const [isEditingItemId, setIsEditingItemId] = useState<string | null>(null);

	return (
		<section className={styles.list}>
			<h2>Tasks</h2>
			<ul>
				{toDo.map((task) => (
					<TodoItem
						task={task}
						isEditingItemId={isEditingItemId}
						setIsEditingItemId={setIsEditingItemId}
						key={task.id}
					/>
				))}
				{toDo.length < 1 && (
					<li>
						<p>Use the form to add tasks to your list.</p>
					</li>
				)}
			</ul>
		</section>
	);
}
