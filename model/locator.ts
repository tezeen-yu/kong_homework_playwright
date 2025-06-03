import { Locator, Page } from 'playwright';
import { Utils } from '../utils/utils';

export interface IKongPage {
  locator(selector: string): IKongLocator;
  goto(url: string): Promise<void>;
  waitForSelector(selector: string): Promise<string | null>;
}

export class KongPage implements IKongPage {
  constructor(private page: Page) {}

  async goto(url: string): Promise<void> {
    await this.page.goto(url);
  }

  async waitForSelector(selector: string): Promise<string | null> {
    return this.page.waitForSelector(selector, { timeout: 1000 }).then(() => 'error').catch(() => null);
  }

  locator(selector: string): IKongLocator {
    const locator = this.page.locator(selector);

    return new KongLocator(locator);
  }
}

export interface IKongLocator {
  locator(selector: string): IKongLocator;
  click(isRightClick?: boolean): Promise<void>;
  innerText(): Promise<string>;
  fill(value: string): Promise<void>;
  inputValue(): Promise<string>;
  blur(): Promise<void>;
  count(): Promise<number>;
  nth(index: number): IKongLocator;
  check(): Promise<void>;
  uncheck(): Promise<void>;
  dbClick(): Promise<void>;
  isChecked(): Promise<boolean>;
  isVisible(): Promise<boolean>;
}

export class KongLocator implements IKongLocator {
  constructor(private _locator: Locator) {}

  async isVisible(): Promise<boolean> {
    return await this._locator.isVisible();
  }

  async isChecked(): Promise<boolean> {
    return await this._locator.isChecked();
  }

  async dbClick(): Promise<void> {
    await this._locator.dblclick();
  }

  async check(): Promise<void> {
    await this._locator.check();
  }

  async uncheck(): Promise<void> {
    await this._locator.uncheck();
  }


  nth(index: number): IKongLocator {
    return new KongLocator(this._locator.nth(index));
  }

  async count(): Promise<number> {
    return this._locator.count();
  }

  blur(): Promise<void> {
    return this._locator.blur();
  }

  inputValue(): Promise<string> {
    return this._locator.inputValue();
  }

  locator(selector: string): IKongLocator {
    let pLocator: Locator;
    pLocator = this._locator.locator(selector);
    return new KongLocator(pLocator);
  }

  async click(isRightClick?: boolean): Promise<void> {
    const button = isRightClick ? 'right' : 'left';

    await this._locator.click({ button });
    await Utils.wait(500);
  }

  async innerText(): Promise<string> {
    return await this._locator.innerText();
  }

  async fill(value: string): Promise<void> {
    await this._locator.fill(value);
  }
}
