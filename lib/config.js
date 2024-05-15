let args = [
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--disable-dev-shm-usage',
    '--disable-accelerated-2d-canvas',
    '--no-first-run',
    '--no-zygote',
    '--disable-gpu',
    '--disable-infobars',
    '--hide-scrollbars',
    '--disable-notifications',
    '--disable-extensions',
    '--disable-web-security',
    '--disable-background-networking',
    '--disable-default-apps',
    '--disable-translate',
    '--disable-sync',
    '--disable-logging',
    '--disable-background-timer-throttling',
    '--disable-client-side-phishing-detection',
    '--disable-popup-blocking',
    '--disable-component-extensions-with-background-pages',
    '--metrics-recording-only',
    '--ignore-certificate-errors',
    '--proxy-server="direct://"',
    '--proxy-bypass-list=*'
]

let MAX_TABS = 2

let puppeteerConfig = {
    headless: true,
    args: args,
    // executablePath: "/usr/bin/chromium-browser",
}

let pdfConfig = {
    width: "796px",
    printBackground: true
}

let browserConfig = {
    coolDownTime: 0,
    alwaysKeepOpen: false,
}

let cronConfig = {
    // browserStartTime: {
    //     hour: 0,
    //     minute: 0
    // },
    // duration: <minutes>

    browserStartTime: null,
    duration: null

}

let DEV_MODE = false

const configure_module = (config) => {

    if (!config || typeof config !== "object") return

    if (config.MAX_TABS && typeof config.MAX_TABS === "number" && config.MAX_TABS > 0) {
        MAX_TABS = config.MAX_TABS
    }

    if (config.puppeteerConfig && typeof config.puppeteerConfig === "object") {
        puppeteerConfig = config.puppeteerConfig

        if (!puppeteerConfig.args) {
            puppeteerConfig.args = args
        }

        if (!puppeteerConfig.headless) {
            puppeteerConfig.headless = true
        }
    }

    if (config.pdfConfig && typeof config.pdfConfig === "object") {
        pdfConfig = config.pdfConfig

        if (!pdfConfig.width) {
            pdfConfig.width = "796px"
        }

        if (!pdfConfig.printBackground) {
            pdfConfig.printBackground = true
        }
    }

    if (config.DEV_MODE && typeof config.DEV_MODE === "boolean") {
        DEV_MODE = config.DEV_MODE
    }

    if (config.browserConfig && typeof config.browserConfig === "object") {
        browserConfig = config.browserConfig

        if (typeof browserConfig.coolDownTime !== "number" || browserConfig.coolDownTime < 0) {
            browserConfig.coolDownTime = 0
        }

        if (typeof browserConfig.alwaysKeepOpen !== "boolean") {
            browserConfig.alwaysKeepOpen = false
        }
    }

    if (config.cronConfig && typeof config.cronConfig === "object") {
        const { browserStartTime, duration } = config.cronConfig;

        if (duration > 24 * 60) {
            console.log("Cron Error: Duration cannot be more than 24 hours");
            return
        }

        if (duration < 30) {
            console.log("Cron Error: Duration cannot be less than 30 minutes");
            return
        }

        if (browserStartTime && typeof browserStartTime === "object" && browserStartTime.hour >= 0 && browserStartTime.hour <= 23 && browserStartTime.minute >= 0 && browserStartTime.minute <= 59) {
            cronConfig.browserStartTime = browserStartTime
        }


        if (duration && typeof duration === "number" && duration > 30) {
            cronConfig.duration = duration
        }

        if (cronConfig.duration && cronConfig.browserStartTime) {
            const { startBrowserCronJob } = require("./browserCronJob")

            browserConfig = {
                alwaysKeepOpen: false,
                coolDownTime: 0
            }

            startBrowserCronJob(cronConfig.browserStartTime, cronConfig.duration)
        }
    }


}

const getConfig = () => {
    return {
        MAX_TABS,
        puppeteerConfig,
        pdfConfig,
        DEV_MODE,
        browserConfig,
        cronConfig
    }
}

exports.configure_module = configure_module
exports.getConfig = getConfig
