import Dto from "@/classes/dto.classe";
import { CreateCollection } from "@/types/collection.type";

const createCollectionSchema = {
	type: "object",
	properties: {
		books: {
			minItems: 2,
			type: "array",
			items: {
				type: "string",
			},
		},
	},
	required: ["books"],
};

const createManyCollectionSchema = {
	type: "object",
	properties: {
		collections: {
			type: "array",
			minItems: 1,
			items: {
				type: "array",
				minItems: 2,
				items: {
					type: "string",
				},
			},
		},
	},
	required: ["collections"],
};

export default class CollectionDto extends Dto {
	constructor() {
		super();
	}

	create(data: CreateCollection): CreateCollection {
		this._validate(createCollectionSchema, data);
		return data;
	}

	createMany(data: CreateCollection[]): CreateCollection[] {
		this._validate(createManyCollectionSchema, data);
		return data;
	}
}
