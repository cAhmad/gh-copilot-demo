import { test, expect } from '@playwright/test';

test.describe('Cart Management', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Wait for albums to load
    await page.waitForSelector('.album-card', { timeout: 10000 });
  });

  test('should display cart icon in header', async ({ page }) => {
    const cartIcon = page.locator('.cart-icon-btn');
    await expect(cartIcon).toBeVisible();
  });

  test('should not show cart badge when cart is empty', async ({ page }) => {
    const cartBadge = page.locator('.cart-badge');
    await expect(cartBadge).not.toBeVisible();
  });

  test('should add album to cart and update badge', async ({ page }) => {
    // Click the first "Add to Cart" button
    const addToCartButton = page.locator('.btn-primary').first();
    await addToCartButton.click();

    // Verify badge appears with count of 1
    const cartBadge = page.locator('.cart-badge');
    await expect(cartBadge).toBeVisible();
    await expect(cartBadge).toHaveText('1');
  });

  test('should add multiple albums to cart and update badge', async ({ page }) => {
    // Add three albums to cart
    const addToCartButtons = page.locator('.btn-primary');
    await addToCartButtons.nth(0).click();
    await addToCartButtons.nth(1).click();
    await addToCartButtons.nth(2).click();

    // Verify badge shows count of 3
    const cartBadge = page.locator('.cart-badge');
    await expect(cartBadge).toHaveText('3');
  });

  test('should open cart drawer when clicking cart icon', async ({ page }) => {
    // Add an album to cart first
    await page.locator('.btn-primary').first().click();

    // Click cart icon
    await page.locator('.cart-icon-btn').click();

    // Verify cart drawer is open
    const cartDrawer = page.locator('.cart-drawer--open');
    await expect(cartDrawer).toBeVisible();
    
    // Verify cart header is visible
    await expect(page.locator('.cart-header h2')).toContainText('Shopping Cart');
  });

  test('should display empty cart message when cart is empty', async ({ page }) => {
    // Open cart without adding any items
    await page.locator('.cart-icon-btn').click();

    // Verify empty cart message
    const emptyMessage = page.locator('.empty-cart p').first();
    await expect(emptyMessage).toContainText('Your cart is empty');
  });

  test('should display cart items with correct details', async ({ page }) => {
    // Add an album to cart
    await page.locator('.btn-primary').first().click();

    // Open cart
    await page.locator('.cart-icon-btn').click();

    // Verify cart item is displayed
    const cartItem = page.locator('.cart-item').first();
    await expect(cartItem).toBeVisible();

    // Verify cart item has image, title, artist, and price
    await expect(cartItem.locator('.cart-item-image')).toBeVisible();
    await expect(cartItem.locator('.cart-item-title')).not.toBeEmpty();
    await expect(cartItem.locator('.cart-item-artist')).not.toBeEmpty();
    await expect(cartItem.locator('.cart-item-price')).toContainText('$');
  });

  test('should calculate and display total price', async ({ page }) => {
    // Add two albums to cart
    await page.locator('.btn-primary').nth(0).click();
    await page.locator('.btn-primary').nth(1).click();

    // Open cart
    await page.locator('.cart-icon-btn').click();

    // Verify total is displayed
    const totalAmount = page.locator('.total-amount');
    await expect(totalAmount).toBeVisible();
    await expect(totalAmount).toContainText('$');
    
    // Total should be greater than 0
    const totalText = await totalAmount.textContent();
    const totalValue = parseFloat(totalText?.replace('$', '') || '0');
    expect(totalValue).toBeGreaterThan(0);
  });

  test('should remove item from cart', async ({ page }) => {
    // Add two albums to cart
    await page.locator('.btn-primary').nth(0).click();
    await page.locator('.btn-primary').nth(1).click();

    // Open cart
    await page.locator('.cart-icon-btn').click();

    // Verify we have 2 items
    let cartItems = page.locator('.cart-item');
    await expect(cartItems).toHaveCount(2);

    // Click remove button on first item
    await page.locator('.remove-btn').first().click();

    // Verify we now have 1 item
    cartItems = page.locator('.cart-item');
    await expect(cartItems).toHaveCount(1);

    // Verify badge is updated
    const cartBadge = page.locator('.cart-badge');
    await expect(cartBadge).toHaveText('1');
  });

  test('should remove all items and show empty cart message', async ({ page }) => {
    // Add one album to cart
    await page.locator('.btn-primary').first().click();

    // Open cart
    await page.locator('.cart-icon-btn').click();

    // Remove the item
    await page.locator('.remove-btn').first().click();

    // Verify empty cart message is shown
    const emptyMessage = page.locator('.empty-cart p').first();
    await expect(emptyMessage).toContainText('Your cart is empty');

    // Verify badge is not visible
    const cartBadge = page.locator('.cart-badge');
    await expect(cartBadge).not.toBeVisible();
  });

  test('should close cart drawer when clicking close button', async ({ page }) => {
    // Open cart
    await page.locator('.cart-icon-btn').click();

    // Verify drawer is open
    await expect(page.locator('.cart-drawer--open')).toBeVisible();

    // Click close button
    await page.locator('.close-btn').click();

    // Wait a moment for animation
    await page.waitForTimeout(500);

    // Verify drawer is closed
    await expect(page.locator('.cart-drawer--open')).not.toBeVisible();
  });

  test('should close cart drawer when clicking overlay', async ({ page }) => {
    // Add an item first
    await page.locator('.btn-primary').first().click();

    // Open cart
    await page.locator('.cart-icon-btn').click();

    // Verify drawer is open
    await expect(page.locator('.cart-drawer--open')).toBeVisible();

    // Click overlay
    await page.locator('.cart-overlay').click();

    // Wait a moment for animation
    await page.waitForTimeout(500);

    // Verify drawer is closed
    await expect(page.locator('.cart-drawer--open')).not.toBeVisible();
  });

  test('should display checkout button when cart has items', async ({ page }) => {
    // Add an album to cart
    await page.locator('.btn-primary').first().click();

    // Open cart
    await page.locator('.cart-icon-btn').click();

    // Verify checkout button is visible
    const checkoutButton = page.locator('.checkout-btn');
    await expect(checkoutButton).toBeVisible();
    await expect(checkoutButton).toContainText('Checkout');
  });
});
