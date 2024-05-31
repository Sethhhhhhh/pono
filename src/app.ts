import express from "express";
import { NODE_ENV, PORT } from "@config";
import Route from "./classes/route.classe";

class App {
	private _app: express.Application;
	private _routes: Route[];
	public env: string;
	public port: string | number;

	constructor(routes: Route[]) {
		this._app = express();
		this.env = NODE_ENV || "development";
		this.port = PORT || 3000;
		this._routes = routes;

		this._initializeMiddlewares();
		this._initializeRoutes();
	}

	private _initializeRoutes(): void {
		this._routes.forEach(route => {
			this._app.use("/", route.router);
		});
	}

	private _initializeMiddlewares(): void {
		this._app.use(express.json());
		this._app.use(express.urlencoded({ extended: true }));
	}

	public listen(): void {
		this._app.listen(this.port, () => {
			console.log(`Server is running on port ${this.port}`);

			console.log("------------------------------------");
			this._routes.forEach(route => {
				route.logRoutes();
			});
			console.log("------------------------------------");
		});
	}
}

export default App;
