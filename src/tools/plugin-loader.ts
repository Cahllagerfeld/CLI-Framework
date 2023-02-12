import { Plugin } from "../objects/plugin.js";
import path from "path";
import { load_command_from_file } from "../tools/command-loader.js";
import fs from "fs-jetpack";

export async function load_plugin_from_directory(directory: string, options: { name: string }) {
	const plugin = new Plugin();

	if (!plugin.name) plugin.name = options.name;

	const jetpack_config = fs.cwd(directory);

	// TODO make this configurable
	const commands_search_dir = ["commands", "build/commands"];

	// Load commands
	for (const dir of commands_search_dir) {
		if (jetpack_config.exists(dir) === "dir") {
			const commands = jetpack_config.cwd(dir).find({ matching: [`*.{js,ts}`, `!*.test.{js,ts}`] });

			plugin.commands = plugin.commands.concat(
				await Promise.all(
					commands.map(async (file) => {
						return await load_command_from_file(path.join(directory, dir, file));
					})
				)
			);
		}
	}
	return Plugin;
}
