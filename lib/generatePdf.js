const { getConfig } = require('./config')

const generatePdf = async (tab, htmlData) => {
    try {

        const { pdfConfig } = getConfig()
        await tab.setContent(htmlData)

        if (!pdfConfig.height) {

            const contentHeight = await tab.evaluate(() => {
                const body = document.body, html = document.documentElement;
                return Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
            });

            pdfConfig.height = `${contentHeight ?? 1000}px`
        }


        const pdfBuffer = await tab.pdf(pdfConfig)


        return pdfBuffer

    } catch (error) {
        console.error('Error generating PDF:', error);
        throw error;
    }
}

exports.generatePdf = generatePdf