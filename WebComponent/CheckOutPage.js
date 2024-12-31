const { By, until } = require('selenium-webdriver');

class CheckOutPage {
    constructor(driver) {
        this.driver = driver;

        // Define selectors
        this.checkoutButton = By.id('checkout');
        this.firstNameInput = By.xpath("//input[@id='first-name']");
        this.lastNameInput = By.xpath("//input[@id='last-name']");
        this.postalCodeInput = By.xpath("//input[@id='postal-code']");
        this.continueButton = By.xpath("//input[@id='continue']");
        this.finishButton = By.xpath("//button[@id='finish']");
        this.errorMessage = By.css('.error-message-container');
    }

    async checkout(firstName, lastName, postalCode) {
        // Wait for the checkout button and click it
        const checkoutBtn = await this.driver.wait(until.elementLocated(this.checkoutButton), 10000);
        await this.driver.wait(until.elementIsVisible(checkoutBtn), 10000);
        await checkoutBtn.click();

        // Fill out the checkout form
        const firstNameInput = await this.driver.wait(
            until.elementLocated(By.xpath("//input[@id='first-name']")),
            10000
        );
        const lastNameInput = await this.driver.wait(
            until.elementLocated(By.xpath("//input[@id='last-name']")),
            10000
        );
        const postalCodeInput = await this.driver.wait(
            until.elementLocated(By.xpath("//input[@id='postal-code']")),
            10000
        );

        await firstNameInput.sendKeys(firstName);
        await lastNameInput.sendKeys(lastName);
        await postalCodeInput.sendKeys(postalCode);

        // Click the continue button
        const continueButton = await this.driver.wait(
            until.elementLocated(By.id('continue')),
            10000
        );
        await continueButton.click();

        // Finish the checkout
        await this.driver.wait(until.elementLocated(this.finishButton), 10000);
        await this.driver.findElement(this.finishButton).click();
    }

}

module.exports = CheckOutPage;