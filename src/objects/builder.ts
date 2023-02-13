import { Runner } from "./runner.js";

class Builder {
	private brand: string;
	private default_plugin: string;
	private plugin_config: { directory: string; matching: string };

	constructor(brand: string) {
		this.brand = brand;
		this.default_plugin = "";
	}

	public src(directory: string): Builder {
		this.default_plugin = directory;
		return this;
	}

	public plugins(directory: string, matching: string) {
		this.plugin_config = { directory, matching };
		return this;
	}

	public build(): Runner {
		const runner = new Runner();

		if (this.default_plugin) runner.add_plugin(this.default_plugin);
		return runner;
	}
}

export function build(brand: string): Builder {
	return new Builder(brand);
}
