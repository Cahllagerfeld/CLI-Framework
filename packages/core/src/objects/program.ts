import { Command } from "./command";
import yargs_parser from "yargs-parser";

export class Program {
	private _name: string = "";
	private _commands: Command[] = [
		new Command({
			name: "dummy",
			subcommands: [
				new Command({
					name: "dummy2",
					subcommands: [
						new Command({
							name: "dummy3",
							execute: async (x: any) => {
								console.log("test3", x);
							}
						})
					],
					execute: async (x: any) => {
						console.log("test2", x);
					}
				})
			],
			execute: async (x: any) => {
				console.log("test", x);
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
		this.parse_command(args);
		return this;
	}

	private parse_command(user_args: yargs_parser.Arguments) {
		const activeCommand = this.find_command(user_args._[0]);
		if (!activeCommand) {
			throw new Error("Command not found");
		}
		if (!activeCommand.subcommands) {
			activeCommand.execute(user_args._.slice(1));
			return;
		}
		this.find_subcommand(activeCommand, user_args._.slice(1));
	}

	private find_command(command_name: string | number) {
		return this._commands.find((command) => command.name === command_name);
	}

	private find_subcommand(command: Command, rest_args: (number | string)[]) {
		const sub_command = command.subcommands.find((subcommand) => subcommand.name === rest_args[0]);
		if (!sub_command) {
			// execute the command
			if (command.execute) {
				command.execute(rest_args);
			}

			return;
		}
		if (sub_command?.subcommands) {
			this.find_subcommand(sub_command, rest_args.slice(1));
		} else {
			// execute the subcommand
			if (sub_command.execute) {
				sub_command.execute(rest_args.slice(1));
			}
			return;
		}
	}
}
