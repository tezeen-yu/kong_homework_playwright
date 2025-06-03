// import { Page, Locator } from '@playwright/test';
import { Utils } from '../../utils/utils';
import { IKongPage } from '../locator';
import { ClickableElem, Links } from '../component/button';
import { SideMenuItems } from '../../const/elements';
import { GatewayServicesPage, IGatewayServicesPage } from './gatewayServicesPage/gatewayServicesPage';
import { RoutesPage, IRoutesPage } from './routesPage/routesPage';
import { IOverviewPage, OverviewPage } from './overviewPage/overviewPage';

export interface ISidebarMenu {
    gotoOverviewPage(): Promise<IOverviewPage>;
    gotoGatewayServicesPage(): Promise<IGatewayServicesPage>;
    gotoRoutesPage(): Promise<IRoutesPage>;
    // gotoConsumersPage(): Promise<IConsumersPage>;
    // gotoPluginsPage(): Promise<IPluginsPage>;
}

export class SidebarMenu implements ISidebarMenu {

    constructor(private sidebar: IKongPage) { }

    async gotoOverviewPage(): Promise<IOverviewPage> {
        try {
            const overviewLink = new Links(this.sidebar, Utils.getByTestId(SideMenuItems.Overview));
            await overviewLink.click();
        } catch (err) {
            throw new Error(`Click Overview page failed. ${err}`);
        }
        return new OverviewPage(this.sidebar);
    }

    async gotoGatewayServicesPage(): Promise<IGatewayServicesPage> {
        try {
            const gatewayServicesLink = new Links(this.sidebar, Utils.getByTestId(SideMenuItems.GatewayServices));
            await gatewayServicesLink.click();
        } catch (err) {
            throw new Error(`Click Gateway Services page failed. ${err}`);
        }
        return new GatewayServicesPage(this.sidebar);
    }

    async gotoRoutesPage(): Promise<IRoutesPage> {
        try {
            const RoutesLink = new ClickableElem(this.sidebar, Utils.getByTestId(SideMenuItems.Routes));
            await RoutesLink.click();
        } catch (err) {
            throw new Error(`Click Routes page failed. ${err}`);
        } 
        return new RoutesPage(this.sidebar);
    }

    // async gotoConsumersPage(): Promise<void> {
    //     try {
    //         const consumerLink = new Button(this.sidebar, Utils.getByRole('link', SideMenuItems.Consumers));
    //         await consumerLink.click();
    //     } catch (err) {
    //         throw new Error(`Click Consumers page failed. ${err}`);
    //     }    
    // }

    // async gotoPluginsPage(): Promise<void> {
    //     try {
    //         const plugininLink = new Button(this.sidebar, Utils.getByRole('link', SideMenuItems.Plugins));
    //         await plugininLink.click();
    //     } catch (err) {
    //         throw new Error(`Click Plugin page failed. ${err}`);
    //     }    
    // }
    
}