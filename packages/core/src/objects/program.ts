import { Command } from "./command";
import yargs_parser from "yargs-parser";

export class Program {
	private _name: string = "";
	private _commands: Command[] = [];
	private _description: string = "";
	private _version: string = "";
	private plugin_lib: any[] = [];

	constructor(name: string) {
		this._name = name;
		this.plugin_lib = [];
	}

	public description(description: string) {
		this._description = description;
	}

	public plugins(plugins: any[]) {
		this.plugin_lib = plugins;
	}

	public version(version: string) {
		this._version = version;
	}

	public parse() {
		// TODO Generate aliases for each command
		const args = yargs_parser(process.argv.slice(2).join(" "), {
			configuration: {
				"parse-numbers": false,
				"parse-positional-numbers": false
			}
		});
		this.activate_command(args);
		console.log(args);
		return this;
	}

	private activate_command(user_args: yargs_parser.Arguments) {
		const command_name = user_args._[0];
		// remove command name from args
		user_args._.shift();

		const options = user_args["--"] as string[];

		const command = this._commands.find((command) => {
			return command.name === command_name;
		});

		if (!command) {
			console.log(`Command ${command_name} not found`);
			return;
		}

		const toolbox = {
			arguments: user_args._,
			options: options
		};

		command.execute(toolbox);
	}
}
