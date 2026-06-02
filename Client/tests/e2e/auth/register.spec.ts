import {expect, test} from '@playwright/test';

test("user can register", async ({page}) => {
    const email = `test${Date.now()}@mail.com`;

    await page.goto("/registration");

    await page.getByLabel(/first name/i).fill('Carl');
    await page.getByLabel(/last name/i).fill('Jenkins');
    await page.getByLabel(/email/i).fill(email);

    await page.getByLabel('Password', {exact: true}).fill('@4Ripare');
    await page.getByLabel('Confirm Password').fill('@4Ripare');

    await page.getByRole('button', {name: /create account/i}).click();

    await expect(page).toHaveURL(/\/login$/);
});