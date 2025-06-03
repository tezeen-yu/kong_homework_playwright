import { Utils } from '../../../utils/utils';
import { IKongPage } from '../../locator';
import { TextInput } from '../../component/textInput';
import { ServicesFormPageItems } from '../../../const/elements';
import { Button } from '../../component/button';
import { RadioButton } from '../../component/radioBtn';
import { IServiceItemDetailsPage, ServiceItemDetailsPage } from './gatewayServiceItemDetailsPage';

export interface IGetwayServiceFormPage {
    fillServiceName(serviceName: string): Promise<void>;
    fillServiceTags(tags: string): Promise<void>;
    chooseFullURLRadioBtn(): Promise<void>;
    chooseProtocolRadioBtn(): Promise<void>;
    fillFullURL(fullURL: string): Promise<void>;
    fillProtocol(protocol: string): Promise<void>;
    fillHost(host: string): Promise<void>;
    expandAdvancedFields(): Promise<void>;
    fillRetriesNumber(retries: string): Promise<void>;
    saveNewGarewayService(): Promise<IServiceItemDetailsPage>;
    cancelNewGarewayService(): Promise<void>;
    addSimpleService(serviceName: string, fullURL: string): Promise<IServiceItemDetailsPage>;
    getNewServiceID(serviceName: string, fullURL: string): Promise<string>;
}

export class GetwayServiceFormPage implements IGetwayServiceFormPage {
    readonly page: IKongPage;
    serviceNameInput: TextInput;
    tagsInput: TextInput;
    fullURLRadioBtn: RadioButton;
    fullURLInput: TextInput;
    advancedFields: Button;
    retriesInput: TextInput;
    saveBtn: Button;

    constructor(page: IKongPage) {
        this.page = page;
        this.serviceNameInput = new TextInput(this.page, Utils.getByTestId(ServicesFormPageItems.GatewayServiceNameInput));
        this.tagsInput = new TextInput(this.page, Utils.getByTestId(ServicesFormPageItems.GatewayServiceTagsInput));
        this.fullURLRadioBtn = new RadioButton(this.page, Utils.getByTestId(ServicesFormPageItems.GatewayServiceURLRadioBtn));
        this.fullURLInput = new TextInput(this.page, Utils.getByTestId(ServicesFormPageItems.GatewayServiceFullURLinput));
        this.advancedFields = new Button(this.page, Utils.getByTestId(ServicesFormPageItems.AdvancedFieldsExpandBtn));
        this.retriesInput = new TextInput(this.page, Utils.getByTestId(ServicesFormPageItems.GatewayServiceRetriesInput));
        this.saveBtn = new Button(this.page, Utils.getByTestId(ServicesFormPageItems.GatewayServiceFormSubmit));
    }

    async addSimpleService(serviceName: string, fullURL: string): Promise<IServiceItemDetailsPage> {
        await this.fillServiceName(serviceName);
        await this.fillFullURL(fullURL);
        const newServiceItemPage = await this.saveNewGarewayService();
        return newServiceItemPage;
    }

    async getNewServiceID(serviceName: string, fullURL: string): Promise<string> {
        const newServiceItemPage = await this.addSimpleService(serviceName, fullURL);
        const serviceID = await newServiceItemPage.getServiceID();
        return serviceID;
    }

    async fillServiceName(serviceName: string): Promise<void> {
        await this.serviceNameInput.fill(serviceName);
    }

    async fillServiceTags(tags: string): Promise<void> {
        await this.tagsInput.fill(tags);
    }

    async chooseFullURLRadioBtn(): Promise<void> {
        await this.fullURLRadioBtn.click();
    }

    async fillFullURL(fullURL: string): Promise<void> {
        await this.fullURLInput.fill(fullURL);
    }

    async expandAdvancedFields(): Promise<void> {
        await this.advancedFields.click();
    }

    async fillRetriesNumber(retries: string): Promise<void> {
        await this.retriesInput.fill(retries);
    }

    async saveNewGarewayService(): Promise<IServiceItemDetailsPage> {
        await this.saveBtn.click();
        try {
            const formError = await this.page.waitForSelector(Utils.getByTestId(ServicesFormPageItems.FormError));
            if (formError === 'error') {
                throw new Error('Failed to save the new gateway service. Please check the service name, it should be unique.');
            }
        } catch (error) {
            console.error('Error occurred while saving the new gateway service: ', error);
            throw error;
        }
        return new ServiceItemDetailsPage(this.page);
    }

    async chooseProtocolRadioBtn(): Promise<void> {
        throw new Error('Method not implemented.');
    }

    async fillProtocol(protocol: string): Promise<void> {
        throw new Error('Method not implemented.');
    }

    async fillHost(host: string): Promise<void> {
        throw new Error('Method not implemented.');
    }

    async cancelNewGarewayService(): Promise<void> {
        throw new Error('Method not implemented.');
    }
}