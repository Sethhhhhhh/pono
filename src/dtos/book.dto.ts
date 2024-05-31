import Dto from "@/classes/dto.classe";
import { CreateBook, UpdateBook } from "@/types/book.type";

const createBookSchema = {
	type: "object",
	properties: {
		title: { type: "string", minLength: 3 },
		author: { type: "string", minLength: 3 },
		pages: {
			minItems: 1,
			type: "array",
			items: { type: "string" },
		},
		release: { type: "string" },
	},
	required: ["title", "author", "pages"],
	additionalProperties: false,
};

const updateBookSchema = {
	type: "object",
	properties: {
		title: { type: "string" },
		author: { type: "string" },
		release: { type: "string" },
	},
	additionalProperties: false,
};

const createFromFolderSchema = {
	type: "object",
	properties: {
		path: { type: "string", minLength: 3 },
	},
	required: ["path"],
	additionalProperties: false,
};

export default class BookDto extends Dto {
	constructor() {
		super();
	}

	async create(data: CreateBook): Promise<CreateBook> {
		await this._validate(createBookSchema, data);
		return data;
	}

	async update(data: UpdateBook): Promise<UpdateBook> {
		await this._validate(updateBookSchema, data);
		return data;
	}

	async createFromFolder(data: { path: string }): Promise<{ path: string }> {
		await this._validate(createFromFolderSchema, data);
		return data;
	}
}
