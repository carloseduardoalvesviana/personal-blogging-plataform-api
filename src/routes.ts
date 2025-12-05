import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { CreateArticleController } from "./controllers/CreateArticleController";
import { DeleteArticleController } from "./controllers/DeleteArticleController";
import { FindAllArticlesController } from "./controllers/FindAllArticlesController";
import { FindArticleByIdController } from "./controllers/FindArticleByIdController";
import { UpdateArticleController } from "./controllers/UpdateArticleController";
import { InMemoryArticleRepository } from "./repositories/in-memory/InMemoryArticleRepository";
import { CreateArticleUseCase } from "./use-cases/CreateArticleUseCase";
import { DeleteArticleUseCase } from "./use-cases/DeleteArticleUseCase";
import { FindAllArticlesUseCase } from "./use-cases/FindAllArticlesUseCase";
import { FindArticleByIdUseCase } from "./use-cases/FindArticleByIdUseCase";
import { UpdateArticleUseCase } from "./use-cases/UpdateArticleUseCase";

// repository
const articleRepository = new InMemoryArticleRepository();

// create
const createArticleUseCase = new CreateArticleUseCase(articleRepository);
const createArticleController = new CreateArticleController(createArticleUseCase);

// find all
const findAllArticlesUseCase = new FindAllArticlesUseCase(articleRepository);
const findAllArticlesController = new FindAllArticlesController(findAllArticlesUseCase);

// find by id
const findArticleByIdUseCase = new FindArticleByIdUseCase(articleRepository);
const findArticleByIdController = new FindArticleByIdController(findArticleByIdUseCase);

// update
const updateArticleUseCase = new UpdateArticleUseCase(articleRepository);
const updateArticleController = new UpdateArticleController(updateArticleUseCase);

// delete
const deleteArticleUseCase = new DeleteArticleUseCase(articleRepository);
const deleteArticleController = new DeleteArticleController(deleteArticleUseCase);

// routes
export async function routes(app: FastifyInstance) {
	app.post("/articles", async (request: FastifyRequest, reply: FastifyReply) => {
		return createArticleController.handle(request, reply);
	});

	app.get("/articles", async (request: FastifyRequest, reply: FastifyReply) => {
		return findAllArticlesController.handle(request, reply);
	});

	app.get("/articles/:id", async (request: FastifyRequest, reply: FastifyReply) => {
		return findArticleByIdController.handle(request, reply);
	});

	app.put("/articles/:id", async (request: FastifyRequest, reply: FastifyReply) => {
		return updateArticleController.handle(request, reply);
	});

	app.delete("/articles/:id", async (request: FastifyRequest, reply: FastifyReply) => {
		return deleteArticleController.handle(request, reply);
	});
}
