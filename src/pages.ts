import Page from "./Page"

export default class {
    public static readonly notFound: Page = new Page(`
        <!DOCTYPE html>
        <html>
            <head>
                <title>Not Found</title>
            </head>
            <body>
                <h1>Not Found</h1>
                <p>The requested url {{path}} could not be found on this server</p>
                <hr>
                <address>{{server}} Version {{serverVersion}} on port {{port}}</address>
            </body>
        </html>
    `)
    public static readonly home: Page = new Page(`
        <!DOCTYPE html>
        <html>
            <head>
                <title>Home</title>
            </head>
            <body>
                <h1>Hello World</h1>
            </body>
        </html>
    `)
}
