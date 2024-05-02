const { generatePdf } = require("./lib/generatePdf")
const { pdfEvents } = require("./lib/eventEmitter")
const { enqueuePdf, getFirstHtmlData, dequeuePdf, renderHtmlWorking, renderHtmlStale } = require("./lib/utils/pdfQueueUtils")

const { htmlData } = require("./testHtml")
const { getTab, removeTab } = require("./lib/utils/browserTabsUtils")


pdfEvents.on("HTML_ADDED", async () => {
    const html = getFirstHtmlData("stale")
    renderHtmlWorking()

    const tab = await getTab()

    if (!tab) {
        console.log("No tab available");
        renderHtmlStale()
        return
    }

    pdfEvents.emit("TAB_READY", tab, html)
})

pdfEvents.on("TAB_READY", async (tab, html) => {
    const pdfBuffer = await generatePdf(tab, html)

    dequeuePdf("working")
    console.log("PDF Generated");
    pdfEvents.emit("PDF_GENERATED", pdfBuffer)
    await removeTab(tab)
})

const pdfGeneration = async (htmlData) => {
    return new Promise((resolve, reject) => {
        enqueuePdf(htmlData, "stale")
        pdfEvents.once("PDF_GENERATED", (pdfBuffer) => {
            resolve(pdfBuffer)
        })
    })
}

let count = 0;

while (count < 1) {
    count++

    //await for a random number of time
    // const randomTime = Math.floor(Math.random() * 1000) + 1
    // const wait = new Promise(resolve => setTimeout(resolve, randomTime))

    // wait.then(() => {
    //     pdfGeneration(htmlData).then((pdfBuffer) => {
    //         // console.log("PDF Created and returned successfully")
    //     })
    // })

    pdfGeneration(htmlData).then((pdfBuffer) => {
        // console.log("PDF Created and returned successfully")
    })
}









