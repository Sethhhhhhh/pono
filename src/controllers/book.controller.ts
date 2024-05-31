import Controller from "@/classes/controller.classe";
import BookDto from "@/dtos/book.dto";
import { PaginationRequest } from "@/middlewares/pagination.middleware";
import BookService from "@/services/book.service";
import BookPriceService from "@/services/bookPrice.service";
import PageService from "@/services/page.service";
import { CreateBook } from "@/types/book.type";
import { PageDocument } from "@/types/page.type";
import { autoBind } from "@/utils/autoBind";
import { Request, Response } from "express";
import { readdir, stat } from "fs";
import { readFile } from "fs/promises";
import { join } from "path";
import { promisify } from "util";

const readdirAsync = promisify(readdir);
const statAsync = promisify(stat);

export default class BookController extends Controller {
	constructor() {
		super(
			{
				book: new BookService(),
				page: new PageService(),
				bookPrice: new BookPriceService(),
			},
			new BookDto(),
		);
		autoBind(this);
	}

	async createFromFolder(req: Request, res: Response): Promise<void> {
		try {
			const data = await this.validator.createFromFolder(req.body);
			const folderContents = await readdirAsync(data.path);

			const books = await Promise.all(
				folderContents.map(async item => {
					const itemPath = join(data.path, item);
					const stats = await statAsync(itemPath);

					if (stats.isDirectory()) {
						const files = await readdirAsync(itemPath);

						const readme = files.find(
							file => file.toLowerCase() === "readme.md",
						);

						if (!readme)
							res.status(400).json({
								message: "Readme.md is required",
							});

						const content = await readFile(
							join(itemPath, readme as string),
							"utf-8",
						);

						const bookData = content
							.split("\n")
							.reduce<CreateBook>((acc, line) => {
								const index = line.indexOf(":");
								if (index !== -1) {
									const key = line.slice(0, index).trim();
									const value = line.slice(index + 1).trim();
									if (!key || !value) return acc;

									return {
										...acc,
										[key.toLowerCase()]: value,
									};
								}
								return acc;
							}, {} as CreateBook);

						const book = await this.services.book.create({
							title: bookData.title,
							author: bookData.author,
							release: bookData.release,
						});

						const pagePromises = files
							.filter(
								file =>
									file.toLowerCase() !== "readme.md" &&
									!file.includes(".epub"),
							)
							.map(async (file, index) => {
								const filePath = join(itemPath, file);
								const content = await readFile(
									filePath,
									"utf-8",
								);

								return {
									bookId: book._id,
									content,
									number: index + 1,
								};
							});

						const pageDatas = await Promise.all(pagePromises);
						const pages = await this.services.page.createMany(
							pageDatas,
						);

						return this.services.book.addPages(
							book._id,
							pages.map((page: PageDocument) => page._id),
						);
					}
				}),
			);

			res.status(201).json(books.filter(book => !!book));
		} catch (error) {
			res.status(500).json({ message: error.message });
		}
	}

	async create(req: Request, res: Response): Promise<void> {
		try {
			const data = await this.validator.create(req.body);

			const pagesContent = data.pages;
			delete data.pages;
			const book = await this.services.book.create(data);

			const pages = await this.services.page.createMany(
				pagesContent.map((content: string, index: number) => ({
					bookId: book._id,
					content,
					number: index + 1,
				})),
			);

			const updatedBook = await this.services.book.addPages(
				book._id,
				pages.map((page: PageDocument) => page._id),
			);

			res.status(201).json(updatedBook);
		} catch (error) {
			res.status(500).json({ message: error.message });
		}
	}

	async getAll(req: PaginationRequest, res: Response) {
		try {
			const { search } = req.query;
			const { offset, limit } = req.pagination || {};

			const books = await this.services.book.getAll(
				offset,
				limit,
				search,
			);

			res.status(200).json(books);
		} catch (error) {
			res.status(500).json({ message: error.message });
		}
	}

	async getAllWithPages(
		req: PaginationRequest,
		res: Response,
	): Promise<void> {
		try {
			const { sort } = req.query;
			const { offset, limit } = req.pagination || {};

			const books = await this.services.book.getAllWithPages(
				offset,
				limit,
				parseInt(sort as string) || undefined,
			);

			res.status(200).json(
				books.map(book => ({
					...book.toObject(),
					price: this.services.bookPrice.getBookPrice(),
				})),
			);
		} catch (error) {
			res.status(500).json({ message: error.message });
		}
	}

	async update(req: Request, res: Response): Promise<void> {
		try {
			const id = req.params.id;
			if (!id) {
				res.status(400).json({ message: "Id is required" });
				return;
			}

			const data = await this.validator.update(req.body);
			const updatedBook = await this.services.book.update(id, data);
			res.status(200).json(updatedBook);
		} catch (error) {
			res.status(500).json({ message: error.message });
		}
	}

	async delete(req: Request, res: Response): Promise<void> {
		try {
			const id = req.params.id;
			if (!id) {
				res.status(400).json({ message: "Id is required" });
				return;
			}

			await this.services.page.deleteByBookId(id);
			const deletedBook = await this.services.book.delete(id);
			res.status(200).json(deletedBook);
		} catch (error) {
			res.status(500).json({ message: error.message });
		}
	}
}
