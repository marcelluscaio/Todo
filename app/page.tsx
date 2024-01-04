import ContextProvider from "./components/ContextProvider";
import prisma from "./utils/dbConnect";

export default async function Home() {
	const users = await prisma.users.findMany();
	const tasks = await prisma.tasks.findMany();

	return <ContextProvider tasks={tasks} />;
}
