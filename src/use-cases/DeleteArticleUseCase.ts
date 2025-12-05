import { NotFoundError } from "../errors/NotFoundError";
import type { ArticleRepositoryInterface } from "../repositories/ArticleRepositoryInterface";

export class DeleteArticleUseCase {
	constructor(private articleRepository: ArticleRepositoryInterface) {}

	async execute(id: string): Promise<void> {
		const articleExists = await this.articleRepository.findById(id);

		if (!articleExists) {
			throw new NotFoundError("Article not found");
		}

		return await this.articleRepository.delete(id);
	}
}
