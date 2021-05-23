const cors = require("cors")
const puppeteer = require("puppeteer")


async function getVidio(URL) {
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    await page.goto('https://musicallydown.com/');
    await page.type('#link_url', `${URL}`);
    await page.waitForSelector('#submit-form > div > div:nth-child(2) > button');
    await page.click('#submit-form > div > div:nth-child(2) > button', { delay:300});
    await page.waitForSelector('#video');
    let poster = await page.$eval('#video', (element) => {
        return element.getAttribute("poster")
    });
    let mp4direct = await page.$eval('#index-banner > div > div:nth-child(2) > div.col.s12.l8.left-align > a:nth-child(6)', (element) => {
        return element.getAttribute("href");
    });
    return { poster, mp4direct }
}

app.get('/tiktok', async (req, res) =>{
    var URL = req.query.URL;
    const gets = await getVidio(URL);
    res.json(gets);
});
