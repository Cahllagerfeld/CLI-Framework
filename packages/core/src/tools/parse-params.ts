export async function parse_params(command_array: string | string[]) {
	const { default: yargs_parser } = await import("yargs-parser");

	if (typeof command_array === "string") {
		command_array = command_array.split(" ");
	}

	command_array = command_array as string[];

	if (process.argv === command_array) {
		command_array = command_array.slice(2);
	}

	const parsed_args = yargs_parser(command_array);
	const args = parsed_args._.slice().map((item) => item.toString());
	delete parsed_args._;

	const options = { ...parsed_args } as { [key: string]: string | boolean | number };

	return { options, args };
}
