const { Builder, By, until } = require('selenium-webdriver');
const LoginPage = require('../WebComponent/LoginPage');
const CartPage =require('../WebComponent/CartPage');
const CheckOutPage =require('../WebComponent/CheckOutPage');
const CompletePage =require('../WebComponent/CompletePage');
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

describe('TestCase 4', function () {
    this.timeout(40000);
    let driver;
    let cartpage;
    let checkoutPage;
    let itemsToAdd = [];

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
        cartpage = new CartPage(driver);
        checkoutPage = new CheckOutPage(driver)
    });

    //Test Suite dimulai dengan apa, setiap melakukan tes
    beforeEach(async function () {
        itemsToAdd = [
            'add-to-cart-sauce-labs-backpack',
            'add-to-cart-sauce-labs-bike-light',
            'add-to-cart-sauce-labs-bolt-t-shirt',
        ];

        await cartpage.openCart();
        await checkoutPage.checkout('SQA', 'DigitalSkola', '12345');
    });

    it('Checkout successfully and verify complete', async function () {
        const completepage = new CompletePage(driver);
        const title = await completepage.getCompleteMessage();
        assert.strictEqual(title, 'Thank you for your order!', 'Expected complete title to be "Thank you for your order!"');
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