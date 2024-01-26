const { connectTypeCaching, getCaches } = require("./handleTypeCaching");
const { Relay, createClient, Client } = require("bedrock-protocol");
const relay = new Relay({
	host: "0.0.0.0",
	port: 19131,
	/* Where to send upstream packets to */
	destination: {
		host: "ca.hivebedrock.network",
		port: 19132,
	},
});
relay.listen(); // Tell the server to start listening.

const client = createClient({
	host: "ca.hivebedrock.network",
	port: 19132,
	username: "test",
});
relay.on("connect", (player) => {
	/** @type {Client} */
	const client = player;
	console.log("New connection", player.connection.address);
	connectTypeCaching(player);
	client.on("spawn", () => {
		client.write("play_sound", {
			name: "random.levelup",
			position: client.position,
			volume: 32767,
			pitch: -32767,
		});
	});
});
setInterval(() => {
	const { clientbound, serverbound } = getCaches();
	console.log("\x1b[31m", "Clientbound:", "\x1b[0m", Object.keys(clientbound).length, "\x1b[31m", "Serverbound:", "\x1b[0m", Object.keys(serverbound).length);
});
