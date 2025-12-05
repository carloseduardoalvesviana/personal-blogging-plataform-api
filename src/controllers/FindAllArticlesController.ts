import type { FastifyReply, FastifyRequest } from "fastify";
import type { FindAllArticlesUseCase } from "../use-cases/FindAllArticlesUseCase";

export class FindAllArticlesController {
	constructor(private findAllArticlesUseCase: FindAllArticlesUseCase) {}

	async handle(_request: FastifyRequest, reply: FastifyReply) {
		try {
			const articles = await this.findAllArticlesUseCase.execute();

			return reply.status(200).send({ articles });
		} catch (error) {
			console.error(error);
			throw error;
		}
	}
}
