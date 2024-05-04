# html-to-pdf

> A package to convert html+css to pdf in node js.
> Features:-
>
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

## Installation

```sh
npm install html-to-pdf
```

## Usage

```js
const { create_pdf } = require("html-to-pdf");

let htmlData = "<html><body><h1>Hello World</h1></body></html>";

create_pdf(htmlData)
  .then((pdfBuffer) => {
    console.log(pdfBuffer);
  })
  .catch((err) => {
    console.log(err);
  });
```
