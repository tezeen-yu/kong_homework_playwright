import { Utils } from '../../utils/utils';
import { IKongLocator, IKongPage } from '../locator';

export interface IClickableElem {
  locator: IKongLocator;
  click(): Promise<void>;
  isVisible(): Promise<boolean>;
}

export class ClickableElem implements IClickableElem {
  constructor(
    private page: IKongPage,
    private selector: string
  ) {}

  async isVisible(): Promise<boolean> {
    return await this.locator.isVisible();
  }


  get locator(): IKongLocator {
    return this.page.locator(this.selector);
  }

  async click(): Promise<void> {
    await this.locator.click();
    await Utils.wait(500);
  }
}

export interface ILinks {
  locator: IKongLocator;
  click(): Promise<void>;
  isVisible(): Promise<boolean>;
}

export class Links extends ClickableElem implements ILinks {
  constructor(page: IKongPage, selector: string) {
    super(page, selector);
  }
}

export interface IButton {
  locator: IKongLocator;
  click(): Promise<void>;
  isVisible(): Promise<boolean>;
}

export class Button extends ClickableElem implements IButton {
  constructor(page: IKongPage, selector: string) {
    super(page, selector);
  }
}
