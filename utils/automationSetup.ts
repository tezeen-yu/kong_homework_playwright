// import { Page } from '@playwright/test';
import { execSync } from 'child_process';
import { IKongPage, KongPage } from '../model/locator';
import { SidebarMenu } from '../model/pages/sideMenuPage';
import { Page } from 'playwright';
import { globals } from './globals';
import { Utils } from './utils';
import path from 'path';

export class UIAutomationSetup {
    
    constructor() { }
    
    async startDocker() {
        const dockerDir = path.resolve(__dirname, '../kong_setup');;
        try {
            console.log('Starting Docker...');
            execSync('docker compose up -d', {
                stdio: 'inherit',
                cwd: dockerDir,
                shell: process.platform === 'win32' ? 'cmd.exe' : '/bin/sh',
            });
            console.log('Docker containers started.');
        } catch (err: any) {
            console.error('Failed to start Docker containers.');
            console.error(err.message);
            if (err.stderr) console.error(err.stderr.toString());
        }
    }
    
    async endDocker() {
        const dockerDir = path.resolve(__dirname, '../kong_setup');
        try {
            console.log('Ending Docker...');
            execSync('docker-compose down', {
                stdio: 'inherit',
                cwd: dockerDir,
                shell: process.platform === 'win32' ? 'cmd.exe' : '/bin/sh',
            });
            console.log('Docker containers started.');
        } catch (err: any) {
            console.error('Failed to end Docker containers.');
            console.error(err.message);
            if (err.stderr) console.error(err.stderr.toString());
        }
    }

    async gotoKongAUT(page: Page) {
        await page.setViewportSize({ width: 1920, height: 1080 });
        const kong = new KongPage(page);
        await kong.goto('/overview');
        const sidebarPage = new SidebarMenu(kong);
        return sidebarPage;
    }

    async getItemsCountOnOverviewPage(sidebarMenu: SidebarMenu) {
        const overviewPage = await sidebarMenu.gotoOverviewPage();
        const serversCount = await overviewPage.getCounterofServices();
        globals.serversCnt = serversCount;

        const routesCount = await overviewPage.getCounterofRoutes();
        globals.routesCnt = routesCount;
        
        const consumersCount = await overviewPage.getCounterofConsumers();
        globals.consumersCnt = consumersCount;

        const pluginsCount = await overviewPage.getCounterofPlugins();
        globals.pluginsCnt = pluginsCount;

        console.log(`Servers: ${globals.serversCnt}, Routes: ${globals.routesCnt}, Consumers: ${globals.consumersCnt}, Plugins: ${globals.pluginsCnt}`);
    }

    async prepareEmptyDateviaAPI() {
        // TODO: Implement the API call to prepare empty data
        // This is a placeholder for the actual API call
        console.log("Preparing empty data via API...");
    }

    async clearDateviaAPI() {
        // TODO: Implement the API call to clear the data
        // This is a placeholder for the actual API call
        console.log("Clear test data via API...");
    }
}
