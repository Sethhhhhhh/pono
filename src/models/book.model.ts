import { model, Schema, Document } from "mongoose";
import { Book } from "@/types/book.type";

const bookSchema: Schema = new Schema({
	title: {
		type: String,
		required: true,
	},
	author: {
		type: String,
		required: true,
	},
	pages: {
		type: [
			{
				type: Schema.Types.ObjectId,
				ref: "Page",
				required: true,
			},
		],
	},
	release: {
		type: Date,
		default: Date.now,
	},
});

const bookModel = model<Book & Document>("Book", bookSchema);

export default bookModel;
