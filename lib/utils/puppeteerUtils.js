const puppeteer = require("puppeteer")


let BROWSER = null

const getBrowser = async () => {
    return BROWSER
}

const closeBrowser = async () => {
    if (BROWSER) {
        await closeInstance()
    }

}

const startBrowser = async () => {
    if (!BROWSER) {
        await launchNewInstance()
    }
}

const launchNewInstance = async () => {
    try {
        const browser = await puppeteer.launch({
            args: ['--disable-gpu', '--disable-setuid-sandbox', '--no-sandbox', '--no-zygote'],
            headless: true
        })
        BROWSER = browser
    } catch (error) {
        console.error('Error launching new instance:', error);
        throw error;

    }
}

const closeInstance = async () => {
    try {
        await BROWSER.close()
        BROWSER = null
    } catch (error) {
        console.error('Error closing instance (force closing)', error);
        if (BROWSER && BROWSER.process()) {
            BROWSER.process().kill('SIGINT');
        }
    }

}


module.exports = {
    getBrowser,
    startBrowser,
    closeBrowser
}