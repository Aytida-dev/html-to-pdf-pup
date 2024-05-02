const { pdfEvents } = require("../eventEmitter")

const pdfQueue = {
    working: [],
    stale: []

}

const enqueuePdf = (htmlData, key) => {
    pdfQueue[key].push(htmlData)

    if (key === "stale") {
        pdfEvents.emit("HTML_ADDED")
    }

}

const dequeuePdf = (key) => {
    if (pdfQueue[key].length > 0) {
        pdfQueue[key].shift()
    }
}

const getFirstHtmlData = (key) => {
    return pdfQueue[key][0]
}

const getQueueLength = (key) => {
    return pdfQueue[key].length
}

const renderHtmlWorking = () => {
    const data = pdfQueue["stale"].shift()
    pdfQueue["working"].push(data)
}

const renderHtmlStale = () => {
    const data = pdfQueue["working"].pop()
    pdfQueue["stale"].push(data)
}

module.exports = {
    enqueuePdf, dequeuePdf, getFirstHtmlData, getQueueLength, renderHtmlStale, renderHtmlWorking
}