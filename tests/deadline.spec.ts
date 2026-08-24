/*npx playwright test*/
import { test, expect } from '@playwright/test';

test.describe('Deadline Calculator', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/deadline');
    })

    test('Case 1: Add a new deadline', async ({ page }) => {
        await page.locator('#dateInput').fill('2026-08-15');

        await page.locator('#endDateInput').fill('2026-08-20');

        await page.click('button:has-text("Calculate")');

        const result = await page.getByTestId('result');
        const resultDate = 5;
        await expect(result).toContainText(`${resultDate} days`);
    });

    test('Case 2: Show error when inputs are empty', async ({ page }) => {
        await page.click('button:has-text("Calculate")');
        const resultError = await page.getByTestId('errorMsg');
        await expect(resultError).toContainText("Please enter both start and end dates.");
    });
})

