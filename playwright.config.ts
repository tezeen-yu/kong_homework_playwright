import { defineConfig } from '@playwright/test';

export default defineConfig({
  globalSetup: './utils/globalSetup.ts',
  globalTeardown: './utils/globalTeardown.ts',
  testDir: './tests',
  timeout: 180000,
  // workers: 2,
  // retries: 1,
  outputDir: './playwright/test-results',
  use: {
    headless: false,
    baseURL: 'http://localhost:8002/default/',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  reporter: [
    ['json', { outputFile: './playwright/test-results/test-result.json' }],
    ['junit', { outputFile: './playwright/test-results/junit_report.xml' }],
  ],
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
    {
      name: 'firefox',
      use: { browserName: 'firefox' },
    },
    {
      name: 'webkit',
      use: { browserName: 'webkit' },
    },
  ],
});
