export interface ICommand {
	name: string;
	description?: string;
	run: () => Promise<void>;
	arguments?: string[];
	options?: string[];
}

export class Command implements ICommand {
	public name: string;
	public description?: string | undefined;
	public run: () => Promise<void>;
	public arguments?: string[] | undefined;
	public options?: string[] | undefined;
	public path?: string | undefined;

	constructor(props?: ICommand) {
		this.name = "";
		this.description = undefined;
		this.run = async () => {};
		this.arguments = undefined;
		this.options = undefined;
		this.path = undefined;
		Object.assign(this, props);
	}
}
