import { Utils } from '../../../utils/utils';
import { IKongPage } from '../../locator';

export interface IOverviewPage {
    getCounterofServices(): Promise<number>;
    getCounterofRoutes(): Promise<number>;
    getCounterofConsumers(): Promise<number>;
    getCounterofPlugins(): Promise<number>;
}

export class OverviewPage implements IOverviewPage {
    readonly page: IKongPage;

    constructor(page: IKongPage) {
        this.page = page;
    }

    async getCounterofServices(): Promise<number> {
        const services = this.page.locator(Utils.getByTestId('Services'));
        const servicesCount = await services.locator('.metric-value-text').innerText();
        return Number(servicesCount);
    }

    async getCounterofRoutes(): Promise<number> {
        const routes = this.page.locator(Utils.getByTestId('Routes'));
        const routesCount = await routes.locator('.metric-value-text').innerText();
        return Number(routesCount);
    }

    async getCounterofConsumers(): Promise<number> {
        const consumers = this.page.locator(Utils.getByTestId('Consumers'));
        const consumersCount = await consumers.locator('.metric-value-text').innerText();
        return Number(consumersCount);
    }

    async getCounterofPlugins(): Promise<number> {
        const plugins = this.page.locator(Utils.getByTestId('Plugins'));
        const pluginsCount = await plugins.locator('.metric-value-text').innerText();
        return Number(pluginsCount);
    }
}