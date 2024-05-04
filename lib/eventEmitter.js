const EventEmitter = require("node:events")
EventEmitter.captureRejections = true

const pdfEvents = new EventEmitter()

exports.pdfEvents = pdfEvents