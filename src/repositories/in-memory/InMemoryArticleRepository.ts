import type { Article } from "../../entities/Article";
import type { ArticleRepositoryInterface } from "../ArticleRepositoryInterface";

export class InMemoryArticleRepository implements ArticleRepositoryInterface {
	private articles: Article[] = [];

	async create(article: Article): Promise<Article> {
		this.articles.push(article);
		return article;
	}

	async findAll(): Promise<Article[]> {
		return this.articles;
	}

	async findById(id: string): Promise<Article | null> {
		return this.articles.find((article) => article.id === id) || null;
	}

	async delete(id: string): Promise<void> {
		this.articles = this.articles.filter((article) => article.id !== id);
	}

	async update(id: string, data: Partial<Article>): Promise<Article> {
		const index = this.articles.findIndex((article) => article.id === id);

		if (index === -1) {
			throw new Error("Article not found"); 
		}

		const article = this.articles[index];

		const updated = {
			...article,
			...data
		};

		this.articles[index] = updated;

		return updated;
	}

}
