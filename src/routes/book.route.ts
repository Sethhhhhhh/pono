import Route from "@/classes/route.classe";
import BookController from "@/controllers/book.controller";
import paginate from "@/middlewares/pagination.middleware";

class BookRoute extends Route {
	constructor() {
		super(new BookController());

		this._initializeRoutes([
			{
				method: "get",
				path: "/books",
				middlewares: [paginate],
				handler: this.controller.getAll,
			},
			{
				method: "get",
				path: "/books/pages",
				middlewares: [paginate],
				handler: this.controller.getAllWithPages,
			},
			{
				method: "get",
				path: "/books/:id",
				handler: this.controller.getById,
			},
			{
				method: "post",
				path: "/books",
				handler: this.controller.create,
			},
			{
				method: "post",
				path: "/books/folder",
				handler: this.controller.createFromFolder,
			},
			{
				method: "put",
				path: "/books/:id",
				handler: this.controller.update,
			},
			{
				method: "delete",
				path: "/books/:id",
				handler: this.controller.delete,
			},
		]);
	}
}

export default BookRoute;
