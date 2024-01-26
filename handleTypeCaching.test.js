const assert = require("assert");
const handleTypeCaching = require("./handleTypeCaching");

describe("handleTypeCaching", () => {
	it("should return an array of key-value pairs with the correct types", () => {
		const clientbound = {
			key1: "value1",
			key2: 123,
			key3: { nestedKey: "nestedValue" },
		};

		const expected = [
			["key1", "string"],
			["key2", "number"],
			["key3", "object"],
		];

		const result = handleTypeCaching(clientbound);

		assert.deepStrictEqual(result, expected);
	});
});
