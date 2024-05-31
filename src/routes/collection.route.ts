import Route from "@/classes/route.classe";
import CollectionController from "@/controllers/collection.controller";

export default class CollectionRoute extends Route {
	constructor() {
		super(new CollectionController());

		this._initializeRoutes([
			{
				method: "post",
				path: "/collections",
				handler: this.controller.create,
			},
			{
				method: "post",
				path: "/collections/many",
				handler: this.controller.createMany,
			},
		]);
	}
}
