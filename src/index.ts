import * as fs from "fs"
import * as http from "http"
import * as path from "path"
import Database from "./Database"
import HttpObject from "./HttpObject"
import Page from "./Page"
import pages from "./pages"
import { extend, kebab2pascal, serverName, serverVersion } from "./util"

const port = process.argv.length > 2 && !isNaN(parseInt(process.argv[2], 10)) ? parseInt(process.argv[2], 10) : Math.round(1024 + Math.random() * 64511)

export const db = new Database("192.168.178.21")

http.createServer((req, res) => {
    // const sendPage = (status: number, statusMsg: string, response: HttpObject, additionalHeaders: http.OutgoingHttpHeaders = {}): void => {
    const sendPage = (response: HttpObject, config: {status?: number; statusMsg?: string; additionalHeaders?: http.OutgoingHttpHeaders} = {}): void => {
        if (!config.status) config.status = 200
        if (!config.statusMsg) config.statusMsg = "OK"
        if (!config.additionalHeaders) config.additionalHeaders = {}
        const out = response.render(new Map(), req)
        const standardHeaders: http.OutgoingHttpHeaders = {
            "Content-Length": out.length,
            "Content-Type": `${response.mimeType}; charset=UTF-8`,
            Server: `${kebab2pascal(serverName)}/${serverVersion}`,
            "X-Powered-By": `Node.js/${process.version}`
        }
        const headers = extend(standardHeaders, config.additionalHeaders as http.OutgoingHttpHeaders) as http.OutgoingHttpHeaders
        res.writeHead(config.status as number, config.statusMsg as string, headers)
        res.end(out)
    }

    const url = (req.url as string).split("?")[0]

    switch (url) {
        case "/": sendPage(pages.home); break
        case "/app.css": sendPage(new HttpObject(fs.readFileSync(path.resolve(__dirname, "../static/app.css"), "utf-8"), "text/css")); break
        case "/app.js": sendPage(new HttpObject(fs.readFileSync(path.resolve(__dirname, "../static/app.js"), "utf-8"), "application/javascript", false)); break
        default: sendPage(pages.notFound, {status: 404, statusMsg: "Not Found"})
    }
}).listen(port, () => console.log("Server listening on port %d\nhttp://127.0.0.1:%d", port, port))
