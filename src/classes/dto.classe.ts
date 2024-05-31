import Ajv from "ajv";

export default class Dto {
	private _ajv: Ajv;

	constructor() {
		this._ajv = new Ajv({ allErrors: true });
	}

	protected async _validate(schema: any, data: any): Promise<void> {
		const validate = this._ajv.compile(schema);

		if (!validate(data)) {
			throw new Error(validate.errors?.[0].message);
		}
	}
}
