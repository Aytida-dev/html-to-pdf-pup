const { pdfEvents } = require("./lib/eventEmitter")
const { enqueuePdf } = require("./lib/utils/pdfQueueUtils")
const { configure_module } = require("./lib/config")

// const { htmlData } = require("./testHtml")

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



//testing

// node -e "console.log(require('puppeteer').executablePath())"  
// let count = 0

// configure_module({
//     MAX_TABS: 1,
//     DEV_MODE: true,
// })

// while (count < 10) {
//     count++

//     // const randomTime = Math.floor(Math.random() * 1000)
//     // const wait = new Promise(resolve => setTimeout(resolve, randomTime))

//     // console.log("wait", randomTime);

//     // wait.then(() => {
//     //     //time the log with request initiated string
//     // })
//     create_pdf(htmlData).then((pdfBuffer) => {
//         // console.log("PDF Created and returned successfully")
//     }).catch((error) => {
//         console.error("Error in creating PDF:", error)
//     })
// }











