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
}

const getConfig = () => {
    return {
        MAX_TABS,
        puppeteerConfig,
        pdfConfig,
        DEV_MODE
    }
}

exports.configure_module = configure_module
exports.getConfig = getConfig
