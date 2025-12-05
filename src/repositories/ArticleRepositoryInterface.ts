import type { Article } from "../entities/Article";

export interface ArticleRepositoryInterface {
	create(data: Article): Promise<Article>;
	findAll(): Promise<Article[]>;
	findById(id: string): Promise<Article | null>;
	delete(id: string): Promise<void>;
	update(id: string, data: Partial<Article>): Promise<Article>;
}
