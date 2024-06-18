# html-to-pdf-pup

[![NPM](https://nodei.co/npm/html-to-pdf-pup.png)](https://nodei.co/npm/html-to-pdf-pup/)

> A package to convert html+css to pdf in node js.

### Features:-
 
> 1. Highly scalable event driven system.
> 2. Can asynchronously convert multiple html to pdf using multiple tabs or can use same tab for queue pdf generation.
> 3. A message queue system to manage the conversion process.
> 4. A simple and easy to use API for begineers.
> 5. Comes with full config mode and a dev mode for advanced users.
> 6. User can configure the number of tabs to be used for conversion to suit their backend server.
> 7. Full control over the conversion process and pdf options in the config mode.
> 8. Uses puppeter under the hood for pdf conversion.
> 9. Returns a pdf buffer .
> 10. Use dynamic height for pdfs by default.
> 11. Have a built in cron job to make browser open in hotspots of your api.

### Optimizations techniques used:-

> 1. Uses a message queue system to manage the conversion process.
> 2. Only a single browser is opened no matter what.
> 3. Browser only closes itself when all requests are done.
> 4. Multiple tabs opens for concurrent pdf conversion.
> 5. If a tab has done pdf conversion then it starts processing another request and only closes itself when all requests are done.
> 6. Tight integration of max tab system and single broswer for better resource management.
> 7. Full control of api in hands of user with build in cron jobs

## Installation

```sh
npm i html-to-pdf-pup
```

## Usage

### Basic usage

```js
const { create_pdf } = require("html-to-pdf-pup");

let htmlData = "<html><body><h1>Hello World</h1></body></html>";

create_pdf(htmlData)
  .then((pdfBuffer) => {
    console.log(pdfBuffer);
  })
  .catch((err) => {
    console.log(err);
  });
```

### Config Mode

> It also have a config mode to configure the puppeter , pdf , and the conversion process.

```js
const { create_pdf, configure_module } = require("html-to-pdf-pup");

configure_module({
  DEV_MODE: true,

  MAX_TABS: 5,

  puppeteerConfig: {
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  },

  pdfConfig: {
    format: "A4",
    printBackground: true,
  },
});

let htmlData = "<html><body><h1>Hello World</h1></body></html>";

create_pdf(htmlData)
  .then((pdfBuffer) => {
    console.log(pdfBuffer);
  })
  .catch((err) => {
    console.log(err);
  });
```

### configure_module takes an object with the following keys:-

1. DEV_MODE: boolean

   ```js
   //Default value
   DEV_MODE: false;
   ```

   > If true , then whole steps will be console logged showing the conversion process.

2. MAX_TABS: number (default: 2)

   > It controls the maximum number of tabs that are allowed to open for pdf conversion. Increasing this will increase the async conversion speed as more pdf will convert simultaneously but it will also increase the resource usage.

   > User can adjust it according to their server resources.

3. pdfConfig: object

   ```js
   //Default values
   pdfConfig : {
       printBackground: true ,
       width:'796px',
       height: (dynamic height according to html content)
   }
   ```

   > It is the pdf options that are passed to the puppeter pdf function.

   > Refer here for all the options [Pdf options](https://pptr.dev/api/puppeteer.pdfoptions)

4. puppeteerConfig: object

   ```js
   //Default values
   puppeteerConfig : {
       headless: true,
       args: [
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
       ],
   }

   ```

   > It is the puppeteer options that are passed to the puppeter launch function.

   > Refer here for all the options [puppeteer launch options](https://pptr.dev/api/puppeteer.launchoptions) , [puppeteer chrome specific options](https://pptr.dev/api/puppeteer.browserlaunchargumentoptions)

5. browserConfig: object

   ```js
   //Default values
   browserConfig : {
       coolDownTime:0,
       alwaysKeepOpen:false,
   }
   ```

   > coolDownTime : It is the time in milliseconds that the browser will wait before closing itself after all the requests are done.

   > alwaysKeepOpen : If true then the browser will never close itself and will always be open.

6. cronConfig = object

   ```js
   //Default values
   cronConfig : {
       browserStartTime : null,
       duration : null,
   }
   ```

   > browserStartTime : It is a object with keys hour and minute to set the time at which the browser will open itself. e.g {hour: 13 , minute: 30} will open the browser at 1:30 PM.

   > duration : It is the time in minutes after which the browser will close itself after opening , it should be atleast 30 minutes.

## Note

> if you are using your own chromium then pass the executable path to puppeteer config and set PUPPETEER_SKIP_DOWNLOAD=true as env to skip chromium download by puppeteer. Refer this for more info [here](https://pptr.dev/troubleshooting#running-puppeteer-in-docker)
