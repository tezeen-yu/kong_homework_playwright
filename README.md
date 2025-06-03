# kong_homework

Kong Homework e2e Automation

## Overview

This project provides end-to-end (E2E) automation tests for Kong Manager using Playwright and TypeScript. It is designed to help validate the functionality of Kong's UI.

## Prerequisites

- Node.js (v18 or higher recommended)
- npm (v9 or higher recommended)
- Docker (for running Kong services locally)
- Kong Gateway image (used in Docker Compose)

## Installation

1. Install dependencies:
   ```sh
   npm install
   ```

2. Install Playwright browsers:
   ```sh
   npx playwright install
   ```

## Project Structure

- `const/` - Constants used in tests
- `model/` - Page objects and models for UI automation
- `playwright/` - Playwright configuration and helpers
- `playwright-report/` - Playwright test reports
- `tests/` - Test cases (UI and API)
- `utils/` - Utility functions and setup scripts

## Scripts

- Run all tests:
  ```sh
  npm test
  ```

- Run E2E UI tests:
  ```sh
  npm run e2e
  ```

- Run API tests:
  ```sh
  npm run api
  ```

- Debug tests (run tests with @debug tag):
  ```sh
  npm run debug
  ```

## Usage

1. Ensure Kong Manager is running and accessible (* please copy kong_setup/docker-compose.yml under this project).
2. Run the desired test script as shown above.
3. View Playwright reports in the `playwright-report/` directory after test execution.

## Configuration

- Test configuration is in [`playwright.config.ts`](playwright.config.ts).
- TypeScript configuration is in [`tsconfig.json`](tsconfig.json).

## License

ISC

---

Author: Dan Yu <dandanyu1987@163.com> 