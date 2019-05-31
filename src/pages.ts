import * as fs from "fs"
import * as path from "path"
import Page from "./Page"

export default class {
    public static readonly notFound: Page = new Page(fs.readFileSync(path.resolve(__dirname, "../static/notFound.hbs"), "utf-8"))
    public static readonly home: Page = new Page(fs.readFileSync(path.resolve(__dirname, "../static/index.hbs"), "utf-8"))
}
