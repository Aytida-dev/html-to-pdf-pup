const puppeteer = require("puppeteer")
const { getQueueLength } = require("./pdfQueueUtils")
const { getConfig } = require("../config")
const { writeLogs } = require("./loggingUtils")

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
        const { puppeteerConfig } = getConfig()

        const browser = await puppeteer.launch(puppeteerConfig)

        writeLogs("B-LAUNCH")

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

        writeLogs("B-CLOSE")

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