import { IKongLocator, IKongPage } from "../locator";
import { ClickableElem } from "./button";

export interface IRadioButton {
  locator: IKongLocator;
  click(): Promise<void>;
  isVisible(): Promise<boolean>;
}

export class RadioButton extends ClickableElem implements IRadioButton {
  constructor(page: IKongPage, selector: string) {
    super(page, selector);
  }
}
