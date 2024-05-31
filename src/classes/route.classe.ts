import { NextFunction, Request, Response, Router } from "express";
import { RouteOption } from "@/types/route.type";

export default class Route {
	private _routes: RouteOption[] = [];
	private _router = Router();
	private _controller: any;

	constructor(controller: any) {
		this._controller = controller;
	}

	private _handler(
		handler: (req: Request, res: Response, next: NextFunction) => void,
	): (req: Request, res: Response, next: NextFunction) => void {
		return async (req: Request, res: Response, next: NextFunction) => {
			try {
				handler(req, res, next);
			} catch (error) {
				res.status(500).json({ message: error.message });
			}
		};
	}

	protected _initializeRoutes(routes: RouteOption[]): void {
		routes.forEach((route: RouteOption) => {
			const { method, path, middlewares = [], handler } = route;
			this._router[method](path, ...middlewares, this._handler(handler));
		});

		this._routes = routes;
	}

	logRoutes() {
		this._routes.forEach((route: RouteOption) => {
			const { method, path } = route;
			console.log(`[${method.toUpperCase()}] -> ${path}`);
		});
	}

	get router(): Router {
		return this._router;
	}

	get routes(): any {
		return this._routes;
	}

	get controller(): any {
		return this._controller;
	}
}
