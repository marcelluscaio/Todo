import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../utils/dbConnect";
import { Tasks } from "@prisma/client";

/* export async function createTask(task: Tasks) {
	try {
		await prisma.tasks.create({
			data: task,
		});
		console.log("Created");
	} catch (error) {
		console.error("Error: ", error);
	}
} */

/* export default async function GET(req, res) {
	return res.status(200).json({ message: "Hello from Next.js!" });

	console.log("hi");
} */

/* export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === "POST") {
		// Create a new task
		const content = req.body as Tasks;
		const task = await prisma.tasks.create({
			data: content,
		});
		res.json(task);
	} else if (req.method === "GET") {
		// Fetch all tasks
		const tasks = await prisma.tasks.findMany();
		res.json(tasks);
	} else {
		res.status(405).json({ message: "Method not allowed" });
	}
} */

export async function GET(request: Request) {
	return new Response("hi");
}

export async function POST(request: Request) {
	const task = await request.json();
	await prisma.tasks.create({
		data: task,
	});

	return new Response(JSON.stringify(task));

	/* console.log(body); */
	/* return new Response(JSON.stringify(body)); */
}
