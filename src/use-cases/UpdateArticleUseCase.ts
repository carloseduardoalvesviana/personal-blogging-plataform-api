import type { UpdateArticleRequestDTO } from "../dto/UpdateArticleRequestDTO";
import type { Article } from "../entities/Article";
import { NotFoundError } from "../errors/NotFoundError";
import type { ArticleRepositoryInterface } from "../repositories/ArticleRepositoryInterface";

export class UpdateArticleUseCase {
	constructor(private articleRepository: ArticleRepositoryInterface) {}

	async execute(id: string, data: UpdateArticleRequestDTO): Promise<Article> {
		const articleExists = await this.articleRepository.findById(id);

		if (!articleExists) {
			throw new NotFoundError("Article not found");
		}

		const articleUpdated = await this.articleRepository.update(id, data);

		return articleUpdated;
	}
}
