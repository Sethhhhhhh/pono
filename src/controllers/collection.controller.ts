import Controller from "@/classes/controller.classe";
import CollectionDto from "@/dtos/collection.dto";
import CollectionService from "@/services/collection.service";
import { CreateCollection } from "@/types/collection.type";
import { autoBind } from "@/utils/autoBind";
import { Request, Response } from "express";

export default class CollectionController extends Controller {
	constructor() {
		super(
			{
				collection: new CollectionService(),
			},
			new CollectionDto(),
		);
		autoBind(this);
	}

	async create(req: Request, res: Response): Promise<void> {
		try {
			const data = this.validator.create(req.body);
			const collection = await this.services.collection.create(data);
			res.status(201).json(collection);
		} catch (error) {
			res.status(500).json({ message: error.message });
		}
	}

	async createMany(req: Request, res: Response): Promise<void> {
		try {
			const data = this.validator.createMany(req.body);

			const collections = await this.services.collection.createMany(
				data.collections.map((collection: CreateCollection) => ({
					books: collection,
				})),
			);

			res.status(201).json(collections);
		} catch (error) {
			res.status(500).json({ message: error.message });
		}
	}
}
