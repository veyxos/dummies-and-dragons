const pkg: PackageJson = require("../package.json") // tslint:disable-line

/**
 * Tranforms a kebab-styled string in a pascal-cased string
 * @param str kebab-cased string (i.e. "hello-world")
 * @returns pascal-cased string (i.e. "HelloWorld")
 */
export function kebab2pascal(str: string): string {
    const arr = str.split("-")
    const chars = arr.map(it => it.charAt(0).toUpperCase())
    return arr.map((it, id) => chars[id] + it.slice(1)).join("")
}

export function extend(obj: object, src: object): object {
    for (const key in src) {
        if (src.hasOwnProperty(key)) obj[key] = src[key]
    }
    return obj
}

export function rollTheDice(sides: number): number {
    return Math.round(Math.random() * --sides) + 1
}

export const serverVersion = pkg.version
export const serverName = pkg.name

interface PackageJson {
    name: string,
    version: string,
    description?: string,
    main: string,
    scripts?: {},
    repository?: { type: string; url: string },
    author?: string,
    license?: string,
    dependencies?: {},
    devDependencies?: {}
}
