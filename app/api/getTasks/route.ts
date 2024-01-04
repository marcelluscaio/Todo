import prisma from "@/app/utils/dbConnect";

export async function GET() {
	const tasks = await prisma.tasks.findMany();
	return new Response(JSON.stringify(tasks));
}
