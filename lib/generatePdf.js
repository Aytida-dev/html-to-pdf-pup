const { getTab, removeTab } = require("./utils/browserTabsUtils")
const { dequeuePdf } = require("./utils/pdfQueueUtils")

const generatePdf = async (tab, htmlData) => {
    try {

        await tab.setContent(htmlData)

        const contentHeight = await tab.evaluate(() => {
            const body = document.body, html = document.documentElement;
            return Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
        });

        const pdfBuffer = await tab.pdf({
            width: '796px',
            height: `${contentHeight ?? 1000}px`,
            printBackground: true
        })


        return pdfBuffer

    } catch (error) {
        console.error('Error generating PDF:', error);
        throw error;
    }
}

module.exports = { generatePdf }