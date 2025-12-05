import type { FastifyReply, FastifyRequest } from "fastify";
import { NotFoundError } from "../errors/NotFoundError";
import type { FindArticleByIdUseCase } from "../use-cases/FindArticleByIdUseCase";

export class FindArticleByIdController {
	constructor(private findArticleByIdUseCase: FindArticleByIdUseCase) {}

	async handle(request: FastifyRequest, reply: FastifyReply) {
		try {
			const { id } = request.params as { id: string };

			const article = await this.findArticleByIdUseCase.execute(id);

			if (!article) {
				return reply.status(404).send({ message: "Article not found" });
			}

			return reply.status(200).send({ article });
		} catch (error) {
			if (error instanceof NotFoundError) {
				return reply.status(404).send({ message: error.message });
			}

			console.log(error);

			throw error;
		}
	}
}
