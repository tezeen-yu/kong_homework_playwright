import { Utils } from '../../utils/utils';
import { IKongLocator, IKongPage } from '../locator';

export interface IDropdownList {
  locator: IKongLocator;
  click(): Promise<void>;
  select(optionValue: string): Promise<void>;
  clickAndSelect(optionValue: string): Promise<void>;
}

export class DropdownList implements IDropdownList {
  constructor(
    private page: IKongPage,
    private selector: string,
  ) {}

  get locator(): IKongLocator {
    return this.page.locator(this.selector);
  }

  async select(optionValue: string): Promise<void> {
    const item = this.page.locator(Utils.getDropdownItem(optionValue));

    if (!item) {
      throw Error('There is no drop down items in the list.');
    }
    await item.click();
  }

  async click(): Promise<void> {
    await this.locator.click();
  }

  async clickAndSelect(optionValue: string): Promise<void> {
    await this.click();
    await this.select(optionValue);
    await Utils.wait(500);
  }
}
