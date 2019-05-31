/* tslint:disable file-name-casing */
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
            ["port", (req.headers.host as string).indexOf(":") >= 0 ? (req.headers.host as string).split(":")[1].split("/")[0] : "80"]
        ])
        return super.render(new Map([...autoVars].concat([...vars]))).split("\n").filter(it => it !== "").map(it => it.trim()).join("")
    }
}
