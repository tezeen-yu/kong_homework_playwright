import { RoutesPageItems } from '../../../const/elements';
import { globals } from '../../../utils/globals';
import { Utils } from '../../../utils/utils';
import { Button } from '../../component/button';
import { IKongPage } from '../../locator';
import { IRoutesFormPage, RoutesFormPage } from './routesFormPage';
import { IRoutesItemDetailsPage, RoutesItemDetailsPage } from './routesItemDetailsPage';

export interface IRoutesPage {
    addRoutes(): Promise<IRoutesFormPage>;
    getRoutesCount(): Promise<number>;
    openRouteItemDetailsPage(serviceName: string): Promise<IRoutesItemDetailsPage>;
}

export class RoutesPage implements IRoutesPage {
    readonly page: IKongPage;
    createNewRoutesButton_empty: Button;
    createNewRoutesButton: Button;

    constructor(page: IKongPage) {
        this.page = page;
        this.createNewRoutesButton_empty = new Button(this.page, Utils.getByTestId(RoutesPageItems.AddRoutesEmpty));
        this.createNewRoutesButton = new Button(this.page, Utils.getByTestId(RoutesPageItems.AddRoutes));
    }

    async addRoutes(): Promise<IRoutesFormPage> {
        if (globals.routesCnt > 0) {
            await this.createNewRoutesButton.click();
        } else {
            await this.createNewRoutesButton_empty.click();
        }
        return new RoutesFormPage(this.page);
    }

    async getRoutesCount(): Promise<number> {
        const ServiceTableSelector = this.page.locator('table > tbody > tr');
        const count = await ServiceTableSelector.count();
        return count;
    }

    async openRouteItemDetailsPage(routeName: string): Promise<IRoutesItemDetailsPage> {
        const routesTableSelector = this.page.locator('table > tbody > tr');
        const count = await routesTableSelector.count();
        if (count > 0) {
            for (let i = 0; i < count; i++) {
                const rouName = await routesTableSelector.nth(i).locator('td').nth(0).innerText();
                if (rouName === routeName) {
                    await routesTableSelector.nth(i).locator('td').nth(0).click();
                    break;
                }
            }
        } else {
            throw new Error('No routes found in the routes page.');
        }

        return new RoutesItemDetailsPage(this.page);
    }
}