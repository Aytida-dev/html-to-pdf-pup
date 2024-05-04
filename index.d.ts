declare function create_pdf(html: string): Buffer | null;
export { create_pdf };

declare function configure_module(options: ConfigureOptions): void;
export { configure_module };

interface ConfigureOptions {
  DEV_MODE?: boolean;

  pdfConfig?: PdfConfig;
  puppeteerConfig?: PuppeteerConfig;
}

interface PdfConfig {
  displayHeaderFooter?: boolean;
  headerTemplate?: string;
  footerTemplate?: string;
  format?: PdfFormat;
  height?: string | number;
  width?: string | number;
  landscape?: boolean;
  margin?: PdfMargin;
  omitBackground?: boolean;
  printBackground?: boolean;
  scale?: number;
  outline?: boolean;
  pageRanges?: string;
  path?: string;
  preferCSSPageSize?: boolean;
  tagged?: boolean;
  timeout?: number;
}

type PdfFormat =
  | "A0"
  | "A1"
  | "A2"
  | "A3"
  | "A4"
  | "A5"
  | "A6"
  | "Letter"
  | "Legal"
  | "Tabloid"
  | "Ledger";

interface PdfMargin {
  top?: string | number;
  right?: string | number;
  bottom?: string | number;
  left?: string | number;
}

interface PuppeteerConfig {
  channel?: "chrome" | "chrome-beta" | "chrome-dev" | "chrome-canary";
  dumpio?: boolean;
  env?: Record<string, string | undefined>;
  executablePath?: string;
  extraPrefsFirefox?: Record<string, unknown>;
  handleSIGINT?: boolean;
  handleSIGTERM?: boolean;
  handleSIGHUP?: boolean;
  ignoreDefaultArgs?: boolean | string[];
  pipe?: boolean;
  product?: "chrome" | "firefox";
  timeout?: number;
  waitForInitialPage?: boolean;

  args?: string[];
  debuggingPort?: number;
  devtools?: boolean;
  headless?: boolean | "shell";
  userDataDir?: string;
}
