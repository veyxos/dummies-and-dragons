import * as http from "http"
import Database from "./Database"
import Page from "./Page"
import pages from "./pages"
import { extend, kebab2pascal, serverName, serverVersion } from "./util"

const port = process.argv.length > 2 && !isNaN(parseInt(process.argv[2], 10)) ? parseInt(process.argv[2], 10) : Math.round(1024 + Math.random() * 64511)

export const db = new Database("192.168.178.21")

http.createServer((req, res) => {
    const sendPage = (status: number, statusMsg: string, page: Page, additionalHeaders: http.OutgoingHttpHeaders = {}): void => {
        const standardHeaders: http.OutgoingHttpHeaders = {
            "Content-Type": `${page.mimeType}; charset=UTF-8`,
            Server: `${kebab2pascal(serverName)}/${serverVersion}`,
            "X-Powered-By": `Node.js/${process.version}`
        }
        const headers = extend(standardHeaders, additionalHeaders) as http.OutgoingHttpHeaders
        res.writeHead(status, statusMsg, headers)
        res.end(page.render(new Map(), req))
    }
    const path = (req.url as string).split("?")[0]

    switch (path) {
        case "/": sendPage(200, "OK", pages.home); break
        default: sendPage(404, "Not Found", pages.notFound)
    }
}).listen(port, () => console.log("Server listening on port %d\nhttp://127.0.0.1:%d", port, port))
