import ContextProvider from "./components/ContextProvider";
import prisma from "./utils/dbConnect";
/* import connectWithDatabase, { testConnection } from "./utils/dbConnect"; */

export default async function Home() {
	const users = await prisma.users.findMany();
	console.log(users);

	/* const connection = await connectWithDatabase();
	await testConnection(connection); */

	return <ContextProvider />;
}
