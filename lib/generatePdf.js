const { launchNewTab, closeTabInstance } = require("./utils/browserTabsUtils")
const { dequeuePdf } = require("./utils/pdfQueueUtils")

const generatePdf = async (htmlData) => {
    try {
        const page = await launchNewTab()
        await page.setContent(htmlData)

        const contentHeight = await page.evaluate(() => {
            const body = document.body, html = document.documentElement;
            return Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
        });

        const pdfBuffer = await page.pdf({
            width: '796px',
            height: `${contentHeight ?? 1000}px`,
            printBackground: true
        })

        dequeuePdf()
        await closeTabInstance(page)
        return pdfBuffer

    } catch (error) {
        console.error('Error generating PDF:', error);
        throw error;
    }
}

module.exports = { generatePdf }