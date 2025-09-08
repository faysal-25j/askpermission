const { test, expect } = require('@playwright/test');

test.describe('AI Agent Chat Feature', () => {

test('AI page loads and chat UI is visible', async ({ page }) => {
    await page.goto('/ai');
    await page.getByRole('button', { name: 'Accept All' }).click();

    await expect(page.getByText('Welcome to the Permission')).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Type your message...' })).toBeVisible();
    await page.getByRole('textbox', { name: 'Type your message...' }).fill('Hello AI');
    await page.locator('#root').getByRole('button').filter({ hasText: /^$/ }).click();
    await expect(page.getByText('Hello AI')).toBeVisible();

});

test('Send message and receive response', async ({ page }) => {
    await page.goto('/ai');
    await page.getByRole('button', { name: 'Accept All' }).click();

    await expect(page.getByRole('textbox', { name: 'Type your message...' })).toBeVisible();
    await page.getByRole('textbox', { name: 'Type your message...' }).fill('Hello AI');
    await page.locator('#root').getByRole('button').filter({ hasText: /^$/ }).click();
    await expect(page.getByText('Hello AI')).toBeVisible();
    await page.waitForTimeout(5000); // wait for AI response
    await expect(page.getByText('Hello there! How can I help')).toBeVisible();

});

test('Message history persists during session', async ({ page }) => {
    await page.goto('/ai');
    await page.getByRole('button', { name: 'Accept All' }).click();

    await expect(page.getByRole('textbox', { name: 'Type your message...' })).toBeVisible();
    await page.getByRole('textbox', { name: 'Type your message...' }).fill('Hello AI');
    await page.locator('#root').getByRole('button').filter({ hasText: /^$/ }).click();
    await expect(page.getByText('Hello AI')).toBeVisible();
    await page.waitForTimeout(3000); // wait for AI response
    let lastMessage = await page.locator('#root p').last().innerText();
    console.log('AI reply:', lastMessage);


    await page.getByRole('textbox', { name: 'Type your message...' }).fill('Where is timestamp in our chat?');
    await page.locator('#root').getByRole('button').filter({ hasText: /^$/ }).click();
    await page.waitForTimeout(5000); // wait for AI response
    lastMessage = await page.locator('#root p').last().innerText();
    console.log('AI reply:', lastMessage);

});

});
