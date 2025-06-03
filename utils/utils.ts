
export class Utils {
  public static test_id = 'data-testid=';

  public static async wait(timeout: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

  public static getByTestId(elem: string): string {
    return `[${this.test_id}${elem}]`;
  }

  public static getDropdownItem(optionValue: string): string {
    return `[${this.test_id}"select-item-${optionValue}"]`;
  }
}