import type { CreateArticleRequestDTO } from "../dto/CreateArticleRequestDTO";
import { Article } from "../entities/Article";
import type { ArticleRepositoryInterface } from "../repositories/ArticleRepositoryInterface";

export class CreateArticleUseCase {
	constructor(private articleRepository: ArticleRepositoryInterface) {}

	async execute({ title, content, author, tags }: CreateArticleRequestDTO): Promise<Article> {
		const article = new Article({
			title,
			content,
			author,
			tags,
		});
		return await this.articleRepository.create(article);
	}
}
