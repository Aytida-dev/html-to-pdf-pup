const { pdfEvents } = require('./eventEmitter');
const { generatePdf } = require('./generatePdf');
const { getTab, removeTab } = require('./utils/browserTabsUtils');
const { writeLogs } = require('./utils/loggingUtils');
const { getFirstHtmlData, renderHtmlWorking, renderHtmlStale, dequeuePdf } = require('./utils/pdfQueueUtils');

pdfEvents.on("HTML_ADDED", async () => {
    const html = getFirstHtmlData("stale")
    renderHtmlWorking()

    const tab = await getTab()

    if (!tab) {
        renderHtmlStale()
        return
    }

    pdfEvents.emit("TAB_READY", tab, html)
})

pdfEvents.on("TAB_READY", async (tab, html) => {
    const pdfBuffer = await generatePdf(tab, html)

    writeLogs("PDF-GEN")

    dequeuePdf("working")
    pdfEvents.emit("PDF_GENERATED", pdfBuffer)
    await removeTab(tab)
})

pdfEvents.on("error", (error) => {
    console.error("Error in event:", error)
})