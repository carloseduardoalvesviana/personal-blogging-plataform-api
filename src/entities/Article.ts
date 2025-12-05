import { randomUUID } from "node:crypto";
import { ValidationError } from "../errors/ValidationError";

interface ArticleEntityProps {
	id?: string;
	title: string;
	content: string;
	author: string;
	tags: string[];
}

export class Article {
	id?: string;
	title: string;
	content: string;
	author: string;
	publishing_date?: Date;
	tags: string[];

	constructor(data: ArticleEntityProps) {
		if (!data.title) {
			throw new ValidationError("Title is required");
		}

		if (!data.content) {
			throw new ValidationError("Content is required");
		}

		if (!data.author) {
			throw new ValidationError("Author is required");
		}

		this.id = data.id ?? randomUUID();
		this.title = data.title;
		this.content = data.content;
		this.author = data.author;
		this.publishing_date = new Date();
		this.tags = data.tags;
	}
}
