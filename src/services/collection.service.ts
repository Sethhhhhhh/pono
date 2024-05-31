import Service from "@/classes/service.classe";
import collectionModel from "@/models/collection.model";
import { CreateCollection } from "@/types/collection.type";

export default class CollectionService extends Service {
	constructor() {
		super(collectionModel);
	}

	async create(data: CreateCollection) {
		return await this.model.create(data);
	}

	async createMany(data: CreateCollection[]) {
		return await this.model.insertMany(data);
	}
}
