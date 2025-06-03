import { uiAutomationTest } from '../../utils/uiAutomationTest';
import { TestTag } from '../../const/testTags';
import { Utils } from '../../utils/utils';
import { APIRequests } from '../api/apiRequests';
import { expect } from 'playwright/test';
import { PathHandling, RoutesProtocols } from '../../const/dropdownItemsTypes';
import { generateServiceInfo, generateRouteInfo } from '../../utils/testData';
import { globals } from '../../utils/globals';

uiAutomationTest.describe("e2e test", {tag: TestTag.page_gatewayservices}, async () => {
  uiAutomationTest(
    "UI Automation Test - add a gateway service and related route", 
    { tag: TestTag.debug }, 
    async ({ sidebarMenu, request }) => {
      // Generate random service and route data
      const testData_serviceName = generateServiceInfo().servicename;
      const testData_serviceURL = generateServiceInfo().url;
      const testData_routeName = generateRouteInfo().routename;
      const testData_routePath = generateRouteInfo().path;

      // Click on the Gateway Services menu item from the left sidebar
      const servicesPage = await sidebarMenu.gotoGatewayServicesPage();
      // Add a new gateway service, the page will open a form to fill in the service details
      const createServiceFormPage = await servicesPage.addGatewayService();
      // Fill in the service details and save the new service
      // The service details page will open after saving the new service
      const newServiceDetailsPage = await createServiceFormPage.addSimpleService(testData_serviceName, testData_serviceURL);
      // Get the service ID and name to verify the service was created successfully
      const newServiceID = await newServiceDetailsPage.getServiceID();
      const newServiceName = await newServiceDetailsPage.getServiceName();
      expect(newServiceName).toBe(testData_serviceName);
      // Add a new route for the service, the page will open a form to fill in the route details
      // if creating a route from the service details page, the service page will be opened after saving the new route
      // so should go to the routes page to verify the route was created successfully
      const createRoutesFormPage = await newServiceDetailsPage.addRoute();
      await createRoutesFormPage.addSimpleRoutesFromService(testData_routeName, RoutesProtocols.HTTPS, testData_routePath, PathHandling.V0);
      const routesPage = await sidebarMenu.gotoRoutesPage();
      const routesDetailsPage = await routesPage.openRouteItemDetailsPage(testData_routeName);
      const routeID = await routesDetailsPage.getRoutesID();
      const serviceName = await routesDetailsPage.getServiceName();
      expect(serviceName).toBe(newServiceName);

      // delete the service and route using API requests here
      // to delete the service and route, it can be done from the UI pages as well, should implement it later
      const apiRequests = new APIRequests();
      await apiRequests.getServiceDetails(request, newServiceID);
      // before deleting the service, we need to delete the route first
      await apiRequests.deleteRoute(request, routeID);
      await apiRequests.deleteService(request, newServiceID);
  });

  uiAutomationTest(
    "UI Automation Test - add a gateway service", 
    { tag: TestTag.testLevel_e2e }, 
    async ({ sidebarMenu, request }) => {
      // Generate random route data
      const testData_serviceName = generateServiceInfo().servicename;
      const testData_serviceURL = generateServiceInfo().url;

      const servicesPage = await sidebarMenu.gotoGatewayServicesPage();
      const createServiceFormPage = await servicesPage.addGatewayService();
      const newServiceDetailsPage = await createServiceFormPage.addSimpleService(testData_serviceName, testData_serviceURL);
      const newServiceID = await newServiceDetailsPage.getServiceID();
      const newServiceName = await newServiceDetailsPage.getServiceName();
      expect(newServiceName).toBe(testData_serviceName);
      const overviewPage = await sidebarMenu.gotoOverviewPage();
      const serviceCount = await overviewPage.getCounterofServices();
      expect(serviceCount).toBe(globals.serversCnt + 1);

      const apiRequests = new APIRequests();
      await apiRequests.getServiceDetails(request, newServiceID);
      await apiRequests.deleteService(request, newServiceID);
  });

  uiAutomationTest(
    "UI Automation Test - add a gateway route", 
    { tag: TestTag.testLevel_e2e }, 
    async ({ sidebarMenu, request }) => {
      // Generate random route data
      const testData_routeName = generateRouteInfo().routename;
      const testData_routePath = generateRouteInfo().path;

      const routesPage = await sidebarMenu.gotoRoutesPage();
      const routesFormPage = await routesPage.addRoutes();
      const routesDetailsPage = await routesFormPage.addSimpleRoutes(testData_routeName, RoutesProtocols.GPRC, testData_routePath, PathHandling.V1);
      const routeID = await routesDetailsPage.getRoutesID();
      const serviceName = await routesDetailsPage.getServiceName();
      expect(serviceName).toBe("-");
      const overviewPage = await sidebarMenu.gotoOverviewPage();
      const routeCount = await overviewPage.getCounterofRoutes();
      expect(routeCount).toBe(globals.routesCnt + 1);

      const apiRequests = new APIRequests();
      await apiRequests.deleteRoute(request, routeID);
  });

})
