export const autoBind = (instance: any): void => {
	const prototype = Object.getPrototypeOf(instance);
	const methodNames = Object.getOwnPropertyNames(prototype).filter(
		name => name !== "constructor" && typeof instance[name] === "function",
	);

	for (const name of methodNames) {
		instance[name] = instance[name].bind(instance);
	}
};
