import { CLI_Toolbox } from "./toolbox.js";

export interface CLI_Command {
	name: string;
	description?: string;
	run: (toolbox: CLI_Toolbox) => Promise<void>;
	arguments?: string[];
	options?: string[];
}

export class Command implements CLI_Command {
	public name: string;
	public description?: string | undefined;
	public run: (toolbox: CLI_Toolbox) => Promise<void>;
	public arguments?: string[] | undefined;
	public options?: string[] | undefined;
	public path?: string | undefined;

	constructor(props?: CLI_Command) {
		this.name = "";
		this.description = undefined;
		this.run = async () => {};
		this.arguments = undefined;
		this.options = undefined;
		this.path = undefined;
		Object.assign(this, props);
	}
}
