import type { Article } from "../entities/Article";
import type { ArticleRepositoryInterface } from "../repositories/ArticleRepositoryInterface";

export class FindAllArticlesUseCase {
	constructor(private articleRepository: ArticleRepositoryInterface) {}

	async execute(): Promise<Article[]> {
		const articles = await this.articleRepository.findAll();
		return articles;
	}
}
