import { Runner } from "./runner.js";

class Builder {
	private brand: string;
	private nativeDirectory: string;
	private pluginConfig: { directory: string; matching: string };

	constructor(brand: string) {
		this.brand = brand;
		this.nativeDirectory = "";
	}

	public src(directory: string): Builder {
		this.nativeDirectory = directory;
		return this;
	}

	public plugins(directory: string, matching: string) {
		this.pluginConfig = { directory, matching };
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
