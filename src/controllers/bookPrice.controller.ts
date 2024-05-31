import Controller from "@/classes/controller.classe";
import BookPriceService from "@/services/bookPrice.service";
import { autoBind } from "@/utils/autoBind";
import { Request, Response } from "express";

export default class BookPriceController extends Controller {
	constructor() {
		super({
			bookPrice: new BookPriceService(),
		});
		autoBind(this);
	}

	getBookPrice(req: Request, res: Response) {
		const bookPrice = this.services.bookPrice.getBookPrice();
		res.json(bookPrice);
	}
}
