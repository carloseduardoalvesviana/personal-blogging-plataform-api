import type { FastifyReply, FastifyRequest } from "fastify";
import type { UpdateArticleRequestDTO } from "../dto/UpdateArticleRequestDTO.ts";
import { NotFoundError } from "../errors/NotFoundError";
import { ValidationError } from "../errors/ValidationError";
import type { UpdateArticleUseCase } from "../use-cases/UpdateArticleUseCase.ts";

export class UpdateArticleController {
	constructor(private updateArticleUseCase: UpdateArticleUseCase) {}

	async handle(request: FastifyRequest, reply: FastifyReply) {
		try {
			const { id } = request.params as { id: string };

			const { title, content, author, tags } = request.body as UpdateArticleRequestDTO;

			const articleUpdate = await this.updateArticleUseCase.execute(id, {
				title,
				content,
				author,
				tags,
			});

			return reply.status(200).send({ articleUpdate });
		} catch (error) {
			if (error instanceof NotFoundError) {
				return reply.status(404).send({ message: error.message });
			}
			if (error instanceof ValidationError) {
				return reply.status(400).send({ message: error.message });
			}
			console.log(error);
			throw error;
		}
	}
}
