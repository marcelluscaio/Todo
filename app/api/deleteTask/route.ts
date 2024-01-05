import prisma from "../../utils/dbConnect";

export async function POST(request: Request) {
	const task = await request.json();
	await prisma.tasks.create({
		data: task,
	});

	return new Response(JSON.stringify(task));
}
