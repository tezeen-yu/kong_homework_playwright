import { Utils } from '../../../utils/utils';
import { IKongPage } from '../../locator';
import { TextInput } from '../../component/textInput';
import { RoutesFormPageItems } from '../../../const/elements';
import { Button } from '../../component/button';
import { DropdownList } from '../../component/dropdownList';
import { RoutesItemDetailsPage, IRoutesItemDetailsPage } from './routesItemDetailsPage';
import { GatewayServicesPage, IGatewayServicesPage } from '../gatewayServicesPage/gatewayServicesPage';

export interface IRoutesFormPage {
    fillRoutesName(routesName: string): Promise<void>;
    chooseRelatedService(serviceID: string): Promise<void>;
    fillRoutesTags(tags: string): Promise<void>;
    chooseProtocol(protocolOptionValue: string): Promise<void>;
    fillPath(fullURL: string): Promise<void>;
    expandAdvancedFields(): Promise<void>;
    saveNewRoutes(): Promise<IRoutesItemDetailsPage>;
    saveNewRoutesFromService(): Promise<IGatewayServicesPage>;
    cancelNewRoutes(): Promise<void>;
    choosePathHandling(pathHandlingOptionValue: string): Promise<void>;
    addSimpleRoutesFromService(routesName: string, protocolOptionValue: string, path: string, pathHandlingOptionValue: string): Promise<IGatewayServicesPage>;
    addSimpleRoutes(routesName: string, protocolOptionValue: string, path: string, pathHandlingOptionValue: string): Promise<IRoutesItemDetailsPage>;
}

export class RoutesFormPage implements IRoutesFormPage {
    readonly page: IKongPage;
    routesNameInput: TextInput;
    tagsInput: TextInput;
    protocolDropdown: DropdownList;
    pathInput: TextInput;
    advancedFields: Button;
    pathHandlingDropdown: DropdownList;
    saveBtn: Button;
    serviceSelect: DropdownList;

    constructor(page: IKongPage) {
        this.page = page;
        this.routesNameInput = new TextInput(this.page, Utils.getByTestId(RoutesFormPageItems.GatewayRoutesNameInput));
        this.serviceSelect = new DropdownList(this.page, Utils.getByTestId(RoutesFormPageItems.RoutesServiceInput));
        this.tagsInput = new TextInput(this.page, Utils.getByTestId(RoutesFormPageItems.RoutesTagsInput));
        this.protocolDropdown = new DropdownList(this.page, Utils.getByTestId(RoutesFormPageItems.RoutesProtocolsDropdown));
        this.pathInput = new TextInput(this.page, Utils.getByTestId(RoutesFormPageItems.RoutesPathInput));
        this.advancedFields = new Button(this.page, Utils.getByTestId(RoutesFormPageItems.AdvancedFieldsExpandBtn));
        this.pathHandlingDropdown = new DropdownList(this.page, Utils.getByTestId(RoutesFormPageItems.RoutesPathHandlingDropdown));
        this.saveBtn = new Button(this.page, Utils.getByTestId(RoutesFormPageItems.RoutesFormSubmit));
    }

    async addSimpleRoutes(routesName: string, protocolOptionValue: string, path: string, pathHandlingOptionValue: string): Promise<IRoutesItemDetailsPage> {
        await this.fillRoutesName(routesName);
        await this.chooseProtocol(protocolOptionValue);
        await this.fillPath(path);
        await this.expandAdvancedFields();
        await this.choosePathHandling(pathHandlingOptionValue);
        return await this.saveNewRoutes();
    }

    async addSimpleRoutesFromService(routesName: string, protocolOptionValue: string, path: string, pathHandlingOptionValue: string): Promise<IGatewayServicesPage> {
        await this.fillRoutesName(routesName);
        await this.chooseProtocol(protocolOptionValue);
        await this.fillPath(path);
        await this.expandAdvancedFields();
        await this.choosePathHandling(pathHandlingOptionValue);
        return await this.saveNewRoutesFromService();
    }
    

    async fillRoutesName(routesName: string): Promise<void> {
        await this.routesNameInput.fill(routesName);
    }

    async chooseRelatedService(serviceID: string): Promise<void> {
        this.serviceSelect.clickAndSelect(serviceID);
    }

    async fillRoutesTags(tags: string): Promise<void> {
        await this.tagsInput.fill(tags);
    }

    async chooseProtocol(optionValue: string): Promise<void> {
        await this.protocolDropdown.clickAndSelect(optionValue);
    }

    async fillPath(fullURL: string): Promise<void> {
        await this.pathInput.fill(fullURL);
    }

    async expandAdvancedFields(): Promise<void> {
        await this.advancedFields.click();
    }

    async choosePathHandling(optionValue: string): Promise<void> {
        await this.pathHandlingDropdown.clickAndSelect(optionValue);
    }

    async saveNewRoutes(): Promise<IRoutesItemDetailsPage> {
        await this.saveBtn.click();
        try {
            const formError = await this.page.waitForSelector(Utils.getByTestId(RoutesFormPageItems.FormError));
            if (formError === 'error') {
                throw new Error('Failed to save the new route. Please check the route name, it should be unique.');
            }
        } catch (error) {
            console.error('Error occurred while saving the new route:', error);
            throw error;
        }
        return new RoutesItemDetailsPage(this.page);
    }

    async saveNewRoutesFromService(): Promise<IGatewayServicesPage> {
        await this.saveBtn.click();
        try {
            const formError = await this.page.waitForSelector(Utils.getByTestId(RoutesFormPageItems.FormError));
            if (formError === 'error') {
                throw new Error('Failed to save the new route. Please check the route name, it should be unique.');
            }
        } catch (error) {
            console.error('Error occurred while saving the new route:', error);
            throw error;
        }
        return new GatewayServicesPage(this.page);
    }

    async cancelNewRoutes(): Promise<void> {
        throw new Error('Method not implemented.');
    }
}