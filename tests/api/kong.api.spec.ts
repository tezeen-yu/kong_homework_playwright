import { test } from '@playwright/test';
import { APIRequests } from './apiRequests';

test.describe('API Tests', () => {
  test('GET services', async ({ request }) => {
    const apiRequests = new APIRequests();
    await apiRequests.getServices(request);
  });
});