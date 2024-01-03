import { Dispatch, SetStateAction } from "react";
import type { ToDoItem } from "../types/ToDoItem";

export type ContextType = {
	toDo: ToDoItem[];
	setToDo: Dispatch<SetStateAction<ToDoItem[]>>;
};
