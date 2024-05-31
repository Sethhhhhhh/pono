import Controller from "@/classes/controller.classe";
import { NextFunction, Request, Response } from "express";

class IndexController extends Controller {
	constructor() {
		super();
	}

	get(_: Request, res: Response, next: NextFunction): void {
		try {
			res.sendStatus(200);
		} catch (error) {
			next(error);
		}
	}
}

export default IndexController;
