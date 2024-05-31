import Service from "@/classes/service.classe";

const MIN_PRICE = 10;
const MAX_PRICE = 100;

export default class BookPriceService extends Service {
	constructor() {
		super();
	}

	getBookPrice() {
		const randomFloat = Math.random() * (MAX_PRICE - MIN_PRICE) + MIN_PRICE;
		return `$${randomFloat.toFixed(2)}`;
	}
}
