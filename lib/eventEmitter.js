const EventEmitter = require("node:events")
EventEmitter.captureRejections = true

const pdfEvents = new EventEmitter()

pdfEvents.on("error", (error) => {
    console.error("Error in event:", error)
})

module.exports = {
    pdfEvents
}