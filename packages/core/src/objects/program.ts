import { Command } from "./command";
import yargs_parser from "yargs-parser";

export class Program {
	private _name: string = "";
	private _commands: Command[] = [
		new Command({
			name: "dummy",
			execute: async () => {
				console.log("test");
			}
		})
	];
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
		const args = yargs_parser(process.argv.slice(2).join(" "));
		const { active_command, path_rest } = this.activate_command(args);
		active_command?.execute(path_rest);
		return this;
	}

	private activate_command(user_args: yargs_parser.Arguments) {
		// TODO - handle subcommands and namespaces
		let temp_path = user_args._;
		let resolved_path: (string | number)[] = [];
		let path_rest: (string | number)[] = [];
		let active_command: Command;

		for (const arg of user_args._) {
			resolved_path = [...resolved_path, arg];
			temp_path = temp_path.slice(1);
			const potential_command = this._commands.find((command) => command.name === arg);

			if (potential_command) {
				path_rest = temp_path;
				active_command = potential_command;
			}
		}

		if (!active_command) {
			throw new Error("No command found");
		}

		return {
			active_command,
			path_rest
		};
	}
}
