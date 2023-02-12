import { load_plugin_from_directory } from "../tools/plugin-loader.js";
import { parse_params } from "../tools/parse-params.js";

export class Runner {
	run: (this: Runner, args: string | string[]) => Promise<void>;
	constructor() {
		this.run = Run;
	}

	public add_plugin(directory: string) {
		load_plugin_from_directory(directory, { name: "test" });
		return this;
	}
}

export async function Run(this: Runner, args: string | string[]) {
	const parsed_args = await parse_params(args);
	console.log({ args: parsed_args });
}
