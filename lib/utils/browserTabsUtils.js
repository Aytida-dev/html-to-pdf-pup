const { getBrowser, startBrowser } = require("./puppeteerUtils")

const launchNewTab = async () => {
    try {
        await startBrowser()
        const browser = await getBrowser()

        const page = await browser.newPage()
        return page
    } catch (error) {
        console.error('Error launching new tab:', error);
        throw error;
    }
}

const closeTabInstance = async (page) => {
    try {
        await page.close()
        const browser = await getBrowser()
        await browser.close()
    } catch (error) {
        console.error('Error closing tab instance (force closing)', error);
        if (page && page.process()) {
            page.process().kill('SIGINT');
        }
    }
}

module.exports = {
    launchNewTab,
    closeTabInstance
}