_Altes Projekt für's Studium_

# Dummies and Dragons

Simple web server which connects to a MySQL database to create a Dungeons and Dragons like character sheet.  

## Setup

### Step 1: Load modules

First you need to load all required modules
```sh
# Using yarn
$ yarn

# Using npm
npm i
```

### Step 2: Setup database

Next you have to setup the database.  
For that you need to tell the program the IP address of the database host if it is different than `localhost`.
 You do this in `src/index.ts`.
```typescript
export const db = new Database("your/database/IP")
``` 

You also might need to change the login credentials in `src/Database.ts`

```typescript
private readonly login: {user: string; password: string, host?: string} = {
    password: "your-database-password",
    user: "your-database-user"
    }
```

### Step 3: Transpile TypeScript

Last thing is to transpile the TypeScript files to JavaScript

```sh
tsc
``` 

---

_This program was created for study._  
