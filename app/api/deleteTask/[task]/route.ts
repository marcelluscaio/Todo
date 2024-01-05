import prisma from "../../../utils/dbConnect";

export async function DELETE(
	request: Request,
	{ params }: { params: { task: string } }
) {
	const { task } = params;

	const result = await prisma.tasks.delete({
		where: {
			id: task,
		},
	});

	return new Response(JSON.stringify(result));
}
