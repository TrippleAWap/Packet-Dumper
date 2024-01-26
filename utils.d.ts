import { CLIENTBOUND } from "./types1706307216157";
declare module "bedrock-protocol" {
	interface Client {
		write: <T extends keyof CLIENTBOUND>(packetName: T, packetParams: CLIENTBOUND[T]) => void;
	}
}
