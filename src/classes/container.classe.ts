import { Mongoose } from "mongoose";
import databaseInstance from "@/classes/database.classe";

export default class Container {
	private _database: Mongoose;

	contructor() {
		this._database = databaseInstance;
	}

	get database(): Mongoose {
		return this._database;
	}
}
