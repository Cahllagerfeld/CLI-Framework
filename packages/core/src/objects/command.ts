// import { CLI_Toolbox } from "./toolbox.js";

type Options = {
	long: string;
	short?: string;
	description?: string;
};

export interface CLI_Command {
	name: string;
	description?: string;
	execute: (toolbox: any) => Promise<void>;
	arguments?: string[];
	options?: Options[];
	subcommands?: Command[];
}

export class Command implements CLI_Command {
	public name: string;
	public description?: string | undefined;
	public execute: (toolbox: any) => Promise<void>;
	public arguments?: string[] | undefined;
	public options?: Options[] | undefined;
	public path?: string | undefined;
	public subcommands?: Command[] | undefined;

	constructor(props?: CLI_Command) {
		this.name = "";
		this.description = undefined;
		this.execute = async () => {};
		this.arguments = undefined;
		this.options = undefined;
		this.path = undefined;
		Object.assign(this, props);
	}
}
