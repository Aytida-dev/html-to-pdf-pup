const { pdfEvents } = require("./lib/eventEmitter")
const { enqueuePdf } = require("./lib/utils/pdfQueueUtils")
const { configure_module } = require("./lib/config")

require("./lib/pdfEvents")

const create_pdf = async (htmlData) => {
    return new Promise((resolve, reject) => {
        enqueuePdf(htmlData, "stale")
        pdfEvents.once("PDF_GENERATED", (pdfBuffer) => {
            if (pdfBuffer) {
                resolve(pdfBuffer)
            }
            else {
                reject("Error in creating PDF")
            }
        })
    })
}

module.exports = { create_pdf, configure_module }

// node -e "console.log(require('puppeteer').executablePath())"  













