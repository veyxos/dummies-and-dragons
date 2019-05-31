import * as mysql from "mysql"

export default class Database {
    private readonly connection: mysql.Connection
    private readonly login: {user: string; password: string, host?: string} = {
        password: "password",
        user: "dungeonmaster"
    }

    constructor(host: string = "127.0.0.1") {
        this.login.host = host
        this.connection = mysql.createConnection(this.login)
        this.connection.connect(err => {
            if (err) throw err
            console.log("Database connection established")
        })
    }
}
