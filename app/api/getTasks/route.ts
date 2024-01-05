import prisma from "@/app/utils/dbConnect";

export async function GET(req: Request) {
	console.log(req.url);
	const tasks = await prisma.tasks.findMany();
	return new Response(JSON.stringify(tasks));
}
