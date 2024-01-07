import { Command, CLI_Command } from "../objects/command.js";
import fs from "fs-jetpack";

export async function load_command_from_file(file: string) {
	const command = new Command();

	// TODO Add Checks and Error Handling here

	command.name = fs.inspect(file).name;

	let { default: command_module }: { default: CLI_Command } = await import(file);

	command.name = command_module.name;
	command.description = command_module.description;
	command.execute = command_module.execute;

	return command;
}
