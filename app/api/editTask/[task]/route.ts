import prisma from "../../../utils/dbConnect";

export async function PUT(
	request: Request,
	{ params }: { params: { task: string } }
) {
	const { name, completed } = await request.json();
	const { task } = params;

	const result = await prisma.tasks.update({
		where: {
			id: task,
		},
		data: {
			name,
			completed,
		},
	});

	return new Response(JSON.stringify(result));
}
