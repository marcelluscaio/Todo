import { ContextType } from "../types/ContextType";

export function extractValidContext(context: ContextType | null) {
	if (context === null) {
		throw new Error("Use within provider");
	}
	return context;
}
