import { RoutesItemDetailsPageItems } from '../../../const/elements';
import { Utils } from '../../../utils/utils';
import { Button, Links } from '../../component/button';
import { IKongPage } from '../../locator';

export interface IRoutesItemDetailsPage {
    getRoutesID(): Promise<string>;
    getServiceName(): Promise<string>;
    gotoPlusinsPage(): Promise<void>;
    addPlugins(): Promise<void>;
}

export class RoutesItemDetailsPage implements IRoutesItemDetailsPage {
    readonly page: IKongPage;
    PluginsLink: Links;
    addPluginsBtn_empty: Button;

    constructor(page: IKongPage) {
        this.page = page;
        this.PluginsLink = new Links(this.page, Utils.getByTestId(RoutesItemDetailsPageItems.Plugins));
        this.addPluginsBtn_empty = new Button(this.page, Utils.getByTestId(RoutesItemDetailsPageItems.AddPluginsBtnEmpty));
    }

    async getServiceName(): Promise<string> {
        const serviceName = this.page.locator(Utils.getByTestId(RoutesItemDetailsPageItems.ServiceName)).innerText();
        return serviceName;
    }

    async getRoutesID(): Promise<string> {
        const routesID = this.page.locator(Utils.getByTestId(RoutesItemDetailsPageItems.RoutesID)).innerText();
        return routesID;
    }

    async gotoPlusinsPage(): Promise<void> {
        await this.PluginsLink.click();
    }

    //need to check if the route has plugins, not completely implemented
    async addPlugins(): Promise<void> {
        await this.gotoPlusinsPage();
        this.addPluginsBtn_empty.click();
    }
}