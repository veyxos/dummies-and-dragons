/* tslint:disable file-name-casing */
import * as fs from "fs"
import * as path from "path"
import { kebab2pascal, serverName, serverVersion } from "./util"

const globalVars = new Map<string, string>([
    ["nodeVersion", process.version],
    ["date", new Date().toISOString()],
    ["server", kebab2pascal(serverName)],
    ["serverVersion", serverVersion]
])

export default class HttpObject {
    public readonly src: string
    public readonly mimeType: string

    constructor(src: string, mimeType: string) {
        this.src = src
        this.mimeType = mimeType
    }

    public render(vars: Map<string, string>, ...idontuseanyofthis: any[]): string { // tslint:disable-line no-any
        let out = this.src // tslint:disable-line prefer-const
        new Map([...globalVars].concat([...vars])).forEach((val, key) => out = out.replace(new RegExp(`\{\{${key}\}\}`, "g"), val))
        return out
    }
}
