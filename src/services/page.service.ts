import Service from "@/classes/service.classe";
import pageModel from "@/models/page.model";
import { CreatePage } from "@/types/page.type";

export default class PageService extends Service {
	constructor() {
		super(pageModel);
	}

	async create(data: CreatePage) {
		return await this.model.create(data);
	}

	async createMany(data: CreatePage[]) {
		return await this.model.insertMany(data);
	}

	async deleteByBookId(bookId: string) {
		return await this.model.deleteMany({ bookId });
	}
}
