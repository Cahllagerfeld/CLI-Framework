import { Command } from "./command";
import yargsParser from "yargs-parser";

export class Program {
	private _name: string = "";
	private _commands: Command[] = [];
	private _description: string = "";
	private _version: string = "";
	private pluginLib: any[] = [];

	constructor(name: string) {
		this._name = name;
		this.pluginLib = [];
	}

	public description(description: string) {
		this._description = description;
	}

	public plugins(plugins: any[]) {
		this.pluginLib = plugins;
	}

	public version(version: string) {
		this._version = version;
	}

	public parse() {
		// TODO Generate aliases for each command
		const args = yargsParser(process.argv.slice(2).join(" "), {
			configuration: {
				"parse-numbers": false,
				"parse-positional-numbers": false
			}
		});
		this.activateCommand(args);
		console.log(args);
		return this;
	}

	private activateCommand(userArgs: yargsParser.Arguments) {
		const commandName = userArgs._[0];
		// remove command name from args
		userArgs._.shift();

		const options = userArgs["--"] as string[];

		const command = this._commands.find((command) => {
			return command.name === commandName;
		});

		if (!command) {
			console.log(`Command ${commandName} not found`);
			return;
		}

		const toolbox = {
			arguments: userArgs._,
			options: options
		};

		command.execute(toolbox);
	}
}
