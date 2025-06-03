import { UIAutomationSetup } from "./automationSetup";
import { Utils } from "./utils";

async function globalSetup() {
  const setup = new UIAutomationSetup();
  await setup.startDocker();
  await Utils.wait(5000);
}

export default globalSetup;