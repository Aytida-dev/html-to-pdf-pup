const { getConfig } = require('../config')

const writeLogs = (location) => {
    const { DEV_MODE } = getConfig()

    if (!DEV_MODE) return

    switch (location) {
        case "B-LAUNCH":
            console.log("New Browser launched")
            break

        case "B-CLOSE":
            console.log("Browser closed")
            break

        case "T-LAUNCH":
            console.log("New Tab launched")
            break

        case "T-CLOSE":
            console.log("Tab closed")
            break

        case "T-READY":
            console.log("Old tab ready for new task")
            break

        case "PDF-GEN":
            console.log("PDF Generated")
            break

    }
}

module.exports = { writeLogs }