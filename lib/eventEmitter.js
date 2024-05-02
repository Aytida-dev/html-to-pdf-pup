const EventEmitter = require("node:events")
EventEmitter.captureRejections = true

const pdfEvents = new EventEmitter()

pdfEvents.on("test", async (a, b) => {
    console.log("Test event fired with args:", a, b);
})

pdfEvents.on("error", (error) => {
    console.error("Error in event:", error)
})

module.exports = {
    pdfEvents
}