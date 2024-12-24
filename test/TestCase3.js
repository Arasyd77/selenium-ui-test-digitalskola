const { Builder } = require('selenium-webdriver');
const LoginPage = require('../WebComponent/LoginPage');
const DashboardPage = require('../WebComponent/DashboardPage');
const CartPage =require('../WebComponent/CartPage');
const assert = require('assert');
const fs = require('fs');
require('dotenv').config();

const browser = process.env.BROWSER;
const baseurl = process.env.BASE_URL;
const username = process.env.USER_NAME;
const password = process.env.PASSWORD;

const screenshotDir = './screenshots/';
if(!fs.existsSync(screenshotDir)){
    fs.mkdirSync(screenshotDir, {recursive: true});
}

describe('TestCase 3', function () {
    this.timeout(20000);
    let driver;

    switch(browser.toLowerCase()){
        case 'firefox':
            const firefox = require('selenium-webdriver/firefox');
            options = new firefox.Options();
            options.addArguments('--headless');
        case 'edge':
            const edge = require('selenium-webdriver/edge');
            options = new edge.Options();
            options.addArguments('--headless');
        case 'chrome':
        default:
            const chrome = require('selenium-webdriver/chrome');
            options = new chrome.Options();
            options.addArguments('--headless');
            break;
    }

    //Run setiap mulai test, satu kali saja paling awal
    before(async function (){
        driver = await new Builder().forBrowser(browser).setChromeOptions(options).build();
        const loginPage = new LoginPage(driver);
        await loginPage.navigate(baseurl);
        await loginPage.login(username, password);
    });

    //Test Suite dimulai dengan apa, setiap melakukan tes
    beforeEach(async function (){
        itemsToAdd = [
            'add-to-cart-sauce-labs-backpack',
            'add-to-cart-sauce-labs-bike-light',
            'add-to-cart-sauce-labs-bolt-t-shirt',
        ];
    });

    // Assertion atau validasi
    it('Validate items are added to cart', async function () {
        const cartpage = new CartPage(driver);
        await cartpage.addItemToCart(itemsToAdd);
        const cartItemCount = await cartpage.getCartItemCount();
        assert.strictEqual(cartItemCount, String(itemsToAdd.length), `Expected ${itemsToAdd.length} items in cart, but found ${cartItemCount}`);
    });
    
    it('Open cart and validate items', async function () {
        const cartpage = new CartPage(driver);
        await cartpage.openCart();
        const cartItems = await cartpage.getCartItems();
        assert.strictEqual(cartItems, itemsToAdd.length, `Expected ${itemsToAdd.length} items in cart, but found ${cartItems}`);
    });


    afterEach(async function () {
        const screenshot = await driver.takeScreenshot();
        const filepath = `${screenshotDir}${this.currentTest.title.replace(/\s+/g, '_')}_${Date.now()}.png`
        fs.writeFileSync(filepath, screenshot, 'base64');
    });

    after(async function (){
        await driver.quit();
    });
});