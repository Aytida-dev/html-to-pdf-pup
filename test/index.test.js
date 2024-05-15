// const { htmlData } = require('./sampleHtml')
const { create_pdf, configure_module } = require('html-to-pdf-pup')
const { htmlData } = require('./sampleHtml.js')


describe('HTML to PDF Conversion', () => {
    it('should convert HTML to PDF', async () => {
        const pdfBuffer = await create_pdf(htmlData)
        expect(pdfBuffer).toBeDefined()
    })
})

describe('Check tab function', () => {
    //run the create_pdf 2 times at the same time to test the single tab functionality
    //capture console.logs to check status


    it('should convert HTML to PDF using two tabs', async () => {
        configure_module({
            DEV_MODE: true,
            // MAX_TABS: 1
        })

        const mockLog = jest.fn()
        console.log = mockLog

        const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms))
        const response = await Promise.all([create_pdf(htmlData), create_pdf(htmlData)])

        expect(response[0]).toBeDefined()
        expect(response[1]).toBeDefined()

        const newTabLaunchedLogs = mockLog.mock.calls.filter(args => args[0] === 'New Tab launched');
        expect(newTabLaunchedLogs.length).toBe(2);


    })

})