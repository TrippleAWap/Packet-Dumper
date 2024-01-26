const serverbound = {};
const clientbound = {};
const ignored = [];
const predefinitions = {};
Object.keywtypes = function (obj) {
	const objR = {};
	for (const [key, value] of Object.entries(obj)) {
		if (predefinitions[key]) {
			objR[key] = predefinitions[key];
			continue;
		}
		objR[key] = typeof value === "object" ? Object.keywtypes(value) : typeof value;
	}
	return objR;
};
process.on("SIGINT", () => {
	process.exit();
});
const fs = require("fs");
const ms = Date.now();
fs.writeFileSync("./types" + ms.toString() + ".ts", "");
const tsFile = fs.createWriteStream("./types" + ms.toString() + ".ts", { flags: "a" });
process.on("exit", () => {
	console.log("\x1b[31m", "Creating TypeScript definitions...", "\x1b[0m");

	const clientEntries = Object.entries(clientbound).map(([key, value]) => [key, typeof value === "object" ? Object.keywtypes(value) : typeof value]);
	const serverEntries = Object.entries(serverbound).map(([key, value]) => [key, typeof value === "object" ? Object.keywtypes(value) : typeof value]);

	const outputA = `export type CLIENTBOUND = {\n${clientEntries.map(([key, value]) => `    [\'${key}\']: ${JSON.stringify(value)}`).join(",\n")}\n}`;
	const outputB = `export type SERVERBOUND = {\n${serverEntries.map(([key, value]) => `    [\'${key}\']: ${JSON.stringify(value)}`).join(",\n")}\n}`;

	tsFile.write(
		outputA.replace(/"(\w+)"/g, function (match, p1) {
			return p1;
		})
	);

	tsFile.write("\n\n");

	tsFile.write(
		outputB.replace(/"(\w+)"/g, function (match, p1) {
			return p1;
		})
	);
	tsFile.end();

	process.exit(0);
});

module.exports = {
	connectTypeCaching: (client) => {
		client.on("serverbound", ({ name, params }) => {
			if (serverbound[name] || ignored.includes(name)) return;
			serverbound[name] = params;
		});

		client.on("clientbound", ({ name, params }) => {
			if (clientbound[name] || ignored.includes(name)) return;
			clientbound[name] = params;
		});
	},
	getCaches: () => {
		return { clientbound, serverbound };
	},
};
