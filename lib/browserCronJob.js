// const { getConfig } = require("./config");
const { configure_module } = require("./config");
const { startBrowser, closeBrowser } = require("./utils/puppeteerUtils");

function scheduleBrowserActions(startTime, duration) {
    const now = new Date();
    const start = new Date(now);
    start.setHours(startTime.hour, startTime.minute, 0, 0);

    const startDelay = start.getTime() - now.getTime();
    if (startDelay <= 0) {

        startBrowser();

        configure_module({
            browserConfig: {
                alwaysKeepOpen: true
            }
        })
    } else {
        setTimeout(() => {
            startBrowser();

            configure_module({
                browserConfig: {
                    alwaysKeepOpen: true
                }
            })
        }, startDelay);
    }


    setTimeout(() => {
        configure_module({
            browserConfig: {
                alwaysKeepOpen: false
            }
        })

        closeBrowser();

    }, duration * 60 * 1000);
}

function startBrowserCronJob(browserStartTime, duration) {

    console.log("ran");
    scheduleBrowserActions(browserStartTime, duration);
    setInterval(() => {
        scheduleBrowserActions(browserStartTime, duration);
    }, 24 * 60 * 60 * 1000);
}

module.exports = { startBrowserCronJob };
