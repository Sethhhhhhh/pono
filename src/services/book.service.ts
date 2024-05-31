import Service from "@/classes/service.classe";
import bookModel from "@/models/book.model";
import { BookDocument, CreateBook, UpdateBook } from "@/types/book.type";

export default class BookService extends Service {
	constructor() {
		super(bookModel);
	}

	async getAll(
		offset: number,
		limit?: number,
		search?: string,
	): Promise<BookDocument[]> {
		const query = search
			? { title: { $regex: search, $options: "i" } }
			: {};
		return await this.model.find(query).skip(offset).limit(limit);
	}

	async getById(id: string): Promise<BookDocument | null> {
		return await this.model.findById(id);
	}

	async create(data: CreateBook): Promise<BookDocument> {
		return this.model.create(data);
	}

	async update(id: string, data: UpdateBook): Promise<BookDocument | null> {
		return await this.model.findByIdAndUpdate(id, data, { new: true });
	}

	async delete(id: string): Promise<BookDocument | null> {
		return await this.model.findByIdAndDelete(id);
	}

	async addPages(id: string, pages: string[]): Promise<BookDocument | null> {
		return await this.model.findByIdAndUpdate(
			id,
			{ $push: { pages } },
			{ new: true },
		);
	}

	async getAllWithPages(
		offset: number,
		limit?: number,
		sort?: number | undefined,
	): Promise<BookDocument[]> {
		return await this.model
			.find()
			.skip(offset)
			.limit(limit)
			.populate({
				path: "pages",
				select: "content number",
				options: sort !== undefined ? { sort: { content: sort } } : {},
			});
	}
}
