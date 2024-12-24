const { Builder, By, Key, until, LogInspector } = require('selenium-webdriver');
const assert = require('assert');

async function sauceDemoLoginTest(){
    // membuat koneksi dengan Browser Driver
    let driver = await new Builder().forBrowser('chrome').build();

    try{
        // Buka url di browser
        await driver.get("https://www.saucedemo.com");

        // Masukkan username dan password
        await driver.findElement(By.id('user-name')).sendKeys('standard_user');
        await driver.findElement(By.xpath("//input[@id='password']")).sendKeys('secret_sauce');

        // click button Login
        await driver.findElement(By.xpath("//input[@id='login-button']")).click();

        // Memastikan di halaman dashboard terdapat judul "Swag Labs"
        let titleText = await driver.findElement(By.xpath("//div[@class='app_logo']")).getText();
        assert.strictEqual(titleText.includes('Swag Labs'), true, "Title does not include 'Swag Labs'");

        // Memastikan di halaman dashboard terdapat button burger
        let menuButton = await driver.findElement(By.xpath("//button[@id='react-burger-menu-btn']"));
        assert.strictEqual(await menuButton.isDisplayed(), true, "Menu button not is visible");

        // click button Add To Cart
        const items = [
            'add-to-cart-sauce-labs-backpack',
            'add-to-cart-sauce-labs-bike-light',
            'add-to-cart-sauce-labs-bolt-t-shirt'
        ];

        for (const item of items) {
            await driver.findElement(By.id(item)).click();
        }

        // Memastikan item sukses ditambahkan ke cart
        let cartBadge = await driver.findElement(By.xpath("//span[@class='shopping_cart_badge']"));
        let itemCount = await cartBadge.getText();
        assert.strictEqual(itemCount, String(items.length), `Expected ${items.length} items, but found ${itemCount}`);

        console.log("Test Passed: Items successfully added to cart.");

    } catch (error) {
        console.error("Test Failed:", error.message);

    } finally {
        // Tutup browser
        await driver.quit();
    }

}

sauceDemoLoginTest();