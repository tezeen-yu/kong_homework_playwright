import { ServiceItemDetailsPageItems } from '../../../const/elements';
import { Utils } from '../../../utils/utils';
import { Button, Links } from '../../component/button';
import { IKongPage } from '../../locator';
import { IRoutesFormPage, RoutesFormPage } from '../routesPage/routesFormPage';

export interface IServiceItemDetailsPage {
    getServiceID(): Promise<string>;
    getServiceName(): Promise<string>;
    gotoServiceRoutesPage(): Promise<void>;
    gotoServicePluginsPage(): Promise<void>;
    addRoute(): Promise<IRoutesFormPage>;
}

export class ServiceItemDetailsPage implements IServiceItemDetailsPage {
    readonly page: IKongPage;
    RoutesLink: Links;
    PluginsLink: Links;
    addRouteBtn_empty: Button;
    addRouteBtn: Button;

    constructor(page: IKongPage) {
        this.page = page;
        this.RoutesLink = new Links(this.page, Utils.getByTestId(ServiceItemDetailsPageItems.Routes));
        this.PluginsLink = new Links(this.page, Utils.getByTestId(ServiceItemDetailsPageItems.Plugins));
        this.addRouteBtn_empty = new Button(this.page, Utils.getByTestId(ServiceItemDetailsPageItems.AddRoutesBtnEmpty));
        this.addRouteBtn = new Button(this.page, Utils.getByTestId(ServiceItemDetailsPageItems.AddRouteBtn));
    }

    async getServiceID(): Promise<string> {
        const serviceID = this.page.locator(Utils.getByTestId(ServiceItemDetailsPageItems.ServiceID)).innerText();
        return serviceID;
    }

    async getServiceName(): Promise<string> {
        const serviceName = this.page.locator(Utils.getByTestId(ServiceItemDetailsPageItems.ServiceName)).innerText();
        return serviceName;
    }

    async gotoServiceRoutesPage(): Promise<void> {
        await this.RoutesLink.click();
    }

    async gotoServicePluginsPage(): Promise<void> {
        await this.PluginsLink.click();
    }

    async addRoute(): Promise<IRoutesFormPage> {
        const hasRoutes = await this.hasRelatedRouts();
        await this.gotoServiceRoutesPage();
        if (hasRoutes) {
            await this.addRouteBtn.click();
        } else {
            await this.addRouteBtn_empty.click();
        }
        return new RoutesFormPage(this.page);
    }

    private async hasRelatedRouts(): Promise<boolean> {
        let hasRoutes = true;
        const alertMessageCnt = await this.page.locator('.alert-message').count();
        if (alertMessageCnt > 0) {
            hasRoutes = false;
        }
        return hasRoutes;
    }

}