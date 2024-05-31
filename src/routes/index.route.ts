import Route from "@/classes/route.classe";
import IndexController from "@/controllers/index.controller";

class IndexRoute extends Route {
	constructor() {
		super(new IndexController());

		this._initializeRoutes([
			{
				method: "get",
				path: "/",
				handler: this.controller.get,
			},
		]);
	}
}

export default IndexRoute;
