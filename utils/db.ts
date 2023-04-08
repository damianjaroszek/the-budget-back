import {createPool} from "mysql2/promise";

export const pool = createPool({
    host: 'localhost',
    user: 'root',
    //password: '', // nie udostępniamy swoich haseł na github, warto ten plik dodać do .gitignore --> utils/db.ts
    database: 'the_budget',
    namedPlaceholders: true,
    decimalNumbers: true,
});
