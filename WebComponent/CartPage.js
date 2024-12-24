const { until } = require('selenium-webdriver');

class CartPage {
    constructor(driver) {
        this.driver = driver;
    }

    async addItemToCart(itemIds) {
        for (const itemId of itemIds) {
            const itemButton = await this.driver.findElement({ id: itemId });
            await itemButton.click();
        }
    }

    async getCartItemCount() {
        const cartBadge = await this.driver.findElement({ css: '.shopping_cart_badge' });
        return await cartBadge.getText();
    }

    async openCart() {
        const cartButton = await this.driver.findElement({ css: '.shopping_cart_link' });
        await cartButton.click();
    }

    async getCartItems() {
        const items = await this.driver.findElements({ css: '.cart_item' });
        return items.length;
    }
}

module.exports = CartPage;