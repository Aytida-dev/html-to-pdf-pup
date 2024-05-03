const EventEmitter = require("node:events")
EventEmitter.captureRejections = true

const pdfEvents = new EventEmitter()


module.exports = {
    pdfEvents
}