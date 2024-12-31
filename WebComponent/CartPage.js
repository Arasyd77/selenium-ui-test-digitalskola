const { By, until } = require('selenium-webdriver');

class CartPage {
    constructor(driver) {
        this.driver = driver;
    }

    async addItemToCart(itemIds) {
        for (const itemId of itemIds) {
            const itemButton = await this.driver.wait(
                until.elementLocated({ id: itemId }),
                15000,
                `Button with ID ${itemId} not found`
            );
            await itemButton.click();
        }
    }

    async getCartItemCount() {
        try {
            const cartBadge = await this.driver.wait(
                until.elementLocated({ css: '.shopping_cart_badge' }),
                5000
            );
            return await cartBadge.getText();
        } catch (error) {
            return '0';
        }
    }

    async openCart() {
        const cartButton = await this.driver.wait(
            until.elementLocated({ css: '.shopping_cart_link' }),
            5000,
            'Cart button not found'
        );
        await cartButton.click();
    }

    async getCartItems() {
        await this.driver.wait(until.elementsLocated(By.css('.cart_item')), 15000);
        const items = await this.driver.findElements(By.css('.cart_item'));
        const itemNames = [];
        for (const item of items) {
            const itemName = await item.findElement(By.css('.inventory_item_name')).getText();
            itemNames.push(itemName);
        }
        return itemNames;
    }

    async proceedToCheckout() {
        const checkoutButton = await this.driver.wait(
            until.elementLocated(By.xpath("//button[@id='checkout']")),
            5000,
            'Checkout button not found'
        );
        await checkoutButton.click();
    }
}

module.exports = CartPage;