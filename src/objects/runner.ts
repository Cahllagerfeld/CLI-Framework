import { parseArgs } from "./tools/parse-params.js";

export class Runner {
	run: (this: Runner, args: string | string[]) => Promise<void>;
	constructor() {
		this.run = Run;
	}
}

export async function Run(this: Runner, args: string | string[]) {
	const parsedArgs = await parseArgs(args);
	console.log(parsedArgs);
}
