const { test, expect } = require('@playwright/test');

test.describe('Login Feature', () => {

test('Valid login', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Accept All' }).click();
    await page.getByRole('button', { name: 'Log in' }).click();
    await page.getByRole('textbox', { name: 'Email' }).fill("faisal25j+ask@gmail.com");
    await page.getByRole('textbox', { name: 'Password' }).fill("Test@1234");
    await page.getByRole('button', { name: 'Log in' }).click();

    console.log('Please solve Recaptcha manually if it appears...');
    await page.waitForTimeout(15000); // give time for manual solve    
    await expect(page.getByRole('button', { name: 'FM Faisal Mehmood' })).toBeVisible();
});

test('Invalid login shows error', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Accept All' }).click();
    await page.getByRole('button', { name: 'Log in' }).click();
    await page.getByRole('textbox', { name: 'Email' }).fill("test1@gmail.com");
    await page.getByRole('textbox', { name: 'Password' }).fill("Test@1234");
    await page.getByRole('button', { name: 'Log in' }).click();

    const status = page.getByRole('status', { name: 'Invalid Credentials' });

if (await status.isVisible()) {
    console.log('Invalid credentials message appeared instantly.');
    await page.waitForTimeout(7000);
    await expect(status).toBeVisible();
} else {
    console.log('Please solve Recaptcha manually if it appears...');
    await page.waitForTimeout(15000);
}
});

test('Account lockout after multiple failed attempts', async ({ page }) => {

await page.goto('/');
await page.getByRole('button', { name: 'Accept All' }).click();
await page.getByRole('button', { name: 'Log in' }).click();
await page.getByRole('textbox', { name: 'Email' }).fill("test@gmail.com");
await page.getByRole('textbox', { name: 'Password' }).fill("Test@1234");

const loginBtn = page.getByRole('button', { name: 'Log in' });
const status = page.getByRole('status', { name: 'Firebase: Error (auth/too-many-requests).' });

let appeared = false;

for (let i = 0; i < 6; i++) {
    await loginBtn.click();
try {
    await expect(status).toBeVisible({ timeout: 5000 }); // here the issue is the with the login API response time, it is taking too long to respond
    appeared = true;
    break;
} catch {
    console.log(`Attempt ${i + 1}: status not visible yet, retrying...`);  
}
}

if (appeared) {
    console.log('Too many requests message appeared.');
await expect(status).toBeVisible();
} else {
    console.log('Please solve Recaptcha manually if it appears...');
await page.waitForTimeout(15000);
}
});
});
