export interface ICommand {
  name: string;
  description?: string;
  run: () => void;
  alias?: string;
  arguments?: string[];
  options?: string[];
}

export class Command implements ICommand {
  public name: string;
  public description?: string | undefined;
  public run: () => void;
  public alias?: string | undefined;
  public arguments?: string[] | undefined;
  public options?: string[] | undefined;

  constructor(props: ICommand) {
    this.name = "";
    this.description = undefined;
    this.run = () => {};
    this.alias = undefined;
    this.arguments = undefined;
    this.options = undefined;
    Object.assign(this, props);
  }
}
