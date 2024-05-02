const { pdfEvents } = require("../eventEmitter")

const pdfQueue = []

const enqueuePdf = (htmlData) => {
    pdfQueue.push(htmlData)

    pdfEvents.emit("HTML_ADDED")

}

const dequeuePdf = () => {
    if (pdfQueue.length > 0) {
        pdfQueue.shift()
        pdfEvents.emit("HTML_REMOVED_FROM_QUEUE")
    }
}

const getFirstHtmlData = () => {
    return pdfQueue[0]
}

const getQueueLength = () => {
    return pdfQueue.length
}

module.exports = {
    enqueuePdf, dequeuePdf, getFirstHtmlData, getQueueLength
}