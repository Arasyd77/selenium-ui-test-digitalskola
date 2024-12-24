const { Builder, By, Key, until } = require('selenium-webdriver');

async function exampleTest() {
    // membuat koneksi dengan Browser Driver
    let driver = await new Builder().forBrowser('chrome').build();

    // Exception handling & conclusion
    try{
        // Buka url di browser
        await driver.get("https://www.google.com ");

        // mencari di search box
        let searchBox = await driver.findElement(By.name('q'))

        await searchBox.sendKeys("Hello World!", Key.RETURN);
        await driver.wait(until.elementLocated(By.id('result-stats')), 10000);

        let title = await driver.getTitle();
        console.log(`Page Title is: ${title}`);
    } finally{
        // Tutup browser
        await driver.quit();

    }
}

exampleTest();