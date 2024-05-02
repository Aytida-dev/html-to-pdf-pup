const { generatePdf } = require("./lib/generatePdf")
const { pdfEvents } = require("./lib/eventEmitter")
const { enqueuePdf, getFirstHtmlData } = require("./lib/utils/pdfQueueUtils")

const { htmlData } = require("./testHtml")


pdfEvents.on("HTML_ADDED", async () => {
    const htmlData = getFirstHtmlData()
    await generatePdf(htmlData)
    console.log("PDF generated successfully")
})

enqueuePdf(htmlData)

setTimeout(() => {
    enqueuePdf(htmlData)
})

