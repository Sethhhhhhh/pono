import App from "@/app";
import IndexRoute from "@/routes/index.route";
import BookRoute from "./routes/book.route";
import CollectionRoute from "./routes/collection.route";
import BookPriceRoute from "./routes/bookPrice.route";

const app = new App([
	new IndexRoute(),
	new BookRoute(),
	new CollectionRoute(),
	new BookPriceRoute(),
]);

app.listen();
