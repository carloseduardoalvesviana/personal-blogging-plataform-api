import { NotFoundError } from "../errors/NotFoundError";
import type { ArticleRepositoryInterface } from "../repositories/ArticleRepositoryInterface";

export class FindArticleByIdUseCase {
	constructor(private articleRepository: ArticleRepositoryInterface) {}

	async execute(id: string) {
		const article = await this.articleRepository.findById(id);

		if (!article) {
			throw new NotFoundError("Article not found");
		}

		return article;
	}
}
