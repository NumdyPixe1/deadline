import { Page, Locator } from 'playwright/test';

export class DeadlinePage {
    readonly page: Page;
    readonly startDateInput: Locator;
    readonly endDateInput: Locator;
    readonly calculateButton: Locator;
    readonly errorMessage: Locator;
    constructor(page: Page) {
        this.page = page;
        this.startDateInput = page.locator('#dateInput');
        this.endDateInput = page.locator('#endDateInput');
        this.calculateButton = page.locator('button:has-text("Calculate")');
        this.errorMessage = page.getByTestId('errorMsg');
    }

    async goto() {
        await this.page.goto('/deadline');
    }

}