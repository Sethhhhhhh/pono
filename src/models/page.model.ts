import { model, Schema, Document } from "mongoose";
import { Page } from "@/types/page.type";

const pageSchema: Schema = new Schema({
	bookId: {
		type: Schema.Types.ObjectId,
		ref: "Book",
		required: true,
	},
	number: {
		type: Number,
		required: true,
	},
	content: {
		type: String,
		required: true,
	},
});

const pageModel = model<Page & Document>("Page", pageSchema);

export default pageModel;
