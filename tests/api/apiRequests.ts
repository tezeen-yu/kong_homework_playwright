import { expect, APIRequestContext } from '@playwright/test';

const BASE_URL = 'http://localhost:8001/default';

export interface IAPIRequests {
    getServiceDetails(request: APIRequestContext, serviceId: string): Promise<void>;
    getServices(request: APIRequestContext): Promise<void>;
    deleteService(request: APIRequestContext, serviceId: string): Promise<void>;
    deleteRoute(request: APIRequestContext, routesId: string): Promise<void>;
}

export class APIRequests implements IAPIRequests{
    constructor() { }

    async getServiceDetails(request: APIRequestContext, serviceId: string): Promise<void> {
        const res = await request.get(`${BASE_URL}/services/${serviceId}`);
        expect(res.status(), 'Expected status 200').toBe(200);
    }

    async getServices(request: APIRequestContext): Promise<void> {
        const res = await request.get(`${BASE_URL}/services`);
        // console.log('Headers:', res.headers());
        expect(res.status(), 'Expected status 200').toBe(200);
        const post = await res.json();
        // console.log('post:', post);
    }

    async deleteService(request: APIRequestContext, serviceId: string): Promise<void> {
        const res = await request.delete(`${BASE_URL}/services/${serviceId}`);
        expect(res.status()).toBe(204);
    }

    async deleteRoute(request: APIRequestContext, routesId: string): Promise<void> {
        const res = await request.delete(`${BASE_URL}/routes/${routesId}`);
        expect(res.status()).toBe(204);
    }
}



