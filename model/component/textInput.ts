import { IKongLocator, IKongPage } from '../locator';

export interface ITextInput {
  locator: IKongLocator;
  fill(value: string): Promise<void>;
}

export class TextInput implements ITextInput {
  constructor(
    private page: IKongPage,
    private selector: string
  ) {}

  get locator(): IKongLocator {
    return this.page.locator(this.selector);
  }

  async fill(value: string): Promise<void> {
    try {
      await this.locator.fill(value);
      await this.locator.blur();
    } catch (err) {
      throw new Error(`Type in ${value} failed. ${err}`);
    }
  }
}
