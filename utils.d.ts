import { CLIENTBOUND } from "TYPE_FILE_PATH";
declare module "bedrock-protocol" {
	interface Client {
		write: <T extends keyof CLIENTBOUND>(packetName: T, packetParams: CLIENTBOUND[T]) => void;
	}
}
