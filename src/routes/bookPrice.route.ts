import Route from "@/classes/route.classe";
import BookPriceController from "@/controllers/bookPrice.controller";

class BookPriceRoute extends Route {
	constructor() {
		super(new BookPriceController());

		this._initializeRoutes([
			{
				method: "get",
				path: "/book_price/:bookId",
				handler: this.controller.getBookPrice,
			},
		]);
	}
}

export default BookPriceRoute;
