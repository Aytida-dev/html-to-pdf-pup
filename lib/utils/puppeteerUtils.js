const puppeteer = require("puppeteer")
const { getQueueLength } = require("./pdfQueueUtils")

let BROWSER = null
let LAUNCHING_BROWSER = false

const getBrowser = async () => {
    return BROWSER
}

const closeBrowser = async () => {
    if (!BROWSER) return

    // while (CLOSING_BROWSER) {

    //     await new Promise(resolve => setTimeout(resolve, 200))
    // }

    // if (!BROWSER) return

    const staleQueueLength = getQueueLength("stale")
    const workingQueueLength = getQueueLength("working")

    if (staleQueueLength + workingQueueLength > 0) {
        return
    }

    await closeInstance()
}

const startBrowser = async () => {
    if (BROWSER) return

    while (LAUNCHING_BROWSER) {
        await new Promise(resolve => setTimeout(resolve, 200))
    }

    if (!BROWSER) {
        await launchNewInstance()
        return
    }
}

const launchNewInstance = async () => {
    try {
        LAUNCHING_BROWSER = true

        const browser = await puppeteer.launch({
            args: ['--disable-gpu', '--disable-setuid-sandbox', '--no-sandbox', '--no-zygote'],
            headless: true,
            executablePath: "/usr/bin/chromium-browser",
        })

        console.log("Browser launched");

        BROWSER = browser
        LAUNCHING_BROWSER = false
    } catch (error) {
        console.error('Error launching new instance:', error);
        LAUNCHING_BROWSER = false
        throw error;

    }
}

const closeInstance = async () => {
    try {

        BROWSER.close()
        BROWSER = null
        console.log("Browser closed");
    } catch (error) {

        console.error('Error closing browser instance (force closing)', error);

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