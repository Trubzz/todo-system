import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  outputDir: './output/trace',
  fullyParallel: true,
  workers: 1,
  reporter: [
    ['html',
      {
        outputFolder: './output/reports',
        open: 'never'
      }
    ],
    ['list']
  ],

   use: {
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    headless: true,
  },
  //timeout: 30 * 1000,
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],
});
