export default class Service {
	private _model: any;

	constructor(model?: any) {
		this._model = model;
	}

	get model() {
		return this._model;
	}
}
