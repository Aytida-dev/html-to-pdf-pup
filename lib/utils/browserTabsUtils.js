const { getBrowser, startBrowser, closeBrowser } = require("./puppeteerUtils")
const { getQueueLength, getFirstHtmlData, renderHtmlWorking } = require("./pdfQueueUtils")
const { pdfEvents } = require("../eventEmitter")
const { getConfig } = require("../config")
const { writeLogs } = require("./loggingUtils")

let TAB_COUNT = 0

const getTab = async () => {
    const { MAX_TABS } = getConfig()

    if (TAB_COUNT >= MAX_TABS) return null


    const tab = await launchNewTab()
    return tab
}

const removeTab = async (tab) => {
    const queueLength = getQueueLength("stale")


    if (queueLength > 0) {
        const html = getFirstHtmlData("stale")
        renderHtmlWorking()

        pdfEvents.emit("TAB_READY", tab, html)
        writeLogs("T-READY")
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

        writeLogs("T-LAUNCH")

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

        writeLogs("T-CLOSE")

        const { coolDownTime, alwaysKeepOpen } = getConfig().browserConfig

        if (alwaysKeepOpen) return

        setTimeout(() => {
            closeBrowser()
        }, coolDownTime ?? 0)

    } catch (error) {
        console.error('Error closing tab instance (force closing)', error);
        if (tab && tab.process()) {
            tab.process().kill('SIGINT');
        }
    }
}

exports.getTab = getTab
exports.removeTab = removeTab