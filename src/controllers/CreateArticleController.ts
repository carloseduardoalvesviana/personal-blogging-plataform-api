import type { FastifyReply, FastifyRequest } from "fastify";
import type { CreateArticleRequestDTO } from "../dto/CreateArticleRequestDTO";
import { ValidationError } from "../errors/ValidationError";
import type { CreateArticleUseCase } from "../use-cases/CreateArticleUseCase";

export class CreateArticleController {
	constructor(private createArticleUseCase: CreateArticleUseCase) {}

	async handle(request: FastifyRequest, reply: FastifyReply) {
		try {
			const { title, content, author, tags } = request.body as CreateArticleRequestDTO;

			const article = await this.createArticleUseCase.execute({
				title,
				content,
				author,
				tags,
			});

			return reply.status(201).send({ article });
		} catch (error) {
			if (error instanceof ValidationError) {
				return reply.status(400).send({ message: error.message });
			}
			console.error(error);
			throw error;
		}
	}
}
