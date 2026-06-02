import {expect, test} from '@playwright/test';

const apiOrigin = import.meta.env.PLAYWRIGHT_API_ORIGIN || 'http://127.0.0.1:5231';
const apiUrl = `${apiOrigin}/api`;

test("user can login", async ({page, request}) => {
    const email = `test${Date.now()}@mail.com`;
    const response = await request.post(`${apiUrl}/sign-up`, {
        data: {
            email,
            password: '@4Ripare',
            confirmPassword: "@4Ripare",
            firstName: 'Carl',
            lastName: 'Jenkins',
            phoneNumber: "+1035676567"
        }
    });

    expect(response.ok()).toBeTruthy();

    await page.goto("/login");

    await page.getByLabel(/email/i).fill(email);
    await page.getByLabel('Password', {exact: true}).fill('@4Ripare');

    await page.getByRole('button', {name: /login/i}).click();

    await expect(page).toHaveURL(/\/dashboard$/);
    await expect(page.getByAltText(/spend tracker/i)).toBeVisible();
});
