import { Runner } from "./runner.js";

class Builder {
	private brand: string;
	private native_directory: string;
	private plugin_config: { directory: string; matching: string };

	constructor(brand: string) {
		this.brand = brand;
		this.native_directory = "";
	}

	public src(directory: string): Builder {
		this.native_directory = directory;
		return this;
	}

	public plugins(directory: string, matching: string) {
		this.plugin_config = { directory, matching };
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
