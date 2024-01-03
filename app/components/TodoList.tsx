import { useContext } from "react";
import { extractValidContext } from "../utils/extractValidContext";
import { Context } from "./ContextProvider";
import TodoItem from "./TodoItem";

export default function TodoList() {
	const { toDo } = extractValidContext(useContext(Context));

	return (
		<ul>
			{toDo.map((task) => (
				<TodoItem
					task={task}
					key={task.id}
				/>
			))}
		</ul>
	);
}
