const fs = require("fs")
const path = "./node_modules/minecraft-data/minecraft-data/data/bedrock/" + fs.readdirSync("./node_modules/minecraft-data/minecraft-data/data/bedrock/").filter(i => !isNaN(i.replace(/\./g, ""))).reverse()[0] + "/protocol.json";
const currentTypes = require(path)
const predefs = `
// 8bit integer
type i8 = "native"
// unsigned 8bit integer
type u8 = "native"
// 16bit long int
type li16 = "native"
// 16bit long unsigned int
type lu16 = "native"
// 32bit int
type i32 = "native"
// 32bit long int
type li32 = "native"
// 32bit long unsigned int
type lu32 = "native"
// 32bit float
type lf32 = "native"
// 64bit long unsigned int
type lu64 = "native"
// 64bit long int
type li64 = "native"
type bool = boolean
type varint = "native"
`;
function generateTypeScriptTypes(jsonData) {
	const types = jsonData.types;
	let output = "";
	const entries = Object.entries(types);
	const typeDefs = entries.filter(([_, i]) => typeof i === "string");
	output += typeDefs
		.map(([name, value]) => `type ${name} = "${value}"`)
		.join("\n");
	let interfaces = entries.filter(([_, data]) => typeof data !== "string");
	// map interfaces
	/**
	 * @param {any[]} data
	 */
	const generateInterfaceData = (data) => {
		let output = "";
		// typeof data is always an array ( data_type\nObject ) repeats..
		for (let i = 0; i < data.length / 2; i++) {
			const type = data[i];
			let typeData = data[i + 1];
			switch (type) {
				case "container": {
					typeData = `{\n${typeData
						.map(
							(data) =>
								`${data.name}: ${
									typeof data.type === "object"
										? generateInterfaceData(data.type)
										: data.type
								}`,
						)
						.join("\n")}\n}`;
					break;
				}
				case "array": {
					typeData = `{${typeData.countType}:${
						typeof typeData.type === "object"
							? generateInterfaceData(typeData.type)
							: typeData.type
					}[]}`;
					break;
				}
				case "bitfield": {
					let output = []
					for (const entry of typeData) {
						const line = `${entry.name}: {\n${Object.entries(entry).filter(([, value]) => value !== entry.name).map(([key, value]) => `${key}:${value}`).join("\n")}\n}`
						output.push(line);
					}
					typeData = `{\n${output.join(",")}\n}`
					break;
				}
				case "mapper": {
					typeData = `{\n  type: ${typeData.type},\n  mappings: {\n${Object.entries(typeData.mappings)
						.map(([key, value]) => `    "${key}": "${value}"`)
						.join(",\n")}\n  }\n}`;
					break;
				}
				case "switch": {
					if (typeData.compareTo !== "name") break;
					const output = []
					for (const [key, value] of Object.entries(typeData.fields)) {
						output.push(`${key}:${value.replace(/\s+![a-zA-Z0-9]/g, "")}`)
					}
					typeData = `{\n${output.join(",\n")}\n}`
					break
				}
			}
			output +=
				typeof typeData === "object"
					? JSON.stringify(typeData, undefined, 4)
					: typeData;
		}
		return output;
	};
	interfaces = interfaces.map(([name, data]) => {
		return [name, generateInterfaceData(data)];
	});
	output += `\n${interfaces.filter(([name]) => name !== "string")
		.map(([name, data]) => `export interface ${name} ${data}`)
		.join("\n")}`;
	return output;
}

const output = generateTypeScriptTypes(currentTypes);
fs.writeFileSync("./output.ts", `${predefs}\n${output}`, { encoding: "utf-8" });
console.log(`\x1b[36mCreated ${output.split("\n").length} lines! ( MCBE Protocol Version ${path.split("/").reverse()[1]} )\x1b[0m`)