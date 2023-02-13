import { load_plugin_from_directory } from "../tools/plugin-loader.js";
import { Plugin } from "../objects/plugin.js";
import { parse_params } from "../tools/parse-params.js";
import { Command } from "./command.js";

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
	const { args: parsed_args } = await parse_params(args);

	const { active_command, path_rest } = find_command(this, parsed_args);

	if (active_command?.run) {
		await active_command.run();
	}
}

export function find_command(runner: Runner, args: string[]) {
	let active_command: Command;
	let path_rest: string[] = [];

	// TODO Handling for non-existent command

	return { active_command, path_rest };
}
