import mongoose, { Mongoose, ConnectOptions } from "mongoose";
import { DB_HOST, DB_PORT, DB_DATABASE } from "@config";

class Database {
	private static _instance: Database;
	private _database: Mongoose;

	private constructor() {
		this._database = mongoose;

		this.setup();
		this.connect();
	}

	public static getInstance(): Database {
		if (!this._instance) {
			this._instance = new Database();
		}
		return this._instance;
	}

	private setup(): void {
		this._database.connection.on("error", error => {
			console.error("Database error:", error);
		});

		process.on("SIGINT", () => {
			this._database.connection.close(() => {
				console.log("Disconnected from database");
				process.exit(0);
			});
		});
	}

	private async connect(): Promise<void> {
		const options: ConnectOptions = {
			serverSelectionTimeoutMS: 5000,
			socketTimeoutMS: 45000,
		};

		try {
			this._database.set("strictQuery", true);
			await this._database.connect(
				`mongodb://${DB_HOST}:${DB_PORT}/${DB_DATABASE}`,
				options,
			);
			console.log("Connected to MongoDB");
		} catch (error) {
			console.error("Error connecting to database:", error);
		}
	}

	public get database(): Mongoose {
		return this._database;
	}
}

export default Database.getInstance().database;
