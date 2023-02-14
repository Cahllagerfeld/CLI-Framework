import { Command } from "./command.js";

export class Plugin {
	name: string;
	description: string;
	commands: Command[];
	constructor() {
		this.name = null;
		this.description = null;
		this.commands = [];
	}
}
