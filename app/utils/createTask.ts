import prisma from "./dbConnect";

async function createTask() {
	await prisma.tasks.create({
		data: {
			name: "Nova tarefa",
			completed: false,
			userId: "UserId",
		},
	});
}
