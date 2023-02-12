export async function parseParams(commandArray: string | string[]) {
	const { default: yargsParser } = await import("yargs-parser");

	if (typeof commandArray === "string") {
		commandArray = commandArray.split(" ");
	}

	commandArray = commandArray as string[];

	if (process.argv === commandArray) {
		commandArray = commandArray.slice(2);
	}

	const parsedArgs = yargsParser(commandArray);
	const args = parsedArgs._.slice();
	delete parsedArgs._;

	return { ...parsedArgs, args };
}
