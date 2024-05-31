import { Document } from "mongoose";

export type Book = {
	title: string;
	author: string;
	release: Date;
};

export type BookDocument = Book & Document;

export type CreateBook = {
	title: string;
	author: string;
	release?: Date;
};

export type UpdateBook = {
	title?: string;
	author?: string;
	release?: Date;
};

export type DeleteBook = {
	id: string;
};
