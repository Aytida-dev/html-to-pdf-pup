const { getBrowser, startBrowser, closeBrowser } = require("./puppeteerUtils")
const { getQueueLength, getFirstHtmlData } = require("./pdfQueueUtils")
const { pdfEvents } = require("../eventEmitter")

let TAB_COUNT = 0
let MAX_TABS = 1



const getTab = async () => {
    if (TAB_COUNT >= MAX_TABS) return null

    const tab = await launchNewTab()
    return tab
}

const removeTab = async (tab) => {
    const queueLength = getQueueLength()


    if (queueLength > 0) {
        const html = getFirstHtmlData()
        pdfEvents.emit("TAB_READY", tab, html)
        return
    }

    await closeTabInstance(tab)
}

const launchNewTab = async () => {
    try {

        TAB_COUNT++
        await startBrowser()
        const browser = await getBrowser()

        const tab = await browser.newPage()
        return tab
    } catch (error) {
        console.error('Error launching new tab:', error);
        TAB_COUNT--
        throw error;
    }
}

const closeTabInstance = async (tab) => {
    try {
        TAB_COUNT--
        await tab.close()

        closeBrowser()
    } catch (error) {
        console.error('Error closing tab instance (force closing)', error);
        if (tab && tab.process()) {
            tab.process().kill('SIGINT');
        }
    }
}

module.exports = {
    getTab, removeTab
}