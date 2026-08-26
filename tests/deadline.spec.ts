import { test, expect } from '@playwright/test';
import { DeadlinePage } from '../pages/deadlinePage';

test.describe('Deadline Calculator', () => {
    let deadlinePage: DeadlinePage;

    test.beforeEach(async ({ page }) => {
        deadlinePage = new DeadlinePage(page);
        await deadlinePage.goto();
    })

    test('TC-001: Add a new deadline correctly', async ({ page }) => {
        await deadlinePage.startDateInput.fill('2026-08-15');

        await deadlinePage.endDateInput.fill('2026-08-20');

        await deadlinePage.calculateButton.click();

        const result = await page.getByTestId('result');
        const resultDate = 5;
        await expect(result).toContainText(`${resultDate} days`);
    });

    test('TC-002: Show error when start date is after end date', async () => {
        await deadlinePage.startDateInput.fill('2026-08-15');
        await deadlinePage.endDateInput.fill('2026-08-01');
        await deadlinePage.calculateButton.click();
        await expect(deadlinePage.errorMessage).toContainText("Start date cannot be after end date!");
    });

    test('TC-003: Show error when inputs are empty', async () => {
        await deadlinePage.calculateButton.click();
        await expect(deadlinePage.errorMessage).toContainText("Please enter both start and end dates!");
    });
})

