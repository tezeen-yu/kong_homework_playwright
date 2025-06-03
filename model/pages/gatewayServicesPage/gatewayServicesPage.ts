import { ServicesPageItems } from '../../../const/elements';
import { Utils } from '../../../utils/utils';
import { Button } from '../../component/button';
import { IKongPage } from '../../locator';
import { GetwayServiceFormPage, IGetwayServiceFormPage } from './gatewayServiceFormPage';
import { globals } from './../../../utils/globals';
import { IServiceItemDetailsPage, ServiceItemDetailsPage } from './gatewayServiceItemDetailsPage';

export interface IGatewayServicesPage {
    addGatewayService(): Promise<IGetwayServiceFormPage>;
    getServicesCount(): Promise<number>;
    openServiceItemDetailsPage(serviceName: string): Promise<IServiceItemDetailsPage>;
}

export class GatewayServicesPage implements IGatewayServicesPage {
    readonly page: IKongPage;
    createNewServiceButton_empty: Button;
    createNewServiceButton: Button;

    constructor(page: IKongPage) {
        this.page = page;
        this.createNewServiceButton_empty = new Button(this.page, Utils.getByTestId(ServicesPageItems.AddGatewayServiceEmpty));
        this.createNewServiceButton = new Button(this.page, Utils.getByTestId(ServicesPageItems.AddGatewayService));
    }

    async addGatewayService(): Promise<IGetwayServiceFormPage> {
        if (globals.serversCnt > 0) {
            await this.createNewServiceButton.click();
        } else {
            await this.createNewServiceButton_empty.click();
        }
        return new GetwayServiceFormPage(this.page);
    }

    async getServicesCount(): Promise<number> {
        const ServiceTableSelector = this.page.locator('table > tbody > tr');
        const count = await ServiceTableSelector.count();
        return count;
    }

    async openServiceItemDetailsPage(serviceName: string): Promise<IServiceItemDetailsPage> {
        const ServiceTableSelector = this.page.locator('table > tbody > tr');
        const count = await ServiceTableSelector.count();
        if (count > 0) {
            for (let i = 0; i < count; i++) {
                const serName = await ServiceTableSelector.nth(i).locator('td').nth(0).innerText();
                if (serName === serviceName) {
                    await ServiceTableSelector.nth(i).locator('td').nth(0).click();
                    break;
                }
            }
        } else {
            throw new Error('No services found in the service page.');
        }
        return new ServiceItemDetailsPage(this.page);
    }
}