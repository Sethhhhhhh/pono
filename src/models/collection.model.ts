import { model, Schema, Document } from "mongoose";
import { Collection } from "@/types/collection.type";

const collectionSchema: Schema = new Schema({
	books: {
		type: [
			{
				type: Schema.Types.ObjectId,
				ref: "Book",
				required: true,
			},
		],
	},
});

const collectionModel = model<Collection & Document>(
	"Collection",
	collectionSchema,
);

export default collectionModel;
