const puppeteer = require("puppeteer");

module.exports.generateImage = async function() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://dbwebb.se/cal");
    await page.tap("iframe:nth-of-type(2)");
    await page.screenshot({ path: "calendar.png" });

    await browser.close();

    return;
};
