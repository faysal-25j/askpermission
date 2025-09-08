// @ts-check
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
    workers: 1,

    testDir: './tests',
    use: {
    headless: false, // see browser for debugging
    baseURL: 'https://ask.permission.io',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
    }
});
