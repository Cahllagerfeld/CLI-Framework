import { Runner } from "./runner.js";

class Builder {
	private brand: string;
	private nativeDirectory: string;
	private pluginDirectory: string;

	constructor(brand: string) {
		this.brand = brand;
		this.nativeDirectory = "";
		this.pluginDirectory = "";
	}

	public src(directory: string): Builder {
		this.nativeDirectory = directory;
		return this;
	}

	public plugins(pluginRegex: string) {
		this.pluginDirectory = pluginRegex;
		return this;
	}

	public build(): Runner {
		const runner = new Runner();

		return runner;
	}
}

export function build(brand: string): Builder {
	return new Builder(brand);
}
