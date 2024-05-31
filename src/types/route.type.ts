import { Request, Response } from "express";

export type Method = "get" | "post" | "put" | "delete";

export type RouteOption = {
	method: Method;
	path: string;
	middlewares?: any[];
	handler: (req: Request, res: Response) => void;
};
