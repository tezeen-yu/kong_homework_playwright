import { test as base } from '@playwright/test';
import { UIAutomationSetup } from './automationSetup';
import { ISidebarMenu } from '../model/pages/sideMenuPage';

// Declare the types of your fixtures.
type Fixtures = {
  uiAutomationSetup: UIAutomationSetup;
  sidebarMenu: ISidebarMenu;
};

export const uiAutomationTest = base.extend<Fixtures>({
  uiAutomationSetup: async ({}, use) => {
    const uiAutomationSetup = new UIAutomationSetup();
    // await uiAutomationSetup.prepareEmptyDateviaAPI();
    await use(uiAutomationSetup);
    // await uiAutomationSetup.clearDateviaAPI();
  },

  sidebarMenu: async ({ uiAutomationSetup, page }, use) => {
    const sidebarMenu = await uiAutomationSetup.gotoKongAUT(page);
    await uiAutomationSetup.getItemsCountOnOverviewPage(sidebarMenu);
    await use(sidebarMenu);
  },
});

// module.exports = { uiAutomationTest };