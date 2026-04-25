import {defineConfig, devices} from '@playwright/test';

const FRONTEND_URL = process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:5500';
const API_ORIGIN = process.env.PLAYWRIGHT_API_ORIGIN || 'http://localhost:5231';

export default defineConfig({
    // Look for test files in the "tests" directory, relative to this configuration file.
    testDir: 'tests/e2e',

    // Run all tests in parallel.
    fullyParallel: true,
    timeout: 30000,
    // Fail the build on CI if you accidentally left test.only in the source code.
    forbidOnly: !!process.env.CI,

    // Retry on CI only.
    retries: process.env.CI ? 2 : 0,

    // Opt out of parallel tests on CI.
    workers: process.env.CI ? 1 : undefined,

    // Reporter to use
    reporter: 'html',

    use: {
        // Base URL to use in actions like `await page.goto('/')`.
        baseURL: FRONTEND_URL,

        // Collect trace when retrying the failed test.
        trace: 'on-first-retry',
    },
    // Configure projects for major browsers.
    projects: [
        {
            name: 'chromium',
            use: {...devices['Desktop Chrome']},
        },
    ],
    // Run your local dev server before starting the tests.
    webServer: [
        {
            command: 'dotnet run --project ../Server/WebAPI --launch-profile http',
            url: `${API_ORIGIN}/swagger/index.html`,
            reuseExistingServer: true,
            timeout: 30000,
        },
        {
            command: 'npm run dev -- --host localhost',
            env: {
                ...process.env,
                VITE_API_BASE_URL: API_ORIGIN,
            },
            url: FRONTEND_URL,
            reuseExistingServer: true,
            timeout: 30000,
        },
    ],
});
