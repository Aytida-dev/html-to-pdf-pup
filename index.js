const { generatePdf } = require("./lib/generatePdf")
const { pdfEvents } = require("./lib/eventEmitter")
const { enqueuePdf, getFirstHtmlData, dequeuePdf } = require("./lib/utils/pdfQueueUtils")

const { htmlData } = require("./testHtml")
const { getTab, removeTab } = require("./lib/utils/browserTabsUtils")


pdfEvents.on("HTML_ADDED", async () => {
    const tab = await getTab()
    const html = getFirstHtmlData()

    if (!tab) {
        return
    }

    pdfEvents.emit("TAB_READY", tab, html)
})

pdfEvents.on("TAB_READY", async (tab, html) => {
    const pdfBuffer = await generatePdf(tab, html)

    dequeuePdf()
    pdfEvents.emit("PDF_GENERATED", pdfBuffer)
    await removeTab(tab)
})

const pdfGeneration = async (htmlData) => {
    return new Promise((resolve, reject) => {
        enqueuePdf(htmlData)
        pdfEvents.once("PDF_GENERATED", (pdfBuffer) => {
            resolve(pdfBuffer)
        })
    })
}

setInterval(() => {
    pdfGeneration(htmlData).then((pdfBuffer) => {
        console.log("PDF Created and returned successfully");
    })
}, 1000);







