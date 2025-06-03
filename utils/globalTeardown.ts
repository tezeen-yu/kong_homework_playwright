import { UIAutomationSetup } from "./automationSetup";

async function globalTeardown() {
  const setup = new UIAutomationSetup();
  await setup.endDocker();
}

export default globalTeardown;