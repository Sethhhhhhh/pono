import { Document } from "mongoose";

export type Page = {
	number: number;
	content: string;
};

export type CreatePage = {
	number: number;
	content: string;
};

export type PageDocument = Page & Document;
