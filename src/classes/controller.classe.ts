import Container from "./container.classe";
import Dto from "./dto.classe";

export default class Controller extends Container {
	private _services: { [key: string]: any } = {};
	private _validator: any;

	constructor(services?: { [key: string]: any }, validator?: Dto) {
		super();
		this._services = services || {};
		this._validator = validator;
	}

	get services() {
		return this._services;
	}

	get validator() {
		return this._validator;
	}
}
