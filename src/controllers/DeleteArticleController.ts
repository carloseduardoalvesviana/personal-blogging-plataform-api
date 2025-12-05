import type { FastifyReply, FastifyRequest } from "fastify";
import { NotFoundError } from "../errors/NotFoundError";
import type { DeleteArticleUseCase } from "../use-cases/DeleteArticleUseCase";

export class DeleteArticleController {
	constructor(private deleteArticleUseCase: DeleteArticleUseCase) {}

	async handle(request: FastifyRequest, reply: FastifyReply) {
		try {
			const { id } = request.params as { id: string };

			await this.deleteArticleUseCase.execute(id);

			return reply.status(200).send();
		} catch (error) {
			if (error instanceof NotFoundError) {
				return reply.status(404).send({
					message: error.message,
				});
			}
			console.error(error);

			throw error;
		}
	}
}
