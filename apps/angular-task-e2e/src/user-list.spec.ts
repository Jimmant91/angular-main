import { test, expect } from '@playwright/test';

test.describe('User List', () => {

    test.beforeEach(async ({ page }) => {

        await page.goto('/');
        // Wait for a specific element that indicates the page is loaded
        await page.waitForSelector('p-card', { state: 'visible' });

    });

    test('should display user cards', async ({ page }) => {

        const userCards = page.locator('p-card');
        await expect(userCards).toHaveCount(10);

    });

    test('should navigate to user profile', async ({ page }) => {

        const firstViewProfileButton = page.locator('p-button:has-text("View Profile")').first();

        await firstViewProfileButton.click();

        // Wait for the URL to change
        await page.waitForURL(/\/users\/\d+/);

        // Check if the profile page has loaded
        await expect(page.locator('h2')).toBeVisible();

    });

    // Below, I'm attempting to find how the favorite buttons are being activated
    // as it was causing me some trouble with testing.

    test('should find favorite buttons', async ({ page }) => {

        // Log the page content
        const content = await page.content();
        console.log('Page content:', content);

        // Check for any buttons
        const allButtons = page.locator('button');
        const buttonCount = await allButtons.count();
        console.log('Total button count:', buttonCount);

        // Log details of each button
        for (let i = 0; i < buttonCount; i++) {

            const button = allButtons.nth(i);
            const text = await button.textContent();
            const classes = await button.getAttribute('class');
            console.log(`Button ${i + 1}: Text = "${text}", Classes = "${classes}"`);

        }

        // Try to find favorite buttons using different selectors
        const starButtons = page.locator('button:has-text("star")');
        const starButtonCount = await starButtons.count();
        console.log('Star button count:', starButtonCount);

        const iconButtons = page.locator('button .pi-star, button .pi-star-fill');
        const iconButtonCount = await iconButtons.count();
        console.log('Icon button count:', iconButtonCount);

        // Assert that we found at least one button that could be a favorite button
        expect(starButtonCount + iconButtonCount).toBeGreaterThan(0);

    });

});
