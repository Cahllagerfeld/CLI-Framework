import { load_plugin_from_directory } from "../tools/plugin-loader.js";
import { Plugin } from "../objects/plugin.js";
import { parse_params } from "../tools/parse-params.js";
import { Command } from "./command.js";
import { Toolbox } from "./toolbox.js";

export class Runner {
	run: (this: Runner, args: string | string[]) => Promise<void>;
	public readonly plugins?: Plugin[];
	public readonly commands?: Command[];
	constructor() {
		this.plugins = [];
		this.commands = [];
		this.run = Run;
	}

	public async add_plugin(directory: string) {
		const plugin = await load_plugin_from_directory(directory, { name: "test" });
		this.plugins.push(plugin);
		plugin.commands.forEach((command) => {
			this.add_command(command);
		});
		return this;
	}

	public async add_command(command: Command) {
		this.commands.push(command);
		return this;
	}
}

export async function Run(this: Runner, args: string | string[]) {
	const { args: parsed_args, options } = await parse_params(args);

	const { active_command, path_rest } = find_command(this, parsed_args);

	const toolbox = new Toolbox({ arguments: path_rest, options: options });

	if (active_command?.run) {
		await active_command.run(toolbox);
	}
}

export function find_command(runner: Runner, args: string[]) {
	let active_command: Command;
	let temp_path = args;
	let path_rest: string[] = [];
	let resolved_path: string[] = [];

	for (const arg of args) {
		resolved_path = [...resolved_path, arg];
		temp_path = temp_path.slice(1);
		const potential_command = runner.commands.find((command) => {
			const command_path_array = command.path.split("/");
			return (
				command_path_array.length === resolved_path.length &&
				command_path_array.every((val, index) => val === resolved_path[index])
			);
		});

		if (potential_command) {
			path_rest = temp_path;
			active_command = potential_command;
		}
	}

	// TODO Handling for non-existent command
	return { active_command, path_rest };
}
