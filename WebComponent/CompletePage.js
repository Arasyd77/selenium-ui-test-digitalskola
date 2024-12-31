const { By } = require('selenium-webdriver');

class CompletePage {
    constructor(driver){
        this.driver = driver;
    }

    async getCompleteMessage() {
        const completeMessageElement = await this.driver.findElement(
            By.css('.complete-header') 
        );
        return await completeMessageElement.getText();
    }

}

module.exports = CompletePage;