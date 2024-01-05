import prisma from "@/app/utils/dbConnect";

export const revalidate = 0;

export async function GET(req: Request) {
	const tasks = await prisma.tasks.findMany();
	return new Response(JSON.stringify(tasks));
}
