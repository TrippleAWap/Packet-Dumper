import { mcpe_packet } from "./output";
declare module "bedrock-protocol" {
	interface Client {
		write: <T extends keyof mcpe_packet["params"]>(
			packetName: T,
			packetParams: mcpe_packet["params"][T]
		) => void;
		on: <T extends keyof mcpe_packet["params"]>(
			packetName: T,
			callback: (packetParams: mcpe_packet["params"][T]) => any
		) => any;
	}
}
