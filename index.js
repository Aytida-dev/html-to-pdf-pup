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
    pdfEvents.emit("PDF_GENERATED", pdfBuffer)
    console.log("PDF Generated");
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

//testing

// node -e "console.log(require('puppeteer').executablePath())"  
let count = 0

while (count < 1) {
    count++

    // const randomTime = Math.floor(Math.random() * 1000)
    // const wait = new Promise(resolve => setTimeout(resolve, randomTime))

    // console.log("wait", randomTime);

    // wait.then(() => {
    //     //time the log with request initiated string
    // })
    pdfGeneration(htmlData).then((pdfBuffer) => {
        // console.log("PDF Created and returned successfully")
    })


}









