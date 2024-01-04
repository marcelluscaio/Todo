import { Tasks } from "@prisma/client";
import ContextProvider from "./components/ContextProvider";
import prisma from "./utils/dbConnect";

export const dynamic = "force-dynamic";

export default async function Home() {
	const response = await fetch("http://localhost:3000/api/getTasks", {
		cache: "no-store",
	});
	const tasks: Awaited<Promise<Tasks[]>> = await response.json();

	/* const tasks = await prisma.tasks.findMany(); */
	return <ContextProvider tasks={tasks} />;
}
