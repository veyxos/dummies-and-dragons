import { IncomingMessage } from "http"
import HttpObject from "./HttpObject"

export default class Page extends HttpObject {
    constructor(src: string) {
        super(src, "text/html")
    }

    public render(vars: Map<string, string>, req: IncomingMessage): string {
        const autoVars = new Map<string, string>([
            ["path", req.url as string],
            ["host", req.headers.host as string],
            ["port", (req.headers.host as string).indexOf(":") >= 0 ? (req.headers.host as string).split(":")[1].split("/")[0] : "80"],
            ["head", `<meta charset="UTF-8"><meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"><meta http-equiv="X-UA-Compatible" content="ie=edge"><link rel="stylesheet" href="/app.css"><script src="/app.js" async></script>`]
        ])
        return super.render(new Map(Array.from(autoVars).concat(Array.from(vars))))
    }
}
