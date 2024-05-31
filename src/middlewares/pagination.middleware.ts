import { Request, Response, NextFunction } from "express";

export interface PaginationRequest extends Request {
	pagination?: {
		offset: number;
		limit: number;
	};
}

const paginate = (
	req: PaginationRequest,
	res: Response,
	next: NextFunction,
): void => {
	const { page, itemPerPage } = req.query;

	if (page && itemPerPage) {
		const offset =
			(parseInt(page as string) - 1) *
			(parseInt(itemPerPage as string) || 10);
		const limit = parseInt(itemPerPage as string) || 10;
		req.pagination = { limit, offset };
	}

	next();
};

export default paginate;
