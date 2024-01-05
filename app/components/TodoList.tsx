import { useContext, useState } from "react";
import { extractValidContext } from "../utils/extractValidContext";
import { Context } from "./ContextProvider";
import TodoItem from "./TodoItem";

export default function TodoList() {
	const { toDo } = extractValidContext(useContext(Context));

	const [isEditingItemId, setIsEditingItemId] = useState<string | null>(null);

	return (
		<ul>
			{toDo.map((task) => (
				<TodoItem
					task={task}
					isEditingItemId={isEditingItemId}
					setIsEditingItemId={setIsEditingItemId}
					key={task.id}
				/>
			))}
		</ul>
	);
}
