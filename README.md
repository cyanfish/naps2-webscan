# NAPS2.WebScan

NAPS2.WebScan contains sample code for scanning from a web browser in JavaScript/TypeScript using [NAPS2.Sdk](https://www.naps2.com/sdk).

## How does this work?

Consider a corporate network with an intranet site we want to add scanning capabilities to. Users will scan using a 
scanner attached to their local machine and then upload it to the intranet server. 

- `NAPS2.WebScan.LocalService` is a Windows Service we would install on every client machine. It shares scanning devices attached to the local machine using ESCL, which is a [standard](https://mopria.org/mopria-escl-specification) HTTP protocol the browser can connect to.
- `NAPS2.WebScan.WebServer` is an example web server with JS/TS client code for scanning (in practice you would integrate the code with your existing server).

Note that while the sample service code is designed for Windows, the concept can easily be extended cross-platform.

## How do I build the JS/TS code?

- `cd NAPS2.WebScan.WebServer`
- `npm install`
- `vite build`

## Where's the interesting code?

- [Worker.cs](https://github.com/cyanfish/naps2-webscan/blob/master/NAPS2.WebScan.LocalService/Worker.cs) - Setting up the scanner-sharing server
- [site.ts](https://github.com/cyanfish/naps2-webscan/blob/master/NAPS2.WebScan.WebServer/wwwroot/js/site.ts) - Scanning from JavaScript/TypeScript
- [escl-sdk-ts](https://github.com/cyanfish/naps2-webscan/tree/master/NAPS2.WebScan.WebServer/wwwroot/lib/escl-sdk-ts) - Lightly modified version of the [escl-sdk-ts](https://www.npmjs.com/package/escl-sdk-ts) package used for the client

## How do I set option X for scanning?

Have a look at [IScanSettingParams](https://github.com/cyanfish/naps2-webscan/blob/4571e9c917edcc053f89aaeba047725529fdc7bf/NAPS2.WebScan.WebServer/wwwroot/lib/escl-sdk-ts/types/scanner.d.ts#L54) and the whole [types folder](https://github.com/cyanfish/naps2-webscan/tree/master/NAPS2.WebScan.WebServer/wwwroot/lib/escl-sdk-ts/types) for the type definitions. The [ESCL spec](https://mopria.org/mopria-escl-specification) may also be helpful.

## How do I scan multiple pages from a feeder?

Keep calling `NextDocument` until it errors with a 404.

## Still having trouble?

Feel free to create [an issue](https://github.com/cyanfish/naps2-webscan/issues).