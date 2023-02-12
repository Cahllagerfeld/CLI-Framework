import { parse_params } from "./tools/parse-params.js";

export class Runner {
	run: (this: Runner, args: string | string[]) => Promise<void>;
	constructor() {
		this.run = Run;
	}
}

export async function Run(this: Runner, args: string | string[]) {
	const parsed_args = await parse_params(args);
	console.log(parsed_args);
}
