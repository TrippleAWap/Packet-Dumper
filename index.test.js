const assert = require("assert");
const Relay = require("./index");

describe("Relay", () => {
	it("should create a new Relay instance with the correct host and port", () => {
		const relay = new Relay({
			host: "0.0.0.0",
			port: 19131,
			destination: {
				host: "ca.hivebedrock.network",
				port: 19132,
			},
		});

		assert.strictEqual(relay.host, "0.0.0.0");
		assert.strictEqual(relay.port, 19131);
	});

	it("should set the correct destination host and port", () => {
		const relay = new Relay({
			host: "0.0.0.0",
			port: 19131,
			destination: {
				host: "ca.hivebedrock.network",
				port: 19132,
			},
		});

		assert.strictEqual(relay.destination.host, "ca.hivebedrock.network");
		assert.strictEqual(relay.destination.port, 19132);
	});
});
